import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {createMolecularModel, sampleMolecularPositions, explosionAt} from "./molecular-geometry";
import {createMolecularEffects} from "./molecular-effects";
import {MOLECULAR_QUALITY, molecularPixelRatio, type MolecularQuality} from "./molecular-quality";
import type {DragRotation} from "./molecular-drag";

export async function createMolecularRenderer(canvas:HTMLCanvasElement|OffscreenCanvas) {
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});
  renderer.setClearColor(0x05070a,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=.96;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(42,1,.1,80);
  camera.position.set(0,0,12);
  const room=new RoomEnvironment();
  const generator=new THREE.PMREMGenerator(renderer);
  const environment=generator.fromScene(room,.02);
  room.dispose();generator.dispose();
  scene.environment=environment.texture;
  scene.environmentIntensity=.65;
  scene.add(new THREE.HemisphereLight(0xcfe4f1,0x08121b,.45));
  const key=new THREE.DirectionalLight(0xffffff,2.2);key.position.set(-3,5,6);scene.add(key);
  const rim=new THREE.DirectionalLight(0x9bdceb,4);rim.position.set(4,1,-3);scene.add(rim);
  const fill=new THREE.DirectionalLight(0x50697f,.8);fill.position.set(-4,-3,2);scene.add(fill);
  // User rotation lives in camera/screen axes, outside the scroll animation.
  const interaction=new THREE.Group();scene.add(interaction);
  const group=new THREE.Group();interaction.add(group);
  const model=createMolecularModel();
  const positions=new Float32Array(model.atoms.length*3);
  let quality: MolecularQuality = "medium";
  const profile=MOLECULAR_QUALITY[quality];
  let sphere=new THREE.SphereGeometry(1,profile.sphereWidth,profile.sphereHeight);
  let cylinder=new THREE.CylinderGeometry(1,1,1,profile.bondSides);
  const material=new THREE.MeshStandardMaterial({metalness:.82,roughness:.2});
  const bondMaterial=new THREE.MeshStandardMaterial({color:0x697980,metalness:.78,roughness:.3});
  const atoms=new THREE.InstancedMesh(sphere,material,model.atoms.length);
  const bonds=new THREE.InstancedMesh(cylinder,bondMaterial,model.bonds.length);
  atoms.frustumCulled=false;bonds.frustumCulled=false;
  atoms.instanceMatrix.setUsage(THREE.DynamicDrawUsage);bonds.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const colors={carbon:0x48555f,silver:0xc4d1d6,cyan:0x458b9f,hydrogen:0xbcc9d2};
  model.atoms.forEach((atom,i)=>atoms.setColorAt(i,new THREE.Color(colors[atom.element])));
  group.add(atoms,bonds);
  let membrane=createMolecularEffects(quality);group.add(membrane.root);
  const dummy=new THREE.Object3D(),a=new THREE.Vector3(),b=new THREE.Vector3(),direction=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);
  const restLengths=model.bonds.map(([first,second])=>new THREE.Vector3(...model.atoms[first].position).distanceTo(new THREE.Vector3(...model.atoms[second].position)));
  let width=1,height=1,requestedDpr=1,compact=false,disposed=false;
  let serial=0;

  const render=(progress:number,pointerX:number,pointerY:number,strength:number,time=0,rotation?:DragRotation)=>{
    if(disposed)return;
    const p=Math.max(0,Math.min(1,progress)),burst=explosionAt(p);
    sampleMolecularPositions(model,p,positions,time);
    for(let i=0;i<model.atoms.length;i++) {
      dummy.position.fromArray(positions,i*3);dummy.quaternion.identity();dummy.scale.setScalar(model.atoms[i].radius);
      dummy.updateMatrix();atoms.setMatrixAt(i,dummy.matrix);
    }
    for(let i=0;i<model.bonds.length;i++) {
      const [first,second]=model.bonds[i];
      a.fromArray(positions,first*3);b.fromArray(positions,second*3);direction.subVectors(b,a);
      const length=direction.length();
      const internal=model.atoms[first].fragment===model.atoms[second].fragment;
      const visibility=internal?1:1-THREE.MathUtils.smoothstep(length/restLengths[i],1.15,1.9);
      const radius=(internal?.019:.011)*visibility;
      dummy.position.copy(a).add(b).multiplyScalar(.5);dummy.quaternion.setFromUnitVectors(up,direction.normalize());
      dummy.scale.set(radius,Math.max(.001,length),radius);dummy.updateMatrix();bonds.setMatrixAt(i,dummy.matrix);
    }
    atoms.instanceMatrix.needsUpdate=true;bonds.instanceMatrix.needsUpdate=true;
    interaction.quaternion.fromArray(rotation ?? [0,0,0,1]);
    group.rotation.set(.13+p*.44+Math.sin(time*.12)*.04+pointerY*strength*.07,-.35+p*2.2+time*.065+pointerX*strength*.07,-.25+p*.32);
    membrane.update(time,burst);
    const focusX=compact?.5:.7-burst*.1,focusY=compact?.68:.51;
    camera.setViewOffset(width,height,(.5-focusX)*width,(.5-focusY)*height,width,height);
    renderer.render(scene,camera);
    if("dataset" in canvas){canvas.dataset.phase=p.toFixed(3);canvas.dataset.frame=String(++serial);canvas.dataset.model="molecular-complex";}
    return p.toFixed(3);
  };
  const resize=(w:number,h:number,dpr=1)=>{
    width=Math.max(1,w);height=Math.max(1,h);requestedDpr=dpr;compact=w<=900;
    // Cap fragment work independently of display density. Text remains DOM.
    const gl=renderer.getContext();
    const maxSide=Math.min(renderer.capabilities.maxTextureSize,gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
    const pixelRatio=molecularPixelRatio(width,height,dpr,maxSide,quality);
    renderer.setPixelRatio(pixelRatio);renderer.setSize(width,height,false);
    membrane.setPixelRatio(pixelRatio);
    camera.aspect=width/height;
    camera.position.z=compact?Math.max(12,12.4/camera.aspect):11.7;
    camera.updateProjectionMatrix();
  };
  const setQuality=(next: MolecularQuality)=>{
    if(disposed || quality===next)return;
    quality=next;
    const profile=MOLECULAR_QUALITY[quality];
    const oldSphere=sphere,oldCylinder=cylinder;
    sphere=new THREE.SphereGeometry(1,profile.sphereWidth,profile.sphereHeight);
    cylinder=new THREE.CylinderGeometry(1,1,1,profile.bondSides);
    atoms.geometry=sphere;bonds.geometry=cylinder;
    oldSphere.dispose();oldCylinder.dispose();
    group.remove(membrane.root);membrane.dispose();
    membrane=createMolecularEffects(quality);group.add(membrane.root);
    resize(width,height,requestedDpr);
  };
  const getStats=()=>({quality,triangles:renderer.info.render.triangles,drawCalls:renderer.info.render.calls,width:canvas.width,height:canvas.height,rotation:interaction.quaternion.toArray() as DragRotation});
  const dispose=(releaseContext=true)=>{
    disposed=true;atoms.dispose();bonds.dispose();sphere.dispose();cylinder.dispose();material.dispose();bondMaterial.dispose();membrane.dispose();environment.dispose();renderer.dispose();if(releaseContext)renderer.forceContextLoss();
  };
  try{await renderer.compileAsync(scene,camera);}catch(error){dispose();throw error;}
  return {render,resize,dispose,setQuality,getStats};
}

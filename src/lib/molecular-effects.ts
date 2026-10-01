import * as THREE from "three";

function surface(u: number, v: number, shell = 0) {
  const r = 1.44 + Math.cos(u * 3 + .6) * .19 + Math.sin(u * 5) * .075;
  const tube = (.3 + .16 * (.5 + .5 * Math.sin(u * 4 + .3))) * (1 + shell * .12);
  const twist = v + u * 1.35;
  const wrinkle = Math.sin(u * 19 + v * 5) * .024 + Math.cos(u * 31 - v * 3) * .012;
  return new THREE.Vector3(
    Math.cos(u) * (r + Math.cos(twist) * tube + wrinkle),
    Math.sin(u) * (r * .83 + Math.cos(twist) * tube) + Math.sin(u * 3) * .12,
    Math.sin(u * 2 + .5) * .55 + Math.sin(twist) * tube * 1.4 + wrinkle,
  );
}

export function createMolecularEffects() {
  const root = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const uniforms = {time: {value:0}, burst:{value:0}, pixelRatio:{value:1}};
  const vertexShader = `
    uniform float time;
    uniform float burst;
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec2 vUv;
    void main() {
      vUv=uv;
      vec3 p=position+normal*(sin(position.x*5.0+position.y*4.0+time*.7)*.027);
      p*=1.0+burst*.28;
      p.z+=sin(uv.x*18.849+time*.35)*burst*.2;
      vec4 mv=modelViewMatrix*vec4(p,1.0);
      vNormal=normalize(normalMatrix*normal);
      vView=normalize(-mv.xyz);
      gl_Position=projectionMatrix*mv;
    }
  `;
  const fragmentShader = `
    uniform float time;
    uniform float burst;
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec2 vUv;
    void main() {
      float fresnel=pow(1.0-abs(dot(normalize(vNormal),normalize(vView))),2.7);
      float fibers=pow(.5+.5*sin(vUv.x*1256.0+sin(vUv.y*33.0+time*.2)*5.0),18.0);
      float wave=.65+.35*sin(vUv.x*34.0-vUv.y*7.0-time*.6);
      float alpha=(.045+fresnel*.34+fibers*.1)*wave*(1.0-burst*.32);
      vec3 color=mix(vec3(.08,.28,.36),vec3(.46,.78,.86),fresnel*.75+fibers*.25);
      gl_FragColor=vec4(color,alpha);
    }
  `;

  for (let shell=0;shell<2;shell++) {
    const segments=240, sides=48;
    const positions=[],uvs=[],indices=[];
    for(let i=0;i<=segments;i++)for(let j=0;j<=sides;j++) {
      const p=surface(i/segments*Math.PI*2,j/sides*Math.PI*2,shell);
      positions.push(p.x,p.y,p.z); uvs.push(i/segments,j/sides);
      if(i<segments && j<sides) {
        const a=i*(sides+1)+j,b=a+sides+1;
        indices.push(a,b,a+1,b,b+1,a+1);
      }
    }
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
    geometry.setAttribute("uv",new THREE.Float32BufferAttribute(uvs,2));
    geometry.setIndex(indices); geometry.computeVertexNormals();
    const material=new THREE.ShaderMaterial({uniforms,vertexShader,fragmentShader,transparent:true,side:THREE.DoubleSide,depthWrite:false});
    const mesh=new THREE.Mesh(geometry,material);
    mesh.rotation.set(shell*.5,-shell*.6,shell*.65);
    if(shell)mesh.scale.set(.88,1.08,.83);
    root.add(mesh); geometries.push(geometry); materials.push(material);
  }

  // Fine, interwoven fibres follow the irregular membrane, rather than
  // straight links between arbitrary points in an ordinary sphere.
  const fiberPoints=[];
  for(let fiber=0;fiber<44;fiber++)for(let i=0;i<150;i++) {
    for(const step of [i,i+1]) {
      const u=step/150*Math.PI*2;
      const v=fiber/44*Math.PI*2+Math.sin(u*3+fiber)*.25+u*(fiber%3-1)*.7;
      const p=surface(u,v,.2+Math.sin(fiber)*.8);
      fiberPoints.push(p.x,p.y,p.z);
    }
  }
  const fiberGeometry=new THREE.BufferGeometry();
  fiberGeometry.setAttribute("position",new THREE.Float32BufferAttribute(fiberPoints,3));
  const fiberMaterial=new THREE.ShaderMaterial({
    uniforms,transparent:true,depthWrite:false,
    vertexShader:`uniform float time; uniform float burst; varying float light; void main(){ vec3 p=position; p+=normalize(position)*sin(position.x*5.+position.y*3.+time*.6)*.025; p*=1.+burst*.28; light=.35+.65*pow(.5+.5*sin(position.x*8.-position.y*5.-time*.8),3.); gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }`,
    fragmentShader:`uniform float burst; varying float light; void main(){gl_FragColor=vec4(.4,.76,.85,light*.22*(1.-burst*.5));}`,
  });
  root.add(new THREE.LineSegments(fiberGeometry,fiberMaterial));
  geometries.push(fiberGeometry);materials.push(fiberMaterial);

  const dustPositions=[];
  for(let i=0;i<1600;i++) {
    const u=i*2.399963,v=i*1.71833;
    const p=surface(u,v,Math.sin(i*2.13)*1.5);
    const jitter=.02+Math.sin(i*3.71)*.07;
    dustPositions.push(p.x+jitter,p.y+Math.cos(i)*jitter,p.z+Math.sin(i*2.1)*jitter);
  }
  const dustGeometry=new THREE.BufferGeometry();
  dustGeometry.setAttribute("position",new THREE.Float32BufferAttribute(dustPositions,3));
  const dustMaterial=new THREE.ShaderMaterial({
    uniforms,transparent:true,depthWrite:false,
    vertexShader:`uniform float time; uniform float burst; uniform float pixelRatio; varying float alpha; void main(){vec3 p=position*(1.+burst*.5); p+=normalize(p)*sin(p.y*6.+time*.5)*.035; vec4 mv=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*mv; gl_PointSize=clamp(13./-mv.z,1.,3.)*pixelRatio; alpha=.25+.5*pow(.5+.5*sin(p.x*11.-p.z*7.+time),5.);}`,
    fragmentShader:`varying float alpha; void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;gl_FragColor=vec4(.58,.88,.96,alpha*(1.-smoothstep(.08,.5,r)));}`,
  });
  root.add(new THREE.Points(dustGeometry,dustMaterial));
  geometries.push(dustGeometry);materials.push(dustMaterial);
  return {
    root,
    update(time:number,burst:number) {uniforms.time.value=time;uniforms.burst.value=burst;},
    setPixelRatio(value:number) {uniforms.pixelRatio.value=value;},
    dispose() {geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());},
  };
}

/** Preserve sharp structural detail while retaining restrained soft highlights. */
export function createMolecularOptics(renderer:THREE.WebGLRenderer) {
  const target=new THREE.WebGLRenderTarget(1,1,{samples:4,resolveDepthBuffer:false,type:renderer.extensions.has("EXT_color_buffer_float")?THREE.HalfFloatType:THREE.UnsignedByteType});
  const uniforms={color:{value:target.texture},resolution:{value:new THREE.Vector2(1,1)},pixelRatio:{value:1}};
  const geometry=new THREE.PlaneGeometry(2,2);
  const material=new THREE.ShaderMaterial({
    uniforms,depthTest:false,depthWrite:false,transparent:true,blending:THREE.NoBlending,
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
    fragmentShader:`
      uniform sampler2D color; uniform vec2 resolution; uniform float pixelRatio;
      varying vec2 vUv;
      void main(){
        vec2 pixel=1./resolution;
        vec4 center=texture2D(color,vUv);
        vec3 glow=vec3(0.);
        for(int i=0;i<8;i++){
          float a=float(i)*.785398;
          vec2 dir=vec2(cos(a),sin(a));
          vec3 sampleColor=texture2D(color,clamp(vUv+dir*pixel*3.2*pixelRatio,vec2(0.),vec2(1.))).rgb;
          glow+=max(sampleColor-vec3(.65),vec3(0.));
        }
        gl_FragColor=vec4(center.rgb+glow*.018,center.a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const output=new THREE.Scene();output.add(new THREE.Mesh(geometry,material));
  const screenCamera=new THREE.Camera();
  return {
    render(scene:THREE.Scene,camera:THREE.Camera){renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.setRenderTarget(null);renderer.render(output,screenCamera);},
    resize(width:number,height:number,pixelRatio:number){target.setSize(width,height);uniforms.resolution.value.set(width,height);uniforms.pixelRatio.value=pixelRatio;},
    dispose(){target.dispose();geometry.dispose();material.dispose();},
  };
}

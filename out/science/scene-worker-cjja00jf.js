var sK=Object.defineProperty;var iK=(J)=>J;function oK(J,Q){this[J]=iK.bind(null,Q)}var aK=(J,Q)=>{for(var $ in Q)sK(J,$,{get:Q[$],enumerable:!0,configurable:!0,set:oK.bind(Q,$)})};var o8=(J,Q)=>()=>(J&&(Q=J(J=0)),Q);function rK(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function tK(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function K7(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function SW(){let J=K7("canvas");return J.style.display="block",J}function W$(...J){let Q="THREE."+J.shift();if(w8)w8("log",Q,...J);else console.log(Q,...J)}function jW(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function C0(...J){J=jW(J);let Q="THREE."+J.shift();if(w8)w8("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function T0(...J){J=jW(J);let Q="THREE."+J.shift();if(w8)w8("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function i9(...J){let Q=J.join(" ");if(Q in KZ)return;KZ[Q]=!0,C0(...J)}function yW(J,Q,$){return new Promise(function(Z,W){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:Z()}}setTimeout(K,$)})}class z9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let W=Z.indexOf(Q);if(W!==-1)Z.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let W=0,K=Z.length;W<K;W++)Z[W].call(this,J);J.target=null}}}function b8(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(_J[J&255]+_J[J>>8&255]+_J[J>>16&255]+_J[J>>24&255]+"-"+_J[Q&255]+_J[Q>>8&255]+"-"+_J[Q>>16&15|64]+_J[Q>>24&255]+"-"+_J[$&63|128]+_J[$>>8&255]+"-"+_J[$>>16&255]+_J[$>>24&255]+_J[Z&255]+_J[Z>>8&255]+_J[Z>>16&255]+_J[Z>>24&255]).toLowerCase()}function d0(J,Q,$){return Math.max(Q,Math.min($,J))}function K$(J,Q){return(J%Q+Q)%Q}function eK(J,Q,$,Z,W){return Z+(J-Q)*(W-Z)/($-Q)}function JH(J,Q,$){if(J!==Q)return($-J)/(Q-J);else return 0}function W7(J,Q,$){return(1-$)*J+$*Q}function QH(J,Q,$,Z){return W7(J,Q,1-Math.exp(-$*Z))}function $H(J,Q=1){return Q-Math.abs(K$(J,Q*2)-Q)}function ZH(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*(3-2*J)}function WH(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*J*(J*(J*6-15)+10)}function KH(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function HH(J,Q){return J+Math.random()*(Q-J)}function YH(J){return J*(0.5-Math.random())}function XH(J){if(J!==void 0)HZ=J;let Q=HZ+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function UH(J){return J*Z7}function GH(J){return J*T8}function NH(J){return(J&J-1)===0&&J!==0}function EH(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function qH(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function FH(J,Q,$,Z,W){let{cos:K,sin:H}=Math,Y=K($/2),U=H($/2),X=K((Q+Z)/2),N=H((Q+Z)/2),E=K((Q-Z)/2),G=H((Q-Z)/2),D=K((Z-Q)/2),k=H((Z-Q)/2);switch(W){case"XYX":J.set(Y*N,U*E,U*G,Y*X);break;case"YZY":J.set(U*G,Y*N,U*E,Y*X);break;case"ZXZ":J.set(U*E,U*G,Y*N,Y*X);break;case"XZX":J.set(Y*N,U*k,U*D,Y*X);break;case"YXY":J.set(U*D,Y*N,U*k,Y*X);break;case"ZYZ":J.set(U*k,U*D,Y*N,Y*X);break;default:C0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+W)}}function C8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function jJ(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}function DH(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,K,H){if(this.enabled===!1||K===H||!K||!H)return W;if(this.spaces[K].transfer==="srgb")W.r=V9(W.r),W.g=V9(W.g),W.b=V9(W.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)W.applyMatrix3(this.spaces[K].toXYZ),W.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")W.r=P8(W.r),W.g=P8(W.g),W.b=P8(W.b);return W},workingToColorSpace:function(W,K){return this.convert(W,this.workingColorSpace,K)},colorSpaceToWorking:function(W,K){return this.convert(W,K,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getToneMappingMode:function(W){return this.spaces[W].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(W,K=this.workingColorSpace){return W.fromArray(this.spaces[K].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,K,H){return W.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(W,K){return i9("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(W,K)},toWorkingColorSpace:function(W,K){return i9("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(W,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:XZ,fromXYZ:UZ,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:XZ,fromXYZ:UZ,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}function V9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function P8(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}class H${static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(F8===void 0)F8=K7("canvas");F8.width=J.width,F8.height=J.height;let Z=F8.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=F8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=K7("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),W=Z.data;for(let K=0;K<W.length;K++)W[K]=V9(W[K]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(V9(Q[$]/255)*255);else Q[$]=V9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return C0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}class N7{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:OH++}),this.uuid=b8(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let W;if(Array.isArray(Z)){W=[];for(let K=0,H=Z.length;K<H;K++)if(Z[K].isDataTexture)W.push(x6(Z[K].image));else W.push(x6(Z[K]))}else W=x6(Z);$.url=W}if(!Q)J.images[this.uuid]=$;return $}}function x6(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return H$.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return C0("Texture: Unable to serialize Texture."),{}}class D6{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}class E7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new uJ,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new uJ,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new y;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new uJ,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new y,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,W=null,K=null,H=this._targetRay,Y=this._grip,U=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(U&&J.hand){K=!0;for(let k of J.hand.values()){let I=Q.getJointPose(k,$),q=this._getHandJoint(U,k);if(I!==null)q.matrix.fromArray(I.transform.matrix),q.matrix.decompose(q.position,q.rotation,q.scale),q.matrixWorldNeedsUpdate=!0,q.jointRadius=I.radius;q.visible=I!==null}let X=U.joints["index-finger-tip"],N=U.joints["thumb-tip"],E=X.position.distanceTo(N.position),G=0.02,D=0.005;if(U.inputState.pinching&&E>G+D)U.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!U.inputState.pinching&&E<=G-D)U.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,$),W!==null){if(Y.matrix.fromArray(W.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,W.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(W.linearVelocity);else Y.hasLinearVelocity=!1;if(W.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(W.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&W!==null)Z=W;if(Z!==null){if(H.matrix.fromArray(Z.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Z.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Z.linearVelocity);else H.hasLinearVelocity=!1;if(Z.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Z.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(zH)}}}if(H!==null)H.visible=Z!==null;if(Y!==null)Y.visible=W!==null;if(U!==null)U.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new uJ;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}function m6(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class dJ{constructor(J=new y,Q=new y,$=new y){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),iJ.subVectors(J,Q),Z.cross(iJ);let W=Z.lengthSq();if(W>0)return Z.multiplyScalar(1/Math.sqrt(W));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,W){iJ.subVectors(Z,Q),O9.subVectors($,Q),l6.subVectors(J,Q);let K=iJ.dot(iJ),H=iJ.dot(O9),Y=iJ.dot(l6),U=O9.dot(O9),X=O9.dot(l6),N=K*U-H*H;if(N===0)return W.set(0,0,0),null;let E=1/N,G=(U*Y-H*X)*E,D=(K*X-H*Y)*E;return W.set(1-G-D,D,G)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,R9)===null)return!1;return R9.x>=0&&R9.y>=0&&R9.x+R9.y<=1}static getInterpolation(J,Q,$,Z,W,K,H,Y){if(this.getBarycoord(J,Q,$,Z,R9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(W,R9.x),Y.addScaledVector(K,R9.y),Y.addScaledVector(H,R9.z),Y}static getInterpolatedAttribute(J,Q,$,Z,W,K){return n6.setScalar(0),s6.setScalar(0),i6.setScalar(0),n6.fromBufferAttribute(J,Q),s6.fromBufferAttribute(J,$),i6.fromBufferAttribute(J,Z),K.setScalar(0),K.addScaledVector(n6,W.x),K.addScaledVector(s6,W.y),K.addScaledVector(i6,W.z),K}static isFrontFacing(J,Q,$,Z){return iJ.subVectors($,Q),O9.subVectors(J,Q),iJ.cross(O9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return iJ.subVectors(this.c,this.b),O9.subVectors(this.a,this.b),iJ.cross(O9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return dJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return dJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,W){return dJ.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,W)}containsPoint(J){return dJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return dJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,W=this.c,K,H;k8.subVectors(Z,$),M8.subVectors(W,$),d6.subVectors(J,$);let Y=k8.dot(d6),U=M8.dot(d6);if(Y<=0&&U<=0)return Q.copy($);u6.subVectors(J,Z);let X=k8.dot(u6),N=M8.dot(u6);if(X>=0&&N<=X)return Q.copy(Z);let E=Y*N-X*U;if(E<=0&&Y>=0&&X<=0)return K=Y/(Y-X),Q.copy($).addScaledVector(k8,K);c6.subVectors(J,W);let G=k8.dot(c6),D=M8.dot(c6);if(D>=0&&G<=D)return Q.copy(W);let k=G*U-Y*D;if(k<=0&&U>=0&&D<=0)return H=U/(U-D),Q.copy($).addScaledVector(M8,H);let I=X*D-G*N;if(I<=0&&N-X>=0&&G-D>=0)return RZ.subVectors(W,Z),H=(N-X)/(N-X+(G-D)),Q.copy(Z).addScaledVector(RZ,H);let q=1/(I+k+E);return K=k*q,H=E*q,Q.copy($).addScaledVector(k8,K).addScaledVector(M8,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class C9{constructor(J=new y(1/0,1/0,1/0),Q=new y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(oJ.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(oJ.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=oJ.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let W=$.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=W.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,oJ);else oJ.fromBufferAttribute(W,K);oJ.applyMatrix4(J.matrixWorld),this.expandByPoint(oJ)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();S7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();S7.copy($.boundingBox)}S7.applyMatrix4(J.matrixWorld),this.union(S7)}}let Z=J.children;for(let W=0,K=Z.length;W<K;W++)this.expandByObject(Z[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,oJ),oJ.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(r8),j7.subVectors(this.max,r8),L8.subVectors(J.a,r8),V8.subVectors(J.b,r8),B8.subVectors(J.c,r8),v9.subVectors(V8,L8),f9.subVectors(B8,V8),u9.subVectors(L8,B8);let Q=[0,-v9.z,v9.y,0,-f9.z,f9.y,0,-u9.z,u9.y,v9.z,0,-v9.x,f9.z,0,-f9.x,u9.z,0,-u9.x,-v9.y,v9.x,0,-f9.y,f9.x,0,-u9.y,u9.x,0];if(!o6(Q,L8,V8,B8,j7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!o6(Q,L8,V8,B8,j7))return!1;return y7.crossVectors(v9,f9),Q=[y7.x,y7.y,y7.z],o6(Q,L8,V8,B8,j7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,oJ).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(oJ).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return k9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),k9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),k9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),k9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),k9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),k9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),k9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),k9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(k9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}function o6(J,Q,$,Z,W){for(let K=0,H=J.length-3;K<=H;K+=3){c9.fromArray(J,K);let Y=W.x*Math.abs(c9.x)+W.y*Math.abs(c9.y)+W.z*Math.abs(c9.z),U=Q.dot(c9),X=$.dot(c9),N=Z.dot(c9);if(Math.max(-Math.max(U,X,N),Math.min(U,X,N))>Y)return!1}return!0}class P9{constructor(J=new y,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else _H.setFromPoints(J).getCenter($);let Z=0;for(let W=0,K=J.length;W<K;W++)Z=Math.max(Z,$.distanceToSquared(J[W]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;t8.subVectors(J,this.center);let Q=t8.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(t8,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else a6.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(t8.copy(J.center).add(a6)),this.expandByPoint(t8.copy(J.center).sub(a6));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}class q7{constructor(J=new y,Q=new y(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,M9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=M9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return M9.copy(this.origin).addScaledVector(this.direction,Q),M9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){t6.copy(J).add(Q).multiplyScalar(0.5),f7.copy(Q).sub(J).normalize(),b9.copy(this.origin).sub(t6);let W=J.distanceTo(Q)*0.5,K=-this.direction.dot(f7),H=b9.dot(this.direction),Y=-b9.dot(f7),U=b9.lengthSq(),X=Math.abs(1-K*K),N,E,G,D;if(X>0)if(N=K*Y-H,E=K*H-Y,D=W*X,N>=0)if(E>=-D)if(E<=D){let k=1/X;N*=k,E*=k,G=N*(N+K*E+2*H)+E*(K*N+E+2*Y)+U}else E=W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+U;else E=-W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+U;else if(E<=-D)N=Math.max(0,-(-K*W+H)),E=N>0?-W:Math.min(Math.max(-W,-Y),W),G=-N*N+E*(E+2*Y)+U;else if(E<=D)N=0,E=Math.min(Math.max(-W,-Y),W),G=E*(E+2*Y)+U;else N=Math.max(0,-(K*W+H)),E=N>0?W:Math.min(Math.max(-W,-Y),W),G=-N*N+E*(E+2*Y)+U;else E=K>0?-W:W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+U;if($)$.copy(this.origin).addScaledVector(this.direction,N);if(Z)Z.copy(t6).addScaledVector(f7,E);return G}intersectSphere(J,Q){M9.subVectors(J.center,this.origin);let $=M9.dot(this.direction),Z=M9.dot(M9)-$*$,W=J.radius*J.radius;if(Z>W)return null;let K=Math.sqrt(W-Z),H=$-K,Y=$+K;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,W,K,H,Y,U=1/this.direction.x,X=1/this.direction.y,N=1/this.direction.z,E=this.origin;if(U>=0)$=(J.min.x-E.x)*U,Z=(J.max.x-E.x)*U;else $=(J.max.x-E.x)*U,Z=(J.min.x-E.x)*U;if(X>=0)W=(J.min.y-E.y)*X,K=(J.max.y-E.y)*X;else W=(J.max.y-E.y)*X,K=(J.min.y-E.y)*X;if($>K||W>Z)return null;if(W>$||isNaN($))$=W;if(K<Z||isNaN(Z))Z=K;if(N>=0)H=(J.min.z-E.z)*N,Y=(J.max.z-E.z)*N;else H=(J.max.z-E.z)*N,Y=(J.min.z-E.z)*N;if($>Y||H>Z)return null;if(H>$||$!==$)$=H;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,M9)!==null}intersectTriangle(J,Q,$,Z,W){e6.subVectors(Q,J),b7.subVectors($,J),JQ.crossVectors(e6,b7);let K=this.direction.dot(JQ),H;if(K>0){if(Z)return null;H=1}else if(K<0)H=-1,K=-K;else return null;b9.subVectors(this.origin,J);let Y=H*this.direction.dot(b7.crossVectors(b9,b7));if(Y<0)return null;let U=H*this.direction.dot(e6.cross(b9));if(U<0)return null;if(Y+U>K)return null;let X=-H*b9.dot(JQ);if(X<0)return null;return this.at(X/K,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}function wH(J,Q,$,Z,W,K,H,Y){let U;if(Q.side===1)U=Z.intersectTriangle(H,K,W,!0,Y);else U=Z.intersectTriangle(W,K,H,Q.side===0,Y);if(U===null)return null;l7.copy(Y),l7.applyMatrix4(J.matrixWorld);let X=$.ray.origin.distanceTo(l7);if(X<$.near||X>$.far)return null;return{distance:X,point:l7.clone(),object:J}}function d7(J,Q,$,Z,W,K,H,Y,U,X){J.getVertexPosition(Y,x7),J.getVertexPosition(U,g7),J.getVertexPosition(X,p7);let N=wH(J,Q,$,Z,x7,g7,p7,LZ);if(N){let E=new y;if(dJ.getBarycoord(LZ,x7,g7,p7,E),W)N.uv=dJ.getInterpolatedAttribute(W,Y,U,X,E,new g0);if(K)N.uv1=dJ.getInterpolatedAttribute(K,Y,U,X,E,new g0);if(H){if(N.normal=dJ.getInterpolatedAttribute(H,Y,U,X,E,new y),N.normal.dot(Z.direction)>0)N.normal.multiplyScalar(-1)}let G={a:Y,b:U,c:X,normal:new y,materialIndex:0};dJ.getNormal(x7,g7,p7,G.normal),N.face=G,N.barycoord=E}return N}class L9{constructor(J=new y(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=$Q.subVectors($,Q).cross(SH.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta($Q),W=this.normal.dot(Z);if(W===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/W;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(Z,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||jH.getNormalMatrix(J),Z=this.coplanarPoint($Q).applyMatrix4(J),W=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}class F7{constructor(J=new L9,Q=new L9,$=new L9,Z=new L9,W=new L9,K=new L9){this.planes=[J,Q,$,Z,W,K]}set(J,Q,$,Z,W,K){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(Z),H[4].copy(W),H[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,W=J.elements,K=W[0],H=W[1],Y=W[2],U=W[3],X=W[4],N=W[5],E=W[6],G=W[7],D=W[8],k=W[9],I=W[10],q=W[11],F=W[12],_=W[13],C=W[14],L=W[15];if(Z[0].setComponents(U-K,G-X,q-D,L-F).normalize(),Z[1].setComponents(U+K,G+X,q+D,L+F).normalize(),Z[2].setComponents(U+H,G+N,q+k,L+_).normalize(),Z[3].setComponents(U-H,G-N,q-k,L-_).normalize(),$)Z[4].setComponents(Y,E,I,C).normalize(),Z[5].setComponents(U-Y,G-E,q-I,L-C).normalize();else if(Z[4].setComponents(U-Y,G-E,q-I,L-C).normalize(),Q===2000)Z[5].setComponents(U+Y,G+E,q+I,L+C).normalize();else if(Q===2001)Z[5].setComponents(Y,E,I,C).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();s9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();s9.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(s9)}intersectsSprite(J){s9.center.set(0,0,0);let Q=yH.distanceTo(J.center);return s9.radius=0.7071067811865476+Q,s9.applyMatrix4(J.matrixWorld),this.intersectsSphere(s9)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(c7.x=Z.normal.x>0?J.max.x:J.min.x,c7.y=Z.normal.y>0?J.max.y:J.min.y,c7.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(c7)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function s7(J,Q,$,Z,W,K,H){let Y=J.geometry.attributes.position;if(J6.fromBufferAttribute(Y,W),Q6.fromBufferAttribute(Y,K),$.distanceSqToSegment(J6,Q6,ZQ,zZ)>Z)return;ZQ.applyMatrix4(J.matrixWorld);let X=Q.ray.origin.distanceTo(ZQ);if(X<Q.near||X>Q.far)return;return{distance:X,point:zZ.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}function PZ(J,Q,$,Z,W,K,H){let Y=KQ.distanceSqToPoint(J);if(Y<$){let U=new y;KQ.closestPointToPoint(J,U),U.applyMatrix4(Z);let X=W.ray.origin.distanceTo(U);if(X<W.near||X>W.far)return;K.push({distance:X,distanceToRay:Math.sqrt(Y),point:U,index:Q,face:null,faceIndex:null,barycoord:null,object:H})}}function Y8(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let W=J[$][Z];if(wZ(W))if(W.isRenderTargetTexture)C0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=W.clone();else if(Array.isArray(W))if(wZ(W[0])){let K=[];for(let H=0,Y=W.length;H<Y;H++)K[H]=W[H].clone();Q[$][Z]=K}else Q[$][Z]=W.slice();else Q[$][Z]=W}}return Q}function SJ(J){let Q={};for(let $=0;$<J.length;$++){let Z=Y8(J[$]);for(let W in Z)Q[W]=Z[W]}return Q}function wZ(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function vH(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function E$(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return u0.workingColorSpace}function a7(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class X8{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],W=Q[$-1];$:{J:{let K;Q:{Z:if(!(J<Z)){for(let H=$+2;;){if(Z===void 0){if(J<W)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(W=Z,Z=Q[++$],J<Z)break J}K=Q.length;break Q}if(!(J>=W)){let H=Q[1];if(J<H)$=2,W=H;for(let Y=$-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(Z=W,W=Q[--$-1],J>=W)break J}K=$,$=0;break Q}break $}while($<K){let H=$+K>>>1;if(J<Q[H])K=H;else $=H+1}if(Z=Q[$],W=Q[$-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,W,Z)}return this.interpolate_($,W,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z;for(let K=0;K!==Z;++K)Q[K]=$[W+K];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class nJ{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=a7(Q,this.TimeBufferType),this.values=a7($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:a7(J.times,Array),values:a7(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new k$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new R$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new O$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new M$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return C0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,Z=$.length,W=0,K=Z-1;while(W!==Z&&$[W]<J)++W;while(K!==-1&&$[K]>Q)--K;if(++K,W!==0||K!==Z){if(W>=K)K=Math.max(K,1),W=K-1;let H=this.getValueSize();this.times=$.slice(W,K),this.values=this.values.slice(W*H,K*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)T0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,W=$.length;if(W===0)T0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==W;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){T0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){T0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(Z!==void 0){if(tK(Z))for(let H=0,Y=Z.length;H!==Y;++H){let U=Z[H];if(isNaN(U)){T0("KeyframeTrack: Value is not a valid number.",this,H,U),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,W=J.length-1,K=1;for(let H=1;H<W;++H){let Y=!1,U=J[H],X=J[H+1];if(U!==X&&(H!==1||U!==J[0]))if(!Z){let N=H*$,E=N-$,G=N+$;for(let D=0;D!==$;++D){let k=Q[N+D];if(k!==Q[E+D]||k!==Q[G+D]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let N=H*$,E=K*$;for(let G=0;G!==$;++G)Q[E+G]=Q[N+G]}++K}}if(W>0){J[K]=J[W];for(let H=W*$,Y=K*$,U=0;U!==$;++U)Q[Y+U]=Q[H+U];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);return Z.createInterpolant=this.createInterpolant,Z}}class z${constructor(J,Q,$){let Z=this,W=!1,K=0,H=0,Y=void 0,U=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(X){if(H++,W===!1){if(Z.onStart!==void 0)Z.onStart(X,K,H)}W=!0},this.itemEnd=function(X){if(K++,Z.onProgress!==void 0)Z.onProgress(X,K,H);if(K===H){if(W=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(X){if(Z.onError!==void 0)Z.onError(X)},this.resolveURL=function(X){if(X=X.normalize("NFC"),Y)return Y(X);return X},this.setURLModifier=function(X){return Y=X,this},this.addHandler=function(X,N){return U.push(X,N),this},this.removeHandler=function(X){let N=U.indexOf(X);if(N!==-1)U.splice(N,2);return this},this.getHandler=function(X){for(let N=0,E=U.length;N<E;N+=2){let G=U[N],D=U[N+1];if(G.global)G.lastIndex=0;if(G.test(X))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}class A${constructor(J){if(this.manager=J!==void 0?J:hW,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,W){$.load(J,Z,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}class _${constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new g0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new r0,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new F7,this._frameExtents=new g0(1,1),this._viewportCount=1,this._viewports=[new YJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera,$=this.matrix;if(TZ.setFromMatrixPosition(J.matrixWorld),Q.position.copy(TZ),SZ.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(SZ),Q.updateMatrixWorld(),WQ.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),this._frustum.setFromProjectionMatrix(WQ,Q.coordinateSystem,Q.reversedDepth),Q.coordinateSystem===2001||Q.reversedDepth)$.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,1,0,0,0,0,1);else $.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);$.multiply(WQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.intensity!==1)J.intensity=this.intensity;if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}class pW{constructor(J,Q,$){let Z=$||a0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=$.length;Z!==W;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class a0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||a0.parseTrackName(Q),this.node=a0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new a0(J,Q,$);else return new a0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(hH,"")}static parseTrackName(J){let Q=dH.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let W=$.nodeName.substring(Z+1);if(uH.indexOf(W)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=W}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(W){for(let K=0;K<W.length;K++){let H=W[K];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,W=Q.propertyIndex;if(!J)J=a0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){C0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let U=Q.objectIndex;switch($){case"materials":if(!J.material){T0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){T0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){T0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let X=0;X<J.length;X++)if(J[X].name===U){U=X;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){T0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){T0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){T0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(U!==void 0){if(J[U]===void 0){T0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[U]}}let K=J[Z];if(K===void 0){let U=Q.nodeName;T0("PropertyBinding: Trying to update property for track: "+U+"."+Z+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(W!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){T0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){T0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=W}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}function j$(J,Q,$,Z){let W=cH(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function cH(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}var vZ="185",fZ=0,HQ=1,bZ=2,H7=1,hZ=2,S8=3,j8=0,TJ=1,cJ=2,W9=0,Y7=1,YQ=2,XQ=3,UQ=4,xZ=5,y8=100,gZ=101,pZ=102,mZ=103,lZ=104,dZ=200,uZ=201,cZ=202,nZ=203,sZ=204,iZ=205,oZ=206,aZ=207,rZ=208,tZ=209,eZ=210,JW=211,QW=212,$W=213,ZW=214,WW=0,KW=1,HW=2,GQ=3,YW=4,XW=5,UW=6,GW=7,NW=0,EW=1,qW=2,aJ=0,NQ=1,EQ=2,qQ=3,o9=4,FQ=5,DQ=6,OQ=7,v8=301,a9=302,$6=303,Z6=304,X7=306,FW=1000,W6=1001,DW=1002,x9=1003,OW=1004,U7=1005,IJ=1006,K6=1007,r9=1008,gJ=1009,RW=1010,kW=1011,G7=1012,RQ=1013,K9=1014,B9=1015,rJ=1016,kQ=1017,MQ=1018,f8=1020,MW=35902,LW=35899,VW=1021,BW=1022,H9=1023,t9=1026,e9=1027,IW=1028,LQ=1029,J8=1030,VQ=1031,BQ=1033,H6=33776,Y6=33777,X6=33778,U6=33779,IQ=35840,zQ=35841,AQ=35842,_Q=35843,CQ=36196,PQ=37492,wQ=37496,TQ=37488,SQ=37489,G6=37490,jQ=37491,yQ=37808,vQ=37809,fQ=37810,bQ=37811,hQ=37812,xQ=37813,gQ=37814,pQ=37815,mQ=37816,lQ=37817,dQ=37818,uQ=37819,cQ=37820,nQ=37821,sQ=36492,iQ=36494,oQ=36495,aQ=36283,rQ=36284,N6=36285,tQ=36286,eQ=0,zW=1,Q8="",$8="srgb",J$="srgb-linear",Q$="linear",QJ="srgb",AW=512,_W=513,CW=514,E6=515,PW=516,wW=517,q6=518,TW=519,I9=35048,$$="300 es",Z$=2000,KZ,w8=null,vW,_J,HZ=1234567,Z7,T8,A9,g0,_9,y,b6,YZ,y0,h6,XZ,UZ,u0,F8,OH=0,RH=0,g6,PJ,YJ,Y$,vJ,F6,X$,r0,D8,sJ,kH,MH,j9,P7,hJ,GZ,NZ,Z9,LH=0,EZ,O8,D9,w7,a8,VH,BH,qZ,FZ,DZ,OZ,IH,R8,p6,WJ,uJ,zH,fW,y9,T7,S0,CJ,Y9,iJ,O9,l6,R9,k8,M8,RZ,d6,u6,c6,n6,s6,i6,k9,oJ,S7,L8,V8,B8,v9,f9,u9,r8,j7,y7,c9,DJ,v7,AH=0,wJ,O6,R6,HJ,_H,t8,a6,CH=0,lJ,r6,I8,xJ,e8,LJ,FJ,PH=0,tJ,M9,t6,f7,b9,e6,b7,JQ,k6,kZ,n9,h7,MZ,x7,g7,p7,QQ,m7,LZ,l7,XJ,h8,e7,z8,VZ,u7,BZ,TH,J7,Q7,X9,$Q,SH,jH,s9,yH,c7,x8,J6,Q6,IZ,$7,n7,ZQ,zZ,U$,AZ,_Z,Z8,G$,CZ,KQ,i7,o7,M6,L6,U9,N$,V6,g9,W8,K8,H8,bW,fH=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bH=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zJ,q$,p9,B6,I6,F$,D$,D7,O$,R$,k$,M$,U8,L$,V$,B$,z6,G8,I$,hW,O7,A6,WQ,TZ,SZ,r7,t7,$9,g8,h9,jZ,yZ,VJ,xW,_6,R7,gW,p8,A8=-90,_8=1,C$,P$,w$="\\[\\]\\.:\\/",hH,T$,xH,gH,pH,mH,lH,dH,uH,dN,S$;var y$=o8(()=>{KZ={};vW={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};_J=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Z7=Math.PI/180,T8=180/Math.PI;A9={DEG2RAD:Z7,RAD2DEG:T8,generateUUID:b8,clamp:d0,euclideanModulo:K$,mapLinear:eK,inverseLerp:JH,lerp:W7,damp:QH,pingpong:$H,smoothstep:ZH,smootherstep:WH,randInt:KH,randFloat:HH,randFloatSpread:YH,seededRandom:XH,degToRad:UH,radToDeg:GH,isPowerOfTwo:NH,ceilPowerOfTwo:EH,floorPowerOfTwo:qH,setQuaternionFromProperEuler:FH,normalize:jJ,denormalize:C8};g0=class g0{static{g0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=d0(this.x,J.x,Q.x),this.y=d0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=d0(this.x,J,Q),this.y=d0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(d0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(d0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=this.x-J.x,K=this.y-J.y;return this.x=W*$-K*Z+J.x,this.y=W*Z+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};_9=class _9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,W,K,H){let Y=$[Z+0],U=$[Z+1],X=$[Z+2],N=$[Z+3],E=W[K+0],G=W[K+1],D=W[K+2],k=W[K+3];if(N!==k||Y!==E||U!==G||X!==D){let I=Y*E+U*G+X*D+N*k;if(I<0)E=-E,G=-G,D=-D,k=-k,I=-I;let q=1-H;if(I<0.9995){let F=Math.acos(I),_=Math.sin(F);q=Math.sin(q*F)/_,H=Math.sin(H*F)/_,Y=Y*q+E*H,U=U*q+G*H,X=X*q+D*H,N=N*q+k*H}else{Y=Y*q+E*H,U=U*q+G*H,X=X*q+D*H,N=N*q+k*H;let F=1/Math.sqrt(Y*Y+U*U+X*X+N*N);Y*=F,U*=F,X*=F,N*=F}}J[Q]=Y,J[Q+1]=U,J[Q+2]=X,J[Q+3]=N}static multiplyQuaternionsFlat(J,Q,$,Z,W,K){let H=$[Z],Y=$[Z+1],U=$[Z+2],X=$[Z+3],N=W[K],E=W[K+1],G=W[K+2],D=W[K+3];return J[Q]=H*D+X*N+Y*G-U*E,J[Q+1]=Y*D+X*E+U*N-H*G,J[Q+2]=U*D+X*G+H*E-Y*N,J[Q+3]=X*D-H*N-Y*E-U*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:W,_order:K}=J,H=Math.cos,Y=Math.sin,U=H($/2),X=H(Z/2),N=H(W/2),E=Y($/2),G=Y(Z/2),D=Y(W/2);switch(K){case"XYZ":this._x=E*X*N+U*G*D,this._y=U*G*N-E*X*D,this._z=U*X*D+E*G*N,this._w=U*X*N-E*G*D;break;case"YXZ":this._x=E*X*N+U*G*D,this._y=U*G*N-E*X*D,this._z=U*X*D-E*G*N,this._w=U*X*N+E*G*D;break;case"ZXY":this._x=E*X*N-U*G*D,this._y=U*G*N+E*X*D,this._z=U*X*D+E*G*N,this._w=U*X*N-E*G*D;break;case"ZYX":this._x=E*X*N-U*G*D,this._y=U*G*N+E*X*D,this._z=U*X*D-E*G*N,this._w=U*X*N+E*G*D;break;case"YZX":this._x=E*X*N+U*G*D,this._y=U*G*N+E*X*D,this._z=U*X*D-E*G*N,this._w=U*X*N-E*G*D;break;case"XZY":this._x=E*X*N-U*G*D,this._y=U*G*N-E*X*D,this._z=U*X*D+E*G*N,this._w=U*X*N+E*G*D;break;default:C0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],W=Q[8],K=Q[1],H=Q[5],Y=Q[9],U=Q[2],X=Q[6],N=Q[10],E=$+H+N;if(E>0){let G=0.5/Math.sqrt(E+1);this._w=0.25/G,this._x=(X-Y)*G,this._y=(W-U)*G,this._z=(K-Z)*G}else if($>H&&$>N){let G=2*Math.sqrt(1+$-H-N);this._w=(X-Y)/G,this._x=0.25*G,this._y=(Z+K)/G,this._z=(W+U)/G}else if(H>N){let G=2*Math.sqrt(1+H-$-N);this._w=(W-U)/G,this._x=(Z+K)/G,this._y=0.25*G,this._z=(Y+X)/G}else{let G=2*Math.sqrt(1+N-$-H);this._w=(K-Z)/G,this._x=(W+U)/G,this._y=(Y+X)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(d0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,H=Q._x,Y=Q._y,U=Q._z,X=Q._w;return this._x=$*X+K*H+Z*U-W*Y,this._y=Z*X+K*Y+W*H-$*U,this._z=W*X+K*U+$*Y-Z*H,this._w=K*X-$*H-Z*Y-W*U,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,H=this.dot(J);if(H<0)$=-$,Z=-Z,W=-W,K=-K,H=-H;let Y=1-Q;if(H<0.9995){let U=Math.acos(H),X=Math.sin(U);Y=Math.sin(Y*U)/X,Q=Math.sin(Q*U)/X,this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+K*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),W=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};y=class y{static{y.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(YZ.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(YZ.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6]*Z,this.y=W[1]*Q+W[4]*$+W[7]*Z,this.z=W[2]*Q+W[5]*$+W[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements,K=1/(W[3]*Q+W[7]*$+W[11]*Z+W[15]);return this.x=(W[0]*Q+W[4]*$+W[8]*Z+W[12])*K,this.y=(W[1]*Q+W[5]*$+W[9]*Z+W[13])*K,this.z=(W[2]*Q+W[6]*$+W[10]*Z+W[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,W=J.x,K=J.y,H=J.z,Y=J.w,U=2*(K*Z-H*$),X=2*(H*Q-W*Z),N=2*(W*$-K*Q);return this.x=Q+Y*U+K*N-H*X,this.y=$+Y*X+H*U-W*N,this.z=Z+Y*N+W*X-K*U,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z,this.y=W[1]*Q+W[5]*$+W[9]*Z,this.z=W[2]*Q+W[6]*$+W[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=d0(this.x,J.x,Q.x),this.y=d0(this.y,J.y,Q.y),this.z=d0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=d0(this.x,J,Q),this.y=d0(this.y,J,Q),this.z=d0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(d0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:W}=J,K=Q.x,H=Q.y,Y=Q.z;return this.x=Z*Y-W*H,this.y=W*K-$*Y,this.z=$*H-Z*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return b6.copy(this).projectOnVector(J),this.sub(b6)}reflect(J){return this.sub(b6.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(d0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};b6=new y,YZ=new _9;y0=class y0{static{y0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,W,K,H,Y,U){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,H,Y,U)}set(J,Q,$,Z,W,K,H,Y,U){let X=this.elements;return X[0]=J,X[1]=Z,X[2]=H,X[3]=Q,X[4]=W,X[5]=Y,X[6]=$,X[7]=K,X[8]=U,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],H=$[3],Y=$[6],U=$[1],X=$[4],N=$[7],E=$[2],G=$[5],D=$[8],k=Z[0],I=Z[3],q=Z[6],F=Z[1],_=Z[4],C=Z[7],L=Z[2],A=Z[5],z=Z[8];return W[0]=K*k+H*F+Y*L,W[3]=K*I+H*_+Y*A,W[6]=K*q+H*C+Y*z,W[1]=U*k+X*F+N*L,W[4]=U*I+X*_+N*A,W[7]=U*q+X*C+N*z,W[2]=E*k+G*F+D*L,W[5]=E*I+G*_+D*A,W[8]=E*q+G*C+D*z,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],U=J[7],X=J[8];return Q*K*X-Q*H*U-$*W*X+$*H*Y+Z*W*U-Z*K*Y}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],U=J[7],X=J[8],N=X*K-H*U,E=H*Y-X*W,G=U*W-K*Y,D=Q*N+$*E+Z*G;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let k=1/D;return J[0]=N*k,J[1]=(Z*U-X*$)*k,J[2]=(H*$-Z*K)*k,J[3]=E*k,J[4]=(X*Q-Z*Y)*k,J[5]=(Z*W-H*Q)*k,J[6]=G*k,J[7]=($*Y-U*Q)*k,J[8]=(K*Q-$*W)*k,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,W,K,H){let Y=Math.cos(W),U=Math.sin(W);return this.set($*Y,$*U,-$*(Y*K+U*H)+K+J,-Z*U,Z*Y,-Z*(-U*K+Y*H)+H+Q,0,0,1),this}scale(J,Q){return i9("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(h6.makeScale(J,Q)),this}rotate(J){return i9("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(h6.makeRotation(-J)),this}translate(J,Q){return i9("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(h6.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}};h6=new y0,XZ=new y0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),UZ=new y0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);u0=DH();g6=new y;PJ=class PJ extends z9{constructor(J=PJ.DEFAULT_IMAGE,Q=PJ.DEFAULT_MAPPING,$=1001,Z=1001,W=1006,K=1008,H=1023,Y=1009,U=PJ.DEFAULT_ANISOTROPY,X=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:RH++}),this.uuid=b8(),this.name="",this.source=new N7(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=W,this.minFilter=K,this.anisotropy=U,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new g0(0,0),this.repeat=new g0(1,1),this.center=new g0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new y0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=X,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(g6).x}get height(){return this.source.getSize(g6).y}get depth(){return this.source.getSize(g6).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){C0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){C0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}};PJ.DEFAULT_IMAGE=null;PJ.DEFAULT_MAPPING=300;PJ.DEFAULT_ANISOTROPY=1;YJ=class YJ{static{YJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z+K[12]*W,this.y=K[1]*Q+K[5]*$+K[9]*Z+K[13]*W,this.z=K[2]*Q+K[6]*$+K[10]*Z+K[14]*W,this.w=K[3]*Q+K[7]*$+K[11]*Z+K[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,W,K=0.01,H=0.1,Y=J.elements,U=Y[0],X=Y[4],N=Y[8],E=Y[1],G=Y[5],D=Y[9],k=Y[2],I=Y[6],q=Y[10];if(Math.abs(X-E)<0.01&&Math.abs(N-k)<0.01&&Math.abs(D-I)<0.01){if(Math.abs(X+E)<0.1&&Math.abs(N+k)<0.1&&Math.abs(D+I)<0.1&&Math.abs(U+G+q-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let _=(U+1)/2,C=(G+1)/2,L=(q+1)/2,A=(X+E)/4,z=(N+k)/4,P=(D+I)/4;if(_>C&&_>L)if(_<0.01)$=0,Z=0.707106781,W=0.707106781;else $=Math.sqrt(_),Z=A/$,W=z/$;else if(C>L)if(C<0.01)$=0.707106781,Z=0,W=0.707106781;else Z=Math.sqrt(C),$=A/Z,W=P/Z;else if(L<0.01)$=0.707106781,Z=0.707106781,W=0;else W=Math.sqrt(L),$=z/W,Z=P/W;return this.set($,Z,W,Q),this}let F=Math.sqrt((I-D)*(I-D)+(N-k)*(N-k)+(E-X)*(E-X));if(Math.abs(F)<0.001)F=1;return this.x=(I-D)/F,this.y=(N-k)/F,this.z=(E-X)/F,this.w=Math.acos((U+G+q-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=d0(this.x,J.x,Q.x),this.y=d0(this.y,J.y,Q.y),this.z=d0(this.z,J.z,Q.z),this.w=d0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=d0(this.x,J,Q),this.y=d0(this.y,J,Q),this.z=d0(this.z,J,Q),this.w=d0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(d0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Y$=class Y$ extends z9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new YJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new YJ(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},W=new PJ(Z),K=$.count;for(let H=0;H<K;H++)this.textures[H]=W.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,W=this.textures.length;Z<W;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new N7(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}};vJ=class vJ extends Y${constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}};F6=class F6 extends PJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}};X$=class X$ extends PJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};r0=class r0{static{r0.prototype.isMatrix4=!0}constructor(J,Q,$,Z,W,K,H,Y,U,X,N,E,G,D,k,I){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,H,Y,U,X,N,E,G,D,k,I)}set(J,Q,$,Z,W,K,H,Y,U,X,N,E,G,D,k,I){let q=this.elements;return q[0]=J,q[4]=Q,q[8]=$,q[12]=Z,q[1]=W,q[5]=K,q[9]=H,q[13]=Y,q[2]=U,q[6]=X,q[10]=N,q[14]=E,q[3]=G,q[7]=D,q[11]=k,q[15]=I,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r0().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/D8.setFromMatrixColumn(J,0).length(),W=1/D8.setFromMatrixColumn(J,1).length(),K=1/D8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*W,Q[5]=$[5]*W,Q[6]=$[6]*W,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z,K=Math.cos($),H=Math.sin($),Y=Math.cos(Z),U=Math.sin(Z),X=Math.cos(W),N=Math.sin(W);if(J.order==="XYZ"){let E=K*X,G=K*N,D=H*X,k=H*N;Q[0]=Y*X,Q[4]=-Y*N,Q[8]=U,Q[1]=G+D*U,Q[5]=E-k*U,Q[9]=-H*Y,Q[2]=k-E*U,Q[6]=D+G*U,Q[10]=K*Y}else if(J.order==="YXZ"){let E=Y*X,G=Y*N,D=U*X,k=U*N;Q[0]=E+k*H,Q[4]=D*H-G,Q[8]=K*U,Q[1]=K*N,Q[5]=K*X,Q[9]=-H,Q[2]=G*H-D,Q[6]=k+E*H,Q[10]=K*Y}else if(J.order==="ZXY"){let E=Y*X,G=Y*N,D=U*X,k=U*N;Q[0]=E-k*H,Q[4]=-K*N,Q[8]=D+G*H,Q[1]=G+D*H,Q[5]=K*X,Q[9]=k-E*H,Q[2]=-K*U,Q[6]=H,Q[10]=K*Y}else if(J.order==="ZYX"){let E=K*X,G=K*N,D=H*X,k=H*N;Q[0]=Y*X,Q[4]=D*U-G,Q[8]=E*U+k,Q[1]=Y*N,Q[5]=k*U+E,Q[9]=G*U-D,Q[2]=-U,Q[6]=H*Y,Q[10]=K*Y}else if(J.order==="YZX"){let E=K*Y,G=K*U,D=H*Y,k=H*U;Q[0]=Y*X,Q[4]=k-E*N,Q[8]=D*N+G,Q[1]=N,Q[5]=K*X,Q[9]=-H*X,Q[2]=-U*X,Q[6]=G*N+D,Q[10]=E-k*N}else if(J.order==="XZY"){let E=K*Y,G=K*U,D=H*Y,k=H*U;Q[0]=Y*X,Q[4]=-N,Q[8]=U*X,Q[1]=E*N+k,Q[5]=K*X,Q[9]=G*N-D,Q[2]=D*N-G,Q[6]=H*X,Q[10]=k*N+E}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(kH,J,MH)}lookAt(J,Q,$){let Z=this.elements;if(hJ.subVectors(J,Q),hJ.lengthSq()===0)hJ.z=1;if(hJ.normalize(),j9.crossVectors($,hJ),j9.lengthSq()===0){if(Math.abs($.z)===1)hJ.x+=0.0001;else hJ.z+=0.0001;hJ.normalize(),j9.crossVectors($,hJ)}return j9.normalize(),P7.crossVectors(hJ,j9),Z[0]=j9.x,Z[4]=P7.x,Z[8]=hJ.x,Z[1]=j9.y,Z[5]=P7.y,Z[9]=hJ.y,Z[2]=j9.z,Z[6]=P7.z,Z[10]=hJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],H=$[4],Y=$[8],U=$[12],X=$[1],N=$[5],E=$[9],G=$[13],D=$[2],k=$[6],I=$[10],q=$[14],F=$[3],_=$[7],C=$[11],L=$[15],A=Z[0],z=Z[4],P=Z[8],O=Z[12],B=Z[1],p=Z[5],w=Z[9],g=Z[13],s=Z[2],b=Z[6],u=Z[10],n=Z[14],f=Z[3],a=Z[7],e=Z[11],J0=Z[15];return W[0]=K*A+H*B+Y*s+U*f,W[4]=K*z+H*p+Y*b+U*a,W[8]=K*P+H*w+Y*u+U*e,W[12]=K*O+H*g+Y*n+U*J0,W[1]=X*A+N*B+E*s+G*f,W[5]=X*z+N*p+E*b+G*a,W[9]=X*P+N*w+E*u+G*e,W[13]=X*O+N*g+E*n+G*J0,W[2]=D*A+k*B+I*s+q*f,W[6]=D*z+k*p+I*b+q*a,W[10]=D*P+k*w+I*u+q*e,W[14]=D*O+k*g+I*n+q*J0,W[3]=F*A+_*B+C*s+L*f,W[7]=F*z+_*p+C*b+L*a,W[11]=F*P+_*w+C*u+L*e,W[15]=F*O+_*g+C*n+L*J0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[12],K=J[1],H=J[5],Y=J[9],U=J[13],X=J[2],N=J[6],E=J[10],G=J[14],D=J[3],k=J[7],I=J[11],q=J[15],F=Y*G-U*E,_=H*G-U*N,C=H*E-Y*N,L=K*G-U*X,A=K*E-Y*X,z=K*N-H*X;return Q*(k*F-I*_+q*C)-$*(D*F-I*L+q*A)+Z*(D*_-k*L+q*z)-W*(D*C-k*A+I*z)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[1],K=J[5],H=J[9],Y=J[2],U=J[6],X=J[10];return Q*(K*X-H*U)-$*(W*X-H*Y)+Z*(W*U-K*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],U=J[7],X=J[8],N=J[9],E=J[10],G=J[11],D=J[12],k=J[13],I=J[14],q=J[15],F=Q*H-$*K,_=Q*Y-Z*K,C=Q*U-W*K,L=$*Y-Z*H,A=$*U-W*H,z=Z*U-W*Y,P=X*k-N*D,O=X*I-E*D,B=X*q-G*D,p=N*I-E*k,w=N*q-G*k,g=E*q-G*I,s=F*g-_*w+C*p+L*B-A*O+z*P;if(s===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/s;return J[0]=(H*g-Y*w+U*p)*b,J[1]=(Z*w-$*g-W*p)*b,J[2]=(k*z-I*A+q*L)*b,J[3]=(E*A-N*z-G*L)*b,J[4]=(Y*B-K*g-U*O)*b,J[5]=(Q*g-Z*B+W*O)*b,J[6]=(I*C-D*z-q*_)*b,J[7]=(X*z-E*C+G*_)*b,J[8]=(K*w-H*B+U*P)*b,J[9]=($*B-Q*w-W*P)*b,J[10]=(D*A-k*C+q*F)*b,J[11]=(N*C-X*A-G*F)*b,J[12]=(H*O-K*p-Y*P)*b,J[13]=(Q*p-$*O+Z*P)*b,J[14]=(k*_-D*L-I*F)*b,J[15]=(X*L-N*_+E*F)*b,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=W,Q[1]*=$,Q[5]*=Z,Q[9]*=W,Q[2]*=$,Q[6]*=Z,Q[10]*=W,Q[3]*=$,Q[7]*=Z,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=1-$,K=J.x,H=J.y,Y=J.z,U=W*K,X=W*H;return this.set(U*K+$,U*H-Z*Y,U*Y+Z*H,0,U*H+Z*Y,X*H+$,X*Y-Z*K,0,U*Y-Z*H,X*Y+Z*K,W*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,W,K){return this.set(1,$,W,0,J,1,K,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,W=Q._x,K=Q._y,H=Q._z,Y=Q._w,U=W+W,X=K+K,N=H+H,E=W*U,G=W*X,D=W*N,k=K*X,I=K*N,q=H*N,F=Y*U,_=Y*X,C=Y*N,L=$.x,A=$.y,z=$.z;return Z[0]=(1-(k+q))*L,Z[1]=(G+C)*L,Z[2]=(D-_)*L,Z[3]=0,Z[4]=(G-C)*A,Z[5]=(1-(E+q))*A,Z[6]=(I+F)*A,Z[7]=0,Z[8]=(D+_)*z,Z[9]=(I-F)*z,Z[10]=(1-(E+k))*z,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let W=this.determinantAffine();if(W===0)return $.set(1,1,1),Q.identity(),this;let K=D8.set(Z[0],Z[1],Z[2]).length(),H=D8.set(Z[4],Z[5],Z[6]).length(),Y=D8.set(Z[8],Z[9],Z[10]).length();if(W<0)K=-K;sJ.copy(this);let U=1/K,X=1/H,N=1/Y;return sJ.elements[0]*=U,sJ.elements[1]*=U,sJ.elements[2]*=U,sJ.elements[4]*=X,sJ.elements[5]*=X,sJ.elements[6]*=X,sJ.elements[8]*=N,sJ.elements[9]*=N,sJ.elements[10]*=N,Q.setFromRotationMatrix(sJ),$.x=K,$.y=H,$.z=Y,this}makePerspective(J,Q,$,Z,W,K,H=2000,Y=!1){let U=this.elements,X=2*W/(Q-J),N=2*W/($-Z),E=(Q+J)/(Q-J),G=($+Z)/($-Z),D,k;if(Y)D=W/(K-W),k=K*W/(K-W);else if(H===2000)D=-(K+W)/(K-W),k=-2*K*W/(K-W);else if(H===2001)D=-K/(K-W),k=-K*W/(K-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return U[0]=X,U[4]=0,U[8]=E,U[12]=0,U[1]=0,U[5]=N,U[9]=G,U[13]=0,U[2]=0,U[6]=0,U[10]=D,U[14]=k,U[3]=0,U[7]=0,U[11]=-1,U[15]=0,this}makeOrthographic(J,Q,$,Z,W,K,H=2000,Y=!1){let U=this.elements,X=2/(Q-J),N=2/($-Z),E=-(Q+J)/(Q-J),G=-($+Z)/($-Z),D,k;if(Y)D=1/(K-W),k=K/(K-W);else if(H===2000)D=-2/(K-W),k=-(K+W)/(K-W);else if(H===2001)D=-1/(K-W),k=-W/(K-W);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return U[0]=X,U[4]=0,U[8]=0,U[12]=E,U[1]=0,U[5]=N,U[9]=0,U[13]=G,U[2]=0,U[6]=0,U[10]=D,U[14]=k,U[3]=0,U[7]=0,U[11]=0,U[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}};D8=new y,sJ=new r0,kH=new y(0,0,0),MH=new y(1,1,1),j9=new y,P7=new y,hJ=new y,GZ=new r0,NZ=new _9;Z9=class Z9{constructor(J=0,Q=0,$=0,Z=Z9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,W=Z[0],K=Z[4],H=Z[8],Y=Z[1],U=Z[5],X=Z[9],N=Z[2],E=Z[6],G=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(d0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-X,G),this._z=Math.atan2(-K,W);else this._x=Math.atan2(E,U),this._z=0;break;case"YXZ":if(this._x=Math.asin(-d0(X,-1,1)),Math.abs(X)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,U);else this._y=Math.atan2(-N,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(d0(E,-1,1)),Math.abs(E)<0.9999999)this._y=Math.atan2(-N,G),this._z=Math.atan2(-K,U);else this._y=0,this._z=Math.atan2(Y,W);break;case"ZYX":if(this._y=Math.asin(-d0(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(E,G),this._z=Math.atan2(Y,W);else this._x=0,this._z=Math.atan2(-K,U);break;case"YZX":if(this._z=Math.asin(d0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-X,U),this._y=Math.atan2(-N,W);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-d0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(E,U),this._y=Math.atan2(H,W);else this._x=Math.atan2(-X,G),this._y=0;break;default:C0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return GZ.makeRotationFromQuaternion(J),this.setFromRotationMatrix(GZ,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return NZ.setFromEuler(this),this.setFromQuaternion(NZ,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Z9.DEFAULT_ORDER="XYZ";EZ=new y,O8=new _9,D9=new r0,w7=new y,a8=new y,VH=new y,BH=new _9,qZ=new y(1,0,0),FZ=new y(0,1,0),DZ=new y(0,0,1),OZ={type:"added"},IH={type:"removed"},R8={type:"childadded",child:null},p6={type:"childremoved",child:null};WJ=class WJ extends z9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:LH++}),this.uuid=b8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=WJ.DEFAULT_UP.clone();let J=new y,Q=new Z9,$=new _9,Z=new y(1,1,1);function W(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(W),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new r0},normalMatrix:{value:new y0}}),this.matrix=new r0,this.matrixWorld=new r0,this.matrixAutoUpdate=WJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=WJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new D6,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return O8.setFromAxisAngle(J,Q),this.quaternion.multiply(O8),this}rotateOnWorldAxis(J,Q){return O8.setFromAxisAngle(J,Q),this.quaternion.premultiply(O8),this}rotateX(J){return this.rotateOnAxis(qZ,J)}rotateY(J){return this.rotateOnAxis(FZ,J)}rotateZ(J){return this.rotateOnAxis(DZ,J)}translateOnAxis(J,Q){return EZ.copy(J).applyQuaternion(this.quaternion),this.position.add(EZ.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(qZ,J)}translateY(J){return this.translateOnAxis(FZ,J)}translateZ(J){return this.translateOnAxis(DZ,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(D9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)w7.copy(J);else w7.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),a8.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)D9.lookAt(a8,w7,this.up);else D9.lookAt(w7,a8,this.up);if(this.quaternion.setFromRotationMatrix(D9),Z)D9.extractRotation(Z.matrixWorld),O8.setFromRotationMatrix(D9),this.quaternion.premultiply(O8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return T0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(OZ),R8.child=J,this.dispatchEvent(R8),R8.child=null;else T0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(IH),p6.child=J,this.dispatchEvent(p6),p6.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),D9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),D9.multiply(J.parent.matrixWorld);return J.applyMatrix4(D9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(OZ),R8.child=J,this.dispatchEvent(R8),R8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(a8,J,VH),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(a8,BH,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,W=this.matrix.elements;W[12]+=Q-W[0]*Q-W[4]*$-W[8]*Z,W[13]+=$-W[1]*Q-W[5]*$-W[9]*Z,W[14]+=Z-W[2]*Q-W[6]*$-W[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let W=this.children;for(let K=0,H=W.length;K<H;K++)W[K].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(this.static!==!1)Z.static=this.static;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((H)=>({...H})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function W(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=W(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let U=0,X=Y.length;U<X;U++){let N=Y[U];W(J.shapes,N)}else W(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,U=this.material.length;Y<U;Y++)H.push(W(J.materials,this.material[Y]));Z.material=H}else Z.material=W(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let H=0;H<this.children.length;H++)Z.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];Z.animations.push(W(J.animations,Y))}}if(Q){let H=K(J.geometries),Y=K(J.materials),U=K(J.textures),X=K(J.images),N=K(J.shapes),E=K(J.skeletons),G=K(J.animations),D=K(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(U.length>0)$.textures=U;if(X.length>0)$.images=X;if(N.length>0)$.shapes=N;if(E.length>0)$.skeletons=E;if(G.length>0)$.animations=G;if(D.length>0)$.nodes=D}return $.object=Z,$;function K(H){let Y=[];for(let U in H){let X=H[U];delete X.metadata,Y.push(X)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}};WJ.DEFAULT_UP=new y(0,1,0);WJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;WJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;uJ=class uJ extends WJ{constructor(){super();this.isGroup=!0,this.type="Group"}};zH={type:"move"};fW={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},y9={h:0,s:0,l:0},T7={h:0,s:0,l:0};S0=class S0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,u0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=u0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,u0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=u0.workingColorSpace){if(J=K$(J,1),Q=d0(Q,0,1),$=d0($,0,1),Q===0)this.r=this.g=this.b=$;else{let W=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-W;this.r=m6(K,W,J+0.3333333333333333),this.g=m6(K,W,J),this.b=m6(K,W,J-0.3333333333333333)}return u0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(W){if(W===void 0)return;if(parseFloat(W)<1)C0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,K=Z[1],H=Z[2];switch(K){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:C0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Z[1],K=W.length;if(K===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(W,16),Q);else C0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=fW[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else C0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=V9(J.r),this.g=V9(J.g),this.b=V9(J.b),this}copyLinearToSRGB(J){return this.r=P8(J.r),this.g=P8(J.g),this.b=P8(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return u0.workingToColorSpace(CJ.copy(this),J),Math.round(d0(CJ.r*255,0,255))*65536+Math.round(d0(CJ.g*255,0,255))*256+Math.round(d0(CJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=u0.workingColorSpace){u0.workingToColorSpace(CJ.copy(this),Q);let{r:$,g:Z,b:W}=CJ,K=Math.max($,Z,W),H=Math.min($,Z,W),Y,U,X=(H+K)/2;if(H===K)Y=0,U=0;else{let N=K-H;switch(U=X<=0.5?N/(K+H):N/(2-K-H),K){case $:Y=(Z-W)/N+(Z<W?6:0);break;case Z:Y=(W-$)/N+2;break;case W:Y=($-Z)/N+4;break}Y/=6}return J.h=Y,J.s=U,J.l=X,J}getRGB(J,Q=u0.workingColorSpace){return u0.workingToColorSpace(CJ.copy(this),Q),J.r=CJ.r,J.g=CJ.g,J.b=CJ.b,J}getStyle(J="srgb"){u0.workingToColorSpace(CJ.copy(this),J);let{r:Q,g:$,b:Z}=CJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(y9),this.setHSL(y9.h+J,y9.s+Q,y9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(y9),J.getHSL(T7);let $=W7(y9.h,T7.h,Q),Z=W7(y9.s,T7.s,Q),W=W7(y9.l,T7.l,Q);return this.setHSL($,Z,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*$+W[6]*Z,this.g=W[1]*Q+W[4]*$+W[7]*Z,this.b=W[2]*Q+W[5]*$+W[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};CJ=new S0;S0.NAMES=fW;Y9=class Y9 extends WJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Z9,this.environmentIntensity=1,this.environmentRotation=new Z9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}};iJ=new y,O9=new y,l6=new y,R9=new y,k8=new y,M8=new y,RZ=new y,d6=new y,u6=new y,c6=new y,n6=new YJ,s6=new YJ,i6=new YJ;k9=[new y,new y,new y,new y,new y,new y,new y,new y],oJ=new y,S7=new C9,L8=new y,V8=new y,B8=new y,v9=new y,f9=new y,u9=new y,r8=new y,j7=new y,y7=new y,c9=new y;DJ=new y,v7=new g0;wJ=class wJ extends z9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:AH++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,W=this.itemSize;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)v7.fromBufferAttribute(this,Q),v7.applyMatrix3(J),this.setXY(Q,v7.x,v7.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)DJ.fromBufferAttribute(this,Q),DJ.applyMatrix3(J),this.setXYZ(Q,DJ.x,DJ.y,DJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)DJ.fromBufferAttribute(this,Q),DJ.applyMatrix4(J),this.setXYZ(Q,DJ.x,DJ.y,DJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)DJ.fromBufferAttribute(this,Q),DJ.applyNormalMatrix(J),this.setXYZ(Q,DJ.x,DJ.y,DJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)DJ.fromBufferAttribute(this,Q),DJ.transformDirection(J),this.setXYZ(Q,DJ.x,DJ.y,DJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=C8($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=jJ($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=C8(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=jJ(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=C8(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=jJ(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=C8(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=jJ(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=C8(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=jJ(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=jJ(Q,this.array),$=jJ($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=jJ(Q,this.array),$=jJ($,this.array),Z=jJ(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J*=this.itemSize,this.normalized)Q=jJ(Q,this.array),$=jJ($,this.array),Z=jJ(Z,this.array),W=jJ(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}};O6=class O6 extends wJ{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}};R6=class R6 extends wJ{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}};HJ=class HJ extends wJ{constructor(J,Q,$){super(new Float32Array(J),Q,$)}};_H=new C9,t8=new y,a6=new y;lJ=new r0,r6=new WJ,I8=new y,xJ=new C9,e8=new C9,LJ=new y;FJ=class FJ extends z9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:CH++}),this.uuid=b8(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((rK(J))?R6:O6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let W=new y0().getNormalMatrix(J);$.applyNormalMatrix(W),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return lJ.makeRotationFromQuaternion(J),this.applyMatrix4(lJ),this}rotateX(J){return lJ.makeRotationX(J),this.applyMatrix4(lJ),this}rotateY(J){return lJ.makeRotationY(J),this.applyMatrix4(lJ),this}rotateZ(J){return lJ.makeRotationZ(J),this.applyMatrix4(lJ),this}translate(J,Q,$){return lJ.makeTranslation(J,Q,$),this.applyMatrix4(lJ),this}scale(J,Q,$){return lJ.makeScale(J,Q,$),this.applyMatrix4(lJ),this}lookAt(J){return r6.lookAt(J),r6.updateMatrix(),this.applyMatrix4(r6.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(I8).negate(),this.translate(I8.x,I8.y,I8.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,W=J.length;Z<W;Z++){let K=J[Z];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new HJ($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let W=J[Z];Q.setXYZ(Z,W.x,W.y,W.z||0)}if(J.length>Q.count)C0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new C9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){T0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new y(-1/0,-1/0,-1/0),new y(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(xJ.setFromBufferAttribute(W),this.morphTargetsRelative)LJ.addVectors(this.boundingBox.min,xJ.min),this.boundingBox.expandByPoint(LJ),LJ.addVectors(this.boundingBox.max,xJ.max),this.boundingBox.expandByPoint(LJ);else this.boundingBox.expandByPoint(xJ.min),this.boundingBox.expandByPoint(xJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))T0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new P9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){T0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new y,1/0);return}if(J){let $=this.boundingSphere.center;if(xJ.setFromBufferAttribute(J),Q)for(let W=0,K=Q.length;W<K;W++){let H=Q[W];if(e8.setFromBufferAttribute(H),this.morphTargetsRelative)LJ.addVectors(xJ.min,e8.min),xJ.expandByPoint(LJ),LJ.addVectors(xJ.max,e8.max),xJ.expandByPoint(LJ);else xJ.expandByPoint(e8.min),xJ.expandByPoint(e8.max)}xJ.getCenter($);let Z=0;for(let W=0,K=J.count;W<K;W++)LJ.fromBufferAttribute(J,W),Z=Math.max(Z,$.distanceToSquared(LJ));if(Q)for(let W=0,K=Q.length;W<K;W++){let H=Q[W],Y=this.morphTargetsRelative;for(let U=0,X=H.count;U<X;U++){if(LJ.fromBufferAttribute(H,U),Y)I8.fromBufferAttribute(J,U),LJ.add(I8);Z=Math.max(Z,$.distanceToSquared(LJ))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))T0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){T0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:W}=Q,K=this.getAttribute("tangent");if(K===void 0||K.count!==$.count)K=new wJ(new Float32Array(4*$.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let P=0;P<$.count;P++)H[P]=new y,Y[P]=new y;let U=new y,X=new y,N=new y,E=new g0,G=new g0,D=new g0,k=new y,I=new y;function q(P,O,B){U.fromBufferAttribute($,P),X.fromBufferAttribute($,O),N.fromBufferAttribute($,B),E.fromBufferAttribute(W,P),G.fromBufferAttribute(W,O),D.fromBufferAttribute(W,B),X.sub(U),N.sub(U),G.sub(E),D.sub(E);let p=1/(G.x*D.y-D.x*G.y);if(!isFinite(p))return;k.copy(X).multiplyScalar(D.y).addScaledVector(N,-G.y).multiplyScalar(p),I.copy(N).multiplyScalar(G.x).addScaledVector(X,-D.x).multiplyScalar(p),H[P].add(k),H[O].add(k),H[B].add(k),Y[P].add(I),Y[O].add(I),Y[B].add(I)}let F=this.groups;if(F.length===0)F=[{start:0,count:J.count}];for(let P=0,O=F.length;P<O;++P){let B=F[P],p=B.start,w=B.count;for(let g=p,s=p+w;g<s;g+=3)q(J.getX(g+0),J.getX(g+1),J.getX(g+2))}let _=new y,C=new y,L=new y,A=new y;function z(P){L.fromBufferAttribute(Z,P),A.copy(L);let O=H[P];_.copy(O),_.sub(L.multiplyScalar(L.dot(O))).normalize(),C.crossVectors(A,O);let p=C.dot(Y[P])<0?-1:1;K.setXYZW(P,_.x,_.y,_.z,p)}for(let P=0,O=F.length;P<O;++P){let B=F[P],p=B.start,w=B.count;for(let g=p,s=p+w;g<s;g+=3)z(J.getX(g+0)),z(J.getX(g+1)),z(J.getX(g+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new wJ(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let E=0,G=$.count;E<G;E++)$.setXYZ(E,0,0,0);let Z=new y,W=new y,K=new y,H=new y,Y=new y,U=new y,X=new y,N=new y;if(J)for(let E=0,G=J.count;E<G;E+=3){let D=J.getX(E+0),k=J.getX(E+1),I=J.getX(E+2);Z.fromBufferAttribute(Q,D),W.fromBufferAttribute(Q,k),K.fromBufferAttribute(Q,I),X.subVectors(K,W),N.subVectors(Z,W),X.cross(N),H.fromBufferAttribute($,D),Y.fromBufferAttribute($,k),U.fromBufferAttribute($,I),H.add(X),Y.add(X),U.add(X),$.setXYZ(D,H.x,H.y,H.z),$.setXYZ(k,Y.x,Y.y,Y.z),$.setXYZ(I,U.x,U.y,U.z)}else for(let E=0,G=Q.count;E<G;E+=3)Z.fromBufferAttribute(Q,E+0),W.fromBufferAttribute(Q,E+1),K.fromBufferAttribute(Q,E+2),X.subVectors(K,W),N.subVectors(Z,W),X.cross(N),$.setXYZ(E+0,X.x,X.y,X.z),$.setXYZ(E+1,X.x,X.y,X.z),$.setXYZ(E+2,X.x,X.y,X.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)LJ.fromBufferAttribute(J,Q),LJ.normalize(),J.setXYZ(Q,LJ.x,LJ.y,LJ.z)}toNonIndexed(){function J(H,Y){let{array:U,itemSize:X,normalized:N}=H,E=new U.constructor(Y.length*X),G=0,D=0;for(let k=0,I=Y.length;k<I;k++){if(H.isInterleavedBufferAttribute)G=Y[k]*H.data.stride+H.offset;else G=Y[k]*X;for(let q=0;q<X;q++)E[D++]=U[G++]}return new wJ(E,X,N)}if(this.index===null)return C0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new FJ,$=this.index.array,Z=this.attributes;for(let H in Z){let Y=Z[H],U=J(Y,$);Q.setAttribute(H,U)}let W=this.morphAttributes;for(let H in W){let Y=[],U=W[H];for(let X=0,N=U.length;X<N;X++){let E=U[X],G=J(E,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let U=K[H];Q.addGroup(U.start,U.count,U.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let U in Y)if(Y[U]!==void 0)J[U]=Y[U];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let U=$[Y];J.data.attributes[Y]=U.toJSON(J.data)}let Z={},W=!1;for(let Y in this.morphAttributes){let U=this.morphAttributes[Y],X=[];for(let N=0,E=U.length;N<E;N++){let G=U[N];X.push(G.toJSON(J.data))}if(X.length>0)Z[Y]=X,W=!0}if(W)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let U in Z){let X=Z[U];this.setAttribute(U,X.clone(Q))}let W=J.morphAttributes;for(let U in W){let X=[],N=W[U];for(let E=0,G=N.length;E<G;E++)X.push(N[E].clone(Q));this.morphAttributes[U]=X}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let U=0,X=K.length;U<X;U++){let N=K[U];this.addGroup(N.start,N.count,N.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};tJ=class tJ extends z9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:PH++}),this.uuid=b8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new S0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){C0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){C0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(W){let K=[];for(let H in W){let Y=W[H];delete Y.metadata,K.push(Y)}return K}if(Q){let W=Z(J.textures),K=Z(J.images);if(W.length>0)$.textures=W;if(K.length>0)$.images=K}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new S0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new g0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new g0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let W=0;W!==Z;++W)$[W]=Q[W].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}};M9=new y,t6=new y,f7=new y,b9=new y,e6=new y,b7=new y,JQ=new y;k6=class k6 extends tJ{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new S0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Z9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}};kZ=new r0,n9=new q7,h7=new P9,MZ=new y,x7=new y,g7=new y,p7=new y,QQ=new y,m7=new y,LZ=new y,l7=new y;XJ=class XJ extends WJ{constructor(J=new FJ,Q=new k6){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,W=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let H=this.morphTargetInfluences;if(W&&H){m7.set(0,0,0);for(let Y=0,U=W.length;Y<U;Y++){let X=H[Y],N=W[Y];if(X===0)continue;if(QQ.fromBufferAttribute(N,J),K)m7.addScaledVector(QQ,X);else m7.addScaledVector(QQ.sub(Q),X)}Q.add(m7)}return Q}raycast(J,Q){let $=this.geometry,Z=this.material,W=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(h7.copy($.boundingSphere),h7.applyMatrix4(W),n9.copy(J.ray).recast(J.near),h7.containsPoint(n9.origin)===!1){if(n9.intersectSphere(h7,MZ)===null)return;if(n9.origin.distanceToSquared(MZ)>(J.far-J.near)**2)return}if(kZ.copy(W).invert(),n9.copy(J.ray).applyMatrix4(kZ),$.boundingBox!==null){if(n9.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,n9)}_computeIntersections(J,Q,$){let Z,W=this.geometry,K=this.material,H=W.index,Y=W.attributes.position,U=W.attributes.uv,X=W.attributes.uv1,N=W.attributes.normal,E=W.groups,G=W.drawRange;if(H!==null)if(Array.isArray(K))for(let D=0,k=E.length;D<k;D++){let I=E[D],q=K[I.materialIndex],F=Math.max(I.start,G.start),_=Math.min(H.count,Math.min(I.start+I.count,G.start+G.count));for(let C=F,L=_;C<L;C+=3){let A=H.getX(C),z=H.getX(C+1),P=H.getX(C+2);if(Z=d7(this,q,J,$,U,X,N,A,z,P),Z)Z.faceIndex=Math.floor(C/3),Z.face.materialIndex=I.materialIndex,Q.push(Z)}}else{let D=Math.max(0,G.start),k=Math.min(H.count,G.start+G.count);for(let I=D,q=k;I<q;I+=3){let F=H.getX(I),_=H.getX(I+1),C=H.getX(I+2);if(Z=d7(this,K,J,$,U,X,N,F,_,C),Z)Z.faceIndex=Math.floor(I/3),Q.push(Z)}}else if(Y!==void 0)if(Array.isArray(K))for(let D=0,k=E.length;D<k;D++){let I=E[D],q=K[I.materialIndex],F=Math.max(I.start,G.start),_=Math.min(Y.count,Math.min(I.start+I.count,G.start+G.count));for(let C=F,L=_;C<L;C+=3){let A=C,z=C+1,P=C+2;if(Z=d7(this,q,J,$,U,X,N,A,z,P),Z)Z.faceIndex=Math.floor(C/3),Z.face.materialIndex=I.materialIndex,Q.push(Z)}}else{let D=Math.max(0,G.start),k=Math.min(Y.count,G.start+G.count);for(let I=D,q=k;I<q;I+=3){let F=I,_=I+1,C=I+2;if(Z=d7(this,K,J,$,U,X,N,F,_,C),Z)Z.faceIndex=Math.floor(I/3),Q.push(Z)}}}};h8=class h8 extends PJ{constructor(J=null,Q=1,$=1,Z,W,K,H,Y,U=1003,X=1003,N,E){super(null,K,H,Y,U,X,Z,W,N,E);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};e7=class e7 extends wJ{constructor(J,Q,$,Z=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}};z8=new r0,VZ=new r0,u7=[],BZ=new C9,TH=new r0,J7=new XJ,Q7=new P9;X9=class X9 extends XJ{constructor(J,Q,$){super(J,Q);this.isInstancedMesh=!0,this.instanceMatrix=new e7(new Float32Array($*16),16),this.instanceColor=null,this.morphTexture=null,this.count=$,this.boundingBox=null,this.boundingSphere=null;for(let Z=0;Z<$;Z++)this.setMatrixAt(Z,TH)}computeBoundingBox(){let J=this.geometry,Q=this.count;if(this.boundingBox===null)this.boundingBox=new C9;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,z8),BZ.copy(J.boundingBox).applyMatrix4(z8),this.boundingBox.union(BZ)}computeBoundingSphere(){let J=this.geometry,Q=this.count;if(this.boundingSphere===null)this.boundingSphere=new P9;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,z8),Q7.copy(J.boundingSphere).applyMatrix4(z8),this.boundingSphere.union(Q7)}copy(J,Q){if(super.copy(J,Q),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,Q){if(this.instanceColor===null)return Q.setRGB(1,1,1);else return Q.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,Q){return Q.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=this.morphTexture.source.data.data,W=$.length+1,K=J*W+1;for(let H=0;H<$.length;H++)$[H]=Z[K+H]}raycast(J,Q){let $=this.matrixWorld,Z=this.count;if(J7.geometry=this.geometry,J7.material=this.material,J7.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(Q7.copy(this.boundingSphere),Q7.applyMatrix4($),J.ray.intersectsSphere(Q7)===!1)return;for(let W=0;W<Z;W++){this.getMatrixAt(W,z8),VZ.multiplyMatrices($,z8),J7.matrixWorld=VZ,J7.raycast(J,u7);for(let K=0,H=u7.length;K<H;K++){let Y=u7[K];Y.instanceId=W,Y.object=this,Q.push(Y)}u7.length=0}}setColorAt(J,Q){if(this.instanceColor===null)this.instanceColor=new e7(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return Q.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,Q){return Q.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=$.length+1;if(this.morphTexture===null)this.morphTexture=new h8(new Float32Array(Z*this.count),Z,this.count,1028,1015);let W=this.morphTexture.source.data.data,K=0;for(let U=0;U<$.length;U++)K+=$[U];let H=this.geometry.morphTargetsRelative?1:1-K,Y=Z*J;return W[Y]=H,W.set($,Y+1),this}updateMorphTargets(){}dispose(){if(this.dispatchEvent({type:"dispose"}),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}};$Q=new y,SH=new y,jH=new y0;s9=new P9,yH=new g0(0.5,0.5),c7=new y;x8=class x8 extends tJ{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new S0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}};J6=new y,Q6=new y,IZ=new r0,$7=new q7,n7=new P9,ZQ=new y,zZ=new y;U$=class U$ extends WJ{constructor(J=new FJ,Q=new x8){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,W=Q.count;Z<W;Z++)J6.fromBufferAttribute(Q,Z-1),Q6.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=J6.distanceTo(Q6);J.setAttribute("lineDistance",new HJ($,1))}else C0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Line.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(n7.copy($.boundingSphere),n7.applyMatrix4(Z),n7.radius+=W,J.ray.intersectsSphere(n7)===!1)return;IZ.copy(Z).invert(),$7.copy(J.ray).applyMatrix4(IZ);let H=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,U=this.isLineSegments?2:1,X=$.index,E=$.attributes.position;if(X!==null){let G=Math.max(0,K.start),D=Math.min(X.count,K.start+K.count);for(let k=G,I=D-1;k<I;k+=U){let q=X.getX(k),F=X.getX(k+1),_=s7(this,J,$7,Y,q,F,k);if(_)Q.push(_)}if(this.isLineLoop){let k=X.getX(D-1),I=X.getX(G),q=s7(this,J,$7,Y,k,I,D-1);if(q)Q.push(q)}}else{let G=Math.max(0,K.start),D=Math.min(E.count,K.start+K.count);for(let k=G,I=D-1;k<I;k+=U){let q=s7(this,J,$7,Y,k,k+1,k);if(q)Q.push(q)}if(this.isLineLoop){let k=s7(this,J,$7,Y,D-1,G,D-1);if(k)Q.push(k)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}};AZ=new y,_Z=new y;Z8=class Z8 extends U${constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,W=Q.count;Z<W;Z+=2)AZ.fromBufferAttribute(Q,Z),_Z.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+AZ.distanceTo(_Z);J.setAttribute("lineDistance",new HJ($,1))}else C0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};G$=class G$ extends tJ{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new S0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}};CZ=new r0,KQ=new q7,i7=new P9,o7=new y;M6=class M6 extends WJ{constructor(J=new FJ,Q=new G$){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Points.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(i7.copy($.boundingSphere),i7.applyMatrix4(Z),i7.radius+=W,J.ray.intersectsSphere(i7)===!1)return;CZ.copy(Z).invert(),KQ.copy(J.ray).applyMatrix4(CZ);let H=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,U=$.index,N=$.attributes.position;if(U!==null){let E=Math.max(0,K.start),G=Math.min(U.count,K.start+K.count);for(let D=E,k=G;D<k;D++){let I=U.getX(D);o7.fromBufferAttribute(N,I),PZ(o7,I,Y,Z,J,Q,this)}}else{let E=Math.max(0,K.start),G=Math.min(N.count,K.start+K.count);for(let D=E,k=G;D<k;D++)o7.fromBufferAttribute(N,D),PZ(o7,D,Y,Z,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}};L6=class L6 extends PJ{constructor(J=[],Q=301,$,Z,W,K,H,Y,U,X){super(J,Q,$,Z,W,K,H,Y,U,X);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}};U9=class U9 extends PJ{constructor(J,Q,$=1014,Z,W,K,H=1003,Y=1003,U,X=1026,N=1){if(X!==1026&&X!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let E={width:J,height:Q,depth:N};super(E,Z,W,K,H,Y,X,$,U);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new N7(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}};N$=class N$ extends U9{constructor(J,Q=1014,$=301,Z,W,K=1003,H=1003,Y,U=1026){let X={width:J,height:J,depth:1},N=[X,X,X,X,X,X];super(J,J,Q,$,Z,W,K,H,Y,U);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}};V6=class V6 extends PJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}};g9=class g9 extends FJ{constructor(J=1,Q=1,$=1,Z=1,W=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:W,depthSegments:K};let H=this;Z=Math.floor(Z),W=Math.floor(W),K=Math.floor(K);let Y=[],U=[],X=[],N=[],E=0,G=0;D("z","y","x",-1,-1,$,Q,J,K,W,0),D("z","y","x",1,-1,$,Q,-J,K,W,1),D("x","z","y",1,1,J,$,Q,Z,K,2),D("x","z","y",1,-1,J,$,-Q,Z,K,3),D("x","y","z",1,-1,J,Q,$,Z,W,4),D("x","y","z",-1,-1,J,Q,-$,Z,W,5),this.setIndex(Y),this.setAttribute("position",new HJ(U,3)),this.setAttribute("normal",new HJ(X,3)),this.setAttribute("uv",new HJ(N,2));function D(k,I,q,F,_,C,L,A,z,P,O){let B=C/z,p=L/P,w=C/2,g=L/2,s=A/2,b=z+1,u=P+1,n=0,f=0,a=new y;for(let e=0;e<u;e++){let J0=e*p-g;for(let E0=0;E0<b;E0++){let R0=E0*B-w;a[k]=R0*F,a[I]=J0*_,a[q]=s,U.push(a.x,a.y,a.z),a[k]=0,a[I]=0,a[q]=A>0?1:-1,X.push(a.x,a.y,a.z),N.push(E0/z),N.push(1-e/P),n+=1}}for(let e=0;e<P;e++)for(let J0=0;J0<z;J0++){let E0=E+J0+b*e,R0=E+J0+b*(e+1),n0=E+(J0+1)+b*(e+1),w0=E+(J0+1)+b*e;Y.push(E0,R0,w0),Y.push(R0,n0,w0),f+=6}H.addGroup(G,f,O),G+=f,E+=n}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new g9(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}};W8=class W8 extends FJ{constructor(J=1,Q=1,$=1,Z=32,W=1,K=!1,H=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:W,openEnded:K,thetaStart:H,thetaLength:Y};let U=this;Z=Math.floor(Z),W=Math.floor(W);let X=[],N=[],E=[],G=[],D=0,k=[],I=$/2,q=0;if(F(),K===!1){if(J>0)_(!0);if(Q>0)_(!1)}this.setIndex(X),this.setAttribute("position",new HJ(N,3)),this.setAttribute("normal",new HJ(E,3)),this.setAttribute("uv",new HJ(G,2));function F(){let C=new y,L=new y,A=0,z=(Q-J)/$;for(let P=0;P<=W;P++){let O=[],B=P/W,p=B*(Q-J)+J;for(let w=0;w<=Z;w++){let g=w/Z,s=g*Y+H,b=Math.sin(s),u=Math.cos(s);L.x=p*b,L.y=-B*$+I,L.z=p*u,N.push(L.x,L.y,L.z),C.set(b,z,u).normalize(),E.push(C.x,C.y,C.z),G.push(g,1-B),O.push(D++)}k.push(O)}for(let P=0;P<Z;P++)for(let O=0;O<W;O++){let B=k[O][P],p=k[O+1][P],w=k[O+1][P+1],g=k[O][P+1];if(J>0||O!==0)X.push(B,p,g),A+=3;if(Q>0||O!==W-1)X.push(p,w,g),A+=3}U.addGroup(q,A,0),q+=A}function _(C){let L=D,A=new g0,z=new y,P=0,O=C===!0?J:Q,B=C===!0?1:-1;for(let w=1;w<=Z;w++)N.push(0,I*B,0),E.push(0,B,0),G.push(0.5,0.5),D++;let p=D;for(let w=0;w<=Z;w++){let s=w/Z*Y+H,b=Math.cos(s),u=Math.sin(s);z.x=O*u,z.y=I*B,z.z=O*b,N.push(z.x,z.y,z.z),E.push(0,B,0),A.x=b*0.5+0.5,A.y=u*0.5*B+0.5,G.push(A.x,A.y),D++}for(let w=0;w<Z;w++){let g=L+w,s=p+w;if(C===!0)X.push(s,s+1,g);else X.push(s+1,s,g);P+=3}U.addGroup(q,P,C===!0?1:2),q+=P}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new W8(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}};K8=class K8 extends FJ{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let W=J/2,K=Q/2,H=Math.floor($),Y=Math.floor(Z),U=H+1,X=Y+1,N=J/H,E=Q/Y,G=[],D=[],k=[],I=[];for(let q=0;q<X;q++){let F=q*E-K;for(let _=0;_<U;_++){let C=_*N-W;D.push(C,-F,0),k.push(0,0,1),I.push(_/H),I.push(1-q/Y)}}for(let q=0;q<Y;q++)for(let F=0;F<H;F++){let _=F+U*q,C=F+U*(q+1),L=F+1+U*(q+1),A=F+1+U*q;G.push(_,C,A),G.push(C,L,A)}this.setIndex(G),this.setAttribute("position",new HJ(D,3)),this.setAttribute("normal",new HJ(k,3)),this.setAttribute("uv",new HJ(I,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new K8(J.width,J.height,J.widthSegments,J.heightSegments)}};H8=class H8 extends FJ{constructor(J=1,Q=32,$=16,Z=0,W=Math.PI*2,K=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:$,phiStart:Z,phiLength:W,thetaStart:K,thetaLength:H},Q=Math.max(3,Math.floor(Q)),$=Math.max(2,Math.floor($));let Y=Math.min(K+H,Math.PI),U=0,X=[],N=new y,E=new y,G=[],D=[],k=[],I=[];for(let q=0;q<=$;q++){let F=[],_=q/$,C=K+_*H,L=J*Math.cos(C),A=Math.sqrt(J*J-L*L),z=0;if(q===0&&K===0)z=0.5/Q;else if(q===$&&Y===Math.PI)z=-0.5/Q;for(let P=0;P<=Q;P++){let O=P/Q,B=Z+O*W;N.x=-A*Math.cos(B),N.y=L,N.z=A*Math.sin(B),D.push(N.x,N.y,N.z),E.copy(N).normalize(),k.push(E.x,E.y,E.z),I.push(O+z,1-_),F.push(U++)}X.push(F)}for(let q=0;q<$;q++)for(let F=0;F<Q;F++){let _=X[q][F+1],C=X[q][F],L=X[q+1][F],A=X[q+1][F+1];if(q!==0||K>0)G.push(_,C,A);if(q!==$-1||Y<Math.PI)G.push(C,L,A)}this.setIndex(G),this.setAttribute("position",new HJ(D,3)),this.setAttribute("normal",new HJ(k,3)),this.setAttribute("uv",new HJ(I,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new H8(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}};bW={clone:Y8,merge:SJ};zJ=class zJ extends tJ{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fH,this.fragmentShader=bH,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=Y8(J.uniforms),this.uniformsGroups=vH(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let K=this.uniforms[Z].value;if(K&&K.isTexture)Q.uniforms[Z]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[Z]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[Z]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[Z]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[Z]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[Z]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[Z]={type:"m4",value:K.toArray()};else Q.uniforms[Z]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new S0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new g0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new y().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new YJ().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new y0().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new r0().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}};q$=class q$ extends zJ{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};p9=class p9 extends tJ{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new S0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new S0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new g0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Z9,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}};B6=class B6 extends p9{constructor(J){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new g0(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return d0(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(Q){this.ior=(1+0.4*Q)/(1-0.4*Q)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new S0(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new S0(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new S0(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(J)}get anisotropy(){return this._anisotropy}set anisotropy(J){if(this._anisotropy>0!==J>0)this.version++;this._anisotropy=J}get clearcoat(){return this._clearcoat}set clearcoat(J){if(this._clearcoat>0!==J>0)this.version++;this._clearcoat=J}get iridescence(){return this._iridescence}set iridescence(J){if(this._iridescence>0!==J>0)this.version++;this._iridescence=J}get dispersion(){return this._dispersion}set dispersion(J){if(this._dispersion>0!==J>0)this.version++;this._dispersion=J}get sheen(){return this._sheen}set sheen(J){if(this._sheen>0!==J>0)this.version++;this._sheen=J}get transmission(){return this._transmission}set transmission(J){if(this._transmission>0!==J>0)this.version++;this._transmission=J}copy(J){return super.copy(J),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=J.anisotropy,this.anisotropyRotation=J.anisotropyRotation,this.anisotropyMap=J.anisotropyMap,this.clearcoat=J.clearcoat,this.clearcoatMap=J.clearcoatMap,this.clearcoatRoughness=J.clearcoatRoughness,this.clearcoatRoughnessMap=J.clearcoatRoughnessMap,this.clearcoatNormalMap=J.clearcoatNormalMap,this.clearcoatNormalScale.copy(J.clearcoatNormalScale),this.dispersion=J.dispersion,this.ior=J.ior,this.iridescence=J.iridescence,this.iridescenceMap=J.iridescenceMap,this.iridescenceIOR=J.iridescenceIOR,this.iridescenceThicknessRange=[...J.iridescenceThicknessRange],this.iridescenceThicknessMap=J.iridescenceThicknessMap,this.sheen=J.sheen,this.sheenColor.copy(J.sheenColor),this.sheenColorMap=J.sheenColorMap,this.sheenRoughness=J.sheenRoughness,this.sheenRoughnessMap=J.sheenRoughnessMap,this.transmission=J.transmission,this.transmissionMap=J.transmissionMap,this.thickness=J.thickness,this.thicknessMap=J.thicknessMap,this.attenuationDistance=J.attenuationDistance,this.attenuationColor.copy(J.attenuationColor),this.specularIntensity=J.specularIntensity,this.specularIntensityMap=J.specularIntensityMap,this.specularColor.copy(J.specularColor),this.specularColorMap=J.specularColorMap,this}};I6=class I6 extends tJ{constructor(J){super();this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new S0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new S0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new g0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Z9,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.envMapIntensity=J.envMapIntensity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}};F$=class F$ extends tJ{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}};D$=class D$ extends tJ{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}};D7=class D7 extends tJ{constructor(J){super();this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new S0(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new g0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={MATCAP:""},this.color.copy(J.color),this.matcap=J.matcap,this.map=J.map,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.flatShading=J.flatShading,this.fog=J.fog,this}};O$=class O$ extends X8{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,W=J-2,K=J+1,H=Z[W],Y=Z[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,H=2*Q-$;break;case 2402:W=Z.length-2,H=Q+Z[W]-Z[W+1];break;default:W=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*$-Q;break;case 2402:K=1,Y=$+Z[1]-Z[0];break;default:K=J-1,Y=Q}let U=($-Q)*0.5,X=this.valueSize;this._weightPrev=U/(Q-H),this._weightNext=U/(Y-$),this._offsetPrev=W*X,this._offsetNext=K*X}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,U=Y-H,X=this._offsetPrev,N=this._offsetNext,E=this._weightPrev,G=this._weightNext,D=($-Q)/(Z-Q),k=D*D,I=k*D,q=-E*I+2*E*k-E*D,F=(1+E)*I+(-1.5-2*E)*k+(-0.5+E)*D+1,_=(-1-G)*I+(1.5+G)*k+0.5*D,C=G*I-G*k;for(let L=0;L!==H;++L)W[L]=q*K[X+L]+F*K[U+L]+_*K[Y+L]+C*K[N+L];return W}};R$=class R$ extends X8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,U=Y-H,X=($-Q)/(Z-Q),N=1-X;for(let E=0;E!==H;++E)W[E]=K[U+E]*N+K[Y+E]*X;return W}};k$=class k$ extends X8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}};M$=class M$ extends X8{interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,U=Y-H,X=this.inTangents,N=this.outTangents;if(!X||!N){let D=($-Q)/(Z-Q),k=1-D;for(let I=0;I!==H;++I)W[I]=K[U+I]*k+K[Y+I]*D;return W}let E=H*2,G=J-1;for(let D=0;D!==H;++D){let k=K[U+D],I=K[Y+D],q=G*E+D*2,F=N[q],_=N[q+1],C=J*E+D*2,L=X[C],A=X[C+1],z=($-Q)/(Z-Q),P,O,B,p,w;for(let g=0;g<8;g++){P=z*z,O=P*z,B=1-z,p=B*B,w=p*B;let b=w*Q+3*p*z*F+3*B*P*L+O*Z-$;if(Math.abs(b)<0.0000000001)break;let u=3*p*(F-Q)+6*B*z*(L-F)+3*P*(Z-L);if(Math.abs(u)<0.0000000001)break;z=z-b/u,z=Math.max(0,Math.min(1,z))}W[D]=w*k+3*p*z*_+3*B*P*A+O*I}return W}};nJ.prototype.ValueTypeName="";nJ.prototype.TimeBufferType=Float32Array;nJ.prototype.ValueBufferType=Float32Array;nJ.prototype.DefaultInterpolation=2301;U8=class U8 extends nJ{constructor(J,Q,$){super(J,Q,$)}};U8.prototype.ValueTypeName="bool";U8.prototype.ValueBufferType=Array;U8.prototype.DefaultInterpolation=2300;U8.prototype.InterpolantFactoryMethodLinear=void 0;U8.prototype.InterpolantFactoryMethodSmooth=void 0;L$=class L$ extends nJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}};L$.prototype.ValueTypeName="color";V$=class V$ extends nJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}};V$.prototype.ValueTypeName="number";B$=class B$ extends X8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=($-Q)/(Z-Q),U=J*H;for(let X=U+H;U!==X;U+=4)_9.slerpFlat(W,0,K,U-H,K,U,Y);return W}};z6=class z6 extends nJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new B$(this.times,this.values,this.getValueSize(),J)}};z6.prototype.ValueTypeName="quaternion";z6.prototype.InterpolantFactoryMethodSmooth=void 0;G8=class G8 extends nJ{constructor(J,Q,$){super(J,Q,$)}};G8.prototype.ValueTypeName="string";G8.prototype.ValueBufferType=Array;G8.prototype.DefaultInterpolation=2300;G8.prototype.InterpolantFactoryMethodLinear=void 0;G8.prototype.InterpolantFactoryMethodSmooth=void 0;I$=class I$ extends nJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}};I$.prototype.ValueTypeName="vector";hW=new z$;A$.DEFAULT_MATERIAL_NAME="__DEFAULT";O7=class O7 extends WJ{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new S0(J),this.intensity=Q}dispose(){this.dispatchEvent({type:"dispose"})}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}};A6=class A6 extends O7{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(WJ.DEFAULT_UP),this.updateMatrix(),this.groundColor=new S0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}};WQ=new r0,TZ=new y,SZ=new y;r7=new y,t7=new _9,$9=new y;g8=class g8 extends WJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new r0,this.projectionMatrix=new r0,this.projectionMatrixInverse=new r0,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(r7,t7,$9),$9.x===1&&$9.y===1&&$9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(r7,t7,$9.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(r7,t7,$9),$9.x===1&&$9.y===1&&$9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(r7,t7,$9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}};h9=new y,jZ=new g0,yZ=new g0;VJ=class VJ extends g8{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=T8*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(Z7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return T8*2*Math.atan(Math.tan(Z7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){h9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(h9.x,h9.y).multiplyScalar(-J/h9.z),h9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(h9.x,h9.y).multiplyScalar(-J/h9.z)}getViewSize(J,Q){return this.getViewBounds(J,jZ,yZ),Q.subVectors(yZ,jZ)}setViewOffset(J,Q,$,Z,W,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(Z7*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,W=-0.5*Z,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:U}=K;W+=K.offsetX*Z/Y,Q-=K.offsetY*$/U,Z*=K.width/Y,$*=K.height/U}let H=this.filmOffset;if(H!==0)W+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}};xW=class xW extends _${constructor(){super(new VJ(90,1,0.5,500));this.isPointLightShadow=!0}};_6=class _6 extends O7{constructor(J,Q,$=0,Z=2){super(J,Q);this.isPointLight=!0,this.type="PointLight",this.distance=$,this.decay=Z,this.shadow=new xW}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.distance=this.distance,Q.object.decay=this.decay,Q.object.shadow=this.shadow.toJSON(),Q}};R7=class R7 extends g8{constructor(J=-1,Q=1,$=1,Z=-1,W=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=W,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,W,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,W=$-J,K=$+J,H=Z+Q,Y=Z-Q;if(this.view!==null&&this.view.enabled){let U=(this.right-this.left)/this.view.fullWidth/this.zoom,X=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=U*this.view.offsetX,K=W+U*this.view.width,H-=X*this.view.offsetY,Y=H-X*this.view.height}this.projectionMatrix.makeOrthographic(W,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}};gW=class gW extends _${constructor(){super(new R7(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}};p8=class p8 extends O7{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(WJ.DEFAULT_UP),this.updateMatrix(),this.target=new WJ,this.shadow=new gW}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}};C$=class C$ extends WJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new VJ(A8,_8,J,Q);Z.layers=this.layers,this.add(Z);let W=new VJ(A8,_8,J,Q);W.layers=this.layers,this.add(W);let K=new VJ(A8,_8,J,Q);K.layers=this.layers,this.add(K);let H=new VJ(A8,_8,J,Q);H.layers=this.layers,this.add(H);let Y=new VJ(A8,_8,J,Q);Y.layers=this.layers,this.add(Y);let U=new VJ(A8,_8,J,Q);U.layers=this.layers,this.add(U)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,W,K,H,Y]=Q;for(let U of Q)this.remove(U);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let U of Q)this.add(U),U.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,K,H,Y,U,X]=this.children,N=J.getRenderTarget(),E=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let k=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let I=!1;if(J.isWebGLRenderer===!0)I=J.state.buffers.depth.getReversed();else I=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),I&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,1,Z),I&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,Z),I&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,Z),I&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,Z),I&&J.autoClear===!1)J.clearDepth();if(J.render(Q,U),$.texture.generateMipmaps=k,J.setRenderTarget($,5,Z),I&&J.autoClear===!1)J.clearDepth();J.render(Q,X),J.setRenderTarget(N,E,G),J.xr.enabled=D,$.texture.needsPMREMUpdate=!0}};P$=class P$ extends VJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}};hH=new RegExp("["+w$+"]","g"),T$="[^"+w$+"]",xH="[^"+w$.replace("\\.","")+"]",gH=/((?:WC+[\/:])*)/.source.replace("WC",T$),pH=/(WCOD+)?/.source.replace("WCOD",xH),mH=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",T$),lH=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",T$),dH=new RegExp("^"+gH+pH+mH+lH+"$"),uH=["material","materials","bones","map"];a0.Composite=pW;a0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};a0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};a0.prototype.GetterByBindingType=[a0.prototype._getValue_direct,a0.prototype._getValue_array,a0.prototype._getValue_arrayElement,a0.prototype._getValue_toArray];a0.prototype.SetterByBindingTypeAndVersioning=[[a0.prototype._setValue_direct,a0.prototype._setValue_direct_setNeedsUpdate,a0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[a0.prototype._setValue_array,a0.prototype._setValue_array_setNeedsUpdate,a0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[a0.prototype._setValue_arrayElement,a0.prototype._setValue_arrayElement_setNeedsUpdate,a0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[a0.prototype._setValue_fromArray,a0.prototype._setValue_fromArray_setNeedsUpdate,a0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];dN=new Float32Array(1);S$=class S${static{S$.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=$,W[3]=Z,this}};if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)C0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185"});function UK(){let J=null,Q=!1,$=null,Z=null;function W(K,H){$(K,H),Z=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(W),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function nH(J){let Q=new WeakMap;function $(Y,U){let{array:X,usage:N}=Y,E=X.byteLength,G=J.createBuffer();J.bindBuffer(U,G),J.bufferData(U,X,N),Y.onUploadCallback();let D;if(X instanceof Float32Array)D=J.FLOAT;else if(typeof Float16Array<"u"&&X instanceof Float16Array)D=J.HALF_FLOAT;else if(X instanceof Uint16Array)if(Y.isFloat16BufferAttribute)D=J.HALF_FLOAT;else D=J.UNSIGNED_SHORT;else if(X instanceof Int16Array)D=J.SHORT;else if(X instanceof Uint32Array)D=J.UNSIGNED_INT;else if(X instanceof Int32Array)D=J.INT;else if(X instanceof Int8Array)D=J.BYTE;else if(X instanceof Uint8Array)D=J.UNSIGNED_BYTE;else if(X instanceof Uint8ClampedArray)D=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+X);return{buffer:G,type:D,bytesPerElement:X.BYTES_PER_ELEMENT,version:Y.version,size:E}}function Z(Y,U,X){let{array:N,updateRanges:E}=U;if(J.bindBuffer(X,Y),E.length===0)J.bufferSubData(X,0,N);else{E.sort((D,k)=>D.start-k.start);let G=0;for(let D=1;D<E.length;D++){let k=E[G],I=E[D];if(I.start<=k.start+k.count+1)k.count=Math.max(k.count,I.start+I.count-k.start);else++G,E[G]=I}E.length=G+1;for(let D=0,k=E.length;D<k;D++){let I=E[D];J.bufferSubData(X,I.start*N.BYTES_PER_ELEMENT,N,I.start,I.count)}U.clearUpdateRanges()}U.onUploadCallback()}function W(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let U=Q.get(Y);if(U)J.deleteBuffer(U.buffer),Q.delete(Y)}function H(Y,U){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let N=Q.get(Y);if(!N||N.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let X=Q.get(Y);if(X===void 0)Q.set(Y,$(Y,U));else if(X.version<Y.version){if(X.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(X.buffer,Y,U),X.version=Y.version}}return{get:W,remove:K,update:H}}function PU(J,Q,$,Z,W,K){let H=new S0(0),Y=W===!0?0:1,U,X,N=null,E=0,G=null;function D(_){let C=_.isScene===!0?_.background:null;if(C&&C.isTexture){let L=_.backgroundBlurriness>0;C=Q.get(C,L)}return C}function k(_){let C=!1,L=D(_);if(L===null)q(H,Y);else if(L&&L.isColor)q(L,1),C=!0;let A=J.xr.getEnvironmentBlendMode();if(A==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(A==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||C)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function I(_,C){let L=D(C);if(L&&(L.isCubeTexture||L.mapping===X7)){if(X===void 0)X=new XJ(new g9(1,1,1),new zJ({name:"BackgroundCubeMaterial",uniforms:Y8(N9.backgroundCube.uniforms),vertexShader:N9.backgroundCube.vertexShader,fragmentShader:N9.backgroundCube.fragmentShader,side:TJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),X.geometry.deleteAttribute("uv"),X.onBeforeRender=function(A,z,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(X.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(X);if(X.material.uniforms.envMap.value=L,X.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,X.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,X.material.uniforms.backgroundRotation.value.setFromMatrix4(CU.makeRotationFromEuler(C.backgroundRotation)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1)X.material.uniforms.backgroundRotation.value.premultiply(GK);if(X.material.toneMapped=u0.getTransfer(L.colorSpace)!==QJ,N!==L||E!==L.version||G!==J.toneMapping)X.material.needsUpdate=!0,N=L,E=L.version,G=J.toneMapping;X.layers.enableAll(),_.unshift(X,X.geometry,X.material,0,0,null)}else if(L&&L.isTexture){if(U===void 0)U=new XJ(new K8(2,2),new zJ({name:"BackgroundMaterial",uniforms:Y8(N9.background.uniforms),vertexShader:N9.background.vertexShader,fragmentShader:N9.background.fragmentShader,side:j8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),Object.defineProperty(U.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(U);if(U.material.uniforms.t2D.value=L,U.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,U.material.toneMapped=u0.getTransfer(L.colorSpace)!==QJ,L.matrixAutoUpdate===!0)L.updateMatrix();if(U.material.uniforms.uvTransform.value.copy(L.matrix),N!==L||E!==L.version||G!==J.toneMapping)U.material.needsUpdate=!0,N=L,E=L.version,G=J.toneMapping;U.layers.enableAll(),_.unshift(U,U.geometry,U.material,0,0,null)}}function q(_,C){_.getRGB(C6,E$(J)),$.buffers.color.setClear(C6.r,C6.g,C6.b,C,K)}function F(){if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0;if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0}return{getClearColor:function(){return H},setClearColor:function(_,C=1){H.set(_),Y=C,q(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(_){Y=_,q(H,Y)},render:k,addToRenderList:I,dispose:F}}function wU(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},W=G(null),K=W,H=!1;function Y(w,g,s,b,u){let n=!1,f=E(w,b,s,g);if(K!==f)K=f,X(K.object);if(n=D(w,b,s,u),n)k(w,b,s,u);if(u!==null)Q.update(u,J.ELEMENT_ARRAY_BUFFER);if(n||H){if(H=!1,L(w,g,s,b),u!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(u).buffer)}}function U(){return J.createVertexArray()}function X(w){return J.bindVertexArray(w)}function N(w){return J.deleteVertexArray(w)}function E(w,g,s,b){let u=b.wireframe===!0,n=Z[g.id];if(n===void 0)n={},Z[g.id]=n;let f=w.isInstancedMesh===!0?w.id:0,a=n[f];if(a===void 0)a={},n[f]=a;let e=a[s.id];if(e===void 0)e={},a[s.id]=e;let J0=e[u];if(J0===void 0)J0=G(U()),e[u]=J0;return J0}function G(w){let g=[],s=[],b=[];for(let u=0;u<$;u++)g[u]=0,s[u]=0,b[u]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:g,enabledAttributes:s,attributeDivisors:b,object:w,attributes:{},index:null}}function D(w,g,s,b){let u=K.attributes,n=g.attributes,f=0,a=s.getAttributes();for(let e in a)if(a[e].location>=0){let E0=u[e],R0=n[e];if(R0===void 0){if(e==="instanceMatrix"&&w.instanceMatrix)R0=w.instanceMatrix;if(e==="instanceColor"&&w.instanceColor)R0=w.instanceColor}if(E0===void 0)return!0;if(E0.attribute!==R0)return!0;if(R0&&E0.data!==R0.data)return!0;f++}if(K.attributesNum!==f)return!0;if(K.index!==b)return!0;return!1}function k(w,g,s,b){let u={},n=g.attributes,f=0,a=s.getAttributes();for(let e in a)if(a[e].location>=0){let E0=n[e];if(E0===void 0){if(e==="instanceMatrix"&&w.instanceMatrix)E0=w.instanceMatrix;if(e==="instanceColor"&&w.instanceColor)E0=w.instanceColor}let R0={};if(R0.attribute=E0,E0&&E0.data)R0.data=E0.data;u[e]=R0,f++}K.attributes=u,K.attributesNum=f,K.index=b}function I(){let w=K.newAttributes;for(let g=0,s=w.length;g<s;g++)w[g]=0}function q(w){F(w,0)}function F(w,g){let{newAttributes:s,enabledAttributes:b,attributeDivisors:u}=K;if(s[w]=1,b[w]===0)J.enableVertexAttribArray(w),b[w]=1;if(u[w]!==g)J.vertexAttribDivisor(w,g),u[w]=g}function _(){let{newAttributes:w,enabledAttributes:g}=K;for(let s=0,b=g.length;s<b;s++)if(g[s]!==w[s])J.disableVertexAttribArray(s),g[s]=0}function C(w,g,s,b,u,n,f){if(f===!0)J.vertexAttribIPointer(w,g,s,u,n);else J.vertexAttribPointer(w,g,s,b,u,n)}function L(w,g,s,b){I();let u=b.attributes,n=s.getAttributes(),f=g.defaultAttributeValues;for(let a in n){let e=n[a];if(e.location>=0){let J0=u[a];if(J0===void 0){if(a==="instanceMatrix"&&w.instanceMatrix)J0=w.instanceMatrix;if(a==="instanceColor"&&w.instanceColor)J0=w.instanceColor}if(J0!==void 0){let{normalized:E0,itemSize:R0}=J0,n0=Q.get(J0);if(n0===void 0)continue;let{buffer:w0,type:d,bytesPerElement:Q0}=n0,K0=d===J.INT||d===J.UNSIGNED_INT||J0.gpuType===RQ;if(J0.isInterleavedBufferAttribute){let D0=J0.data,F0=D0.stride,f0=J0.offset;if(D0.isInstancedInterleavedBuffer){for(let b0=0;b0<e.locationSize;b0++)F(e.location+b0,D0.meshPerAttribute);if(w.isInstancedMesh!==!0&&b._maxInstanceCount===void 0)b._maxInstanceCount=D0.meshPerAttribute*D0.count}else for(let b0=0;b0<e.locationSize;b0++)q(e.location+b0);J.bindBuffer(J.ARRAY_BUFFER,w0);for(let b0=0;b0<e.locationSize;b0++)C(e.location+b0,R0/e.locationSize,d,E0,F0*Q0,(f0+R0/e.locationSize*b0)*Q0,K0)}else{if(J0.isInstancedBufferAttribute){for(let D0=0;D0<e.locationSize;D0++)F(e.location+D0,J0.meshPerAttribute);if(w.isInstancedMesh!==!0&&b._maxInstanceCount===void 0)b._maxInstanceCount=J0.meshPerAttribute*J0.count}else for(let D0=0;D0<e.locationSize;D0++)q(e.location+D0);J.bindBuffer(J.ARRAY_BUFFER,w0);for(let D0=0;D0<e.locationSize;D0++)C(e.location+D0,R0/e.locationSize,d,E0,R0*Q0,R0/e.locationSize*D0*Q0,K0)}}else if(f!==void 0){let E0=f[a];if(E0!==void 0)switch(E0.length){case 2:J.vertexAttrib2fv(e.location,E0);break;case 3:J.vertexAttrib3fv(e.location,E0);break;case 4:J.vertexAttrib4fv(e.location,E0);break;default:J.vertexAttrib1fv(e.location,E0)}}}}_()}function A(){B();for(let w in Z){let g=Z[w];for(let s in g){let b=g[s];for(let u in b){let n=b[u];for(let f in n)N(n[f].object),delete n[f];delete b[u]}}delete Z[w]}}function z(w){if(Z[w.id]===void 0)return;let g=Z[w.id];for(let s in g){let b=g[s];for(let u in b){let n=b[u];for(let f in n)N(n[f].object),delete n[f];delete b[u]}}delete Z[w.id]}function P(w){for(let g in Z){let s=Z[g];for(let b in s){let u=s[b];if(u[w.id]===void 0)continue;let n=u[w.id];for(let f in n)N(n[f].object),delete n[f];delete u[w.id]}}}function O(w){for(let g in Z){let s=Z[g],b=w.isInstancedMesh===!0?w.id:0,u=s[b];if(u===void 0)continue;for(let n in u){let f=u[n];for(let a in f)N(f[a].object),delete f[a];delete u[n]}if(delete s[b],Object.keys(s).length===0)delete Z[g]}}function B(){if(p(),H=!0,K===W)return;K=W,X(K.object)}function p(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:Y,reset:B,resetDefaultState:p,dispose:A,releaseStatesOfGeometry:z,releaseStatesOfObject:O,releaseStatesOfProgram:P,initAttributes:I,enableAttribute:q,disableUnusedAttributes:_}}function TU(J,Q,$){let Z;function W(U){Z=U}function K(U,X){J.drawArrays(Z,U,X),$.update(X,Z,1)}function H(U,X,N){if(N===0)return;J.drawArraysInstanced(Z,U,X,N),$.update(X,Z,N)}function Y(U,X,N){if(N===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,U,0,X,0,N);let G=0;for(let D=0;D<N;D++)G+=X[D];$.update(G,Z,1)}this.setMode=W,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function SU(J,Q,$,Z){let W;function K(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let P=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function H(P){if(P!==H9&&Z.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(P){let O=P===rJ&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(P!==gJ&&Z.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==B9&&!O)return!1;return!0}function U(P){if(P==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";P="mediump"}if(P==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let X=$.precision!==void 0?$.precision:"highp",N=U(X);if(N!==X)C0("WebGLRenderer:",X,"not supported, using",N,"instead."),X=N;let E=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)C0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),k=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),I=J.getParameter(J.MAX_TEXTURE_SIZE),q=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),F=J.getParameter(J.MAX_VERTEX_ATTRIBS),_=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),C=J.getParameter(J.MAX_VARYING_VECTORS),L=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),A=J.getParameter(J.MAX_SAMPLES),z=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:U,textureFormatReadable:H,textureTypeReadable:Y,precision:X,logarithmicDepthBuffer:E,reversedDepthBuffer:G,maxTextures:D,maxVertexTextures:k,maxTextureSize:I,maxCubemapSize:q,maxAttributes:F,maxVertexUniforms:_,maxVaryings:C,maxFragmentUniforms:L,maxSamples:A,samples:z}}function jU(J){let Q=this,$=null,Z=0,W=!1,K=!1,H=new L9,Y=new y0,U={value:null,needsUpdate:!1};this.uniform=U,this.numPlanes=0,this.numIntersection=0,this.init=function(E,G){let D=E.length!==0||G||Z!==0||W;return W=G,Z=E.length,D},this.beginShadows=function(){K=!0,N(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(E,G){$=N(E,G,0)},this.setState=function(E,G,D){let{clippingPlanes:k,clipIntersection:I,clipShadows:q}=E,F=J.get(E);if(!W||k===null||k.length===0||K&&!q)if(K)N(null);else X();else{let _=K?0:Z,C=_*4,L=F.clippingState||null;U.value=L,L=N(k,G,C,D);for(let A=0;A!==C;++A)L[A]=$[A];F.clippingState=L,this.numIntersection=I?this.numPlanes:0,this.numPlanes+=_}};function X(){if(U.value!==$)U.value=$,U.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function N(E,G,D,k){let I=E!==null?E.length:0,q=null;if(I!==0){if(q=U.value,k!==!0||q===null){let F=D+I*4,_=G.matrixWorldInverse;if(Y.getNormalMatrix(_),q===null||q.length<F)q=new Float32Array(F);for(let C=0,L=D;C!==I;++C,L+=4)H.copy(E[C]).applyMatrix4(_,Y),H.normal.toArray(q,L),q[L+3]=H.constant}U.value=q,U.needsUpdate=!0}return Q.numPlanes=I,Q.numIntersection=0,q}}class B7{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,W={}){let{size:K=256,position:H=vU}=W;v$=this._renderer.getRenderTarget(),f$=this._renderer.getActiveCubeFace(),b$=this._renderer.getActiveMipmapLevel(),h$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=cW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=uW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(v$,f$,b$),this._renderer.xr.enabled=h$,J.scissorTest=!1,m8(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===v8||J.mapping===a9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);v$=this._renderer.getRenderTarget(),f$=this._renderer.getActiveCubeFace(),b$=this._renderer.getActiveMipmapLevel(),h$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:IJ,minFilter:IJ,generateMipmaps:!1,type:rJ,format:H9,colorSpace:J$,depthBuffer:!1},Z=dW(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=dW(J,Q,$);let{_lodMax:W}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fU(W)),this._blurMaterial=hU(W,J,Q),this._ggxMaterial=bU(W,J,Q)}return Z}_compileMaterial(J){let Q=new XJ(new FJ,J);this._renderer.compile(Q,k7)}_sceneToCubeUV(J,Q,$,Z,W){let Y=new VJ(90,1,Q,$),U=[1,-1,1,1,1,1],X=[1,1,1,-1,-1,-1],N=this._renderer,E=N.autoClear,G=N.toneMapping;if(N.getClearColor(lW),N.toneMapping=aJ,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(Z),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new XJ(new g9,new k6({name:"PMREM.Background",side:TJ,depthWrite:!1,depthTest:!1}));let k=this._backgroundBox,I=k.material,q=!1,F=J.background;if(F){if(F.isColor)I.color.copy(F),J.background=null,q=!0}else I.color.copy(lW),q=!0;for(let _=0;_<6;_++){let C=_%3;if(C===0)Y.up.set(0,U[_],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x+X[_],W.y,W.z);else if(C===1)Y.up.set(0,0,U[_]),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y+X[_],W.z);else Y.up.set(0,U[_],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y,W.z+X[_]);let L=this._cubeSize;if(m8(Z,C*L,_>2?L:0,L,L),N.setRenderTarget(Z),q)N.render(k,Y);N.render(J,Y)}N.toneMapping=G,N.autoClear=E,J.background=F}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===v8||J.mapping===a9;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=cW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=uW();let W=Z?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=W;let H=W.uniforms;H.envMap.value=J;let Y=this._cubeSize;m8(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(K,k7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let W=1;W<Z;W++)this._applyGGXFilter(J,W-1,W);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,W=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[$];H.material=K;let Y=K.uniforms,U=$/(this._lodMeshes.length-1),X=Q/(this._lodMeshes.length-1),N=Math.sqrt(U*U-X*X),E=0+U*1.25,G=N*E,{_lodMax:D}=this,k=this._sizeLods[$],I=3*k*($>D-m9?$-D+m9:0),q=4*(this._cubeSize-k);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=D-Q,m8(W,I,q,3*k,2*k),Z.setRenderTarget(W),Z.render(H,k7),Y.envMap.value=W.texture,Y.roughness.value=0,Y.mipInt.value=D-$,m8(J,I,q,3*k,2*k),Z.setRenderTarget(J),Z.render(H,k7)}_blur(J,Q,$,Z,W){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,Z,"latitudinal",W),this._halfBlur(K,J,$,$,Z,"longitudinal",W)}_halfBlur(J,Q,$,Z,W,K,H){let Y=this._renderer,U=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")T0("blur direction must be either latitudinal or longitudinal!");let X=3,N=this._lodMeshes[Z];N.material=U;let E=U.uniforms,G=this._sizeLods[$]-1,D=isFinite(W)?Math.PI/(2*G):2*Math.PI/(2*N8-1),k=W/D,I=isFinite(W)?1+Math.floor(X*k):N8;if(I>N8)C0(`sigmaRadians, ${W}, is too large and will clip, as it requested ${I} samples when the maximum is set to ${N8}`);let q=[],F=0;for(let z=0;z<N8;++z){let P=z/k,O=Math.exp(-P*P/2);if(q.push(O),z===0)F+=O;else if(z<I)F+=2*O}for(let z=0;z<q.length;z++)q[z]=q[z]/F;if(E.envMap.value=J.texture,E.samples.value=I,E.weights.value=q,E.latitudinal.value=K==="latitudinal",H)E.poleAxis.value=H;let{_lodMax:_}=this;E.dTheta.value=D,E.mipInt.value=_-$;let C=this._sizeLods[Z],L=3*C*(Z>_-m9?Z-_+m9:0),A=4*(this._cubeSize-C);m8(Q,L,A,3*C,2*C),Y.setRenderTarget(Q),Y.render(N,k7)}}function fU(J){let Q=[],$=[],Z=[],W=J,K=J-m9+1+mW.length;for(let H=0;H<K;H++){let Y=Math.pow(2,W);Q.push(Y);let U=1/Y;if(H>J-m9)U=mW[H-J+m9-1];else if(H===0)U=0;$.push(U);let X=1/(Y-2),N=-X,E=1+X,G=[N,N,E,N,E,E,N,N,E,E,N,E],D=6,k=6,I=3,q=2,F=1,_=new Float32Array(I*k*D),C=new Float32Array(q*k*D),L=new Float32Array(F*k*D);for(let z=0;z<D;z++){let P=z%3*2/3-1,O=z>2?0:-1,B=[P,O,0,P+0.6666666666666666,O,0,P+0.6666666666666666,O+1,0,P,O,0,P+0.6666666666666666,O+1,0,P,O+1,0];_.set(B,I*k*z),C.set(G,q*k*z);let p=[z,z,z,z,z,z];L.set(p,F*k*z)}let A=new FJ;if(A.setAttribute("position",new wJ(_,I)),A.setAttribute("uv",new wJ(C,q)),A.setAttribute("faceIndex",new wJ(L,F)),Z.push(new XJ(A,null)),W>m9)W--}return{lodMeshes:Z,sizeLods:Q,sigmas:$}}function dW(J,Q,$){let Z=new vJ(J,Q,$);return Z.texture.mapping=X7,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function m8(J,Q,$,Z,W){J.viewport.set(Q,$,Z,W),J.scissor.set(Q,$,Z,W)}function bU(J,Q,$){return new zJ({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yU,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:w6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:W9,depthTest:!1,depthWrite:!1})}function hU(J,Q,$){let Z=new Float32Array(N8),W=new y(0,1,0);return new zJ({name:"SphericalGaussianBlur",defines:{n:N8,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:w6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:W9,depthTest:!1,depthWrite:!1})}function uW(){return new zJ({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:w6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:W9,depthTest:!1,depthWrite:!1})}function cW(){return new zJ({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:w6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:W9,depthTest:!1,depthWrite:!1})}function w6(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function xU(J){let Q=new WeakMap,$=new WeakMap,Z=null;function W(G,D=!1){if(G===null||G===void 0)return null;if(D)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let D=G.mapping;if(D===$6||D===Z6)if(Q.has(G)){let k=Q.get(G).texture;return Y(k,G.mapping)}else{let k=G.image;if(k&&k.height>0){let I=new l$(k.height);return I.fromEquirectangularTexture(J,G),Q.set(G,I),G.addEventListener("dispose",X),Y(I.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let D=G.mapping,k=D===$6||D===Z6,I=D===v8||D===a9;if(k||I){let q=$.get(G),F=q!==void 0?q.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==F){if(Z===null)Z=new B7(J);return q=k?Z.fromEquirectangular(G,q):Z.fromCubemap(G,q),q.texture.pmremVersion=G.pmremVersion,$.set(G,q),q.texture}else if(q!==void 0)return q.texture;else{let _=G.image;if(k&&_&&_.height>0||I&&_&&U(_)){if(Z===null)Z=new B7(J);return q=k?Z.fromEquirectangular(G):Z.fromCubemap(G),q.texture.pmremVersion=G.pmremVersion,$.set(G,q),G.addEventListener("dispose",N),q.texture}else return null}}}return G}function Y(G,D){if(D===$6)G.mapping=v8;else if(D===Z6)G.mapping=a9;return G}function U(G){let D=0,k=6;for(let I=0;I<k;I++)if(G[I]!==void 0)D++;return D===k}function X(G){let D=G.target;D.removeEventListener("dispose",X);let k=Q.get(D);if(k!==void 0)Q.delete(D),k.dispose()}function N(G){let D=G.target;D.removeEventListener("dispose",N);let k=$.get(D);if(k!==void 0)$.delete(D),k.dispose()}function E(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:W,dispose:E}}function gU(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let W=J.getExtension(Z);return Q[Z]=W,W}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let W=$(Z);if(W===null)i9("WebGLRenderer: "+Z+" extension not supported.");return W}}}function pU(J,Q,$,Z){let W={},K=new WeakMap;function H(E){let G=E.target;if(G.index!==null)Q.remove(G.index);for(let k in G.attributes)Q.remove(G.attributes[k]);G.removeEventListener("dispose",H),delete W[G.id];let D=K.get(G);if(D)Q.remove(D),K.delete(G);if(Z.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(E,G){if(W[G.id]===!0)return G;return G.addEventListener("dispose",H),W[G.id]=!0,$.memory.geometries++,G}function U(E){let G=E.attributes;for(let D in G)Q.update(G[D],J.ARRAY_BUFFER)}function X(E){let G=[],D=E.index,k=E.attributes.position,I=0;if(k===void 0)return;if(D!==null){let _=D.array;I=D.version;for(let C=0,L=_.length;C<L;C+=3){let A=_[C+0],z=_[C+1],P=_[C+2];G.push(A,z,z,P,P,A)}}else{let _=k.array;I=k.version;for(let C=0,L=_.length/3-1;C<L;C+=3){let A=C+0,z=C+1,P=C+2;G.push(A,z,z,P,P,A)}}let q=new(k.count>=65535?R6:O6)(G,1);q.version=I;let F=K.get(E);if(F)Q.remove(F);K.set(E,q)}function N(E){let G=K.get(E);if(G){let D=E.index;if(D!==null){if(G.version<D.version)X(E)}}else X(E);return K.get(E)}return{get:Y,update:U,getWireframeAttribute:N}}function mU(J,Q,$){let Z;function W(E){Z=E}let K,H;function Y(E){K=E.type,H=E.bytesPerElement}function U(E,G){J.drawElements(Z,G,K,E*H),$.update(G,Z,1)}function X(E,G,D){if(D===0)return;J.drawElementsInstanced(Z,G,K,E*H,D),$.update(G,Z,D)}function N(E,G,D){if(D===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,G,0,K,E,0,D);let I=0;for(let q=0;q<D;q++)I+=G[q];$.update(I,Z,1)}this.setMode=W,this.setIndex=Y,this.render=U,this.renderInstances=X,this.renderMultiDraw=N}function lU(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(K,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(K/3);break;case J.LINES:$.lines+=Y*(K/2);break;case J.LINE_STRIP:$.lines+=Y*(K-1);break;case J.LINE_LOOP:$.lines+=Y*K;break;case J.POINTS:$.points+=Y*K;break;default:T0("WebGLInfo: Unknown draw mode:",H);break}}function W(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:W,update:Z}}function dU(J,Q,$){let Z=new WeakMap,W=new YJ;function K(H,Y,U){let X=H.morphTargetInfluences,N=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,E=N!==void 0?N.length:0,G=Z.get(Y);if(G===void 0||G.count!==E){let B=function(){P.dispose(),Z.delete(Y),Y.removeEventListener("dispose",B)};if(G!==void 0)G.texture.dispose();let D=Y.morphAttributes.position!==void 0,k=Y.morphAttributes.normal!==void 0,I=Y.morphAttributes.color!==void 0,q=Y.morphAttributes.position||[],F=Y.morphAttributes.normal||[],_=Y.morphAttributes.color||[],C=0;if(D===!0)C=1;if(k===!0)C=2;if(I===!0)C=3;let L=Y.attributes.position.count*C,A=1;if(L>Q.maxTextureSize)A=Math.ceil(L/Q.maxTextureSize),L=Q.maxTextureSize;let z=new Float32Array(L*A*4*E),P=new F6(z,L,A,E);P.type=B9,P.needsUpdate=!0;let O=C*4;for(let p=0;p<E;p++){let w=q[p],g=F[p],s=_[p],b=L*A*4*p;for(let u=0;u<w.count;u++){let n=u*O;if(D===!0)W.fromBufferAttribute(w,u),z[b+n+0]=W.x,z[b+n+1]=W.y,z[b+n+2]=W.z,z[b+n+3]=0;if(k===!0)W.fromBufferAttribute(g,u),z[b+n+4]=W.x,z[b+n+5]=W.y,z[b+n+6]=W.z,z[b+n+7]=0;if(I===!0)W.fromBufferAttribute(s,u),z[b+n+8]=W.x,z[b+n+9]=W.y,z[b+n+10]=W.z,z[b+n+11]=s.itemSize===4?W.w:1}}G={count:E,texture:P,size:new g0(L,A)},Z.set(Y,G),Y.addEventListener("dispose",B)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)U.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let D=0;for(let I=0;I<X.length;I++)D+=X[I];let k=Y.morphTargetsRelative?1:1-D;U.getUniforms().setValue(J,"morphTargetBaseInfluence",k),U.getUniforms().setValue(J,"morphTargetInfluences",X)}U.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),U.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function uU(J,Q,$,Z,W){let K=new WeakMap;function H(X){let N=W.render.frame,E=X.geometry,G=Q.get(X,E);if(K.get(G)!==N)Q.update(G),K.set(G,N);if(X.isInstancedMesh){if(X.hasEventListener("dispose",U)===!1)X.addEventListener("dispose",U);if(K.get(X)!==N){if($.update(X.instanceMatrix,J.ARRAY_BUFFER),X.instanceColor!==null)$.update(X.instanceColor,J.ARRAY_BUFFER);K.set(X,N)}}if(X.isSkinnedMesh){let D=X.skeleton;if(K.get(D)!==N)D.update(),K.set(D,N)}return G}function Y(){K=new WeakMap}function U(X){let N=X.target;if(N.removeEventListener("dispose",U),Z.releaseStatesOfObject(N),$.remove(N.instanceMatrix),N.instanceColor!==null)$.remove(N.instanceColor)}return{update:H,dispose:Y}}function nU(J,Q,$,Z,W,K){let H=new vJ(Q,$,{type:J,depthBuffer:W,stencilBuffer:K,samples:Z?4:0,depthTexture:W?new U9(Q,$):void 0}),Y=new vJ(Q,$,{type:rJ,depthBuffer:!1,stencilBuffer:!1}),U=new FJ;U.setAttribute("position",new HJ([-1,3,0,-1,-1,0,3,-1,0],3)),U.setAttribute("uv",new HJ([0,2,0,0,2,0],2));let X=new q$({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),N=new XJ(U,X),E=new R7(-1,1,1,-1,0,1),G=null,D=null,k=!1,I,q=null,F=[],_=!1;this.setSize=function(C,L){H.setSize(C,L),Y.setSize(C,L);for(let A=0;A<F.length;A++){let z=F[A];if(z.setSize)z.setSize(C,L)}},this.setEffects=function(C){F=C,_=F.length>0&&F[0].isRenderPass===!0;let{width:L,height:A}=H;for(let z=0;z<F.length;z++){let P=F[z];if(P.setSize)P.setSize(L,A)}},this.begin=function(C,L){if(k)return!1;if(C.toneMapping===aJ&&F.length===0)return!1;if(q=L,L!==null){let{width:A,height:z}=L;if(H.width!==A||H.height!==z)this.setSize(A,z)}if(_===!1)C.setRenderTarget(H);return I=C.toneMapping,C.toneMapping=aJ,!0},this.hasRenderPass=function(){return _},this.end=function(C,L){C.toneMapping=I,k=!0;let A=H,z=Y;for(let P=0;P<F.length;P++){let O=F[P];if(O.enabled===!1)continue;if(O.render(C,z,A,L),O.needsSwap!==!1){let B=A;A=z,z=B}}if(G!==C.outputColorSpace||D!==C.toneMapping){if(G=C.outputColorSpace,D=C.toneMapping,X.defines={},u0.getTransfer(G)===QJ)X.defines.SRGB_TRANSFER="";let P=cU[D];if(P)X.defines[P]="";X.needsUpdate=!0}X.uniforms.tDiffuse.value=A.texture,C.setRenderTarget(q),C.render(N,E),q=null,k=!1},this.isCompositing=function(){return k},this.dispose=function(){if(H.depthTexture)H.depthTexture.dispose();H.dispose(),Y.dispose(),U.dispose(),X.dispose()}}function l8(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let W=Q*$,K=nW[W];if(K===void 0)K=new Float32Array(W),nW[W]=K;if(Q!==0){Z.toArray(K,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(K,Y)}return K}function RJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function kJ(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function T6(J,Q){let $=sW[Q];if($===void 0)$=new Int32Array(Q),sW[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function sU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function iU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(RJ($,Q))return;J.uniform2fv(this.addr,Q),kJ($,Q)}}function oU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(RJ($,Q))return;J.uniform3fv(this.addr,Q),kJ($,Q)}}function aU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(RJ($,Q))return;J.uniform4fv(this.addr,Q),kJ($,Q)}}function rU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(RJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),kJ($,Q)}else{if(RJ($,Z))return;aW.set(Z),J.uniformMatrix2fv(this.addr,!1,aW),kJ($,Z)}}function tU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(RJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),kJ($,Q)}else{if(RJ($,Z))return;oW.set(Z),J.uniformMatrix3fv(this.addr,!1,oW),kJ($,Z)}}function eU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(RJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),kJ($,Q)}else{if(RJ($,Z))return;iW.set(Z),J.uniformMatrix4fv(this.addr,!1,iW),kJ($,Z)}}function JG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function QG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(RJ($,Q))return;J.uniform2iv(this.addr,Q),kJ($,Q)}}function $G(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(RJ($,Q))return;J.uniform3iv(this.addr,Q),kJ($,Q)}}function ZG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(RJ($,Q))return;J.uniform4iv(this.addr,Q),kJ($,Q)}}function WG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function KG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(RJ($,Q))return;J.uniform2uiv(this.addr,Q),kJ($,Q)}}function HG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(RJ($,Q))return;J.uniform3uiv(this.addr,Q),kJ($,Q)}}function YG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(RJ($,Q))return;J.uniform4uiv(this.addr,Q),kJ($,Q)}}function XG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;let K;if(this.type===J.SAMPLER_2D_SHADOW)p$.compareFunction=$.isReversedDepthBuffer()?q6:E6,K=p$;else K=NK;$.setTexture2D(Q||K,W)}function UG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture3D(Q||qK,W)}function GG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTextureCube(Q||FK,W)}function NG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture2DArray(Q||EK,W)}function EG(J){switch(J){case 5126:return sU;case 35664:return iU;case 35665:return oU;case 35666:return aU;case 35674:return rU;case 35675:return tU;case 35676:return eU;case 5124:case 35670:return JG;case 35667:case 35671:return QG;case 35668:case 35672:return $G;case 35669:case 35673:return ZG;case 5125:return WG;case 36294:return KG;case 36295:return HG;case 36296:return YG;case 35678:case 36198:case 36298:case 36306:case 35682:return XG;case 35679:case 36299:case 36307:return UG;case 35680:case 36300:case 36308:case 36293:return GG;case 36289:case 36303:case 36311:case 36292:return NG}}function qG(J,Q){J.uniform1fv(this.addr,Q)}function FG(J,Q){let $=l8(Q,this.size,2);J.uniform2fv(this.addr,$)}function DG(J,Q){let $=l8(Q,this.size,3);J.uniform3fv(this.addr,$)}function OG(J,Q){let $=l8(Q,this.size,4);J.uniform4fv(this.addr,$)}function RG(J,Q){let $=l8(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function kG(J,Q){let $=l8(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function MG(J,Q){let $=l8(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function LG(J,Q){J.uniform1iv(this.addr,Q)}function VG(J,Q){J.uniform2iv(this.addr,Q)}function BG(J,Q){J.uniform3iv(this.addr,Q)}function IG(J,Q){J.uniform4iv(this.addr,Q)}function zG(J,Q){J.uniform1uiv(this.addr,Q)}function AG(J,Q){J.uniform2uiv(this.addr,Q)}function _G(J,Q){J.uniform3uiv(this.addr,Q)}function CG(J,Q){J.uniform4uiv(this.addr,Q)}function PG(J,Q,$){let Z=this.cache,W=Q.length,K=T6($,W);if(!RJ(Z,K))J.uniform1iv(this.addr,K),kJ(Z,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=p$;else H=NK;for(let Y=0;Y!==W;++Y)$.setTexture2D(Q[Y]||H,K[Y])}function wG(J,Q,$){let Z=this.cache,W=Q.length,K=T6($,W);if(!RJ(Z,K))J.uniform1iv(this.addr,K),kJ(Z,K);for(let H=0;H!==W;++H)$.setTexture3D(Q[H]||qK,K[H])}function TG(J,Q,$){let Z=this.cache,W=Q.length,K=T6($,W);if(!RJ(Z,K))J.uniform1iv(this.addr,K),kJ(Z,K);for(let H=0;H!==W;++H)$.setTextureCube(Q[H]||FK,K[H])}function SG(J,Q,$){let Z=this.cache,W=Q.length,K=T6($,W);if(!RJ(Z,K))J.uniform1iv(this.addr,K),kJ(Z,K);for(let H=0;H!==W;++H)$.setTexture2DArray(Q[H]||EK,K[H])}function jG(J){switch(J){case 5126:return qG;case 35664:return FG;case 35665:return DG;case 35666:return OG;case 35674:return RG;case 35675:return kG;case 35676:return MG;case 5124:case 35670:return LG;case 35667:case 35671:return VG;case 35668:case 35672:return BG;case 35669:case 35673:return IG;case 5125:return zG;case 36294:return AG;case 36295:return _G;case 36296:return CG;case 35678:case 36198:case 36298:case 36306:case 35682:return PG;case 35679:case 36299:case 36307:return wG;case 35680:case 36300:case 36308:case 36293:return TG;case 36289:case 36303:case 36311:case 36292:return SG}}class DK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=EG(Q.type)}}class OK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=jG(Q.type)}}class RK{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let W=0,K=Z.length;W!==K;++W){let H=Z[W];H.setValue(J,Q[H.id],$)}}}function rW(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function yG(J,Q,$){let Z=J.name,W=Z.length;x$.lastIndex=0;while(!0){let K=x$.exec(Z),H=x$.lastIndex,Y=K[1],U=K[2]==="]",X=K[3];if(U)Y=Y|0;if(X===void 0||X==="["&&H+2===W){rW($,X===void 0?new DK(Y,J,Q):new OK(Y,J,Q));break}else{let E=$.map[Y];if(E===void 0)E=new RK(Y),rW($,E);$=E}}}class V7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let H=J.getActiveUniform(Q,K),Y=J.getUniformLocation(Q,H.name);yG(H,Y,this)}let Z=[],W=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(K);else W.push(K);if(Z.length>0)this.seq=Z.concat(W)}setValue(J,Q,$,Z){let W=this.map[Q];if(W!==void 0)W.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let W=0,K=Q.length;W!==K;++W){let H=Q[W],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,W=J.length;Z!==W;++Z){let K=J[Z];if(K.id in Q)$.push(K)}return $}}function tW(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}function bG(J,Q){let $=J.split(`
`),Z=[],W=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let H=W;H<K;H++){let Y=H+1;Z.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return Z.join(`
`)}function hG(J){u0._getMatrix(eW,u0.workingColorSpace,J);let Q=`mat3( ${eW.elements.map(($)=>$.toFixed(4))} )`;switch(u0.getTransfer(J)){case Q$:return[Q,"LinearTransferOETF"];case QJ:return[Q,"sRGBTransferOETF"];default:return C0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function JK(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(Z&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+K+`

`+bG(J.getShaderSource(Q),Y)}else return K}function xG(J,Q){let $=hG(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}function pG(J,Q){let $=gG[Q];if($===void 0)return C0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}function mG(){u0.getLuminanceCoefficients(P6);let J=P6.x.toFixed(4),Q=P6.y.toFixed(4),$=P6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function lG(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(L7).join(`
`)}function dG(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function uG(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Z;W++){let K=J.getActiveAttrib(Q,W),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;$[H]={type:K.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function L7(J){return J!==""}function QK(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function $K(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}function m$(J){return J.replace(cG,sG)}function sG(J,Q){let $=m0[Q];if($===void 0){let Z=nG.get(Q);if(Z!==void 0)$=m0[Z],C0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return m$($)}function ZK(J){return J.replace(iG,oG)}function oG(J,Q,$,Z){let W="";for(let K=parseInt(Q);K<parseInt($);K++)W+=Z.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return W}function WK(J){let Q=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}function rG(J){return aG[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function eG(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return tG[J.envMapMode]||"ENVMAP_TYPE_CUBE"}function QN(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return JN[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}function ZN(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return $N[J.combine]||"ENVMAP_BLENDING_NONE"}function WN(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function KN(J,Q,$,Z){let W=J.getContext(),K=$.defines,H=$.vertexShader,Y=$.fragmentShader,U=rG($),X=eG($),N=QN($),E=ZN($),G=WN($),D=lG($),k=dG(K),I=W.createProgram(),q,F,_=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(q=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k].filter(L7).join(`
`),q.length>0)q+=`
`;if(F=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k].filter(L7).join(`
`),F.length>0)F+=`
`}else q=[WK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+N:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+U:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(L7).join(`
`),F=[WK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+X:"",$.envMap?"#define "+N:"",$.envMap?"#define "+E:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+U:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==aJ?"#define TONE_MAPPING":"",$.toneMapping!==aJ?m0.tonemapping_pars_fragment:"",$.toneMapping!==aJ?pG("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",m0.colorspace_pars_fragment,xG("linearToOutputTexel",$.outputColorSpace),mG(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(L7).join(`
`);if(H=m$(H),H=QK(H,$),H=$K(H,$),Y=m$(Y),Y=QK(Y,$),Y=$K(Y,$),H=ZK(H),Y=ZK(Y),$.isRawShaderMaterial!==!0)_=`#version 300 es
`,q=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+q,F=["#define varying in",$.glslVersion===$$?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===$$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+F;let C=_+q+H,L=_+F+Y,A=tW(W,W.VERTEX_SHADER,C),z=tW(W,W.FRAGMENT_SHADER,L);if(W.attachShader(I,A),W.attachShader(I,z),$.index0AttributeName!==void 0)W.bindAttribLocation(I,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)W.bindAttribLocation(I,0,"position");W.linkProgram(I);function P(w){if(J.debug.checkShaderErrors){let g=W.getProgramInfoLog(I)||"",s=W.getShaderInfoLog(A)||"",b=W.getShaderInfoLog(z)||"",u=g.trim(),n=s.trim(),f=b.trim(),a=!0,e=!0;if(W.getProgramParameter(I,W.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,I,A,z);else{let J0=JK(W,A,"vertex"),E0=JK(W,z,"fragment");T0("WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(I,W.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+u+`
`+J0+`
`+E0)}else if(u!=="")C0("WebGLProgram: Program Info Log:",u);else if(n===""||f==="")e=!1;if(e)w.diagnostics={runnable:a,programLog:u,vertexShader:{log:n,prefix:q},fragmentShader:{log:f,prefix:F}}}W.deleteShader(A),W.deleteShader(z),O=new V7(W,I),B=uG(W,I)}let O;this.getUniforms=function(){if(O===void 0)P(this);return O};let B;this.getAttributes=function(){if(B===void 0)P(this);return B};let p=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(p===!1)p=W.getProgramParameter(I,vG);return p},this.destroy=function(){Z.releaseStatesOfProgram(this),W.deleteProgram(I),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=fG++,this.cacheKey=Q,this.usedTimes=1,this.program=I,this.vertexShader=A,this.fragmentShader=z,this}class kK{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new MK(J),Q.set(J,$);return $}}class MK{constructor(J){this.id=HN++,this.code=J,this.usedTimes=0}}function YN(J){return J===J8||J===G6||J===N6}function XN(J,Q,$,Z,W,K){let H=new D6,Y=new kK,U=new Set,X=[],N=new Map,E=Z.logarithmicDepthBuffer,G=Z.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function k(O){if(U.add(O),O===0)return"uv";return`uv${O}`}function I(O,B,p,w,g,s){let b=w.fog,u=g.geometry,n=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?w.environment:null,f=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,a=Q.get(O.envMap||n,f),e=!!a&&a.mapping===X7?a.image.height:null,J0=D[O.type];if(O.precision!==null){if(G=Z.getMaxPrecision(O.precision),G!==O.precision)C0("WebGLProgram.getParameters:",O.precision,"not supported, using",G,"instead.")}let E0=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,R0=E0!==void 0?E0.length:0,n0=0;if(u.morphAttributes.position!==void 0)n0=1;if(u.morphAttributes.normal!==void 0)n0=2;if(u.morphAttributes.color!==void 0)n0=3;let w0,d,Q0,K0;if(J0){let v0=N9[J0];w0=v0.vertexShader,d=v0.fragmentShader}else{w0=O.vertexShader,d=O.fragmentShader;let v0=Y.getVertexShaderStage(O),GJ=Y.getFragmentShaderStage(O);Y.update(O,v0,GJ),Q0=v0.id,K0=GJ.id}let D0=J.getRenderTarget(),F0=J.state.buffers.depth.getReversed(),f0=g.isInstancedMesh===!0,b0=g.isBatchedMesh===!0,B0=!!O.map,x0=!!O.matcap,p0=!!a,j0=!!O.aoMap,UJ=!!O.lightMap,yJ=!!O.bumpMap&&O.wireframe===!1,c0=!!O.normalMap,BJ=!!O.displacementMap,MJ=!!O.emissiveMap,OJ=!!O.metalnessMap,j=!!O.roughnessMap,pJ=O.anisotropy>0,o0=O.clearcoat>0,KJ=O.dispersion>0,V=O.iridescence>0,R=O.sheen>0,T=O.transmission>0,l=pJ&&!!O.anisotropyMap,t=o0&&!!O.clearcoatMap,$0=o0&&!!O.clearcoatNormalMap,X0=o0&&!!O.clearcoatRoughnessMap,c=V&&!!O.iridescenceMap,o=V&&!!O.iridescenceThicknessMap,O0=R&&!!O.sheenColorMap,I0=R&&!!O.sheenRoughnessMap,U0=!!O.specularMap,Z0=!!O.specularColorMap,_0=!!O.specularIntensityMap,P0=T&&!!O.transmissionMap,i0=T&&!!O.thicknessMap,S=!!O.gradientMap,W0=!!O.alphaMap,i=O.alphaTest>0,H0=!!O.alphaHash,k0=!!O.extensions,r=aJ;if(O.toneMapped){if(D0===null||D0.isXRRenderTarget===!0)r=J.toneMapping}let Y0={shaderID:J0,shaderType:O.type,shaderName:O.name,vertexShader:w0,fragmentShader:d,defines:O.defines,customVertexShaderID:Q0,customFragmentShaderID:K0,isRawShaderMaterial:O.isRawShaderMaterial===!0,glslVersion:O.glslVersion,precision:G,batching:b0,batchingColor:b0&&g._colorsTexture!==null,instancing:f0,instancingColor:f0&&g.instanceColor!==null,instancingMorph:f0&&g.morphTexture!==null,outputColorSpace:D0===null?J.outputColorSpace:D0.isXRRenderTarget===!0?D0.texture.colorSpace:u0.workingColorSpace,alphaToCoverage:!!O.alphaToCoverage,map:B0,matcap:x0,envMap:p0,envMapMode:p0&&a.mapping,envMapCubeUVHeight:e,aoMap:j0,lightMap:UJ,bumpMap:yJ,normalMap:c0,displacementMap:BJ,emissiveMap:MJ,normalMapObjectSpace:c0&&O.normalMapType===zW,normalMapTangentSpace:c0&&O.normalMapType===eQ,packedNormalMap:c0&&O.normalMapType===eQ&&YN(O.normalMap.format),metalnessMap:OJ,roughnessMap:j,anisotropy:pJ,anisotropyMap:l,clearcoat:o0,clearcoatMap:t,clearcoatNormalMap:$0,clearcoatRoughnessMap:X0,dispersion:KJ,iridescence:V,iridescenceMap:c,iridescenceThicknessMap:o,sheen:R,sheenColorMap:O0,sheenRoughnessMap:I0,specularMap:U0,specularColorMap:Z0,specularIntensityMap:_0,transmission:T,transmissionMap:P0,thicknessMap:i0,gradientMap:S,opaque:O.transparent===!1&&O.blending===Y7&&O.alphaToCoverage===!1,alphaMap:W0,alphaTest:i,alphaHash:H0,combine:O.combine,mapUv:B0&&k(O.map.channel),aoMapUv:j0&&k(O.aoMap.channel),lightMapUv:UJ&&k(O.lightMap.channel),bumpMapUv:yJ&&k(O.bumpMap.channel),normalMapUv:c0&&k(O.normalMap.channel),displacementMapUv:BJ&&k(O.displacementMap.channel),emissiveMapUv:MJ&&k(O.emissiveMap.channel),metalnessMapUv:OJ&&k(O.metalnessMap.channel),roughnessMapUv:j&&k(O.roughnessMap.channel),anisotropyMapUv:l&&k(O.anisotropyMap.channel),clearcoatMapUv:t&&k(O.clearcoatMap.channel),clearcoatNormalMapUv:$0&&k(O.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X0&&k(O.clearcoatRoughnessMap.channel),iridescenceMapUv:c&&k(O.iridescenceMap.channel),iridescenceThicknessMapUv:o&&k(O.iridescenceThicknessMap.channel),sheenColorMapUv:O0&&k(O.sheenColorMap.channel),sheenRoughnessMapUv:I0&&k(O.sheenRoughnessMap.channel),specularMapUv:U0&&k(O.specularMap.channel),specularColorMapUv:Z0&&k(O.specularColorMap.channel),specularIntensityMapUv:_0&&k(O.specularIntensityMap.channel),transmissionMapUv:P0&&k(O.transmissionMap.channel),thicknessMapUv:i0&&k(O.thicknessMap.channel),alphaMapUv:W0&&k(O.alphaMap.channel),vertexTangents:!!u.attributes.tangent&&(c0||pJ),vertexNormals:!!u.attributes.normal,vertexColors:O.vertexColors,vertexAlphas:O.vertexColors===!0&&!!u.attributes.color&&u.attributes.color.itemSize===4,pointsUvs:g.isPoints===!0&&!!u.attributes.uv&&(B0||W0),fog:!!b,useFog:O.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:O.wireframe===!1&&(O.flatShading===!0||u.attributes.normal===void 0&&c0===!1&&(O.isMeshLambertMaterial||O.isMeshPhongMaterial||O.isMeshStandardMaterial||O.isMeshPhysicalMaterial)),sizeAttenuation:O.sizeAttenuation===!0,logarithmicDepthBuffer:E,reversedDepthBuffer:F0,skinning:g.isSkinnedMesh===!0,hasPositionAttribute:u.attributes.position!==void 0,morphTargets:u.morphAttributes.position!==void 0,morphNormals:u.morphAttributes.normal!==void 0,morphColors:u.morphAttributes.color!==void 0,morphTargetsCount:R0,morphTextureStride:n0,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:s.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:O.dithering,shadowMapEnabled:J.shadowMap.enabled&&p.length>0,shadowMapType:J.shadowMap.type,toneMapping:r,decodeVideoTexture:B0&&O.map.isVideoTexture===!0&&u0.getTransfer(O.map.colorSpace)===QJ,decodeVideoTextureEmissive:MJ&&O.emissiveMap.isVideoTexture===!0&&u0.getTransfer(O.emissiveMap.colorSpace)===QJ,premultipliedAlpha:O.premultipliedAlpha,doubleSided:O.side===cJ,flipSided:O.side===TJ,useDepthPacking:O.depthPacking>=0,depthPacking:O.depthPacking||0,index0AttributeName:O.index0AttributeName,extensionClipCullDistance:k0&&O.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(k0&&O.extensions.multiDraw===!0||b0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:O.customProgramCacheKey()};return Y0.vertexUv1s=U.has(1),Y0.vertexUv2s=U.has(2),Y0.vertexUv3s=U.has(3),U.clear(),Y0}function q(O){let B=[];if(O.shaderID)B.push(O.shaderID);else B.push(O.customVertexShaderID),B.push(O.customFragmentShaderID);if(O.defines!==void 0)for(let p in O.defines)B.push(p),B.push(O.defines[p]);if(O.isRawShaderMaterial===!1)F(B,O),_(B,O),B.push(J.outputColorSpace);return B.push(O.customProgramCacheKey),B.join()}function F(O,B){O.push(B.precision),O.push(B.outputColorSpace),O.push(B.envMapMode),O.push(B.envMapCubeUVHeight),O.push(B.mapUv),O.push(B.alphaMapUv),O.push(B.lightMapUv),O.push(B.aoMapUv),O.push(B.bumpMapUv),O.push(B.normalMapUv),O.push(B.displacementMapUv),O.push(B.emissiveMapUv),O.push(B.metalnessMapUv),O.push(B.roughnessMapUv),O.push(B.anisotropyMapUv),O.push(B.clearcoatMapUv),O.push(B.clearcoatNormalMapUv),O.push(B.clearcoatRoughnessMapUv),O.push(B.iridescenceMapUv),O.push(B.iridescenceThicknessMapUv),O.push(B.sheenColorMapUv),O.push(B.sheenRoughnessMapUv),O.push(B.specularMapUv),O.push(B.specularColorMapUv),O.push(B.specularIntensityMapUv),O.push(B.transmissionMapUv),O.push(B.thicknessMapUv),O.push(B.combine),O.push(B.fogExp2),O.push(B.sizeAttenuation),O.push(B.morphTargetsCount),O.push(B.morphAttributeCount),O.push(B.numDirLights),O.push(B.numPointLights),O.push(B.numSpotLights),O.push(B.numSpotLightMaps),O.push(B.numHemiLights),O.push(B.numRectAreaLights),O.push(B.numDirLightShadows),O.push(B.numPointLightShadows),O.push(B.numSpotLightShadows),O.push(B.numSpotLightShadowsWithMaps),O.push(B.numLightProbes),O.push(B.shadowMapType),O.push(B.toneMapping),O.push(B.numClippingPlanes),O.push(B.numClipIntersection),O.push(B.depthPacking)}function _(O,B){if(H.disableAll(),B.instancing)H.enable(0);if(B.instancingColor)H.enable(1);if(B.instancingMorph)H.enable(2);if(B.matcap)H.enable(3);if(B.envMap)H.enable(4);if(B.normalMapObjectSpace)H.enable(5);if(B.normalMapTangentSpace)H.enable(6);if(B.clearcoat)H.enable(7);if(B.iridescence)H.enable(8);if(B.alphaTest)H.enable(9);if(B.vertexColors)H.enable(10);if(B.vertexAlphas)H.enable(11);if(B.vertexUv1s)H.enable(12);if(B.vertexUv2s)H.enable(13);if(B.vertexUv3s)H.enable(14);if(B.vertexTangents)H.enable(15);if(B.anisotropy)H.enable(16);if(B.alphaHash)H.enable(17);if(B.batching)H.enable(18);if(B.dispersion)H.enable(19);if(B.batchingColor)H.enable(20);if(B.gradientMap)H.enable(21);if(B.packedNormalMap)H.enable(22);if(B.vertexNormals)H.enable(23);if(O.push(H.mask),H.disableAll(),B.fog)H.enable(0);if(B.useFog)H.enable(1);if(B.flatShading)H.enable(2);if(B.logarithmicDepthBuffer)H.enable(3);if(B.reversedDepthBuffer)H.enable(4);if(B.skinning)H.enable(5);if(B.morphTargets)H.enable(6);if(B.morphNormals)H.enable(7);if(B.morphColors)H.enable(8);if(B.premultipliedAlpha)H.enable(9);if(B.shadowMapEnabled)H.enable(10);if(B.doubleSided)H.enable(11);if(B.flipSided)H.enable(12);if(B.useDepthPacking)H.enable(13);if(B.dithering)H.enable(14);if(B.transmission)H.enable(15);if(B.sheen)H.enable(16);if(B.opaque)H.enable(17);if(B.pointsUvs)H.enable(18);if(B.decodeVideoTexture)H.enable(19);if(B.decodeVideoTextureEmissive)H.enable(20);if(B.alphaToCoverage)H.enable(21);if(B.numLightProbeGrids>0)H.enable(22);if(B.hasPositionAttribute)H.enable(23);O.push(H.mask)}function C(O){let B=D[O.type],p;if(B){let w=N9[B];p=bW.clone(w.uniforms)}else p=O.uniforms;return p}function L(O,B){let p=N.get(B);if(p!==void 0)++p.usedTimes;else p=new KN(J,B,O,W),X.push(p),N.set(B,p);return p}function A(O){if(--O.usedTimes===0){let B=X.indexOf(O);X[B]=X[X.length-1],X.pop(),N.delete(O.cacheKey),O.destroy()}}function z(O){Y.remove(O)}function P(){Y.dispose()}return{getParameters:I,getProgramCacheKey:q,getUniforms:C,acquireProgram:L,releaseProgram:A,releaseShaderCache:z,programs:X,dispose:P}}function UN(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function Z(H){J.delete(H)}function W(H,Y,U){J.get(H)[Y]=U}function K(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:W,dispose:K}}function GN(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function KK(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function HK(){let J=[],Q=0,$=[],Z=[],W=[];function K(){Q=0,$.length=0,Z.length=0,W.length=0}function H(G){let D=0;if(G.isInstancedMesh)D+=2;if(G.isSkinnedMesh)D+=1;return D}function Y(G,D,k,I,q,F){let _=J[Q];if(_===void 0)_={id:G.id,object:G,geometry:D,material:k,materialVariant:H(G),groupOrder:I,renderOrder:G.renderOrder,z:q,group:F},J[Q]=_;else _.id=G.id,_.object=G,_.geometry=D,_.material=k,_.materialVariant=H(G),_.groupOrder=I,_.renderOrder=G.renderOrder,_.z=q,_.group=F;return Q++,_}function U(G,D,k,I,q,F){let _=Y(G,D,k,I,q,F);if(k.transmission>0)Z.push(_);else if(k.transparent===!0)W.push(_);else $.push(_)}function X(G,D,k,I,q,F){let _=Y(G,D,k,I,q,F);if(k.transmission>0)Z.unshift(_);else if(k.transparent===!0)W.unshift(_);else $.unshift(_)}function N(G,D,k){if($.length>1)$.sort(G||GN);if(Z.length>1)Z.sort(D||KK);if(W.length>1)W.sort(D||KK);if(k)$.reverse(),Z.reverse(),W.reverse()}function E(){for(let G=Q,D=J.length;G<D;G++){let k=J[G];if(k.id===null)break;k.id=null,k.object=null,k.geometry=null,k.material=null,k.group=null}}return{opaque:$,transmissive:Z,transparent:W,init:K,push:U,unshift:X,finish:E,sort:N}}function NN(){let J=new WeakMap;function Q(Z,W){let K=J.get(Z),H;if(K===void 0)H=new HK,J.set(Z,[H]);else if(W>=K.length)H=new HK,K.push(H);else H=K[W];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function EN(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new y,color:new S0};break;case"SpotLight":$={position:new y,direction:new y,color:new S0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new y,color:new S0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new y,skyColor:new S0,groundColor:new S0};break;case"RectAreaLight":$={color:new S0,position:new y,halfWidth:new y,halfHeight:new y};break}return J[Q.id]=$,$}}}function qN(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new g0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new g0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new g0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}function DN(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function ON(J){let Q=new EN,$=qN(),Z={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let X=0;X<9;X++)Z.probe.push(new y);let W=new y,K=new r0,H=new r0;function Y(X){let N=0,E=0,G=0;for(let B=0;B<9;B++)Z.probe[B].set(0,0,0);let D=0,k=0,I=0,q=0,F=0,_=0,C=0,L=0,A=0,z=0,P=0;X.sort(DN);for(let B=0,p=X.length;B<p;B++){let w=X[B],g=w.color,s=w.intensity,b=w.distance,u=null;if(w.shadow&&w.shadow.map)if(w.shadow.map.texture.format===J8)u=w.shadow.map.texture;else u=w.shadow.map.depthTexture||w.shadow.map.texture;if(w.isAmbientLight)N+=g.r*s,E+=g.g*s,G+=g.b*s;else if(w.isLightProbe){for(let n=0;n<9;n++)Z.probe[n].addScaledVector(w.sh.coefficients[n],s);P++}else if(w.isDirectionalLight){let n=Q.get(w);if(n.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let f=w.shadow,a=$.get(w);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,Z.directionalShadow[D]=a,Z.directionalShadowMap[D]=u,Z.directionalShadowMatrix[D]=w.shadow.matrix,_++}Z.directional[D]=n,D++}else if(w.isSpotLight){let n=Q.get(w);n.position.setFromMatrixPosition(w.matrixWorld),n.color.copy(g).multiplyScalar(s),n.distance=b,n.coneCos=Math.cos(w.angle),n.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),n.decay=w.decay,Z.spot[I]=n;let f=w.shadow;if(w.map){if(Z.spotLightMap[A]=w.map,A++,f.updateMatrices(w),w.castShadow)z++}if(Z.spotLightMatrix[I]=f.matrix,w.castShadow){let a=$.get(w);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,Z.spotShadow[I]=a,Z.spotShadowMap[I]=u,L++}I++}else if(w.isRectAreaLight){let n=Q.get(w);n.color.copy(g).multiplyScalar(s),n.halfWidth.set(w.width*0.5,0,0),n.halfHeight.set(0,w.height*0.5,0),Z.rectArea[q]=n,q++}else if(w.isPointLight){let n=Q.get(w);if(n.color.copy(w.color).multiplyScalar(w.intensity),n.distance=w.distance,n.decay=w.decay,w.castShadow){let f=w.shadow,a=$.get(w);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,a.shadowCameraNear=f.camera.near,a.shadowCameraFar=f.camera.far,Z.pointShadow[k]=a,Z.pointShadowMap[k]=u,Z.pointShadowMatrix[k]=w.shadow.matrix,C++}Z.point[k]=n,k++}else if(w.isHemisphereLight){let n=Q.get(w);n.skyColor.copy(w.color).multiplyScalar(s),n.groundColor.copy(w.groundColor).multiplyScalar(s),Z.hemi[F]=n,F++}}if(q>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=G0.LTC_FLOAT_1,Z.rectAreaLTC2=G0.LTC_FLOAT_2;else Z.rectAreaLTC1=G0.LTC_HALF_1,Z.rectAreaLTC2=G0.LTC_HALF_2;Z.ambient[0]=N,Z.ambient[1]=E,Z.ambient[2]=G;let O=Z.hash;if(O.directionalLength!==D||O.pointLength!==k||O.spotLength!==I||O.rectAreaLength!==q||O.hemiLength!==F||O.numDirectionalShadows!==_||O.numPointShadows!==C||O.numSpotShadows!==L||O.numSpotMaps!==A||O.numLightProbes!==P)Z.directional.length=D,Z.spot.length=I,Z.rectArea.length=q,Z.point.length=k,Z.hemi.length=F,Z.directionalShadow.length=_,Z.directionalShadowMap.length=_,Z.pointShadow.length=C,Z.pointShadowMap.length=C,Z.spotShadow.length=L,Z.spotShadowMap.length=L,Z.directionalShadowMatrix.length=_,Z.pointShadowMatrix.length=C,Z.spotLightMatrix.length=L+A-z,Z.spotLightMap.length=A,Z.numSpotLightShadowsWithMaps=z,Z.numLightProbes=P,O.directionalLength=D,O.pointLength=k,O.spotLength=I,O.rectAreaLength=q,O.hemiLength=F,O.numDirectionalShadows=_,O.numPointShadows=C,O.numSpotShadows=L,O.numSpotMaps=A,O.numLightProbes=P,Z.version=FN++}function U(X,N){let E=0,G=0,D=0,k=0,I=0,q=N.matrixWorldInverse;for(let F=0,_=X.length;F<_;F++){let C=X[F];if(C.isDirectionalLight){let L=Z.directional[E];L.direction.setFromMatrixPosition(C.matrixWorld),W.setFromMatrixPosition(C.target.matrixWorld),L.direction.sub(W),L.direction.transformDirection(q),E++}else if(C.isSpotLight){let L=Z.spot[D];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(q),L.direction.setFromMatrixPosition(C.matrixWorld),W.setFromMatrixPosition(C.target.matrixWorld),L.direction.sub(W),L.direction.transformDirection(q),D++}else if(C.isRectAreaLight){let L=Z.rectArea[k];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(q),H.identity(),K.copy(C.matrixWorld),K.premultiply(q),H.extractRotation(K),L.halfWidth.set(C.width*0.5,0,0),L.halfHeight.set(0,C.height*0.5,0),L.halfWidth.applyMatrix4(H),L.halfHeight.applyMatrix4(H),k++}else if(C.isPointLight){let L=Z.point[G];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(q),G++}else if(C.isHemisphereLight){let L=Z.hemi[I];L.direction.setFromMatrixPosition(C.matrixWorld),L.direction.transformDirection(q),I++}}}return{setup:Y,setupView:U,state:Z}}function YK(J){let Q=new ON(J),$=[],Z=[],W=[];function K(G){E.camera=G,$.length=0,Z.length=0,W.length=0}function H(G){$.push(G)}function Y(G){Z.push(G)}function U(G){W.push(G)}function X(){Q.setup($)}function N(G){Q.setupView($,G)}let E={lightsArray:$,shadowsArray:Z,lightProbeGridArray:W,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:E,setupLights:X,setupLightsView:N,pushLight:H,pushShadow:Y,pushLightProbeGrid:U}}function RN(J){let Q=new WeakMap;function $(W,K=0){let H=Q.get(W),Y;if(H===void 0)Y=new YK(J),Q.set(W,[Y]);else if(K>=H.length)Y=new YK(J),H.push(Y);else Y=H[K];return Y}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}function BN(J,Q,$){let Z=new F7,W=new g0,K=new g0,H=new YJ,Y=new F$,U=new D$,X={},N=$.maxTextureSize,E={[j8]:TJ,[TJ]:j8,[cJ]:cJ},G=new zJ({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new g0},radius:{value:4}},vertexShader:kN,fragmentShader:MN}),D=G.clone();D.defines.HORIZONTAL_PASS=1;let k=new FJ;k.setAttribute("position",new wJ(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let I=new XJ(k,G),q=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=H7;let F=this.type;this.render=function(z,P,O){if(q.enabled===!1)return;if(q.autoUpdate===!1&&q.needsUpdate===!1)return;if(z.length===0)return;if(this.type===hZ)C0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=H7;let B=J.getRenderTarget(),p=J.getActiveCubeFace(),w=J.getActiveMipmapLevel(),g=J.state;if(g.setBlending(W9),g.buffers.depth.getReversed()===!0)g.buffers.color.setClear(0,0,0,0);else g.buffers.color.setClear(1,1,1,1);g.buffers.depth.setTest(!0),g.setScissorTest(!1);let s=F!==this.type;if(s)P.traverse(function(b){if(b.material)if(Array.isArray(b.material))b.material.forEach((u)=>u.needsUpdate=!0);else b.material.needsUpdate=!0});for(let b=0,u=z.length;b<u;b++){let n=z[b],f=n.shadow;if(f===void 0){C0("WebGLShadowMap:",n,"has no shadow.");continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;W.copy(f.mapSize);let a=f.getFrameExtents();if(W.multiply(a),K.copy(f.mapSize),W.x>N||W.y>N){if(W.x>N)K.x=Math.floor(N/a.x),W.x=K.x*a.x,f.mapSize.x=K.x;if(W.y>N)K.y=Math.floor(N/a.y),W.y=K.y*a.y,f.mapSize.y=K.y}let e=J.state.buffers.depth.getReversed();if(f.camera._reversedDepth=e,f.map===null||s===!0){if(f.map!==null){if(f.map.depthTexture!==null)f.map.depthTexture.dispose(),f.map.depthTexture=null;f.map.dispose()}if(this.type===S8){if(n.isPointLight){C0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}f.map=new vJ(W.x,W.y,{format:J8,type:rJ,minFilter:IJ,magFilter:IJ,generateMipmaps:!1}),f.map.texture.name=n.name+".shadowMap",f.map.depthTexture=new U9(W.x,W.y,B9),f.map.depthTexture.name=n.name+".shadowMapDepth",f.map.depthTexture.format=t9,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=x9,f.map.depthTexture.magFilter=x9}else{if(n.isPointLight)f.map=new l$(W.x),f.map.depthTexture=new N$(W.x,K9);else f.map=new vJ(W.x,W.y),f.map.depthTexture=new U9(W.x,W.y,K9);if(f.map.depthTexture.name=n.name+".shadowMap",f.map.depthTexture.format=t9,this.type===H7)f.map.depthTexture.compareFunction=e?q6:E6,f.map.depthTexture.minFilter=IJ,f.map.depthTexture.magFilter=IJ;else f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=x9,f.map.depthTexture.magFilter=x9}f.camera.updateProjectionMatrix()}let J0=f.map.isWebGLCubeRenderTarget?6:1;for(let E0=0;E0<J0;E0++){if(f.map.isWebGLCubeRenderTarget)J.setRenderTarget(f.map,E0),J.clear();else{if(E0===0)J.setRenderTarget(f.map),J.clear();let R0=f.getViewport(E0);H.set(K.x*R0.x,K.y*R0.y,K.x*R0.z,K.y*R0.w),g.viewport(H)}if(n.isPointLight){let{camera:R0,matrix:n0}=f,w0=n.distance||R0.far;if(w0!==R0.far)R0.far=w0,R0.updateProjectionMatrix();M7.setFromMatrixPosition(n.matrixWorld),R0.position.copy(M7),g$.copy(R0.position),g$.add(LN[E0]),R0.up.copy(VN[E0]),R0.lookAt(g$),R0.updateMatrixWorld(),n0.makeTranslation(-M7.x,-M7.y,-M7.z),XK.multiplyMatrices(R0.projectionMatrix,R0.matrixWorldInverse),f._frustum.setFromProjectionMatrix(XK,R0.coordinateSystem,R0.reversedDepth)}else f.updateMatrices(n);Z=f.getFrustum(),L(P,O,f.camera,n,this.type)}if(f.isPointLightShadow!==!0&&this.type===S8)_(f,O);f.needsUpdate=!1}F=this.type,q.needsUpdate=!1,J.setRenderTarget(B,p,w)};function _(z,P){let O=Q.update(I);if(G.defines.VSM_SAMPLES!==z.blurSamples)G.defines.VSM_SAMPLES=z.blurSamples,D.defines.VSM_SAMPLES=z.blurSamples,G.needsUpdate=!0,D.needsUpdate=!0;if(z.mapPass===null)z.mapPass=new vJ(W.x,W.y,{format:J8,type:rJ});G.uniforms.shadow_pass.value=z.map.depthTexture,G.uniforms.resolution.value=z.mapSize,G.uniforms.radius.value=z.radius,J.setRenderTarget(z.mapPass),J.clear(),J.renderBufferDirect(P,null,O,G,I,null),D.uniforms.shadow_pass.value=z.mapPass.texture,D.uniforms.resolution.value=z.mapSize,D.uniforms.radius.value=z.radius,J.setRenderTarget(z.map),J.clear(),J.renderBufferDirect(P,null,O,D,I,null)}function C(z,P,O,B){let p=null,w=O.isPointLight===!0?z.customDistanceMaterial:z.customDepthMaterial;if(w!==void 0)p=w;else if(p=O.isPointLight===!0?U:Y,J.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let g=p.uuid,s=P.uuid,b=X[g];if(b===void 0)b={},X[g]=b;let u=b[s];if(u===void 0)u=p.clone(),b[s]=u,P.addEventListener("dispose",A);p=u}if(p.visible=P.visible,p.wireframe=P.wireframe,B===S8)p.side=P.shadowSide!==null?P.shadowSide:P.side;else p.side=P.shadowSide!==null?P.shadowSide:E[P.side];if(p.alphaMap=P.alphaMap,p.alphaTest=P.alphaToCoverage===!0?0.5:P.alphaTest,p.map=P.map,p.clipShadows=P.clipShadows,p.clippingPlanes=P.clippingPlanes,p.clipIntersection=P.clipIntersection,p.displacementMap=P.displacementMap,p.displacementScale=P.displacementScale,p.displacementBias=P.displacementBias,p.wireframeLinewidth=P.wireframeLinewidth,p.linewidth=P.linewidth,O.isPointLight===!0&&p.isMeshDistanceMaterial===!0){let g=J.properties.get(p);g.light=O}return p}function L(z,P,O,B,p){if(z.visible===!1)return;if(z.layers.test(P.layers)&&(z.isMesh||z.isLine||z.isPoints)){if((z.castShadow||z.receiveShadow&&p===S8)&&(!z.frustumCulled||Z.intersectsObject(z))){z.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,z.matrixWorld);let s=Q.update(z),b=z.material;if(Array.isArray(b)){let u=s.groups;for(let n=0,f=u.length;n<f;n++){let a=u[n],e=b[a.materialIndex];if(e&&e.visible){let J0=C(z,e,B,p);z.onBeforeShadow(J,z,P,O,s,J0,a),J.renderBufferDirect(O,null,s,J0,z,a),z.onAfterShadow(J,z,P,O,s,J0,a)}}}else if(b.visible){let u=C(z,b,B,p);z.onBeforeShadow(J,z,P,O,s,u,null),J.renderBufferDirect(O,null,s,u,z,null),z.onAfterShadow(J,z,P,O,s,u,null)}}}let g=z.children;for(let s=0,b=g.length;s<b;s++)L(g[s],P,O,B,p)}function A(z){z.target.removeEventListener("dispose",A);for(let O in X){let B=X[O],p=z.target.uuid;if(p in B)B[p].dispose(),delete B[p]}}}function IN(J,Q){function $(){let S=!1,W0=new YJ,i=null,H0=new YJ(0,0,0,0);return{setMask:function(k0){if(i!==k0&&!S)J.colorMask(k0,k0,k0,k0),i=k0},setLocked:function(k0){S=k0},setClear:function(k0,r,Y0,v0,GJ){if(GJ===!0)k0*=v0,r*=v0,Y0*=v0;if(W0.set(k0,r,Y0,v0),H0.equals(W0)===!1)J.clearColor(k0,r,Y0,v0),H0.copy(W0)},reset:function(){S=!1,i=null,H0.set(-1,0,0,0)}}}function Z(){let S=!1,W0=!1,i=null,H0=null,k0=null;return{setReversed:function(r){if(W0!==r){let Y0=Q.get("EXT_clip_control");if(r)Y0.clipControlEXT(Y0.LOWER_LEFT_EXT,Y0.ZERO_TO_ONE_EXT);else Y0.clipControlEXT(Y0.LOWER_LEFT_EXT,Y0.NEGATIVE_ONE_TO_ONE_EXT);W0=r;let v0=k0;k0=null,this.setClear(v0)}},getReversed:function(){return W0},setTest:function(r){if(r)D0(J.DEPTH_TEST);else F0(J.DEPTH_TEST)},setMask:function(r){if(i!==r&&!S)J.depthMask(r),i=r},setFunc:function(r){if(W0)r=vW[r];if(H0!==r){switch(r){case WW:J.depthFunc(J.NEVER);break;case KW:J.depthFunc(J.ALWAYS);break;case HW:J.depthFunc(J.LESS);break;case GQ:J.depthFunc(J.LEQUAL);break;case YW:J.depthFunc(J.EQUAL);break;case XW:J.depthFunc(J.GEQUAL);break;case UW:J.depthFunc(J.GREATER);break;case GW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}H0=r}},setLocked:function(r){S=r},setClear:function(r){if(k0!==r){if(k0=r,W0)r=1-r;J.clearDepth(r)}},reset:function(){S=!1,i=null,H0=null,k0=null,W0=!1}}}function W(){let S=!1,W0=null,i=null,H0=null,k0=null,r=null,Y0=null,v0=null,GJ=null;return{setTest:function($J){if(!S)if($J)D0(J.STENCIL_TEST);else F0(J.STENCIL_TEST)},setMask:function($J){if(W0!==$J&&!S)J.stencilMask($J),W0=$J},setFunc:function($J,J9,F9){if(i!==$J||H0!==J9||k0!==F9)J.stencilFunc($J,J9,F9),i=$J,H0=J9,k0=F9},setOp:function($J,J9,F9){if(r!==$J||Y0!==J9||v0!==F9)J.stencilOp($J,J9,F9),r=$J,Y0=J9,v0=F9},setLocked:function($J){S=$J},setClear:function($J){if(GJ!==$J)J.clearStencil($J),GJ=$J},reset:function(){S=!1,W0=null,i=null,H0=null,k0=null,r=null,Y0=null,v0=null,GJ=null}}}let K=new $,H=new Z,Y=new W,U=new WeakMap,X=new WeakMap,N={},E={},G={},D=new WeakMap,k=[],I=null,q=!1,F=null,_=null,C=null,L=null,A=null,z=null,P=null,O=new S0(0,0,0),B=0,p=!1,w=null,g=null,s=null,b=null,u=null,n=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),f=!1,a=0,e=J.getParameter(J.VERSION);if(e.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(e)[1]),f=a>=1;else if(e.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(e)[1]),f=a>=2;let J0=null,E0={},R0=J.getParameter(J.SCISSOR_BOX),n0=J.getParameter(J.VIEWPORT),w0=new YJ().fromArray(R0),d=new YJ().fromArray(n0);function Q0(S,W0,i,H0){let k0=new Uint8Array(4),r=J.createTexture();J.bindTexture(S,r),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let Y0=0;Y0<i;Y0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D(W0,0,J.RGBA,1,1,H0,0,J.RGBA,J.UNSIGNED_BYTE,k0);else J.texImage2D(W0+Y0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,k0);return r}let K0={};K0[J.TEXTURE_2D]=Q0(J.TEXTURE_2D,J.TEXTURE_2D,1),K0[J.TEXTURE_CUBE_MAP]=Q0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),K0[J.TEXTURE_2D_ARRAY]=Q0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),K0[J.TEXTURE_3D]=Q0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),D0(J.DEPTH_TEST),H.setFunc(GQ),yJ(!1),c0(HQ),D0(J.CULL_FACE),j0(W9);function D0(S){if(N[S]!==!0)J.enable(S),N[S]=!0}function F0(S){if(N[S]!==!1)J.disable(S),N[S]=!1}function f0(S,W0){if(G[S]!==W0){if(J.bindFramebuffer(S,W0),G[S]=W0,S===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=W0;if(S===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=W0;return!0}return!1}function b0(S,W0){let i=k,H0=!1;if(S){if(i=D.get(W0),i===void 0)i=[],D.set(W0,i);let k0=S.textures;if(i.length!==k0.length||i[0]!==J.COLOR_ATTACHMENT0){for(let r=0,Y0=k0.length;r<Y0;r++)i[r]=J.COLOR_ATTACHMENT0+r;i.length=k0.length,H0=!0}}else if(i[0]!==J.BACK)i[0]=J.BACK,H0=!0;if(H0)J.drawBuffers(i)}function B0(S){if(I!==S)return J.useProgram(S),I=S,!0;return!1}let x0={[y8]:J.FUNC_ADD,[gZ]:J.FUNC_SUBTRACT,[pZ]:J.FUNC_REVERSE_SUBTRACT};x0[mZ]=J.MIN,x0[lZ]=J.MAX;let p0={[dZ]:J.ZERO,[uZ]:J.ONE,[cZ]:J.SRC_COLOR,[sZ]:J.SRC_ALPHA,[eZ]:J.SRC_ALPHA_SATURATE,[rZ]:J.DST_COLOR,[oZ]:J.DST_ALPHA,[nZ]:J.ONE_MINUS_SRC_COLOR,[iZ]:J.ONE_MINUS_SRC_ALPHA,[tZ]:J.ONE_MINUS_DST_COLOR,[aZ]:J.ONE_MINUS_DST_ALPHA,[JW]:J.CONSTANT_COLOR,[QW]:J.ONE_MINUS_CONSTANT_COLOR,[$W]:J.CONSTANT_ALPHA,[ZW]:J.ONE_MINUS_CONSTANT_ALPHA};function j0(S,W0,i,H0,k0,r,Y0,v0,GJ,$J){if(S===W9){if(q===!0)F0(J.BLEND),q=!1;return}if(q===!1)D0(J.BLEND),q=!0;if(S!==xZ){if(S!==F||$J!==p){if(_!==y8||A!==y8)J.blendEquation(J.FUNC_ADD),_=y8,A=y8;if($J)switch(S){case Y7:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case YQ:J.blendFunc(J.ONE,J.ONE);break;case XQ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case UQ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:T0("WebGLState: Invalid blending: ",S);break}else switch(S){case Y7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case YQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case XQ:T0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case UQ:T0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:T0("WebGLState: Invalid blending: ",S);break}C=null,L=null,z=null,P=null,O.set(0,0,0),B=0,F=S,p=$J}return}if(k0=k0||W0,r=r||i,Y0=Y0||H0,W0!==_||k0!==A)J.blendEquationSeparate(x0[W0],x0[k0]),_=W0,A=k0;if(i!==C||H0!==L||r!==z||Y0!==P)J.blendFuncSeparate(p0[i],p0[H0],p0[r],p0[Y0]),C=i,L=H0,z=r,P=Y0;if(v0.equals(O)===!1||GJ!==B)J.blendColor(v0.r,v0.g,v0.b,GJ),O.copy(v0),B=GJ;F=S,p=!1}function UJ(S,W0){S.side===cJ?F0(J.CULL_FACE):D0(J.CULL_FACE);let i=S.side===TJ;if(W0)i=!i;yJ(i),S.blending===Y7&&S.transparent===!1?j0(W9):j0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),K.setMask(S.colorWrite);let H0=S.stencilWrite;if(Y.setTest(H0),H0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);MJ(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?D0(J.SAMPLE_ALPHA_TO_COVERAGE):F0(J.SAMPLE_ALPHA_TO_COVERAGE)}function yJ(S){if(w!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);w=S}}function c0(S){if(S!==fZ){if(D0(J.CULL_FACE),S!==g)if(S===HQ)J.cullFace(J.BACK);else if(S===bZ)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else F0(J.CULL_FACE);g=S}function BJ(S){if(S!==s){if(f)J.lineWidth(S);s=S}}function MJ(S,W0,i){if(S){if(D0(J.POLYGON_OFFSET_FILL),b!==W0||u!==i){if(b=W0,u=i,H.getReversed())W0=-W0;J.polygonOffset(W0,i)}}else F0(J.POLYGON_OFFSET_FILL)}function OJ(S){if(S)D0(J.SCISSOR_TEST);else F0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+n-1;if(J0!==S)J.activeTexture(S),J0=S}function pJ(S,W0,i){if(i===void 0)if(J0===null)i=J.TEXTURE0+n-1;else i=J0;let H0=E0[i];if(H0===void 0)H0={type:void 0,texture:void 0},E0[i]=H0;if(H0.type!==S||H0.texture!==W0){if(J0!==i)J.activeTexture(i),J0=i;J.bindTexture(S,W0||K0[S]),H0.type=S,H0.texture=W0}}function o0(){let S=E0[J0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function KJ(){try{J.compressedTexImage2D(...arguments)}catch(S){T0("WebGLState:",S)}}function V(){try{J.compressedTexImage3D(...arguments)}catch(S){T0("WebGLState:",S)}}function R(){try{J.texSubImage2D(...arguments)}catch(S){T0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){T0("WebGLState:",S)}}function l(){try{J.compressedTexSubImage2D(...arguments)}catch(S){T0("WebGLState:",S)}}function t(){try{J.compressedTexSubImage3D(...arguments)}catch(S){T0("WebGLState:",S)}}function $0(){try{J.texStorage2D(...arguments)}catch(S){T0("WebGLState:",S)}}function X0(){try{J.texStorage3D(...arguments)}catch(S){T0("WebGLState:",S)}}function c(){try{J.texImage2D(...arguments)}catch(S){T0("WebGLState:",S)}}function o(){try{J.texImage3D(...arguments)}catch(S){T0("WebGLState:",S)}}function O0(S){if(E[S]!==void 0)return E[S];else return J.getParameter(S)}function I0(S,W0){if(E[S]!==W0)J.pixelStorei(S,W0),E[S]=W0}function U0(S){if(w0.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),w0.copy(S)}function Z0(S){if(d.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),d.copy(S)}function _0(S,W0){let i=X.get(W0);if(i===void 0)i=new WeakMap,X.set(W0,i);let H0=i.get(S);if(H0===void 0)H0=J.getUniformBlockIndex(W0,S.name),i.set(S,H0)}function P0(S,W0){let H0=X.get(W0).get(S);if(U.get(W0)!==H0)J.uniformBlockBinding(W0,H0,S.__bindingPointIndex),U.set(W0,H0)}function i0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},E={},J0=null,E0={},G={},D=new WeakMap,k=[],I=null,q=!1,F=null,_=null,C=null,L=null,A=null,z=null,P=null,O=new S0(0,0,0),B=0,p=!1,w=null,g=null,s=null,b=null,u=null,w0.set(0,0,J.canvas.width,J.canvas.height),d.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:D0,disable:F0,bindFramebuffer:f0,drawBuffers:b0,useProgram:B0,setBlending:j0,setMaterial:UJ,setFlipSided:yJ,setCullFace:c0,setLineWidth:BJ,setPolygonOffset:MJ,setScissorTest:OJ,activeTexture:j,bindTexture:pJ,unbindTexture:o0,compressedTexImage2D:KJ,compressedTexImage3D:V,texImage2D:c,texImage3D:o,pixelStorei:I0,getParameter:O0,updateUBOMapping:_0,uniformBlockBinding:P0,texStorage2D:$0,texStorage3D:X0,texSubImage2D:R,texSubImage3D:T,compressedTexSubImage2D:l,compressedTexSubImage3D:t,scissor:U0,viewport:Z0,reset:i0}}function zN(J,Q,$,Z,W,K,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,U=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),X=new g0,N=new WeakMap,E=new Set,G,D=new WeakMap,k=!1;try{k=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(V){}function I(V,R){return k?new OffscreenCanvas(V,R):K7("canvas")}function q(V,R,T){let l=1,t=KJ(V);if(t.width>T||t.height>T)l=T/Math.max(t.width,t.height);if(l<1)if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&V instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&V instanceof ImageBitmap||typeof VideoFrame<"u"&&V instanceof VideoFrame){let $0=Math.floor(l*t.width),X0=Math.floor(l*t.height);if(G===void 0)G=I($0,X0);let c=R?I($0,X0):G;return c.width=$0,c.height=X0,c.getContext("2d").drawImage(V,0,0,$0,X0),C0("WebGLRenderer: Texture has been resized from ("+t.width+"x"+t.height+") to ("+$0+"x"+X0+")."),c}else{if("data"in V)C0("WebGLRenderer: Image in DataTexture is too big ("+t.width+"x"+t.height+").");return V}return V}function F(V){return V.generateMipmaps}function _(V){J.generateMipmap(V)}function C(V){if(V.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(V.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(V.isWebGLArrayRenderTarget||V.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function L(V,R,T,l,t,$0=!1){if(V!==null){if(J[V]!==void 0)return J[V];C0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+V+"'")}let X0;if(l){if(X0=Q.get("EXT_texture_norm16"),!X0)C0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let c=R;if(R===J.RED){if(T===J.FLOAT)c=J.R32F;if(T===J.HALF_FLOAT)c=J.R16F;if(T===J.UNSIGNED_BYTE)c=J.R8;if(T===J.UNSIGNED_SHORT&&X0)c=X0.R16_EXT;if(T===J.SHORT&&X0)c=X0.R16_SNORM_EXT}if(R===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)c=J.R8UI;if(T===J.UNSIGNED_SHORT)c=J.R16UI;if(T===J.UNSIGNED_INT)c=J.R32UI;if(T===J.BYTE)c=J.R8I;if(T===J.SHORT)c=J.R16I;if(T===J.INT)c=J.R32I}if(R===J.RG){if(T===J.FLOAT)c=J.RG32F;if(T===J.HALF_FLOAT)c=J.RG16F;if(T===J.UNSIGNED_BYTE)c=J.RG8;if(T===J.UNSIGNED_SHORT&&X0)c=X0.RG16_EXT;if(T===J.SHORT&&X0)c=X0.RG16_SNORM_EXT}if(R===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)c=J.RG8UI;if(T===J.UNSIGNED_SHORT)c=J.RG16UI;if(T===J.UNSIGNED_INT)c=J.RG32UI;if(T===J.BYTE)c=J.RG8I;if(T===J.SHORT)c=J.RG16I;if(T===J.INT)c=J.RG32I}if(R===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)c=J.RGB8UI;if(T===J.UNSIGNED_SHORT)c=J.RGB16UI;if(T===J.UNSIGNED_INT)c=J.RGB32UI;if(T===J.BYTE)c=J.RGB8I;if(T===J.SHORT)c=J.RGB16I;if(T===J.INT)c=J.RGB32I}if(R===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)c=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)c=J.RGBA16UI;if(T===J.UNSIGNED_INT)c=J.RGBA32UI;if(T===J.BYTE)c=J.RGBA8I;if(T===J.SHORT)c=J.RGBA16I;if(T===J.INT)c=J.RGBA32I}if(R===J.RGB){if(T===J.UNSIGNED_SHORT&&X0)c=X0.RGB16_EXT;if(T===J.SHORT&&X0)c=X0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)c=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)c=J.R11F_G11F_B10F}if(R===J.RGBA){let o=$0?Q$:u0.getTransfer(t);if(T===J.FLOAT)c=J.RGBA32F;if(T===J.HALF_FLOAT)c=J.RGBA16F;if(T===J.UNSIGNED_BYTE)c=o===QJ?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&X0)c=X0.RGBA16_EXT;if(T===J.SHORT&&X0)c=X0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)c=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)c=J.RGB5_A1}if(c===J.R16F||c===J.R32F||c===J.RG16F||c===J.RG32F||c===J.RGBA16F||c===J.RGBA32F)Q.get("EXT_color_buffer_float");return c}function A(V,R){let T;if(V){if(R===null||R===K9||R===f8)T=J.DEPTH24_STENCIL8;else if(R===B9)T=J.DEPTH32F_STENCIL8;else if(R===G7)T=J.DEPTH24_STENCIL8,C0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(R===null||R===K9||R===f8)T=J.DEPTH_COMPONENT24;else if(R===B9)T=J.DEPTH_COMPONENT32F;else if(R===G7)T=J.DEPTH_COMPONENT16;return T}function z(V,R){if(F(V)===!0||V.isFramebufferTexture&&V.minFilter!==x9&&V.minFilter!==IJ)return Math.log2(Math.max(R.width,R.height))+1;else if(V.mipmaps!==void 0&&V.mipmaps.length>0)return V.mipmaps.length;else if(V.isCompressedTexture&&Array.isArray(V.image))return R.mipmaps.length;else return 1}function P(V){let R=V.target;if(R.removeEventListener("dispose",P),B(R),R.isVideoTexture)N.delete(R);if(R.isHTMLTexture)E.delete(R)}function O(V){let R=V.target;R.removeEventListener("dispose",O),w(R)}function B(V){let R=Z.get(V);if(R.__webglInit===void 0)return;let T=V.source,l=D.get(T);if(l){let t=l[R.__cacheKey];if(t.usedTimes--,t.usedTimes===0)p(V);if(Object.keys(l).length===0)D.delete(T)}Z.remove(V)}function p(V){let R=Z.get(V);J.deleteTexture(R.__webglTexture);let T=V.source,l=D.get(T);delete l[R.__cacheKey],H.memory.textures--}function w(V){let R=Z.get(V);if(V.depthTexture)V.depthTexture.dispose(),Z.remove(V.depthTexture);if(V.isWebGLCubeRenderTarget)for(let l=0;l<6;l++){if(Array.isArray(R.__webglFramebuffer[l]))for(let t=0;t<R.__webglFramebuffer[l].length;t++)J.deleteFramebuffer(R.__webglFramebuffer[l][t]);else J.deleteFramebuffer(R.__webglFramebuffer[l]);if(R.__webglDepthbuffer)J.deleteRenderbuffer(R.__webglDepthbuffer[l])}else{if(Array.isArray(R.__webglFramebuffer))for(let l=0;l<R.__webglFramebuffer.length;l++)J.deleteFramebuffer(R.__webglFramebuffer[l]);else J.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer)J.deleteRenderbuffer(R.__webglDepthbuffer);if(R.__webglMultisampledFramebuffer)J.deleteFramebuffer(R.__webglMultisampledFramebuffer);if(R.__webglColorRenderbuffer){for(let l=0;l<R.__webglColorRenderbuffer.length;l++)if(R.__webglColorRenderbuffer[l])J.deleteRenderbuffer(R.__webglColorRenderbuffer[l])}if(R.__webglDepthRenderbuffer)J.deleteRenderbuffer(R.__webglDepthRenderbuffer)}let T=V.textures;for(let l=0,t=T.length;l<t;l++){let $0=Z.get(T[l]);if($0.__webglTexture)J.deleteTexture($0.__webglTexture),H.memory.textures--;Z.remove(T[l])}Z.remove(V)}let g=0;function s(){g=0}function b(){return g}function u(V){g=V}function n(){let V=g;if(V>=W.maxTextures)C0("WebGLTextures: Trying to use "+V+" texture units while this GPU supports only "+W.maxTextures);return g+=1,V}function f(V){let R=[];return R.push(V.wrapS),R.push(V.wrapT),R.push(V.wrapR||0),R.push(V.magFilter),R.push(V.minFilter),R.push(V.anisotropy),R.push(V.internalFormat),R.push(V.format),R.push(V.type),R.push(V.generateMipmaps),R.push(V.premultiplyAlpha),R.push(V.flipY),R.push(V.unpackAlignment),R.push(V.colorSpace),R.join()}function a(V,R){let T=Z.get(V);if(V.isVideoTexture)pJ(V);if(V.isRenderTargetTexture===!1&&V.isExternalTexture!==!0&&V.version>0&&T.__version!==V.version){let l=V.image;if(l===null)C0("WebGLRenderer: Texture marked for update but no image data found.");else if(l.complete===!1)C0("WebGLRenderer: Texture marked for update but image is incomplete");else{F0(T,V,R);return}}else if(V.isExternalTexture)T.__webglTexture=V.sourceTexture?V.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+R)}function e(V,R){let T=Z.get(V);if(V.isRenderTargetTexture===!1&&V.version>0&&T.__version!==V.version){F0(T,V,R);return}else if(V.isExternalTexture)T.__webglTexture=V.sourceTexture?V.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+R)}function J0(V,R){let T=Z.get(V);if(V.isRenderTargetTexture===!1&&V.version>0&&T.__version!==V.version){F0(T,V,R);return}$.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+R)}function E0(V,R){let T=Z.get(V);if(V.isCubeDepthTexture!==!0&&V.version>0&&T.__version!==V.version){f0(T,V,R);return}$.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+R)}let R0={[FW]:J.REPEAT,[W6]:J.CLAMP_TO_EDGE,[DW]:J.MIRRORED_REPEAT},n0={[x9]:J.NEAREST,[OW]:J.NEAREST_MIPMAP_NEAREST,[U7]:J.NEAREST_MIPMAP_LINEAR,[IJ]:J.LINEAR,[K6]:J.LINEAR_MIPMAP_NEAREST,[r9]:J.LINEAR_MIPMAP_LINEAR},w0={[AW]:J.NEVER,[TW]:J.ALWAYS,[_W]:J.LESS,[E6]:J.LEQUAL,[CW]:J.EQUAL,[q6]:J.GEQUAL,[PW]:J.GREATER,[wW]:J.NOTEQUAL};function d(V,R){if(R.type===B9&&Q.has("OES_texture_float_linear")===!1&&(R.magFilter===IJ||R.magFilter===K6||R.magFilter===U7||R.magFilter===r9||R.minFilter===IJ||R.minFilter===K6||R.minFilter===U7||R.minFilter===r9))C0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(V,J.TEXTURE_WRAP_S,R0[R.wrapS]),J.texParameteri(V,J.TEXTURE_WRAP_T,R0[R.wrapT]),V===J.TEXTURE_3D||V===J.TEXTURE_2D_ARRAY)J.texParameteri(V,J.TEXTURE_WRAP_R,R0[R.wrapR]);if(J.texParameteri(V,J.TEXTURE_MAG_FILTER,n0[R.magFilter]),J.texParameteri(V,J.TEXTURE_MIN_FILTER,n0[R.minFilter]),R.compareFunction)J.texParameteri(V,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(V,J.TEXTURE_COMPARE_FUNC,w0[R.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===x9)return;if(R.minFilter!==U7&&R.minFilter!==r9)return;if(R.type===B9&&Q.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||Z.get(R).__currentAnisotropy){let T=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(V,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,W.getMaxAnisotropy())),Z.get(R).__currentAnisotropy=R.anisotropy}}}function Q0(V,R){let T=!1;if(V.__webglInit===void 0)V.__webglInit=!0,R.addEventListener("dispose",P);let l=R.source,t=D.get(l);if(t===void 0)t={},D.set(l,t);let $0=f(R);if($0!==V.__cacheKey){if(t[$0]===void 0)t[$0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,T=!0;t[$0].usedTimes++;let X0=t[V.__cacheKey];if(X0!==void 0){if(t[V.__cacheKey].usedTimes--,X0.usedTimes===0)p(R)}V.__cacheKey=$0,V.__webglTexture=t[$0].texture}return T}function K0(V,R,T){return Math.floor(Math.floor(V/T)/R)}function D0(V,R,T,l){let $0=V.updateRanges;if($0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,R.width,R.height,T,l,R.data);else{$0.sort((I0,U0)=>I0.start-U0.start);let X0=0;for(let I0=1;I0<$0.length;I0++){let U0=$0[X0],Z0=$0[I0],_0=U0.start+U0.count,P0=K0(Z0.start,R.width,4),i0=K0(U0.start,R.width,4);if(Z0.start<=_0+1&&P0===i0&&K0(Z0.start+Z0.count-1,R.width,4)===P0)U0.count=Math.max(U0.count,Z0.start+Z0.count-U0.start);else++X0,$0[X0]=Z0}$0.length=X0+1;let c=$.getParameter(J.UNPACK_ROW_LENGTH),o=$.getParameter(J.UNPACK_SKIP_PIXELS),O0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,R.width);for(let I0=0,U0=$0.length;I0<U0;I0++){let Z0=$0[I0],_0=Math.floor(Z0.start/4),P0=Math.ceil(Z0.count/4),i0=_0%R.width,S=Math.floor(_0/R.width),W0=P0,i=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,i0),$.pixelStorei(J.UNPACK_SKIP_ROWS,S),$.texSubImage2D(J.TEXTURE_2D,0,i0,S,W0,1,T,l,R.data)}V.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,c),$.pixelStorei(J.UNPACK_SKIP_PIXELS,o),$.pixelStorei(J.UNPACK_SKIP_ROWS,O0)}}function F0(V,R,T){let l=J.TEXTURE_2D;if(R.isDataArrayTexture||R.isCompressedArrayTexture)l=J.TEXTURE_2D_ARRAY;if(R.isData3DTexture)l=J.TEXTURE_3D;let t=Q0(V,R),$0=R.source;$.bindTexture(l,V.__webglTexture,J.TEXTURE0+T);let X0=Z.get($0);if($0.version!==X0.__version||t===!0){if($.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&R.image instanceof ImageBitmap)===!1){let i=u0.getPrimaries(u0.workingColorSpace),H0=R.colorSpace===Q8?null:u0.getPrimaries(R.colorSpace),k0=R.colorSpace===Q8||i===H0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,R.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,k0)}$.pixelStorei(J.UNPACK_ALIGNMENT,R.unpackAlignment);let o=q(R.image,!1,W.maxTextureSize);o=o0(R,o);let O0=K.convert(R.format,R.colorSpace),I0=K.convert(R.type),U0=L(R.internalFormat,O0,I0,R.normalized,R.colorSpace,R.isVideoTexture);d(l,R);let Z0,_0=R.mipmaps,P0=R.isVideoTexture!==!0,i0=X0.__version===void 0||t===!0,S=$0.dataReady,W0=z(R,o);if(R.isDepthTexture){if(U0=A(R.format===e9,R.type),i0)if(P0)$.texStorage2D(J.TEXTURE_2D,1,U0,o.width,o.height);else $.texImage2D(J.TEXTURE_2D,0,U0,o.width,o.height,0,O0,I0,null)}else if(R.isDataTexture)if(_0.length>0){if(P0&&i0)$.texStorage2D(J.TEXTURE_2D,W0,U0,_0[0].width,_0[0].height);for(let i=0,H0=_0.length;i<H0;i++)if(Z0=_0[i],P0){if(S)$.texSubImage2D(J.TEXTURE_2D,i,0,0,Z0.width,Z0.height,O0,I0,Z0.data)}else $.texImage2D(J.TEXTURE_2D,i,U0,Z0.width,Z0.height,0,O0,I0,Z0.data);R.generateMipmaps=!1}else if(P0){if(i0)$.texStorage2D(J.TEXTURE_2D,W0,U0,o.width,o.height);if(S)D0(R,o,O0,I0)}else $.texImage2D(J.TEXTURE_2D,0,U0,o.width,o.height,0,O0,I0,o.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){if(P0&&i0)$.texStorage3D(J.TEXTURE_2D_ARRAY,W0,U0,_0[0].width,_0[0].height,o.depth);for(let i=0,H0=_0.length;i<H0;i++)if(Z0=_0[i],R.format!==H9)if(O0!==null)if(P0){if(S)if(R.layerUpdates.size>0){let k0=j$(Z0.width,Z0.height,R.format,R.type);for(let r of R.layerUpdates){let Y0=Z0.data.subarray(r*k0/Z0.data.BYTES_PER_ELEMENT,(r+1)*k0/Z0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,i,0,0,r,Z0.width,Z0.height,1,O0,Y0)}R.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,i,0,0,0,Z0.width,Z0.height,o.depth,O0,Z0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,i,U0,Z0.width,Z0.height,o.depth,0,Z0.data,0,0);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(P0){if(S)$.texSubImage3D(J.TEXTURE_2D_ARRAY,i,0,0,0,Z0.width,Z0.height,o.depth,O0,I0,Z0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,i,U0,Z0.width,Z0.height,o.depth,0,O0,I0,Z0.data)}else{if(P0&&i0)$.texStorage2D(J.TEXTURE_2D,W0,U0,_0[0].width,_0[0].height);for(let i=0,H0=_0.length;i<H0;i++)if(Z0=_0[i],R.format!==H9)if(O0!==null)if(P0){if(S)$.compressedTexSubImage2D(J.TEXTURE_2D,i,0,0,Z0.width,Z0.height,O0,Z0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,i,U0,Z0.width,Z0.height,0,Z0.data);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(P0){if(S)$.texSubImage2D(J.TEXTURE_2D,i,0,0,Z0.width,Z0.height,O0,I0,Z0.data)}else $.texImage2D(J.TEXTURE_2D,i,U0,Z0.width,Z0.height,0,O0,I0,Z0.data)}else if(R.isDataArrayTexture)if(P0){if(i0)$.texStorage3D(J.TEXTURE_2D_ARRAY,W0,U0,o.width,o.height,o.depth);if(S)if(R.layerUpdates.size>0){let i=j$(o.width,o.height,R.format,R.type);for(let H0 of R.layerUpdates){let k0=o.data.subarray(H0*i/o.data.BYTES_PER_ELEMENT,(H0+1)*i/o.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,H0,o.width,o.height,1,O0,I0,k0)}R.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,o.width,o.height,o.depth,O0,I0,o.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,U0,o.width,o.height,o.depth,0,O0,I0,o.data);else if(R.isData3DTexture)if(P0){if(i0)$.texStorage3D(J.TEXTURE_3D,W0,U0,o.width,o.height,o.depth);if(S)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,o.width,o.height,o.depth,O0,I0,o.data)}else $.texImage3D(J.TEXTURE_3D,0,U0,o.width,o.height,o.depth,0,O0,I0,o.data);else if(R.isFramebufferTexture){if(i0)if(P0)$.texStorage2D(J.TEXTURE_2D,W0,U0,o.width,o.height);else{let{width:i,height:H0}=o;for(let k0=0;k0<W0;k0++)$.texImage2D(J.TEXTURE_2D,k0,U0,i,H0,0,O0,I0,null),i>>=1,H0>>=1}}else if(R.isHTMLTexture){if("texElementImage2D"in J){let i=J.canvas;if(!i.hasAttribute("layoutsubtree"))i.setAttribute("layoutsubtree","true");if(o.parentNode!==i){i.appendChild(o),E.add(R),i.onpaint=(H0)=>{let k0=H0.changedElements;for(let r of E)if(k0.includes(r.image))r.needsUpdate=!0},i.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,o);else{let{RGBA:k0,RGBA:r,UNSIGNED_BYTE:Y0}=J;J.texElementImage2D(J.TEXTURE_2D,0,k0,r,Y0,o)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(_0.length>0){if(P0&&i0){let i=KJ(_0[0]);$.texStorage2D(J.TEXTURE_2D,W0,U0,i.width,i.height)}for(let i=0,H0=_0.length;i<H0;i++)if(Z0=_0[i],P0){if(S)$.texSubImage2D(J.TEXTURE_2D,i,0,0,O0,I0,Z0)}else $.texImage2D(J.TEXTURE_2D,i,U0,O0,I0,Z0);R.generateMipmaps=!1}else if(P0){if(i0){let i=KJ(o);$.texStorage2D(J.TEXTURE_2D,W0,U0,i.width,i.height)}if(S)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O0,I0,o)}else $.texImage2D(J.TEXTURE_2D,0,U0,O0,I0,o);if(F(R))_(l);if(X0.__version=$0.version,R.onUpdate)R.onUpdate(R)}V.__version=R.version}function f0(V,R,T){if(R.image.length!==6)return;let l=Q0(V,R),t=R.source;$.bindTexture(J.TEXTURE_CUBE_MAP,V.__webglTexture,J.TEXTURE0+T);let $0=Z.get(t);if(t.version!==$0.__version||l===!0){$.activeTexture(J.TEXTURE0+T);let X0=u0.getPrimaries(u0.workingColorSpace),c=R.colorSpace===Q8?null:u0.getPrimaries(R.colorSpace),o=R.colorSpace===Q8||X0===c?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,R.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,R.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,o);let O0=R.isCompressedTexture||R.image[0].isCompressedTexture,I0=R.image[0]&&R.image[0].isDataTexture,U0=[];for(let r=0;r<6;r++){if(!O0&&!I0)U0[r]=q(R.image[r],!0,W.maxCubemapSize);else U0[r]=I0?R.image[r].image:R.image[r];U0[r]=o0(R,U0[r])}let Z0=U0[0],_0=K.convert(R.format,R.colorSpace),P0=K.convert(R.type),i0=L(R.internalFormat,_0,P0,R.normalized,R.colorSpace),S=R.isVideoTexture!==!0,W0=$0.__version===void 0||l===!0,i=t.dataReady,H0=z(R,Z0);d(J.TEXTURE_CUBE_MAP,R);let k0;if(O0){if(S&&W0)$.texStorage2D(J.TEXTURE_CUBE_MAP,H0,i0,Z0.width,Z0.height);for(let r=0;r<6;r++){k0=U0[r].mipmaps;for(let Y0=0;Y0<k0.length;Y0++){let v0=k0[Y0];if(R.format!==H9)if(_0!==null)if(S){if(i)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0,0,0,v0.width,v0.height,_0,v0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0,i0,v0.width,v0.height,0,v0.data);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0,0,0,v0.width,v0.height,_0,P0,v0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0,i0,v0.width,v0.height,0,_0,P0,v0.data)}}}else{if(k0=R.mipmaps,S&&W0){if(k0.length>0)H0++;let r=KJ(U0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,H0,i0,r.width,r.height)}for(let r=0;r<6;r++)if(I0){if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,U0[r].width,U0[r].height,_0,P0,U0[r].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,i0,U0[r].width,U0[r].height,0,_0,P0,U0[r].data);for(let Y0=0;Y0<k0.length;Y0++){let GJ=k0[Y0].image[r].image;if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0+1,0,0,GJ.width,GJ.height,_0,P0,GJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0+1,i0,GJ.width,GJ.height,0,_0,P0,GJ.data)}}else{if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,_0,P0,U0[r])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,i0,_0,P0,U0[r]);for(let Y0=0;Y0<k0.length;Y0++){let v0=k0[Y0];if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0+1,0,0,_0,P0,v0.image[r])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0+1,i0,_0,P0,v0.image[r])}}}if(F(R))_(J.TEXTURE_CUBE_MAP);if($0.__version=t.version,R.onUpdate)R.onUpdate(R)}V.__version=R.version}function b0(V,R,T,l,t,$0){let X0=K.convert(T.format,T.colorSpace),c=K.convert(T.type),o=L(T.internalFormat,X0,c,T.normalized,T.colorSpace),O0=Z.get(R),I0=Z.get(T);if(I0.__renderTarget=R,!O0.__hasExternalTextures){let U0=Math.max(1,R.width>>$0),Z0=Math.max(1,R.height>>$0);if(t===J.TEXTURE_3D||t===J.TEXTURE_2D_ARRAY)$.texImage3D(t,$0,o,U0,Z0,R.depth,0,X0,c,null);else $.texImage2D(t,$0,o,U0,Z0,0,X0,c,null)}if($.bindFramebuffer(J.FRAMEBUFFER,V),j(R))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,l,t,I0.__webglTexture,0,OJ(R));else if(t===J.TEXTURE_2D||t>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&t<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,l,t,I0.__webglTexture,$0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function B0(V,R,T){if(J.bindRenderbuffer(J.RENDERBUFFER,V),R.depthBuffer){let l=R.depthTexture,t=l&&l.isDepthTexture?l.type:null,$0=A(R.stencilBuffer,t),X0=R.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(R))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,OJ(R),$0,R.width,R.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,OJ(R),$0,R.width,R.height);else J.renderbufferStorage(J.RENDERBUFFER,$0,R.width,R.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,X0,J.RENDERBUFFER,V)}else{let l=R.textures;for(let t=0;t<l.length;t++){let $0=l[t],X0=K.convert($0.format,$0.colorSpace),c=K.convert($0.type),o=L($0.internalFormat,X0,c,$0.normalized,$0.colorSpace);if(j(R))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,OJ(R),o,R.width,R.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,OJ(R),o,R.width,R.height);else J.renderbufferStorage(J.RENDERBUFFER,o,R.width,R.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function x0(V,R,T){let l=R.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,V),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let t=Z.get(R.depthTexture);if(t.__renderTarget=R,!t.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0;if(l){if(t.__webglInit===void 0)t.__webglInit=!0,R.depthTexture.addEventListener("dispose",P);if(t.__webglTexture===void 0){t.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,t.__webglTexture),d(J.TEXTURE_CUBE_MAP,R.depthTexture);let O0=K.convert(R.depthTexture.format),I0=K.convert(R.depthTexture.type),U0;if(R.depthTexture.format===t9)U0=J.DEPTH_COMPONENT24;else if(R.depthTexture.format===e9)U0=J.DEPTH24_STENCIL8;for(let Z0=0;Z0<6;Z0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,0,U0,R.width,R.height,0,O0,I0,null)}}else a(R.depthTexture,0);let $0=t.__webglTexture,X0=OJ(R),c=l?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,o=R.depthTexture.format===e9?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(R.depthTexture.format===t9)if(j(R))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,c,$0,0,X0);else J.framebufferTexture2D(J.FRAMEBUFFER,o,c,$0,0);else if(R.depthTexture.format===e9)if(j(R))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,c,$0,0,X0);else J.framebufferTexture2D(J.FRAMEBUFFER,o,c,$0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function p0(V){let R=Z.get(V),T=V.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==V.depthTexture){let l=V.depthTexture;if(R.__depthDisposeCallback)R.__depthDisposeCallback();if(l){let t=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,l.removeEventListener("dispose",t)};l.addEventListener("dispose",t),R.__depthDisposeCallback=t}R.__boundDepthTexture=l}if(V.depthTexture&&!R.__autoAllocateDepthBuffer)if(T)for(let l=0;l<6;l++)x0(R.__webglFramebuffer[l],V,l);else{let l=V.texture.mipmaps;if(l&&l.length>0)x0(R.__webglFramebuffer[0],V,0);else x0(R.__webglFramebuffer,V,0)}else if(T){R.__webglDepthbuffer=[];for(let l=0;l<6;l++)if($.bindFramebuffer(J.FRAMEBUFFER,R.__webglFramebuffer[l]),R.__webglDepthbuffer[l]===void 0)R.__webglDepthbuffer[l]=J.createRenderbuffer(),B0(R.__webglDepthbuffer[l],V,!1);else{let t=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,$0=R.__webglDepthbuffer[l];J.bindRenderbuffer(J.RENDERBUFFER,$0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,$0)}}else{let l=V.texture.mipmaps;if(l&&l.length>0)$.bindFramebuffer(J.FRAMEBUFFER,R.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,R.__webglFramebuffer);if(R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=J.createRenderbuffer(),B0(R.__webglDepthbuffer,V,!1);else{let t=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,$0=R.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,$0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,$0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function j0(V,R,T){let l=Z.get(V);if(R!==void 0)b0(l.__webglFramebuffer,V,V.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)p0(V)}function UJ(V){let R=V.texture,T=Z.get(V),l=Z.get(R);V.addEventListener("dispose",O);let t=V.textures,$0=V.isWebGLCubeRenderTarget===!0,X0=t.length>1;if(!X0){if(l.__webglTexture===void 0)l.__webglTexture=J.createTexture();l.__version=R.version,H.memory.textures++}if($0){T.__webglFramebuffer=[];for(let c=0;c<6;c++)if(R.mipmaps&&R.mipmaps.length>0){T.__webglFramebuffer[c]=[];for(let o=0;o<R.mipmaps.length;o++)T.__webglFramebuffer[c][o]=J.createFramebuffer()}else T.__webglFramebuffer[c]=J.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){T.__webglFramebuffer=[];for(let c=0;c<R.mipmaps.length;c++)T.__webglFramebuffer[c]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(X0)for(let c=0,o=t.length;c<o;c++){let O0=Z.get(t[c]);if(O0.__webglTexture===void 0)O0.__webglTexture=J.createTexture(),H.memory.textures++}if(V.samples>0&&j(V)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let c=0;c<t.length;c++){let o=t[c];T.__webglColorRenderbuffer[c]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[c]);let O0=K.convert(o.format,o.colorSpace),I0=K.convert(o.type),U0=L(o.internalFormat,O0,I0,o.normalized,o.colorSpace,V.isXRRenderTarget===!0),Z0=OJ(V);J.renderbufferStorageMultisample(J.RENDERBUFFER,Z0,U0,V.width,V.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+c,J.RENDERBUFFER,T.__webglColorRenderbuffer[c])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),V.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),B0(T.__webglDepthRenderbuffer,V,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if($0){$.bindTexture(J.TEXTURE_CUBE_MAP,l.__webglTexture),d(J.TEXTURE_CUBE_MAP,R);for(let c=0;c<6;c++)if(R.mipmaps&&R.mipmaps.length>0)for(let o=0;o<R.mipmaps.length;o++)b0(T.__webglFramebuffer[c][o],V,R,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+c,o);else b0(T.__webglFramebuffer[c],V,R,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+c,0);if(F(R))_(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(X0){for(let c=0,o=t.length;c<o;c++){let O0=t[c],I0=Z.get(O0),U0=J.TEXTURE_2D;if(V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)U0=V.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(U0,I0.__webglTexture),d(U0,O0),b0(T.__webglFramebuffer,V,O0,J.COLOR_ATTACHMENT0+c,U0,0),F(O0))_(U0)}$.unbindTexture()}else{let c=J.TEXTURE_2D;if(V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)c=V.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(c,l.__webglTexture),d(c,R),R.mipmaps&&R.mipmaps.length>0)for(let o=0;o<R.mipmaps.length;o++)b0(T.__webglFramebuffer[o],V,R,J.COLOR_ATTACHMENT0,c,o);else b0(T.__webglFramebuffer,V,R,J.COLOR_ATTACHMENT0,c,0);if(F(R))_(c);$.unbindTexture()}if(V.depthBuffer)p0(V)}function yJ(V){let R=V.textures;for(let T=0,l=R.length;T<l;T++){let t=R[T];if(F(t)){let $0=C(V),X0=Z.get(t).__webglTexture;$.bindTexture($0,X0),_($0),$.unbindTexture()}}}let c0=[],BJ=[];function MJ(V){if(V.samples>0){if(j(V)===!1){let{textures:R,width:T,height:l}=V,t=J.COLOR_BUFFER_BIT,$0=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,X0=Z.get(V),c=R.length>1;if(c)for(let O0=0;O0<R.length;O0++)$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+O0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+O0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,X0.__webglMultisampledFramebuffer);let o=V.texture.mipmaps;if(o&&o.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglFramebuffer);for(let O0=0;O0<R.length;O0++){if(V.resolveDepthBuffer){if(V.depthBuffer)t|=J.DEPTH_BUFFER_BIT;if(V.stencilBuffer&&V.resolveStencilBuffer)t|=J.STENCIL_BUFFER_BIT}if(c){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,X0.__webglColorRenderbuffer[O0]);let I0=Z.get(R[O0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,I0,0)}if(J.blitFramebuffer(0,0,T,l,0,0,T,l,t,J.NEAREST),U===!0){if(c0.length=0,BJ.length=0,c0.push(J.COLOR_ATTACHMENT0+O0),V.depthBuffer&&V.resolveDepthBuffer===!1)c0.push($0),BJ.push($0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,BJ);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,c0)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),c)for(let O0=0;O0<R.length;O0++){$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+O0,J.RENDERBUFFER,X0.__webglColorRenderbuffer[O0]);let I0=Z.get(R[O0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+O0,J.TEXTURE_2D,I0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglMultisampledFramebuffer)}else if(V.depthBuffer&&V.resolveDepthBuffer===!1&&U){let R=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[R])}}}function OJ(V){return Math.min(W.maxSamples,V.samples)}function j(V){let R=Z.get(V);return V.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function pJ(V){let R=H.render.frame;if(N.get(V)!==R)N.set(V,R),V.update()}function o0(V,R){let{colorSpace:T,format:l,type:t}=V;if(V.isCompressedTexture===!0||V.isVideoTexture===!0)return R;if(T!==J$&&T!==Q8)if(u0.getTransfer(T)===QJ){if(l!==H9||t!==gJ)C0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else T0("WebGLTextures: Unsupported texture color space:",T);return R}function KJ(V){if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement)X.width=V.naturalWidth||V.width,X.height=V.naturalHeight||V.height;else if(typeof VideoFrame<"u"&&V instanceof VideoFrame)X.width=V.displayWidth,X.height=V.displayHeight;else X.width=V.width,X.height=V.height;return X}this.allocateTextureUnit=n,this.resetTextureUnits=s,this.getTextureUnits=b,this.setTextureUnits=u,this.setTexture2D=a,this.setTexture2DArray=e,this.setTexture3D=J0,this.setTextureCube=E0,this.rebindTextures=j0,this.setupRenderTarget=UJ,this.updateRenderTargetMipmap=yJ,this.updateMultisampleRenderTarget=MJ,this.setupDepthRenderbuffer=p0,this.setupFrameBufferTexture=b0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function AN(J,Q){function $(Z,W=Q8){let K,H=u0.getTransfer(W);if(Z===gJ)return J.UNSIGNED_BYTE;if(Z===kQ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===MQ)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===MW)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===LW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===RW)return J.BYTE;if(Z===kW)return J.SHORT;if(Z===G7)return J.UNSIGNED_SHORT;if(Z===RQ)return J.INT;if(Z===K9)return J.UNSIGNED_INT;if(Z===B9)return J.FLOAT;if(Z===rJ)return J.HALF_FLOAT;if(Z===VW)return J.ALPHA;if(Z===BW)return J.RGB;if(Z===H9)return J.RGBA;if(Z===t9)return J.DEPTH_COMPONENT;if(Z===e9)return J.DEPTH_STENCIL;if(Z===IW)return J.RED;if(Z===LQ)return J.RED_INTEGER;if(Z===J8)return J.RG;if(Z===VQ)return J.RG_INTEGER;if(Z===BQ)return J.RGBA_INTEGER;if(Z===H6||Z===Y6||Z===X6||Z===U6)if(H===QJ)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(Z===H6)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===Y6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===X6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===U6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(Z===H6)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===Y6)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===X6)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===U6)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===IQ||Z===zQ||Z===AQ||Z===_Q)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(Z===IQ)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===zQ)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===AQ)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===_Q)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===CQ||Z===PQ||Z===wQ||Z===TQ||Z===SQ||Z===G6||Z===jQ)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(Z===CQ||Z===PQ)return H===QJ?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(Z===wQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(Z===TQ)return K.COMPRESSED_R11_EAC;if(Z===SQ)return K.COMPRESSED_SIGNED_R11_EAC;if(Z===G6)return K.COMPRESSED_RG11_EAC;if(Z===jQ)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===yQ||Z===vQ||Z===fQ||Z===bQ||Z===hQ||Z===xQ||Z===gQ||Z===pQ||Z===mQ||Z===lQ||Z===dQ||Z===uQ||Z===cQ||Z===nQ)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(Z===yQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===vQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===fQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===bQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===hQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===xQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===gQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===pQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===mQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===lQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===dQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===uQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===cQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===nQ)return H===QJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===sQ||Z===iQ||Z===oQ)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(Z===sQ)return H===QJ?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===iQ)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===oQ)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===aQ||Z===rQ||Z===N6||Z===tQ)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(Z===aQ)return K.COMPRESSED_RED_RGTC1_EXT;if(Z===rQ)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===N6)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===tQ)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===f8)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}class LK{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new V6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new zJ({vertexShader:_N,fragmentShader:CN,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new XJ(new K8(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}function wN(J,Q){function $(q,F){if(q.matrixAutoUpdate===!0)q.updateMatrix();F.value.copy(q.matrix)}function Z(q,F){if(F.color.getRGB(q.fogColor.value,E$(J)),F.isFog)q.fogNear.value=F.near,q.fogFar.value=F.far;else if(F.isFogExp2)q.fogDensity.value=F.density}function W(q,F,_,C,L){if(F.isNodeMaterial)F.uniformsNeedUpdate=!1;else if(F.isMeshBasicMaterial)K(q,F);else if(F.isMeshLambertMaterial){if(K(q,F),F.envMap)q.envMapIntensity.value=F.envMapIntensity}else if(F.isMeshToonMaterial)K(q,F),E(q,F);else if(F.isMeshPhongMaterial){if(K(q,F),N(q,F),F.envMap)q.envMapIntensity.value=F.envMapIntensity}else if(F.isMeshStandardMaterial){if(K(q,F),G(q,F),F.isMeshPhysicalMaterial)D(q,F,L)}else if(F.isMeshMatcapMaterial)K(q,F),k(q,F);else if(F.isMeshDepthMaterial)K(q,F);else if(F.isMeshDistanceMaterial)K(q,F),I(q,F);else if(F.isMeshNormalMaterial)K(q,F);else if(F.isLineBasicMaterial){if(H(q,F),F.isLineDashedMaterial)Y(q,F)}else if(F.isPointsMaterial)U(q,F,_,C);else if(F.isSpriteMaterial)X(q,F);else if(F.isShadowMaterial)q.color.value.copy(F.color),q.opacity.value=F.opacity;else if(F.isShaderMaterial)F.uniformsNeedUpdate=!1}function K(q,F){if(q.opacity.value=F.opacity,F.color)q.diffuse.value.copy(F.color);if(F.emissive)q.emissive.value.copy(F.emissive).multiplyScalar(F.emissiveIntensity);if(F.map)q.map.value=F.map,$(F.map,q.mapTransform);if(F.alphaMap)q.alphaMap.value=F.alphaMap,$(F.alphaMap,q.alphaMapTransform);if(F.bumpMap){if(q.bumpMap.value=F.bumpMap,$(F.bumpMap,q.bumpMapTransform),q.bumpScale.value=F.bumpScale,F.side===TJ)q.bumpScale.value*=-1}if(F.normalMap){if(q.normalMap.value=F.normalMap,$(F.normalMap,q.normalMapTransform),q.normalScale.value.copy(F.normalScale),F.side===TJ)q.normalScale.value.negate()}if(F.displacementMap)q.displacementMap.value=F.displacementMap,$(F.displacementMap,q.displacementMapTransform),q.displacementScale.value=F.displacementScale,q.displacementBias.value=F.displacementBias;if(F.emissiveMap)q.emissiveMap.value=F.emissiveMap,$(F.emissiveMap,q.emissiveMapTransform);if(F.specularMap)q.specularMap.value=F.specularMap,$(F.specularMap,q.specularMapTransform);if(F.alphaTest>0)q.alphaTest.value=F.alphaTest;let _=Q.get(F),C=_.envMap,L=_.envMapRotation;if(C){if(q.envMap.value=C,q.envMapRotation.value.setFromMatrix4(PN.makeRotationFromEuler(L)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1)q.envMapRotation.value.premultiply(BK);q.reflectivity.value=F.reflectivity,q.ior.value=F.ior,q.refractionRatio.value=F.refractionRatio}if(F.lightMap)q.lightMap.value=F.lightMap,q.lightMapIntensity.value=F.lightMapIntensity,$(F.lightMap,q.lightMapTransform);if(F.aoMap)q.aoMap.value=F.aoMap,q.aoMapIntensity.value=F.aoMapIntensity,$(F.aoMap,q.aoMapTransform)}function H(q,F){if(q.diffuse.value.copy(F.color),q.opacity.value=F.opacity,F.map)q.map.value=F.map,$(F.map,q.mapTransform)}function Y(q,F){q.dashSize.value=F.dashSize,q.totalSize.value=F.dashSize+F.gapSize,q.scale.value=F.scale}function U(q,F,_,C){if(q.diffuse.value.copy(F.color),q.opacity.value=F.opacity,q.size.value=F.size*_,q.scale.value=C*0.5,F.map)q.map.value=F.map,$(F.map,q.uvTransform);if(F.alphaMap)q.alphaMap.value=F.alphaMap,$(F.alphaMap,q.alphaMapTransform);if(F.alphaTest>0)q.alphaTest.value=F.alphaTest}function X(q,F){if(q.diffuse.value.copy(F.color),q.opacity.value=F.opacity,q.rotation.value=F.rotation,F.map)q.map.value=F.map,$(F.map,q.mapTransform);if(F.alphaMap)q.alphaMap.value=F.alphaMap,$(F.alphaMap,q.alphaMapTransform);if(F.alphaTest>0)q.alphaTest.value=F.alphaTest}function N(q,F){q.specular.value.copy(F.specular),q.shininess.value=Math.max(F.shininess,0.0001)}function E(q,F){if(F.gradientMap)q.gradientMap.value=F.gradientMap}function G(q,F){if(q.metalness.value=F.metalness,F.metalnessMap)q.metalnessMap.value=F.metalnessMap,$(F.metalnessMap,q.metalnessMapTransform);if(q.roughness.value=F.roughness,F.roughnessMap)q.roughnessMap.value=F.roughnessMap,$(F.roughnessMap,q.roughnessMapTransform);if(F.envMap)q.envMapIntensity.value=F.envMapIntensity}function D(q,F,_){if(q.ior.value=F.ior,F.sheen>0){if(q.sheenColor.value.copy(F.sheenColor).multiplyScalar(F.sheen),q.sheenRoughness.value=F.sheenRoughness,F.sheenColorMap)q.sheenColorMap.value=F.sheenColorMap,$(F.sheenColorMap,q.sheenColorMapTransform);if(F.sheenRoughnessMap)q.sheenRoughnessMap.value=F.sheenRoughnessMap,$(F.sheenRoughnessMap,q.sheenRoughnessMapTransform)}if(F.clearcoat>0){if(q.clearcoat.value=F.clearcoat,q.clearcoatRoughness.value=F.clearcoatRoughness,F.clearcoatMap)q.clearcoatMap.value=F.clearcoatMap,$(F.clearcoatMap,q.clearcoatMapTransform);if(F.clearcoatRoughnessMap)q.clearcoatRoughnessMap.value=F.clearcoatRoughnessMap,$(F.clearcoatRoughnessMap,q.clearcoatRoughnessMapTransform);if(F.clearcoatNormalMap){if(q.clearcoatNormalMap.value=F.clearcoatNormalMap,$(F.clearcoatNormalMap,q.clearcoatNormalMapTransform),q.clearcoatNormalScale.value.copy(F.clearcoatNormalScale),F.side===TJ)q.clearcoatNormalScale.value.negate()}}if(F.dispersion>0)q.dispersion.value=F.dispersion;if(F.iridescence>0){if(q.iridescence.value=F.iridescence,q.iridescenceIOR.value=F.iridescenceIOR,q.iridescenceThicknessMinimum.value=F.iridescenceThicknessRange[0],q.iridescenceThicknessMaximum.value=F.iridescenceThicknessRange[1],F.iridescenceMap)q.iridescenceMap.value=F.iridescenceMap,$(F.iridescenceMap,q.iridescenceMapTransform);if(F.iridescenceThicknessMap)q.iridescenceThicknessMap.value=F.iridescenceThicknessMap,$(F.iridescenceThicknessMap,q.iridescenceThicknessMapTransform)}if(F.transmission>0){if(q.transmission.value=F.transmission,q.transmissionSamplerMap.value=_.texture,q.transmissionSamplerSize.value.set(_.width,_.height),F.transmissionMap)q.transmissionMap.value=F.transmissionMap,$(F.transmissionMap,q.transmissionMapTransform);if(q.thickness.value=F.thickness,F.thicknessMap)q.thicknessMap.value=F.thicknessMap,$(F.thicknessMap,q.thicknessMapTransform);q.attenuationDistance.value=F.attenuationDistance,q.attenuationColor.value.copy(F.attenuationColor)}if(F.anisotropy>0){if(q.anisotropyVector.value.set(F.anisotropy*Math.cos(F.anisotropyRotation),F.anisotropy*Math.sin(F.anisotropyRotation)),F.anisotropyMap)q.anisotropyMap.value=F.anisotropyMap,$(F.anisotropyMap,q.anisotropyMapTransform)}if(q.specularIntensity.value=F.specularIntensity,q.specularColor.value.copy(F.specularColor),F.specularColorMap)q.specularColorMap.value=F.specularColorMap,$(F.specularColorMap,q.specularColorMapTransform);if(F.specularIntensityMap)q.specularIntensityMap.value=F.specularIntensityMap,$(F.specularIntensityMap,q.specularIntensityMapTransform)}function k(q,F){if(F.matcap)q.matcap.value=F.matcap}function I(q,F){let _=Q.get(F).light;q.referencePosition.value.setFromMatrixPosition(_.matrixWorld),q.nearDistance.value=_.shadow.camera.near,q.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:W}}function TN(J,Q,$,Z){let W={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function U(L,A){let z=A.program;Z.uniformBlockBinding(L,z)}function X(L,A){let z=W[L.id];if(z===void 0)q(L),z=N(L),W[L.id]=z,L.addEventListener("dispose",_);let P=A.program;Z.updateUBOMapping(L,P);let O=Q.render.frame;if(K[L.id]!==O)G(L),K[L.id]=O}function N(L){let A=E();L.__bindingPointIndex=A;let z=J.createBuffer(),P=L.__size,O=L.usage;return J.bindBuffer(J.UNIFORM_BUFFER,z),J.bufferData(J.UNIFORM_BUFFER,P,O),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,A,z),z}function E(){for(let L=0;L<Y;L++)if(H.indexOf(L)===-1)return H.push(L),L;return T0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(L){let A=W[L.id],z=L.uniforms,P=L.__cache;J.bindBuffer(J.UNIFORM_BUFFER,A);for(let O=0,B=z.length;O<B;O++){let p=z[O];if(Array.isArray(p))for(let w=0,g=p.length;w<g;w++)D(p[w],O,w,P);else D(p,O,0,P)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(L,A,z,P){if(I(L,A,z,P)===!0){let{__offset:O,value:B}=L;if(Array.isArray(B)){let p=0;for(let w=0;w<B.length;w++){let g=B[w],s=F(g);if(k(g,L.__data,p),typeof g!=="number"&&typeof g!=="boolean"&&!g.isMatrix3&&!ArrayBuffer.isView(g))p+=s.storage/Float32Array.BYTES_PER_ELEMENT}}else k(B,L.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,O,L.__data)}}function k(L,A,z){if(typeof L==="number"||typeof L==="boolean")A[0]=L;else if(L.isMatrix3)A[0]=L.elements[0],A[1]=L.elements[1],A[2]=L.elements[2],A[3]=0,A[4]=L.elements[3],A[5]=L.elements[4],A[6]=L.elements[5],A[7]=0,A[8]=L.elements[6],A[9]=L.elements[7],A[10]=L.elements[8],A[11]=0;else if(ArrayBuffer.isView(L))A.set(new L.constructor(L.buffer,L.byteOffset,A.length));else L.toArray(A,z)}function I(L,A,z,P){let O=L.value,B=A+"_"+z;if(P[B]===void 0){if(typeof O==="number"||typeof O==="boolean")P[B]=O;else if(ArrayBuffer.isView(O))P[B]=O.slice();else P[B]=O.clone();return!0}else{let p=P[B];if(typeof O==="number"||typeof O==="boolean"){if(p!==O)return P[B]=O,!0}else if(ArrayBuffer.isView(O))return!0;else if(p.equals(O)===!1)return p.copy(O),!0}return!1}function q(L){let A=L.uniforms,z=0,P=16;for(let B=0,p=A.length;B<p;B++){let w=Array.isArray(A[B])?A[B]:[A[B]];for(let g=0,s=w.length;g<s;g++){let b=w[g],u=Array.isArray(b.value)?b.value:[b.value];for(let n=0,f=u.length;n<f;n++){let a=u[n],e=F(a),J0=z%P,E0=J0%e.boundary,R0=J0+E0;if(z+=E0,R0!==0&&P-R0<e.storage)z+=P-R0;b.__data=new Float32Array(e.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=z,z+=e.storage}}}let O=z%P;if(O>0)z+=P-O;return L.__size=z,L.__cache={},this}function F(L){let A={boundary:0,storage:0};if(typeof L==="number"||typeof L==="boolean")A.boundary=4,A.storage=4;else if(L.isVector2)A.boundary=8,A.storage=8;else if(L.isVector3||L.isColor)A.boundary=16,A.storage=12;else if(L.isVector4)A.boundary=16,A.storage=16;else if(L.isMatrix3)A.boundary=48,A.storage=48;else if(L.isMatrix4)A.boundary=64,A.storage=64;else if(L.isTexture)C0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(L))A.boundary=16,A.storage=L.byteLength;else C0("WebGLRenderer: Unsupported uniform value type.",L);return A}function _(L){let A=L.target;A.removeEventListener("dispose",_);let z=H.indexOf(A.__bindingPointIndex);H.splice(z,1),J.deleteBuffer(W[A.id]),delete W[A.id],delete K[A.id]}function C(){for(let L in W)J.deleteBuffer(W[L]);H=[],W={},K={}}return{bind:U,update:X,dispose:C}}function jN(){if(G9===null)G9=new h8(SN,16,16,J8,rJ),G9.name="DFG_LUT",G9.minFilter=IJ,G9.magFilter=IJ,G9.wrapS=W6,G9.wrapT=W6,G9.generateMipmaps=!1,G9.needsUpdate=!0;return G9}class I7{constructor(J={}){let{canvas:Q=SW(),context:$=null,depth:Z=!0,stencil:W=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:U=!1,powerPreference:X="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:E=!1,outputBufferType:G=gJ}=J;this.isWebGLRenderer=!0;let D;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=$.getContextAttributes().alpha}else D=K;let k=G,I=new Set([BQ,VQ,LQ]),q=new Set([gJ,K9,G7,f8,kQ,MQ]),F=new Uint32Array(4),_=new Int32Array(4),C=new y,L=null,A=null,z=[],P=[],O=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=aJ,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,p=!1,w=null,g=null,s=null,b=null;this._outputColorSpace=$8;let u=0,n=0,f=null,a=-1,e=null,J0=new YJ,E0=new YJ,R0=null,n0=new S0(0),w0=0,d=Q.width,Q0=Q.height,K0=1,D0=null,F0=null,f0=new YJ(0,0,d,Q0),b0=new YJ(0,0,d,Q0),B0=!1,x0=new F7,p0=!1,j0=!1,UJ=new r0,yJ=new y,c0=new YJ,BJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},MJ=!1;function OJ(){return f===null?K0:1}let j=$;function pJ(M,v){return Q.getContext(M,v)}try{let M={alpha:!0,depth:Z,stencil:W,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:U,powerPreference:X,failIfMajorPerformanceCaveat:N};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${vZ}`);if(Q.addEventListener("webglcontextlost",v0,!1),Q.addEventListener("webglcontextrestored",GJ,!1),Q.addEventListener("webglcontextcreationerror",$J,!1),j===null){if(j=pJ("webgl2",M),j===null)if(pJ("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw T0("WebGLRenderer: "+M.message),M}let o0,KJ,V,R,T,l,t,$0,X0,c,o,O0,I0,U0,Z0,_0,P0,i0,S,W0,i,H0,k0;function r(){if(o0=new gU(j),o0.init(),i=new AN(j,o0),KJ=new SU(j,o0,J,i),V=new IN(j,o0),KJ.reversedDepthBuffer&&E)V.buffers.depth.setReversed(!0);g=j.createFramebuffer(),s=j.createFramebuffer(),b=j.createFramebuffer(),R=new lU(j),T=new UN,l=new zN(j,o0,V,T,KJ,i,R),t=new xU(B),$0=new nH(j),H0=new wU(j,$0),X0=new pU(j,$0,R,H0),c=new uU(j,X0,$0,H0,R),i0=new dU(j,KJ,l),Z0=new jU(T),o=new XN(B,t,o0,KJ,H0,Z0),O0=new wN(B,T),I0=new NN,U0=new RN(o0),P0=new PU(B,t,V,c,D,Y),_0=new BN(B,c,KJ),k0=new TN(j,R,KJ,V),S=new TU(j,o0,R),W0=new mU(j,o0,R),R.programs=o.programs,B.capabilities=KJ,B.extensions=o0,B.properties=T,B.renderLists=I0,B.shadowMap=_0,B.state=V,B.info=R}if(r(),k!==gJ)O=new nU(k,Q.width,Q.height,H,Z,W);let Y0=new VK(B,j);this.xr=Y0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let M=o0.get("WEBGL_lose_context");if(M)M.loseContext()},this.forceContextRestore=function(){let M=o0.get("WEBGL_lose_context");if(M)M.restoreContext()},this.getPixelRatio=function(){return K0},this.setPixelRatio=function(M){if(M===void 0)return;K0=M,this.setSize(d,Q0,!1)},this.getSize=function(M){return M.set(d,Q0)},this.setSize=function(M,v,m=!0){if(Y0.isPresenting){C0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(d=M,Q0=v,Q.width=Math.floor(M*K0),Q.height=Math.floor(v*K0),m===!0)Q.style.width=M+"px",Q.style.height=v+"px";if(O!==null)O.setSize(Q.width,Q.height);this.setViewport(0,0,M,v)},this.getDrawingBufferSize=function(M){return M.set(d*K0,Q0*K0).floor()},this.setDrawingBufferSize=function(M,v,m){d=M,Q0=v,K0=m,Q.width=Math.floor(M*m),Q.height=Math.floor(v*m),this.setViewport(0,0,M,v)},this.setEffects=function(M){if(k===gJ){T0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let v=0;v<M.length;v++)if(M[v].isOutputPass===!0){C0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(J0)},this.getViewport=function(M){return M.copy(f0)},this.setViewport=function(M,v,m,h){if(M.isVector4)f0.set(M.x,M.y,M.z,M.w);else f0.set(M,v,m,h);V.viewport(J0.copy(f0).multiplyScalar(K0).round())},this.getScissor=function(M){return M.copy(b0)},this.setScissor=function(M,v,m,h){if(M.isVector4)b0.set(M.x,M.y,M.z,M.w);else b0.set(M,v,m,h);V.scissor(E0.copy(b0).multiplyScalar(K0).round())},this.getScissorTest=function(){return B0},this.setScissorTest=function(M){V.setScissorTest(B0=M)},this.setOpaqueSort=function(M){D0=M},this.setTransparentSort=function(M){F0=M},this.getClearColor=function(M){return M.copy(P0.getClearColor())},this.setClearColor=function(){P0.setClearColor(...arguments)},this.getClearAlpha=function(){return P0.getClearAlpha()},this.setClearAlpha=function(){P0.setClearAlpha(...arguments)},this.clear=function(M=!0,v=!0,m=!0){let h=0;if(M){let x=!1;if(f!==null){let q0=f.texture.format;x=I.has(q0)}if(x){let q0=f.texture.type,L0=q.has(q0),N0=P0.getClearColor(),V0=P0.getClearAlpha(),z0=N0.r,h0=N0.g,l0=N0.b;if(L0)F[0]=z0,F[1]=h0,F[2]=l0,F[3]=V0,j.clearBufferuiv(j.COLOR,0,F);else _[0]=z0,_[1]=h0,_[2]=l0,_[3]=V0,j.clearBufferiv(j.COLOR,0,_)}else h|=j.COLOR_BUFFER_BIT}if(v)h|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(m)h|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(h!==0)j.clear(h)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),w=M},this.dispose=function(){Q.removeEventListener("webglcontextlost",v0,!1),Q.removeEventListener("webglcontextrestored",GJ,!1),Q.removeEventListener("webglcontextcreationerror",$J,!1),P0.dispose(),I0.dispose(),U0.dispose(),T.dispose(),t.dispose(),c.dispose(),H0.dispose(),k0.dispose(),o.dispose(),Y0.dispose(),Y0.removeEventListener("sessionstart",r$),Y0.removeEventListener("sessionend",t$),d9.stop()};function v0(M){M.preventDefault(),W$("WebGLRenderer: Context Lost."),p=!0}function GJ(){W$("WebGLRenderer: Context Restored."),p=!1;let M=R.autoReset,v=_0.enabled,m=_0.autoUpdate,h=_0.needsUpdate,x=_0.type;r(),R.autoReset=M,_0.enabled=v,_0.autoUpdate=m,_0.needsUpdate=h,_0.type=x}function $J(M){T0("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function J9(M){let v=M.target;v.removeEventListener("dispose",J9),F9(v)}function F9(M){mK(M),T.remove(M)}function mK(M){let v=T.get(M).programs;if(v!==void 0){if(v.forEach(function(m){o.releaseProgram(m)}),M.isShaderMaterial)o.releaseShaderCache(M)}}this.renderBufferDirect=function(M,v,m,h,x,q0){if(v===null)v=BJ;let L0=x.isMesh&&x.matrixWorld.determinantAffine()<0,N0=uK(M,v,m,h,x);V.setMaterial(h,L0);let V0=m.index,z0=1;if(h.wireframe===!0){if(V0=X0.getWireframeAttribute(m),V0===void 0)return;z0=2}let h0=m.drawRange,l0=m.attributes.position,A0=h0.start*z0,t0=(h0.start+h0.count)*z0;if(q0!==null)A0=Math.max(A0,q0.start*z0),t0=Math.min(t0,(q0.start+q0.count)*z0);if(V0!==null)A0=Math.max(A0,0),t0=Math.min(t0,V0.count);else if(l0!==void 0&&l0!==null)A0=Math.max(A0,0),t0=Math.min(t0,l0.count);let EJ=t0-A0;if(EJ<0||EJ===1/0)return;H0.setup(x,h,N0,m,V0);let NJ,e0=S;if(V0!==null)NJ=$0.get(V0),e0=W0,e0.setIndex(NJ);if(x.isMesh)if(h.wireframe===!0)V.setLineWidth(h.wireframeLinewidth*OJ()),e0.setMode(j.LINES);else e0.setMode(j.TRIANGLES);else if(x.isLine){let AJ=h.linewidth;if(AJ===void 0)AJ=1;if(V.setLineWidth(AJ*OJ()),x.isLineSegments)e0.setMode(j.LINES);else if(x.isLineLoop)e0.setMode(j.LINE_LOOP);else e0.setMode(j.LINE_STRIP)}else if(x.isPoints)e0.setMode(j.POINTS);else if(x.isSprite)e0.setMode(j.TRIANGLES);if(x.isBatchedMesh)if(!o0.get("WEBGL_multi_draw")){let{_multiDrawStarts:AJ,_multiDrawCounts:M0,_multiDrawCount:bJ}=x,s0=V0?$0.get(V0).bytesPerElement:1,mJ=T.get(h).currentProgram.getUniforms();for(let Q9=0;Q9<bJ;Q9++)mJ.setValue(j,"_gl_DrawID",Q9),e0.render(AJ[Q9]/s0,M0[Q9])}else e0.renderMultiDraw(x._multiDrawStarts,x._multiDrawCounts,x._multiDrawCount);else if(x.isInstancedMesh)e0.renderInstances(A0,EJ,x.count);else if(m.isInstancedBufferGeometry){let AJ=m._maxInstanceCount!==void 0?m._maxInstanceCount:1/0,M0=Math.min(m.instanceCount,AJ);e0.renderInstances(A0,EJ,M0)}else e0.render(A0,EJ)};function a$(M,v,m){if(M.transparent===!0&&M.side===cJ&&M.forceSinglePass===!1)M.side=TJ,M.needsUpdate=!0,C7(M,v,m),M.side=j8,M.needsUpdate=!0,C7(M,v,m),M.side=cJ;else C7(M,v,m)}this.compile=function(M,v,m=null){if(m===null)m=M;if(A=U0.get(m),A.init(v),P.push(A),m.traverseVisible(function(x){if(x.isLight&&x.layers.test(v.layers)){if(A.pushLight(x),x.castShadow)A.pushShadow(x)}}),M!==m)M.traverseVisible(function(x){if(x.isLight&&x.layers.test(v.layers)){if(A.pushLight(x),x.castShadow)A.pushShadow(x)}});A.setupLights();let h=new Set;return M.traverse(function(x){if(!(x.isMesh||x.isPoints||x.isLine||x.isSprite))return;let q0=x.material;if(q0)if(Array.isArray(q0))for(let L0=0;L0<q0.length;L0++){let N0=q0[L0];a$(N0,m,x),h.add(N0)}else a$(q0,m,x),h.add(q0)}),A=P.pop(),h},this.compileAsync=function(M,v,m=null){let h=this.compile(M,v,m);return new Promise((x)=>{function q0(){if(h.forEach(function(L0){if(T.get(L0).currentProgram.isReady())h.delete(L0)}),h.size===0){x(M);return}setTimeout(q0,10)}if(o0.get("KHR_parallel_shader_compile")!==null)q0();else setTimeout(q0,10)})};let v6=null;function lK(M){if(v6)v6(M)}function r$(){d9.stop()}function t$(){d9.start()}let d9=new UK;if(d9.setAnimationLoop(lK),typeof self<"u")d9.setContext(self);this.setAnimationLoop=function(M){v6=M,Y0.setAnimationLoop(M),M===null?d9.stop():d9.start()},Y0.addEventListener("sessionstart",r$),Y0.addEventListener("sessionend",t$),this.render=function(M,v){if(v!==void 0&&v.isCamera!==!0){T0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;if(w!==null)w.renderStart(M,v);let m=Y0.enabled===!0&&Y0.isPresenting===!0,h=O!==null&&(f===null||m)&&O.begin(B,f);if(M.matrixWorldAutoUpdate===!0)M.updateMatrixWorld();if(v.parent===null&&v.matrixWorldAutoUpdate===!0)v.updateMatrixWorld();if(Y0.enabled===!0&&Y0.isPresenting===!0&&(O===null||O.isCompositing()===!1)){if(Y0.cameraAutoUpdate===!0)Y0.updateCamera(v);v=Y0.getCamera()}if(M.isScene===!0)M.onBeforeRender(B,M,v,f);if(A=U0.get(M,P.length),A.init(v),A.state.textureUnits=l.getTextureUnits(),P.push(A),UJ.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),x0.setFromProjectionMatrix(UJ,Z$,v.reversedDepth),j0=this.localClippingEnabled,p0=Z0.init(this.clippingPlanes,j0),L=I0.get(M,z.length),L.init(),z.push(L),Y0.enabled===!0&&Y0.isPresenting===!0){let L0=B.xr.getDepthSensingMesh();if(L0!==null)f6(L0,v,-1/0,B.sortObjects)}if(f6(M,v,0,B.sortObjects),L.finish(),B.sortObjects===!0)L.sort(D0,F0,v.reversedDepth);if(MJ=Y0.enabled===!1||Y0.isPresenting===!1||Y0.hasDepthSensing()===!1,MJ)P0.addToRenderList(L,M);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(p0===!0)Z0.beginShadows();let x=A.state.shadowsArray;if(_0.render(x,M,v),p0===!0)Z0.endShadows();if((h&&O.hasRenderPass())===!1){let{opaque:L0,transmissive:N0}=L;if(A.setupLights(),v.isArrayCamera){let V0=v.cameras;if(N0.length>0)for(let z0=0,h0=V0.length;z0<h0;z0++){let l0=V0[z0];JZ(L0,N0,M,l0)}if(MJ)P0.render(M);for(let z0=0,h0=V0.length;z0<h0;z0++){let l0=V0[z0];e$(L,M,l0,l0.viewport)}}else{if(N0.length>0)JZ(L0,N0,M,v);if(MJ)P0.render(M);e$(L,M,v)}}if(f!==null&&n===0)l.updateMultisampleRenderTarget(f),l.updateRenderTargetMipmap(f);if(h)O.end(B);if(M.isScene===!0)M.onAfterRender(B,M,v);if(H0.resetDefaultState(),a=-1,e=null,P.pop(),P.length>0){if(A=P[P.length-1],l.setTextureUnits(A.state.textureUnits),p0===!0)Z0.setGlobalState(B.clippingPlanes,A.state.camera)}else A=null;if(z.pop(),z.length>0)L=z[z.length-1];else L=null;if(w!==null)w.renderEnd()};function f6(M,v,m,h){if(M.visible===!1)return;if(M.layers.test(v.layers)){if(M.isGroup)m=M.renderOrder;else if(M.isLOD){if(M.autoUpdate===!0)M.update(v)}else if(M.isLightProbeGrid)A.pushLightProbeGrid(M);else if(M.isLight){if(A.pushLight(M),M.castShadow)A.pushShadow(M)}else if(M.isSprite){if(!M.frustumCulled||x0.intersectsSprite(M)){if(h)c0.setFromMatrixPosition(M.matrixWorld).applyMatrix4(UJ);let L0=c.update(M),N0=M.material;if(N0.visible)L.push(M,L0,N0,m,c0.z,null)}}else if(M.isMesh||M.isLine||M.isPoints){if(!M.frustumCulled||x0.intersectsObject(M)){let L0=c.update(M),N0=M.material;if(h){if(M.boundingSphere!==void 0){if(M.boundingSphere===null)M.computeBoundingSphere();c0.copy(M.boundingSphere.center)}else{if(L0.boundingSphere===null)L0.computeBoundingSphere();c0.copy(L0.boundingSphere.center)}c0.applyMatrix4(M.matrixWorld).applyMatrix4(UJ)}if(Array.isArray(N0)){let V0=L0.groups;for(let z0=0,h0=V0.length;z0<h0;z0++){let l0=V0[z0],A0=N0[l0.materialIndex];if(A0&&A0.visible)L.push(M,L0,A0,m,c0.z,l0)}}else if(N0.visible)L.push(M,L0,N0,m,c0.z,null)}}}let q0=M.children;for(let L0=0,N0=q0.length;L0<N0;L0++)f6(q0[L0],v,m,h)}function e$(M,v,m,h){let{opaque:x,transmissive:q0,transparent:L0}=M;if(A.setupLightsView(m),p0===!0)Z0.setGlobalState(B.clippingPlanes,m);if(h)V.viewport(J0.copy(h));if(x.length>0)_7(x,v,m);if(q0.length>0)_7(q0,v,m);if(L0.length>0)_7(L0,v,m);V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function JZ(M,v,m,h){if((m.isScene===!0?m.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[h.id]===void 0){let A0=o0.has("EXT_color_buffer_half_float")||o0.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[h.id]=new vJ(1,1,{generateMipmaps:!0,type:A0?rJ:gJ,minFilter:r9,samples:Math.max(4,KJ.samples),stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:u0.workingColorSpace})}let q0=A.state.transmissionRenderTarget[h.id],L0=h.viewport||J0;q0.setSize(L0.z*B.transmissionResolutionScale,L0.w*B.transmissionResolutionScale);let N0=B.getRenderTarget(),V0=B.getActiveCubeFace(),z0=B.getActiveMipmapLevel();if(B.setRenderTarget(q0),B.getClearColor(n0),w0=B.getClearAlpha(),w0<1)B.setClearColor(16777215,0.5);if(B.clear(),MJ)P0.render(m);let h0=B.toneMapping;B.toneMapping=aJ;let l0=h.viewport;if(h.viewport!==void 0)h.viewport=void 0;if(A.setupLightsView(h),p0===!0)Z0.setGlobalState(B.clippingPlanes,h);if(_7(M,m,h),l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0),o0.has("WEBGL_multisampled_render_to_texture")===!1){let A0=!1;for(let t0=0,EJ=v.length;t0<EJ;t0++){let NJ=v[t0],{object:e0,geometry:AJ,material:M0,group:bJ}=NJ;if(M0.side===cJ&&e0.layers.test(h.layers)){let s0=M0.side;M0.side=TJ,M0.needsUpdate=!0,QZ(e0,m,h,AJ,M0,bJ),M0.side=s0,M0.needsUpdate=!0,A0=!0}}if(A0===!0)l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0)}if(B.setRenderTarget(N0,V0,z0),B.setClearColor(n0,w0),l0!==void 0)h.viewport=l0;B.toneMapping=h0}function _7(M,v,m){let h=v.isScene===!0?v.overrideMaterial:null;for(let x=0,q0=M.length;x<q0;x++){let L0=M[x],{object:N0,geometry:V0,group:z0}=L0,h0=L0.material;if(h0.allowOverride===!0&&h!==null)h0=h;if(N0.layers.test(m.layers))QZ(N0,v,m,V0,h0,z0)}}function QZ(M,v,m,h,x,q0){if(M.onBeforeRender(B,v,m,h,x,q0),M.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),x.onBeforeRender(B,v,m,h,M,q0),x.transparent===!0&&x.side===cJ&&x.forceSinglePass===!1)x.side=TJ,x.needsUpdate=!0,B.renderBufferDirect(m,v,h,x,M,q0),x.side=j8,x.needsUpdate=!0,B.renderBufferDirect(m,v,h,x,M,q0),x.side=cJ;else B.renderBufferDirect(m,v,h,x,M,q0);M.onAfterRender(B,v,m,h,x,q0)}function C7(M,v,m){if(v.isScene!==!0)v=BJ;let h=T.get(M),x=A.state.lights,q0=A.state.shadowsArray,L0=x.state.version,N0=o.getParameters(M,x.state,q0,v,m,A.state.lightProbeGridArray),V0=o.getProgramCacheKey(N0),z0=h.programs;h.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?v.environment:null,h.fog=v.fog;let h0=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;if(h.envMap=t.get(M.envMap||h.environment,h0),h.envMapRotation=h.environment!==null&&M.envMap===null?v.environmentRotation:M.envMapRotation,z0===void 0)M.addEventListener("dispose",J9),z0=new Map,h.programs=z0;let l0=z0.get(V0);if(l0!==void 0){if(h.currentProgram===l0&&h.lightsStateVersion===L0)return ZZ(M,N0),l0}else{if(N0.uniforms=o.getUniforms(M),w!==null&&M.isNodeMaterial)w.build(M,m,N0);M.onBeforeCompile(N0,B),l0=o.acquireProgram(N0,V0),z0.set(V0,l0),h.uniforms=N0.uniforms}let A0=h.uniforms;if(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)A0.clippingPlanes=Z0.uniform;if(ZZ(M,N0),h.needsLights=nK(M),h.lightsStateVersion=L0,h.needsLights)A0.ambientLightColor.value=x.state.ambient,A0.lightProbe.value=x.state.probe,A0.directionalLights.value=x.state.directional,A0.directionalLightShadows.value=x.state.directionalShadow,A0.spotLights.value=x.state.spot,A0.spotLightShadows.value=x.state.spotShadow,A0.rectAreaLights.value=x.state.rectArea,A0.ltc_1.value=x.state.rectAreaLTC1,A0.ltc_2.value=x.state.rectAreaLTC2,A0.pointLights.value=x.state.point,A0.pointLightShadows.value=x.state.pointShadow,A0.hemisphereLights.value=x.state.hemi,A0.directionalShadowMatrix.value=x.state.directionalShadowMatrix,A0.spotLightMatrix.value=x.state.spotLightMatrix,A0.spotLightMap.value=x.state.spotLightMap,A0.pointShadowMatrix.value=x.state.pointShadowMatrix;return h.lightProbeGrid=A.state.lightProbeGridArray.length>0,h.currentProgram=l0,h.uniformsList=null,l0}function $Z(M){if(M.uniformsList===null){let v=M.currentProgram.getUniforms();M.uniformsList=V7.seqWithValue(v.seq,M.uniforms)}return M.uniformsList}function ZZ(M,v){let m=T.get(M);m.outputColorSpace=v.outputColorSpace,m.batching=v.batching,m.batchingColor=v.batchingColor,m.instancing=v.instancing,m.instancingColor=v.instancingColor,m.instancingMorph=v.instancingMorph,m.skinning=v.skinning,m.morphTargets=v.morphTargets,m.morphNormals=v.morphNormals,m.morphColors=v.morphColors,m.morphTargetsCount=v.morphTargetsCount,m.numClippingPlanes=v.numClippingPlanes,m.numIntersection=v.numClipIntersection,m.vertexAlphas=v.vertexAlphas,m.vertexTangents=v.vertexTangents,m.toneMapping=v.toneMapping}function dK(M,v){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;C.setFromMatrixPosition(v.matrixWorld);for(let m=0,h=M.length;m<h;m++){let x=M[m];if(x.texture!==null&&x.boundingBox.containsPoint(C))return x}return null}function uK(M,v,m,h,x){if(v.isScene!==!0)v=BJ;l.resetTextureUnits();let q0=v.fog,L0=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?v.environment:null,N0=f===null?B.outputColorSpace:f.isXRRenderTarget===!0?f.texture.colorSpace:u0.workingColorSpace,V0=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap,z0=t.get(h.envMap||L0,V0),h0=h.vertexColors===!0&&!!m.attributes.color&&m.attributes.color.itemSize===4,l0=!!m.attributes.tangent&&(!!h.normalMap||h.anisotropy>0),A0=!!m.morphAttributes.position,t0=!!m.morphAttributes.normal,EJ=!!m.morphAttributes.color,NJ=aJ;if(h.toneMapped){if(f===null||f.isXRRenderTarget===!0)NJ=B.toneMapping}let e0=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,AJ=e0!==void 0?e0.length:0,M0=T.get(h),bJ=A.state.lights;if(p0===!0){if(j0===!0||M!==e){let ZJ=M===e&&h.id===a;Z0.setState(h,M,ZJ)}}let s0=!1;if(h.version===M0.__version){if(M0.needsLights&&M0.lightsStateVersion!==bJ.state.version)s0=!0;else if(M0.outputColorSpace!==N0)s0=!0;else if(x.isBatchedMesh&&M0.batching===!1)s0=!0;else if(!x.isBatchedMesh&&M0.batching===!0)s0=!0;else if(x.isBatchedMesh&&M0.batchingColor===!0&&x.colorTexture===null)s0=!0;else if(x.isBatchedMesh&&M0.batchingColor===!1&&x.colorTexture!==null)s0=!0;else if(x.isInstancedMesh&&M0.instancing===!1)s0=!0;else if(!x.isInstancedMesh&&M0.instancing===!0)s0=!0;else if(x.isSkinnedMesh&&M0.skinning===!1)s0=!0;else if(!x.isSkinnedMesh&&M0.skinning===!0)s0=!0;else if(x.isInstancedMesh&&M0.instancingColor===!0&&x.instanceColor===null)s0=!0;else if(x.isInstancedMesh&&M0.instancingColor===!1&&x.instanceColor!==null)s0=!0;else if(x.isInstancedMesh&&M0.instancingMorph===!0&&x.morphTexture===null)s0=!0;else if(x.isInstancedMesh&&M0.instancingMorph===!1&&x.morphTexture!==null)s0=!0;else if(M0.envMap!==z0)s0=!0;else if(h.fog===!0&&M0.fog!==q0)s0=!0;else if(M0.numClippingPlanes!==void 0&&(M0.numClippingPlanes!==Z0.numPlanes||M0.numIntersection!==Z0.numIntersection))s0=!0;else if(M0.vertexAlphas!==h0)s0=!0;else if(M0.vertexTangents!==l0)s0=!0;else if(M0.morphTargets!==A0)s0=!0;else if(M0.morphNormals!==t0)s0=!0;else if(M0.morphColors!==EJ)s0=!0;else if(M0.toneMapping!==NJ)s0=!0;else if(M0.morphTargetsCount!==AJ)s0=!0;else if(!!M0.lightProbeGrid!==A.state.lightProbeGridArray.length>0)s0=!0}else s0=!0,M0.__version=h.version;let mJ=M0.currentProgram;if(s0===!0){if(mJ=C7(h,v,x),w&&h.isNodeMaterial)w.onUpdateProgram(h,mJ,M0)}let Q9=!1,w9=!1,E8=!1,JJ=mJ.getUniforms(),qJ=M0.uniforms;if(V.useProgram(mJ.program))Q9=!0,w9=!0,E8=!0;if(h.id!==a)a=h.id,w9=!0;if(M0.needsLights){let ZJ=dK(A.state.lightProbeGridArray,x);if(M0.lightProbeGrid!==ZJ)M0.lightProbeGrid=ZJ,w9=!0}if(Q9||e!==M){if(V.buffers.depth.getReversed()&&M.reversedDepth!==!0)M._reversedDepth=!0,M.updateProjectionMatrix();JJ.setValue(j,"projectionMatrix",M.projectionMatrix),JJ.setValue(j,"viewMatrix",M.matrixWorldInverse);let S9=JJ.map.cameraPosition;if(S9!==void 0)S9.setValue(j,yJ.setFromMatrixPosition(M.matrixWorld));if(KJ.logarithmicDepthBuffer)JJ.setValue(j,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2));if(h.isMeshPhongMaterial||h.isMeshToonMaterial||h.isMeshLambertMaterial||h.isMeshBasicMaterial||h.isMeshStandardMaterial||h.isShaderMaterial)JJ.setValue(j,"isOrthographic",M.isOrthographicCamera===!0);if(e!==M)e=M,w9=!0,E8=!0}if(M0.needsLights){if(bJ.state.directionalShadowMap.length>0)JJ.setValue(j,"directionalShadowMap",bJ.state.directionalShadowMap,l);if(bJ.state.spotShadowMap.length>0)JJ.setValue(j,"spotShadowMap",bJ.state.spotShadowMap,l);if(bJ.state.pointShadowMap.length>0)JJ.setValue(j,"pointShadowMap",bJ.state.pointShadowMap,l)}if(x.isSkinnedMesh){JJ.setOptional(j,x,"bindMatrix"),JJ.setOptional(j,x,"bindMatrixInverse");let ZJ=x.skeleton;if(ZJ){if(ZJ.boneTexture===null)ZJ.computeBoneTexture();JJ.setValue(j,"boneTexture",ZJ.boneTexture,l)}}if(x.isBatchedMesh){if(JJ.setOptional(j,x,"batchingTexture"),JJ.setValue(j,"batchingTexture",x._matricesTexture,l),JJ.setOptional(j,x,"batchingIdTexture"),JJ.setValue(j,"batchingIdTexture",x._indirectTexture,l),JJ.setOptional(j,x,"batchingColorTexture"),x._colorsTexture!==null)JJ.setValue(j,"batchingColorTexture",x._colorsTexture,l)}let T9=m.morphAttributes;if(T9.position!==void 0||T9.normal!==void 0||T9.color!==void 0)i0.update(x,m,mJ);if(w9||M0.receiveShadow!==x.receiveShadow)M0.receiveShadow=x.receiveShadow,JJ.setValue(j,"receiveShadow",x.receiveShadow);if((h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial)&&h.envMap===null&&v.environment!==null)qJ.envMapIntensity.value=v.environmentIntensity;if(qJ.dfgLUT!==void 0)qJ.dfgLUT.value=jN();if(w9){if(JJ.setValue(j,"toneMappingExposure",B.toneMappingExposure),M0.needsLights)cK(qJ,E8);if(q0&&h.fog===!0)O0.refreshFogUniforms(qJ,q0);if(O0.refreshMaterialUniforms(qJ,h,K0,Q0,A.state.transmissionRenderTarget[M.id]),M0.needsLights&&M0.lightProbeGrid){let ZJ=M0.lightProbeGrid;qJ.probesSH.value=ZJ.texture,qJ.probesMin.value.copy(ZJ.boundingBox.min),qJ.probesMax.value.copy(ZJ.boundingBox.max),qJ.probesResolution.value.copy(ZJ.resolution)}V7.upload(j,$Z(M0),qJ,l)}if(h.isShaderMaterial&&h.uniformsNeedUpdate===!0)V7.upload(j,$Z(M0),qJ,l),h.uniformsNeedUpdate=!1;if(h.isSpriteMaterial)JJ.setValue(j,"center",x.center);if(JJ.setValue(j,"modelViewMatrix",x.modelViewMatrix),JJ.setValue(j,"normalMatrix",x.normalMatrix),JJ.setValue(j,"modelMatrix",x.matrixWorld),h.uniformsGroups!==void 0){let ZJ=h.uniformsGroups;for(let S9=0,q8=ZJ.length;S9<q8;S9++){let WZ=ZJ[S9];k0.update(WZ,mJ),k0.bind(WZ,mJ)}}return mJ}function cK(M,v){M.ambientLightColor.needsUpdate=v,M.lightProbe.needsUpdate=v,M.directionalLights.needsUpdate=v,M.directionalLightShadows.needsUpdate=v,M.pointLights.needsUpdate=v,M.pointLightShadows.needsUpdate=v,M.spotLights.needsUpdate=v,M.spotLightShadows.needsUpdate=v,M.rectAreaLights.needsUpdate=v,M.hemisphereLights.needsUpdate=v}function nK(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}if(this.getActiveCubeFace=function(){return u},this.getActiveMipmapLevel=function(){return n},this.getRenderTarget=function(){return f},this.setRenderTargetTextures=function(M,v,m){let h=T.get(M);if(h.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,h.__autoAllocateDepthBuffer===!1)h.__useRenderToTexture=!1;T.get(M.texture).__webglTexture=v,T.get(M.depthTexture).__webglTexture=h.__autoAllocateDepthBuffer?void 0:m,h.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,v){let m=T.get(M);m.__webglFramebuffer=v,m.__useDefaultFramebuffer=v===void 0},this.setRenderTarget=function(M,v=0,m=0){f=M,u=v,n=m;let h=null,x=!1,q0=!1;if(M){let N0=T.get(M);if(N0.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(j.FRAMEBUFFER,N0.__webglFramebuffer),J0.copy(M.viewport),E0.copy(M.scissor),R0=M.scissorTest,V.viewport(J0),V.scissor(E0),V.setScissorTest(R0),a=-1;return}else if(N0.__webglFramebuffer===void 0)l.setupRenderTarget(M);else if(N0.__hasExternalTextures)l.rebindTextures(M,T.get(M.texture).__webglTexture,T.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let h0=M.depthTexture;if(N0.__boundDepthTexture!==h0){if(h0!==null&&T.has(h0)&&(M.width!==h0.image.width||M.height!==h0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");l.setupDepthRenderbuffer(M)}}let V0=M.texture;if(V0.isData3DTexture||V0.isDataArrayTexture||V0.isCompressedArrayTexture)q0=!0;let z0=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget){if(Array.isArray(z0[v]))h=z0[v][m];else h=z0[v];x=!0}else if(M.samples>0&&l.useMultisampledRTT(M)===!1)h=T.get(M).__webglMultisampledFramebuffer;else if(Array.isArray(z0))h=z0[m];else h=z0;J0.copy(M.viewport),E0.copy(M.scissor),R0=M.scissorTest}else J0.copy(f0).multiplyScalar(K0).floor(),E0.copy(b0).multiplyScalar(K0).floor(),R0=B0;if(m!==0)h=g;if(V.bindFramebuffer(j.FRAMEBUFFER,h))V.drawBuffers(M,h);if(V.viewport(J0),V.scissor(E0),V.setScissorTest(R0),x){let N0=T.get(M.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+v,N0.__webglTexture,m)}else if(q0){let N0=v;for(let V0=0;V0<M.textures.length;V0++){let z0=T.get(M.textures[V0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+V0,z0.__webglTexture,m,N0)}}else if(M!==null&&m!==0){let N0=T.get(M.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,N0.__webglTexture,m)}a=-1},this.readRenderTargetPixels=function(M,v,m,h,x,q0,L0,N0=0){if(!(M&&M.isWebGLRenderTarget)){T0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let V0=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&L0!==void 0)V0=V0[L0];if(V0){V.bindFramebuffer(j.FRAMEBUFFER,V0);try{let z0=M.textures[N0],h0=z0.format,l0=z0.type;if(M.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+N0);if(!KJ.textureFormatReadable(h0)){T0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!KJ.textureTypeReadable(l0)){T0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(v>=0&&v<=M.width-h&&(m>=0&&m<=M.height-x))j.readPixels(v,m,h,x,i.convert(h0),i.convert(l0),q0)}finally{let z0=f!==null?T.get(f).__webglFramebuffer:null;V.bindFramebuffer(j.FRAMEBUFFER,z0)}}},this.readRenderTargetPixelsAsync=async function(M,v,m,h,x,q0,L0,N0=0){if(!(M&&M.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let V0=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&L0!==void 0)V0=V0[L0];if(V0)if(v>=0&&v<=M.width-h&&(m>=0&&m<=M.height-x)){V.bindFramebuffer(j.FRAMEBUFFER,V0);let z0=M.textures[N0],h0=z0.format,l0=z0.type;if(M.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+N0);if(!KJ.textureFormatReadable(h0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!KJ.textureTypeReadable(l0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let A0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,A0),j.bufferData(j.PIXEL_PACK_BUFFER,q0.byteLength,j.STREAM_READ),j.readPixels(v,m,h,x,i.convert(h0),i.convert(l0),0);let t0=f!==null?T.get(f).__webglFramebuffer:null;V.bindFramebuffer(j.FRAMEBUFFER,t0);let EJ=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await yW(j,EJ,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,A0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,q0),j.deleteBuffer(A0),j.deleteSync(EJ),q0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,v=null,m=0){let h=Math.pow(2,-m),x=Math.floor(M.image.width*h),q0=Math.floor(M.image.height*h),L0=v!==null?v.x:0,N0=v!==null?v.y:0;l.setTexture2D(M,0),j.copyTexSubImage2D(j.TEXTURE_2D,m,0,0,L0,N0,x,q0),V.unbindTexture()},this.copyTextureToTexture=function(M,v,m=null,h=null,x=0,q0=0){let L0,N0,V0,z0,h0,l0,A0,t0,EJ,NJ=M.isCompressedTexture?M.mipmaps[q0]:M.image;if(m!==null)L0=m.max.x-m.min.x,N0=m.max.y-m.min.y,V0=m.isBox3?m.max.z-m.min.z:1,z0=m.min.x,h0=m.min.y,l0=m.isBox3?m.min.z:0;else{let qJ=Math.pow(2,-x);if(L0=Math.floor(NJ.width*qJ),N0=Math.floor(NJ.height*qJ),M.isDataArrayTexture)V0=NJ.depth;else if(M.isData3DTexture)V0=Math.floor(NJ.depth*qJ);else V0=1;z0=0,h0=0,l0=0}if(h!==null)A0=h.x,t0=h.y,EJ=h.z;else A0=0,t0=0,EJ=0;let e0=i.convert(v.format),AJ=i.convert(v.type),M0;if(v.isData3DTexture)l.setTexture3D(v,0),M0=j.TEXTURE_3D;else if(v.isDataArrayTexture||v.isCompressedArrayTexture)l.setTexture2DArray(v,0),M0=j.TEXTURE_2D_ARRAY;else l.setTexture2D(v,0),M0=j.TEXTURE_2D;V.activeTexture(j.TEXTURE0),V.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,v.flipY),V.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),V.pixelStorei(j.UNPACK_ALIGNMENT,v.unpackAlignment);let bJ=V.getParameter(j.UNPACK_ROW_LENGTH),s0=V.getParameter(j.UNPACK_IMAGE_HEIGHT),mJ=V.getParameter(j.UNPACK_SKIP_PIXELS),Q9=V.getParameter(j.UNPACK_SKIP_ROWS),w9=V.getParameter(j.UNPACK_SKIP_IMAGES);V.pixelStorei(j.UNPACK_ROW_LENGTH,NJ.width),V.pixelStorei(j.UNPACK_IMAGE_HEIGHT,NJ.height),V.pixelStorei(j.UNPACK_SKIP_PIXELS,z0),V.pixelStorei(j.UNPACK_SKIP_ROWS,h0),V.pixelStorei(j.UNPACK_SKIP_IMAGES,l0);let E8=M.isDataArrayTexture||M.isData3DTexture,JJ=v.isDataArrayTexture||v.isData3DTexture;if(M.isDepthTexture){let qJ=T.get(M),T9=T.get(v),ZJ=T.get(qJ.__renderTarget),S9=T.get(T9.__renderTarget);V.bindFramebuffer(j.READ_FRAMEBUFFER,ZJ.__webglFramebuffer),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,S9.__webglFramebuffer);for(let q8=0;q8<V0;q8++){if(E8)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(M).__webglTexture,x,l0+q8),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(v).__webglTexture,q0,EJ+q8);j.blitFramebuffer(z0,h0,L0,N0,A0,t0,L0,N0,j.DEPTH_BUFFER_BIT,j.NEAREST)}V.bindFramebuffer(j.READ_FRAMEBUFFER,null),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(x!==0||M.isRenderTargetTexture||T.has(M)){let qJ=T.get(M),T9=T.get(v);V.bindFramebuffer(j.READ_FRAMEBUFFER,s),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,b);for(let ZJ=0;ZJ<V0;ZJ++){if(E8)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,qJ.__webglTexture,x,l0+ZJ);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,qJ.__webglTexture,x);if(JJ)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T9.__webglTexture,q0,EJ+ZJ);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,T9.__webglTexture,q0);if(x!==0)j.blitFramebuffer(z0,h0,L0,N0,A0,t0,L0,N0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(JJ)j.copyTexSubImage3D(M0,q0,A0,t0,EJ+ZJ,z0,h0,L0,N0);else j.copyTexSubImage2D(M0,q0,A0,t0,z0,h0,L0,N0)}V.bindFramebuffer(j.READ_FRAMEBUFFER,null),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(JJ)if(M.isDataTexture||M.isData3DTexture)j.texSubImage3D(M0,q0,A0,t0,EJ,L0,N0,V0,e0,AJ,NJ.data);else if(v.isCompressedArrayTexture)j.compressedTexSubImage3D(M0,q0,A0,t0,EJ,L0,N0,V0,e0,NJ.data);else j.texSubImage3D(M0,q0,A0,t0,EJ,L0,N0,V0,e0,AJ,NJ);else if(M.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,q0,A0,t0,L0,N0,e0,AJ,NJ.data);else if(M.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,q0,A0,t0,NJ.width,NJ.height,e0,NJ.data);else j.texSubImage2D(j.TEXTURE_2D,q0,A0,t0,L0,N0,e0,AJ,NJ);if(V.pixelStorei(j.UNPACK_ROW_LENGTH,bJ),V.pixelStorei(j.UNPACK_IMAGE_HEIGHT,s0),V.pixelStorei(j.UNPACK_SKIP_PIXELS,mJ),V.pixelStorei(j.UNPACK_SKIP_ROWS,Q9),V.pixelStorei(j.UNPACK_SKIP_IMAGES,w9),q0===0&&v.generateMipmaps)j.generateMipmap(M0);V.unbindTexture()},this.initRenderTarget=function(M){if(T.get(M).__webglFramebuffer===void 0)l.setupRenderTarget(M)},this.initTexture=function(M){if(M.isCubeTexture)l.setTextureCube(M,0);else if(M.isData3DTexture)l.setTexture3D(M,0);else if(M.isDataArrayTexture||M.isCompressedArrayTexture)l.setTexture2DArray(M,0);else l.setTexture2D(M,0);V.unbindTexture()},this.resetState=function(){u=0,n=0,f=null,V.reset(),H0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Z$}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=u0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=u0._getUnpackColorSpace()}}var sH=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iH=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oH=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,aH=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rH=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tH=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eH=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,JY=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,QY=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$Y=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ZY=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,WY=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,KY=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,HY=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,YY=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,XY=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,UY=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,GY=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,NY=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,EY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,FY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,DY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,OY=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,RY=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kY=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,MY=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,LY=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,VY=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,BY=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,IY="gl_FragColor = linearToOutputTexel( gl_FragColor );",zY=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,AY=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,_Y=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,CY=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,PY=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wY=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,TY=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SY=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jY=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yY=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vY=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fY=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bY=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hY=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xY=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,gY=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pY=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mY=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lY=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dY=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uY=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,cY=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nY=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sY=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,iY=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,oY=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,aY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,JX=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,QX=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$X=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ZX=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,WX=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,KX=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,HX=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,YX=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,XX=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,UX=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,GX=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,NX=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,EX=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,FX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DX=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,OX=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,RX=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kX=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,MX=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,LX=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,VX=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,BX=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,IX=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zX=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,AX=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_X=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,CX=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,PX=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wX=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,TX=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,SX=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jX=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yX=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vX=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fX=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bX=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hX=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xX=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gX=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pX=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mX=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lX=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,dX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nX=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,sX=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iX=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aX=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tX=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eX=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,JU=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,QU=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$U=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ZU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,WU=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KU=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,HU=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YU=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,XU=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UU=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GU=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NU=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,EU=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qU=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,FU=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,DU=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,OU=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RU=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,kU=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MU=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,LU=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VU=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,BU=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,IU=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zU=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,AU=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_U=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,m0,G0,N9,C6,CU,GK,m9=4,mW,N8=20,yU=256,k7,lW,v$=null,f$=0,b$=0,h$=!1,vU,l$,cU,NK,p$,EK,qK,FK,nW,sW,iW,oW,aW,x$,vG=37297,fG=0,eW,gG,P6,cG,nG,iG,aG,tG,JN,$N,HN=0,FN=0,kN=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,MN=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,LN,VN,XK,M7,g$,_N=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,CN=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,VK,PN,BK,SN,G9=null;var z7=o8(()=>{y$();y$();m0={alphahash_fragment:sH,alphahash_pars_fragment:iH,alphamap_fragment:oH,alphamap_pars_fragment:aH,alphatest_fragment:rH,alphatest_pars_fragment:tH,aomap_fragment:eH,aomap_pars_fragment:JY,batching_pars_vertex:QY,batching_vertex:$Y,begin_vertex:ZY,beginnormal_vertex:WY,bsdfs:KY,iridescence_fragment:HY,bumpmap_pars_fragment:YY,clipping_planes_fragment:XY,clipping_planes_pars_fragment:UY,clipping_planes_pars_vertex:GY,clipping_planes_vertex:NY,color_fragment:EY,color_pars_fragment:qY,color_pars_vertex:FY,color_vertex:DY,common:OY,cube_uv_reflection_fragment:RY,defaultnormal_vertex:kY,displacementmap_pars_vertex:MY,displacementmap_vertex:LY,emissivemap_fragment:VY,emissivemap_pars_fragment:BY,colorspace_fragment:IY,colorspace_pars_fragment:zY,envmap_fragment:AY,envmap_common_pars_fragment:_Y,envmap_pars_fragment:CY,envmap_pars_vertex:PY,envmap_physical_pars_fragment:gY,envmap_vertex:wY,fog_vertex:TY,fog_pars_vertex:SY,fog_fragment:jY,fog_pars_fragment:yY,gradientmap_pars_fragment:vY,lightmap_pars_fragment:fY,lights_lambert_fragment:bY,lights_lambert_pars_fragment:hY,lights_pars_begin:xY,lights_toon_fragment:pY,lights_toon_pars_fragment:mY,lights_phong_fragment:lY,lights_phong_pars_fragment:dY,lights_physical_fragment:uY,lights_physical_pars_fragment:cY,lights_fragment_begin:nY,lights_fragment_maps:sY,lights_fragment_end:iY,lightprobes_pars_fragment:oY,logdepthbuf_fragment:aY,logdepthbuf_pars_fragment:rY,logdepthbuf_pars_vertex:tY,logdepthbuf_vertex:eY,map_fragment:JX,map_pars_fragment:QX,map_particle_fragment:$X,map_particle_pars_fragment:ZX,metalnessmap_fragment:WX,metalnessmap_pars_fragment:KX,morphinstance_vertex:HX,morphcolor_vertex:YX,morphnormal_vertex:XX,morphtarget_pars_vertex:UX,morphtarget_vertex:GX,normal_fragment_begin:NX,normal_fragment_maps:EX,normal_pars_fragment:qX,normal_pars_vertex:FX,normal_vertex:DX,normalmap_pars_fragment:OX,clearcoat_normal_fragment_begin:RX,clearcoat_normal_fragment_maps:kX,clearcoat_pars_fragment:MX,iridescence_pars_fragment:LX,opaque_fragment:VX,packing:BX,premultiplied_alpha_fragment:IX,project_vertex:zX,dithering_fragment:AX,dithering_pars_fragment:_X,roughnessmap_fragment:CX,roughnessmap_pars_fragment:PX,shadowmap_pars_fragment:wX,shadowmap_pars_vertex:TX,shadowmap_vertex:SX,shadowmask_pars_fragment:jX,skinbase_vertex:yX,skinning_pars_vertex:vX,skinning_vertex:fX,skinnormal_vertex:bX,specularmap_fragment:hX,specularmap_pars_fragment:xX,tonemapping_fragment:gX,tonemapping_pars_fragment:pX,transmission_fragment:mX,transmission_pars_fragment:lX,uv_pars_fragment:dX,uv_pars_vertex:uX,uv_vertex:cX,worldpos_vertex:nX,background_vert:sX,background_frag:iX,backgroundCube_vert:oX,backgroundCube_frag:aX,cube_vert:rX,cube_frag:tX,depth_vert:eX,depth_frag:JU,distance_vert:QU,distance_frag:$U,equirect_vert:ZU,equirect_frag:WU,linedashed_vert:KU,linedashed_frag:HU,meshbasic_vert:YU,meshbasic_frag:XU,meshlambert_vert:UU,meshlambert_frag:GU,meshmatcap_vert:NU,meshmatcap_frag:EU,meshnormal_vert:qU,meshnormal_frag:FU,meshphong_vert:DU,meshphong_frag:OU,meshphysical_vert:RU,meshphysical_frag:kU,meshtoon_vert:MU,meshtoon_frag:LU,points_vert:VU,points_frag:BU,shadow_vert:IU,shadow_frag:zU,sprite_vert:AU,sprite_frag:_U},G0={common:{diffuse:{value:new S0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new y0},alphaMap:{value:null},alphaMapTransform:{value:new y0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new y0}},envmap:{envMap:{value:null},envMapRotation:{value:new y0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new y0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new y0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new y0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new y0},normalScale:{value:new g0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new y0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new y0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new y0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new y0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new S0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new y},probesMax:{value:new y},probesResolution:{value:new y}},points:{diffuse:{value:new S0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new y0},alphaTest:{value:0},uvTransform:{value:new y0}},sprite:{diffuse:{value:new S0(16777215)},opacity:{value:1},center:{value:new g0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new y0},alphaMap:{value:null},alphaMapTransform:{value:new y0},alphaTest:{value:0}}},N9={basic:{uniforms:SJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.fog]),vertexShader:m0.meshbasic_vert,fragmentShader:m0.meshbasic_frag},lambert:{uniforms:SJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,G0.lights,{emissive:{value:new S0(0)},envMapIntensity:{value:1}}]),vertexShader:m0.meshlambert_vert,fragmentShader:m0.meshlambert_frag},phong:{uniforms:SJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,G0.lights,{emissive:{value:new S0(0)},specular:{value:new S0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:m0.meshphong_vert,fragmentShader:m0.meshphong_frag},standard:{uniforms:SJ([G0.common,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.roughnessmap,G0.metalnessmap,G0.fog,G0.lights,{emissive:{value:new S0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:m0.meshphysical_vert,fragmentShader:m0.meshphysical_frag},toon:{uniforms:SJ([G0.common,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.gradientmap,G0.fog,G0.lights,{emissive:{value:new S0(0)}}]),vertexShader:m0.meshtoon_vert,fragmentShader:m0.meshtoon_frag},matcap:{uniforms:SJ([G0.common,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,{matcap:{value:null}}]),vertexShader:m0.meshmatcap_vert,fragmentShader:m0.meshmatcap_frag},points:{uniforms:SJ([G0.points,G0.fog]),vertexShader:m0.points_vert,fragmentShader:m0.points_frag},dashed:{uniforms:SJ([G0.common,G0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:m0.linedashed_vert,fragmentShader:m0.linedashed_frag},depth:{uniforms:SJ([G0.common,G0.displacementmap]),vertexShader:m0.depth_vert,fragmentShader:m0.depth_frag},normal:{uniforms:SJ([G0.common,G0.bumpmap,G0.normalmap,G0.displacementmap,{opacity:{value:1}}]),vertexShader:m0.meshnormal_vert,fragmentShader:m0.meshnormal_frag},sprite:{uniforms:SJ([G0.sprite,G0.fog]),vertexShader:m0.sprite_vert,fragmentShader:m0.sprite_frag},background:{uniforms:{uvTransform:{value:new y0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:m0.background_vert,fragmentShader:m0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new y0}},vertexShader:m0.backgroundCube_vert,fragmentShader:m0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:m0.cube_vert,fragmentShader:m0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:m0.equirect_vert,fragmentShader:m0.equirect_frag},distance:{uniforms:SJ([G0.common,G0.displacementmap,{referencePosition:{value:new y},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:m0.distance_vert,fragmentShader:m0.distance_frag},shadow:{uniforms:SJ([G0.lights,G0.fog,{color:{value:new S0(0)},opacity:{value:1}}]),vertexShader:m0.shadow_vert,fragmentShader:m0.shadow_frag}};N9.physical={uniforms:SJ([N9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new y0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new y0},clearcoatNormalScale:{value:new g0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new y0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new y0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new y0},sheen:{value:0},sheenColor:{value:new S0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new y0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new y0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new y0},transmissionSamplerSize:{value:new g0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new y0},attenuationDistance:{value:0},attenuationColor:{value:new S0(0)},specularColor:{value:new S0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new y0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new y0},anisotropyVector:{value:new g0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new y0}}]),vertexShader:m0.meshphysical_vert,fragmentShader:m0.meshphysical_frag};C6={r:0,b:0,g:0},CU=new r0,GK=new y0;GK.set(-1,0,0,0,1,0,0,0,1);mW=[0.125,0.215,0.35,0.446,0.526,0.582],k7=new R7,lW=new S0,vU=new y;l$=class l$ extends vJ{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new L6(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},Z=new g9(5,5,5),W=new zJ({name:"CubemapFromEquirect",uniforms:Y8($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:TJ,blending:W9});W.uniforms.tEquirect.value=Q;let K=new XJ(Z,W),H=Q.minFilter;if(Q.minFilter===r9)Q.minFilter=IJ;return new C$(1,10,this).update(J,K),Q.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let W=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,Z);J.setRenderTarget(W)}};cU={[NQ]:"LINEAR_TONE_MAPPING",[EQ]:"REINHARD_TONE_MAPPING",[qQ]:"CINEON_TONE_MAPPING",[o9]:"ACES_FILMIC_TONE_MAPPING",[DQ]:"AGX_TONE_MAPPING",[OQ]:"NEUTRAL_TONE_MAPPING",[FQ]:"CUSTOM_TONE_MAPPING"};NK=new PJ,p$=new U9(1,1),EK=new F6,qK=new X$,FK=new L6,nW=[],sW=[],iW=new Float32Array(16),oW=new Float32Array(9),aW=new Float32Array(4);x$=/(\w+)(\])?(\[|\.)?/g;eW=new y0;gG={[NQ]:"Linear",[EQ]:"Reinhard",[qQ]:"Cineon",[o9]:"ACESFilmic",[DQ]:"AgX",[OQ]:"Neutral",[FQ]:"Custom"};P6=new y;cG=/^[ \t]*#include +<([\w\d./]+)>/gm;nG=new Map;iG=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;aG={[H7]:"SHADOWMAP_TYPE_PCF",[S8]:"SHADOWMAP_TYPE_VSM"};tG={[v8]:"ENVMAP_TYPE_CUBE",[a9]:"ENVMAP_TYPE_CUBE",[X7]:"ENVMAP_TYPE_CUBE_UV"};JN={[a9]:"ENVMAP_MODE_REFRACTION"};$N={[NW]:"ENVMAP_BLENDING_MULTIPLY",[EW]:"ENVMAP_BLENDING_MIX",[qW]:"ENVMAP_BLENDING_ADD"};LN=[new y(1,0,0),new y(-1,0,0),new y(0,1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1)],VN=[new y(0,-1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1),new y(0,-1,0),new y(0,-1,0)],XK=new r0,M7=new y,g$=new y;VK=class VK extends z9{constructor(J,Q){super();let $=this,Z=null,W=1,K=null,H="local-floor",Y=1,U=null,X=null,N=null,E=null,G=null,D=null,k=typeof XRWebGLBinding<"u",I=new LK,q={},F=Q.getContextAttributes(),_=null,C=null,L=[],A=[],z=new g0,P=null,O=new VJ;O.viewport=new YJ;let B=new VJ;B.viewport=new YJ;let p=[O,B],w=new P$,g=null,s=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(d){let Q0=L[d];if(Q0===void 0)Q0=new E7,L[d]=Q0;return Q0.getTargetRaySpace()},this.getControllerGrip=function(d){let Q0=L[d];if(Q0===void 0)Q0=new E7,L[d]=Q0;return Q0.getGripSpace()},this.getHand=function(d){let Q0=L[d];if(Q0===void 0)Q0=new E7,L[d]=Q0;return Q0.getHandSpace()};function b(d){let Q0=A.indexOf(d.inputSource);if(Q0===-1)return;let K0=L[Q0];if(K0!==void 0)K0.update(d.inputSource,d.frame,U||K),K0.dispatchEvent({type:d.type,data:d.inputSource})}function u(){Z.removeEventListener("select",b),Z.removeEventListener("selectstart",b),Z.removeEventListener("selectend",b),Z.removeEventListener("squeeze",b),Z.removeEventListener("squeezestart",b),Z.removeEventListener("squeezeend",b),Z.removeEventListener("end",u),Z.removeEventListener("inputsourceschange",n);for(let d=0;d<L.length;d++){let Q0=A[d];if(Q0===null)continue;A[d]=null,L[d].disconnect(Q0)}g=null,s=null,I.reset();for(let d in q)delete q[d];J.setRenderTarget(_),G=null,E=null,N=null,Z=null,C=null,w0.stop(),$.isPresenting=!1,J.setPixelRatio(P),J.setSize(z.width,z.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(d){if(W=d,$.isPresenting===!0)C0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(d){if(H=d,$.isPresenting===!0)C0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return U||K},this.setReferenceSpace=function(d){U=d},this.getBaseLayer=function(){return E!==null?E:G},this.getBinding=function(){if(N===null&&k)N=new XRWebGLBinding(Z,Q);return N},this.getFrame=function(){return D},this.getSession=function(){return Z},this.setSession=async function(d){if(Z=d,Z!==null){if(_=J.getRenderTarget(),Z.addEventListener("select",b),Z.addEventListener("selectstart",b),Z.addEventListener("selectend",b),Z.addEventListener("squeeze",b),Z.addEventListener("squeezestart",b),Z.addEventListener("squeezeend",b),Z.addEventListener("end",u),Z.addEventListener("inputsourceschange",n),F.xrCompatible!==!0)await Q.makeXRCompatible();if(P=J.getPixelRatio(),J.getSize(z),!(k&&("createProjectionLayer"in XRWebGLBinding.prototype))){let K0={antialias:F.antialias,alpha:!0,depth:F.depth,stencil:F.stencil,framebufferScaleFactor:W};G=new XRWebGLLayer(Z,Q,K0),Z.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),C=new vJ(G.framebufferWidth,G.framebufferHeight,{format:H9,type:gJ,colorSpace:J.outputColorSpace,stencilBuffer:F.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}else{let K0=null,D0=null,F0=null;if(F.depth)F0=F.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,K0=F.stencil?e9:t9,D0=F.stencil?f8:K9;let f0={colorFormat:Q.RGBA8,depthFormat:F0,scaleFactor:W};N=this.getBinding(),E=N.createProjectionLayer(f0),Z.updateRenderState({layers:[E]}),J.setPixelRatio(1),J.setSize(E.textureWidth,E.textureHeight,!1),C=new vJ(E.textureWidth,E.textureHeight,{format:H9,type:gJ,depthTexture:new U9(E.textureWidth,E.textureHeight,D0,void 0,void 0,void 0,void 0,void 0,void 0,K0),stencilBuffer:F.stencil,colorSpace:J.outputColorSpace,samples:F.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(Y),U=null,K=await Z.requestReferenceSpace(H),w0.setContext(Z),w0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return I.getDepthTexture()};function n(d){for(let Q0=0;Q0<d.removed.length;Q0++){let K0=d.removed[Q0],D0=A.indexOf(K0);if(D0>=0)A[D0]=null,L[D0].disconnect(K0)}for(let Q0=0;Q0<d.added.length;Q0++){let K0=d.added[Q0],D0=A.indexOf(K0);if(D0===-1){for(let f0=0;f0<L.length;f0++)if(f0>=A.length){A.push(K0),D0=f0;break}else if(A[f0]===null){A[f0]=K0,D0=f0;break}if(D0===-1)break}let F0=L[D0];if(F0)F0.connect(K0)}}let f=new y,a=new y;function e(d,Q0,K0){f.setFromMatrixPosition(Q0.matrixWorld),a.setFromMatrixPosition(K0.matrixWorld);let D0=f.distanceTo(a),F0=Q0.projectionMatrix.elements,f0=K0.projectionMatrix.elements,b0=F0[14]/(F0[10]-1),B0=F0[14]/(F0[10]+1),x0=(F0[9]+1)/F0[5],p0=(F0[9]-1)/F0[5],j0=(F0[8]-1)/F0[0],UJ=(f0[8]+1)/f0[0],yJ=b0*j0,c0=b0*UJ,BJ=D0/(-j0+UJ),MJ=BJ*-j0;if(Q0.matrixWorld.decompose(d.position,d.quaternion,d.scale),d.translateX(MJ),d.translateZ(BJ),d.matrixWorld.compose(d.position,d.quaternion,d.scale),d.matrixWorldInverse.copy(d.matrixWorld).invert(),F0[10]===-1)d.projectionMatrix.copy(Q0.projectionMatrix),d.projectionMatrixInverse.copy(Q0.projectionMatrixInverse);else{let OJ=b0+BJ,j=B0+BJ,pJ=yJ-MJ,o0=c0+(D0-MJ),KJ=x0*B0/j*OJ,V=p0*B0/j*OJ;d.projectionMatrix.makePerspective(pJ,o0,KJ,V,OJ,j),d.projectionMatrixInverse.copy(d.projectionMatrix).invert()}}function J0(d,Q0){if(Q0===null)d.matrixWorld.copy(d.matrix);else d.matrixWorld.multiplyMatrices(Q0.matrixWorld,d.matrix);d.matrixWorldInverse.copy(d.matrixWorld).invert()}this.updateCamera=function(d){if(Z===null)return;let{near:Q0,far:K0}=d;if(I.texture!==null){if(I.depthNear>0)Q0=I.depthNear;if(I.depthFar>0)K0=I.depthFar}if(w.near=B.near=O.near=Q0,w.far=B.far=O.far=K0,g!==w.near||s!==w.far)Z.updateRenderState({depthNear:w.near,depthFar:w.far}),g=w.near,s=w.far;w.layers.mask=d.layers.mask|6,O.layers.mask=w.layers.mask&-5,B.layers.mask=w.layers.mask&-3;let D0=d.parent,F0=w.cameras;J0(w,D0);for(let f0=0;f0<F0.length;f0++)J0(F0[f0],D0);if(F0.length===2)e(w,O,B);else w.projectionMatrix.copy(O.projectionMatrix);E0(d,w,D0)};function E0(d,Q0,K0){if(K0===null)d.matrix.copy(Q0.matrixWorld);else d.matrix.copy(K0.matrixWorld),d.matrix.invert(),d.matrix.multiply(Q0.matrixWorld);if(d.matrix.decompose(d.position,d.quaternion,d.scale),d.updateMatrixWorld(!0),d.projectionMatrix.copy(Q0.projectionMatrix),d.projectionMatrixInverse.copy(Q0.projectionMatrixInverse),d.isPerspectiveCamera)d.fov=T8*2*Math.atan(1/d.projectionMatrix.elements[5]),d.zoom=1}this.getCamera=function(){return w},this.getFoveation=function(){if(E===null&&G===null)return;return Y},this.setFoveation=function(d){if(Y=d,E!==null)E.fixedFoveation=d;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=d},this.hasDepthSensing=function(){return I.texture!==null},this.getDepthSensingMesh=function(){return I.getMesh(w)},this.getCameraTexture=function(d){return q[d]};let R0=null;function n0(d,Q0){if(X=Q0.getViewerPose(U||K),D=Q0,X!==null){let K0=X.views;if(G!==null)J.setRenderTargetFramebuffer(C,G.framebuffer),J.setRenderTarget(C);let D0=!1;if(K0.length!==w.cameras.length)w.cameras.length=0,D0=!0;for(let B0=0;B0<K0.length;B0++){let x0=K0[B0],p0=null;if(G!==null)p0=G.getViewport(x0);else{let UJ=N.getViewSubImage(E,x0);if(p0=UJ.viewport,B0===0)J.setRenderTargetTextures(C,UJ.colorTexture,UJ.depthStencilTexture),J.setRenderTarget(C)}let j0=p[B0];if(j0===void 0)j0=new VJ,j0.layers.enable(B0),j0.viewport=new YJ,p[B0]=j0;if(j0.matrix.fromArray(x0.transform.matrix),j0.matrix.decompose(j0.position,j0.quaternion,j0.scale),j0.projectionMatrix.fromArray(x0.projectionMatrix),j0.projectionMatrixInverse.copy(j0.projectionMatrix).invert(),j0.viewport.set(p0.x,p0.y,p0.width,p0.height),B0===0)w.matrix.copy(j0.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale);if(D0===!0)w.cameras.push(j0)}let F0=Z.enabledFeatures;if(F0&&F0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&k){N=$.getBinding();let B0=N.getDepthInformation(K0[0]);if(B0&&B0.isValid&&B0.texture)I.init(B0,Z.renderState)}if(F0&&F0.includes("camera-access")&&k){J.state.unbindTexture(),N=$.getBinding();for(let B0=0;B0<K0.length;B0++){let x0=K0[B0].camera;if(x0){let p0=q[x0];if(!p0)p0=new V6,q[x0]=p0;let j0=N.getCameraImage(x0);p0.sourceTexture=j0}}}}for(let K0=0;K0<L.length;K0++){let D0=A[K0],F0=L[K0];if(D0!==null&&F0!==void 0)F0.update(D0,Q0,U||K)}if(R0)R0(d,Q0);if(Q0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:Q0});D=null}let w0=new UK;w0.setAnimationLoop(n0),this.setAnimationLoop=function(d){R0=d},this.dispose=function(){}}};PN=new r0,BK=new y0;BK.set(-1,0,0,0,1,0,0,0,1);SN=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183])});function u8(J){return new I6({color:0,emissive:16777215,emissiveIntensity:J})}var c$;var _K=o8(()=>{z7();c$=class c$ extends Y9{constructor(){super();this.name="RoomEnvironment",this.position.y=-3.5;let J=new g9;J.deleteAttribute("uv");let Q=new p9({side:TJ}),$=new p9,Z=new _6(16777215,900,28,2);Z.position.set(0.418,16.199,0.3),this.add(Z);let W=new XJ(J,Q);W.position.set(-0.757,13.219,0.717),W.scale.set(31.713,28.305,28.591),this.add(W);let K=new X9(J,$,6),H=new WJ;H.position.set(-10.906,2.009,1.846),H.rotation.set(0,-0.195,0),H.scale.set(2.328,7.905,4.651),H.updateMatrix(),K.setMatrixAt(0,H.matrix),H.position.set(-5.607,-0.754,-0.758),H.rotation.set(0,0.994,0),H.scale.set(1.97,1.534,3.955),H.updateMatrix(),K.setMatrixAt(1,H.matrix),H.position.set(6.167,0.857,7.803),H.rotation.set(0,0.561,0),H.scale.set(3.927,6.285,3.687),H.updateMatrix(),K.setMatrixAt(2,H.matrix),H.position.set(-2.017,0.018,6.124),H.rotation.set(0,0.333,0),H.scale.set(2.002,4.566,2.064),H.updateMatrix(),K.setMatrixAt(3,H.matrix),H.position.set(2.291,-0.756,-2.621),H.rotation.set(0,-0.286,0),H.scale.set(1.546,1.552,1.496),H.updateMatrix(),K.setMatrixAt(4,H.matrix),H.position.set(-2.193,-0.369,-5.547),H.rotation.set(0,0.516,0),H.scale.set(3.875,3.487,2.986),H.updateMatrix(),K.setMatrixAt(5,H.matrix),this.add(K);let Y=new XJ(J,u8(50));Y.position.set(-16.116,14.37,8.208),Y.scale.set(0.1,2.428,2.739),this.add(Y);let U=new XJ(J,u8(50));U.position.set(-16.109,18.021,-8.207),U.scale.set(0.1,2.425,2.751),this.add(U);let X=new XJ(J,u8(17));X.position.set(14.904,12.198,-1.832),X.scale.set(0.15,4.265,6.331),this.add(X);let N=new XJ(J,u8(43));N.position.set(-0.462,8.89,14.52),N.scale.set(4.38,5.441,0.088),this.add(N);let E=new XJ(J,u8(20));E.position.set(3.235,11.486,-12.541),E.scale.set(2.5,2,0.1),this.add(E);let G=new XJ(J,u8(100));G.position.set(0,20,0),G.scale.set(1,0.1,1),this.add(G)}dispose(){let J=new Set;this.traverse((Q)=>{if(Q.isMesh)J.add(Q.geometry),J.add(Q.material)});for(let Q of J)Q.dispose()}}});function fN(J){return()=>{return J=Math.imul(J,1664525)+1013904223>>>0,J/4294967296}}function bN([J,Q,$],[Z,W,K]){let H=Q*Math.cos(Z)-$*Math.sin(Z),Y=Q*Math.sin(Z)+$*Math.cos(Z),U=J*Math.cos(W)+Y*Math.sin(W),X=-J*Math.sin(W)+Y*Math.cos(W);return[U*Math.cos(K)-H*Math.sin(K),U*Math.sin(K)+H*Math.cos(K),X]}function n$(J,Q,$){let Z=Math.max(0,Math.min(1,($-J)/(Q-J)));return Z*Z*Z*(Z*(Z*6-15)+10)}function s$(J){return n$(0.12,0.58,J)*(1-n$(0.62,0.98,J))}function PK(){let J=fN(20260914),Q=[],$=[],Z=[],W=new Set,K=(X,N)=>{let E=Math.min(X,N),G=Math.max(X,N),D=`${E}:${G}`;if(E!==G&&!W.has(D))W.add(D),$.push([E,G])},H=(X,N,E,G)=>{let D=Z.length;Z.push({center:X,axis:CK([J()-0.5,J()-0.5,J()-0.5]),direction:CK([X[0]*0.75+J()-0.5,X[1]+J()-0.5,X[2]+(J()-0.5)*2]),spin:(J()>0.5?1:-1)*(1.6+J()*2.6),travel:1.3+J()*3.4,phase:J()*Math.PI*2});let k=(_,C=!1)=>{let L=bN(_,E),A=J(),z=Q.length;return Q.push({local:L,fragment:D,position:L.map((P,O)=>P+X[O]),radius:(C?0.031:A>0.93?0.12:0.052+J()*0.035)*N,element:C?"hydrogen":A<0.15?"cyan":A<0.35?"silver":"carbon"}),z},I=G?1+Math.floor(J()*2):2+Math.floor(J()*2),q=[],F=[];for(let _=0;_<I;_++){let C=J()>0.3?6:5,L=[],A=(0.26+J()*0.06)*N;for(let z=0;z<C;z++){let P=z/C*Math.PI*2+_*0.2,O=[Math.cos(P)*A+_*N*0.49,Math.sin(P)*A+Math.sin(_*1.8)*0.12,Math.sin(P*2+_*0.8)*N*0.065+_*0.12],B=k(O);if(L.push(B),q.push(B),z>0)K(L[z-1],B);if((z+_)%3===0){let p=[O[0]+Math.cos(P)*N*0.22,O[1]+Math.sin(P)*N*0.22,O[2]+N*0.12];K(B,k(p,!0))}}if(K(L[L.length-1],L[0]),F.length)K(F[0],L[Math.floor(C/2)]);F=L}return{first:q[0],end:q[q.length-1],fragment:D}},Y=24,U=[];for(let X=0;X<24;X++){let N=X/24*Math.PI*2,E=1.5+Math.sin(N*3+0.4)*0.27+J()*0.25,G=[Math.cos(N)*E,Math.sin(N)*E*0.83,Math.sin(N*2+0.5)*0.7];if(U.push(H(G,0.72+J()*0.38,[J()*2.7,J()*2.7,N+J()],!1)),X>0)K(U[X-1].end,U[X].first);if(X>2&&X%3===0)K(U[X-3].first,U[X].first);let D=U[X].end,k=1+Math.floor(J()*3);for(let I=0;I<k;I++){let q=E+0.55+I*0.58,F=N+Math.sin(X*1.7+I)*0.28,_=[Math.cos(F)*q*1.04,Math.sin(F)*q*0.92,G[2]+(J()-0.5)*1.5],C=H(_,0.65+J()*0.5,[J()*3,J()*3,F],!0);K(D,C.first),D=C.end}}return K(U[U.length-1].end,U[0].first),{atoms:Q,bonds:$,fragments:Z}}function wK(J,Q,$,Z=0){if($.length<J.atoms.length*3)throw RangeError("Position buffer is too small");let W=Number.isNaN(Q)?0:Math.max(0,Math.min(1,Q)),K=s$(W),H=n$(0.66,1,W);for(let Y=0;Y<J.atoms.length;Y++){let U=J.atoms[Y],X=J.fragments[U.fragment],N=K*X.spin+H*0.45*Math.sin(X.phase)+Math.sin(Z*0.22+X.phase)*0.035,E=Math.cos(N),G=Math.sin(N),[D,k,I]=X.axis,[q,F,_]=U.local,C=D*q+k*F+I*_,L=K*(0.3+0.12*Math.sin(X.phase)),A=X.center[0]*Math.cos(L)-X.center[1]*Math.sin(L),z=X.center[0]*Math.sin(L)+X.center[1]*Math.cos(L),P=Y*3;$[P]=q*E+(k*_-I*F)*G+D*C*(1-E)+A+X.direction[0]*K*X.travel+H*Math.sin(X.center[1]*1.4)*0.28,$[P+1]=F*E+(I*q-D*_)*G+k*C*(1-E)+z+X.direction[1]*K*X.travel*0.72+H*Math.sin(X.center[0])*0.34,$[P+2]=_*E+(D*F-k*q)*G+I*C*(1-E)+X.center[2]+X.direction[2]*K*X.travel+H*Math.cos(X.phase)*0.5}}var CK=([J,Q,$])=>{let Z=Math.hypot(J,Q,$)||1;return[J/Z,Q/Z,$/Z]};function i$(J,Q,$=0){let Z=1.44+Math.cos(J*3+0.6)*0.19+Math.sin(J*5)*0.075,W=(0.3+0.16*(0.5+0.5*Math.sin(J*4+0.3)))*(1+$*0.12),K=Q+J*1.35,H=Math.sin(J*19+Q*5)*0.024+Math.cos(J*31-Q*3)*0.012;return new y(Math.cos(J)*(Z+Math.cos(K)*W+H),Math.sin(J)*(Z*0.83+Math.cos(K)*W)+Math.sin(J*3)*0.12,Math.sin(J*2+0.5)*0.55+Math.sin(K)*W*1.4+H)}function TK(){let J=new uJ,Q=[],$=[],Z={time:{value:0},burst:{value:0}},W=`
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
  `,K=`
    uniform float time;
    uniform float burst;
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec2 vUv;
    void main() {
      float fresnel=pow(1.0-abs(dot(normalize(vNormal),normalize(vView))),2.7);
      float fibers=pow(.5+.5*sin(vUv.x*1256.0+sin(vUv.y*33.0+time*.2)*5.0),18.0);
      float wave=.65+.35*sin(vUv.x*34.0-vUv.y*7.0-time*.6);
      float alpha=(.022+fresnel*.24+fibers*.08)*wave*(1.0-burst*.45);
      vec3 color=mix(vec3(.08,.28,.36),vec3(.46,.78,.86),fresnel*.75+fibers*.25);
      gl_FragColor=vec4(color,alpha);
    }
  `;for(let G=0;G<2;G++){let I=[],q=[],F=[];for(let A=0;A<=180;A++)for(let z=0;z<=32;z++){let P=i$(A/180*Math.PI*2,z/32*Math.PI*2,G);if(I.push(P.x,P.y,P.z),q.push(A/180,z/32),A<180&&z<32){let O=A*33+z,B=O+32+1;F.push(O,B,O+1,B,B+1,O+1)}}let _=new FJ;_.setAttribute("position",new HJ(I,3)),_.setAttribute("uv",new HJ(q,2)),_.setIndex(F),_.computeVertexNormals();let C=new zJ({uniforms:Z,vertexShader:`
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
  `,fragmentShader:`
    uniform float time;
    uniform float burst;
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec2 vUv;
    void main() {
      float fresnel=pow(1.0-abs(dot(normalize(vNormal),normalize(vView))),2.7);
      float fibers=pow(.5+.5*sin(vUv.x*1256.0+sin(vUv.y*33.0+time*.2)*5.0),18.0);
      float wave=.65+.35*sin(vUv.x*34.0-vUv.y*7.0-time*.6);
      float alpha=(.022+fresnel*.24+fibers*.08)*wave*(1.0-burst*.45);
      vec3 color=mix(vec3(.08,.28,.36),vec3(.46,.78,.86),fresnel*.75+fibers*.25);
      gl_FragColor=vec4(color,alpha);
    }
  `,transparent:!0,side:cJ,depthWrite:!1}),L=new XJ(_,C);L.rotation.z=G*0.06,J.add(L),Q.push(_),$.push(C)}let H=[];for(let G=0;G<44;G++)for(let D=0;D<150;D++)for(let k of[D,D+1]){let I=k/150*Math.PI*2,q=G/44*Math.PI*2+Math.sin(I*3+G)*0.25+I*(G%3-1)*0.7,F=i$(I,q,0.2+Math.sin(G)*0.8);H.push(F.x,F.y,F.z)}let Y=new FJ;Y.setAttribute("position",new HJ(H,3));let U=new zJ({uniforms:Z,transparent:!0,depthWrite:!1,vertexShader:"uniform float time; uniform float burst; varying float light; void main(){ vec3 p=position; p+=normalize(position)*sin(position.x*5.+position.y*3.+time*.6)*.025; p*=1.+burst*.28; light=.35+.65*pow(.5+.5*sin(position.x*8.-position.y*5.-time*.8),3.); gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }",fragmentShader:"uniform float burst; varying float light; void main(){gl_FragColor=vec4(.4,.76,.85,light*.22*(1.-burst*.5));}"});J.add(new Z8(Y,U)),Q.push(Y),$.push(U);let X=[];for(let G=0;G<1600;G++){let D=G*2.399963,k=G*1.71833,I=i$(D,k,Math.sin(G*2.13)*1.5),q=0.02+Math.sin(G*3.71)*0.07;X.push(I.x+q,I.y+Math.cos(G)*q,I.z+Math.sin(G*2.1)*q)}let N=new FJ;N.setAttribute("position",new HJ(X,3));let E=new zJ({uniforms:Z,transparent:!0,depthWrite:!1,vertexShader:"uniform float time; uniform float burst; varying float alpha; void main(){vec3 p=position*(1.+burst*.5); p+=normalize(p)*sin(p.y*6.+time*.5)*.035; vec4 mv=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*mv; gl_PointSize=clamp(13./-mv.z,1.,3.); alpha=.25+.5*pow(.5+.5*sin(p.x*11.-p.z*7.+time),5.);}",fragmentShader:"varying float alpha; void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;gl_FragColor=vec4(.58,.88,.96,alpha*(1.-smoothstep(.08,.5,r)));}"});return J.add(new M6(N,E)),Q.push(N),$.push(E),{root:J,update(G,D){Z.time.value=G,Z.burst.value=D},dispose(){Q.forEach((G)=>G.dispose()),$.forEach((G)=>G.dispose())}}}function SK(J,Q){let $=new vJ(1,1,{type:J.extensions.has("EXT_color_buffer_float")?rJ:gJ});$.depthTexture=new U9(1,1,K9);let Z={color:{value:$.texture},depth:{value:$.depthTexture},resolution:{value:new g0(1,1)},focus:{value:12},near:{value:Q.near},far:{value:Q.far},aperture:{value:0.65}},W=new K8(2,2),K=new zJ({uniforms:Z,depthTest:!1,depthWrite:!1,transparent:!0,vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`
      uniform sampler2D color,depth; uniform vec2 resolution; uniform float focus,near,far,aperture;
      varying vec2 vUv;
      #include <packing>
      void main(){
        float d=texture2D(depth,vUv).r;
        float distance=-perspectiveDepthToViewZ(d,near,far);
        float coc=clamp(abs(distance-focus)*aperture,0.,4.5);
        if(d>.9999)coc=0.;
        vec2 pixel=1./resolution;
        vec4 center=texture2D(color,vUv);
        vec4 sum=center*2.; vec3 glow=vec3(0.);
        for(int i=0;i<8;i++){
          float a=float(i)*.785398;
          vec2 dir=vec2(cos(a),sin(a));
          sum+=texture2D(color,clamp(vUv+dir*pixel*coc,vec2(0.),vec2(1.)));
          vec3 sampleColor=texture2D(color,clamp(vUv+dir*pixel*4.,vec2(0.),vec2(1.))).rgb;
          glow+=max(sampleColor-vec3(.65),vec3(0.));
        }
        vec4 c=sum/10.;
        gl_FragColor=vec4(c.rgb+glow*.018,c.a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `}),H=new Y9;H.add(new XJ(W,K));let Y=new g8;return{render(U){J.setRenderTarget($),J.render(U,Q),J.setRenderTarget(null),Z.focus.value=Q.position.z,J.render(H,Y)},resize(U,X){$.setSize(U,X),Z.resolution.value.set(U,X)},dispose(){$.depthTexture.dispose(),$.dispose(),W.dispose(),K.dispose()}}}var jK=o8(()=>{z7()});var yK={};aK(yK,{createMolecularRenderer:()=>hN});async function hN(J){let Q=new I7({canvas:J,alpha:!0,antialias:!0,powerPreference:"high-performance"});Q.setClearColor(329482,0),Q.outputColorSpace=$8,Q.toneMapping=o9,Q.toneMappingExposure=1.05;let $=new Y9,Z=new VJ(42,1,0.1,80);Z.position.set(0,0,12);let W=new c$,K=new B7(Q),H=K.fromScene(W,0.02);W.dispose(),K.dispose(),$.environment=H.texture,$.environmentIntensity=0.75,$.add(new A6(13624561,528923,0.9));let Y=new p8(16777215,3.2);Y.position.set(-3,5,6),$.add(Y);let U=new p8(10214635,4);U.position.set(4,1,-3),$.add(U);let X=new p8(5269887,0.8);X.position.set(-4,-3,2),$.add(X);let N=new uJ;$.add(N);let E=PK(),G=new Float32Array(E.atoms.length*3),D=new H8(1,22,16),k=new W8(1,1,1,8),I=new B6({metalness:0.62,roughness:0.25,clearcoat:0.6,clearcoatRoughness:0.19}),q=new p9({color:6912384,metalness:0.78,roughness:0.3}),F=new X9(D,I,E.atoms.length),_=new X9(k,q,E.bonds.length);F.frustumCulled=!1,_.frustumCulled=!1,F.instanceMatrix.setUsage(I9),_.instanceMatrix.setUsage(I9);let C={carbon:4740447,silver:12898774,cyan:4557727,hydrogen:12372434};E.atoms.forEach((J0,E0)=>F.setColorAt(E0,new S0(C[J0.element]))),N.add(F,_);let L=TK();N.add(L.root);let A=SK(Q,Z),z=new WJ,P=new y,O=new y,B=new y,p=new y(0,1,0),w=E.bonds.map(([J0,E0])=>new y(...E.atoms[J0].position).distanceTo(new y(...E.atoms[E0].position))),g=1,s=1,b=!1,u=!1,n=0,f=(J0,E0,R0,n0,w0=0)=>{if(u)return;let d=Math.max(0,Math.min(1,J0)),Q0=s$(d);wK(E,d,G,w0);for(let F0=0;F0<E.atoms.length;F0++)z.position.fromArray(G,F0*3),z.quaternion.identity(),z.scale.setScalar(E.atoms[F0].radius),z.updateMatrix(),F.setMatrixAt(F0,z.matrix);for(let F0=0;F0<E.bonds.length;F0++){let[f0,b0]=E.bonds[F0];P.fromArray(G,f0*3),O.fromArray(G,b0*3),B.subVectors(O,P);let B0=B.length(),x0=E.atoms[f0].fragment===E.atoms[b0].fragment,p0=x0?1:1-A9.smoothstep(B0/w[F0],1.15,1.9),j0=(x0?0.019:0.011)*p0;z.position.copy(P).add(O).multiplyScalar(0.5),z.quaternion.setFromUnitVectors(p,B.normalize()),z.scale.set(j0,Math.max(0.001,B0),j0),z.updateMatrix(),_.setMatrixAt(F0,z.matrix)}F.instanceMatrix.needsUpdate=!0,_.instanceMatrix.needsUpdate=!0,N.rotation.set(0.13+d*0.44+Math.sin(w0*0.12)*0.04+R0*n0*0.07,-0.35+d*2.2+w0*0.065+E0*n0*0.12,-0.25+d*0.32),L.update(w0,Q0);let K0=b?0.5:0.7-Q0*0.1,D0=b?0.68:0.51;if(Z.setViewOffset(g,s,(0.5-K0)*g,(0.5-D0)*s,g,s),A.render($),"dataset"in J)J.dataset.phase=d.toFixed(3),J.dataset.frame=String(++n),J.dataset.model="molecular-complex";return d.toFixed(3)},a=(J0,E0,R0=1)=>{g=J0,s=E0,b=J0<=900;let n0=Math.min(R0,b?1.25:1.5);Q.setPixelRatio(n0),Q.setSize(J0,E0,!1),A.resize(Math.round(J0*n0),Math.round(E0*n0)),Z.aspect=J0/Math.max(1,E0),Z.position.z=b?Math.max(12,12.4/Z.aspect):11.7,Z.updateProjectionMatrix()},e=(J0=!0)=>{if(u=!0,F.dispose(),_.dispose(),D.dispose(),k.dispose(),I.dispose(),q.dispose(),L.dispose(),A.dispose(),H.dispose(),Q.dispose(),J0)Q.forceContextLoss()};try{await Q.compileAsync($,Z)}catch(J0){throw e(),J0}return{render:f,resize:a,dispose:e}}var vK=o8(()=>{z7();_K();jK()});z7();var d8=[0,0.32,0.58,0.82,1],yN=Math.PI*(3-Math.sqrt(5)),u$=new WeakMap;function IK({cinematic:J=!1}={}){let Q=J?3:2,$=J?4:3,Z=[],W=new Map,K=new Map;for(let X=-Q;X<=Q;X++)for(let N=-Q;N<=Q;N++){if(Math.abs(X+N)>Q)continue;let E=0.645*X,G=0.43*Math.sqrt(3)*(N+X/2),D=[];for(let k=0;k<6;k++){let I=k*Math.PI/3,q=E+0.43*Math.cos(I),F=G+0.43*Math.sin(I),_=`${Math.round(q*1e6)},${Math.round(F*1e6)}`,C=W.get(_);if(C===void 0)C=Z.length,W.set(_,C),Z.push([q,F]);D.push(C)}for(let k=0;k<6;k++){let I=D[k],q=D[(k+1)%6],F=Math.min(I,q),_=Math.max(I,q);K.set(`${F},${_}`,[F,_])}}let H=[],Y=[];for(let X=0;X<$;X++){let N=H.length,E=X===1?0.14333333333333334:0;Z.forEach(([G,D],k)=>{H.push({position:[G+E,(X-($-1)/2)*(J?0.56:0.46),D],layer:X,radius:k%11===0?0.102:0.077,accent:(k+X*5)%9===0})});for(let[G,D]of K.values())Y.push([G+N,D+N])}let U={atoms:H,bonds:Y,cinematic:J};return u$.set(U,zK(U)),U}function zK(J){let Q=d8.map(()=>new Float32Array(J.atoms.length*3));return J.atoms.forEach(($,Z)=>{let[W,K,H]=$.position,Y=$.layer-(J.cinematic?1.5:1),U=Z*3;Q[0].set([W,K,H],U);let X=Y*(J.cinematic?0.2:0.13);Q[1].set([W*Math.cos(X)+Y*(J.cinematic?0.65:0.52),Y*(J.cinematic?1.55:1.6)+W*Math.sin(X),H+Y*(J.cinematic?0.65:0.23)],U);let N=1-2*(Z+0.5)/J.atoms.length,E=Math.sqrt(1-N*N),G=Z*yN,D=J.cinematic?3.5+(0.5+0.5*Math.sin(Z*1.71))*1.9:2.7+Math.sin(Z*1.71)*0.18;Q[2].set([Math.cos(G)*E*D*(J.cinematic?1.4:1)+W*0.08,N*(J.cinematic?3.3:2.9)+Math.sin(Z*0.73)*0.08,Math.sin(G)*E*D*(J.cinematic?1:0.87)],U),Q[3].set([W*1.12,Y*(J.cinematic?0.72:0.59)+Math.sin(W*1.3)*0.62+Math.cos(H*1.8)*0.1,H*0.96],U);let k=W*(J.cinematic?0.7:0.92),I=(J.cinematic?2.05:1.52)+Y*0.42;Q[4].set([Math.sin(k)*I,Math.cos(k)*I-1.02,H*0.97+Y*0.07],U)}),Q}function AK(J,Q,$){let Z=J.atoms.length*3;if($.length<Z)throw RangeError(`Science positions require ${Z} coordinates`);let W=u$.get(J);if(!W)W=zK(J),u$.set(J,W);let K=Number.isNaN(Q)?0:Math.min(1,Math.max(0,Q)),H=0;while(H<d8.length-2&&K>d8[H+1])H++;let Y=(K-d8[H])/(d8[H+1]-d8[H]),U=Y*Y*Y*(Y*(Y*6-15)+10),X=W[H],N=W[H+1];for(let E=0;E<Z;E++)$[E]=X[E]+(N[E]-X[E])*U}var xN={hero:[0,1],simulation:[0.22,0.86],structure:[0,0.32],representation:[0.34,0.64],prediction:[0.66,1],discovery:[0,1]};function gN(){let Q=new Uint8Array(65536);for(let Z=0;Z<128;Z++)for(let W=0;W<128;W++){let K=W/127*2-1,H=1-Z/127*2,Y=Math.sqrt(Math.max(0,1-K*K-H*H)),U=Math.exp(-((K+0.38)**2/0.035+(H-0.32)**2/0.19)),X=Math.exp(-((K-0.63)**2/0.009+(H-0.08)**2/0.28)),N=Math.exp(-((K+0.08)**2/0.4+(H+0.76)**2/0.025)),E=(1-Y)**4,G=Math.min(1,0.2+Y*0.22+Math.max(0,H)*0.16+U*0.95+X*0.75+N*0.38+E*0.48),D=(Z*128+W)*4;Q[D]=Math.round(G*240),Q[D+1]=Math.round(G*249),Q[D+2]=Math.round(G*255),Q[D+3]=255}let $=new h8(Q,128,128);return $.colorSpace=$8,$.magFilter=IJ,$.minFilter=IJ,$.needsUpdate=!0,$}async function fK(J,Q){if(Q==="hero"){let{createMolecularRenderer:w0}=await Promise.resolve().then(() => (vK(),yK));return w0(J)}let $=new I7({canvas:J,alpha:!0,antialias:!0,powerPreference:"high-performance"});$.setClearColor(329482,0),$.outputColorSpace=$8,$.toneMapping=o9,$.toneMappingExposure=1.2;let Z=new Y9,W=Q==="hero"||Q==="discovery",K=new VJ(W?42:35,1,0.1,80);K.position.set(0,0.4,11.5),K.lookAt(0,0,0);let H=new uJ;H.rotation.set(0.46,-0.42,-0.3),Z.add(H);let Y=IK({cinematic:W}),U=new Float32Array(Y.atoms.length*3),X=new H8(1,24,16),N=new W8(1,1,1,10,1),E=gN(),G=new D7({matcap:E}),D=new D7({matcap:E,color:9215402}),k=new X9(X,G,Y.atoms.length),I=new X9(N,D,Y.bonds.length);k.instanceMatrix.setUsage(I9),I.instanceMatrix.setUsage(I9),k.frustumCulled=!1,I.frustumCulled=!1;let q=[11912914,6651538,14805230,8493485],F=new S0;Y.atoms.forEach((w0,d)=>k.setColorAt(d,F.setHex(w0.accent?5158619:q[w0.layer]))),H.add(I,k);let _=new FJ,C=new Float32Array(Y.bonds.length*6);_.setAttribute("position",new wJ(C,3).setUsage(I9));let L=new x8({color:9360622,transparent:!0,opacity:0,depthWrite:!1}),A=new Z8(_,L);A.frustumCulled=!1,H.add(A);let z=new Float32Array(Y.atoms.length*6),P=new FJ;P.setAttribute("position",new wJ(z,3).setUsage(I9));let O=new x8({color:10213613,transparent:!0,opacity:0,depthWrite:!1}),B=new Z8(P,O);B.frustumCulled=!1,H.add(B);let p=new WJ,w=new y,g=new y,s=new y,b=new y(0,1,0),[u,n]=xN[Q],f=!1,a=1,e=1,J0=!1;function E0(w0,d,Q0,K0,D0=0){if(f)return;let F0=u+(n-u)*Math.max(0,Math.min(1,w0));AK(Y,F0,U);let f0=A9.smoothstep(F0,0.34,0.54)*(1-A9.smoothstep(F0,0.61,0.81));for(let B0=0;B0<Y.atoms.length;B0++){let x0=B0*3,p0=U[x0]-d*3,j0=U[x0+2]-Q0*3,UJ=Math.exp(-(p0*p0+j0*j0)*0.55)*K0;U[x0+1]+=UJ*(0.16+Y.atoms[B0].layer*0.09),p.position.fromArray(U,x0),p.quaternion.identity(),p.scale.setScalar(Y.atoms[B0].radius*(W?1.7:1.65)*(1+(W&&B0%23===0?f0*0.65:0))),p.updateMatrix(),k.setMatrixAt(B0,p.matrix);let yJ=Y.atoms[B0].position;for(let c0=0;c0<3;c0++)z[B0*6+c0]=U[x0+c0],z[B0*6+c0+3]=U[x0+c0]-(U[x0+c0]-yJ[c0])*0.14*f0}for(let B0=0;B0<Y.bonds.length;B0++){let[x0,p0]=Y.bonds[B0];w.fromArray(U,x0*3),g.fromArray(U,p0*3),s.subVectors(g,w);let j0=s.length(),UJ=(1-A9.smoothstep(j0,0.65,1.25))*(1-f0*0.9);p.position.copy(w).add(g).multiplyScalar(0.5),p.quaternion.setFromUnitVectors(b,s.normalize()),p.scale.set(0.028*UJ,Math.max(0.001,j0),0.028*UJ),p.updateMatrix(),I.setMatrixAt(B0,p.matrix),w.toArray(C,B0*6),g.toArray(C,B0*6+3)}k.instanceMatrix.needsUpdate=!0,I.instanceMatrix.needsUpdate=!0,_.attributes.position.needsUpdate=!0,P.attributes.position.needsUpdate=!0;let b0=A9.smoothstep(F0,0.36,0.53)*(1-A9.smoothstep(F0,0.64,0.8));if(L.opacity=b0*(W?0.018:0.05),A.visible=L.opacity>0.003,O.opacity=W?f0*0.16:0,B.visible=O.opacity>0.003,H.rotation.y=-0.42+F0*0.55+d*K0*0.06+D0*0.02,H.rotation.x=0.46+F0*0.15,W){let B0=J0?0.5:0.72-f0*0.12,x0=J0?Q==="hero"?0.68:0.72:0.51;K.setViewOffset(a,e,(0.5-B0)*a,(0.5-x0)*e,a,e)}if($.render(Z,K),"dataset"in J)J.dataset.phase=F0.toFixed(3),J.dataset.drawCalls=String($.info.render.calls);return F0.toFixed(3)}function R0(w0,d,Q0=1){a=w0,e=d,J0=w0<=900;let K0=w0/Math.max(d,1);$.setPixelRatio(Math.min(Q0,w0<600?1.5:1.75)),$.setSize(w0,d,!1),K.aspect=K0,K.position.z=W?J0?Math.max(11.5,11.8/K0):10.5:Math.max(8.7,(w0<600?9.7:8.8)/K0),K.updateProjectionMatrix()}function n0(w0=!0){if(f=!0,k.dispose(),I.dispose(),X.dispose(),N.dispose(),G.dispose(),D.dispose(),_.dispose(),L.dispose(),P.dispose(),O.dispose(),E.dispose(),$.dispose(),w0)$.forceContextLoss()}try{await $.compileAsync(Z,K)}catch(w0){throw n0(),w0}return{render:E0,resize:R0,dispose:n0}}var A7=self,E9,hK="hero",fJ,l9={width:1,height:1,pixelRatio:1},c8={progress:0,x:0,y:0,strength:0},q9=!1,eJ=!1,S6=!1,n8=0,i8,s8;function xK(){if(i8!==void 0)clearTimeout(i8);i8=void 0}function o$(J){if(q9||eJ)return;A7.postMessage({type:"error",message:J instanceof Error?J.message:String(J)})}function gK(){if(!fJ||q9||eJ)return;let J=fJ.render(c8.progress,c8.x,c8.y,c8.strength,c8.time||0);if(typeof J==="string")A7.postMessage({type:"rendered",phase:J})}function bK(){if(i8!==void 0||!fJ||q9||eJ)return;i8=setTimeout(()=>{i8=void 0;try{gK()}catch(J){o$(J)}},0)}async function pK(){if(!E9||q9||eJ||S6||fJ)return;let J=++n8;S6=!0;try{let Q=await fK(E9,hK);if(q9||eJ||J!==n8){Q.dispose(!1);return}fJ=Q,fJ.resize(l9.width,l9.height,l9.pixelRatio),gK(),A7.postMessage({type:"ready"})}catch(Q){if(J===n8)fJ?.dispose(!1),fJ=void 0,o$(Q)}finally{if(J===n8)S6=!1}}function j6(J){if(J.preventDefault(),q9||eJ)return;eJ=!0,n8++,S6=!1,xK(),A7.postMessage({type:"lost"})}function y6(){if(q9||!eJ)return;if(eJ=!1,s8!==void 0)clearTimeout(s8);s8=setTimeout(()=>{if(s8=void 0,q9||eJ)return;fJ?.dispose(!1),fJ=void 0,pK()},0)}function pN(J){J.addEventListener("webglcontextlost",j6),J.addEventListener("webglcontextrestored",y6),J.addEventListener("contextlost",j6),J.addEventListener("contextrestored",y6)}function mN(){if(q9=!0,n8++,xK(),s8!==void 0)clearTimeout(s8);if(E9)E9.removeEventListener("webglcontextlost",j6),E9.removeEventListener("webglcontextrestored",y6),E9.removeEventListener("contextlost",j6),E9.removeEventListener("contextrestored",y6);fJ?.dispose(),fJ=void 0}A7.onmessage=({data:J})=>{if(q9)return;try{switch(J.type){case"init":if(E9)throw Error("A scientific scene worker accepts one canvas");E9=J.canvas,hK=J.mode,l9={width:J.width,height:J.height,pixelRatio:J.pixelRatio},pN(E9),pK();break;case"render":c8={progress:J.progress,x:J.x,y:J.y,strength:J.strength,time:J.time},bK();break;case"resize":if(l9={width:J.width,height:J.height,pixelRatio:J.pixelRatio},fJ&&!eJ)fJ.resize(l9.width,l9.height,l9.pixelRatio);bK();break;case"dispose":mN();break}}catch(Q){o$(Q)}};

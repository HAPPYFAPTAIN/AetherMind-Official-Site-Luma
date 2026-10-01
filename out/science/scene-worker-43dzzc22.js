var YZ="185";var XZ=0,d6=1,UZ=2;var n8=1,GZ=2,L8=3,V8=0,SJ=1,eJ=2,J9=0,s8=1,u6=2,c6=3,n6=4,NZ=5;var B8=100,EZ=101,qZ=102,FZ=103,DZ=104,OZ=200,RZ=201,kZ=202,MZ=203,LZ=204,VZ=205,BZ=206,zZ=207,IZ=208,AZ=209,_Z=210,CZ=211,wZ=212,PZ=213,TZ=214,SZ=0,jZ=1,yZ=2,s6=3,vZ=4,fZ=5,bZ=6,hZ=7,xZ=0,gZ=1,pZ=2,sJ=0,i6=1,o6=2,a6=3,i8=4,r6=5,t6=6,e6=7;var z8=301,d9=302,m7=303,l7=304,o8=306,mZ=1000,d7=1001,lZ=1002,T9=1003,dZ=1004;var a8=1005;var VJ=1006,u7=1007;var u9=1008;var iJ=1009,uZ=1010,cZ=1011,r8=1012,JQ=1013,S9=1014,F9=1015,D9=1016,QQ=1017,$Q=1018,I8=1020,nZ=35902,sZ=35899,iZ=1021,oZ=1022,Q9=1023,c9=1026,n9=1027,aZ=1028,ZQ=1029,s9=1030,WQ=1031;var KQ=1033,c7=33776,n7=33777,s7=33778,i7=33779,HQ=35840,YQ=35841,XQ=35842,UQ=35843,GQ=36196,NQ=37492,EQ=37496,qQ=37488,FQ=37489,o7=37490,DQ=37491,OQ=37808,RQ=37809,kQ=37810,MQ=37811,LQ=37812,VQ=37813,BQ=37814,zQ=37815,IQ=37816,AQ=37817,_Q=37818,CQ=37819,wQ=37820,PQ=37821,TQ=36492,SQ=36494,jQ=36495,yQ=36283,vQ=36284,a7=36285,fQ=36286;var bQ=0,rZ=1,i9="",t8="srgb",hQ="srgb-linear",xQ="linear",t0="srgb";var tZ=512,eZ=513,JW=514,r7=515,QW=516,$W=517,t7=518,ZW=519;var A8=35048;var gQ="300 es",pQ=2000;function UK(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function GK(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function c8(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function WW(){let J=c8("canvas");return J.style.display="block",J}var b$={},k8=null;function mQ(...J){let Q="THREE."+J.shift();if(k8)k8("log",Q,...J);else console.log(Q,...J)}function KW(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function C0(...J){J=KW(J);let Q="THREE."+J.shift();if(k8)k8("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function P0(...J){J=KW(J);let Q="THREE."+J.shift();if(k8)k8("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function l9(...J){let Q=J.join(" ");if(Q in b$)return;b$[Q]=!0,C0(...J)}function HW(J,Q,$){return new Promise(function(Z,W){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:Z()}}setTimeout(K,$)})}var YW={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class O9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let W=Z.indexOf(Q);if(W!==-1)Z.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let W=0,K=Z.length;W<K;W++)Z[W].call(this,J);J.target=null}}}var zJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],h$=1234567,d8=Math.PI/180,M8=180/Math.PI;function _8(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(zJ[J&255]+zJ[J>>8&255]+zJ[J>>16&255]+zJ[J>>24&255]+"-"+zJ[Q&255]+zJ[Q>>8&255]+"-"+zJ[Q>>16&15|64]+zJ[Q>>24&255]+"-"+zJ[$&63|128]+zJ[$>>8&255]+"-"+zJ[$>>16&255]+zJ[$>>24&255]+zJ[Z&255]+zJ[Z>>8&255]+zJ[Z>>16&255]+zJ[Z>>24&255]).toLowerCase()}function p0(J,Q,$){return Math.max(Q,Math.min($,J))}function lQ(J,Q){return(J%Q+Q)%Q}function NK(J,Q,$,Z,W){return Z+(J-Q)*(W-Z)/($-Q)}function EK(J,Q,$){if(J!==Q)return($-J)/(Q-J);else return 0}function u8(J,Q,$){return(1-$)*J+$*Q}function qK(J,Q,$,Z){return u8(J,Q,1-Math.exp(-$*Z))}function FK(J,Q=1){return Q-Math.abs(lQ(J,Q*2)-Q)}function DK(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*(3-2*J)}function OK(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*J*(J*(J*6-15)+10)}function RK(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function kK(J,Q){return J+Math.random()*(Q-J)}function MK(J){return J*(0.5-Math.random())}function LK(J){if(J!==void 0)h$=J;let Q=h$+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function VK(J){return J*d8}function BK(J){return J*M8}function zK(J){return(J&J-1)===0&&J!==0}function IK(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function AK(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function _K(J,Q,$,Z,W){let{cos:K,sin:H}=Math,Y=K($/2),X=H($/2),U=K((Q+Z)/2),N=H((Q+Z)/2),E=K((Q-Z)/2),G=H((Q-Z)/2),D=K((Z-Q)/2),k=H((Z-Q)/2);switch(W){case"XYX":J.set(Y*N,X*E,X*G,Y*U);break;case"YZY":J.set(X*G,Y*N,X*E,Y*U);break;case"ZXZ":J.set(X*E,X*G,Y*N,Y*U);break;case"XZX":J.set(Y*N,X*k,X*D,Y*U);break;case"YXY":J.set(X*D,Y*N,X*k,Y*U);break;case"ZYZ":J.set(X*k,X*D,Y*N,Y*U);break;default:C0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+W)}}function O8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function PJ(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}var o9={DEG2RAD:d8,RAD2DEG:M8,generateUUID:_8,clamp:p0,euclideanModulo:lQ,mapLinear:NK,inverseLerp:EK,lerp:u8,damp:qK,pingpong:FK,smoothstep:DK,smootherstep:OK,randInt:RK,randFloat:kK,randFloatSpread:MK,seededRandom:LK,degToRad:VK,radToDeg:BK,isPowerOfTwo:zK,ceilPowerOfTwo:IK,floorPowerOfTwo:AK,setQuaternionFromProperEuler:_K,normalize:PJ,denormalize:O8};class d0{static{d0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=p0(this.x,J.x,Q.x),this.y=p0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=p0(this.x,J,Q),this.y=p0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(p0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(p0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=this.x-J.x,K=this.y-J.y;return this.x=W*$-K*Z+J.x,this.y=W*Z+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class R9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,W,K,H){let Y=$[Z+0],X=$[Z+1],U=$[Z+2],N=$[Z+3],E=W[K+0],G=W[K+1],D=W[K+2],k=W[K+3];if(N!==k||Y!==E||X!==G||U!==D){let z=Y*E+X*G+U*D+N*k;if(z<0)E=-E,G=-G,D=-D,k=-k,z=-z;let q=1-H;if(z<0.9995){let F=Math.acos(z),P=Math.sin(F);q=Math.sin(q*F)/P,H=Math.sin(H*F)/P,Y=Y*q+E*H,X=X*q+G*H,U=U*q+D*H,N=N*q+k*H}else{Y=Y*q+E*H,X=X*q+G*H,U=U*q+D*H,N=N*q+k*H;let F=1/Math.sqrt(Y*Y+X*X+U*U+N*N);Y*=F,X*=F,U*=F,N*=F}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=N}static multiplyQuaternionsFlat(J,Q,$,Z,W,K){let H=$[Z],Y=$[Z+1],X=$[Z+2],U=$[Z+3],N=W[K],E=W[K+1],G=W[K+2],D=W[K+3];return J[Q]=H*D+U*N+Y*G-X*E,J[Q+1]=Y*D+U*E+X*N-H*G,J[Q+2]=X*D+U*G+H*E-Y*N,J[Q+3]=U*D-H*N-Y*E-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:W,_order:K}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(Z/2),N=H(W/2),E=Y($/2),G=Y(Z/2),D=Y(W/2);switch(K){case"XYZ":this._x=E*U*N+X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N-E*G*D;break;case"YXZ":this._x=E*U*N+X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N+E*G*D;break;case"ZXY":this._x=E*U*N-X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N-E*G*D;break;case"ZYX":this._x=E*U*N-X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N+E*G*D;break;case"YZX":this._x=E*U*N+X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N-E*G*D;break;case"XZY":this._x=E*U*N-X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N+E*G*D;break;default:C0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],W=Q[8],K=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],N=Q[10],E=$+H+N;if(E>0){let G=0.5/Math.sqrt(E+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(W-X)*G,this._z=(K-Z)*G}else if($>H&&$>N){let G=2*Math.sqrt(1+$-H-N);this._w=(U-Y)/G,this._x=0.25*G,this._y=(Z+K)/G,this._z=(W+X)/G}else if(H>N){let G=2*Math.sqrt(1+H-$-N);this._w=(W-X)/G,this._x=(Z+K)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+N-$-H);this._w=(K-Z)/G,this._x=(W+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(p0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+K*H+Z*X-W*Y,this._y=Z*U+K*Y+W*H-$*X,this._z=W*U+K*X+$*Y-Z*H,this._w=K*U-$*H-Z*Y-W*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,H=this.dot(J);if(H<0)$=-$,Z=-Z,W=-W,K=-K,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+K*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),W=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class v{static{v.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(x$.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(x$.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6]*Z,this.y=W[1]*Q+W[4]*$+W[7]*Z,this.z=W[2]*Q+W[5]*$+W[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements,K=1/(W[3]*Q+W[7]*$+W[11]*Z+W[15]);return this.x=(W[0]*Q+W[4]*$+W[8]*Z+W[12])*K,this.y=(W[1]*Q+W[5]*$+W[9]*Z+W[13])*K,this.z=(W[2]*Q+W[6]*$+W[10]*Z+W[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,W=J.x,K=J.y,H=J.z,Y=J.w,X=2*(K*Z-H*$),U=2*(H*Q-W*Z),N=2*(W*$-K*Q);return this.x=Q+Y*X+K*N-H*U,this.y=$+Y*U+H*X-W*N,this.z=Z+Y*N+W*U-K*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z,this.y=W[1]*Q+W[5]*$+W[9]*Z,this.z=W[2]*Q+W[6]*$+W[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=p0(this.x,J.x,Q.x),this.y=p0(this.y,J.y,Q.y),this.z=p0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=p0(this.x,J,Q),this.y=p0(this.y,J,Q),this.z=p0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(p0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:W}=J,K=Q.x,H=Q.y,Y=Q.z;return this.x=Z*Y-W*H,this.y=W*K-$*Y,this.z=$*H-Z*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return V6.copy(this).projectOnVector(J),this.sub(V6)}reflect(J){return this.sub(V6.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(p0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var V6=new v,x$=new R9;class S0{static{S0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,W,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,H,Y,X)}set(J,Q,$,Z,W,K,H,Y,X){let U=this.elements;return U[0]=J,U[1]=Z,U[2]=H,U[3]=Q,U[4]=W,U[5]=Y,U[6]=$,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],N=$[7],E=$[2],G=$[5],D=$[8],k=Z[0],z=Z[3],q=Z[6],F=Z[1],P=Z[4],C=Z[7],V=Z[2],A=Z[5],I=Z[8];return W[0]=K*k+H*F+Y*V,W[3]=K*z+H*P+Y*A,W[6]=K*q+H*C+Y*I,W[1]=X*k+U*F+N*V,W[4]=X*z+U*P+N*A,W[7]=X*q+U*C+N*I,W[2]=E*k+G*F+D*V,W[5]=E*z+G*P+D*A,W[8]=E*q+G*C+D*I,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*K*U-Q*H*X-$*W*U+$*H*Y+Z*W*X-Z*K*Y}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=U*K-H*X,E=H*Y-U*W,G=X*W-K*Y,D=Q*N+$*E+Z*G;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let k=1/D;return J[0]=N*k,J[1]=(Z*X-U*$)*k,J[2]=(H*$-Z*K)*k,J[3]=E*k,J[4]=(U*Q-Z*Y)*k,J[5]=(Z*W-H*Q)*k,J[6]=G*k,J[7]=($*Y-X*Q)*k,J[8]=(K*Q-$*W)*k,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,W,K,H){let Y=Math.cos(W),X=Math.sin(W);return this.set($*Y,$*X,-$*(Y*K+X*H)+K+J,-Z*X,Z*Y,-Z*(-X*K+Y*H)+H+Q,0,0,1),this}scale(J,Q){return l9("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(B6.makeScale(J,Q)),this}rotate(J){return l9("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(B6.makeRotation(-J)),this}translate(J,Q){return l9("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(B6.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var B6=new S0,g$=new S0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),p$=new S0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function CK(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,K,H){if(this.enabled===!1||K===H||!K||!H)return W;if(this.spaces[K].transfer==="srgb")W.r=q9(W.r),W.g=q9(W.g),W.b=q9(W.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)W.applyMatrix3(this.spaces[K].toXYZ),W.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")W.r=R8(W.r),W.g=R8(W.g),W.b=R8(W.b);return W},workingToColorSpace:function(W,K){return this.convert(W,this.workingColorSpace,K)},colorSpaceToWorking:function(W,K){return this.convert(W,K,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getToneMappingMode:function(W){return this.spaces[W].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(W,K=this.workingColorSpace){return W.fromArray(this.spaces[K].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,K,H){return W.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(W,K){return l9("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(W,K)},toWorkingColorSpace:function(W,K){return l9("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(W,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:g$,fromXYZ:p$,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:g$,fromXYZ:p$,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var g0=CK();function q9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function R8(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var Z8;class dQ{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(Z8===void 0)Z8=c8("canvas");Z8.width=J.width,Z8.height=J.height;let Z=Z8.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=Z8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=c8("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),W=Z.data;for(let K=0;K<W.length;K++)W[K]=q9(W[K]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(q9(Q[$]/255)*255);else Q[$]=q9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return C0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var wK=0;class e8{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wK++}),this.uuid=_8(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let W;if(Array.isArray(Z)){W=[];for(let K=0,H=Z.length;K<H;K++)if(Z[K].isDataTexture)W.push(z6(Z[K].image));else W.push(z6(Z[K]))}else W=z6(Z);$.url=W}if(!Q)J.images[this.uuid]=$;return $}}function z6(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return dQ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return C0("Texture: Unable to serialize Texture."),{}}var PK=0,I6=new v;class AJ extends O9{constructor(J=AJ.DEFAULT_IMAGE,Q=AJ.DEFAULT_MAPPING,$=1001,Z=1001,W=1006,K=1008,H=1023,Y=1009,X=AJ.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:PK++}),this.uuid=_8(),this.name="",this.source=new e8(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=W,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new d0(0,0),this.repeat=new d0(1,1),this.center=new d0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new S0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(I6).x}get height(){return this.source.getSize(I6).y}get depth(){return this.source.getSize(I6).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){C0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){C0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}AJ.DEFAULT_IMAGE=null;AJ.DEFAULT_MAPPING=300;AJ.DEFAULT_ANISOTROPY=1;class KJ{static{KJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z+K[12]*W,this.y=K[1]*Q+K[5]*$+K[9]*Z+K[13]*W,this.z=K[2]*Q+K[6]*$+K[10]*Z+K[14]*W,this.w=K[3]*Q+K[7]*$+K[11]*Z+K[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,W,K=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],N=Y[8],E=Y[1],G=Y[5],D=Y[9],k=Y[2],z=Y[6],q=Y[10];if(Math.abs(U-E)<0.01&&Math.abs(N-k)<0.01&&Math.abs(D-z)<0.01){if(Math.abs(U+E)<0.1&&Math.abs(N+k)<0.1&&Math.abs(D+z)<0.1&&Math.abs(X+G+q-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let P=(X+1)/2,C=(G+1)/2,V=(q+1)/2,A=(U+E)/4,I=(N+k)/4,w=(D+z)/4;if(P>C&&P>V)if(P<0.01)$=0,Z=0.707106781,W=0.707106781;else $=Math.sqrt(P),Z=A/$,W=I/$;else if(C>V)if(C<0.01)$=0.707106781,Z=0,W=0.707106781;else Z=Math.sqrt(C),$=A/Z,W=w/Z;else if(V<0.01)$=0.707106781,Z=0.707106781,W=0;else W=Math.sqrt(V),$=I/W,Z=w/W;return this.set($,Z,W,Q),this}let F=Math.sqrt((z-D)*(z-D)+(N-k)*(N-k)+(E-U)*(E-U));if(Math.abs(F)<0.001)F=1;return this.x=(z-D)/F,this.y=(N-k)/F,this.z=(E-U)/F,this.w=Math.acos((X+G+q-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=p0(this.x,J.x,Q.x),this.y=p0(this.y,J.y,Q.y),this.z=p0(this.z,J.z,Q.z),this.w=p0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=p0(this.x,J,Q),this.y=p0(this.y,J,Q),this.z=p0(this.z,J,Q),this.w=p0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(p0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class uQ extends O9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new KJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new KJ(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},W=new AJ(Z),K=$.count;for(let H=0;H<K;H++)this.textures[H]=W.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,W=this.textures.length;Z<W;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new e8(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mJ extends uQ{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class e7 extends AJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class cQ extends AJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $J{static{$J.prototype.isMatrix4=!0}constructor(J,Q,$,Z,W,K,H,Y,X,U,N,E,G,D,k,z){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,H,Y,X,U,N,E,G,D,k,z)}set(J,Q,$,Z,W,K,H,Y,X,U,N,E,G,D,k,z){let q=this.elements;return q[0]=J,q[4]=Q,q[8]=$,q[12]=Z,q[1]=W,q[5]=K,q[9]=H,q[13]=Y,q[2]=X,q[6]=U,q[10]=N,q[14]=E,q[3]=G,q[7]=D,q[11]=k,q[15]=z,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $J().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/W8.setFromMatrixColumn(J,0).length(),W=1/W8.setFromMatrixColumn(J,1).length(),K=1/W8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*W,Q[5]=$[5]*W,Q[6]=$[6]*W,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z,K=Math.cos($),H=Math.sin($),Y=Math.cos(Z),X=Math.sin(Z),U=Math.cos(W),N=Math.sin(W);if(J.order==="XYZ"){let E=K*U,G=K*N,D=H*U,k=H*N;Q[0]=Y*U,Q[4]=-Y*N,Q[8]=X,Q[1]=G+D*X,Q[5]=E-k*X,Q[9]=-H*Y,Q[2]=k-E*X,Q[6]=D+G*X,Q[10]=K*Y}else if(J.order==="YXZ"){let E=Y*U,G=Y*N,D=X*U,k=X*N;Q[0]=E+k*H,Q[4]=D*H-G,Q[8]=K*X,Q[1]=K*N,Q[5]=K*U,Q[9]=-H,Q[2]=G*H-D,Q[6]=k+E*H,Q[10]=K*Y}else if(J.order==="ZXY"){let E=Y*U,G=Y*N,D=X*U,k=X*N;Q[0]=E-k*H,Q[4]=-K*N,Q[8]=D+G*H,Q[1]=G+D*H,Q[5]=K*U,Q[9]=k-E*H,Q[2]=-K*X,Q[6]=H,Q[10]=K*Y}else if(J.order==="ZYX"){let E=K*U,G=K*N,D=H*U,k=H*N;Q[0]=Y*U,Q[4]=D*X-G,Q[8]=E*X+k,Q[1]=Y*N,Q[5]=k*X+E,Q[9]=G*X-D,Q[2]=-X,Q[6]=H*Y,Q[10]=K*Y}else if(J.order==="YZX"){let E=K*Y,G=K*X,D=H*Y,k=H*X;Q[0]=Y*U,Q[4]=k-E*N,Q[8]=D*N+G,Q[1]=N,Q[5]=K*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=G*N+D,Q[10]=E-k*N}else if(J.order==="XZY"){let E=K*Y,G=K*X,D=H*Y,k=H*X;Q[0]=Y*U,Q[4]=-N,Q[8]=X*U,Q[1]=E*N+k,Q[5]=K*U,Q[9]=G*N-D,Q[2]=D*N-G,Q[6]=H*U,Q[10]=k*N+E}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(TK,J,SK)}lookAt(J,Q,$){let Z=this.elements;if(vJ.subVectors(J,Q),vJ.lengthSq()===0)vJ.z=1;if(vJ.normalize(),B9.crossVectors($,vJ),B9.lengthSq()===0){if(Math.abs($.z)===1)vJ.x+=0.0001;else vJ.z+=0.0001;vJ.normalize(),B9.crossVectors($,vJ)}return B9.normalize(),D7.crossVectors(vJ,B9),Z[0]=B9.x,Z[4]=D7.x,Z[8]=vJ.x,Z[1]=B9.y,Z[5]=D7.y,Z[9]=vJ.y,Z[2]=B9.z,Z[6]=D7.z,Z[10]=vJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],N=$[5],E=$[9],G=$[13],D=$[2],k=$[6],z=$[10],q=$[14],F=$[3],P=$[7],C=$[11],V=$[15],A=Z[0],I=Z[4],w=Z[8],R=Z[12],B=Z[1],p=Z[5],_=Z[9],g=Z[13],i=Z[2],x=Z[6],u=Z[10],n=Z[14],f=Z[3],a=Z[7],e=Z[11],Z0=Z[15];return W[0]=K*A+H*B+Y*i+X*f,W[4]=K*I+H*p+Y*x+X*a,W[8]=K*w+H*_+Y*u+X*e,W[12]=K*R+H*g+Y*n+X*Z0,W[1]=U*A+N*B+E*i+G*f,W[5]=U*I+N*p+E*x+G*a,W[9]=U*w+N*_+E*u+G*e,W[13]=U*R+N*g+E*n+G*Z0,W[2]=D*A+k*B+z*i+q*f,W[6]=D*I+k*p+z*x+q*a,W[10]=D*w+k*_+z*u+q*e,W[14]=D*R+k*g+z*n+q*Z0,W[3]=F*A+P*B+C*i+V*f,W[7]=F*I+P*p+C*x+V*a,W[11]=F*w+P*_+C*u+V*e,W[15]=F*R+P*g+C*n+V*Z0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[12],K=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],N=J[6],E=J[10],G=J[14],D=J[3],k=J[7],z=J[11],q=J[15],F=Y*G-X*E,P=H*G-X*N,C=H*E-Y*N,V=K*G-X*U,A=K*E-Y*U,I=K*N-H*U;return Q*(k*F-z*P+q*C)-$*(D*F-z*V+q*A)+Z*(D*P-k*V+q*I)-W*(D*C-k*A+z*I)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[1],K=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(K*U-H*X)-$*(W*U-H*Y)+Z*(W*X-K*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=J[9],E=J[10],G=J[11],D=J[12],k=J[13],z=J[14],q=J[15],F=Q*H-$*K,P=Q*Y-Z*K,C=Q*X-W*K,V=$*Y-Z*H,A=$*X-W*H,I=Z*X-W*Y,w=U*k-N*D,R=U*z-E*D,B=U*q-G*D,p=N*z-E*k,_=N*q-G*k,g=E*q-G*z,i=F*g-P*_+C*p+V*B-A*R+I*w;if(i===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let x=1/i;return J[0]=(H*g-Y*_+X*p)*x,J[1]=(Z*_-$*g-W*p)*x,J[2]=(k*I-z*A+q*V)*x,J[3]=(E*A-N*I-G*V)*x,J[4]=(Y*B-K*g-X*R)*x,J[5]=(Q*g-Z*B+W*R)*x,J[6]=(z*C-D*I-q*P)*x,J[7]=(U*I-E*C+G*P)*x,J[8]=(K*_-H*B+X*w)*x,J[9]=($*B-Q*_-W*w)*x,J[10]=(D*A-k*C+q*F)*x,J[11]=(N*C-U*A-G*F)*x,J[12]=(H*R-K*p-Y*w)*x,J[13]=(Q*p-$*R+Z*w)*x,J[14]=(k*P-D*V-z*F)*x,J[15]=(U*V-N*P+E*F)*x,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=W,Q[1]*=$,Q[5]*=Z,Q[9]*=W,Q[2]*=$,Q[6]*=Z,Q[10]*=W,Q[3]*=$,Q[7]*=Z,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=1-$,K=J.x,H=J.y,Y=J.z,X=W*K,U=W*H;return this.set(X*K+$,X*H-Z*Y,X*Y+Z*H,0,X*H+Z*Y,U*H+$,U*Y-Z*K,0,X*Y-Z*H,U*Y+Z*K,W*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,W,K){return this.set(1,$,W,0,J,1,K,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,W=Q._x,K=Q._y,H=Q._z,Y=Q._w,X=W+W,U=K+K,N=H+H,E=W*X,G=W*U,D=W*N,k=K*U,z=K*N,q=H*N,F=Y*X,P=Y*U,C=Y*N,V=$.x,A=$.y,I=$.z;return Z[0]=(1-(k+q))*V,Z[1]=(G+C)*V,Z[2]=(D-P)*V,Z[3]=0,Z[4]=(G-C)*A,Z[5]=(1-(E+q))*A,Z[6]=(z+F)*A,Z[7]=0,Z[8]=(D+P)*I,Z[9]=(z-F)*I,Z[10]=(1-(E+k))*I,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let W=this.determinantAffine();if(W===0)return $.set(1,1,1),Q.identity(),this;let K=W8.set(Z[0],Z[1],Z[2]).length(),H=W8.set(Z[4],Z[5],Z[6]).length(),Y=W8.set(Z[8],Z[9],Z[10]).length();if(W<0)K=-K;uJ.copy(this);let X=1/K,U=1/H,N=1/Y;return uJ.elements[0]*=X,uJ.elements[1]*=X,uJ.elements[2]*=X,uJ.elements[4]*=U,uJ.elements[5]*=U,uJ.elements[6]*=U,uJ.elements[8]*=N,uJ.elements[9]*=N,uJ.elements[10]*=N,Q.setFromRotationMatrix(uJ),$.x=K,$.y=H,$.z=Y,this}makePerspective(J,Q,$,Z,W,K,H=2000,Y=!1){let X=this.elements,U=2*W/(Q-J),N=2*W/($-Z),E=(Q+J)/(Q-J),G=($+Z)/($-Z),D,k;if(Y)D=W/(K-W),k=K*W/(K-W);else if(H===2000)D=-(K+W)/(K-W),k=-2*K*W/(K-W);else if(H===2001)D=-K/(K-W),k=-K*W/(K-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=E,X[12]=0,X[1]=0,X[5]=N,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=D,X[14]=k,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,Z,W,K,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),N=2/($-Z),E=-(Q+J)/(Q-J),G=-($+Z)/($-Z),D,k;if(Y)D=1/(K-W),k=K/(K-W);else if(H===2000)D=-2/(K-W),k=-(K+W)/(K-W);else if(H===2001)D=-1/(K-W),k=-W/(K-W);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=E,X[1]=0,X[5]=N,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=D,X[14]=k,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var W8=new v,uJ=new $J,TK=new v(0,0,0),SK=new v(1,1,1),B9=new v,D7=new v,vJ=new v,m$=new $J,l$=new R9;class P9{constructor(J=0,Q=0,$=0,Z=P9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,W=Z[0],K=Z[4],H=Z[8],Y=Z[1],X=Z[5],U=Z[9],N=Z[2],E=Z[6],G=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(p0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-K,W);else this._x=Math.atan2(E,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-p0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-N,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(p0(E,-1,1)),Math.abs(E)<0.9999999)this._y=Math.atan2(-N,G),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,W);break;case"ZYX":if(this._y=Math.asin(-p0(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(E,G),this._z=Math.atan2(Y,W);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(p0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-N,W);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-p0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(E,X),this._y=Math.atan2(H,W);else this._x=Math.atan2(-U,G),this._y=0;break;default:C0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return m$.makeRotationFromQuaternion(J),this.setFromRotationMatrix(m$,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return l$.setFromEuler(this),this.setFromQuaternion(l$,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}P9.DEFAULT_ORDER="XYZ";class J6{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var jK=0,d$=new v,K8=new R9,Y9=new $J,O7=new v,b8=new v,yK=new v,vK=new R9,u$=new v(1,0,0),c$=new v(0,1,0),n$=new v(0,0,1),s$={type:"added"},fK={type:"removed"},H8={type:"childadded",child:null},A6={type:"childremoved",child:null};class LJ extends O9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:jK++}),this.uuid=_8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=LJ.DEFAULT_UP.clone();let J=new v,Q=new P9,$=new R9,Z=new v(1,1,1);function W(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(W),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new $J},normalMatrix:{value:new S0}}),this.matrix=new $J,this.matrixWorld=new $J,this.matrixAutoUpdate=LJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=LJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new J6,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return K8.setFromAxisAngle(J,Q),this.quaternion.multiply(K8),this}rotateOnWorldAxis(J,Q){return K8.setFromAxisAngle(J,Q),this.quaternion.premultiply(K8),this}rotateX(J){return this.rotateOnAxis(u$,J)}rotateY(J){return this.rotateOnAxis(c$,J)}rotateZ(J){return this.rotateOnAxis(n$,J)}translateOnAxis(J,Q){return d$.copy(J).applyQuaternion(this.quaternion),this.position.add(d$.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(u$,J)}translateY(J){return this.translateOnAxis(c$,J)}translateZ(J){return this.translateOnAxis(n$,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(Y9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)O7.copy(J);else O7.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),b8.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)Y9.lookAt(b8,O7,this.up);else Y9.lookAt(O7,b8,this.up);if(this.quaternion.setFromRotationMatrix(Y9),Z)Y9.extractRotation(Z.matrixWorld),K8.setFromRotationMatrix(Y9),this.quaternion.premultiply(K8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return P0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(s$),H8.child=J,this.dispatchEvent(H8),H8.child=null;else P0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(fK),A6.child=J,this.dispatchEvent(A6),A6.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),Y9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),Y9.multiply(J.parent.matrixWorld);return J.applyMatrix4(Y9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(s$),H8.child=J,this.dispatchEvent(H8),H8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(b8,J,yK),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(b8,vK,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,W=this.matrix.elements;W[12]+=Q-W[0]*Q-W[4]*$-W[8]*Z,W[13]+=$-W[1]*Q-W[5]*$-W[9]*Z,W[14]+=Z-W[2]*Q-W[6]*$-W[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let W=this.children;for(let K=0,H=W.length;K<H;K++)W[K].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(this.static!==!1)Z.static=this.static;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((H)=>({...H})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function W(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=W(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let N=Y[X];W(J.shapes,N)}else W(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(W(J.materials,this.material[Y]));Z.material=H}else Z.material=W(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let H=0;H<this.children.length;H++)Z.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];Z.animations.push(W(J.animations,Y))}}if(Q){let H=K(J.geometries),Y=K(J.materials),X=K(J.textures),U=K(J.images),N=K(J.shapes),E=K(J.skeletons),G=K(J.animations),D=K(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(N.length>0)$.shapes=N;if(E.length>0)$.skeletons=E;if(G.length>0)$.animations=G;if(D.length>0)$.nodes=D}return $.object=Z,$;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}}LJ.DEFAULT_UP=new v(0,1,0);LJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;LJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class w9 extends LJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var bK={type:"move"};class J7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new w9,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new w9,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new v,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new v;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new w9,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new v,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new v,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,W=null,K=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){K=!0;for(let k of J.hand.values()){let z=Q.getJointPose(k,$),q=this._getHandJoint(X,k);if(z!==null)q.matrix.fromArray(z.transform.matrix),q.matrix.decompose(q.position,q.rotation,q.scale),q.matrixWorldNeedsUpdate=!0,q.jointRadius=z.radius;q.visible=z!==null}let U=X.joints["index-finger-tip"],N=X.joints["thumb-tip"],E=U.position.distanceTo(N.position),G=0.02,D=0.005;if(X.inputState.pinching&&E>G+D)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&E<=G-D)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,$),W!==null){if(Y.matrix.fromArray(W.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,W.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(W.linearVelocity);else Y.hasLinearVelocity=!1;if(W.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(W.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&W!==null)Z=W;if(Z!==null){if(H.matrix.fromArray(Z.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Z.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Z.linearVelocity);else H.hasLinearVelocity=!1;if(Z.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Z.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(bK)}}}if(H!==null)H.visible=Z!==null;if(Y!==null)Y.visible=W!==null;if(X!==null)X.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new w9;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var XW={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},z9={h:0,s:0,l:0},R7={h:0,s:0,l:0};function _6(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class m0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,g0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=g0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,g0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=g0.workingColorSpace){if(J=lQ(J,1),Q=p0(Q,0,1),$=p0($,0,1),Q===0)this.r=this.g=this.b=$;else{let W=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-W;this.r=_6(K,W,J+0.3333333333333333),this.g=_6(K,W,J),this.b=_6(K,W,J-0.3333333333333333)}return g0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(W){if(W===void 0)return;if(parseFloat(W)<1)C0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,K=Z[1],H=Z[2];switch(K){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:C0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Z[1],K=W.length;if(K===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(W,16),Q);else C0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=XW[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else C0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=q9(J.r),this.g=q9(J.g),this.b=q9(J.b),this}copyLinearToSRGB(J){return this.r=R8(J.r),this.g=R8(J.g),this.b=R8(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return g0.workingToColorSpace(IJ.copy(this),J),Math.round(p0(IJ.r*255,0,255))*65536+Math.round(p0(IJ.g*255,0,255))*256+Math.round(p0(IJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=g0.workingColorSpace){g0.workingToColorSpace(IJ.copy(this),Q);let{r:$,g:Z,b:W}=IJ,K=Math.max($,Z,W),H=Math.min($,Z,W),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let N=K-H;switch(X=U<=0.5?N/(K+H):N/(2-K-H),K){case $:Y=(Z-W)/N+(Z<W?6:0);break;case Z:Y=(W-$)/N+2;break;case W:Y=($-Z)/N+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=g0.workingColorSpace){return g0.workingToColorSpace(IJ.copy(this),Q),J.r=IJ.r,J.g=IJ.g,J.b=IJ.b,J}getStyle(J="srgb"){g0.workingToColorSpace(IJ.copy(this),J);let{r:Q,g:$,b:Z}=IJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(z9),this.setHSL(z9.h+J,z9.s+Q,z9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(z9),J.getHSL(R7);let $=u8(z9.h,R7.h,Q),Z=u8(z9.s,R7.s,Q),W=u8(z9.l,R7.l,Q);return this.setHSL($,Z,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*$+W[6]*Z,this.g=W[1]*Q+W[4]*$+W[7]*Z,this.b=W[2]*Q+W[5]*$+W[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var IJ=new m0;m0.NAMES=XW;class Q6 extends LJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new P9,this.environmentIntensity=1,this.environmentRotation=new P9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var cJ=new v,X9=new v,C6=new v,U9=new v,Y8=new v,X8=new v,i$=new v,w6=new v,P6=new v,T6=new v,S6=new KJ,j6=new KJ,y6=new KJ;class pJ{constructor(J=new v,Q=new v,$=new v){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),cJ.subVectors(J,Q),Z.cross(cJ);let W=Z.lengthSq();if(W>0)return Z.multiplyScalar(1/Math.sqrt(W));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,W){cJ.subVectors(Z,Q),X9.subVectors($,Q),C6.subVectors(J,Q);let K=cJ.dot(cJ),H=cJ.dot(X9),Y=cJ.dot(C6),X=X9.dot(X9),U=X9.dot(C6),N=K*X-H*H;if(N===0)return W.set(0,0,0),null;let E=1/N,G=(X*Y-H*U)*E,D=(K*U-H*Y)*E;return W.set(1-G-D,D,G)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,U9)===null)return!1;return U9.x>=0&&U9.y>=0&&U9.x+U9.y<=1}static getInterpolation(J,Q,$,Z,W,K,H,Y){if(this.getBarycoord(J,Q,$,Z,U9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(W,U9.x),Y.addScaledVector(K,U9.y),Y.addScaledVector(H,U9.z),Y}static getInterpolatedAttribute(J,Q,$,Z,W,K){return S6.setScalar(0),j6.setScalar(0),y6.setScalar(0),S6.fromBufferAttribute(J,Q),j6.fromBufferAttribute(J,$),y6.fromBufferAttribute(J,Z),K.setScalar(0),K.addScaledVector(S6,W.x),K.addScaledVector(j6,W.y),K.addScaledVector(y6,W.z),K}static isFrontFacing(J,Q,$,Z){return cJ.subVectors($,Q),X9.subVectors(J,Q),cJ.cross(X9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return cJ.subVectors(this.c,this.b),X9.subVectors(this.a,this.b),cJ.cross(X9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return pJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return pJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,W){return pJ.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,W)}containsPoint(J){return pJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return pJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,W=this.c,K,H;Y8.subVectors(Z,$),X8.subVectors(W,$),w6.subVectors(J,$);let Y=Y8.dot(w6),X=X8.dot(w6);if(Y<=0&&X<=0)return Q.copy($);P6.subVectors(J,Z);let U=Y8.dot(P6),N=X8.dot(P6);if(U>=0&&N<=U)return Q.copy(Z);let E=Y*N-U*X;if(E<=0&&Y>=0&&U<=0)return K=Y/(Y-U),Q.copy($).addScaledVector(Y8,K);T6.subVectors(J,W);let G=Y8.dot(T6),D=X8.dot(T6);if(D>=0&&G<=D)return Q.copy(W);let k=G*X-Y*D;if(k<=0&&X>=0&&D<=0)return H=X/(X-D),Q.copy($).addScaledVector(X8,H);let z=U*D-G*N;if(z<=0&&N-U>=0&&G-D>=0)return i$.subVectors(W,Z),H=(N-U)/(N-U+(G-D)),Q.copy(Z).addScaledVector(i$,H);let q=1/(z+k+E);return K=k*q,H=E*q,Q.copy($).addScaledVector(Y8,K).addScaledVector(X8,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class k9{constructor(J=new v(1/0,1/0,1/0),Q=new v(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(nJ.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(nJ.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=nJ.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let W=$.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=W.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,nJ);else nJ.fromBufferAttribute(W,K);nJ.applyMatrix4(J.matrixWorld),this.expandByPoint(nJ)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();k7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();k7.copy($.boundingBox)}k7.applyMatrix4(J.matrixWorld),this.union(k7)}}let Z=J.children;for(let W=0,K=Z.length;W<K;W++)this.expandByObject(Z[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,nJ),nJ.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(h8),M7.subVectors(this.max,h8),U8.subVectors(J.a,h8),G8.subVectors(J.b,h8),N8.subVectors(J.c,h8),I9.subVectors(G8,U8),A9.subVectors(N8,G8),x9.subVectors(U8,N8);let Q=[0,-I9.z,I9.y,0,-A9.z,A9.y,0,-x9.z,x9.y,I9.z,0,-I9.x,A9.z,0,-A9.x,x9.z,0,-x9.x,-I9.y,I9.x,0,-A9.y,A9.x,0,-x9.y,x9.x,0];if(!v6(Q,U8,G8,N8,M7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!v6(Q,U8,G8,N8,M7))return!1;return L7.crossVectors(I9,A9),Q=[L7.x,L7.y,L7.z],v6(Q,U8,G8,N8,M7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,nJ).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(nJ).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return G9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),G9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),G9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),G9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),G9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),G9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),G9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),G9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(G9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var G9=[new v,new v,new v,new v,new v,new v,new v,new v],nJ=new v,k7=new k9,U8=new v,G8=new v,N8=new v,I9=new v,A9=new v,x9=new v,h8=new v,M7=new v,L7=new v,g9=new v;function v6(J,Q,$,Z,W){for(let K=0,H=J.length-3;K<=H;K+=3){g9.fromArray(J,K);let Y=W.x*Math.abs(g9.x)+W.y*Math.abs(g9.y)+W.z*Math.abs(g9.z),X=Q.dot(g9),U=$.dot(g9),N=Z.dot(g9);if(Math.max(-Math.max(X,U,N),Math.min(X,U,N))>Y)return!1}return!0}var EJ=new v,V7=new d0,hK=0;class _J extends O9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hK++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,W=this.itemSize;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)V7.fromBufferAttribute(this,Q),V7.applyMatrix3(J),this.setXY(Q,V7.x,V7.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)EJ.fromBufferAttribute(this,Q),EJ.applyMatrix3(J),this.setXYZ(Q,EJ.x,EJ.y,EJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)EJ.fromBufferAttribute(this,Q),EJ.applyMatrix4(J),this.setXYZ(Q,EJ.x,EJ.y,EJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)EJ.fromBufferAttribute(this,Q),EJ.applyNormalMatrix(J),this.setXYZ(Q,EJ.x,EJ.y,EJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)EJ.fromBufferAttribute(this,Q),EJ.transformDirection(J),this.setXYZ(Q,EJ.x,EJ.y,EJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=O8($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=PJ($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=O8(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=PJ(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=O8(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=PJ(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=O8(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=PJ(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=O8(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=PJ(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=PJ(Q,this.array),$=PJ($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=PJ(Q,this.array),$=PJ($,this.array),Z=PJ(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J*=this.itemSize,this.normalized)Q=PJ(Q,this.array),$=PJ($,this.array),Z=PJ(Z,this.array),W=PJ(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class $6 extends _J{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class Z6 extends _J{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class FJ extends _J{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var xK=new k9,x8=new v,f6=new v;class j9{constructor(J=new v,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else xK.setFromPoints(J).getCenter($);let Z=0;for(let W=0,K=J.length;W<K;W++)Z=Math.max(Z,$.distanceToSquared(J[W]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;x8.subVectors(J,this.center);let Q=x8.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(x8,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else f6.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(x8.copy(J.center).add(f6)),this.expandByPoint(x8.copy(J.center).sub(f6));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var gK=0,gJ=new $J,b6=new LJ,E8=new v,fJ=new k9,g8=new k9,kJ=new v;class CJ extends O9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gK++}),this.uuid=_8(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((UK(J))?Z6:$6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let W=new S0().getNormalMatrix(J);$.applyNormalMatrix(W),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return gJ.makeRotationFromQuaternion(J),this.applyMatrix4(gJ),this}rotateX(J){return gJ.makeRotationX(J),this.applyMatrix4(gJ),this}rotateY(J){return gJ.makeRotationY(J),this.applyMatrix4(gJ),this}rotateZ(J){return gJ.makeRotationZ(J),this.applyMatrix4(gJ),this}translate(J,Q,$){return gJ.makeTranslation(J,Q,$),this.applyMatrix4(gJ),this}scale(J,Q,$){return gJ.makeScale(J,Q,$),this.applyMatrix4(gJ),this}lookAt(J){return b6.lookAt(J),b6.updateMatrix(),this.applyMatrix4(b6.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(E8).negate(),this.translate(E8.x,E8.y,E8.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,W=J.length;Z<W;Z++){let K=J[Z];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new FJ($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let W=J[Z];Q.setXYZ(Z,W.x,W.y,W.z||0)}if(J.length>Q.count)C0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new k9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new v(-1/0,-1/0,-1/0),new v(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(fJ.setFromBufferAttribute(W),this.morphTargetsRelative)kJ.addVectors(this.boundingBox.min,fJ.min),this.boundingBox.expandByPoint(kJ),kJ.addVectors(this.boundingBox.max,fJ.max),this.boundingBox.expandByPoint(kJ);else this.boundingBox.expandByPoint(fJ.min),this.boundingBox.expandByPoint(fJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))P0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new j9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new v,1/0);return}if(J){let $=this.boundingSphere.center;if(fJ.setFromBufferAttribute(J),Q)for(let W=0,K=Q.length;W<K;W++){let H=Q[W];if(g8.setFromBufferAttribute(H),this.morphTargetsRelative)kJ.addVectors(fJ.min,g8.min),fJ.expandByPoint(kJ),kJ.addVectors(fJ.max,g8.max),fJ.expandByPoint(kJ);else fJ.expandByPoint(g8.min),fJ.expandByPoint(g8.max)}fJ.getCenter($);let Z=0;for(let W=0,K=J.count;W<K;W++)kJ.fromBufferAttribute(J,W),Z=Math.max(Z,$.distanceToSquared(kJ));if(Q)for(let W=0,K=Q.length;W<K;W++){let H=Q[W],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(kJ.fromBufferAttribute(H,X),Y)E8.fromBufferAttribute(J,X),kJ.add(E8);Z=Math.max(Z,$.distanceToSquared(kJ))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))P0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){P0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:W}=Q,K=this.getAttribute("tangent");if(K===void 0||K.count!==$.count)K=new _J(new Float32Array(4*$.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let w=0;w<$.count;w++)H[w]=new v,Y[w]=new v;let X=new v,U=new v,N=new v,E=new d0,G=new d0,D=new d0,k=new v,z=new v;function q(w,R,B){X.fromBufferAttribute($,w),U.fromBufferAttribute($,R),N.fromBufferAttribute($,B),E.fromBufferAttribute(W,w),G.fromBufferAttribute(W,R),D.fromBufferAttribute(W,B),U.sub(X),N.sub(X),G.sub(E),D.sub(E);let p=1/(G.x*D.y-D.x*G.y);if(!isFinite(p))return;k.copy(U).multiplyScalar(D.y).addScaledVector(N,-G.y).multiplyScalar(p),z.copy(N).multiplyScalar(G.x).addScaledVector(U,-D.x).multiplyScalar(p),H[w].add(k),H[R].add(k),H[B].add(k),Y[w].add(z),Y[R].add(z),Y[B].add(z)}let F=this.groups;if(F.length===0)F=[{start:0,count:J.count}];for(let w=0,R=F.length;w<R;++w){let B=F[w],p=B.start,_=B.count;for(let g=p,i=p+_;g<i;g+=3)q(J.getX(g+0),J.getX(g+1),J.getX(g+2))}let P=new v,C=new v,V=new v,A=new v;function I(w){V.fromBufferAttribute(Z,w),A.copy(V);let R=H[w];P.copy(R),P.sub(V.multiplyScalar(V.dot(R))).normalize(),C.crossVectors(A,R);let p=C.dot(Y[w])<0?-1:1;K.setXYZW(w,P.x,P.y,P.z,p)}for(let w=0,R=F.length;w<R;++w){let B=F[w],p=B.start,_=B.count;for(let g=p,i=p+_;g<i;g+=3)I(J.getX(g+0)),I(J.getX(g+1)),I(J.getX(g+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new _J(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let E=0,G=$.count;E<G;E++)$.setXYZ(E,0,0,0);let Z=new v,W=new v,K=new v,H=new v,Y=new v,X=new v,U=new v,N=new v;if(J)for(let E=0,G=J.count;E<G;E+=3){let D=J.getX(E+0),k=J.getX(E+1),z=J.getX(E+2);Z.fromBufferAttribute(Q,D),W.fromBufferAttribute(Q,k),K.fromBufferAttribute(Q,z),U.subVectors(K,W),N.subVectors(Z,W),U.cross(N),H.fromBufferAttribute($,D),Y.fromBufferAttribute($,k),X.fromBufferAttribute($,z),H.add(U),Y.add(U),X.add(U),$.setXYZ(D,H.x,H.y,H.z),$.setXYZ(k,Y.x,Y.y,Y.z),$.setXYZ(z,X.x,X.y,X.z)}else for(let E=0,G=Q.count;E<G;E+=3)Z.fromBufferAttribute(Q,E+0),W.fromBufferAttribute(Q,E+1),K.fromBufferAttribute(Q,E+2),U.subVectors(K,W),N.subVectors(Z,W),U.cross(N),$.setXYZ(E+0,U.x,U.y,U.z),$.setXYZ(E+1,U.x,U.y,U.z),$.setXYZ(E+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)kJ.fromBufferAttribute(J,Q),kJ.normalize(),J.setXYZ(Q,kJ.x,kJ.y,kJ.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:N}=H,E=new X.constructor(Y.length*U),G=0,D=0;for(let k=0,z=Y.length;k<z;k++){if(H.isInterleavedBufferAttribute)G=Y[k]*H.data.stride+H.offset;else G=Y[k]*U;for(let q=0;q<U;q++)E[D++]=X[G++]}return new _J(E,U,N)}if(this.index===null)return C0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new CJ,$=this.index.array,Z=this.attributes;for(let H in Z){let Y=Z[H],X=J(Y,$);Q.setAttribute(H,X)}let W=this.morphAttributes;for(let H in W){let Y=[],X=W[H];for(let U=0,N=X.length;U<N;U++){let E=X[U],G=J(E,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let Z={},W=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let N=0,E=X.length;N<E;N++){let G=X[N];U.push(G.toJSON(J.data))}if(U.length>0)Z[Y]=U,W=!0}if(W)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let X in Z){let U=Z[X];this.setAttribute(X,U.clone(Q))}let W=J.morphAttributes;for(let X in W){let U=[],N=W[X];for(let E=0,G=N.length;E<G;E++)U.push(N[E].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let X=0,U=K.length;X<U;X++){let N=K[X];this.addGroup(N.start,N.count,N.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var pK=0;class y9 extends O9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:pK++}),this.uuid=_8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new m0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){C0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){C0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(W){let K=[];for(let H in W){let Y=W[H];delete Y.metadata,K.push(Y)}return K}if(Q){let W=Z(J.textures),K=Z(J.images);if(W.length>0)$.textures=W;if(K.length>0)$.images=K}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new m0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new d0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new d0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let W=0;W!==Z;++W)$[W]=Q[W].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var N9=new v,h6=new v,B7=new v,_9=new v,x6=new v,z7=new v,g6=new v;class W6{constructor(J=new v,Q=new v(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,N9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=N9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return N9.copy(this.origin).addScaledVector(this.direction,Q),N9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){h6.copy(J).add(Q).multiplyScalar(0.5),B7.copy(Q).sub(J).normalize(),_9.copy(this.origin).sub(h6);let W=J.distanceTo(Q)*0.5,K=-this.direction.dot(B7),H=_9.dot(this.direction),Y=-_9.dot(B7),X=_9.lengthSq(),U=Math.abs(1-K*K),N,E,G,D;if(U>0)if(N=K*Y-H,E=K*H-Y,D=W*U,N>=0)if(E>=-D)if(E<=D){let k=1/U;N*=k,E*=k,G=N*(N+K*E+2*H)+E*(K*N+E+2*Y)+X}else E=W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;else E=-W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;else if(E<=-D)N=Math.max(0,-(-K*W+H)),E=N>0?-W:Math.min(Math.max(-W,-Y),W),G=-N*N+E*(E+2*Y)+X;else if(E<=D)N=0,E=Math.min(Math.max(-W,-Y),W),G=E*(E+2*Y)+X;else N=Math.max(0,-(K*W+H)),E=N>0?W:Math.min(Math.max(-W,-Y),W),G=-N*N+E*(E+2*Y)+X;else E=K>0?-W:W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,N);if(Z)Z.copy(h6).addScaledVector(B7,E);return G}intersectSphere(J,Q){N9.subVectors(J.center,this.origin);let $=N9.dot(this.direction),Z=N9.dot(N9)-$*$,W=J.radius*J.radius;if(Z>W)return null;let K=Math.sqrt(W-Z),H=$-K,Y=$+K;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,W,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,N=1/this.direction.z,E=this.origin;if(X>=0)$=(J.min.x-E.x)*X,Z=(J.max.x-E.x)*X;else $=(J.max.x-E.x)*X,Z=(J.min.x-E.x)*X;if(U>=0)W=(J.min.y-E.y)*U,K=(J.max.y-E.y)*U;else W=(J.max.y-E.y)*U,K=(J.min.y-E.y)*U;if($>K||W>Z)return null;if(W>$||isNaN($))$=W;if(K<Z||isNaN(Z))Z=K;if(N>=0)H=(J.min.z-E.z)*N,Y=(J.max.z-E.z)*N;else H=(J.max.z-E.z)*N,Y=(J.min.z-E.z)*N;if($>Y||H>Z)return null;if(H>$||$!==$)$=H;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,N9)!==null}intersectTriangle(J,Q,$,Z,W){x6.subVectors(Q,J),z7.subVectors($,J),g6.crossVectors(x6,z7);let K=this.direction.dot(g6),H;if(K>0){if(Z)return null;H=1}else if(K<0)H=-1,K=-K;else return null;_9.subVectors(this.origin,J);let Y=H*this.direction.dot(z7.crossVectors(_9,z7));if(Y<0)return null;let X=H*this.direction.dot(x6.cross(_9));if(X<0)return null;if(Y+X>K)return null;let U=-H*_9.dot(g6);if(U<0)return null;return this.at(U/K,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class K6 extends y9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new m0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new P9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var o$=new $J,p9=new W6,I7=new j9,a$=new v,A7=new v,_7=new v,C7=new v,p6=new v,w7=new v,r$=new v,P7=new v;class bJ extends LJ{constructor(J=new CJ,Q=new K6){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,W=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let H=this.morphTargetInfluences;if(W&&H){w7.set(0,0,0);for(let Y=0,X=W.length;Y<X;Y++){let U=H[Y],N=W[Y];if(U===0)continue;if(p6.fromBufferAttribute(N,J),K)w7.addScaledVector(p6,U);else w7.addScaledVector(p6.sub(Q),U)}Q.add(w7)}return Q}raycast(J,Q){let $=this.geometry,Z=this.material,W=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(I7.copy($.boundingSphere),I7.applyMatrix4(W),p9.copy(J.ray).recast(J.near),I7.containsPoint(p9.origin)===!1){if(p9.intersectSphere(I7,a$)===null)return;if(p9.origin.distanceToSquared(a$)>(J.far-J.near)**2)return}if(o$.copy(W).invert(),p9.copy(J.ray).applyMatrix4(o$),$.boundingBox!==null){if(p9.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,p9)}_computeIntersections(J,Q,$){let Z,W=this.geometry,K=this.material,H=W.index,Y=W.attributes.position,X=W.attributes.uv,U=W.attributes.uv1,N=W.attributes.normal,E=W.groups,G=W.drawRange;if(H!==null)if(Array.isArray(K))for(let D=0,k=E.length;D<k;D++){let z=E[D],q=K[z.materialIndex],F=Math.max(z.start,G.start),P=Math.min(H.count,Math.min(z.start+z.count,G.start+G.count));for(let C=F,V=P;C<V;C+=3){let A=H.getX(C),I=H.getX(C+1),w=H.getX(C+2);if(Z=T7(this,q,J,$,X,U,N,A,I,w),Z)Z.faceIndex=Math.floor(C/3),Z.face.materialIndex=z.materialIndex,Q.push(Z)}}else{let D=Math.max(0,G.start),k=Math.min(H.count,G.start+G.count);for(let z=D,q=k;z<q;z+=3){let F=H.getX(z),P=H.getX(z+1),C=H.getX(z+2);if(Z=T7(this,K,J,$,X,U,N,F,P,C),Z)Z.faceIndex=Math.floor(z/3),Q.push(Z)}}else if(Y!==void 0)if(Array.isArray(K))for(let D=0,k=E.length;D<k;D++){let z=E[D],q=K[z.materialIndex],F=Math.max(z.start,G.start),P=Math.min(Y.count,Math.min(z.start+z.count,G.start+G.count));for(let C=F,V=P;C<V;C+=3){let A=C,I=C+1,w=C+2;if(Z=T7(this,q,J,$,X,U,N,A,I,w),Z)Z.faceIndex=Math.floor(C/3),Z.face.materialIndex=z.materialIndex,Q.push(Z)}}else{let D=Math.max(0,G.start),k=Math.min(Y.count,G.start+G.count);for(let z=D,q=k;z<q;z+=3){let F=z,P=z+1,C=z+2;if(Z=T7(this,K,J,$,X,U,N,F,P,C),Z)Z.faceIndex=Math.floor(z/3),Q.push(Z)}}}}function mK(J,Q,$,Z,W,K,H,Y){let X;if(Q.side===1)X=Z.intersectTriangle(H,K,W,!0,Y);else X=Z.intersectTriangle(W,K,H,Q.side===0,Y);if(X===null)return null;P7.copy(Y),P7.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(P7);if(U<$.near||U>$.far)return null;return{distance:U,point:P7.clone(),object:J}}function T7(J,Q,$,Z,W,K,H,Y,X,U){J.getVertexPosition(Y,A7),J.getVertexPosition(X,_7),J.getVertexPosition(U,C7);let N=mK(J,Q,$,Z,A7,_7,C7,r$);if(N){let E=new v;if(pJ.getBarycoord(r$,A7,_7,C7,E),W)N.uv=pJ.getInterpolatedAttribute(W,Y,X,U,E,new d0);if(K)N.uv1=pJ.getInterpolatedAttribute(K,Y,X,U,E,new d0);if(H){if(N.normal=pJ.getInterpolatedAttribute(H,Y,X,U,E,new v),N.normal.dot(Z.direction)>0)N.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new v,materialIndex:0};pJ.getNormal(A7,_7,C7,G.normal),N.face=G,N.barycoord=E}return N}class C8 extends AJ{constructor(J=null,Q=1,$=1,Z,W,K,H,Y,X=1003,U=1003,N,E){super(null,K,H,Y,X,U,Z,W,N,E);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class x7 extends _J{constructor(J,Q,$,Z=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var q8=new $J,t$=new $J,S7=[],e$=new k9,lK=new $J,p8=new bJ,m8=new j9;class Q7 extends bJ{constructor(J,Q,$){super(J,Q);this.isInstancedMesh=!0,this.instanceMatrix=new x7(new Float32Array($*16),16),this.instanceColor=null,this.morphTexture=null,this.count=$,this.boundingBox=null,this.boundingSphere=null;for(let Z=0;Z<$;Z++)this.setMatrixAt(Z,lK)}computeBoundingBox(){let J=this.geometry,Q=this.count;if(this.boundingBox===null)this.boundingBox=new k9;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,q8),e$.copy(J.boundingBox).applyMatrix4(q8),this.boundingBox.union(e$)}computeBoundingSphere(){let J=this.geometry,Q=this.count;if(this.boundingSphere===null)this.boundingSphere=new j9;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,q8),m8.copy(J.boundingSphere).applyMatrix4(q8),this.boundingSphere.union(m8)}copy(J,Q){if(super.copy(J,Q),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,Q){if(this.instanceColor===null)return Q.setRGB(1,1,1);else return Q.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,Q){return Q.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=this.morphTexture.source.data.data,W=$.length+1,K=J*W+1;for(let H=0;H<$.length;H++)$[H]=Z[K+H]}raycast(J,Q){let $=this.matrixWorld,Z=this.count;if(p8.geometry=this.geometry,p8.material=this.material,p8.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(m8.copy(this.boundingSphere),m8.applyMatrix4($),J.ray.intersectsSphere(m8)===!1)return;for(let W=0;W<Z;W++){this.getMatrixAt(W,q8),t$.multiplyMatrices($,q8),p8.matrixWorld=t$,p8.raycast(J,S7);for(let K=0,H=S7.length;K<H;K++){let Y=S7[K];Y.instanceId=W,Y.object=this,Q.push(Y)}S7.length=0}}setColorAt(J,Q){if(this.instanceColor===null)this.instanceColor=new x7(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return Q.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,Q){return Q.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=$.length+1;if(this.morphTexture===null)this.morphTexture=new C8(new Float32Array(Z*this.count),Z,this.count,1028,1015);let W=this.morphTexture.source.data.data,K=0;for(let X=0;X<$.length;X++)K+=$[X];let H=this.geometry.morphTargetsRelative?1:1-K,Y=Z*J;return W[Y]=H,W.set($,Y+1),this}updateMorphTargets(){}dispose(){if(this.dispatchEvent({type:"dispose"}),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var m6=new v,dK=new v,uK=new S0;class E9{constructor(J=new v(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=m6.subVectors($,Q).cross(dK.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(m6),W=this.normal.dot(Z);if(W===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/W;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(Z,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||uK.getNormalMatrix(J),Z=this.coplanarPoint(m6).applyMatrix4(J),W=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var m9=new j9,cK=new d0(0.5,0.5),j7=new v;class H6{constructor(J=new E9,Q=new E9,$=new E9,Z=new E9,W=new E9,K=new E9){this.planes=[J,Q,$,Z,W,K]}set(J,Q,$,Z,W,K){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(Z),H[4].copy(W),H[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,W=J.elements,K=W[0],H=W[1],Y=W[2],X=W[3],U=W[4],N=W[5],E=W[6],G=W[7],D=W[8],k=W[9],z=W[10],q=W[11],F=W[12],P=W[13],C=W[14],V=W[15];if(Z[0].setComponents(X-K,G-U,q-D,V-F).normalize(),Z[1].setComponents(X+K,G+U,q+D,V+F).normalize(),Z[2].setComponents(X+H,G+N,q+k,V+P).normalize(),Z[3].setComponents(X-H,G-N,q-k,V-P).normalize(),$)Z[4].setComponents(Y,E,z,C).normalize(),Z[5].setComponents(X-Y,G-E,q-z,V-C).normalize();else if(Z[4].setComponents(X-Y,G-E,q-z,V-C).normalize(),Q===2000)Z[5].setComponents(X+Y,G+E,q+z,V+C).normalize();else if(Q===2001)Z[5].setComponents(Y,E,z,C).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();m9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();m9.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(m9)}intersectsSprite(J){m9.center.set(0,0,0);let Q=cK.distanceTo(J.center);return m9.radius=0.7071067811865476+Q,m9.applyMatrix4(J.matrixWorld),this.intersectsSphere(m9)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(j7.x=Z.normal.x>0?J.max.x:J.min.x,j7.y=Z.normal.y>0?J.max.y:J.min.y,j7.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(j7)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class w8 extends y9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new m0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var g7=new v,p7=new v,JZ=new $J,l8=new W6,y7=new j9,l6=new v,QZ=new v;class nQ extends LJ{constructor(J=new CJ,Q=new w8){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,W=Q.count;Z<W;Z++)g7.fromBufferAttribute(Q,Z-1),p7.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=g7.distanceTo(p7);J.setAttribute("lineDistance",new FJ($,1))}else C0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Line.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(y7.copy($.boundingSphere),y7.applyMatrix4(Z),y7.radius+=W,J.ray.intersectsSphere(y7)===!1)return;JZ.copy(Z).invert(),l8.copy(J.ray).applyMatrix4(JZ);let H=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=$.index,E=$.attributes.position;if(U!==null){let G=Math.max(0,K.start),D=Math.min(U.count,K.start+K.count);for(let k=G,z=D-1;k<z;k+=X){let q=U.getX(k),F=U.getX(k+1),P=v7(this,J,l8,Y,q,F,k);if(P)Q.push(P)}if(this.isLineLoop){let k=U.getX(D-1),z=U.getX(G),q=v7(this,J,l8,Y,k,z,D-1);if(q)Q.push(q)}}else{let G=Math.max(0,K.start),D=Math.min(E.count,K.start+K.count);for(let k=G,z=D-1;k<z;k+=X){let q=v7(this,J,l8,Y,k,k+1,k);if(q)Q.push(q)}if(this.isLineLoop){let k=v7(this,J,l8,Y,D-1,G,D-1);if(k)Q.push(k)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}}function v7(J,Q,$,Z,W,K,H){let Y=J.geometry.attributes.position;if(g7.fromBufferAttribute(Y,W),p7.fromBufferAttribute(Y,K),$.distanceSqToSegment(g7,p7,l6,QZ)>Z)return;l6.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(l6);if(U<Q.near||U>Q.far)return;return{distance:U,point:QZ.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var $Z=new v,ZZ=new v;class $7 extends nQ{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,W=Q.count;Z<W;Z+=2)$Z.fromBufferAttribute(Q,Z),ZZ.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+$Z.distanceTo(ZZ);J.setAttribute("lineDistance",new FJ($,1))}else C0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Y6 extends AJ{constructor(J=[],Q=301,$,Z,W,K,H,Y,X,U){super(J,Q,$,Z,W,K,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class v9 extends AJ{constructor(J,Q,$=1014,Z,W,K,H=1003,Y=1003,X,U=1026,N=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let E={width:J,height:Q,depth:N};super(E,Z,W,K,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new e8(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class sQ extends v9{constructor(J,Q=1014,$=301,Z,W,K=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},N=[U,U,U,U,U,U];super(J,J,Q,$,Z,W,K,H,Y,X);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class X6 extends AJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class P8 extends CJ{constructor(J=1,Q=1,$=1,Z=1,W=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:W,depthSegments:K};let H=this;Z=Math.floor(Z),W=Math.floor(W),K=Math.floor(K);let Y=[],X=[],U=[],N=[],E=0,G=0;D("z","y","x",-1,-1,$,Q,J,K,W,0),D("z","y","x",1,-1,$,Q,-J,K,W,1),D("x","z","y",1,1,J,$,Q,Z,K,2),D("x","z","y",1,-1,J,$,-Q,Z,K,3),D("x","y","z",1,-1,J,Q,$,Z,W,4),D("x","y","z",-1,-1,J,Q,-$,Z,W,5),this.setIndex(Y),this.setAttribute("position",new FJ(X,3)),this.setAttribute("normal",new FJ(U,3)),this.setAttribute("uv",new FJ(N,2));function D(k,z,q,F,P,C,V,A,I,w,R){let B=C/I,p=V/w,_=C/2,g=V/2,i=A/2,x=I+1,u=w+1,n=0,f=0,a=new v;for(let e=0;e<u;e++){let Z0=e*p-g;for(let M0=0;M0<x;M0++){let k0=M0*B-_;a[k]=k0*F,a[z]=Z0*P,a[q]=i,X.push(a.x,a.y,a.z),a[k]=0,a[z]=0,a[q]=A>0?1:-1,U.push(a.x,a.y,a.z),N.push(M0/I),N.push(1-e/w),n+=1}}for(let e=0;e<w;e++)for(let Z0=0;Z0<I;Z0++){let M0=E+Z0+x*e,k0=E+Z0+x*(e+1),e0=E+(Z0+1)+x*(e+1),j0=E+(Z0+1)+x*e;Y.push(M0,k0,j0),Y.push(k0,e0,j0),f+=6}H.addGroup(G,f,R),G+=f,E+=n}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new P8(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class Z7 extends CJ{constructor(J=1,Q=1,$=1,Z=32,W=1,K=!1,H=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:W,openEnded:K,thetaStart:H,thetaLength:Y};let X=this;Z=Math.floor(Z),W=Math.floor(W);let U=[],N=[],E=[],G=[],D=0,k=[],z=$/2,q=0;if(F(),K===!1){if(J>0)P(!0);if(Q>0)P(!1)}this.setIndex(U),this.setAttribute("position",new FJ(N,3)),this.setAttribute("normal",new FJ(E,3)),this.setAttribute("uv",new FJ(G,2));function F(){let C=new v,V=new v,A=0,I=(Q-J)/$;for(let w=0;w<=W;w++){let R=[],B=w/W,p=B*(Q-J)+J;for(let _=0;_<=Z;_++){let g=_/Z,i=g*Y+H,x=Math.sin(i),u=Math.cos(i);V.x=p*x,V.y=-B*$+z,V.z=p*u,N.push(V.x,V.y,V.z),C.set(x,I,u).normalize(),E.push(C.x,C.y,C.z),G.push(g,1-B),R.push(D++)}k.push(R)}for(let w=0;w<Z;w++)for(let R=0;R<W;R++){let B=k[R][w],p=k[R+1][w],_=k[R+1][w+1],g=k[R][w+1];if(J>0||R!==0)U.push(B,p,g),A+=3;if(Q>0||R!==W-1)U.push(p,_,g),A+=3}X.addGroup(q,A,0),q+=A}function P(C){let V=D,A=new d0,I=new v,w=0,R=C===!0?J:Q,B=C===!0?1:-1;for(let _=1;_<=Z;_++)N.push(0,z*B,0),E.push(0,B,0),G.push(0.5,0.5),D++;let p=D;for(let _=0;_<=Z;_++){let i=_/Z*Y+H,x=Math.cos(i),u=Math.sin(i);I.x=R*u,I.y=z*B,I.z=R*x,N.push(I.x,I.y,I.z),E.push(0,B,0),A.x=x*0.5+0.5,A.y=u*0.5*B+0.5,G.push(A.x,A.y),D++}for(let _=0;_<Z;_++){let g=V+_,i=p+_;if(C===!0)U.push(i,i+1,g);else U.push(i+1,i,g);w+=3}X.addGroup(q,w,C===!0?1:2),q+=w}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new Z7(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class W7 extends CJ{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let W=J/2,K=Q/2,H=Math.floor($),Y=Math.floor(Z),X=H+1,U=Y+1,N=J/H,E=Q/Y,G=[],D=[],k=[],z=[];for(let q=0;q<U;q++){let F=q*E-K;for(let P=0;P<X;P++){let C=P*N-W;D.push(C,-F,0),k.push(0,0,1),z.push(P/H),z.push(1-q/Y)}}for(let q=0;q<Y;q++)for(let F=0;F<H;F++){let P=F+X*q,C=F+X*(q+1),V=F+1+X*(q+1),A=F+1+X*q;G.push(P,C,A),G.push(C,V,A)}this.setIndex(G),this.setAttribute("position",new FJ(D,3)),this.setAttribute("normal",new FJ(k,3)),this.setAttribute("uv",new FJ(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new W7(J.width,J.height,J.widthSegments,J.heightSegments)}}class K7 extends CJ{constructor(J=1,Q=32,$=16,Z=0,W=Math.PI*2,K=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:$,phiStart:Z,phiLength:W,thetaStart:K,thetaLength:H},Q=Math.max(3,Math.floor(Q)),$=Math.max(2,Math.floor($));let Y=Math.min(K+H,Math.PI),X=0,U=[],N=new v,E=new v,G=[],D=[],k=[],z=[];for(let q=0;q<=$;q++){let F=[],P=q/$,C=K+P*H,V=J*Math.cos(C),A=Math.sqrt(J*J-V*V),I=0;if(q===0&&K===0)I=0.5/Q;else if(q===$&&Y===Math.PI)I=-0.5/Q;for(let w=0;w<=Q;w++){let R=w/Q,B=Z+R*W;N.x=-A*Math.cos(B),N.y=V,N.z=A*Math.sin(B),D.push(N.x,N.y,N.z),E.copy(N).normalize(),k.push(E.x,E.y,E.z),z.push(R+I,1-P),F.push(X++)}U.push(F)}for(let q=0;q<$;q++)for(let F=0;F<Q;F++){let P=U[q][F+1],C=U[q][F],V=U[q+1][F],A=U[q+1][F+1];if(q!==0||K>0)G.push(P,C,A);if(q!==$-1||Y<Math.PI)G.push(C,V,A)}this.setIndex(G),this.setAttribute("position",new FJ(D,3)),this.setAttribute("normal",new FJ(k,3)),this.setAttribute("uv",new FJ(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new K7(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}function a9(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let W=J[$][Z];if(WZ(W))if(W.isRenderTargetTexture)C0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=W.clone();else if(Array.isArray(W))if(WZ(W[0])){let K=[];for(let H=0,Y=W.length;H<Y;H++)K[H]=W[H].clone();Q[$][Z]=K}else Q[$][Z]=W.slice();else Q[$][Z]=W}}return Q}function wJ(J){let Q={};for(let $=0;$<J.length;$++){let Z=a9(J[$]);for(let W in Z)Q[W]=Z[W]}return Q}function WZ(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function nK(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function iQ(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return g0.workingColorSpace}var UW={clone:a9,merge:wJ},sK=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iK=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class lJ extends y9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sK,this.fragmentShader=iK,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=a9(J.uniforms),this.uniformsGroups=nK(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let K=this.uniforms[Z].value;if(K&&K.isTexture)Q.uniforms[Z]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[Z]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[Z]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[Z]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[Z]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[Z]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[Z]={type:"m4",value:K.toArray()};else Q.uniforms[Z]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new m0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new d0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new v().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new KJ().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new S0().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new $J().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class oQ extends lJ{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class aQ extends y9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class rQ extends y9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}class H7 extends y9{constructor(J){super();this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new m0(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new d0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={MATCAP:""},this.color.copy(J.color),this.matcap=J.matcap,this.map=J.map,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.flatShading=J.flatShading,this.fog=J.fog,this}}function f7(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class r9{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],W=Q[$-1];$:{J:{let K;Q:{Z:if(!(J<Z)){for(let H=$+2;;){if(Z===void 0){if(J<W)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(W=Z,Z=Q[++$],J<Z)break J}K=Q.length;break Q}if(!(J>=W)){let H=Q[1];if(J<H)$=2,W=H;for(let Y=$-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(Z=W,W=Q[--$-1],J>=W)break J}K=$,$=0;break Q}break $}while($<K){let H=$+K>>>1;if(J<Q[H])K=H;else $=H+1}if(Z=Q[$],W=Q[$-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,W,Z)}return this.interpolate_($,W,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z;for(let K=0;K!==Z;++K)Q[K]=$[W+K];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class tQ extends r9{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,W=J-2,K=J+1,H=Z[W],Y=Z[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,H=2*Q-$;break;case 2402:W=Z.length-2,H=Q+Z[W]-Z[W+1];break;default:W=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*$-Q;break;case 2402:K=1,Y=$+Z[1]-Z[0];break;default:K=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=W*U,this._offsetNext=K*U}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,N=this._offsetNext,E=this._weightPrev,G=this._weightNext,D=($-Q)/(Z-Q),k=D*D,z=k*D,q=-E*z+2*E*k-E*D,F=(1+E)*z+(-1.5-2*E)*k+(-0.5+E)*D+1,P=(-1-G)*z+(1.5+G)*k+0.5*D,C=G*z-G*k;for(let V=0;V!==H;++V)W[V]=q*K[U+V]+F*K[X+V]+P*K[Y+V]+C*K[N+V];return W}}class eQ extends r9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(Z-Q),N=1-U;for(let E=0;E!==H;++E)W[E]=K[X+E]*N+K[Y+E]*U;return W}}class J$ extends r9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class Q$ extends r9{interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,N=this.outTangents;if(!U||!N){let D=($-Q)/(Z-Q),k=1-D;for(let z=0;z!==H;++z)W[z]=K[X+z]*k+K[Y+z]*D;return W}let E=H*2,G=J-1;for(let D=0;D!==H;++D){let k=K[X+D],z=K[Y+D],q=G*E+D*2,F=N[q],P=N[q+1],C=J*E+D*2,V=U[C],A=U[C+1],I=($-Q)/(Z-Q),w,R,B,p,_;for(let g=0;g<8;g++){w=I*I,R=w*I,B=1-I,p=B*B,_=p*B;let x=_*Q+3*p*I*F+3*B*w*V+R*Z-$;if(Math.abs(x)<0.0000000001)break;let u=3*p*(F-Q)+6*B*I*(V-F)+3*w*(Z-V);if(Math.abs(u)<0.0000000001)break;I=I-x/u,I=Math.max(0,Math.min(1,I))}W[D]=_*k+3*p*I*P+3*B*w*A+R*z}return W}}class dJ{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=f7(Q,this.TimeBufferType),this.values=f7($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:f7(J.times,Array),values:f7(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new J$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new eQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new tQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new Q$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return C0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,Z=$.length,W=0,K=Z-1;while(W!==Z&&$[W]<J)++W;while(K!==-1&&$[K]>Q)--K;if(++K,W!==0||K!==Z){if(W>=K)K=Math.max(K,1),W=K-1;let H=this.getValueSize();this.times=$.slice(W,K),this.values=this.values.slice(W*H,K*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)P0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,W=$.length;if(W===0)P0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==W;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){P0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){P0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(Z!==void 0){if(GK(Z))for(let H=0,Y=Z.length;H!==Y;++H){let X=Z[H];if(isNaN(X)){P0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,W=J.length-1,K=1;for(let H=1;H<W;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!Z){let N=H*$,E=N-$,G=N+$;for(let D=0;D!==$;++D){let k=Q[N+D];if(k!==Q[E+D]||k!==Q[G+D]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let N=H*$,E=K*$;for(let G=0;G!==$;++G)Q[E+G]=Q[N+G]}++K}}if(W>0){J[K]=J[W];for(let H=W*$,Y=K*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);return Z.createInterpolant=this.createInterpolant,Z}}dJ.prototype.ValueTypeName="";dJ.prototype.TimeBufferType=Float32Array;dJ.prototype.ValueBufferType=Float32Array;dJ.prototype.DefaultInterpolation=2301;class t9 extends dJ{constructor(J,Q,$){super(J,Q,$)}}t9.prototype.ValueTypeName="bool";t9.prototype.ValueBufferType=Array;t9.prototype.DefaultInterpolation=2300;t9.prototype.InterpolantFactoryMethodLinear=void 0;t9.prototype.InterpolantFactoryMethodSmooth=void 0;class $$ extends dJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}}$$.prototype.ValueTypeName="color";class Z$ extends dJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}}Z$.prototype.ValueTypeName="number";class W$ extends r9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=($-Q)/(Z-Q),X=J*H;for(let U=X+H;X!==U;X+=4)R9.slerpFlat(W,0,K,X-H,K,X,Y);return W}}class U6 extends dJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new W$(this.times,this.values,this.getValueSize(),J)}}U6.prototype.ValueTypeName="quaternion";U6.prototype.InterpolantFactoryMethodSmooth=void 0;class e9 extends dJ{constructor(J,Q,$){super(J,Q,$)}}e9.prototype.ValueTypeName="string";e9.prototype.ValueBufferType=Array;e9.prototype.DefaultInterpolation=2300;e9.prototype.InterpolantFactoryMethodLinear=void 0;e9.prototype.InterpolantFactoryMethodSmooth=void 0;class K$ extends dJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}}K$.prototype.ValueTypeName="vector";class H${constructor(J,Q,$){let Z=this,W=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,W===!1){if(Z.onStart!==void 0)Z.onStart(U,K,H)}W=!0},this.itemEnd=function(U){if(K++,Z.onProgress!==void 0)Z.onProgress(U,K,H);if(K===H){if(W=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(U){if(Z.onError!==void 0)Z.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,N){return X.push(U,N),this},this.removeHandler=function(U){let N=X.indexOf(U);if(N!==-1)X.splice(N,2);return this},this.getHandler=function(U){for(let N=0,E=X.length;N<E;N+=2){let G=X[N],D=X[N+1];if(G.global)G.lastIndex=0;if(G.test(U))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var GW=new H$;class Y${constructor(J){if(this.manager=J!==void 0?J:GW,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,W){$.load(J,Z,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}Y$.DEFAULT_MATERIAL_NAME="__DEFAULT";var b7=new v,h7=new R9,tJ=new v;class G6 extends LJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $J,this.projectionMatrix=new $J,this.projectionMatrixInverse=new $J,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(b7,h7,tJ),tJ.x===1&&tJ.y===1&&tJ.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(b7,h7,tJ.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(b7,h7,tJ),tJ.x===1&&tJ.y===1&&tJ.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(b7,h7,tJ.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var C9=new v,KZ=new d0,HZ=new d0;class TJ extends G6{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=M8*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(d8*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return M8*2*Math.atan(Math.tan(d8*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){C9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(C9.x,C9.y).multiplyScalar(-J/C9.z),C9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(C9.x,C9.y).multiplyScalar(-J/C9.z)}getViewSize(J,Q){return this.getViewBounds(J,KZ,HZ),Q.subVectors(HZ,KZ)}setViewOffset(J,Q,$,Z,W,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(d8*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,W=-0.5*Z,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;W+=K.offsetX*Z/Y,Q-=K.offsetY*$/X,Z*=K.width/Y,$*=K.height/X}let H=this.filmOffset;if(H!==0)W+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class N6 extends G6{constructor(J=-1,Q=1,$=1,Z=-1,W=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=W,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,W,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,W=$-J,K=$+J,H=Z+Q,Y=Z-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=X*this.view.offsetX,K=W+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(W,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}var F8=-90,D8=1;class X$ extends LJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new TJ(F8,D8,J,Q);Z.layers=this.layers,this.add(Z);let W=new TJ(F8,D8,J,Q);W.layers=this.layers,this.add(W);let K=new TJ(F8,D8,J,Q);K.layers=this.layers,this.add(K);let H=new TJ(F8,D8,J,Q);H.layers=this.layers,this.add(H);let Y=new TJ(F8,D8,J,Q);Y.layers=this.layers,this.add(Y);let X=new TJ(F8,D8,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,W,K,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,K,H,Y,X,U]=this.children,N=J.getRenderTarget(),E=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let k=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let z=!1;if(J.isWebGLRenderer===!0)z=J.state.buffers.depth.getReversed();else z=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,1,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=k,J.setRenderTarget($,5,Z),z&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(N,E,G),J.xr.enabled=D,$.texture.needsPMREMUpdate=!0}}class U$ extends TJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var G$="\\[\\]\\.:\\/",oK=new RegExp("["+G$+"]","g"),N$="[^"+G$+"]",aK="[^"+G$.replace("\\.","")+"]",rK=/((?:WC+[\/:])*)/.source.replace("WC",N$),tK=/(WCOD+)?/.source.replace("WCOD",aK),eK=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",N$),JH=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",N$),QH=new RegExp("^"+rK+tK+eK+JH+"$"),$H=["material","materials","bones","map"];class NW{constructor(J,Q,$){let Z=$||i0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=$.length;Z!==W;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class i0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||i0.parseTrackName(Q),this.node=i0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new i0(J,Q,$);else return new i0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(oK,"")}static parseTrackName(J){let Q=QH.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let W=$.nodeName.substring(Z+1);if($H.indexOf(W)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=W}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(W){for(let K=0;K<W.length;K++){let H=W[K];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,W=Q.propertyIndex;if(!J)J=i0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){C0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){P0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){P0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){P0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){P0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){P0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let K=J[Z];if(K===void 0){let X=Q.nodeName;P0("PropertyBinding: Trying to update property for track: "+X+"."+Z+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(W!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=W}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}i0.Composite=NW;i0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};i0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};i0.prototype.GetterByBindingType=[i0.prototype._getValue_direct,i0.prototype._getValue_array,i0.prototype._getValue_arrayElement,i0.prototype._getValue_toArray];i0.prototype.SetterByBindingTypeAndVersioning=[[i0.prototype._setValue_direct,i0.prototype._setValue_direct_setNeedsUpdate,i0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_array,i0.prototype._setValue_array_setNeedsUpdate,i0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_arrayElement,i0.prototype._setValue_arrayElement_setNeedsUpdate,i0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_fromArray,i0.prototype._setValue_fromArray_setNeedsUpdate,i0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rG=new Float32Array(1);class E${static{E$.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=$,W[3]=Z,this}}function q$(J,Q,$,Z){let W=ZH(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function ZH(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)C0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185";function vW(){let J=null,Q=!1,$=null,Z=null;function W(K,H){$(K,H),Z=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(W),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function WH(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:N}=Y,E=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,N),Y.onUploadCallback();let D;if(U instanceof Float32Array)D=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)D=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)D=J.HALF_FLOAT;else D=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)D=J.SHORT;else if(U instanceof Uint32Array)D=J.UNSIGNED_INT;else if(U instanceof Int32Array)D=J.INT;else if(U instanceof Int8Array)D=J.BYTE;else if(U instanceof Uint8Array)D=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)D=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:D,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:E}}function Z(Y,X,U){let{array:N,updateRanges:E}=X;if(J.bindBuffer(U,Y),E.length===0)J.bufferSubData(U,0,N);else{E.sort((D,k)=>D.start-k.start);let G=0;for(let D=1;D<E.length;D++){let k=E[G],z=E[D];if(z.start<=k.start+k.count+1)k.count=Math.max(k.count,z.start+z.count-k.start);else++G,E[G]=z}E.length=G+1;for(let D=0,k=E.length;D<k;D++){let z=E[D];J.bufferSubData(U,z.start*N.BYTES_PER_ELEMENT,N,z.start,z.count)}X.clearUpdateRanges()}X.onUploadCallback()}function W(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let N=Q.get(Y);if(!N||N.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(U.buffer,Y,X),U.version=Y.version}}return{get:W,remove:K,update:H}}var KH=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,HH=`#ifdef USE_ALPHAHASH
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
#endif`,YH=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,XH=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,UH=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,GH=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,NH=`#ifdef USE_AOMAP
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
#endif`,EH=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qH=`#ifdef USE_BATCHING
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
#endif`,FH=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,DH=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,OH=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,RH=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kH=`#ifdef USE_IRIDESCENCE
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
#endif`,MH=`#ifdef USE_BUMPMAP
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
#endif`,LH=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,VH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,BH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zH=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,IH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,AH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_H=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,CH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wH=`#define PI 3.141592653589793
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
} // validated`,PH=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,TH=`vec3 transformedNormal = objectNormal;
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
#endif`,SH=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jH=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yH=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vH=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fH="gl_FragColor = linearToOutputTexel( gl_FragColor );",bH=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hH=`#ifdef USE_ENVMAP
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
#endif`,xH=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,gH=`#ifdef USE_ENVMAP
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
#endif`,pH=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mH=`#ifdef USE_ENVMAP
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
#endif`,lH=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dH=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uH=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cH=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nH=`#ifdef USE_GRADIENTMAP
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
}`,sH=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,iH=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,oH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,aH=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,rH=`#ifdef USE_ENVMAP
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
#endif`,tH=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,JY=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,QY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$Y=`PhysicalMaterial material;
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
#endif`,ZY=`uniform sampler2D dfgLUT;
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
}`,WY=`
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
#endif`,KY=`#if defined( RE_IndirectDiffuse )
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
#endif`,HY=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,YY=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,XY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,UY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,GY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,EY=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qY=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,FY=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,DY=`#if defined( USE_POINTS_UV )
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
#endif`,OY=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,RY=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kY=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,MY=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,LY=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,VY=`#ifdef USE_MORPHTARGETS
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
#endif`,BY=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zY=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,IY=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,AY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_Y=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CY=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,wY=`#ifdef USE_NORMALMAP
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
#endif`,PY=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,TY=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,SY=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jY=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yY=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vY=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fY=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bY=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hY=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xY=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gY=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pY=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mY=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lY=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dY=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,uY=`float getShadowMask() {
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
}`,cY=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nY=`#ifdef USE_SKINNING
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
#endif`,sY=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iY=`#ifdef USE_SKINNING
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
#endif`,oY=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,aY=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rY=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tY=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,eY=`#ifdef USE_TRANSMISSION
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
#endif`,JX=`#ifdef USE_TRANSMISSION
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
#endif`,QX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$X=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ZX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,WX=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,KX=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,HX=`uniform sampler2D t2D;
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
}`,YX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XX=`#ifdef ENVMAP_TYPE_CUBE
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
}`,UX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,GX=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NX=`#include <common>
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
}`,EX=`#if DEPTH_PACKING == 3200
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
}`,qX=`#define DISTANCE
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
}`,FX=`#define DISTANCE
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
}`,DX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,OX=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RX=`uniform float scale;
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
}`,kX=`uniform vec3 diffuse;
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
}`,MX=`#include <common>
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
}`,LX=`uniform vec3 diffuse;
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
}`,VX=`#define LAMBERT
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
}`,BX=`#define LAMBERT
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
}`,zX=`#define MATCAP
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
}`,IX=`#define MATCAP
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
}`,AX=`#define NORMAL
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
}`,_X=`#define NORMAL
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
}`,CX=`#define PHONG
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
}`,wX=`#define PHONG
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
}`,PX=`#define STANDARD
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
}`,TX=`#define STANDARD
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
}`,SX=`#define TOON
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
}`,jX=`#define TOON
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
}`,yX=`uniform float size;
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
}`,vX=`uniform vec3 diffuse;
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
}`,fX=`#include <common>
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
}`,bX=`uniform vec3 color;
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
}`,hX=`uniform float rotation;
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
}`,xX=`uniform vec3 diffuse;
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
}`,b0={alphahash_fragment:KH,alphahash_pars_fragment:HH,alphamap_fragment:YH,alphamap_pars_fragment:XH,alphatest_fragment:UH,alphatest_pars_fragment:GH,aomap_fragment:NH,aomap_pars_fragment:EH,batching_pars_vertex:qH,batching_vertex:FH,begin_vertex:DH,beginnormal_vertex:OH,bsdfs:RH,iridescence_fragment:kH,bumpmap_pars_fragment:MH,clipping_planes_fragment:LH,clipping_planes_pars_fragment:VH,clipping_planes_pars_vertex:BH,clipping_planes_vertex:zH,color_fragment:IH,color_pars_fragment:AH,color_pars_vertex:_H,color_vertex:CH,common:wH,cube_uv_reflection_fragment:PH,defaultnormal_vertex:TH,displacementmap_pars_vertex:SH,displacementmap_vertex:jH,emissivemap_fragment:yH,emissivemap_pars_fragment:vH,colorspace_fragment:fH,colorspace_pars_fragment:bH,envmap_fragment:hH,envmap_common_pars_fragment:xH,envmap_pars_fragment:gH,envmap_pars_vertex:pH,envmap_physical_pars_fragment:rH,envmap_vertex:mH,fog_vertex:lH,fog_pars_vertex:dH,fog_fragment:uH,fog_pars_fragment:cH,gradientmap_pars_fragment:nH,lightmap_pars_fragment:sH,lights_lambert_fragment:iH,lights_lambert_pars_fragment:oH,lights_pars_begin:aH,lights_toon_fragment:tH,lights_toon_pars_fragment:eH,lights_phong_fragment:JY,lights_phong_pars_fragment:QY,lights_physical_fragment:$Y,lights_physical_pars_fragment:ZY,lights_fragment_begin:WY,lights_fragment_maps:KY,lights_fragment_end:HY,lightprobes_pars_fragment:YY,logdepthbuf_fragment:XY,logdepthbuf_pars_fragment:UY,logdepthbuf_pars_vertex:GY,logdepthbuf_vertex:NY,map_fragment:EY,map_pars_fragment:qY,map_particle_fragment:FY,map_particle_pars_fragment:DY,metalnessmap_fragment:OY,metalnessmap_pars_fragment:RY,morphinstance_vertex:kY,morphcolor_vertex:MY,morphnormal_vertex:LY,morphtarget_pars_vertex:VY,morphtarget_vertex:BY,normal_fragment_begin:zY,normal_fragment_maps:IY,normal_pars_fragment:AY,normal_pars_vertex:_Y,normal_vertex:CY,normalmap_pars_fragment:wY,clearcoat_normal_fragment_begin:PY,clearcoat_normal_fragment_maps:TY,clearcoat_pars_fragment:SY,iridescence_pars_fragment:jY,opaque_fragment:yY,packing:vY,premultiplied_alpha_fragment:fY,project_vertex:bY,dithering_fragment:hY,dithering_pars_fragment:xY,roughnessmap_fragment:gY,roughnessmap_pars_fragment:pY,shadowmap_pars_fragment:mY,shadowmap_pars_vertex:lY,shadowmap_vertex:dY,shadowmask_pars_fragment:uY,skinbase_vertex:cY,skinning_pars_vertex:nY,skinning_vertex:sY,skinnormal_vertex:iY,specularmap_fragment:oY,specularmap_pars_fragment:aY,tonemapping_fragment:rY,tonemapping_pars_fragment:tY,transmission_fragment:eY,transmission_pars_fragment:JX,uv_pars_fragment:QX,uv_pars_vertex:$X,uv_vertex:ZX,worldpos_vertex:WX,background_vert:KX,background_frag:HX,backgroundCube_vert:YX,backgroundCube_frag:XX,cube_vert:UX,cube_frag:GX,depth_vert:NX,depth_frag:EX,distance_vert:qX,distance_frag:FX,equirect_vert:DX,equirect_frag:OX,linedashed_vert:RX,linedashed_frag:kX,meshbasic_vert:MX,meshbasic_frag:LX,meshlambert_vert:VX,meshlambert_frag:BX,meshmatcap_vert:zX,meshmatcap_frag:IX,meshnormal_vert:AX,meshnormal_frag:_X,meshphong_vert:CX,meshphong_frag:wX,meshphysical_vert:PX,meshphysical_frag:TX,meshtoon_vert:SX,meshtoon_frag:jX,points_vert:yX,points_frag:vX,shadow_vert:fX,shadow_frag:bX,sprite_vert:hX,sprite_frag:xX},G0={common:{diffuse:{value:new m0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new S0},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new S0}},envmap:{envMap:{value:null},envMapRotation:{value:new S0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new S0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new S0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new S0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new S0},normalScale:{value:new d0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new S0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new S0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new S0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new S0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new m0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new v},probesMax:{value:new v},probesResolution:{value:new v}},points:{diffuse:{value:new m0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0},uvTransform:{value:new S0}},sprite:{diffuse:{value:new m0(16777215)},opacity:{value:1},center:{value:new d0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new S0},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0}}},Z9={basic:{uniforms:wJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.fog]),vertexShader:b0.meshbasic_vert,fragmentShader:b0.meshbasic_frag},lambert:{uniforms:wJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,G0.lights,{emissive:{value:new m0(0)},envMapIntensity:{value:1}}]),vertexShader:b0.meshlambert_vert,fragmentShader:b0.meshlambert_frag},phong:{uniforms:wJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,G0.lights,{emissive:{value:new m0(0)},specular:{value:new m0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:b0.meshphong_vert,fragmentShader:b0.meshphong_frag},standard:{uniforms:wJ([G0.common,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.roughnessmap,G0.metalnessmap,G0.fog,G0.lights,{emissive:{value:new m0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:b0.meshphysical_vert,fragmentShader:b0.meshphysical_frag},toon:{uniforms:wJ([G0.common,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.gradientmap,G0.fog,G0.lights,{emissive:{value:new m0(0)}}]),vertexShader:b0.meshtoon_vert,fragmentShader:b0.meshtoon_frag},matcap:{uniforms:wJ([G0.common,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,{matcap:{value:null}}]),vertexShader:b0.meshmatcap_vert,fragmentShader:b0.meshmatcap_frag},points:{uniforms:wJ([G0.points,G0.fog]),vertexShader:b0.points_vert,fragmentShader:b0.points_frag},dashed:{uniforms:wJ([G0.common,G0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:b0.linedashed_vert,fragmentShader:b0.linedashed_frag},depth:{uniforms:wJ([G0.common,G0.displacementmap]),vertexShader:b0.depth_vert,fragmentShader:b0.depth_frag},normal:{uniforms:wJ([G0.common,G0.bumpmap,G0.normalmap,G0.displacementmap,{opacity:{value:1}}]),vertexShader:b0.meshnormal_vert,fragmentShader:b0.meshnormal_frag},sprite:{uniforms:wJ([G0.sprite,G0.fog]),vertexShader:b0.sprite_vert,fragmentShader:b0.sprite_frag},background:{uniforms:{uvTransform:{value:new S0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:b0.background_vert,fragmentShader:b0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new S0}},vertexShader:b0.backgroundCube_vert,fragmentShader:b0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:b0.cube_vert,fragmentShader:b0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:b0.equirect_vert,fragmentShader:b0.equirect_frag},distance:{uniforms:wJ([G0.common,G0.displacementmap,{referencePosition:{value:new v},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:b0.distance_vert,fragmentShader:b0.distance_frag},shadow:{uniforms:wJ([G0.lights,G0.fog,{color:{value:new m0(0)},opacity:{value:1}}]),vertexShader:b0.shadow_vert,fragmentShader:b0.shadow_frag}};Z9.physical={uniforms:wJ([Z9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new S0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new S0},clearcoatNormalScale:{value:new d0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new S0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new S0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new S0},sheen:{value:0},sheenColor:{value:new m0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new S0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new S0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new S0},transmissionSamplerSize:{value:new d0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new S0},attenuationDistance:{value:0},attenuationColor:{value:new m0(0)},specularColor:{value:new m0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new S0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new S0},anisotropyVector:{value:new d0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new S0}}]),vertexShader:b0.meshphysical_vert,fragmentShader:b0.meshphysical_frag};var E6={r:0,b:0,g:0},gX=new $J,fW=new S0;fW.set(-1,0,0,0,1,0,0,0,1);function pX(J,Q,$,Z,W,K){let H=new m0(0),Y=W===!0?0:1,X,U,N=null,E=0,G=null;function D(P){let C=P.isScene===!0?P.background:null;if(C&&C.isTexture){let V=P.backgroundBlurriness>0;C=Q.get(C,V)}return C}function k(P){let C=!1,V=D(P);if(V===null)q(H,Y);else if(V&&V.isColor)q(V,1),C=!0;let A=J.xr.getEnvironmentBlendMode();if(A==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(A==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||C)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function z(P,C){let V=D(C);if(V&&(V.isCubeTexture||V.mapping===o8)){if(U===void 0)U=new bJ(new P8(1,1,1),new lJ({name:"BackgroundCubeMaterial",uniforms:a9(Z9.backgroundCube.uniforms),vertexShader:Z9.backgroundCube.vertexShader,fragmentShader:Z9.backgroundCube.fragmentShader,side:SJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(A,I,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(U);if(U.material.uniforms.envMap.value=V,U.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(gX.makeRotationFromEuler(C.backgroundRotation)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(fW);if(U.material.toneMapped=g0.getTransfer(V.colorSpace)!==t0,N!==V||E!==V.version||G!==J.toneMapping)U.material.needsUpdate=!0,N=V,E=V.version,G=J.toneMapping;U.layers.enableAll(),P.unshift(U,U.geometry,U.material,0,0,null)}else if(V&&V.isTexture){if(X===void 0)X=new bJ(new W7(2,2),new lJ({name:"BackgroundMaterial",uniforms:a9(Z9.background.uniforms),vertexShader:Z9.background.vertexShader,fragmentShader:Z9.background.fragmentShader,side:V8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(X);if(X.material.uniforms.t2D.value=V,X.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,X.material.toneMapped=g0.getTransfer(V.colorSpace)!==t0,V.matrixAutoUpdate===!0)V.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(V.matrix),N!==V||E!==V.version||G!==J.toneMapping)X.material.needsUpdate=!0,N=V,E=V.version,G=J.toneMapping;X.layers.enableAll(),P.unshift(X,X.geometry,X.material,0,0,null)}}function q(P,C){P.getRGB(E6,iQ(J)),$.buffers.color.setClear(E6.r,E6.g,E6.b,C,K)}function F(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(P,C=1){H.set(P),Y=C,q(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(P){Y=P,q(H,Y)},render:k,addToRenderList:z,dispose:F}}function mX(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},W=G(null),K=W,H=!1;function Y(_,g,i,x,u){let n=!1,f=E(_,x,i,g);if(K!==f)K=f,U(K.object);if(n=D(_,x,i,u),n)k(_,x,i,u);if(u!==null)Q.update(u,J.ELEMENT_ARRAY_BUFFER);if(n||H){if(H=!1,V(_,g,i,x),u!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(u).buffer)}}function X(){return J.createVertexArray()}function U(_){return J.bindVertexArray(_)}function N(_){return J.deleteVertexArray(_)}function E(_,g,i,x){let u=x.wireframe===!0,n=Z[g.id];if(n===void 0)n={},Z[g.id]=n;let f=_.isInstancedMesh===!0?_.id:0,a=n[f];if(a===void 0)a={},n[f]=a;let e=a[i.id];if(e===void 0)e={},a[i.id]=e;let Z0=e[u];if(Z0===void 0)Z0=G(X()),e[u]=Z0;return Z0}function G(_){let g=[],i=[],x=[];for(let u=0;u<$;u++)g[u]=0,i[u]=0,x[u]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:g,enabledAttributes:i,attributeDivisors:x,object:_,attributes:{},index:null}}function D(_,g,i,x){let u=K.attributes,n=g.attributes,f=0,a=i.getAttributes();for(let e in a)if(a[e].location>=0){let M0=u[e],k0=n[e];if(k0===void 0){if(e==="instanceMatrix"&&_.instanceMatrix)k0=_.instanceMatrix;if(e==="instanceColor"&&_.instanceColor)k0=_.instanceColor}if(M0===void 0)return!0;if(M0.attribute!==k0)return!0;if(k0&&M0.data!==k0.data)return!0;f++}if(K.attributesNum!==f)return!0;if(K.index!==x)return!0;return!1}function k(_,g,i,x){let u={},n=g.attributes,f=0,a=i.getAttributes();for(let e in a)if(a[e].location>=0){let M0=n[e];if(M0===void 0){if(e==="instanceMatrix"&&_.instanceMatrix)M0=_.instanceMatrix;if(e==="instanceColor"&&_.instanceColor)M0=_.instanceColor}let k0={};if(k0.attribute=M0,M0&&M0.data)k0.data=M0.data;u[e]=k0,f++}K.attributes=u,K.attributesNum=f,K.index=x}function z(){let _=K.newAttributes;for(let g=0,i=_.length;g<i;g++)_[g]=0}function q(_){F(_,0)}function F(_,g){let{newAttributes:i,enabledAttributes:x,attributeDivisors:u}=K;if(i[_]=1,x[_]===0)J.enableVertexAttribArray(_),x[_]=1;if(u[_]!==g)J.vertexAttribDivisor(_,g),u[_]=g}function P(){let{newAttributes:_,enabledAttributes:g}=K;for(let i=0,x=g.length;i<x;i++)if(g[i]!==_[i])J.disableVertexAttribArray(i),g[i]=0}function C(_,g,i,x,u,n,f){if(f===!0)J.vertexAttribIPointer(_,g,i,u,n);else J.vertexAttribPointer(_,g,i,x,u,n)}function V(_,g,i,x){z();let u=x.attributes,n=i.getAttributes(),f=g.defaultAttributeValues;for(let a in n){let e=n[a];if(e.location>=0){let Z0=u[a];if(Z0===void 0){if(a==="instanceMatrix"&&_.instanceMatrix)Z0=_.instanceMatrix;if(a==="instanceColor"&&_.instanceColor)Z0=_.instanceColor}if(Z0!==void 0){let{normalized:M0,itemSize:k0}=Z0,e0=Q.get(Z0);if(e0===void 0)continue;let{buffer:j0,type:c,bytesPerElement:$0}=e0,N0=c===J.INT||c===J.UNSIGNED_INT||Z0.gpuType===JQ;if(Z0.isInterleavedBufferAttribute){let K0=Z0.data,I0=K0.stride,l0=Z0.offset;if(K0.isInstancedInterleavedBuffer){for(let B0=0;B0<e.locationSize;B0++)F(e.location+B0,K0.meshPerAttribute);if(_.isInstancedMesh!==!0&&x._maxInstanceCount===void 0)x._maxInstanceCount=K0.meshPerAttribute*K0.count}else for(let B0=0;B0<e.locationSize;B0++)q(e.location+B0);J.bindBuffer(J.ARRAY_BUFFER,j0);for(let B0=0;B0<e.locationSize;B0++)C(e.location+B0,k0/e.locationSize,c,M0,I0*$0,(l0+k0/e.locationSize*B0)*$0,N0)}else{if(Z0.isInstancedBufferAttribute){for(let K0=0;K0<e.locationSize;K0++)F(e.location+K0,Z0.meshPerAttribute);if(_.isInstancedMesh!==!0&&x._maxInstanceCount===void 0)x._maxInstanceCount=Z0.meshPerAttribute*Z0.count}else for(let K0=0;K0<e.locationSize;K0++)q(e.location+K0);J.bindBuffer(J.ARRAY_BUFFER,j0);for(let K0=0;K0<e.locationSize;K0++)C(e.location+K0,k0/e.locationSize,c,M0,k0*$0,k0/e.locationSize*K0*$0,N0)}}else if(f!==void 0){let M0=f[a];if(M0!==void 0)switch(M0.length){case 2:J.vertexAttrib2fv(e.location,M0);break;case 3:J.vertexAttrib3fv(e.location,M0);break;case 4:J.vertexAttrib4fv(e.location,M0);break;default:J.vertexAttrib1fv(e.location,M0)}}}}P()}function A(){B();for(let _ in Z){let g=Z[_];for(let i in g){let x=g[i];for(let u in x){let n=x[u];for(let f in n)N(n[f].object),delete n[f];delete x[u]}}delete Z[_]}}function I(_){if(Z[_.id]===void 0)return;let g=Z[_.id];for(let i in g){let x=g[i];for(let u in x){let n=x[u];for(let f in n)N(n[f].object),delete n[f];delete x[u]}}delete Z[_.id]}function w(_){for(let g in Z){let i=Z[g];for(let x in i){let u=i[x];if(u[_.id]===void 0)continue;let n=u[_.id];for(let f in n)N(n[f].object),delete n[f];delete u[_.id]}}}function R(_){for(let g in Z){let i=Z[g],x=_.isInstancedMesh===!0?_.id:0,u=i[x];if(u===void 0)continue;for(let n in u){let f=u[n];for(let a in f)N(f[a].object),delete f[a];delete u[n]}if(delete i[x],Object.keys(i).length===0)delete Z[g]}}function B(){if(p(),H=!0,K===W)return;K=W,U(K.object)}function p(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:Y,reset:B,resetDefaultState:p,dispose:A,releaseStatesOfGeometry:I,releaseStatesOfObject:R,releaseStatesOfProgram:w,initAttributes:z,enableAttribute:q,disableUnusedAttributes:P}}function lX(J,Q,$){let Z;function W(X){Z=X}function K(X,U){J.drawArrays(Z,X,U),$.update(U,Z,1)}function H(X,U,N){if(N===0)return;J.drawArraysInstanced(Z,X,U,N),$.update(U,Z,N)}function Y(X,U,N){if(N===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,X,0,U,0,N);let G=0;for(let D=0;D<N;D++)G+=U[D];$.update(G,Z,1)}this.setMode=W,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function dX(J,Q,$,Z){let W;function K(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let w=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function H(w){if(w!==Q9&&Z.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(w){let R=w===D9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(w!==iJ&&Z.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==F9&&!R)return!1;return!0}function X(w){if(w==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";w="mediump"}if(w==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",N=X(U);if(N!==U)C0("WebGLRenderer:",U,"not supported, using",N,"instead."),U=N;let E=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)C0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),k=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),z=J.getParameter(J.MAX_TEXTURE_SIZE),q=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),F=J.getParameter(J.MAX_VERTEX_ATTRIBS),P=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),C=J.getParameter(J.MAX_VARYING_VECTORS),V=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),A=J.getParameter(J.MAX_SAMPLES),I=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:E,reversedDepthBuffer:G,maxTextures:D,maxVertexTextures:k,maxTextureSize:z,maxCubemapSize:q,maxAttributes:F,maxVertexUniforms:P,maxVaryings:C,maxFragmentUniforms:V,maxSamples:A,samples:I}}function uX(J){let Q=this,$=null,Z=0,W=!1,K=!1,H=new E9,Y=new S0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(E,G){let D=E.length!==0||G||Z!==0||W;return W=G,Z=E.length,D},this.beginShadows=function(){K=!0,N(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(E,G){$=N(E,G,0)},this.setState=function(E,G,D){let{clippingPlanes:k,clipIntersection:z,clipShadows:q}=E,F=J.get(E);if(!W||k===null||k.length===0||K&&!q)if(K)N(null);else U();else{let P=K?0:Z,C=P*4,V=F.clippingState||null;X.value=V,V=N(k,G,C,D);for(let A=0;A!==C;++A)V[A]=$[A];F.clippingState=V,this.numIntersection=z?this.numPlanes:0,this.numPlanes+=P}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function N(E,G,D,k){let z=E!==null?E.length:0,q=null;if(z!==0){if(q=X.value,k!==!0||q===null){let F=D+z*4,P=G.matrixWorldInverse;if(Y.getNormalMatrix(P),q===null||q.length<F)q=new Float32Array(F);for(let C=0,V=D;C!==z;++C,V+=4)H.copy(E[C]).applyMatrix4(P,Y),H.normal.toArray(q,V),q[V+3]=H.constant}X.value=q,X.needsUpdate=!0}return Q.numPlanes=z,Q.numIntersection=0,q}}var f9=4,EW=[0.125,0.215,0.35,0.446,0.526,0.582],J8=20,cX=256,Y7=new N6,qW=new m0,F$=null,D$=0,O$=0,R$=!1,nX=new v;class L${constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,W={}){let{size:K=256,position:H=nX}=W;F$=this._renderer.getRenderTarget(),D$=this._renderer.getActiveCubeFace(),O$=this._renderer.getActiveMipmapLevel(),R$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=OW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=DW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(F$,D$,O$),this._renderer.xr.enabled=R$,J.scissorTest=!1,T8(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===z8||J.mapping===d9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);F$=this._renderer.getRenderTarget(),D$=this._renderer.getActiveCubeFace(),O$=this._renderer.getActiveMipmapLevel(),R$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:VJ,minFilter:VJ,generateMipmaps:!1,type:D9,format:Q9,colorSpace:hQ,depthBuffer:!1},Z=FW(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=FW(J,Q,$);let{_lodMax:W}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=sX(W)),this._blurMaterial=oX(W,J,Q),this._ggxMaterial=iX(W,J,Q)}return Z}_compileMaterial(J){let Q=new bJ(new CJ,J);this._renderer.compile(Q,Y7)}_sceneToCubeUV(J,Q,$,Z,W){let Y=new TJ(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],N=this._renderer,E=N.autoClear,G=N.toneMapping;if(N.getClearColor(qW),N.toneMapping=sJ,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(Z),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new bJ(new P8,new K6({name:"PMREM.Background",side:SJ,depthWrite:!1,depthTest:!1}));let k=this._backgroundBox,z=k.material,q=!1,F=J.background;if(F){if(F.isColor)z.color.copy(F),J.background=null,q=!0}else z.color.copy(qW),q=!0;for(let P=0;P<6;P++){let C=P%3;if(C===0)Y.up.set(0,X[P],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x+U[P],W.y,W.z);else if(C===1)Y.up.set(0,0,X[P]),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y+U[P],W.z);else Y.up.set(0,X[P],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y,W.z+U[P]);let V=this._cubeSize;if(T8(Z,C*V,P>2?V:0,V,V),N.setRenderTarget(Z),q)N.render(k,Y);N.render(J,Y)}N.toneMapping=G,N.autoClear=E,J.background=F}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===z8||J.mapping===d9;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=OW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=DW();let W=Z?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=W;let H=W.uniforms;H.envMap.value=J;let Y=this._cubeSize;T8(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(K,Y7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let W=1;W<Z;W++)this._applyGGXFilter(J,W-1,W);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,W=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[$];H.material=K;let Y=K.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),N=Math.sqrt(X*X-U*U),E=0+X*1.25,G=N*E,{_lodMax:D}=this,k=this._sizeLods[$],z=3*k*($>D-f9?$-D+f9:0),q=4*(this._cubeSize-k);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=D-Q,T8(W,z,q,3*k,2*k),Z.setRenderTarget(W),Z.render(H,Y7),Y.envMap.value=W.texture,Y.roughness.value=0,Y.mipInt.value=D-$,T8(J,z,q,3*k,2*k),Z.setRenderTarget(J),Z.render(H,Y7)}_blur(J,Q,$,Z,W){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,Z,"latitudinal",W),this._halfBlur(K,J,$,$,Z,"longitudinal",W)}_halfBlur(J,Q,$,Z,W,K,H){let Y=this._renderer,X=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")P0("blur direction must be either latitudinal or longitudinal!");let U=3,N=this._lodMeshes[Z];N.material=X;let E=X.uniforms,G=this._sizeLods[$]-1,D=isFinite(W)?Math.PI/(2*G):2*Math.PI/(2*J8-1),k=W/D,z=isFinite(W)?1+Math.floor(U*k):J8;if(z>J8)C0(`sigmaRadians, ${W}, is too large and will clip, as it requested ${z} samples when the maximum is set to ${J8}`);let q=[],F=0;for(let I=0;I<J8;++I){let w=I/k,R=Math.exp(-w*w/2);if(q.push(R),I===0)F+=R;else if(I<z)F+=2*R}for(let I=0;I<q.length;I++)q[I]=q[I]/F;if(E.envMap.value=J.texture,E.samples.value=z,E.weights.value=q,E.latitudinal.value=K==="latitudinal",H)E.poleAxis.value=H;let{_lodMax:P}=this;E.dTheta.value=D,E.mipInt.value=P-$;let C=this._sizeLods[Z],V=3*C*(Z>P-f9?Z-P+f9:0),A=4*(this._cubeSize-C);T8(Q,V,A,3*C,2*C),Y.setRenderTarget(Q),Y.render(N,Y7)}}function sX(J){let Q=[],$=[],Z=[],W=J,K=J-f9+1+EW.length;for(let H=0;H<K;H++){let Y=Math.pow(2,W);Q.push(Y);let X=1/Y;if(H>J-f9)X=EW[H-J+f9-1];else if(H===0)X=0;$.push(X);let U=1/(Y-2),N=-U,E=1+U,G=[N,N,E,N,E,E,N,N,E,E,N,E],D=6,k=6,z=3,q=2,F=1,P=new Float32Array(z*k*D),C=new Float32Array(q*k*D),V=new Float32Array(F*k*D);for(let I=0;I<D;I++){let w=I%3*2/3-1,R=I>2?0:-1,B=[w,R,0,w+0.6666666666666666,R,0,w+0.6666666666666666,R+1,0,w,R,0,w+0.6666666666666666,R+1,0,w,R+1,0];P.set(B,z*k*I),C.set(G,q*k*I);let p=[I,I,I,I,I,I];V.set(p,F*k*I)}let A=new CJ;if(A.setAttribute("position",new _J(P,z)),A.setAttribute("uv",new _J(C,q)),A.setAttribute("faceIndex",new _J(V,F)),Z.push(new bJ(A,null)),W>f9)W--}return{lodMeshes:Z,sizeLods:Q,sigmas:$}}function FW(J,Q,$){let Z=new mJ(J,Q,$);return Z.texture.mapping=o8,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function T8(J,Q,$,Z,W){J.viewport.set(Q,$,Z,W),J.scissor.set(Q,$,Z,W)}function iX(J,Q,$){return new lJ({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:cX,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:F6(),fragmentShader:`

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
		`,blending:J9,depthTest:!1,depthWrite:!1})}function oX(J,Q,$){let Z=new Float32Array(J8),W=new v(0,1,0);return new lJ({name:"SphericalGaussianBlur",defines:{n:J8,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:F6(),fragmentShader:`

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
		`,blending:J9,depthTest:!1,depthWrite:!1})}function DW(){return new lJ({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:F6(),fragmentShader:`

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
		`,blending:J9,depthTest:!1,depthWrite:!1})}function OW(){return new lJ({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:F6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:J9,depthTest:!1,depthWrite:!1})}function F6(){return`

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
	`}class z$ extends mJ{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new Y6(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new P8(5,5,5),W=new lJ({name:"CubemapFromEquirect",uniforms:a9($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:SJ,blending:J9});W.uniforms.tEquirect.value=Q;let K=new bJ(Z,W),H=Q.minFilter;if(Q.minFilter===u9)Q.minFilter=VJ;return new X$(1,10,this).update(J,K),Q.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let W=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,Z);J.setRenderTarget(W)}}function aX(J){let Q=new WeakMap,$=new WeakMap,Z=null;function W(G,D=!1){if(G===null||G===void 0)return null;if(D)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let D=G.mapping;if(D===m7||D===l7)if(Q.has(G)){let k=Q.get(G).texture;return Y(k,G.mapping)}else{let k=G.image;if(k&&k.height>0){let z=new z$(k.height);return z.fromEquirectangularTexture(J,G),Q.set(G,z),G.addEventListener("dispose",U),Y(z.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let D=G.mapping,k=D===m7||D===l7,z=D===z8||D===d9;if(k||z){let q=$.get(G),F=q!==void 0?q.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==F){if(Z===null)Z=new L$(J);return q=k?Z.fromEquirectangular(G,q):Z.fromCubemap(G,q),q.texture.pmremVersion=G.pmremVersion,$.set(G,q),q.texture}else if(q!==void 0)return q.texture;else{let P=G.image;if(k&&P&&P.height>0||z&&P&&X(P)){if(Z===null)Z=new L$(J);return q=k?Z.fromEquirectangular(G):Z.fromCubemap(G),q.texture.pmremVersion=G.pmremVersion,$.set(G,q),G.addEventListener("dispose",N),q.texture}else return null}}}return G}function Y(G,D){if(D===m7)G.mapping=z8;else if(D===l7)G.mapping=d9;return G}function X(G){let D=0,k=6;for(let z=0;z<k;z++)if(G[z]!==void 0)D++;return D===k}function U(G){let D=G.target;D.removeEventListener("dispose",U);let k=Q.get(D);if(k!==void 0)Q.delete(D),k.dispose()}function N(G){let D=G.target;D.removeEventListener("dispose",N);let k=$.get(D);if(k!==void 0)$.delete(D),k.dispose()}function E(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:W,dispose:E}}function rX(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let W=J.getExtension(Z);return Q[Z]=W,W}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let W=$(Z);if(W===null)l9("WebGLRenderer: "+Z+" extension not supported.");return W}}}function tX(J,Q,$,Z){let W={},K=new WeakMap;function H(E){let G=E.target;if(G.index!==null)Q.remove(G.index);for(let k in G.attributes)Q.remove(G.attributes[k]);G.removeEventListener("dispose",H),delete W[G.id];let D=K.get(G);if(D)Q.remove(D),K.delete(G);if(Z.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(E,G){if(W[G.id]===!0)return G;return G.addEventListener("dispose",H),W[G.id]=!0,$.memory.geometries++,G}function X(E){let G=E.attributes;for(let D in G)Q.update(G[D],J.ARRAY_BUFFER)}function U(E){let G=[],D=E.index,k=E.attributes.position,z=0;if(k===void 0)return;if(D!==null){let P=D.array;z=D.version;for(let C=0,V=P.length;C<V;C+=3){let A=P[C+0],I=P[C+1],w=P[C+2];G.push(A,I,I,w,w,A)}}else{let P=k.array;z=k.version;for(let C=0,V=P.length/3-1;C<V;C+=3){let A=C+0,I=C+1,w=C+2;G.push(A,I,I,w,w,A)}}let q=new(k.count>=65535?Z6:$6)(G,1);q.version=z;let F=K.get(E);if(F)Q.remove(F);K.set(E,q)}function N(E){let G=K.get(E);if(G){let D=E.index;if(D!==null){if(G.version<D.version)U(E)}}else U(E);return K.get(E)}return{get:Y,update:X,getWireframeAttribute:N}}function eX(J,Q,$){let Z;function W(E){Z=E}let K,H;function Y(E){K=E.type,H=E.bytesPerElement}function X(E,G){J.drawElements(Z,G,K,E*H),$.update(G,Z,1)}function U(E,G,D){if(D===0)return;J.drawElementsInstanced(Z,G,K,E*H,D),$.update(G,Z,D)}function N(E,G,D){if(D===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,G,0,K,E,0,D);let z=0;for(let q=0;q<D;q++)z+=G[q];$.update(z,Z,1)}this.setMode=W,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=N}function JU(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(K,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(K/3);break;case J.LINES:$.lines+=Y*(K/2);break;case J.LINE_STRIP:$.lines+=Y*(K-1);break;case J.LINE_LOOP:$.lines+=Y*K;break;case J.POINTS:$.points+=Y*K;break;default:P0("WebGLInfo: Unknown draw mode:",H);break}}function W(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:W,update:Z}}function QU(J,Q,$){let Z=new WeakMap,W=new KJ;function K(H,Y,X){let U=H.morphTargetInfluences,N=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,E=N!==void 0?N.length:0,G=Z.get(Y);if(G===void 0||G.count!==E){let B=function(){w.dispose(),Z.delete(Y),Y.removeEventListener("dispose",B)};if(G!==void 0)G.texture.dispose();let D=Y.morphAttributes.position!==void 0,k=Y.morphAttributes.normal!==void 0,z=Y.morphAttributes.color!==void 0,q=Y.morphAttributes.position||[],F=Y.morphAttributes.normal||[],P=Y.morphAttributes.color||[],C=0;if(D===!0)C=1;if(k===!0)C=2;if(z===!0)C=3;let V=Y.attributes.position.count*C,A=1;if(V>Q.maxTextureSize)A=Math.ceil(V/Q.maxTextureSize),V=Q.maxTextureSize;let I=new Float32Array(V*A*4*E),w=new e7(I,V,A,E);w.type=F9,w.needsUpdate=!0;let R=C*4;for(let p=0;p<E;p++){let _=q[p],g=F[p],i=P[p],x=V*A*4*p;for(let u=0;u<_.count;u++){let n=u*R;if(D===!0)W.fromBufferAttribute(_,u),I[x+n+0]=W.x,I[x+n+1]=W.y,I[x+n+2]=W.z,I[x+n+3]=0;if(k===!0)W.fromBufferAttribute(g,u),I[x+n+4]=W.x,I[x+n+5]=W.y,I[x+n+6]=W.z,I[x+n+7]=0;if(z===!0)W.fromBufferAttribute(i,u),I[x+n+8]=W.x,I[x+n+9]=W.y,I[x+n+10]=W.z,I[x+n+11]=i.itemSize===4?W.w:1}}G={count:E,texture:w,size:new d0(V,A)},Z.set(Y,G),Y.addEventListener("dispose",B)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let D=0;for(let z=0;z<U.length;z++)D+=U[z];let k=Y.morphTargetsRelative?1:1-D;X.getUniforms().setValue(J,"morphTargetBaseInfluence",k),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function $U(J,Q,$,Z,W){let K=new WeakMap;function H(U){let N=W.render.frame,E=U.geometry,G=Q.get(U,E);if(K.get(G)!==N)Q.update(G),K.set(G,N);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(K.get(U)!==N){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,N)}}if(U.isSkinnedMesh){let D=U.skeleton;if(K.get(D)!==N)D.update(),K.set(D,N)}return G}function Y(){K=new WeakMap}function X(U){let N=U.target;if(N.removeEventListener("dispose",X),Z.releaseStatesOfObject(N),$.remove(N.instanceMatrix),N.instanceColor!==null)$.remove(N.instanceColor)}return{update:H,dispose:Y}}var ZU={[i6]:"LINEAR_TONE_MAPPING",[o6]:"REINHARD_TONE_MAPPING",[a6]:"CINEON_TONE_MAPPING",[i8]:"ACES_FILMIC_TONE_MAPPING",[t6]:"AGX_TONE_MAPPING",[e6]:"NEUTRAL_TONE_MAPPING",[r6]:"CUSTOM_TONE_MAPPING"};function WU(J,Q,$,Z,W,K){let H=new mJ(Q,$,{type:J,depthBuffer:W,stencilBuffer:K,samples:Z?4:0,depthTexture:W?new v9(Q,$):void 0}),Y=new mJ(Q,$,{type:D9,depthBuffer:!1,stencilBuffer:!1}),X=new CJ;X.setAttribute("position",new FJ([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new FJ([0,2,0,0,2,0],2));let U=new oQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),N=new bJ(X,U),E=new N6(-1,1,1,-1,0,1),G=null,D=null,k=!1,z,q=null,F=[],P=!1;this.setSize=function(C,V){H.setSize(C,V),Y.setSize(C,V);for(let A=0;A<F.length;A++){let I=F[A];if(I.setSize)I.setSize(C,V)}},this.setEffects=function(C){F=C,P=F.length>0&&F[0].isRenderPass===!0;let{width:V,height:A}=H;for(let I=0;I<F.length;I++){let w=F[I];if(w.setSize)w.setSize(V,A)}},this.begin=function(C,V){if(k)return!1;if(C.toneMapping===sJ&&F.length===0)return!1;if(q=V,V!==null){let{width:A,height:I}=V;if(H.width!==A||H.height!==I)this.setSize(A,I)}if(P===!1)C.setRenderTarget(H);return z=C.toneMapping,C.toneMapping=sJ,!0},this.hasRenderPass=function(){return P},this.end=function(C,V){C.toneMapping=z,k=!0;let A=H,I=Y;for(let w=0;w<F.length;w++){let R=F[w];if(R.enabled===!1)continue;if(R.render(C,I,A,V),R.needsSwap!==!1){let B=A;A=I,I=B}}if(G!==C.outputColorSpace||D!==C.toneMapping){if(G=C.outputColorSpace,D=C.toneMapping,U.defines={},g0.getTransfer(G)===t0)U.defines.SRGB_TRANSFER="";let w=ZU[D];if(w)U.defines[w]="";U.needsUpdate=!0}U.uniforms.tDiffuse.value=A.texture,C.setRenderTarget(q),C.render(N,E),q=null,k=!1},this.isCompositing=function(){return k},this.dispose=function(){if(H.depthTexture)H.depthTexture.dispose();H.dispose(),Y.dispose(),X.dispose(),U.dispose()}}var bW=new AJ,V$=new v9(1,1),hW=new e7,xW=new cQ,gW=new Y6,RW=[],kW=[],MW=new Float32Array(16),LW=new Float32Array(9),VW=new Float32Array(4);function S8(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let W=Q*$,K=RW[W];if(K===void 0)K=new Float32Array(W),RW[W]=K;if(Q!==0){Z.toArray(K,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(K,Y)}return K}function DJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function OJ(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function D6(J,Q){let $=kW[Q];if($===void 0)$=new Int32Array(Q),kW[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function KU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function HU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(DJ($,Q))return;J.uniform2fv(this.addr,Q),OJ($,Q)}}function YU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(DJ($,Q))return;J.uniform3fv(this.addr,Q),OJ($,Q)}}function XU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(DJ($,Q))return;J.uniform4fv(this.addr,Q),OJ($,Q)}}function UU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(DJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),OJ($,Q)}else{if(DJ($,Z))return;VW.set(Z),J.uniformMatrix2fv(this.addr,!1,VW),OJ($,Z)}}function GU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(DJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),OJ($,Q)}else{if(DJ($,Z))return;LW.set(Z),J.uniformMatrix3fv(this.addr,!1,LW),OJ($,Z)}}function NU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(DJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),OJ($,Q)}else{if(DJ($,Z))return;MW.set(Z),J.uniformMatrix4fv(this.addr,!1,MW),OJ($,Z)}}function EU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function qU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(DJ($,Q))return;J.uniform2iv(this.addr,Q),OJ($,Q)}}function FU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(DJ($,Q))return;J.uniform3iv(this.addr,Q),OJ($,Q)}}function DU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(DJ($,Q))return;J.uniform4iv(this.addr,Q),OJ($,Q)}}function OU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function RU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(DJ($,Q))return;J.uniform2uiv(this.addr,Q),OJ($,Q)}}function kU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(DJ($,Q))return;J.uniform3uiv(this.addr,Q),OJ($,Q)}}function MU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(DJ($,Q))return;J.uniform4uiv(this.addr,Q),OJ($,Q)}}function LU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;let K;if(this.type===J.SAMPLER_2D_SHADOW)V$.compareFunction=$.isReversedDepthBuffer()?t7:r7,K=V$;else K=bW;$.setTexture2D(Q||K,W)}function VU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture3D(Q||xW,W)}function BU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTextureCube(Q||gW,W)}function zU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture2DArray(Q||hW,W)}function IU(J){switch(J){case 5126:return KU;case 35664:return HU;case 35665:return YU;case 35666:return XU;case 35674:return UU;case 35675:return GU;case 35676:return NU;case 5124:case 35670:return EU;case 35667:case 35671:return qU;case 35668:case 35672:return FU;case 35669:case 35673:return DU;case 5125:return OU;case 36294:return RU;case 36295:return kU;case 36296:return MU;case 35678:case 36198:case 36298:case 36306:case 35682:return LU;case 35679:case 36299:case 36307:return VU;case 35680:case 36300:case 36308:case 36293:return BU;case 36289:case 36303:case 36311:case 36292:return zU}}function AU(J,Q){J.uniform1fv(this.addr,Q)}function _U(J,Q){let $=S8(Q,this.size,2);J.uniform2fv(this.addr,$)}function CU(J,Q){let $=S8(Q,this.size,3);J.uniform3fv(this.addr,$)}function wU(J,Q){let $=S8(Q,this.size,4);J.uniform4fv(this.addr,$)}function PU(J,Q){let $=S8(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function TU(J,Q){let $=S8(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function SU(J,Q){let $=S8(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function jU(J,Q){J.uniform1iv(this.addr,Q)}function yU(J,Q){J.uniform2iv(this.addr,Q)}function vU(J,Q){J.uniform3iv(this.addr,Q)}function fU(J,Q){J.uniform4iv(this.addr,Q)}function bU(J,Q){J.uniform1uiv(this.addr,Q)}function hU(J,Q){J.uniform2uiv(this.addr,Q)}function xU(J,Q){J.uniform3uiv(this.addr,Q)}function gU(J,Q){J.uniform4uiv(this.addr,Q)}function pU(J,Q,$){let Z=this.cache,W=Q.length,K=D6($,W);if(!DJ(Z,K))J.uniform1iv(this.addr,K),OJ(Z,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=V$;else H=bW;for(let Y=0;Y!==W;++Y)$.setTexture2D(Q[Y]||H,K[Y])}function mU(J,Q,$){let Z=this.cache,W=Q.length,K=D6($,W);if(!DJ(Z,K))J.uniform1iv(this.addr,K),OJ(Z,K);for(let H=0;H!==W;++H)$.setTexture3D(Q[H]||xW,K[H])}function lU(J,Q,$){let Z=this.cache,W=Q.length,K=D6($,W);if(!DJ(Z,K))J.uniform1iv(this.addr,K),OJ(Z,K);for(let H=0;H!==W;++H)$.setTextureCube(Q[H]||gW,K[H])}function dU(J,Q,$){let Z=this.cache,W=Q.length,K=D6($,W);if(!DJ(Z,K))J.uniform1iv(this.addr,K),OJ(Z,K);for(let H=0;H!==W;++H)$.setTexture2DArray(Q[H]||hW,K[H])}function uU(J){switch(J){case 5126:return AU;case 35664:return _U;case 35665:return CU;case 35666:return wU;case 35674:return PU;case 35675:return TU;case 35676:return SU;case 5124:case 35670:return jU;case 35667:case 35671:return yU;case 35668:case 35672:return vU;case 35669:case 35673:return fU;case 5125:return bU;case 36294:return hU;case 36295:return xU;case 36296:return gU;case 35678:case 36198:case 36298:case 36306:case 35682:return pU;case 35679:case 36299:case 36307:return mU;case 35680:case 36300:case 36308:case 36293:return lU;case 36289:case 36303:case 36311:case 36292:return dU}}class pW{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=IU(Q.type)}}class mW{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=uU(Q.type)}}class lW{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let W=0,K=Z.length;W!==K;++W){let H=Z[W];H.setValue(J,Q[H.id],$)}}}var k$=/(\w+)(\])?(\[|\.)?/g;function BW(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function cU(J,Q,$){let Z=J.name,W=Z.length;k$.lastIndex=0;while(!0){let K=k$.exec(Z),H=k$.lastIndex,Y=K[1],X=K[2]==="]",U=K[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===W){BW($,U===void 0?new pW(Y,J,Q):new mW(Y,J,Q));break}else{let E=$.map[Y];if(E===void 0)E=new lW(Y),BW($,E);$=E}}}class G7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let H=J.getActiveUniform(Q,K),Y=J.getUniformLocation(Q,H.name);cU(H,Y,this)}let Z=[],W=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(K);else W.push(K);if(Z.length>0)this.seq=Z.concat(W)}setValue(J,Q,$,Z){let W=this.map[Q];if(W!==void 0)W.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let W=0,K=Q.length;W!==K;++W){let H=Q[W],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,W=J.length;Z!==W;++Z){let K=J[Z];if(K.id in Q)$.push(K)}return $}}function zW(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var nU=37297,sU=0;function iU(J,Q){let $=J.split(`
`),Z=[],W=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let H=W;H<K;H++){let Y=H+1;Z.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return Z.join(`
`)}var IW=new S0;function oU(J){g0._getMatrix(IW,g0.workingColorSpace,J);let Q=`mat3( ${IW.elements.map(($)=>$.toFixed(4))} )`;switch(g0.getTransfer(J)){case xQ:return[Q,"LinearTransferOETF"];case t0:return[Q,"sRGBTransferOETF"];default:return C0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function AW(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(Z&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+K+`

`+iU(J.getShaderSource(Q),Y)}else return K}function aU(J,Q){let $=oU(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var rU={[i6]:"Linear",[o6]:"Reinhard",[a6]:"Cineon",[i8]:"ACESFilmic",[t6]:"AgX",[e6]:"Neutral",[r6]:"Custom"};function tU(J,Q){let $=rU[Q];if($===void 0)return C0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var q6=new v;function eU(){g0.getLuminanceCoefficients(q6);let J=q6.x.toFixed(4),Q=q6.y.toFixed(4),$=q6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function JG(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(U7).join(`
`)}function QG(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function $G(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Z;W++){let K=J.getActiveAttrib(Q,W),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;$[H]={type:K.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function U7(J){return J!==""}function _W(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function CW(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var ZG=/^[ \t]*#include +<([\w\d./]+)>/gm;function B$(J){return J.replace(ZG,KG)}var WG=new Map;function KG(J,Q){let $=b0[Q];if($===void 0){let Z=WG.get(Q);if(Z!==void 0)$=b0[Z],C0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return B$($)}var HG=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wW(J){return J.replace(HG,YG)}function YG(J,Q,$,Z){let W="";for(let K=parseInt(Q);K<parseInt($);K++)W+=Z.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return W}function PW(J){let Q=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return Q}var XG={[n8]:"SHADOWMAP_TYPE_PCF",[L8]:"SHADOWMAP_TYPE_VSM"};function UG(J){return XG[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var GG={[z8]:"ENVMAP_TYPE_CUBE",[d9]:"ENVMAP_TYPE_CUBE",[o8]:"ENVMAP_TYPE_CUBE_UV"};function NG(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return GG[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var EG={[d9]:"ENVMAP_MODE_REFRACTION"};function qG(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return EG[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var FG={[xZ]:"ENVMAP_BLENDING_MULTIPLY",[gZ]:"ENVMAP_BLENDING_MIX",[pZ]:"ENVMAP_BLENDING_ADD"};function DG(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return FG[J.combine]||"ENVMAP_BLENDING_NONE"}function OG(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function RG(J,Q,$,Z){let W=J.getContext(),K=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=UG($),U=NG($),N=qG($),E=DG($),G=OG($),D=JG($),k=QG(K),z=W.createProgram(),q,F,P=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(q=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k].filter(U7).join(`
`),q.length>0)q+=`
`;if(F=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k].filter(U7).join(`
`),F.length>0)F+=`
`}else q=[PW($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+N:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(U7).join(`
`),F=[PW($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+N:"",$.envMap?"#define "+E:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==sJ?"#define TONE_MAPPING":"",$.toneMapping!==sJ?b0.tonemapping_pars_fragment:"",$.toneMapping!==sJ?tU("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",b0.colorspace_pars_fragment,aU("linearToOutputTexel",$.outputColorSpace),eU(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(U7).join(`
`);if(H=B$(H),H=_W(H,$),H=CW(H,$),Y=B$(Y),Y=_W(Y,$),Y=CW(Y,$),H=wW(H),Y=wW(Y),$.isRawShaderMaterial!==!0)P=`#version 300 es
`,q=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+q,F=["#define varying in",$.glslVersion===gQ?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===gQ?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+F;let C=P+q+H,V=P+F+Y,A=zW(W,W.VERTEX_SHADER,C),I=zW(W,W.FRAGMENT_SHADER,V);if(W.attachShader(z,A),W.attachShader(z,I),$.index0AttributeName!==void 0)W.bindAttribLocation(z,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)W.bindAttribLocation(z,0,"position");W.linkProgram(z);function w(_){if(J.debug.checkShaderErrors){let g=W.getProgramInfoLog(z)||"",i=W.getShaderInfoLog(A)||"",x=W.getShaderInfoLog(I)||"",u=g.trim(),n=i.trim(),f=x.trim(),a=!0,e=!0;if(W.getProgramParameter(z,W.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,z,A,I);else{let Z0=AW(W,A,"vertex"),M0=AW(W,I,"fragment");P0("WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(z,W.VALIDATE_STATUS)+`

Material Name: `+_.name+`
Material Type: `+_.type+`

Program Info Log: `+u+`
`+Z0+`
`+M0)}else if(u!=="")C0("WebGLProgram: Program Info Log:",u);else if(n===""||f==="")e=!1;if(e)_.diagnostics={runnable:a,programLog:u,vertexShader:{log:n,prefix:q},fragmentShader:{log:f,prefix:F}}}W.deleteShader(A),W.deleteShader(I),R=new G7(W,z),B=$G(W,z)}let R;this.getUniforms=function(){if(R===void 0)w(this);return R};let B;this.getAttributes=function(){if(B===void 0)w(this);return B};let p=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(p===!1)p=W.getProgramParameter(z,nU);return p},this.destroy=function(){Z.releaseStatesOfProgram(this),W.deleteProgram(z),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=sU++,this.cacheKey=Q,this.usedTimes=1,this.program=z,this.vertexShader=A,this.fragmentShader=I,this}var kG=0;class dW{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new uW(J),Q.set(J,$);return $}}class uW{constructor(J){this.id=kG++,this.code=J,this.usedTimes=0}}function MG(J){return J===s9||J===o7||J===a7}function LG(J,Q,$,Z,W,K){let H=new J6,Y=new dW,X=new Set,U=[],N=new Map,E=Z.logarithmicDepthBuffer,G=Z.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function k(R){if(X.add(R),R===0)return"uv";return`uv${R}`}function z(R,B,p,_,g,i){let x=_.fog,u=g.geometry,n=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?_.environment:null,f=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap,a=Q.get(R.envMap||n,f),e=!!a&&a.mapping===o8?a.image.height:null,Z0=D[R.type];if(R.precision!==null){if(G=Z.getMaxPrecision(R.precision),G!==R.precision)C0("WebGLProgram.getParameters:",R.precision,"not supported, using",G,"instead.")}let M0=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,k0=M0!==void 0?M0.length:0,e0=0;if(u.morphAttributes.position!==void 0)e0=1;if(u.morphAttributes.normal!==void 0)e0=2;if(u.morphAttributes.color!==void 0)e0=3;let j0,c,$0,N0;if(Z0){let y0=Z9[Z0];j0=y0.vertexShader,c=y0.fragmentShader}else{j0=R.vertexShader,c=R.fragmentShader;let y0=Y.getVertexShaderStage(R),HJ=Y.getFragmentShaderStage(R);Y.update(R,y0,HJ),$0=y0.id,N0=HJ.id}let K0=J.getRenderTarget(),I0=J.state.buffers.depth.getReversed(),l0=g.isInstancedMesh===!0,B0=g.isBatchedMesh===!0,T0=!!R.map,n0=!!R.matcap,h0=!!a,f0=!!R.aoMap,NJ=!!R.lightMap,XJ=!!R.bumpMap&&R.wireframe===!1,ZJ=!!R.normalMap,MJ=!!R.displacementMap,RJ=!!R.emissiveMap,qJ=!!R.metalnessMap,j=!!R.roughnessMap,hJ=R.anisotropy>0,s0=R.clearcoat>0,WJ=R.dispersion>0,L=R.iridescence>0,O=R.sheen>0,T=R.transmission>0,l=hJ&&!!R.anisotropyMap,t=s0&&!!R.clearcoatMap,J0=s0&&!!R.clearcoatNormalMap,X0=s0&&!!R.clearcoatRoughnessMap,d=L&&!!R.iridescenceMap,o=L&&!!R.iridescenceThicknessMap,F0=O&&!!R.sheenColorMap,V0=O&&!!R.sheenRoughnessMap,U0=!!R.specularMap,Q0=!!R.specularColorMap,_0=!!R.specularIntensityMap,w0=T&&!!R.transmissionMap,c0=T&&!!R.thicknessMap,S=!!R.gradientMap,W0=!!R.alphaMap,s=R.alphaTest>0,H0=!!R.alphaHash,D0=!!R.extensions,r=sJ;if(R.toneMapped){if(K0===null||K0.isXRRenderTarget===!0)r=J.toneMapping}let Y0={shaderID:Z0,shaderType:R.type,shaderName:R.name,vertexShader:j0,fragmentShader:c,defines:R.defines,customVertexShaderID:$0,customFragmentShaderID:N0,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:G,batching:B0,batchingColor:B0&&g._colorsTexture!==null,instancing:l0,instancingColor:l0&&g.instanceColor!==null,instancingMorph:l0&&g.morphTexture!==null,outputColorSpace:K0===null?J.outputColorSpace:K0.isXRRenderTarget===!0?K0.texture.colorSpace:g0.workingColorSpace,alphaToCoverage:!!R.alphaToCoverage,map:T0,matcap:n0,envMap:h0,envMapMode:h0&&a.mapping,envMapCubeUVHeight:e,aoMap:f0,lightMap:NJ,bumpMap:XJ,normalMap:ZJ,displacementMap:MJ,emissiveMap:RJ,normalMapObjectSpace:ZJ&&R.normalMapType===rZ,normalMapTangentSpace:ZJ&&R.normalMapType===bQ,packedNormalMap:ZJ&&R.normalMapType===bQ&&MG(R.normalMap.format),metalnessMap:qJ,roughnessMap:j,anisotropy:hJ,anisotropyMap:l,clearcoat:s0,clearcoatMap:t,clearcoatNormalMap:J0,clearcoatRoughnessMap:X0,dispersion:WJ,iridescence:L,iridescenceMap:d,iridescenceThicknessMap:o,sheen:O,sheenColorMap:F0,sheenRoughnessMap:V0,specularMap:U0,specularColorMap:Q0,specularIntensityMap:_0,transmission:T,transmissionMap:w0,thicknessMap:c0,gradientMap:S,opaque:R.transparent===!1&&R.blending===s8&&R.alphaToCoverage===!1,alphaMap:W0,alphaTest:s,alphaHash:H0,combine:R.combine,mapUv:T0&&k(R.map.channel),aoMapUv:f0&&k(R.aoMap.channel),lightMapUv:NJ&&k(R.lightMap.channel),bumpMapUv:XJ&&k(R.bumpMap.channel),normalMapUv:ZJ&&k(R.normalMap.channel),displacementMapUv:MJ&&k(R.displacementMap.channel),emissiveMapUv:RJ&&k(R.emissiveMap.channel),metalnessMapUv:qJ&&k(R.metalnessMap.channel),roughnessMapUv:j&&k(R.roughnessMap.channel),anisotropyMapUv:l&&k(R.anisotropyMap.channel),clearcoatMapUv:t&&k(R.clearcoatMap.channel),clearcoatNormalMapUv:J0&&k(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X0&&k(R.clearcoatRoughnessMap.channel),iridescenceMapUv:d&&k(R.iridescenceMap.channel),iridescenceThicknessMapUv:o&&k(R.iridescenceThicknessMap.channel),sheenColorMapUv:F0&&k(R.sheenColorMap.channel),sheenRoughnessMapUv:V0&&k(R.sheenRoughnessMap.channel),specularMapUv:U0&&k(R.specularMap.channel),specularColorMapUv:Q0&&k(R.specularColorMap.channel),specularIntensityMapUv:_0&&k(R.specularIntensityMap.channel),transmissionMapUv:w0&&k(R.transmissionMap.channel),thicknessMapUv:c0&&k(R.thicknessMap.channel),alphaMapUv:W0&&k(R.alphaMap.channel),vertexTangents:!!u.attributes.tangent&&(ZJ||hJ),vertexNormals:!!u.attributes.normal,vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!u.attributes.color&&u.attributes.color.itemSize===4,pointsUvs:g.isPoints===!0&&!!u.attributes.uv&&(T0||W0),fog:!!x,useFog:R.fog===!0,fogExp2:!!x&&x.isFogExp2,flatShading:R.wireframe===!1&&(R.flatShading===!0||u.attributes.normal===void 0&&ZJ===!1&&(R.isMeshLambertMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isMeshPhysicalMaterial)),sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:E,reversedDepthBuffer:I0,skinning:g.isSkinnedMesh===!0,hasPositionAttribute:u.attributes.position!==void 0,morphTargets:u.morphAttributes.position!==void 0,morphNormals:u.morphAttributes.normal!==void 0,morphColors:u.morphAttributes.color!==void 0,morphTargetsCount:k0,morphTextureStride:e0,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:i.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:R.dithering,shadowMapEnabled:J.shadowMap.enabled&&p.length>0,shadowMapType:J.shadowMap.type,toneMapping:r,decodeVideoTexture:T0&&R.map.isVideoTexture===!0&&g0.getTransfer(R.map.colorSpace)===t0,decodeVideoTextureEmissive:RJ&&R.emissiveMap.isVideoTexture===!0&&g0.getTransfer(R.emissiveMap.colorSpace)===t0,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===eJ,flipSided:R.side===SJ,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:D0&&R.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(D0&&R.extensions.multiDraw===!0||B0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return Y0.vertexUv1s=X.has(1),Y0.vertexUv2s=X.has(2),Y0.vertexUv3s=X.has(3),X.clear(),Y0}function q(R){let B=[];if(R.shaderID)B.push(R.shaderID);else B.push(R.customVertexShaderID),B.push(R.customFragmentShaderID);if(R.defines!==void 0)for(let p in R.defines)B.push(p),B.push(R.defines[p]);if(R.isRawShaderMaterial===!1)F(B,R),P(B,R),B.push(J.outputColorSpace);return B.push(R.customProgramCacheKey),B.join()}function F(R,B){R.push(B.precision),R.push(B.outputColorSpace),R.push(B.envMapMode),R.push(B.envMapCubeUVHeight),R.push(B.mapUv),R.push(B.alphaMapUv),R.push(B.lightMapUv),R.push(B.aoMapUv),R.push(B.bumpMapUv),R.push(B.normalMapUv),R.push(B.displacementMapUv),R.push(B.emissiveMapUv),R.push(B.metalnessMapUv),R.push(B.roughnessMapUv),R.push(B.anisotropyMapUv),R.push(B.clearcoatMapUv),R.push(B.clearcoatNormalMapUv),R.push(B.clearcoatRoughnessMapUv),R.push(B.iridescenceMapUv),R.push(B.iridescenceThicknessMapUv),R.push(B.sheenColorMapUv),R.push(B.sheenRoughnessMapUv),R.push(B.specularMapUv),R.push(B.specularColorMapUv),R.push(B.specularIntensityMapUv),R.push(B.transmissionMapUv),R.push(B.thicknessMapUv),R.push(B.combine),R.push(B.fogExp2),R.push(B.sizeAttenuation),R.push(B.morphTargetsCount),R.push(B.morphAttributeCount),R.push(B.numDirLights),R.push(B.numPointLights),R.push(B.numSpotLights),R.push(B.numSpotLightMaps),R.push(B.numHemiLights),R.push(B.numRectAreaLights),R.push(B.numDirLightShadows),R.push(B.numPointLightShadows),R.push(B.numSpotLightShadows),R.push(B.numSpotLightShadowsWithMaps),R.push(B.numLightProbes),R.push(B.shadowMapType),R.push(B.toneMapping),R.push(B.numClippingPlanes),R.push(B.numClipIntersection),R.push(B.depthPacking)}function P(R,B){if(H.disableAll(),B.instancing)H.enable(0);if(B.instancingColor)H.enable(1);if(B.instancingMorph)H.enable(2);if(B.matcap)H.enable(3);if(B.envMap)H.enable(4);if(B.normalMapObjectSpace)H.enable(5);if(B.normalMapTangentSpace)H.enable(6);if(B.clearcoat)H.enable(7);if(B.iridescence)H.enable(8);if(B.alphaTest)H.enable(9);if(B.vertexColors)H.enable(10);if(B.vertexAlphas)H.enable(11);if(B.vertexUv1s)H.enable(12);if(B.vertexUv2s)H.enable(13);if(B.vertexUv3s)H.enable(14);if(B.vertexTangents)H.enable(15);if(B.anisotropy)H.enable(16);if(B.alphaHash)H.enable(17);if(B.batching)H.enable(18);if(B.dispersion)H.enable(19);if(B.batchingColor)H.enable(20);if(B.gradientMap)H.enable(21);if(B.packedNormalMap)H.enable(22);if(B.vertexNormals)H.enable(23);if(R.push(H.mask),H.disableAll(),B.fog)H.enable(0);if(B.useFog)H.enable(1);if(B.flatShading)H.enable(2);if(B.logarithmicDepthBuffer)H.enable(3);if(B.reversedDepthBuffer)H.enable(4);if(B.skinning)H.enable(5);if(B.morphTargets)H.enable(6);if(B.morphNormals)H.enable(7);if(B.morphColors)H.enable(8);if(B.premultipliedAlpha)H.enable(9);if(B.shadowMapEnabled)H.enable(10);if(B.doubleSided)H.enable(11);if(B.flipSided)H.enable(12);if(B.useDepthPacking)H.enable(13);if(B.dithering)H.enable(14);if(B.transmission)H.enable(15);if(B.sheen)H.enable(16);if(B.opaque)H.enable(17);if(B.pointsUvs)H.enable(18);if(B.decodeVideoTexture)H.enable(19);if(B.decodeVideoTextureEmissive)H.enable(20);if(B.alphaToCoverage)H.enable(21);if(B.numLightProbeGrids>0)H.enable(22);if(B.hasPositionAttribute)H.enable(23);R.push(H.mask)}function C(R){let B=D[R.type],p;if(B){let _=Z9[B];p=UW.clone(_.uniforms)}else p=R.uniforms;return p}function V(R,B){let p=N.get(B);if(p!==void 0)++p.usedTimes;else p=new RG(J,B,R,W),U.push(p),N.set(B,p);return p}function A(R){if(--R.usedTimes===0){let B=U.indexOf(R);U[B]=U[U.length-1],U.pop(),N.delete(R.cacheKey),R.destroy()}}function I(R){Y.remove(R)}function w(){Y.dispose()}return{getParameters:z,getProgramCacheKey:q,getUniforms:C,acquireProgram:V,releaseProgram:A,releaseShaderCache:I,programs:U,dispose:w}}function VG(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function Z(H){J.delete(H)}function W(H,Y,X){J.get(H)[Y]=X}function K(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:W,dispose:K}}function BG(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function TW(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function SW(){let J=[],Q=0,$=[],Z=[],W=[];function K(){Q=0,$.length=0,Z.length=0,W.length=0}function H(G){let D=0;if(G.isInstancedMesh)D+=2;if(G.isSkinnedMesh)D+=1;return D}function Y(G,D,k,z,q,F){let P=J[Q];if(P===void 0)P={id:G.id,object:G,geometry:D,material:k,materialVariant:H(G),groupOrder:z,renderOrder:G.renderOrder,z:q,group:F},J[Q]=P;else P.id=G.id,P.object=G,P.geometry=D,P.material=k,P.materialVariant=H(G),P.groupOrder=z,P.renderOrder=G.renderOrder,P.z=q,P.group=F;return Q++,P}function X(G,D,k,z,q,F){let P=Y(G,D,k,z,q,F);if(k.transmission>0)Z.push(P);else if(k.transparent===!0)W.push(P);else $.push(P)}function U(G,D,k,z,q,F){let P=Y(G,D,k,z,q,F);if(k.transmission>0)Z.unshift(P);else if(k.transparent===!0)W.unshift(P);else $.unshift(P)}function N(G,D,k){if($.length>1)$.sort(G||BG);if(Z.length>1)Z.sort(D||TW);if(W.length>1)W.sort(D||TW);if(k)$.reverse(),Z.reverse(),W.reverse()}function E(){for(let G=Q,D=J.length;G<D;G++){let k=J[G];if(k.id===null)break;k.id=null,k.object=null,k.geometry=null,k.material=null,k.group=null}}return{opaque:$,transmissive:Z,transparent:W,init:K,push:X,unshift:U,finish:E,sort:N}}function zG(){let J=new WeakMap;function Q(Z,W){let K=J.get(Z),H;if(K===void 0)H=new SW,J.set(Z,[H]);else if(W>=K.length)H=new SW,K.push(H);else H=K[W];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function IG(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new v,color:new m0};break;case"SpotLight":$={position:new v,direction:new v,color:new m0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new v,color:new m0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new v,skyColor:new m0,groundColor:new m0};break;case"RectAreaLight":$={color:new m0,position:new v,halfWidth:new v,halfHeight:new v};break}return J[Q.id]=$,$}}}function AG(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new d0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new d0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new d0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var _G=0;function CG(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function wG(J){let Q=new IG,$=AG(),Z={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)Z.probe.push(new v);let W=new v,K=new $J,H=new $J;function Y(U){let N=0,E=0,G=0;for(let B=0;B<9;B++)Z.probe[B].set(0,0,0);let D=0,k=0,z=0,q=0,F=0,P=0,C=0,V=0,A=0,I=0,w=0;U.sort(CG);for(let B=0,p=U.length;B<p;B++){let _=U[B],g=_.color,i=_.intensity,x=_.distance,u=null;if(_.shadow&&_.shadow.map)if(_.shadow.map.texture.format===s9)u=_.shadow.map.texture;else u=_.shadow.map.depthTexture||_.shadow.map.texture;if(_.isAmbientLight)N+=g.r*i,E+=g.g*i,G+=g.b*i;else if(_.isLightProbe){for(let n=0;n<9;n++)Z.probe[n].addScaledVector(_.sh.coefficients[n],i);w++}else if(_.isDirectionalLight){let n=Q.get(_);if(n.color.copy(_.color).multiplyScalar(_.intensity),_.castShadow){let f=_.shadow,a=$.get(_);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,Z.directionalShadow[D]=a,Z.directionalShadowMap[D]=u,Z.directionalShadowMatrix[D]=_.shadow.matrix,P++}Z.directional[D]=n,D++}else if(_.isSpotLight){let n=Q.get(_);n.position.setFromMatrixPosition(_.matrixWorld),n.color.copy(g).multiplyScalar(i),n.distance=x,n.coneCos=Math.cos(_.angle),n.penumbraCos=Math.cos(_.angle*(1-_.penumbra)),n.decay=_.decay,Z.spot[z]=n;let f=_.shadow;if(_.map){if(Z.spotLightMap[A]=_.map,A++,f.updateMatrices(_),_.castShadow)I++}if(Z.spotLightMatrix[z]=f.matrix,_.castShadow){let a=$.get(_);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,Z.spotShadow[z]=a,Z.spotShadowMap[z]=u,V++}z++}else if(_.isRectAreaLight){let n=Q.get(_);n.color.copy(g).multiplyScalar(i),n.halfWidth.set(_.width*0.5,0,0),n.halfHeight.set(0,_.height*0.5,0),Z.rectArea[q]=n,q++}else if(_.isPointLight){let n=Q.get(_);if(n.color.copy(_.color).multiplyScalar(_.intensity),n.distance=_.distance,n.decay=_.decay,_.castShadow){let f=_.shadow,a=$.get(_);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,a.shadowCameraNear=f.camera.near,a.shadowCameraFar=f.camera.far,Z.pointShadow[k]=a,Z.pointShadowMap[k]=u,Z.pointShadowMatrix[k]=_.shadow.matrix,C++}Z.point[k]=n,k++}else if(_.isHemisphereLight){let n=Q.get(_);n.skyColor.copy(_.color).multiplyScalar(i),n.groundColor.copy(_.groundColor).multiplyScalar(i),Z.hemi[F]=n,F++}}if(q>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=G0.LTC_FLOAT_1,Z.rectAreaLTC2=G0.LTC_FLOAT_2;else Z.rectAreaLTC1=G0.LTC_HALF_1,Z.rectAreaLTC2=G0.LTC_HALF_2;Z.ambient[0]=N,Z.ambient[1]=E,Z.ambient[2]=G;let R=Z.hash;if(R.directionalLength!==D||R.pointLength!==k||R.spotLength!==z||R.rectAreaLength!==q||R.hemiLength!==F||R.numDirectionalShadows!==P||R.numPointShadows!==C||R.numSpotShadows!==V||R.numSpotMaps!==A||R.numLightProbes!==w)Z.directional.length=D,Z.spot.length=z,Z.rectArea.length=q,Z.point.length=k,Z.hemi.length=F,Z.directionalShadow.length=P,Z.directionalShadowMap.length=P,Z.pointShadow.length=C,Z.pointShadowMap.length=C,Z.spotShadow.length=V,Z.spotShadowMap.length=V,Z.directionalShadowMatrix.length=P,Z.pointShadowMatrix.length=C,Z.spotLightMatrix.length=V+A-I,Z.spotLightMap.length=A,Z.numSpotLightShadowsWithMaps=I,Z.numLightProbes=w,R.directionalLength=D,R.pointLength=k,R.spotLength=z,R.rectAreaLength=q,R.hemiLength=F,R.numDirectionalShadows=P,R.numPointShadows=C,R.numSpotShadows=V,R.numSpotMaps=A,R.numLightProbes=w,Z.version=_G++}function X(U,N){let E=0,G=0,D=0,k=0,z=0,q=N.matrixWorldInverse;for(let F=0,P=U.length;F<P;F++){let C=U[F];if(C.isDirectionalLight){let V=Z.directional[E];V.direction.setFromMatrixPosition(C.matrixWorld),W.setFromMatrixPosition(C.target.matrixWorld),V.direction.sub(W),V.direction.transformDirection(q),E++}else if(C.isSpotLight){let V=Z.spot[D];V.position.setFromMatrixPosition(C.matrixWorld),V.position.applyMatrix4(q),V.direction.setFromMatrixPosition(C.matrixWorld),W.setFromMatrixPosition(C.target.matrixWorld),V.direction.sub(W),V.direction.transformDirection(q),D++}else if(C.isRectAreaLight){let V=Z.rectArea[k];V.position.setFromMatrixPosition(C.matrixWorld),V.position.applyMatrix4(q),H.identity(),K.copy(C.matrixWorld),K.premultiply(q),H.extractRotation(K),V.halfWidth.set(C.width*0.5,0,0),V.halfHeight.set(0,C.height*0.5,0),V.halfWidth.applyMatrix4(H),V.halfHeight.applyMatrix4(H),k++}else if(C.isPointLight){let V=Z.point[G];V.position.setFromMatrixPosition(C.matrixWorld),V.position.applyMatrix4(q),G++}else if(C.isHemisphereLight){let V=Z.hemi[z];V.direction.setFromMatrixPosition(C.matrixWorld),V.direction.transformDirection(q),z++}}}return{setup:Y,setupView:X,state:Z}}function jW(J){let Q=new wG(J),$=[],Z=[],W=[];function K(G){E.camera=G,$.length=0,Z.length=0,W.length=0}function H(G){$.push(G)}function Y(G){Z.push(G)}function X(G){W.push(G)}function U(){Q.setup($)}function N(G){Q.setupView($,G)}let E={lightsArray:$,shadowsArray:Z,lightProbeGridArray:W,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:E,setupLights:U,setupLightsView:N,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function PG(J){let Q=new WeakMap;function $(W,K=0){let H=Q.get(W),Y;if(H===void 0)Y=new jW(J),Q.set(W,[Y]);else if(K>=H.length)Y=new jW(J),H.push(Y);else Y=H[K];return Y}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var TG=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,SG=`uniform sampler2D shadow_pass;
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
}`,jG=[new v(1,0,0),new v(-1,0,0),new v(0,1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1)],yG=[new v(0,-1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1),new v(0,-1,0),new v(0,-1,0)],yW=new $J,X7=new v,M$=new v;function vG(J,Q,$){let Z=new H6,W=new d0,K=new d0,H=new KJ,Y=new aQ,X=new rQ,U={},N=$.maxTextureSize,E={[V8]:SJ,[SJ]:V8,[eJ]:eJ},G=new lJ({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new d0},radius:{value:4}},vertexShader:TG,fragmentShader:SG}),D=G.clone();D.defines.HORIZONTAL_PASS=1;let k=new CJ;k.setAttribute("position",new _J(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let z=new bJ(k,G),q=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=n8;let F=this.type;this.render=function(I,w,R){if(q.enabled===!1)return;if(q.autoUpdate===!1&&q.needsUpdate===!1)return;if(I.length===0)return;if(this.type===GZ)C0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=n8;let B=J.getRenderTarget(),p=J.getActiveCubeFace(),_=J.getActiveMipmapLevel(),g=J.state;if(g.setBlending(J9),g.buffers.depth.getReversed()===!0)g.buffers.color.setClear(0,0,0,0);else g.buffers.color.setClear(1,1,1,1);g.buffers.depth.setTest(!0),g.setScissorTest(!1);let i=F!==this.type;if(i)w.traverse(function(x){if(x.material)if(Array.isArray(x.material))x.material.forEach((u)=>u.needsUpdate=!0);else x.material.needsUpdate=!0});for(let x=0,u=I.length;x<u;x++){let n=I[x],f=n.shadow;if(f===void 0){C0("WebGLShadowMap:",n,"has no shadow.");continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;W.copy(f.mapSize);let a=f.getFrameExtents();if(W.multiply(a),K.copy(f.mapSize),W.x>N||W.y>N){if(W.x>N)K.x=Math.floor(N/a.x),W.x=K.x*a.x,f.mapSize.x=K.x;if(W.y>N)K.y=Math.floor(N/a.y),W.y=K.y*a.y,f.mapSize.y=K.y}let e=J.state.buffers.depth.getReversed();if(f.camera._reversedDepth=e,f.map===null||i===!0){if(f.map!==null){if(f.map.depthTexture!==null)f.map.depthTexture.dispose(),f.map.depthTexture=null;f.map.dispose()}if(this.type===L8){if(n.isPointLight){C0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}f.map=new mJ(W.x,W.y,{format:s9,type:D9,minFilter:VJ,magFilter:VJ,generateMipmaps:!1}),f.map.texture.name=n.name+".shadowMap",f.map.depthTexture=new v9(W.x,W.y,F9),f.map.depthTexture.name=n.name+".shadowMapDepth",f.map.depthTexture.format=c9,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=T9,f.map.depthTexture.magFilter=T9}else{if(n.isPointLight)f.map=new z$(W.x),f.map.depthTexture=new sQ(W.x,S9);else f.map=new mJ(W.x,W.y),f.map.depthTexture=new v9(W.x,W.y,S9);if(f.map.depthTexture.name=n.name+".shadowMap",f.map.depthTexture.format=c9,this.type===n8)f.map.depthTexture.compareFunction=e?t7:r7,f.map.depthTexture.minFilter=VJ,f.map.depthTexture.magFilter=VJ;else f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=T9,f.map.depthTexture.magFilter=T9}f.camera.updateProjectionMatrix()}let Z0=f.map.isWebGLCubeRenderTarget?6:1;for(let M0=0;M0<Z0;M0++){if(f.map.isWebGLCubeRenderTarget)J.setRenderTarget(f.map,M0),J.clear();else{if(M0===0)J.setRenderTarget(f.map),J.clear();let k0=f.getViewport(M0);H.set(K.x*k0.x,K.y*k0.y,K.x*k0.z,K.y*k0.w),g.viewport(H)}if(n.isPointLight){let{camera:k0,matrix:e0}=f,j0=n.distance||k0.far;if(j0!==k0.far)k0.far=j0,k0.updateProjectionMatrix();X7.setFromMatrixPosition(n.matrixWorld),k0.position.copy(X7),M$.copy(k0.position),M$.add(jG[M0]),k0.up.copy(yG[M0]),k0.lookAt(M$),k0.updateMatrixWorld(),e0.makeTranslation(-X7.x,-X7.y,-X7.z),yW.multiplyMatrices(k0.projectionMatrix,k0.matrixWorldInverse),f._frustum.setFromProjectionMatrix(yW,k0.coordinateSystem,k0.reversedDepth)}else f.updateMatrices(n);Z=f.getFrustum(),V(w,R,f.camera,n,this.type)}if(f.isPointLightShadow!==!0&&this.type===L8)P(f,R);f.needsUpdate=!1}F=this.type,q.needsUpdate=!1,J.setRenderTarget(B,p,_)};function P(I,w){let R=Q.update(z);if(G.defines.VSM_SAMPLES!==I.blurSamples)G.defines.VSM_SAMPLES=I.blurSamples,D.defines.VSM_SAMPLES=I.blurSamples,G.needsUpdate=!0,D.needsUpdate=!0;if(I.mapPass===null)I.mapPass=new mJ(W.x,W.y,{format:s9,type:D9});G.uniforms.shadow_pass.value=I.map.depthTexture,G.uniforms.resolution.value=I.mapSize,G.uniforms.radius.value=I.radius,J.setRenderTarget(I.mapPass),J.clear(),J.renderBufferDirect(w,null,R,G,z,null),D.uniforms.shadow_pass.value=I.mapPass.texture,D.uniforms.resolution.value=I.mapSize,D.uniforms.radius.value=I.radius,J.setRenderTarget(I.map),J.clear(),J.renderBufferDirect(w,null,R,D,z,null)}function C(I,w,R,B){let p=null,_=R.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(_!==void 0)p=_;else if(p=R.isPointLight===!0?X:Y,J.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let g=p.uuid,i=w.uuid,x=U[g];if(x===void 0)x={},U[g]=x;let u=x[i];if(u===void 0)u=p.clone(),x[i]=u,w.addEventListener("dispose",A);p=u}if(p.visible=w.visible,p.wireframe=w.wireframe,B===L8)p.side=w.shadowSide!==null?w.shadowSide:w.side;else p.side=w.shadowSide!==null?w.shadowSide:E[w.side];if(p.alphaMap=w.alphaMap,p.alphaTest=w.alphaToCoverage===!0?0.5:w.alphaTest,p.map=w.map,p.clipShadows=w.clipShadows,p.clippingPlanes=w.clippingPlanes,p.clipIntersection=w.clipIntersection,p.displacementMap=w.displacementMap,p.displacementScale=w.displacementScale,p.displacementBias=w.displacementBias,p.wireframeLinewidth=w.wireframeLinewidth,p.linewidth=w.linewidth,R.isPointLight===!0&&p.isMeshDistanceMaterial===!0){let g=J.properties.get(p);g.light=R}return p}function V(I,w,R,B,p){if(I.visible===!1)return;if(I.layers.test(w.layers)&&(I.isMesh||I.isLine||I.isPoints)){if((I.castShadow||I.receiveShadow&&p===L8)&&(!I.frustumCulled||Z.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,I.matrixWorld);let i=Q.update(I),x=I.material;if(Array.isArray(x)){let u=i.groups;for(let n=0,f=u.length;n<f;n++){let a=u[n],e=x[a.materialIndex];if(e&&e.visible){let Z0=C(I,e,B,p);I.onBeforeShadow(J,I,w,R,i,Z0,a),J.renderBufferDirect(R,null,i,Z0,I,a),I.onAfterShadow(J,I,w,R,i,Z0,a)}}}else if(x.visible){let u=C(I,x,B,p);I.onBeforeShadow(J,I,w,R,i,u,null),J.renderBufferDirect(R,null,i,u,I,null),I.onAfterShadow(J,I,w,R,i,u,null)}}}let g=I.children;for(let i=0,x=g.length;i<x;i++)V(g[i],w,R,B,p)}function A(I){I.target.removeEventListener("dispose",A);for(let R in U){let B=U[R],p=I.target.uuid;if(p in B)B[p].dispose(),delete B[p]}}}function fG(J,Q){function $(){let S=!1,W0=new KJ,s=null,H0=new KJ(0,0,0,0);return{setMask:function(D0){if(s!==D0&&!S)J.colorMask(D0,D0,D0,D0),s=D0},setLocked:function(D0){S=D0},setClear:function(D0,r,Y0,y0,HJ){if(HJ===!0)D0*=y0,r*=y0,Y0*=y0;if(W0.set(D0,r,Y0,y0),H0.equals(W0)===!1)J.clearColor(D0,r,Y0,y0),H0.copy(W0)},reset:function(){S=!1,s=null,H0.set(-1,0,0,0)}}}function Z(){let S=!1,W0=!1,s=null,H0=null,D0=null;return{setReversed:function(r){if(W0!==r){let Y0=Q.get("EXT_clip_control");if(r)Y0.clipControlEXT(Y0.LOWER_LEFT_EXT,Y0.ZERO_TO_ONE_EXT);else Y0.clipControlEXT(Y0.LOWER_LEFT_EXT,Y0.NEGATIVE_ONE_TO_ONE_EXT);W0=r;let y0=D0;D0=null,this.setClear(y0)}},getReversed:function(){return W0},setTest:function(r){if(r)K0(J.DEPTH_TEST);else I0(J.DEPTH_TEST)},setMask:function(r){if(s!==r&&!S)J.depthMask(r),s=r},setFunc:function(r){if(W0)r=YW[r];if(H0!==r){switch(r){case SZ:J.depthFunc(J.NEVER);break;case jZ:J.depthFunc(J.ALWAYS);break;case yZ:J.depthFunc(J.LESS);break;case s6:J.depthFunc(J.LEQUAL);break;case vZ:J.depthFunc(J.EQUAL);break;case fZ:J.depthFunc(J.GEQUAL);break;case bZ:J.depthFunc(J.GREATER);break;case hZ:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}H0=r}},setLocked:function(r){S=r},setClear:function(r){if(D0!==r){if(D0=r,W0)r=1-r;J.clearDepth(r)}},reset:function(){S=!1,s=null,H0=null,D0=null,W0=!1}}}function W(){let S=!1,W0=null,s=null,H0=null,D0=null,r=null,Y0=null,y0=null,HJ=null;return{setTest:function(JJ){if(!S)if(JJ)K0(J.STENCIL_TEST);else I0(J.STENCIL_TEST)},setMask:function(JJ){if(W0!==JJ&&!S)J.stencilMask(JJ),W0=JJ},setFunc:function(JJ,aJ,H9){if(s!==JJ||H0!==aJ||D0!==H9)J.stencilFunc(JJ,aJ,H9),s=JJ,H0=aJ,D0=H9},setOp:function(JJ,aJ,H9){if(r!==JJ||Y0!==aJ||y0!==H9)J.stencilOp(JJ,aJ,H9),r=JJ,Y0=aJ,y0=H9},setLocked:function(JJ){S=JJ},setClear:function(JJ){if(HJ!==JJ)J.clearStencil(JJ),HJ=JJ},reset:function(){S=!1,W0=null,s=null,H0=null,D0=null,r=null,Y0=null,y0=null,HJ=null}}}let K=new $,H=new Z,Y=new W,X=new WeakMap,U=new WeakMap,N={},E={},G={},D=new WeakMap,k=[],z=null,q=!1,F=null,P=null,C=null,V=null,A=null,I=null,w=null,R=new m0(0,0,0),B=0,p=!1,_=null,g=null,i=null,x=null,u=null,n=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),f=!1,a=0,e=J.getParameter(J.VERSION);if(e.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(e)[1]),f=a>=1;else if(e.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(e)[1]),f=a>=2;let Z0=null,M0={},k0=J.getParameter(J.SCISSOR_BOX),e0=J.getParameter(J.VIEWPORT),j0=new KJ().fromArray(k0),c=new KJ().fromArray(e0);function $0(S,W0,s,H0){let D0=new Uint8Array(4),r=J.createTexture();J.bindTexture(S,r),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let Y0=0;Y0<s;Y0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D(W0,0,J.RGBA,1,1,H0,0,J.RGBA,J.UNSIGNED_BYTE,D0);else J.texImage2D(W0+Y0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,D0);return r}let N0={};N0[J.TEXTURE_2D]=$0(J.TEXTURE_2D,J.TEXTURE_2D,1),N0[J.TEXTURE_CUBE_MAP]=$0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),N0[J.TEXTURE_2D_ARRAY]=$0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),N0[J.TEXTURE_3D]=$0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),K0(J.DEPTH_TEST),H.setFunc(s6),XJ(!1),ZJ(d6),K0(J.CULL_FACE),f0(J9);function K0(S){if(N[S]!==!0)J.enable(S),N[S]=!0}function I0(S){if(N[S]!==!1)J.disable(S),N[S]=!1}function l0(S,W0){if(G[S]!==W0){if(J.bindFramebuffer(S,W0),G[S]=W0,S===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=W0;if(S===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=W0;return!0}return!1}function B0(S,W0){let s=k,H0=!1;if(S){if(s=D.get(W0),s===void 0)s=[],D.set(W0,s);let D0=S.textures;if(s.length!==D0.length||s[0]!==J.COLOR_ATTACHMENT0){for(let r=0,Y0=D0.length;r<Y0;r++)s[r]=J.COLOR_ATTACHMENT0+r;s.length=D0.length,H0=!0}}else if(s[0]!==J.BACK)s[0]=J.BACK,H0=!0;if(H0)J.drawBuffers(s)}function T0(S){if(z!==S)return J.useProgram(S),z=S,!0;return!1}let n0={[B8]:J.FUNC_ADD,[EZ]:J.FUNC_SUBTRACT,[qZ]:J.FUNC_REVERSE_SUBTRACT};n0[FZ]=J.MIN,n0[DZ]=J.MAX;let h0={[OZ]:J.ZERO,[RZ]:J.ONE,[kZ]:J.SRC_COLOR,[LZ]:J.SRC_ALPHA,[_Z]:J.SRC_ALPHA_SATURATE,[IZ]:J.DST_COLOR,[BZ]:J.DST_ALPHA,[MZ]:J.ONE_MINUS_SRC_COLOR,[VZ]:J.ONE_MINUS_SRC_ALPHA,[AZ]:J.ONE_MINUS_DST_COLOR,[zZ]:J.ONE_MINUS_DST_ALPHA,[CZ]:J.CONSTANT_COLOR,[wZ]:J.ONE_MINUS_CONSTANT_COLOR,[PZ]:J.CONSTANT_ALPHA,[TZ]:J.ONE_MINUS_CONSTANT_ALPHA};function f0(S,W0,s,H0,D0,r,Y0,y0,HJ,JJ){if(S===J9){if(q===!0)I0(J.BLEND),q=!1;return}if(q===!1)K0(J.BLEND),q=!0;if(S!==NZ){if(S!==F||JJ!==p){if(P!==B8||A!==B8)J.blendEquation(J.FUNC_ADD),P=B8,A=B8;if(JJ)switch(S){case s8:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case u6:J.blendFunc(J.ONE,J.ONE);break;case c6:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case n6:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:P0("WebGLState: Invalid blending: ",S);break}else switch(S){case s8:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case u6:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case c6:P0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case n6:P0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:P0("WebGLState: Invalid blending: ",S);break}C=null,V=null,I=null,w=null,R.set(0,0,0),B=0,F=S,p=JJ}return}if(D0=D0||W0,r=r||s,Y0=Y0||H0,W0!==P||D0!==A)J.blendEquationSeparate(n0[W0],n0[D0]),P=W0,A=D0;if(s!==C||H0!==V||r!==I||Y0!==w)J.blendFuncSeparate(h0[s],h0[H0],h0[r],h0[Y0]),C=s,V=H0,I=r,w=Y0;if(y0.equals(R)===!1||HJ!==B)J.blendColor(y0.r,y0.g,y0.b,HJ),R.copy(y0),B=HJ;F=S,p=!1}function NJ(S,W0){S.side===eJ?I0(J.CULL_FACE):K0(J.CULL_FACE);let s=S.side===SJ;if(W0)s=!s;XJ(s),S.blending===s8&&S.transparent===!1?f0(J9):f0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),K.setMask(S.colorWrite);let H0=S.stencilWrite;if(Y.setTest(H0),H0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);RJ(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?K0(J.SAMPLE_ALPHA_TO_COVERAGE):I0(J.SAMPLE_ALPHA_TO_COVERAGE)}function XJ(S){if(_!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);_=S}}function ZJ(S){if(S!==XZ){if(K0(J.CULL_FACE),S!==g)if(S===d6)J.cullFace(J.BACK);else if(S===UZ)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else I0(J.CULL_FACE);g=S}function MJ(S){if(S!==i){if(f)J.lineWidth(S);i=S}}function RJ(S,W0,s){if(S){if(K0(J.POLYGON_OFFSET_FILL),x!==W0||u!==s){if(x=W0,u=s,H.getReversed())W0=-W0;J.polygonOffset(W0,s)}}else I0(J.POLYGON_OFFSET_FILL)}function qJ(S){if(S)K0(J.SCISSOR_TEST);else I0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+n-1;if(Z0!==S)J.activeTexture(S),Z0=S}function hJ(S,W0,s){if(s===void 0)if(Z0===null)s=J.TEXTURE0+n-1;else s=Z0;let H0=M0[s];if(H0===void 0)H0={type:void 0,texture:void 0},M0[s]=H0;if(H0.type!==S||H0.texture!==W0){if(Z0!==s)J.activeTexture(s),Z0=s;J.bindTexture(S,W0||N0[S]),H0.type=S,H0.texture=W0}}function s0(){let S=M0[Z0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function WJ(){try{J.compressedTexImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function L(){try{J.compressedTexImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function O(){try{J.texSubImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function l(){try{J.compressedTexSubImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function t(){try{J.compressedTexSubImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function J0(){try{J.texStorage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function X0(){try{J.texStorage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function d(){try{J.texImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function o(){try{J.texImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function F0(S){if(E[S]!==void 0)return E[S];else return J.getParameter(S)}function V0(S,W0){if(E[S]!==W0)J.pixelStorei(S,W0),E[S]=W0}function U0(S){if(j0.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),j0.copy(S)}function Q0(S){if(c.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),c.copy(S)}function _0(S,W0){let s=U.get(W0);if(s===void 0)s=new WeakMap,U.set(W0,s);let H0=s.get(S);if(H0===void 0)H0=J.getUniformBlockIndex(W0,S.name),s.set(S,H0)}function w0(S,W0){let H0=U.get(W0).get(S);if(X.get(W0)!==H0)J.uniformBlockBinding(W0,H0,S.__bindingPointIndex),X.set(W0,H0)}function c0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},E={},Z0=null,M0={},G={},D=new WeakMap,k=[],z=null,q=!1,F=null,P=null,C=null,V=null,A=null,I=null,w=null,R=new m0(0,0,0),B=0,p=!1,_=null,g=null,i=null,x=null,u=null,j0.set(0,0,J.canvas.width,J.canvas.height),c.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:K0,disable:I0,bindFramebuffer:l0,drawBuffers:B0,useProgram:T0,setBlending:f0,setMaterial:NJ,setFlipSided:XJ,setCullFace:ZJ,setLineWidth:MJ,setPolygonOffset:RJ,setScissorTest:qJ,activeTexture:j,bindTexture:hJ,unbindTexture:s0,compressedTexImage2D:WJ,compressedTexImage3D:L,texImage2D:d,texImage3D:o,pixelStorei:V0,getParameter:F0,updateUBOMapping:_0,uniformBlockBinding:w0,texStorage2D:J0,texStorage3D:X0,texSubImage2D:O,texSubImage3D:T,compressedTexSubImage2D:l,compressedTexSubImage3D:t,scissor:U0,viewport:Q0,reset:c0}}function bG(J,Q,$,Z,W,K,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new d0,N=new WeakMap,E=new Set,G,D=new WeakMap,k=!1;try{k=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(L){}function z(L,O){return k?new OffscreenCanvas(L,O):c8("canvas")}function q(L,O,T){let l=1,t=WJ(L);if(t.width>T||t.height>T)l=T/Math.max(t.width,t.height);if(l<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let J0=Math.floor(l*t.width),X0=Math.floor(l*t.height);if(G===void 0)G=z(J0,X0);let d=O?z(J0,X0):G;return d.width=J0,d.height=X0,d.getContext("2d").drawImage(L,0,0,J0,X0),C0("WebGLRenderer: Texture has been resized from ("+t.width+"x"+t.height+") to ("+J0+"x"+X0+")."),d}else{if("data"in L)C0("WebGLRenderer: Image in DataTexture is too big ("+t.width+"x"+t.height+").");return L}return L}function F(L){return L.generateMipmaps}function P(L){J.generateMipmap(L)}function C(L){if(L.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(L.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function V(L,O,T,l,t,J0=!1){if(L!==null){if(J[L]!==void 0)return J[L];C0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let X0;if(l){if(X0=Q.get("EXT_texture_norm16"),!X0)C0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let d=O;if(O===J.RED){if(T===J.FLOAT)d=J.R32F;if(T===J.HALF_FLOAT)d=J.R16F;if(T===J.UNSIGNED_BYTE)d=J.R8;if(T===J.UNSIGNED_SHORT&&X0)d=X0.R16_EXT;if(T===J.SHORT&&X0)d=X0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)d=J.R8UI;if(T===J.UNSIGNED_SHORT)d=J.R16UI;if(T===J.UNSIGNED_INT)d=J.R32UI;if(T===J.BYTE)d=J.R8I;if(T===J.SHORT)d=J.R16I;if(T===J.INT)d=J.R32I}if(O===J.RG){if(T===J.FLOAT)d=J.RG32F;if(T===J.HALF_FLOAT)d=J.RG16F;if(T===J.UNSIGNED_BYTE)d=J.RG8;if(T===J.UNSIGNED_SHORT&&X0)d=X0.RG16_EXT;if(T===J.SHORT&&X0)d=X0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)d=J.RG8UI;if(T===J.UNSIGNED_SHORT)d=J.RG16UI;if(T===J.UNSIGNED_INT)d=J.RG32UI;if(T===J.BYTE)d=J.RG8I;if(T===J.SHORT)d=J.RG16I;if(T===J.INT)d=J.RG32I}if(O===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)d=J.RGB8UI;if(T===J.UNSIGNED_SHORT)d=J.RGB16UI;if(T===J.UNSIGNED_INT)d=J.RGB32UI;if(T===J.BYTE)d=J.RGB8I;if(T===J.SHORT)d=J.RGB16I;if(T===J.INT)d=J.RGB32I}if(O===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)d=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)d=J.RGBA16UI;if(T===J.UNSIGNED_INT)d=J.RGBA32UI;if(T===J.BYTE)d=J.RGBA8I;if(T===J.SHORT)d=J.RGBA16I;if(T===J.INT)d=J.RGBA32I}if(O===J.RGB){if(T===J.UNSIGNED_SHORT&&X0)d=X0.RGB16_EXT;if(T===J.SHORT&&X0)d=X0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)d=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)d=J.R11F_G11F_B10F}if(O===J.RGBA){let o=J0?xQ:g0.getTransfer(t);if(T===J.FLOAT)d=J.RGBA32F;if(T===J.HALF_FLOAT)d=J.RGBA16F;if(T===J.UNSIGNED_BYTE)d=o===t0?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&X0)d=X0.RGBA16_EXT;if(T===J.SHORT&&X0)d=X0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)d=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)d=J.RGB5_A1}if(d===J.R16F||d===J.R32F||d===J.RG16F||d===J.RG32F||d===J.RGBA16F||d===J.RGBA32F)Q.get("EXT_color_buffer_float");return d}function A(L,O){let T;if(L){if(O===null||O===S9||O===I8)T=J.DEPTH24_STENCIL8;else if(O===F9)T=J.DEPTH32F_STENCIL8;else if(O===r8)T=J.DEPTH24_STENCIL8,C0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===S9||O===I8)T=J.DEPTH_COMPONENT24;else if(O===F9)T=J.DEPTH_COMPONENT32F;else if(O===r8)T=J.DEPTH_COMPONENT16;return T}function I(L,O){if(F(L)===!0||L.isFramebufferTexture&&L.minFilter!==T9&&L.minFilter!==VJ)return Math.log2(Math.max(O.width,O.height))+1;else if(L.mipmaps!==void 0&&L.mipmaps.length>0)return L.mipmaps.length;else if(L.isCompressedTexture&&Array.isArray(L.image))return O.mipmaps.length;else return 1}function w(L){let O=L.target;if(O.removeEventListener("dispose",w),B(O),O.isVideoTexture)N.delete(O);if(O.isHTMLTexture)E.delete(O)}function R(L){let O=L.target;O.removeEventListener("dispose",R),_(O)}function B(L){let O=Z.get(L);if(O.__webglInit===void 0)return;let T=L.source,l=D.get(T);if(l){let t=l[O.__cacheKey];if(t.usedTimes--,t.usedTimes===0)p(L);if(Object.keys(l).length===0)D.delete(T)}Z.remove(L)}function p(L){let O=Z.get(L);J.deleteTexture(O.__webglTexture);let T=L.source,l=D.get(T);delete l[O.__cacheKey],H.memory.textures--}function _(L){let O=Z.get(L);if(L.depthTexture)L.depthTexture.dispose(),Z.remove(L.depthTexture);if(L.isWebGLCubeRenderTarget)for(let l=0;l<6;l++){if(Array.isArray(O.__webglFramebuffer[l]))for(let t=0;t<O.__webglFramebuffer[l].length;t++)J.deleteFramebuffer(O.__webglFramebuffer[l][t]);else J.deleteFramebuffer(O.__webglFramebuffer[l]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[l])}else{if(Array.isArray(O.__webglFramebuffer))for(let l=0;l<O.__webglFramebuffer.length;l++)J.deleteFramebuffer(O.__webglFramebuffer[l]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let l=0;l<O.__webglColorRenderbuffer.length;l++)if(O.__webglColorRenderbuffer[l])J.deleteRenderbuffer(O.__webglColorRenderbuffer[l])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let T=L.textures;for(let l=0,t=T.length;l<t;l++){let J0=Z.get(T[l]);if(J0.__webglTexture)J.deleteTexture(J0.__webglTexture),H.memory.textures--;Z.remove(T[l])}Z.remove(L)}let g=0;function i(){g=0}function x(){return g}function u(L){g=L}function n(){let L=g;if(L>=W.maxTextures)C0("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+W.maxTextures);return g+=1,L}function f(L){let O=[];return O.push(L.wrapS),O.push(L.wrapT),O.push(L.wrapR||0),O.push(L.magFilter),O.push(L.minFilter),O.push(L.anisotropy),O.push(L.internalFormat),O.push(L.format),O.push(L.type),O.push(L.generateMipmaps),O.push(L.premultiplyAlpha),O.push(L.flipY),O.push(L.unpackAlignment),O.push(L.colorSpace),O.join()}function a(L,O){let T=Z.get(L);if(L.isVideoTexture)hJ(L);if(L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&T.__version!==L.version){let l=L.image;if(l===null)C0("WebGLRenderer: Texture marked for update but no image data found.");else if(l.complete===!1)C0("WebGLRenderer: Texture marked for update but image is incomplete");else{I0(T,L,O);return}}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+O)}function e(L,O){let T=Z.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){I0(T,L,O);return}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+O)}function Z0(L,O){let T=Z.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){I0(T,L,O);return}$.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+O)}function M0(L,O){let T=Z.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&T.__version!==L.version){l0(T,L,O);return}$.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+O)}let k0={[mZ]:J.REPEAT,[d7]:J.CLAMP_TO_EDGE,[lZ]:J.MIRRORED_REPEAT},e0={[T9]:J.NEAREST,[dZ]:J.NEAREST_MIPMAP_NEAREST,[a8]:J.NEAREST_MIPMAP_LINEAR,[VJ]:J.LINEAR,[u7]:J.LINEAR_MIPMAP_NEAREST,[u9]:J.LINEAR_MIPMAP_LINEAR},j0={[tZ]:J.NEVER,[ZW]:J.ALWAYS,[eZ]:J.LESS,[r7]:J.LEQUAL,[JW]:J.EQUAL,[t7]:J.GEQUAL,[QW]:J.GREATER,[$W]:J.NOTEQUAL};function c(L,O){if(O.type===F9&&Q.has("OES_texture_float_linear")===!1&&(O.magFilter===VJ||O.magFilter===u7||O.magFilter===a8||O.magFilter===u9||O.minFilter===VJ||O.minFilter===u7||O.minFilter===a8||O.minFilter===u9))C0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(L,J.TEXTURE_WRAP_S,k0[O.wrapS]),J.texParameteri(L,J.TEXTURE_WRAP_T,k0[O.wrapT]),L===J.TEXTURE_3D||L===J.TEXTURE_2D_ARRAY)J.texParameteri(L,J.TEXTURE_WRAP_R,k0[O.wrapR]);if(J.texParameteri(L,J.TEXTURE_MAG_FILTER,e0[O.magFilter]),J.texParameteri(L,J.TEXTURE_MIN_FILTER,e0[O.minFilter]),O.compareFunction)J.texParameteri(L,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(L,J.TEXTURE_COMPARE_FUNC,j0[O.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===T9)return;if(O.minFilter!==a8&&O.minFilter!==u9)return;if(O.type===F9&&Q.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||Z.get(O).__currentAnisotropy){let T=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(L,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,W.getMaxAnisotropy())),Z.get(O).__currentAnisotropy=O.anisotropy}}}function $0(L,O){let T=!1;if(L.__webglInit===void 0)L.__webglInit=!0,O.addEventListener("dispose",w);let l=O.source,t=D.get(l);if(t===void 0)t={},D.set(l,t);let J0=f(O);if(J0!==L.__cacheKey){if(t[J0]===void 0)t[J0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,T=!0;t[J0].usedTimes++;let X0=t[L.__cacheKey];if(X0!==void 0){if(t[L.__cacheKey].usedTimes--,X0.usedTimes===0)p(O)}L.__cacheKey=J0,L.__webglTexture=t[J0].texture}return T}function N0(L,O,T){return Math.floor(Math.floor(L/T)/O)}function K0(L,O,T,l){let J0=L.updateRanges;if(J0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,T,l,O.data);else{J0.sort((V0,U0)=>V0.start-U0.start);let X0=0;for(let V0=1;V0<J0.length;V0++){let U0=J0[X0],Q0=J0[V0],_0=U0.start+U0.count,w0=N0(Q0.start,O.width,4),c0=N0(U0.start,O.width,4);if(Q0.start<=_0+1&&w0===c0&&N0(Q0.start+Q0.count-1,O.width,4)===w0)U0.count=Math.max(U0.count,Q0.start+Q0.count-U0.start);else++X0,J0[X0]=Q0}J0.length=X0+1;let d=$.getParameter(J.UNPACK_ROW_LENGTH),o=$.getParameter(J.UNPACK_SKIP_PIXELS),F0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let V0=0,U0=J0.length;V0<U0;V0++){let Q0=J0[V0],_0=Math.floor(Q0.start/4),w0=Math.ceil(Q0.count/4),c0=_0%O.width,S=Math.floor(_0/O.width),W0=w0,s=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,c0),$.pixelStorei(J.UNPACK_SKIP_ROWS,S),$.texSubImage2D(J.TEXTURE_2D,0,c0,S,W0,1,T,l,O.data)}L.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,d),$.pixelStorei(J.UNPACK_SKIP_PIXELS,o),$.pixelStorei(J.UNPACK_SKIP_ROWS,F0)}}function I0(L,O,T){let l=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)l=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)l=J.TEXTURE_3D;let t=$0(L,O),J0=O.source;$.bindTexture(l,L.__webglTexture,J.TEXTURE0+T);let X0=Z.get(J0);if(J0.version!==X0.__version||t===!0){if($.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let s=g0.getPrimaries(g0.workingColorSpace),H0=O.colorSpace===i9?null:g0.getPrimaries(O.colorSpace),D0=O.colorSpace===i9||s===H0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,D0)}$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let o=q(O.image,!1,W.maxTextureSize);o=s0(O,o);let F0=K.convert(O.format,O.colorSpace),V0=K.convert(O.type),U0=V(O.internalFormat,F0,V0,O.normalized,O.colorSpace,O.isVideoTexture);c(l,O);let Q0,_0=O.mipmaps,w0=O.isVideoTexture!==!0,c0=X0.__version===void 0||t===!0,S=J0.dataReady,W0=I(O,o);if(O.isDepthTexture){if(U0=A(O.format===n9,O.type),c0)if(w0)$.texStorage2D(J.TEXTURE_2D,1,U0,o.width,o.height);else $.texImage2D(J.TEXTURE_2D,0,U0,o.width,o.height,0,F0,V0,null)}else if(O.isDataTexture)if(_0.length>0){if(w0&&c0)$.texStorage2D(J.TEXTURE_2D,W0,U0,_0[0].width,_0[0].height);for(let s=0,H0=_0.length;s<H0;s++)if(Q0=_0[s],w0){if(S)$.texSubImage2D(J.TEXTURE_2D,s,0,0,Q0.width,Q0.height,F0,V0,Q0.data)}else $.texImage2D(J.TEXTURE_2D,s,U0,Q0.width,Q0.height,0,F0,V0,Q0.data);O.generateMipmaps=!1}else if(w0){if(c0)$.texStorage2D(J.TEXTURE_2D,W0,U0,o.width,o.height);if(S)K0(O,o,F0,V0)}else $.texImage2D(J.TEXTURE_2D,0,U0,o.width,o.height,0,F0,V0,o.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(w0&&c0)$.texStorage3D(J.TEXTURE_2D_ARRAY,W0,U0,_0[0].width,_0[0].height,o.depth);for(let s=0,H0=_0.length;s<H0;s++)if(Q0=_0[s],O.format!==Q9)if(F0!==null)if(w0){if(S)if(O.layerUpdates.size>0){let D0=q$(Q0.width,Q0.height,O.format,O.type);for(let r of O.layerUpdates){let Y0=Q0.data.subarray(r*D0/Q0.data.BYTES_PER_ELEMENT,(r+1)*D0/Q0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,r,Q0.width,Q0.height,1,F0,Y0)}O.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,Q0.width,Q0.height,o.depth,F0,Q0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,s,U0,Q0.width,Q0.height,o.depth,0,Q0.data,0,0);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(w0){if(S)$.texSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,Q0.width,Q0.height,o.depth,F0,V0,Q0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,s,U0,Q0.width,Q0.height,o.depth,0,F0,V0,Q0.data)}else{if(w0&&c0)$.texStorage2D(J.TEXTURE_2D,W0,U0,_0[0].width,_0[0].height);for(let s=0,H0=_0.length;s<H0;s++)if(Q0=_0[s],O.format!==Q9)if(F0!==null)if(w0){if(S)$.compressedTexSubImage2D(J.TEXTURE_2D,s,0,0,Q0.width,Q0.height,F0,Q0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,s,U0,Q0.width,Q0.height,0,Q0.data);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(w0){if(S)$.texSubImage2D(J.TEXTURE_2D,s,0,0,Q0.width,Q0.height,F0,V0,Q0.data)}else $.texImage2D(J.TEXTURE_2D,s,U0,Q0.width,Q0.height,0,F0,V0,Q0.data)}else if(O.isDataArrayTexture)if(w0){if(c0)$.texStorage3D(J.TEXTURE_2D_ARRAY,W0,U0,o.width,o.height,o.depth);if(S)if(O.layerUpdates.size>0){let s=q$(o.width,o.height,O.format,O.type);for(let H0 of O.layerUpdates){let D0=o.data.subarray(H0*s/o.data.BYTES_PER_ELEMENT,(H0+1)*s/o.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,H0,o.width,o.height,1,F0,V0,D0)}O.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,o.width,o.height,o.depth,F0,V0,o.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,U0,o.width,o.height,o.depth,0,F0,V0,o.data);else if(O.isData3DTexture)if(w0){if(c0)$.texStorage3D(J.TEXTURE_3D,W0,U0,o.width,o.height,o.depth);if(S)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,o.width,o.height,o.depth,F0,V0,o.data)}else $.texImage3D(J.TEXTURE_3D,0,U0,o.width,o.height,o.depth,0,F0,V0,o.data);else if(O.isFramebufferTexture){if(c0)if(w0)$.texStorage2D(J.TEXTURE_2D,W0,U0,o.width,o.height);else{let{width:s,height:H0}=o;for(let D0=0;D0<W0;D0++)$.texImage2D(J.TEXTURE_2D,D0,U0,s,H0,0,F0,V0,null),s>>=1,H0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let s=J.canvas;if(!s.hasAttribute("layoutsubtree"))s.setAttribute("layoutsubtree","true");if(o.parentNode!==s){s.appendChild(o),E.add(O),s.onpaint=(H0)=>{let D0=H0.changedElements;for(let r of E)if(D0.includes(r.image))r.needsUpdate=!0},s.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,o);else{let{RGBA:D0,RGBA:r,UNSIGNED_BYTE:Y0}=J;J.texElementImage2D(J.TEXTURE_2D,0,D0,r,Y0,o)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(_0.length>0){if(w0&&c0){let s=WJ(_0[0]);$.texStorage2D(J.TEXTURE_2D,W0,U0,s.width,s.height)}for(let s=0,H0=_0.length;s<H0;s++)if(Q0=_0[s],w0){if(S)$.texSubImage2D(J.TEXTURE_2D,s,0,0,F0,V0,Q0)}else $.texImage2D(J.TEXTURE_2D,s,U0,F0,V0,Q0);O.generateMipmaps=!1}else if(w0){if(c0){let s=WJ(o);$.texStorage2D(J.TEXTURE_2D,W0,U0,s.width,s.height)}if(S)$.texSubImage2D(J.TEXTURE_2D,0,0,0,F0,V0,o)}else $.texImage2D(J.TEXTURE_2D,0,U0,F0,V0,o);if(F(O))P(l);if(X0.__version=J0.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function l0(L,O,T){if(O.image.length!==6)return;let l=$0(L,O),t=O.source;$.bindTexture(J.TEXTURE_CUBE_MAP,L.__webglTexture,J.TEXTURE0+T);let J0=Z.get(t);if(t.version!==J0.__version||l===!0){$.activeTexture(J.TEXTURE0+T);let X0=g0.getPrimaries(g0.workingColorSpace),d=O.colorSpace===i9?null:g0.getPrimaries(O.colorSpace),o=O.colorSpace===i9||X0===d?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,o);let F0=O.isCompressedTexture||O.image[0].isCompressedTexture,V0=O.image[0]&&O.image[0].isDataTexture,U0=[];for(let r=0;r<6;r++){if(!F0&&!V0)U0[r]=q(O.image[r],!0,W.maxCubemapSize);else U0[r]=V0?O.image[r].image:O.image[r];U0[r]=s0(O,U0[r])}let Q0=U0[0],_0=K.convert(O.format,O.colorSpace),w0=K.convert(O.type),c0=V(O.internalFormat,_0,w0,O.normalized,O.colorSpace),S=O.isVideoTexture!==!0,W0=J0.__version===void 0||l===!0,s=t.dataReady,H0=I(O,Q0);c(J.TEXTURE_CUBE_MAP,O);let D0;if(F0){if(S&&W0)$.texStorage2D(J.TEXTURE_CUBE_MAP,H0,c0,Q0.width,Q0.height);for(let r=0;r<6;r++){D0=U0[r].mipmaps;for(let Y0=0;Y0<D0.length;Y0++){let y0=D0[Y0];if(O.format!==Q9)if(_0!==null)if(S){if(s)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0,0,0,y0.width,y0.height,_0,y0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0,c0,y0.width,y0.height,0,y0.data);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0,0,0,y0.width,y0.height,_0,w0,y0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0,c0,y0.width,y0.height,0,_0,w0,y0.data)}}}else{if(D0=O.mipmaps,S&&W0){if(D0.length>0)H0++;let r=WJ(U0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,H0,c0,r.width,r.height)}for(let r=0;r<6;r++)if(V0){if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,U0[r].width,U0[r].height,_0,w0,U0[r].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,c0,U0[r].width,U0[r].height,0,_0,w0,U0[r].data);for(let Y0=0;Y0<D0.length;Y0++){let HJ=D0[Y0].image[r].image;if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0+1,0,0,HJ.width,HJ.height,_0,w0,HJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0+1,c0,HJ.width,HJ.height,0,_0,w0,HJ.data)}}else{if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,_0,w0,U0[r])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,c0,_0,w0,U0[r]);for(let Y0=0;Y0<D0.length;Y0++){let y0=D0[Y0];if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0+1,0,0,_0,w0,y0.image[r])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Y0+1,c0,_0,w0,y0.image[r])}}}if(F(O))P(J.TEXTURE_CUBE_MAP);if(J0.__version=t.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function B0(L,O,T,l,t,J0){let X0=K.convert(T.format,T.colorSpace),d=K.convert(T.type),o=V(T.internalFormat,X0,d,T.normalized,T.colorSpace),F0=Z.get(O),V0=Z.get(T);if(V0.__renderTarget=O,!F0.__hasExternalTextures){let U0=Math.max(1,O.width>>J0),Q0=Math.max(1,O.height>>J0);if(t===J.TEXTURE_3D||t===J.TEXTURE_2D_ARRAY)$.texImage3D(t,J0,o,U0,Q0,O.depth,0,X0,d,null);else $.texImage2D(t,J0,o,U0,Q0,0,X0,d,null)}if($.bindFramebuffer(J.FRAMEBUFFER,L),j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,l,t,V0.__webglTexture,0,qJ(O));else if(t===J.TEXTURE_2D||t>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&t<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,l,t,V0.__webglTexture,J0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function T0(L,O,T){if(J.bindRenderbuffer(J.RENDERBUFFER,L),O.depthBuffer){let l=O.depthTexture,t=l&&l.isDepthTexture?l.type:null,J0=A(O.stencilBuffer,t),X0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,qJ(O),J0,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,qJ(O),J0,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,J0,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,X0,J.RENDERBUFFER,L)}else{let l=O.textures;for(let t=0;t<l.length;t++){let J0=l[t],X0=K.convert(J0.format,J0.colorSpace),d=K.convert(J0.type),o=V(J0.internalFormat,X0,d,J0.normalized,J0.colorSpace);if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,qJ(O),o,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,qJ(O),o,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,o,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function n0(L,O,T){let l=O.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,L),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let t=Z.get(O.depthTexture);if(t.__renderTarget=O,!t.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(l){if(t.__webglInit===void 0)t.__webglInit=!0,O.depthTexture.addEventListener("dispose",w);if(t.__webglTexture===void 0){t.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,t.__webglTexture),c(J.TEXTURE_CUBE_MAP,O.depthTexture);let F0=K.convert(O.depthTexture.format),V0=K.convert(O.depthTexture.type),U0;if(O.depthTexture.format===c9)U0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===n9)U0=J.DEPTH24_STENCIL8;for(let Q0=0;Q0<6;Q0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,U0,O.width,O.height,0,F0,V0,null)}}else a(O.depthTexture,0);let J0=t.__webglTexture,X0=qJ(O),d=l?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,o=O.depthTexture.format===n9?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===c9)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,d,J0,0,X0);else J.framebufferTexture2D(J.FRAMEBUFFER,o,d,J0,0);else if(O.depthTexture.format===n9)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,d,J0,0,X0);else J.framebufferTexture2D(J.FRAMEBUFFER,o,d,J0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function h0(L){let O=Z.get(L),T=L.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==L.depthTexture){let l=L.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(l){let t=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,l.removeEventListener("dispose",t)};l.addEventListener("dispose",t),O.__depthDisposeCallback=t}O.__boundDepthTexture=l}if(L.depthTexture&&!O.__autoAllocateDepthBuffer)if(T)for(let l=0;l<6;l++)n0(O.__webglFramebuffer[l],L,l);else{let l=L.texture.mipmaps;if(l&&l.length>0)n0(O.__webglFramebuffer[0],L,0);else n0(O.__webglFramebuffer,L,0)}else if(T){O.__webglDepthbuffer=[];for(let l=0;l<6;l++)if($.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[l]),O.__webglDepthbuffer[l]===void 0)O.__webglDepthbuffer[l]=J.createRenderbuffer(),T0(O.__webglDepthbuffer[l],L,!1);else{let t=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,J0=O.__webglDepthbuffer[l];J.bindRenderbuffer(J.RENDERBUFFER,J0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,J0)}}else{let l=L.texture.mipmaps;if(l&&l.length>0)$.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),T0(O.__webglDepthbuffer,L,!1);else{let t=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,J0=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,J0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,J0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function f0(L,O,T){let l=Z.get(L);if(O!==void 0)B0(l.__webglFramebuffer,L,L.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)h0(L)}function NJ(L){let O=L.texture,T=Z.get(L),l=Z.get(O);L.addEventListener("dispose",R);let t=L.textures,J0=L.isWebGLCubeRenderTarget===!0,X0=t.length>1;if(!X0){if(l.__webglTexture===void 0)l.__webglTexture=J.createTexture();l.__version=O.version,H.memory.textures++}if(J0){T.__webglFramebuffer=[];for(let d=0;d<6;d++)if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer[d]=[];for(let o=0;o<O.mipmaps.length;o++)T.__webglFramebuffer[d][o]=J.createFramebuffer()}else T.__webglFramebuffer[d]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer=[];for(let d=0;d<O.mipmaps.length;d++)T.__webglFramebuffer[d]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(X0)for(let d=0,o=t.length;d<o;d++){let F0=Z.get(t[d]);if(F0.__webglTexture===void 0)F0.__webglTexture=J.createTexture(),H.memory.textures++}if(L.samples>0&&j(L)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let d=0;d<t.length;d++){let o=t[d];T.__webglColorRenderbuffer[d]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[d]);let F0=K.convert(o.format,o.colorSpace),V0=K.convert(o.type),U0=V(o.internalFormat,F0,V0,o.normalized,o.colorSpace,L.isXRRenderTarget===!0),Q0=qJ(L);J.renderbufferStorageMultisample(J.RENDERBUFFER,Q0,U0,L.width,L.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+d,J.RENDERBUFFER,T.__webglColorRenderbuffer[d])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),L.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),T0(T.__webglDepthRenderbuffer,L,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(J0){$.bindTexture(J.TEXTURE_CUBE_MAP,l.__webglTexture),c(J.TEXTURE_CUBE_MAP,O);for(let d=0;d<6;d++)if(O.mipmaps&&O.mipmaps.length>0)for(let o=0;o<O.mipmaps.length;o++)B0(T.__webglFramebuffer[d][o],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+d,o);else B0(T.__webglFramebuffer[d],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+d,0);if(F(O))P(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(X0){for(let d=0,o=t.length;d<o;d++){let F0=t[d],V0=Z.get(F0),U0=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)U0=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(U0,V0.__webglTexture),c(U0,F0),B0(T.__webglFramebuffer,L,F0,J.COLOR_ATTACHMENT0+d,U0,0),F(F0))P(U0)}$.unbindTexture()}else{let d=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)d=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(d,l.__webglTexture),c(d,O),O.mipmaps&&O.mipmaps.length>0)for(let o=0;o<O.mipmaps.length;o++)B0(T.__webglFramebuffer[o],L,O,J.COLOR_ATTACHMENT0,d,o);else B0(T.__webglFramebuffer,L,O,J.COLOR_ATTACHMENT0,d,0);if(F(O))P(d);$.unbindTexture()}if(L.depthBuffer)h0(L)}function XJ(L){let O=L.textures;for(let T=0,l=O.length;T<l;T++){let t=O[T];if(F(t)){let J0=C(L),X0=Z.get(t).__webglTexture;$.bindTexture(J0,X0),P(J0),$.unbindTexture()}}}let ZJ=[],MJ=[];function RJ(L){if(L.samples>0){if(j(L)===!1){let{textures:O,width:T,height:l}=L,t=J.COLOR_BUFFER_BIT,J0=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,X0=Z.get(L),d=O.length>1;if(d)for(let F0=0;F0<O.length;F0++)$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,X0.__webglMultisampledFramebuffer);let o=L.texture.mipmaps;if(o&&o.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglFramebuffer);for(let F0=0;F0<O.length;F0++){if(L.resolveDepthBuffer){if(L.depthBuffer)t|=J.DEPTH_BUFFER_BIT;if(L.stencilBuffer&&L.resolveStencilBuffer)t|=J.STENCIL_BUFFER_BIT}if(d){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,X0.__webglColorRenderbuffer[F0]);let V0=Z.get(O[F0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,V0,0)}if(J.blitFramebuffer(0,0,T,l,0,0,T,l,t,J.NEAREST),X===!0){if(ZJ.length=0,MJ.length=0,ZJ.push(J.COLOR_ATTACHMENT0+F0),L.depthBuffer&&L.resolveDepthBuffer===!1)ZJ.push(J0),MJ.push(J0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,MJ);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,ZJ)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),d)for(let F0=0;F0<O.length;F0++){$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.RENDERBUFFER,X0.__webglColorRenderbuffer[F0]);let V0=Z.get(O[F0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.TEXTURE_2D,V0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&X){let O=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function qJ(L){return Math.min(W.maxSamples,L.samples)}function j(L){let O=Z.get(L);return L.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function hJ(L){let O=H.render.frame;if(N.get(L)!==O)N.set(L,O),L.update()}function s0(L,O){let{colorSpace:T,format:l,type:t}=L;if(L.isCompressedTexture===!0||L.isVideoTexture===!0)return O;if(T!==hQ&&T!==i9)if(g0.getTransfer(T)===t0){if(l!==Q9||t!==iJ)C0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else P0("WebGLTextures: Unsupported texture color space:",T);return O}function WJ(L){if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement)U.width=L.naturalWidth||L.width,U.height=L.naturalHeight||L.height;else if(typeof VideoFrame<"u"&&L instanceof VideoFrame)U.width=L.displayWidth,U.height=L.displayHeight;else U.width=L.width,U.height=L.height;return U}this.allocateTextureUnit=n,this.resetTextureUnits=i,this.getTextureUnits=x,this.setTextureUnits=u,this.setTexture2D=a,this.setTexture2DArray=e,this.setTexture3D=Z0,this.setTextureCube=M0,this.rebindTextures=f0,this.setupRenderTarget=NJ,this.updateRenderTargetMipmap=XJ,this.updateMultisampleRenderTarget=RJ,this.setupDepthRenderbuffer=h0,this.setupFrameBufferTexture=B0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function hG(J,Q){function $(Z,W=i9){let K,H=g0.getTransfer(W);if(Z===iJ)return J.UNSIGNED_BYTE;if(Z===QQ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===$Q)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===nZ)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===sZ)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===uZ)return J.BYTE;if(Z===cZ)return J.SHORT;if(Z===r8)return J.UNSIGNED_SHORT;if(Z===JQ)return J.INT;if(Z===S9)return J.UNSIGNED_INT;if(Z===F9)return J.FLOAT;if(Z===D9)return J.HALF_FLOAT;if(Z===iZ)return J.ALPHA;if(Z===oZ)return J.RGB;if(Z===Q9)return J.RGBA;if(Z===c9)return J.DEPTH_COMPONENT;if(Z===n9)return J.DEPTH_STENCIL;if(Z===aZ)return J.RED;if(Z===ZQ)return J.RED_INTEGER;if(Z===s9)return J.RG;if(Z===WQ)return J.RG_INTEGER;if(Z===KQ)return J.RGBA_INTEGER;if(Z===c7||Z===n7||Z===s7||Z===i7)if(H===t0)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(Z===c7)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===n7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===s7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===i7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(Z===c7)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===n7)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===s7)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===i7)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===HQ||Z===YQ||Z===XQ||Z===UQ)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(Z===HQ)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===YQ)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===XQ)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===UQ)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===GQ||Z===NQ||Z===EQ||Z===qQ||Z===FQ||Z===o7||Z===DQ)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(Z===GQ||Z===NQ)return H===t0?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(Z===EQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(Z===qQ)return K.COMPRESSED_R11_EAC;if(Z===FQ)return K.COMPRESSED_SIGNED_R11_EAC;if(Z===o7)return K.COMPRESSED_RG11_EAC;if(Z===DQ)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===OQ||Z===RQ||Z===kQ||Z===MQ||Z===LQ||Z===VQ||Z===BQ||Z===zQ||Z===IQ||Z===AQ||Z===_Q||Z===CQ||Z===wQ||Z===PQ)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(Z===OQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===RQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===kQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===MQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===LQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===VQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===BQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===zQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===IQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===AQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===_Q)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===CQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===wQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===PQ)return H===t0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===TQ||Z===SQ||Z===jQ)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(Z===TQ)return H===t0?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===SQ)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===jQ)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===yQ||Z===vQ||Z===a7||Z===fQ)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(Z===yQ)return K.COMPRESSED_RED_RGTC1_EXT;if(Z===vQ)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===a7)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===fQ)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===I8)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var xG=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gG=`
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

}`;class cW{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new X6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new lJ({vertexShader:xG,fragmentShader:gG,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new bJ(new W7(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nW extends O9{constructor(J,Q){super();let $=this,Z=null,W=1,K=null,H="local-floor",Y=1,X=null,U=null,N=null,E=null,G=null,D=null,k=typeof XRWebGLBinding<"u",z=new cW,q={},F=Q.getContextAttributes(),P=null,C=null,V=[],A=[],I=new d0,w=null,R=new TJ;R.viewport=new KJ;let B=new TJ;B.viewport=new KJ;let p=[R,B],_=new U$,g=null,i=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(c){let $0=V[c];if($0===void 0)$0=new J7,V[c]=$0;return $0.getTargetRaySpace()},this.getControllerGrip=function(c){let $0=V[c];if($0===void 0)$0=new J7,V[c]=$0;return $0.getGripSpace()},this.getHand=function(c){let $0=V[c];if($0===void 0)$0=new J7,V[c]=$0;return $0.getHandSpace()};function x(c){let $0=A.indexOf(c.inputSource);if($0===-1)return;let N0=V[$0];if(N0!==void 0)N0.update(c.inputSource,c.frame,X||K),N0.dispatchEvent({type:c.type,data:c.inputSource})}function u(){Z.removeEventListener("select",x),Z.removeEventListener("selectstart",x),Z.removeEventListener("selectend",x),Z.removeEventListener("squeeze",x),Z.removeEventListener("squeezestart",x),Z.removeEventListener("squeezeend",x),Z.removeEventListener("end",u),Z.removeEventListener("inputsourceschange",n);for(let c=0;c<V.length;c++){let $0=A[c];if($0===null)continue;A[c]=null,V[c].disconnect($0)}g=null,i=null,z.reset();for(let c in q)delete q[c];J.setRenderTarget(P),G=null,E=null,N=null,Z=null,C=null,j0.stop(),$.isPresenting=!1,J.setPixelRatio(w),J.setSize(I.width,I.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(c){if(W=c,$.isPresenting===!0)C0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(c){if(H=c,$.isPresenting===!0)C0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||K},this.setReferenceSpace=function(c){X=c},this.getBaseLayer=function(){return E!==null?E:G},this.getBinding=function(){if(N===null&&k)N=new XRWebGLBinding(Z,Q);return N},this.getFrame=function(){return D},this.getSession=function(){return Z},this.setSession=async function(c){if(Z=c,Z!==null){if(P=J.getRenderTarget(),Z.addEventListener("select",x),Z.addEventListener("selectstart",x),Z.addEventListener("selectend",x),Z.addEventListener("squeeze",x),Z.addEventListener("squeezestart",x),Z.addEventListener("squeezeend",x),Z.addEventListener("end",u),Z.addEventListener("inputsourceschange",n),F.xrCompatible!==!0)await Q.makeXRCompatible();if(w=J.getPixelRatio(),J.getSize(I),!(k&&("createProjectionLayer"in XRWebGLBinding.prototype))){let N0={antialias:F.antialias,alpha:!0,depth:F.depth,stencil:F.stencil,framebufferScaleFactor:W};G=new XRWebGLLayer(Z,Q,N0),Z.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),C=new mJ(G.framebufferWidth,G.framebufferHeight,{format:Q9,type:iJ,colorSpace:J.outputColorSpace,stencilBuffer:F.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}else{let N0=null,K0=null,I0=null;if(F.depth)I0=F.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,N0=F.stencil?n9:c9,K0=F.stencil?I8:S9;let l0={colorFormat:Q.RGBA8,depthFormat:I0,scaleFactor:W};N=this.getBinding(),E=N.createProjectionLayer(l0),Z.updateRenderState({layers:[E]}),J.setPixelRatio(1),J.setSize(E.textureWidth,E.textureHeight,!1),C=new mJ(E.textureWidth,E.textureHeight,{format:Q9,type:iJ,depthTexture:new v9(E.textureWidth,E.textureHeight,K0,void 0,void 0,void 0,void 0,void 0,void 0,N0),stencilBuffer:F.stencil,colorSpace:J.outputColorSpace,samples:F.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(Y),X=null,K=await Z.requestReferenceSpace(H),j0.setContext(Z),j0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return z.getDepthTexture()};function n(c){for(let $0=0;$0<c.removed.length;$0++){let N0=c.removed[$0],K0=A.indexOf(N0);if(K0>=0)A[K0]=null,V[K0].disconnect(N0)}for(let $0=0;$0<c.added.length;$0++){let N0=c.added[$0],K0=A.indexOf(N0);if(K0===-1){for(let l0=0;l0<V.length;l0++)if(l0>=A.length){A.push(N0),K0=l0;break}else if(A[l0]===null){A[l0]=N0,K0=l0;break}if(K0===-1)break}let I0=V[K0];if(I0)I0.connect(N0)}}let f=new v,a=new v;function e(c,$0,N0){f.setFromMatrixPosition($0.matrixWorld),a.setFromMatrixPosition(N0.matrixWorld);let K0=f.distanceTo(a),I0=$0.projectionMatrix.elements,l0=N0.projectionMatrix.elements,B0=I0[14]/(I0[10]-1),T0=I0[14]/(I0[10]+1),n0=(I0[9]+1)/I0[5],h0=(I0[9]-1)/I0[5],f0=(I0[8]-1)/I0[0],NJ=(l0[8]+1)/l0[0],XJ=B0*f0,ZJ=B0*NJ,MJ=K0/(-f0+NJ),RJ=MJ*-f0;if($0.matrixWorld.decompose(c.position,c.quaternion,c.scale),c.translateX(RJ),c.translateZ(MJ),c.matrixWorld.compose(c.position,c.quaternion,c.scale),c.matrixWorldInverse.copy(c.matrixWorld).invert(),I0[10]===-1)c.projectionMatrix.copy($0.projectionMatrix),c.projectionMatrixInverse.copy($0.projectionMatrixInverse);else{let qJ=B0+MJ,j=T0+MJ,hJ=XJ-RJ,s0=ZJ+(K0-RJ),WJ=n0*T0/j*qJ,L=h0*T0/j*qJ;c.projectionMatrix.makePerspective(hJ,s0,WJ,L,qJ,j),c.projectionMatrixInverse.copy(c.projectionMatrix).invert()}}function Z0(c,$0){if($0===null)c.matrixWorld.copy(c.matrix);else c.matrixWorld.multiplyMatrices($0.matrixWorld,c.matrix);c.matrixWorldInverse.copy(c.matrixWorld).invert()}this.updateCamera=function(c){if(Z===null)return;let{near:$0,far:N0}=c;if(z.texture!==null){if(z.depthNear>0)$0=z.depthNear;if(z.depthFar>0)N0=z.depthFar}if(_.near=B.near=R.near=$0,_.far=B.far=R.far=N0,g!==_.near||i!==_.far)Z.updateRenderState({depthNear:_.near,depthFar:_.far}),g=_.near,i=_.far;_.layers.mask=c.layers.mask|6,R.layers.mask=_.layers.mask&-5,B.layers.mask=_.layers.mask&-3;let K0=c.parent,I0=_.cameras;Z0(_,K0);for(let l0=0;l0<I0.length;l0++)Z0(I0[l0],K0);if(I0.length===2)e(_,R,B);else _.projectionMatrix.copy(R.projectionMatrix);M0(c,_,K0)};function M0(c,$0,N0){if(N0===null)c.matrix.copy($0.matrixWorld);else c.matrix.copy(N0.matrixWorld),c.matrix.invert(),c.matrix.multiply($0.matrixWorld);if(c.matrix.decompose(c.position,c.quaternion,c.scale),c.updateMatrixWorld(!0),c.projectionMatrix.copy($0.projectionMatrix),c.projectionMatrixInverse.copy($0.projectionMatrixInverse),c.isPerspectiveCamera)c.fov=M8*2*Math.atan(1/c.projectionMatrix.elements[5]),c.zoom=1}this.getCamera=function(){return _},this.getFoveation=function(){if(E===null&&G===null)return;return Y},this.setFoveation=function(c){if(Y=c,E!==null)E.fixedFoveation=c;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=c},this.hasDepthSensing=function(){return z.texture!==null},this.getDepthSensingMesh=function(){return z.getMesh(_)},this.getCameraTexture=function(c){return q[c]};let k0=null;function e0(c,$0){if(U=$0.getViewerPose(X||K),D=$0,U!==null){let N0=U.views;if(G!==null)J.setRenderTargetFramebuffer(C,G.framebuffer),J.setRenderTarget(C);let K0=!1;if(N0.length!==_.cameras.length)_.cameras.length=0,K0=!0;for(let T0=0;T0<N0.length;T0++){let n0=N0[T0],h0=null;if(G!==null)h0=G.getViewport(n0);else{let NJ=N.getViewSubImage(E,n0);if(h0=NJ.viewport,T0===0)J.setRenderTargetTextures(C,NJ.colorTexture,NJ.depthStencilTexture),J.setRenderTarget(C)}let f0=p[T0];if(f0===void 0)f0=new TJ,f0.layers.enable(T0),f0.viewport=new KJ,p[T0]=f0;if(f0.matrix.fromArray(n0.transform.matrix),f0.matrix.decompose(f0.position,f0.quaternion,f0.scale),f0.projectionMatrix.fromArray(n0.projectionMatrix),f0.projectionMatrixInverse.copy(f0.projectionMatrix).invert(),f0.viewport.set(h0.x,h0.y,h0.width,h0.height),T0===0)_.matrix.copy(f0.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale);if(K0===!0)_.cameras.push(f0)}let I0=Z.enabledFeatures;if(I0&&I0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&k){N=$.getBinding();let T0=N.getDepthInformation(N0[0]);if(T0&&T0.isValid&&T0.texture)z.init(T0,Z.renderState)}if(I0&&I0.includes("camera-access")&&k){J.state.unbindTexture(),N=$.getBinding();for(let T0=0;T0<N0.length;T0++){let n0=N0[T0].camera;if(n0){let h0=q[n0];if(!h0)h0=new X6,q[n0]=h0;let f0=N.getCameraImage(n0);h0.sourceTexture=f0}}}}for(let N0=0;N0<V.length;N0++){let K0=A[N0],I0=V[N0];if(K0!==null&&I0!==void 0)I0.update(K0,$0,X||K)}if(k0)k0(c,$0);if($0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:$0});D=null}let j0=new vW;j0.setAnimationLoop(e0),this.setAnimationLoop=function(c){k0=c},this.dispose=function(){}}}var pG=new $J,sW=new S0;sW.set(-1,0,0,0,1,0,0,0,1);function mG(J,Q){function $(q,F){if(q.matrixAutoUpdate===!0)q.updateMatrix();F.value.copy(q.matrix)}function Z(q,F){if(F.color.getRGB(q.fogColor.value,iQ(J)),F.isFog)q.fogNear.value=F.near,q.fogFar.value=F.far;else if(F.isFogExp2)q.fogDensity.value=F.density}function W(q,F,P,C,V){if(F.isNodeMaterial)F.uniformsNeedUpdate=!1;else if(F.isMeshBasicMaterial)K(q,F);else if(F.isMeshLambertMaterial){if(K(q,F),F.envMap)q.envMapIntensity.value=F.envMapIntensity}else if(F.isMeshToonMaterial)K(q,F),E(q,F);else if(F.isMeshPhongMaterial){if(K(q,F),N(q,F),F.envMap)q.envMapIntensity.value=F.envMapIntensity}else if(F.isMeshStandardMaterial){if(K(q,F),G(q,F),F.isMeshPhysicalMaterial)D(q,F,V)}else if(F.isMeshMatcapMaterial)K(q,F),k(q,F);else if(F.isMeshDepthMaterial)K(q,F);else if(F.isMeshDistanceMaterial)K(q,F),z(q,F);else if(F.isMeshNormalMaterial)K(q,F);else if(F.isLineBasicMaterial){if(H(q,F),F.isLineDashedMaterial)Y(q,F)}else if(F.isPointsMaterial)X(q,F,P,C);else if(F.isSpriteMaterial)U(q,F);else if(F.isShadowMaterial)q.color.value.copy(F.color),q.opacity.value=F.opacity;else if(F.isShaderMaterial)F.uniformsNeedUpdate=!1}function K(q,F){if(q.opacity.value=F.opacity,F.color)q.diffuse.value.copy(F.color);if(F.emissive)q.emissive.value.copy(F.emissive).multiplyScalar(F.emissiveIntensity);if(F.map)q.map.value=F.map,$(F.map,q.mapTransform);if(F.alphaMap)q.alphaMap.value=F.alphaMap,$(F.alphaMap,q.alphaMapTransform);if(F.bumpMap){if(q.bumpMap.value=F.bumpMap,$(F.bumpMap,q.bumpMapTransform),q.bumpScale.value=F.bumpScale,F.side===SJ)q.bumpScale.value*=-1}if(F.normalMap){if(q.normalMap.value=F.normalMap,$(F.normalMap,q.normalMapTransform),q.normalScale.value.copy(F.normalScale),F.side===SJ)q.normalScale.value.negate()}if(F.displacementMap)q.displacementMap.value=F.displacementMap,$(F.displacementMap,q.displacementMapTransform),q.displacementScale.value=F.displacementScale,q.displacementBias.value=F.displacementBias;if(F.emissiveMap)q.emissiveMap.value=F.emissiveMap,$(F.emissiveMap,q.emissiveMapTransform);if(F.specularMap)q.specularMap.value=F.specularMap,$(F.specularMap,q.specularMapTransform);if(F.alphaTest>0)q.alphaTest.value=F.alphaTest;let P=Q.get(F),C=P.envMap,V=P.envMapRotation;if(C){if(q.envMap.value=C,q.envMapRotation.value.setFromMatrix4(pG.makeRotationFromEuler(V)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1)q.envMapRotation.value.premultiply(sW);q.reflectivity.value=F.reflectivity,q.ior.value=F.ior,q.refractionRatio.value=F.refractionRatio}if(F.lightMap)q.lightMap.value=F.lightMap,q.lightMapIntensity.value=F.lightMapIntensity,$(F.lightMap,q.lightMapTransform);if(F.aoMap)q.aoMap.value=F.aoMap,q.aoMapIntensity.value=F.aoMapIntensity,$(F.aoMap,q.aoMapTransform)}function H(q,F){if(q.diffuse.value.copy(F.color),q.opacity.value=F.opacity,F.map)q.map.value=F.map,$(F.map,q.mapTransform)}function Y(q,F){q.dashSize.value=F.dashSize,q.totalSize.value=F.dashSize+F.gapSize,q.scale.value=F.scale}function X(q,F,P,C){if(q.diffuse.value.copy(F.color),q.opacity.value=F.opacity,q.size.value=F.size*P,q.scale.value=C*0.5,F.map)q.map.value=F.map,$(F.map,q.uvTransform);if(F.alphaMap)q.alphaMap.value=F.alphaMap,$(F.alphaMap,q.alphaMapTransform);if(F.alphaTest>0)q.alphaTest.value=F.alphaTest}function U(q,F){if(q.diffuse.value.copy(F.color),q.opacity.value=F.opacity,q.rotation.value=F.rotation,F.map)q.map.value=F.map,$(F.map,q.mapTransform);if(F.alphaMap)q.alphaMap.value=F.alphaMap,$(F.alphaMap,q.alphaMapTransform);if(F.alphaTest>0)q.alphaTest.value=F.alphaTest}function N(q,F){q.specular.value.copy(F.specular),q.shininess.value=Math.max(F.shininess,0.0001)}function E(q,F){if(F.gradientMap)q.gradientMap.value=F.gradientMap}function G(q,F){if(q.metalness.value=F.metalness,F.metalnessMap)q.metalnessMap.value=F.metalnessMap,$(F.metalnessMap,q.metalnessMapTransform);if(q.roughness.value=F.roughness,F.roughnessMap)q.roughnessMap.value=F.roughnessMap,$(F.roughnessMap,q.roughnessMapTransform);if(F.envMap)q.envMapIntensity.value=F.envMapIntensity}function D(q,F,P){if(q.ior.value=F.ior,F.sheen>0){if(q.sheenColor.value.copy(F.sheenColor).multiplyScalar(F.sheen),q.sheenRoughness.value=F.sheenRoughness,F.sheenColorMap)q.sheenColorMap.value=F.sheenColorMap,$(F.sheenColorMap,q.sheenColorMapTransform);if(F.sheenRoughnessMap)q.sheenRoughnessMap.value=F.sheenRoughnessMap,$(F.sheenRoughnessMap,q.sheenRoughnessMapTransform)}if(F.clearcoat>0){if(q.clearcoat.value=F.clearcoat,q.clearcoatRoughness.value=F.clearcoatRoughness,F.clearcoatMap)q.clearcoatMap.value=F.clearcoatMap,$(F.clearcoatMap,q.clearcoatMapTransform);if(F.clearcoatRoughnessMap)q.clearcoatRoughnessMap.value=F.clearcoatRoughnessMap,$(F.clearcoatRoughnessMap,q.clearcoatRoughnessMapTransform);if(F.clearcoatNormalMap){if(q.clearcoatNormalMap.value=F.clearcoatNormalMap,$(F.clearcoatNormalMap,q.clearcoatNormalMapTransform),q.clearcoatNormalScale.value.copy(F.clearcoatNormalScale),F.side===SJ)q.clearcoatNormalScale.value.negate()}}if(F.dispersion>0)q.dispersion.value=F.dispersion;if(F.iridescence>0){if(q.iridescence.value=F.iridescence,q.iridescenceIOR.value=F.iridescenceIOR,q.iridescenceThicknessMinimum.value=F.iridescenceThicknessRange[0],q.iridescenceThicknessMaximum.value=F.iridescenceThicknessRange[1],F.iridescenceMap)q.iridescenceMap.value=F.iridescenceMap,$(F.iridescenceMap,q.iridescenceMapTransform);if(F.iridescenceThicknessMap)q.iridescenceThicknessMap.value=F.iridescenceThicknessMap,$(F.iridescenceThicknessMap,q.iridescenceThicknessMapTransform)}if(F.transmission>0){if(q.transmission.value=F.transmission,q.transmissionSamplerMap.value=P.texture,q.transmissionSamplerSize.value.set(P.width,P.height),F.transmissionMap)q.transmissionMap.value=F.transmissionMap,$(F.transmissionMap,q.transmissionMapTransform);if(q.thickness.value=F.thickness,F.thicknessMap)q.thicknessMap.value=F.thicknessMap,$(F.thicknessMap,q.thicknessMapTransform);q.attenuationDistance.value=F.attenuationDistance,q.attenuationColor.value.copy(F.attenuationColor)}if(F.anisotropy>0){if(q.anisotropyVector.value.set(F.anisotropy*Math.cos(F.anisotropyRotation),F.anisotropy*Math.sin(F.anisotropyRotation)),F.anisotropyMap)q.anisotropyMap.value=F.anisotropyMap,$(F.anisotropyMap,q.anisotropyMapTransform)}if(q.specularIntensity.value=F.specularIntensity,q.specularColor.value.copy(F.specularColor),F.specularColorMap)q.specularColorMap.value=F.specularColorMap,$(F.specularColorMap,q.specularColorMapTransform);if(F.specularIntensityMap)q.specularIntensityMap.value=F.specularIntensityMap,$(F.specularIntensityMap,q.specularIntensityMapTransform)}function k(q,F){if(F.matcap)q.matcap.value=F.matcap}function z(q,F){let P=Q.get(F).light;q.referencePosition.value.setFromMatrixPosition(P.matrixWorld),q.nearDistance.value=P.shadow.camera.near,q.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:W}}function lG(J,Q,$,Z){let W={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(V,A){let I=A.program;Z.uniformBlockBinding(V,I)}function U(V,A){let I=W[V.id];if(I===void 0)q(V),I=N(V),W[V.id]=I,V.addEventListener("dispose",P);let w=A.program;Z.updateUBOMapping(V,w);let R=Q.render.frame;if(K[V.id]!==R)G(V),K[V.id]=R}function N(V){let A=E();V.__bindingPointIndex=A;let I=J.createBuffer(),w=V.__size,R=V.usage;return J.bindBuffer(J.UNIFORM_BUFFER,I),J.bufferData(J.UNIFORM_BUFFER,w,R),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,A,I),I}function E(){for(let V=0;V<Y;V++)if(H.indexOf(V)===-1)return H.push(V),V;return P0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(V){let A=W[V.id],I=V.uniforms,w=V.__cache;J.bindBuffer(J.UNIFORM_BUFFER,A);for(let R=0,B=I.length;R<B;R++){let p=I[R];if(Array.isArray(p))for(let _=0,g=p.length;_<g;_++)D(p[_],R,_,w);else D(p,R,0,w)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(V,A,I,w){if(z(V,A,I,w)===!0){let{__offset:R,value:B}=V;if(Array.isArray(B)){let p=0;for(let _=0;_<B.length;_++){let g=B[_],i=F(g);if(k(g,V.__data,p),typeof g!=="number"&&typeof g!=="boolean"&&!g.isMatrix3&&!ArrayBuffer.isView(g))p+=i.storage/Float32Array.BYTES_PER_ELEMENT}}else k(B,V.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,R,V.__data)}}function k(V,A,I){if(typeof V==="number"||typeof V==="boolean")A[0]=V;else if(V.isMatrix3)A[0]=V.elements[0],A[1]=V.elements[1],A[2]=V.elements[2],A[3]=0,A[4]=V.elements[3],A[5]=V.elements[4],A[6]=V.elements[5],A[7]=0,A[8]=V.elements[6],A[9]=V.elements[7],A[10]=V.elements[8],A[11]=0;else if(ArrayBuffer.isView(V))A.set(new V.constructor(V.buffer,V.byteOffset,A.length));else V.toArray(A,I)}function z(V,A,I,w){let R=V.value,B=A+"_"+I;if(w[B]===void 0){if(typeof R==="number"||typeof R==="boolean")w[B]=R;else if(ArrayBuffer.isView(R))w[B]=R.slice();else w[B]=R.clone();return!0}else{let p=w[B];if(typeof R==="number"||typeof R==="boolean"){if(p!==R)return w[B]=R,!0}else if(ArrayBuffer.isView(R))return!0;else if(p.equals(R)===!1)return p.copy(R),!0}return!1}function q(V){let A=V.uniforms,I=0,w=16;for(let B=0,p=A.length;B<p;B++){let _=Array.isArray(A[B])?A[B]:[A[B]];for(let g=0,i=_.length;g<i;g++){let x=_[g],u=Array.isArray(x.value)?x.value:[x.value];for(let n=0,f=u.length;n<f;n++){let a=u[n],e=F(a),Z0=I%w,M0=Z0%e.boundary,k0=Z0+M0;if(I+=M0,k0!==0&&w-k0<e.storage)I+=w-k0;x.__data=new Float32Array(e.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=I,I+=e.storage}}}let R=I%w;if(R>0)I+=w-R;return V.__size=I,V.__cache={},this}function F(V){let A={boundary:0,storage:0};if(typeof V==="number"||typeof V==="boolean")A.boundary=4,A.storage=4;else if(V.isVector2)A.boundary=8,A.storage=8;else if(V.isVector3||V.isColor)A.boundary=16,A.storage=12;else if(V.isVector4)A.boundary=16,A.storage=16;else if(V.isMatrix3)A.boundary=48,A.storage=48;else if(V.isMatrix4)A.boundary=64,A.storage=64;else if(V.isTexture)C0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(V))A.boundary=16,A.storage=V.byteLength;else C0("WebGLRenderer: Unsupported uniform value type.",V);return A}function P(V){let A=V.target;A.removeEventListener("dispose",P);let I=H.indexOf(A.__bindingPointIndex);H.splice(I,1),J.deleteBuffer(W[A.id]),delete W[A.id],delete K[A.id]}function C(){for(let V in W)J.deleteBuffer(W[V]);H=[],W={},K={}}return{bind:X,update:U,dispose:C}}var dG=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$9=null;function uG(){if($9===null)$9=new C8(dG,16,16,s9,D9),$9.name="DFG_LUT",$9.minFilter=VJ,$9.magFilter=VJ,$9.wrapS=d7,$9.wrapT=d7,$9.generateMipmaps=!1,$9.needsUpdate=!0;return $9}class I${constructor(J={}){let{canvas:Q=WW(),context:$=null,depth:Z=!0,stencil:W=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:E=!1,outputBufferType:G=iJ}=J;this.isWebGLRenderer=!0;let D;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=$.getContextAttributes().alpha}else D=K;let k=G,z=new Set([KQ,WQ,ZQ]),q=new Set([iJ,S9,r8,I8,QQ,$Q]),F=new Uint32Array(4),P=new Int32Array(4),C=new v,V=null,A=null,I=[],w=[],R=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=sJ,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,p=!1,_=null,g=null,i=null,x=null;this._outputColorSpace=t8;let u=0,n=0,f=null,a=-1,e=null,Z0=new KJ,M0=new KJ,k0=null,e0=new m0(0),j0=0,c=Q.width,$0=Q.height,N0=1,K0=null,I0=null,l0=new KJ(0,0,c,$0),B0=new KJ(0,0,c,$0),T0=!1,n0=new H6,h0=!1,f0=!1,NJ=new $J,XJ=new v,ZJ=new KJ,MJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},RJ=!1;function qJ(){return f===null?N0:1}let j=$;function hJ(M,y){return Q.getContext(M,y)}try{let M={alpha:!0,depth:Z,stencil:W,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:N};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${YZ}`);if(Q.addEventListener("webglcontextlost",y0,!1),Q.addEventListener("webglcontextrestored",HJ,!1),Q.addEventListener("webglcontextcreationerror",JJ,!1),j===null){if(j=hJ("webgl2",M),j===null)if(hJ("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw P0("WebGLRenderer: "+M.message),M}let s0,WJ,L,O,T,l,t,J0,X0,d,o,F0,V0,U0,Q0,_0,w0,c0,S,W0,s,H0,D0;function r(){if(s0=new rX(j),s0.init(),s=new hG(j,s0),WJ=new dX(j,s0,J,s),L=new fG(j,s0),WJ.reversedDepthBuffer&&E)L.buffers.depth.setReversed(!0);g=j.createFramebuffer(),i=j.createFramebuffer(),x=j.createFramebuffer(),O=new JU(j),T=new VG,l=new bG(j,s0,L,T,WJ,s,O),t=new aX(B),J0=new WH(j),H0=new mX(j,J0),X0=new tX(j,J0,O,H0),d=new $U(j,X0,J0,H0,O),c0=new QU(j,WJ,l),Q0=new uX(T),o=new LG(B,t,s0,WJ,H0,Q0),F0=new mG(B,T),V0=new zG,U0=new PG(s0),w0=new pX(B,t,L,d,D,Y),_0=new vG(B,d,WJ),D0=new lG(j,O,WJ,L),S=new lX(j,s0,O),W0=new eX(j,s0,O),O.programs=o.programs,B.capabilities=WJ,B.extensions=s0,B.properties=T,B.renderLists=V0,B.shadowMap=_0,B.state=L,B.info=O}if(r(),k!==iJ)R=new WU(k,Q.width,Q.height,H,Z,W);let Y0=new nW(B,j);this.xr=Y0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let M=s0.get("WEBGL_lose_context");if(M)M.loseContext()},this.forceContextRestore=function(){let M=s0.get("WEBGL_lose_context");if(M)M.restoreContext()},this.getPixelRatio=function(){return N0},this.setPixelRatio=function(M){if(M===void 0)return;N0=M,this.setSize(c,$0,!1)},this.getSize=function(M){return M.set(c,$0)},this.setSize=function(M,y,m=!0){if(Y0.isPresenting){C0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(c=M,$0=y,Q.width=Math.floor(M*N0),Q.height=Math.floor(y*N0),m===!0)Q.style.width=M+"px",Q.style.height=y+"px";if(R!==null)R.setSize(Q.width,Q.height);this.setViewport(0,0,M,y)},this.getDrawingBufferSize=function(M){return M.set(c*N0,$0*N0).floor()},this.setDrawingBufferSize=function(M,y,m){c=M,$0=y,N0=m,Q.width=Math.floor(M*m),Q.height=Math.floor(y*m),this.setViewport(0,0,M,y)},this.setEffects=function(M){if(k===iJ){P0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let y=0;y<M.length;y++)if(M[y].isOutputPass===!0){C0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Z0)},this.getViewport=function(M){return M.copy(l0)},this.setViewport=function(M,y,m,b){if(M.isVector4)l0.set(M.x,M.y,M.z,M.w);else l0.set(M,y,m,b);L.viewport(Z0.copy(l0).multiplyScalar(N0).round())},this.getScissor=function(M){return M.copy(B0)},this.setScissor=function(M,y,m,b){if(M.isVector4)B0.set(M.x,M.y,M.z,M.w);else B0.set(M,y,m,b);L.scissor(M0.copy(B0).multiplyScalar(N0).round())},this.getScissorTest=function(){return T0},this.setScissorTest=function(M){L.setScissorTest(T0=M)},this.setOpaqueSort=function(M){K0=M},this.setTransparentSort=function(M){I0=M},this.getClearColor=function(M){return M.copy(w0.getClearColor())},this.setClearColor=function(){w0.setClearColor(...arguments)},this.getClearAlpha=function(){return w0.getClearAlpha()},this.setClearAlpha=function(){w0.setClearAlpha(...arguments)},this.clear=function(M=!0,y=!0,m=!0){let b=0;if(M){let h=!1;if(f!==null){let q0=f.texture.format;h=z.has(q0)}if(h){let q0=f.texture.type,R0=q.has(q0),E0=w0.getClearColor(),L0=w0.getClearAlpha(),z0=E0.r,v0=E0.g,x0=E0.b;if(R0)F[0]=z0,F[1]=v0,F[2]=x0,F[3]=L0,j.clearBufferuiv(j.COLOR,0,F);else P[0]=z0,P[1]=v0,P[2]=x0,P[3]=L0,j.clearBufferiv(j.COLOR,0,P)}else b|=j.COLOR_BUFFER_BIT}if(y)b|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(m)b|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(b!==0)j.clear(b)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),_=M},this.dispose=function(){Q.removeEventListener("webglcontextlost",y0,!1),Q.removeEventListener("webglcontextrestored",HJ,!1),Q.removeEventListener("webglcontextcreationerror",JJ,!1),w0.dispose(),V0.dispose(),U0.dispose(),T.dispose(),t.dispose(),d.dispose(),H0.dispose(),D0.dispose(),o.dispose(),Y0.dispose(),Y0.removeEventListener("sessionstart",w$),Y0.removeEventListener("sessionend",P$),h9.stop()};function y0(M){M.preventDefault(),mQ("WebGLRenderer: Context Lost."),p=!0}function HJ(){mQ("WebGLRenderer: Context Restored."),p=!1;let M=O.autoReset,y=_0.enabled,m=_0.autoUpdate,b=_0.needsUpdate,h=_0.type;r(),O.autoReset=M,_0.enabled=y,_0.autoUpdate=m,_0.needsUpdate=b,_0.type=h}function JJ(M){P0("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function aJ(M){let y=M.target;y.removeEventListener("dispose",aJ),H9(y)}function H9(M){ZK(M),T.remove(M)}function ZK(M){let y=T.get(M).programs;if(y!==void 0){if(y.forEach(function(m){o.releaseProgram(m)}),M.isShaderMaterial)o.releaseShaderCache(M)}}this.renderBufferDirect=function(M,y,m,b,h,q0){if(y===null)y=MJ;let R0=h.isMesh&&h.matrixWorld.determinantAffine()<0,E0=HK(M,y,m,b,h);L.setMaterial(b,R0);let L0=m.index,z0=1;if(b.wireframe===!0){if(L0=X0.getWireframeAttribute(m),L0===void 0)return;z0=2}let v0=m.drawRange,x0=m.attributes.position,A0=v0.start*z0,o0=(v0.start+v0.count)*z0;if(q0!==null)A0=Math.max(A0,q0.start*z0),o0=Math.min(o0,(q0.start+q0.count)*z0);if(L0!==null)A0=Math.max(A0,0),o0=Math.min(o0,L0.count);else if(x0!==void 0&&x0!==null)A0=Math.max(A0,0),o0=Math.min(o0,x0.count);let UJ=o0-A0;if(UJ<0||UJ===1/0)return;H0.setup(h,b,E0,m,L0);let YJ,a0=S;if(L0!==null)YJ=J0.get(L0),a0=W0,a0.setIndex(YJ);if(h.isMesh)if(b.wireframe===!0)L.setLineWidth(b.wireframeLinewidth*qJ()),a0.setMode(j.LINES);else a0.setMode(j.TRIANGLES);else if(h.isLine){let BJ=b.linewidth;if(BJ===void 0)BJ=1;if(L.setLineWidth(BJ*qJ()),h.isLineSegments)a0.setMode(j.LINES);else if(h.isLineLoop)a0.setMode(j.LINE_LOOP);else a0.setMode(j.LINE_STRIP)}else if(h.isPoints)a0.setMode(j.POINTS);else if(h.isSprite)a0.setMode(j.TRIANGLES);if(h.isBatchedMesh)if(!s0.get("WEBGL_multi_draw")){let{_multiDrawStarts:BJ,_multiDrawCounts:O0,_multiDrawCount:yJ}=h,u0=L0?J0.get(L0).bytesPerElement:1,xJ=T.get(b).currentProgram.getUniforms();for(let rJ=0;rJ<yJ;rJ++)xJ.setValue(j,"_gl_DrawID",rJ),a0.render(BJ[rJ]/u0,O0[rJ])}else a0.renderMultiDraw(h._multiDrawStarts,h._multiDrawCounts,h._multiDrawCount);else if(h.isInstancedMesh)a0.renderInstances(A0,UJ,h.count);else if(m.isInstancedBufferGeometry){let BJ=m._maxInstanceCount!==void 0?m._maxInstanceCount:1/0,O0=Math.min(m.instanceCount,BJ);a0.renderInstances(A0,UJ,O0)}else a0.render(A0,UJ)};function C$(M,y,m){if(M.transparent===!0&&M.side===eJ&&M.forceSinglePass===!1)M.side=SJ,M.needsUpdate=!0,F7(M,y,m),M.side=V8,M.needsUpdate=!0,F7(M,y,m),M.side=eJ;else F7(M,y,m)}this.compile=function(M,y,m=null){if(m===null)m=M;if(A=U0.get(m),A.init(y),w.push(A),m.traverseVisible(function(h){if(h.isLight&&h.layers.test(y.layers)){if(A.pushLight(h),h.castShadow)A.pushShadow(h)}}),M!==m)M.traverseVisible(function(h){if(h.isLight&&h.layers.test(y.layers)){if(A.pushLight(h),h.castShadow)A.pushShadow(h)}});A.setupLights();let b=new Set;return M.traverse(function(h){if(!(h.isMesh||h.isPoints||h.isLine||h.isSprite))return;let q0=h.material;if(q0)if(Array.isArray(q0))for(let R0=0;R0<q0.length;R0++){let E0=q0[R0];C$(E0,m,h),b.add(E0)}else C$(q0,m,h),b.add(q0)}),A=w.pop(),b},this.compileAsync=function(M,y,m=null){let b=this.compile(M,y,m);return new Promise((h)=>{function q0(){if(b.forEach(function(R0){if(T.get(R0).currentProgram.isReady())b.delete(R0)}),b.size===0){h(M);return}setTimeout(q0,10)}if(s0.get("KHR_parallel_shader_compile")!==null)q0();else setTimeout(q0,10)})};let M6=null;function WK(M){if(M6)M6(M)}function w$(){h9.stop()}function P$(){h9.start()}let h9=new vW;if(h9.setAnimationLoop(WK),typeof self<"u")h9.setContext(self);this.setAnimationLoop=function(M){M6=M,Y0.setAnimationLoop(M),M===null?h9.stop():h9.start()},Y0.addEventListener("sessionstart",w$),Y0.addEventListener("sessionend",P$),this.render=function(M,y){if(y!==void 0&&y.isCamera!==!0){P0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;if(_!==null)_.renderStart(M,y);let m=Y0.enabled===!0&&Y0.isPresenting===!0,b=R!==null&&(f===null||m)&&R.begin(B,f);if(M.matrixWorldAutoUpdate===!0)M.updateMatrixWorld();if(y.parent===null&&y.matrixWorldAutoUpdate===!0)y.updateMatrixWorld();if(Y0.enabled===!0&&Y0.isPresenting===!0&&(R===null||R.isCompositing()===!1)){if(Y0.cameraAutoUpdate===!0)Y0.updateCamera(y);y=Y0.getCamera()}if(M.isScene===!0)M.onBeforeRender(B,M,y,f);if(A=U0.get(M,w.length),A.init(y),A.state.textureUnits=l.getTextureUnits(),w.push(A),NJ.multiplyMatrices(y.projectionMatrix,y.matrixWorldInverse),n0.setFromProjectionMatrix(NJ,pQ,y.reversedDepth),f0=this.localClippingEnabled,h0=Q0.init(this.clippingPlanes,f0),V=V0.get(M,I.length),V.init(),I.push(V),Y0.enabled===!0&&Y0.isPresenting===!0){let R0=B.xr.getDepthSensingMesh();if(R0!==null)L6(R0,y,-1/0,B.sortObjects)}if(L6(M,y,0,B.sortObjects),V.finish(),B.sortObjects===!0)V.sort(K0,I0,y.reversedDepth);if(RJ=Y0.enabled===!1||Y0.isPresenting===!1||Y0.hasDepthSensing()===!1,RJ)w0.addToRenderList(V,M);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(h0===!0)Q0.beginShadows();let h=A.state.shadowsArray;if(_0.render(h,M,y),h0===!0)Q0.endShadows();if((b&&R.hasRenderPass())===!1){let{opaque:R0,transmissive:E0}=V;if(A.setupLights(),y.isArrayCamera){let L0=y.cameras;if(E0.length>0)for(let z0=0,v0=L0.length;z0<v0;z0++){let x0=L0[z0];S$(R0,E0,M,x0)}if(RJ)w0.render(M);for(let z0=0,v0=L0.length;z0<v0;z0++){let x0=L0[z0];T$(V,M,x0,x0.viewport)}}else{if(E0.length>0)S$(R0,E0,M,y);if(RJ)w0.render(M);T$(V,M,y)}}if(f!==null&&n===0)l.updateMultisampleRenderTarget(f),l.updateRenderTargetMipmap(f);if(b)R.end(B);if(M.isScene===!0)M.onAfterRender(B,M,y);if(H0.resetDefaultState(),a=-1,e=null,w.pop(),w.length>0){if(A=w[w.length-1],l.setTextureUnits(A.state.textureUnits),h0===!0)Q0.setGlobalState(B.clippingPlanes,A.state.camera)}else A=null;if(I.pop(),I.length>0)V=I[I.length-1];else V=null;if(_!==null)_.renderEnd()};function L6(M,y,m,b){if(M.visible===!1)return;if(M.layers.test(y.layers)){if(M.isGroup)m=M.renderOrder;else if(M.isLOD){if(M.autoUpdate===!0)M.update(y)}else if(M.isLightProbeGrid)A.pushLightProbeGrid(M);else if(M.isLight){if(A.pushLight(M),M.castShadow)A.pushShadow(M)}else if(M.isSprite){if(!M.frustumCulled||n0.intersectsSprite(M)){if(b)ZJ.setFromMatrixPosition(M.matrixWorld).applyMatrix4(NJ);let R0=d.update(M),E0=M.material;if(E0.visible)V.push(M,R0,E0,m,ZJ.z,null)}}else if(M.isMesh||M.isLine||M.isPoints){if(!M.frustumCulled||n0.intersectsObject(M)){let R0=d.update(M),E0=M.material;if(b){if(M.boundingSphere!==void 0){if(M.boundingSphere===null)M.computeBoundingSphere();ZJ.copy(M.boundingSphere.center)}else{if(R0.boundingSphere===null)R0.computeBoundingSphere();ZJ.copy(R0.boundingSphere.center)}ZJ.applyMatrix4(M.matrixWorld).applyMatrix4(NJ)}if(Array.isArray(E0)){let L0=R0.groups;for(let z0=0,v0=L0.length;z0<v0;z0++){let x0=L0[z0],A0=E0[x0.materialIndex];if(A0&&A0.visible)V.push(M,R0,A0,m,ZJ.z,x0)}}else if(E0.visible)V.push(M,R0,E0,m,ZJ.z,null)}}}let q0=M.children;for(let R0=0,E0=q0.length;R0<E0;R0++)L6(q0[R0],y,m,b)}function T$(M,y,m,b){let{opaque:h,transmissive:q0,transparent:R0}=M;if(A.setupLightsView(m),h0===!0)Q0.setGlobalState(B.clippingPlanes,m);if(b)L.viewport(Z0.copy(b));if(h.length>0)q7(h,y,m);if(q0.length>0)q7(q0,y,m);if(R0.length>0)q7(R0,y,m);L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function S$(M,y,m,b){if((m.isScene===!0?m.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[b.id]===void 0){let A0=s0.has("EXT_color_buffer_half_float")||s0.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[b.id]=new mJ(1,1,{generateMipmaps:!0,type:A0?D9:iJ,minFilter:u9,samples:Math.max(4,WJ.samples),stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:g0.workingColorSpace})}let q0=A.state.transmissionRenderTarget[b.id],R0=b.viewport||Z0;q0.setSize(R0.z*B.transmissionResolutionScale,R0.w*B.transmissionResolutionScale);let E0=B.getRenderTarget(),L0=B.getActiveCubeFace(),z0=B.getActiveMipmapLevel();if(B.setRenderTarget(q0),B.getClearColor(e0),j0=B.getClearAlpha(),j0<1)B.setClearColor(16777215,0.5);if(B.clear(),RJ)w0.render(m);let v0=B.toneMapping;B.toneMapping=sJ;let x0=b.viewport;if(b.viewport!==void 0)b.viewport=void 0;if(A.setupLightsView(b),h0===!0)Q0.setGlobalState(B.clippingPlanes,b);if(q7(M,m,b),l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0),s0.has("WEBGL_multisampled_render_to_texture")===!1){let A0=!1;for(let o0=0,UJ=y.length;o0<UJ;o0++){let YJ=y[o0],{object:a0,geometry:BJ,material:O0,group:yJ}=YJ;if(O0.side===eJ&&a0.layers.test(b.layers)){let u0=O0.side;O0.side=SJ,O0.needsUpdate=!0,j$(a0,m,b,BJ,O0,yJ),O0.side=u0,O0.needsUpdate=!0,A0=!0}}if(A0===!0)l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0)}if(B.setRenderTarget(E0,L0,z0),B.setClearColor(e0,j0),x0!==void 0)b.viewport=x0;B.toneMapping=v0}function q7(M,y,m){let b=y.isScene===!0?y.overrideMaterial:null;for(let h=0,q0=M.length;h<q0;h++){let R0=M[h],{object:E0,geometry:L0,group:z0}=R0,v0=R0.material;if(v0.allowOverride===!0&&b!==null)v0=b;if(E0.layers.test(m.layers))j$(E0,y,m,L0,v0,z0)}}function j$(M,y,m,b,h,q0){if(M.onBeforeRender(B,y,m,b,h,q0),M.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),h.onBeforeRender(B,y,m,b,M,q0),h.transparent===!0&&h.side===eJ&&h.forceSinglePass===!1)h.side=SJ,h.needsUpdate=!0,B.renderBufferDirect(m,y,b,h,M,q0),h.side=V8,h.needsUpdate=!0,B.renderBufferDirect(m,y,b,h,M,q0),h.side=eJ;else B.renderBufferDirect(m,y,b,h,M,q0);M.onAfterRender(B,y,m,b,h,q0)}function F7(M,y,m){if(y.isScene!==!0)y=MJ;let b=T.get(M),h=A.state.lights,q0=A.state.shadowsArray,R0=h.state.version,E0=o.getParameters(M,h.state,q0,y,m,A.state.lightProbeGridArray),L0=o.getProgramCacheKey(E0),z0=b.programs;b.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?y.environment:null,b.fog=y.fog;let v0=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;if(b.envMap=t.get(M.envMap||b.environment,v0),b.envMapRotation=b.environment!==null&&M.envMap===null?y.environmentRotation:M.envMapRotation,z0===void 0)M.addEventListener("dispose",aJ),z0=new Map,b.programs=z0;let x0=z0.get(L0);if(x0!==void 0){if(b.currentProgram===x0&&b.lightsStateVersion===R0)return v$(M,E0),x0}else{if(E0.uniforms=o.getUniforms(M),_!==null&&M.isNodeMaterial)_.build(M,m,E0);M.onBeforeCompile(E0,B),x0=o.acquireProgram(E0,L0),z0.set(L0,x0),b.uniforms=E0.uniforms}let A0=b.uniforms;if(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)A0.clippingPlanes=Q0.uniform;if(v$(M,E0),b.needsLights=XK(M),b.lightsStateVersion=R0,b.needsLights)A0.ambientLightColor.value=h.state.ambient,A0.lightProbe.value=h.state.probe,A0.directionalLights.value=h.state.directional,A0.directionalLightShadows.value=h.state.directionalShadow,A0.spotLights.value=h.state.spot,A0.spotLightShadows.value=h.state.spotShadow,A0.rectAreaLights.value=h.state.rectArea,A0.ltc_1.value=h.state.rectAreaLTC1,A0.ltc_2.value=h.state.rectAreaLTC2,A0.pointLights.value=h.state.point,A0.pointLightShadows.value=h.state.pointShadow,A0.hemisphereLights.value=h.state.hemi,A0.directionalShadowMatrix.value=h.state.directionalShadowMatrix,A0.spotLightMatrix.value=h.state.spotLightMatrix,A0.spotLightMap.value=h.state.spotLightMap,A0.pointShadowMatrix.value=h.state.pointShadowMatrix;return b.lightProbeGrid=A.state.lightProbeGridArray.length>0,b.currentProgram=x0,b.uniformsList=null,x0}function y$(M){if(M.uniformsList===null){let y=M.currentProgram.getUniforms();M.uniformsList=G7.seqWithValue(y.seq,M.uniforms)}return M.uniformsList}function v$(M,y){let m=T.get(M);m.outputColorSpace=y.outputColorSpace,m.batching=y.batching,m.batchingColor=y.batchingColor,m.instancing=y.instancing,m.instancingColor=y.instancingColor,m.instancingMorph=y.instancingMorph,m.skinning=y.skinning,m.morphTargets=y.morphTargets,m.morphNormals=y.morphNormals,m.morphColors=y.morphColors,m.morphTargetsCount=y.morphTargetsCount,m.numClippingPlanes=y.numClippingPlanes,m.numIntersection=y.numClipIntersection,m.vertexAlphas=y.vertexAlphas,m.vertexTangents=y.vertexTangents,m.toneMapping=y.toneMapping}function KK(M,y){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;C.setFromMatrixPosition(y.matrixWorld);for(let m=0,b=M.length;m<b;m++){let h=M[m];if(h.texture!==null&&h.boundingBox.containsPoint(C))return h}return null}function HK(M,y,m,b,h){if(y.isScene!==!0)y=MJ;l.resetTextureUnits();let q0=y.fog,R0=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?y.environment:null,E0=f===null?B.outputColorSpace:f.isXRRenderTarget===!0?f.texture.colorSpace:g0.workingColorSpace,L0=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,z0=t.get(b.envMap||R0,L0),v0=b.vertexColors===!0&&!!m.attributes.color&&m.attributes.color.itemSize===4,x0=!!m.attributes.tangent&&(!!b.normalMap||b.anisotropy>0),A0=!!m.morphAttributes.position,o0=!!m.morphAttributes.normal,UJ=!!m.morphAttributes.color,YJ=sJ;if(b.toneMapped){if(f===null||f.isXRRenderTarget===!0)YJ=B.toneMapping}let a0=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,BJ=a0!==void 0?a0.length:0,O0=T.get(b),yJ=A.state.lights;if(h0===!0){if(f0===!0||M!==e){let QJ=M===e&&b.id===a;Q0.setState(b,M,QJ)}}let u0=!1;if(b.version===O0.__version){if(O0.needsLights&&O0.lightsStateVersion!==yJ.state.version)u0=!0;else if(O0.outputColorSpace!==E0)u0=!0;else if(h.isBatchedMesh&&O0.batching===!1)u0=!0;else if(!h.isBatchedMesh&&O0.batching===!0)u0=!0;else if(h.isBatchedMesh&&O0.batchingColor===!0&&h.colorTexture===null)u0=!0;else if(h.isBatchedMesh&&O0.batchingColor===!1&&h.colorTexture!==null)u0=!0;else if(h.isInstancedMesh&&O0.instancing===!1)u0=!0;else if(!h.isInstancedMesh&&O0.instancing===!0)u0=!0;else if(h.isSkinnedMesh&&O0.skinning===!1)u0=!0;else if(!h.isSkinnedMesh&&O0.skinning===!0)u0=!0;else if(h.isInstancedMesh&&O0.instancingColor===!0&&h.instanceColor===null)u0=!0;else if(h.isInstancedMesh&&O0.instancingColor===!1&&h.instanceColor!==null)u0=!0;else if(h.isInstancedMesh&&O0.instancingMorph===!0&&h.morphTexture===null)u0=!0;else if(h.isInstancedMesh&&O0.instancingMorph===!1&&h.morphTexture!==null)u0=!0;else if(O0.envMap!==z0)u0=!0;else if(b.fog===!0&&O0.fog!==q0)u0=!0;else if(O0.numClippingPlanes!==void 0&&(O0.numClippingPlanes!==Q0.numPlanes||O0.numIntersection!==Q0.numIntersection))u0=!0;else if(O0.vertexAlphas!==v0)u0=!0;else if(O0.vertexTangents!==x0)u0=!0;else if(O0.morphTargets!==A0)u0=!0;else if(O0.morphNormals!==o0)u0=!0;else if(O0.morphColors!==UJ)u0=!0;else if(O0.toneMapping!==YJ)u0=!0;else if(O0.morphTargetsCount!==BJ)u0=!0;else if(!!O0.lightProbeGrid!==A.state.lightProbeGridArray.length>0)u0=!0}else u0=!0,O0.__version=b.version;let xJ=O0.currentProgram;if(u0===!0){if(xJ=F7(b,y,h),_&&b.isNodeMaterial)_.onUpdateProgram(b,xJ,O0)}let rJ=!1,M9=!1,Q8=!1,r0=xJ.getUniforms(),GJ=O0.uniforms;if(L.useProgram(xJ.program))rJ=!0,M9=!0,Q8=!0;if(b.id!==a)a=b.id,M9=!0;if(O0.needsLights){let QJ=KK(A.state.lightProbeGridArray,h);if(O0.lightProbeGrid!==QJ)O0.lightProbeGrid=QJ,M9=!0}if(rJ||e!==M){if(L.buffers.depth.getReversed()&&M.reversedDepth!==!0)M._reversedDepth=!0,M.updateProjectionMatrix();r0.setValue(j,"projectionMatrix",M.projectionMatrix),r0.setValue(j,"viewMatrix",M.matrixWorldInverse);let V9=r0.map.cameraPosition;if(V9!==void 0)V9.setValue(j,XJ.setFromMatrixPosition(M.matrixWorld));if(WJ.logarithmicDepthBuffer)r0.setValue(j,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2));if(b.isMeshPhongMaterial||b.isMeshToonMaterial||b.isMeshLambertMaterial||b.isMeshBasicMaterial||b.isMeshStandardMaterial||b.isShaderMaterial)r0.setValue(j,"isOrthographic",M.isOrthographicCamera===!0);if(e!==M)e=M,M9=!0,Q8=!0}if(O0.needsLights){if(yJ.state.directionalShadowMap.length>0)r0.setValue(j,"directionalShadowMap",yJ.state.directionalShadowMap,l);if(yJ.state.spotShadowMap.length>0)r0.setValue(j,"spotShadowMap",yJ.state.spotShadowMap,l);if(yJ.state.pointShadowMap.length>0)r0.setValue(j,"pointShadowMap",yJ.state.pointShadowMap,l)}if(h.isSkinnedMesh){r0.setOptional(j,h,"bindMatrix"),r0.setOptional(j,h,"bindMatrixInverse");let QJ=h.skeleton;if(QJ){if(QJ.boneTexture===null)QJ.computeBoneTexture();r0.setValue(j,"boneTexture",QJ.boneTexture,l)}}if(h.isBatchedMesh){if(r0.setOptional(j,h,"batchingTexture"),r0.setValue(j,"batchingTexture",h._matricesTexture,l),r0.setOptional(j,h,"batchingIdTexture"),r0.setValue(j,"batchingIdTexture",h._indirectTexture,l),r0.setOptional(j,h,"batchingColorTexture"),h._colorsTexture!==null)r0.setValue(j,"batchingColorTexture",h._colorsTexture,l)}let L9=m.morphAttributes;if(L9.position!==void 0||L9.normal!==void 0||L9.color!==void 0)c0.update(h,m,xJ);if(M9||O0.receiveShadow!==h.receiveShadow)O0.receiveShadow=h.receiveShadow,r0.setValue(j,"receiveShadow",h.receiveShadow);if((b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial)&&b.envMap===null&&y.environment!==null)GJ.envMapIntensity.value=y.environmentIntensity;if(GJ.dfgLUT!==void 0)GJ.dfgLUT.value=uG();if(M9){if(r0.setValue(j,"toneMappingExposure",B.toneMappingExposure),O0.needsLights)YK(GJ,Q8);if(q0&&b.fog===!0)F0.refreshFogUniforms(GJ,q0);if(F0.refreshMaterialUniforms(GJ,b,N0,$0,A.state.transmissionRenderTarget[M.id]),O0.needsLights&&O0.lightProbeGrid){let QJ=O0.lightProbeGrid;GJ.probesSH.value=QJ.texture,GJ.probesMin.value.copy(QJ.boundingBox.min),GJ.probesMax.value.copy(QJ.boundingBox.max),GJ.probesResolution.value.copy(QJ.resolution)}G7.upload(j,y$(O0),GJ,l)}if(b.isShaderMaterial&&b.uniformsNeedUpdate===!0)G7.upload(j,y$(O0),GJ,l),b.uniformsNeedUpdate=!1;if(b.isSpriteMaterial)r0.setValue(j,"center",h.center);if(r0.setValue(j,"modelViewMatrix",h.modelViewMatrix),r0.setValue(j,"normalMatrix",h.normalMatrix),r0.setValue(j,"modelMatrix",h.matrixWorld),b.uniformsGroups!==void 0){let QJ=b.uniformsGroups;for(let V9=0,$8=QJ.length;V9<$8;V9++){let f$=QJ[V9];D0.update(f$,xJ),D0.bind(f$,xJ)}}return xJ}function YK(M,y){M.ambientLightColor.needsUpdate=y,M.lightProbe.needsUpdate=y,M.directionalLights.needsUpdate=y,M.directionalLightShadows.needsUpdate=y,M.pointLights.needsUpdate=y,M.pointLightShadows.needsUpdate=y,M.spotLights.needsUpdate=y,M.spotLightShadows.needsUpdate=y,M.rectAreaLights.needsUpdate=y,M.hemisphereLights.needsUpdate=y}function XK(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}if(this.getActiveCubeFace=function(){return u},this.getActiveMipmapLevel=function(){return n},this.getRenderTarget=function(){return f},this.setRenderTargetTextures=function(M,y,m){let b=T.get(M);if(b.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,b.__autoAllocateDepthBuffer===!1)b.__useRenderToTexture=!1;T.get(M.texture).__webglTexture=y,T.get(M.depthTexture).__webglTexture=b.__autoAllocateDepthBuffer?void 0:m,b.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,y){let m=T.get(M);m.__webglFramebuffer=y,m.__useDefaultFramebuffer=y===void 0},this.setRenderTarget=function(M,y=0,m=0){f=M,u=y,n=m;let b=null,h=!1,q0=!1;if(M){let E0=T.get(M);if(E0.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(j.FRAMEBUFFER,E0.__webglFramebuffer),Z0.copy(M.viewport),M0.copy(M.scissor),k0=M.scissorTest,L.viewport(Z0),L.scissor(M0),L.setScissorTest(k0),a=-1;return}else if(E0.__webglFramebuffer===void 0)l.setupRenderTarget(M);else if(E0.__hasExternalTextures)l.rebindTextures(M,T.get(M.texture).__webglTexture,T.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let v0=M.depthTexture;if(E0.__boundDepthTexture!==v0){if(v0!==null&&T.has(v0)&&(M.width!==v0.image.width||M.height!==v0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");l.setupDepthRenderbuffer(M)}}let L0=M.texture;if(L0.isData3DTexture||L0.isDataArrayTexture||L0.isCompressedArrayTexture)q0=!0;let z0=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget){if(Array.isArray(z0[y]))b=z0[y][m];else b=z0[y];h=!0}else if(M.samples>0&&l.useMultisampledRTT(M)===!1)b=T.get(M).__webglMultisampledFramebuffer;else if(Array.isArray(z0))b=z0[m];else b=z0;Z0.copy(M.viewport),M0.copy(M.scissor),k0=M.scissorTest}else Z0.copy(l0).multiplyScalar(N0).floor(),M0.copy(B0).multiplyScalar(N0).floor(),k0=T0;if(m!==0)b=g;if(L.bindFramebuffer(j.FRAMEBUFFER,b))L.drawBuffers(M,b);if(L.viewport(Z0),L.scissor(M0),L.setScissorTest(k0),h){let E0=T.get(M.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+y,E0.__webglTexture,m)}else if(q0){let E0=y;for(let L0=0;L0<M.textures.length;L0++){let z0=T.get(M.textures[L0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+L0,z0.__webglTexture,m,E0)}}else if(M!==null&&m!==0){let E0=T.get(M.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,E0.__webglTexture,m)}a=-1},this.readRenderTargetPixels=function(M,y,m,b,h,q0,R0,E0=0){if(!(M&&M.isWebGLRenderTarget)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let L0=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&R0!==void 0)L0=L0[R0];if(L0){L.bindFramebuffer(j.FRAMEBUFFER,L0);try{let z0=M.textures[E0],v0=z0.format,x0=z0.type;if(M.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+E0);if(!WJ.textureFormatReadable(v0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!WJ.textureTypeReadable(x0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(y>=0&&y<=M.width-b&&(m>=0&&m<=M.height-h))j.readPixels(y,m,b,h,s.convert(v0),s.convert(x0),q0)}finally{let z0=f!==null?T.get(f).__webglFramebuffer:null;L.bindFramebuffer(j.FRAMEBUFFER,z0)}}},this.readRenderTargetPixelsAsync=async function(M,y,m,b,h,q0,R0,E0=0){if(!(M&&M.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let L0=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&R0!==void 0)L0=L0[R0];if(L0)if(y>=0&&y<=M.width-b&&(m>=0&&m<=M.height-h)){L.bindFramebuffer(j.FRAMEBUFFER,L0);let z0=M.textures[E0],v0=z0.format,x0=z0.type;if(M.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+E0);if(!WJ.textureFormatReadable(v0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!WJ.textureTypeReadable(x0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let A0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,A0),j.bufferData(j.PIXEL_PACK_BUFFER,q0.byteLength,j.STREAM_READ),j.readPixels(y,m,b,h,s.convert(v0),s.convert(x0),0);let o0=f!==null?T.get(f).__webglFramebuffer:null;L.bindFramebuffer(j.FRAMEBUFFER,o0);let UJ=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await HW(j,UJ,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,A0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,q0),j.deleteBuffer(A0),j.deleteSync(UJ),q0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,y=null,m=0){let b=Math.pow(2,-m),h=Math.floor(M.image.width*b),q0=Math.floor(M.image.height*b),R0=y!==null?y.x:0,E0=y!==null?y.y:0;l.setTexture2D(M,0),j.copyTexSubImage2D(j.TEXTURE_2D,m,0,0,R0,E0,h,q0),L.unbindTexture()},this.copyTextureToTexture=function(M,y,m=null,b=null,h=0,q0=0){let R0,E0,L0,z0,v0,x0,A0,o0,UJ,YJ=M.isCompressedTexture?M.mipmaps[q0]:M.image;if(m!==null)R0=m.max.x-m.min.x,E0=m.max.y-m.min.y,L0=m.isBox3?m.max.z-m.min.z:1,z0=m.min.x,v0=m.min.y,x0=m.isBox3?m.min.z:0;else{let GJ=Math.pow(2,-h);if(R0=Math.floor(YJ.width*GJ),E0=Math.floor(YJ.height*GJ),M.isDataArrayTexture)L0=YJ.depth;else if(M.isData3DTexture)L0=Math.floor(YJ.depth*GJ);else L0=1;z0=0,v0=0,x0=0}if(b!==null)A0=b.x,o0=b.y,UJ=b.z;else A0=0,o0=0,UJ=0;let a0=s.convert(y.format),BJ=s.convert(y.type),O0;if(y.isData3DTexture)l.setTexture3D(y,0),O0=j.TEXTURE_3D;else if(y.isDataArrayTexture||y.isCompressedArrayTexture)l.setTexture2DArray(y,0),O0=j.TEXTURE_2D_ARRAY;else l.setTexture2D(y,0),O0=j.TEXTURE_2D;L.activeTexture(j.TEXTURE0),L.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,y.flipY),L.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),L.pixelStorei(j.UNPACK_ALIGNMENT,y.unpackAlignment);let yJ=L.getParameter(j.UNPACK_ROW_LENGTH),u0=L.getParameter(j.UNPACK_IMAGE_HEIGHT),xJ=L.getParameter(j.UNPACK_SKIP_PIXELS),rJ=L.getParameter(j.UNPACK_SKIP_ROWS),M9=L.getParameter(j.UNPACK_SKIP_IMAGES);L.pixelStorei(j.UNPACK_ROW_LENGTH,YJ.width),L.pixelStorei(j.UNPACK_IMAGE_HEIGHT,YJ.height),L.pixelStorei(j.UNPACK_SKIP_PIXELS,z0),L.pixelStorei(j.UNPACK_SKIP_ROWS,v0),L.pixelStorei(j.UNPACK_SKIP_IMAGES,x0);let Q8=M.isDataArrayTexture||M.isData3DTexture,r0=y.isDataArrayTexture||y.isData3DTexture;if(M.isDepthTexture){let GJ=T.get(M),L9=T.get(y),QJ=T.get(GJ.__renderTarget),V9=T.get(L9.__renderTarget);L.bindFramebuffer(j.READ_FRAMEBUFFER,QJ.__webglFramebuffer),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,V9.__webglFramebuffer);for(let $8=0;$8<L0;$8++){if(Q8)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(M).__webglTexture,h,x0+$8),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(y).__webglTexture,q0,UJ+$8);j.blitFramebuffer(z0,v0,R0,E0,A0,o0,R0,E0,j.DEPTH_BUFFER_BIT,j.NEAREST)}L.bindFramebuffer(j.READ_FRAMEBUFFER,null),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(h!==0||M.isRenderTargetTexture||T.has(M)){let GJ=T.get(M),L9=T.get(y);L.bindFramebuffer(j.READ_FRAMEBUFFER,i),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,x);for(let QJ=0;QJ<L0;QJ++){if(Q8)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,GJ.__webglTexture,h,x0+QJ);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,GJ.__webglTexture,h);if(r0)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,L9.__webglTexture,q0,UJ+QJ);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,L9.__webglTexture,q0);if(h!==0)j.blitFramebuffer(z0,v0,R0,E0,A0,o0,R0,E0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(r0)j.copyTexSubImage3D(O0,q0,A0,o0,UJ+QJ,z0,v0,R0,E0);else j.copyTexSubImage2D(O0,q0,A0,o0,z0,v0,R0,E0)}L.bindFramebuffer(j.READ_FRAMEBUFFER,null),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(r0)if(M.isDataTexture||M.isData3DTexture)j.texSubImage3D(O0,q0,A0,o0,UJ,R0,E0,L0,a0,BJ,YJ.data);else if(y.isCompressedArrayTexture)j.compressedTexSubImage3D(O0,q0,A0,o0,UJ,R0,E0,L0,a0,YJ.data);else j.texSubImage3D(O0,q0,A0,o0,UJ,R0,E0,L0,a0,BJ,YJ);else if(M.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,q0,A0,o0,R0,E0,a0,BJ,YJ.data);else if(M.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,q0,A0,o0,YJ.width,YJ.height,a0,YJ.data);else j.texSubImage2D(j.TEXTURE_2D,q0,A0,o0,R0,E0,a0,BJ,YJ);if(L.pixelStorei(j.UNPACK_ROW_LENGTH,yJ),L.pixelStorei(j.UNPACK_IMAGE_HEIGHT,u0),L.pixelStorei(j.UNPACK_SKIP_PIXELS,xJ),L.pixelStorei(j.UNPACK_SKIP_ROWS,rJ),L.pixelStorei(j.UNPACK_SKIP_IMAGES,M9),q0===0&&y.generateMipmaps)j.generateMipmap(O0);L.unbindTexture()},this.initRenderTarget=function(M){if(T.get(M).__webglFramebuffer===void 0)l.setupRenderTarget(M)},this.initTexture=function(M){if(M.isCubeTexture)l.setTextureCube(M,0);else if(M.isData3DTexture)l.setTexture3D(M,0);else if(M.isDataArrayTexture||M.isCompressedArrayTexture)l.setTexture2DArray(M,0);else l.setTexture2D(M,0);L.unbindTexture()},this.resetState=function(){u=0,n=0,f=null,L.reset(),H0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pQ}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=g0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=g0._getUnpackColorSpace()}}var j8=[0,0.32,0.58,0.82,1],nG=Math.PI*(3-Math.sqrt(5)),A$=new WeakMap;function iW({cinematic:J=!1}={}){let Q=J?3:2,$=J?4:3,Z=[],W=new Map,K=new Map;for(let U=-Q;U<=Q;U++)for(let N=-Q;N<=Q;N++){if(Math.abs(U+N)>Q)continue;let E=0.645*U,G=0.43*Math.sqrt(3)*(N+U/2),D=[];for(let k=0;k<6;k++){let z=k*Math.PI/3,q=E+0.43*Math.cos(z),F=G+0.43*Math.sin(z),P=`${Math.round(q*1e6)},${Math.round(F*1e6)}`,C=W.get(P);if(C===void 0)C=Z.length,W.set(P,C),Z.push([q,F]);D.push(C)}for(let k=0;k<6;k++){let z=D[k],q=D[(k+1)%6],F=Math.min(z,q),P=Math.max(z,q);K.set(`${F},${P}`,[F,P])}}let H=[],Y=[];for(let U=0;U<$;U++){let N=H.length,E=U===1?0.14333333333333334:0;Z.forEach(([G,D],k)=>{H.push({position:[G+E,(U-($-1)/2)*(J?0.56:0.46),D],layer:U,radius:k%11===0?0.102:0.077,accent:(k+U*5)%9===0})});for(let[G,D]of K.values())Y.push([G+N,D+N])}let X={atoms:H,bonds:Y,cinematic:J};return A$.set(X,oW(X)),X}function oW(J){let Q=j8.map(()=>new Float32Array(J.atoms.length*3));return J.atoms.forEach(($,Z)=>{let[W,K,H]=$.position,Y=$.layer-(J.cinematic?1.5:1),X=Z*3;Q[0].set([W,K,H],X);let U=Y*(J.cinematic?0.2:0.13);Q[1].set([W*Math.cos(U)+Y*(J.cinematic?0.65:0.52),Y*(J.cinematic?1.55:1.6)+W*Math.sin(U),H+Y*(J.cinematic?0.65:0.23)],X);let N=1-2*(Z+0.5)/J.atoms.length,E=Math.sqrt(1-N*N),G=Z*nG,D=J.cinematic?3.5+(0.5+0.5*Math.sin(Z*1.71))*1.9:2.7+Math.sin(Z*1.71)*0.18;Q[2].set([Math.cos(G)*E*D*(J.cinematic?1.4:1)+W*0.08,N*(J.cinematic?3.3:2.9)+Math.sin(Z*0.73)*0.08,Math.sin(G)*E*D*(J.cinematic?1:0.87)],X),Q[3].set([W*1.12,Y*(J.cinematic?0.72:0.59)+Math.sin(W*1.3)*0.62+Math.cos(H*1.8)*0.1,H*0.96],X);let k=W*(J.cinematic?0.7:0.92),z=(J.cinematic?2.05:1.52)+Y*0.42;Q[4].set([Math.sin(k)*z,Math.cos(k)*z-1.02,H*0.97+Y*0.07],X)}),Q}function aW(J,Q,$){let Z=J.atoms.length*3;if($.length<Z)throw RangeError(`Science positions require ${Z} coordinates`);let W=A$.get(J);if(!W)W=oW(J),A$.set(J,W);let K=Number.isNaN(Q)?0:Math.min(1,Math.max(0,Q)),H=0;while(H<j8.length-2&&K>j8[H+1])H++;let Y=(K-j8[H])/(j8[H+1]-j8[H]),X=Y*Y*Y*(Y*(Y*6-15)+10),U=W[H],N=W[H+1];for(let E=0;E<Z;E++)$[E]=U[E]+(N[E]-U[E])*X}var sG={hero:[0,1],simulation:[0.22,0.86],structure:[0,0.32],representation:[0.34,0.64],prediction:[0.66,1],discovery:[0,1]};function iG(){let Q=new Uint8Array(65536);for(let Z=0;Z<128;Z++)for(let W=0;W<128;W++){let K=W/127*2-1,H=1-Z/127*2,Y=Math.sqrt(Math.max(0,1-K*K-H*H)),X=Math.exp(-((K+0.38)**2/0.035+(H-0.32)**2/0.19)),U=Math.exp(-((K-0.63)**2/0.009+(H-0.08)**2/0.28)),N=Math.exp(-((K+0.08)**2/0.4+(H+0.76)**2/0.025)),E=(1-Y)**4,G=Math.min(1,0.2+Y*0.22+Math.max(0,H)*0.16+X*0.95+U*0.75+N*0.38+E*0.48),D=(Z*128+W)*4;Q[D]=Math.round(G*240),Q[D+1]=Math.round(G*249),Q[D+2]=Math.round(G*255),Q[D+3]=255}let $=new C8(Q,128,128);return $.colorSpace=t8,$.magFilter=VJ,$.minFilter=VJ,$.needsUpdate=!0,$}async function rW(J,Q){let $=new I$({canvas:J,alpha:!0,antialias:!0,powerPreference:"high-performance"});$.setClearColor(329482,0),$.outputColorSpace=t8,$.toneMapping=i8,$.toneMappingExposure=1.2;let Z=new Q6,W=Q==="hero"||Q==="discovery",K=new TJ(W?42:35,1,0.1,80);K.position.set(0,0.4,11.5),K.lookAt(0,0,0);let H=new w9;H.rotation.set(0.46,-0.42,-0.3),Z.add(H);let Y=iW({cinematic:W}),X=new Float32Array(Y.atoms.length*3),U=new K7(1,24,16),N=new Z7(1,1,1,10,1),E=iG(),G=new H7({matcap:E}),D=new H7({matcap:E,color:9215402}),k=new Q7(U,G,Y.atoms.length),z=new Q7(N,D,Y.bonds.length);k.instanceMatrix.setUsage(A8),z.instanceMatrix.setUsage(A8),k.frustumCulled=!1,z.frustumCulled=!1;let q=[11912914,6651538,14805230,8493485],F=new m0;Y.atoms.forEach((j0,c)=>k.setColorAt(c,F.setHex(j0.accent?5158619:q[j0.layer]))),H.add(z,k);let P=new CJ,C=new Float32Array(Y.bonds.length*6);P.setAttribute("position",new _J(C,3).setUsage(A8));let V=new w8({color:9360622,transparent:!0,opacity:0,depthWrite:!1}),A=new $7(P,V);A.frustumCulled=!1,H.add(A);let I=new Float32Array(Y.atoms.length*6),w=new CJ;w.setAttribute("position",new _J(I,3).setUsage(A8));let R=new w8({color:10213613,transparent:!0,opacity:0,depthWrite:!1}),B=new $7(w,R);B.frustumCulled=!1,H.add(B);let p=new LJ,_=new v,g=new v,i=new v,x=new v(0,1,0),[u,n]=sG[Q],f=!1,a=1,e=1,Z0=!1;function M0(j0,c,$0,N0){if(f)return;let K0=u+(n-u)*Math.max(0,Math.min(1,j0));aW(Y,K0,X);let I0=o9.smoothstep(K0,0.34,0.54)*(1-o9.smoothstep(K0,0.61,0.81));for(let B0=0;B0<Y.atoms.length;B0++){let T0=B0*3,n0=X[T0]-c*3,h0=X[T0+2]-$0*3,f0=Math.exp(-(n0*n0+h0*h0)*0.55)*N0;X[T0+1]+=f0*(0.16+Y.atoms[B0].layer*0.09),p.position.fromArray(X,T0),p.quaternion.identity(),p.scale.setScalar(Y.atoms[B0].radius*(W?1.85:1.65)*(1+(W&&B0%23===0?I0*0.65:0))),p.updateMatrix(),k.setMatrixAt(B0,p.matrix);let NJ=Y.atoms[B0].position;for(let XJ=0;XJ<3;XJ++)I[B0*6+XJ]=X[T0+XJ],I[B0*6+XJ+3]=X[T0+XJ]-(X[T0+XJ]-NJ[XJ])*0.14*I0}for(let B0=0;B0<Y.bonds.length;B0++){let[T0,n0]=Y.bonds[B0];_.fromArray(X,T0*3),g.fromArray(X,n0*3),i.subVectors(g,_);let h0=i.length(),f0=(1-o9.smoothstep(h0,0.65,1.25))*(1-I0*0.9);p.position.copy(_).add(g).multiplyScalar(0.5),p.quaternion.setFromUnitVectors(x,i.normalize()),p.scale.set(0.028*f0,Math.max(0.001,h0),0.028*f0),p.updateMatrix(),z.setMatrixAt(B0,p.matrix),_.toArray(C,B0*6),g.toArray(C,B0*6+3)}k.instanceMatrix.needsUpdate=!0,z.instanceMatrix.needsUpdate=!0,P.attributes.position.needsUpdate=!0,w.attributes.position.needsUpdate=!0;let l0=o9.smoothstep(K0,0.36,0.53)*(1-o9.smoothstep(K0,0.64,0.8));if(V.opacity=l0*(W?0.018:0.05),A.visible=V.opacity>0.003,R.opacity=W?I0*0.16:0,B.visible=R.opacity>0.003,H.rotation.y=-0.42+K0*0.55+c*N0*0.06,H.rotation.x=0.46+K0*0.15,W){let B0=Z0?0.5:0.72-I0*0.12,T0=Z0?Q==="hero"?0.68:0.72:0.51;K.setViewOffset(a,e,(0.5-B0)*a,(0.5-T0)*e,a,e)}if($.render(Z,K),"dataset"in J)J.dataset.phase=K0.toFixed(3),J.dataset.drawCalls=String($.info.render.calls);return K0.toFixed(3)}function k0(j0,c,$0=1){a=j0,e=c,Z0=j0<=900;let N0=j0/Math.max(c,1);$.setPixelRatio(Math.min($0,j0<600?1.5:1.75)),$.setSize(j0,c,!1),K.aspect=N0,K.position.z=W?Z0?Math.max(13.3,15.3/N0):10.5:Math.max(8.7,(j0<600?9.7:8.8)/N0),K.updateProjectionMatrix()}function e0(j0=!0){if(f=!0,k.dispose(),z.dispose(),U.dispose(),N.dispose(),G.dispose(),D.dispose(),P.dispose(),V.dispose(),w.dispose(),R.dispose(),E.dispose(),$.dispose(),j0)$.forceContextLoss()}try{await $.compileAsync(Z,K)}catch(j0){throw e0(),j0}return{render:M0,resize:k0,dispose:e0}}var E7=self,W9,eW="hero",jJ,b9={width:1,height:1,pixelRatio:1},N7={progress:0,x:0,y:0,strength:0},K9=!1,oJ=!1,O6=!1,y8=0,f8,v8;function JK(){if(f8!==void 0)clearTimeout(f8);f8=void 0}function _$(J){if(K9||oJ)return;E7.postMessage({type:"error",message:J instanceof Error?J.message:String(J)})}function QK(){if(!jJ||K9||oJ)return;let J=jJ.render(N7.progress,N7.x,N7.y,N7.strength);if(typeof J==="string")E7.postMessage({type:"rendered",phase:J})}function tW(){if(f8!==void 0||!jJ||K9||oJ)return;f8=setTimeout(()=>{f8=void 0;try{QK()}catch(J){_$(J)}},0)}async function $K(){if(!W9||K9||oJ||O6||jJ)return;let J=++y8;O6=!0;try{let Q=await rW(W9,eW);if(K9||oJ||J!==y8){Q.dispose(!1);return}jJ=Q,jJ.resize(b9.width,b9.height,b9.pixelRatio),QK(),E7.postMessage({type:"ready"})}catch(Q){if(J===y8)jJ?.dispose(!1),jJ=void 0,_$(Q)}finally{if(J===y8)O6=!1}}function R6(J){if(J.preventDefault(),K9||oJ)return;oJ=!0,y8++,O6=!1,JK(),E7.postMessage({type:"lost"})}function k6(){if(K9||!oJ)return;if(oJ=!1,v8!==void 0)clearTimeout(v8);v8=setTimeout(()=>{if(v8=void 0,K9||oJ)return;jJ?.dispose(!1),jJ=void 0,$K()},0)}function oG(J){J.addEventListener("webglcontextlost",R6),J.addEventListener("webglcontextrestored",k6),J.addEventListener("contextlost",R6),J.addEventListener("contextrestored",k6)}function aG(){if(K9=!0,y8++,JK(),v8!==void 0)clearTimeout(v8);if(W9)W9.removeEventListener("webglcontextlost",R6),W9.removeEventListener("webglcontextrestored",k6),W9.removeEventListener("contextlost",R6),W9.removeEventListener("contextrestored",k6);jJ?.dispose(),jJ=void 0}E7.onmessage=({data:J})=>{if(K9)return;try{switch(J.type){case"init":if(W9)throw Error("A scientific scene worker accepts one canvas");W9=J.canvas,eW=J.mode,b9={width:J.width,height:J.height,pixelRatio:J.pixelRatio},oG(W9),$K();break;case"render":N7={progress:J.progress,x:J.x,y:J.y,strength:J.strength},tW();break;case"resize":if(b9={width:J.width,height:J.height,pixelRatio:J.pixelRatio},jJ&&!oJ)jJ.resize(b9.width,b9.height,b9.pixelRatio);tW();break;case"dispose":aG();break}}catch(Q){_$(Q)}};

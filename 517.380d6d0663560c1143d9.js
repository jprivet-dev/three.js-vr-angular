(self.webpackChunkapp=self.webpackChunkapp||[]).push([[517],{9517:(t,e,s)=>{"use strict";s.r(e),s.d(e,{PlanetsModule:()=>N});var i=s(8583),r=s(2977),n=s(8726),a=s(4252),o=s(639),h=s(9263),c=s(457);class u{constructor(t,e){this.dolly=t,this.renderer=e,this.direction=0,this.cycle=[0,1,0,-1],this.indexCycle=0,this.xrCamera=this.renderer.xr.getCamera(t.camera)}start(){}stop(){this.direction=0}moveSwitch(){this.indexCycle++,this.indexCycle>=this.cycle.length&&(this.indexCycle=0),this.direction=this.cycle[this.indexCycle]}moveForward(){this.direction=-1}moveBackward(){this.direction=1}update(t){if(0!==this.direction){const e=1*t*this.direction;this.dolly.dummy.position.set(0,0,0),this.dolly.dummy.quaternion.copy(this.xrCamera.quaternion),this.dolly.dummy.translateZ(e),this.dolly.position.add(this.dolly.dummy.position)}}}var d=s(320),p=s(3607),l=s(270),m=s(1115),x=s(4007),y=s(6941),w=s(3115),f=s(315);class _{constructor(t){this.store=t,this.mesh=this.createMercury()}update(t){(0,w.r)(this.mesh,t,5)}createMercury(){return new f.l(this.store,"mercury").setSize(y.y8.Mercury).setAxialTilt(y.ZB.Mercury).setMaterialParameters({wireframe:!1,shininess:0}).setTexturesPath("assets/threejs/textures/space/mercury/").setTexturesByDefinition({map:{sd:"mercury_map_1024x512.jpg",hd:"mercury_map_2048x1024.jpg"}}).build()}}class g{constructor(t){this.store=t,this.mesh=this.createVenus()}update(t){(0,w.r)(this.mesh,t,5)}createVenus(){return new f.l(this.store,"venus").setSize(y.y8.Venus).setAxialTilt(y.ZB.Venus).setMaterialParameters({wireframe:!1,shininess:0}).setTexturesPath("assets/threejs/textures/space/venus/").setTexturesByDefinition({map:{sd:"venus_map_1024x512.jpg",hd:"venus_map_2048x1024.jpg"}}).build()}}var v=s(3841),j=s(9088);class b{constructor(t){this.store=t,this.mesh=this.createMars()}update(t){(0,w.r)(this.mesh,t,5)}createMars(){return new f.l(this.store,"mars").setSize(y.y8.Mars).setAxialTilt(y.ZB.Mars).setMaterialParameters({wireframe:!1,shininess:0}).setTexturesPath("assets/threejs/textures/space/mars/").setTexturesByDefinition({map:{sd:"mars_map_1024x512.jpg",hd:"mars_map_2048x1024.jpg"}}).build()}}class T{constructor(t){this.store=t,this.mesh=this.createJupiter()}update(t){(0,w.r)(this.mesh,t,5)}createJupiter(){return new f.l(this.store,"jupiter").setSize(y.y8.Jupiter).setAxialTilt(y.ZB.Jupiter).setMaterialParameters({wireframe:!1,shininess:0}).setTexturesPath("assets/threejs/textures/space/jupiter/").setTexturesByDefinition({map:{sd:"jupiter_map_1024x512.jpg",hd:"jupiter_map_2048x1024.jpg"}}).build()}}var B=s(7758),C=s(8804),S=s(8904);class M extends B.dpR{constructor(t,e,s){super(),this.material=t,this.texturesByDefinition=s,this.setPath(e)}loadByDefinition(t){["map","specularMap","alphaMap"].map(e=>{const s=this.getFilename(e,t);s&&(this.material[e]=this.load(s))})}getFilename(t,e){const s=this.texturesByDefinition[t];if(void 0!==s)return s[e]}}class P{constructor(t){this.store=t,this.mesh=this.createSaturn();const e=this.createRings();this.mesh.add(e)}update(t){(0,w.r)(this.mesh,t,5)}createSaturn(){const t=new f.l(this.store,"saturn").setSize(y.y8.Saturn).setAxialTilt(y.ZB.Saturn).setMaterialParameters({wireframe:!1,shininess:0}).setTexturesPath("assets/threejs/textures/space/saturn/").setTexturesByDefinition({map:{sd:"saturn_map_1024x512.jpg",hd:"saturn_map_2048x1024.jpg"}}).build();return t.rotateX((0,S.Id)(20)),t}createRings(){const t=new B.V4E(y.UO.innerRadius,y.UO.outerRadius,64),e=new C.v({color:16777215,side:B.ehD,transparent:!0}),s=new M(e,"assets/threejs/textures/space/saturn/",{map:{sd:"saturn_rings_map_1024x1024.png",hd:"saturn_rings_map_2048x2048.png"}});this.store.definition$.subscribe(t=>{s.loadByDefinition(t)});const i=new B.Kj0(t,e);return i.rotateX((0,S.Id)(90)),i}}class Z{constructor(t){this.store=t,this.mesh=this.createUranus()}update(t){(0,w.r)(this.mesh,t,5)}createUranus(){return new f.l(this.store,"uranus").setSize(y.y8.Uranus).setAxialTilt(y.ZB.Uranus).setMaterialParameters({wireframe:!1,shininess:0}).setTexturesPath("assets/threejs/textures/space/uranus/").setTexturesByDefinition({map:{sd:"uranus_map_1024x512.jpg",hd:"uranus_map_2048x1024.jpg"}}).build()}}class z{constructor(t){this.store=t,this.mesh=this.createNeptune()}update(t){(0,w.r)(this.mesh,t,5)}createNeptune(){return new f.l(this.store,"neptune").setSize(y.y8.Neptune).setAxialTilt(y.ZB.Neptune).setMaterialParameters({wireframe:!1,shininess:0}).setTexturesPath("assets/threejs/textures/space/neptune/").setTexturesByDefinition({map:{sd:"neptune_map_1024x512.jpg",hd:"neptune_map_2048x1024.jpg"}}).build()}}var A=s(2365),D=s(8656);const R={fov:30,near:1,far:2e3,onVRSessionStartPosition:{camera:{x:0,y:0,z:0},dolly:{x:0,y:1,z:5}},onVRSessionEndPosition:{camera:{x:0,y:3,z:20},dolly:{x:0,y:0,z:0}}};let U=(()=>{class t{constructor(t){this.store=t,this.dollyCameraParams=R}buildScene(t){this.store.antialias$.subscribe(e=>{this.onAntialiasChange(t,e)})}switchControl(t){this.controls.pointer.lock()}onAntialiasChange(t,e){t.empty();const s=new D.d(this.store).scene,i=new c.a(t,this.dollyCameraParams);s.add(i);const r=new A.z(t,s,i.camera,{antialias:e}),n=new l.M(r),a=new m.A(t,i,r);new x.$(this.store,r).add(i),new d.Hv(this.store,s,r).createRight();const o=new u(i,r);n.add(o),this.store.vrControllerRightIsSelecting$.subscribe(t=>{t&&o.moveSwitch()});const h=new p.Ck(this.store);s.add(h.light);const y=new _(this.store);y.mesh.position.set(1.5,-2,4),s.add(y.mesh),n.add(y);const w=new g(this.store);w.mesh.position.set(-1.5,-2,4),s.add(w.mesh),n.add(w);const f=new v.I(this.store);f.mesh.position.set(1.5,0,0),s.add(f.mesh),n.add(f);const B=new j.J(this.store);B.mesh.position.set(f.mesh.position.x+2,0,f.mesh.position.z),s.add(B.mesh),n.add(B);const C=new b(this.store);C.mesh.position.set(-1.5,0,0),s.add(C.mesh),n.add(C);const S=new T(this.store);S.mesh.position.set(-17,0,0),s.add(S.mesh),n.add(S);const M=new P(this.store);M.mesh.position.set(17,0,0),s.add(M.mesh),n.add(M);const R=new Z(this.store);R.mesh.position.set(-5,3,-13),s.add(R.mesh),n.add(R);const U=new z(this.store);U.mesh.position.set(5,5,-13),s.add(U.mesh),n.add(U),this.controls=new d.$p(i.camera,r.domElement),n.add(this.controls),n.start(),a.start()}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(h.d))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var k=s(4256),J=s(4901),V=s(5789);const I=["container"],q=[{path:"",component:(()=>{class t{constructor(t,e,s){this.window=t,this.store=e,this.service=s}ngOnInit(){}ngAfterViewInit(){const t=new a.W(this.window,this.containerRef);this.service.buildScene(t)}onSwithControls(t){this.service.switchControl(t)}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(Window),o.Y36(h.d),o.Y36(U))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-planets-page"]],viewQuery:function(t,e){if(1&t&&o.Gf(I,5),2&t){let t;o.iGM(t=o.CRH())&&(e.containerRef=t.first)}},decls:9,vars:0,consts:[["id","container"],["container",""],[1,"buttons","buttons-top-right"],[3,"click"],[1,"buttons","buttons-top-left"]],template:function(t,e){1&t&&(o._UZ(0,"div",0,1),o.TgZ(2,"div",2),o.TgZ(3,"button",3),o.NdJ("click",function(t){return e.onSwithControls(t)}),o._uU(4," Fly "),o.qZA(),o._UZ(5,"app-button-antialias"),o._UZ(6,"app-button-definition"),o.qZA(),o.TgZ(7,"div",4),o._UZ(8,"app-button-home"),o.qZA())},directives:[k.p,J.T,V.T],styles:["#container[_ngcontent-%COMP%]{position:absolute;top:0;left:0;bottom:0;right:0}"]}),t})()}];let F=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[n.Bz.forChild(q)],n.Bz]}),t})(),N=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[i.ez,r.m,F]]}),t})()}}]);
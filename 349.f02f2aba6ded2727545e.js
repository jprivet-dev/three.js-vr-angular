(self.webpackChunkapp=self.webpackChunkapp||[]).push([[349],{8349:(t,s,i)=>{"use strict";i.r(s),i.d(s,{EarthModule:()=>O});var n={};i.r(n),i.d(n,{switchFlyMode:()=>d,vrSessionEnd:()=>p,vrSessionStart:()=>h});var e=i(8583),a=i(8873),o=i(9812),r=i(7747),c=i(5466);const d=(0,c.PH)("[Earth] switch fly mode"),h=(0,c.PH)("[Earth] VR session start"),p=(0,c.PH)("[Earth] VR session end");(0,c.G0)(n);var l=i(7716),u=i(457),f=i(9505),w=i(3607),S=i(949),y=i(270),m=i(3841),v=i(9088),b=i(8656),A=i(2628),$=i(5319);const M={fov:80,near:1,far:8e3,vrSession:{onStart:{camera:{position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0}},dolly:{position:{x:.5,y:0,z:2.5},rotation:{x:0,y:0,z:0}}},onEnd:{camera:{position:{x:0,y:0,z:5},rotation:{x:0,y:0,z:0}},dolly:{position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0}}}}};var D=i(2647);const E="earth",z=(0,c.Lq)({flyMode:!1,vrSession:!1},(0,c.on)(d,t=>Object.assign(Object.assign({},t),{flyMode:!t.flyMode})),(0,c.on)(h,t=>Object.assign(Object.assign({},t),{vrSession:!0})),(0,c.on)(p,t=>Object.assign(Object.assign({},t),{vrSession:!1}))),g=(0,c.ZF)(E),x=(0,c.P1)(g,t=>t.flyMode),F=(0,c.P1)(g,t=>t.vrSession);let j=(()=>{class t{constructor(t){this.store=t,this.flyMode$=this.store.select(x),this.vrSession$=this.store.select(F)}dispatch(t){this.store.dispatch(t)}}return t.\u0275fac=function(s){return new(s||t)(l.LFG(c.yh))},t.\u0275prov=l.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),C=(()=>{class t{constructor(t,s){this.app=t,this.facade=s,this.subscription=new $.w,this.dollyCameraParams=M,this.animate=()=>{},this.completed=!1}buildScene(t){this.completed?this.update(t):(this.create(t),this.completed=!0)}create(t){const s=new A.$,i=new S.I,n=new y.M;n.add(t);const e=new b.d;i.add(e);const a=e.scene;this.dollyCameraParams.aspect=t.ratio();const o=new u.a(this.dollyCameraParams);t.resizeAdd(o),a.add(o),s.add(o);const r=new w.Ck;a.add(r.light),i.add(r);const c=new m.I;a.add(c.mesh),i.add(c),n.add(c);const d=new v.J;d.mesh.position.set(2,0,0),a.add(d.mesh),i.add(d),n.add(d),this.controls=new f.bq(o.camera,t.renderer.domElement,{autoRotateSpeed:.2,autoRotate:!0,target:c.mesh.position}),n.add(this.controls),this.subscription.add(this.app.definition$.subscribe(t=>{i.loadTexturesByDefinition(t)})),this.subscription.add(this.facade.vrSession$.subscribe(t=>{t?s.onSessionStart():s.onSessionEnd()})),this.animate=()=>{t.renderer.setAnimationLoop(()=>{n.update(),t.renderer.render(a,o.camera)})},this.animate()}update(t){this.animate(),this.controls.updateDomElement(t.renderer.domElement)}unsubscribe(){this.completed=!1,this.subscription.unsubscribe(),this.subscription=new $.w}}return t.\u0275fac=function(s){return new(s||t)(l.LFG(D.l),l.LFG(j))},t.\u0275prov=l.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var L=i(2107),Z=i(6534);const B=[{path:"",component:(()=>{class t{constructor(t,s,i,n){this.window=t,this.service=s,this.app=i,this.facade=n,this.flyMode$=this.facade.flyMode$,this.stats$=this.app.stats$,this.isHDDefinition$=this.app.isHDDefinition$,this.antialias$=this.app.antialias$}onContainerInit(t){this.service.buildScene(t)}onSwitchFlyMode(){this.facade.dispatch(d())}onSwitchStats(){this.app.dispatch(r.q.switchStats())}onSwitchDefinition(){this.app.dispatch(r.q.switchDefinition())}onSwitchAntialias(){this.app.dispatch(r.q.switchAntialias())}onVRSessionStart(){this.facade.dispatch(h())}onVRSessionEnd(){this.facade.dispatch(p())}ngOnDestroy(){this.service.unsubscribe()}}return t.\u0275fac=function(s){return new(s||t)(l.Y36(Window),l.Y36(C),l.Y36(D.l),l.Y36(j))},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-earth-page"]],decls:6,vars:15,consts:[[3,"stats$","antialias$","vrButtonEnable","containerInit","vrSessionStart","vrSessionEnd"],[3,"flyModeActive","statsActive","hdDefinitionActive","antialiasActive","switchFlyMode","switchStats","switchDefinition","switchAntialias"]],template:function(t,s){1&t&&(l.TgZ(0,"app-container",0),l.NdJ("containerInit",function(t){return s.onContainerInit(t)})("vrSessionStart",function(){return s.onVRSessionStart()})("vrSessionEnd",function(){return s.onVRSessionEnd()}),l.qZA(),l.TgZ(1,"app-menu",1),l.NdJ("switchFlyMode",function(){return s.onSwitchFlyMode()})("switchStats",function(){return s.onSwitchStats()})("switchDefinition",function(){return s.onSwitchDefinition()})("switchAntialias",function(){return s.onSwitchAntialias()}),l.ALo(2,"async"),l.ALo(3,"async"),l.ALo(4,"async"),l.ALo(5,"async"),l.qZA()),2&t&&(l.Q6J("stats$",s.stats$)("antialias$",s.antialias$)("vrButtonEnable",!0),l.xp6(1),l.Q6J("flyModeActive",l.lcZ(2,7,s.flyMode$))("statsActive",l.lcZ(3,9,s.stats$))("hdDefinitionActive",l.lcZ(4,11,s.isHDDefinition$))("antialiasActive",l.lcZ(5,13,s.antialias$)))},directives:[L.e,Z.M],pipes:[e.Ov],styles:[""]}),t})()}];let I=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[o.Bz.forChild(B)],o.Bz]}),t})(),J=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[c.Aw.forFeature(E,z)]]}),t})(),O=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[e.ez,a.m,I,J]]}),t})()}}]);
webpackJsonp([1,2],{2:function(e,a,t){"use strict";function n(){console.log("setup");var e=new d.a.Sprite(d.a.loader.resources["./static/car.png"].texture);p.addChild(e),p.interactive=!0,p.on("mousedown",o),p.on("mouseup",r),w.render(p)}function o(e){c=new d.a.Point(e.data.global.x,e.data.global.y)}function r(e){u=new d.a.Point(e.data.global.x,e.data.global.y);var a=new d.a.Sprite(d.a.loader.resources["./static/car.png"].texture),t=new d.a.filters.BlurFilter(3,3);a.filters=[t];var n=new d.a.Graphics;n.beginFill(),n.drawRect(c.x,c.y,u.x-c.x+20,u.y-c.y+20),n.endFill(),p.addChild(n),a.mask=n,p.addChild(a),console.log(c,u),w.render(p)}Object.defineProperty(a,"__esModule",{value:!0});var i=t(0),d=t.n(i),l=550,s=369,c=void 0,u=void 0,p=new d.a.Container,w=d.a.autoDetectRenderer(l,s,{antialias:!0,transparent:!0,resolution:1,autoResize:!0});document.body.appendChild(w.view),d.a.loader.add("./static/car.png").load(n)}},[2]);
//# sourceMappingURL=app.2c850e08787b9a208c82.js.map
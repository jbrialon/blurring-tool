webpackJsonp([1,2],{2:function(e,a,n){"use strict";function o(){console.log("setup");var e=new c.a.Sprite(c.a.loader.resources["./static/car.png"].texture);g.addChild(e),g.interactive=!0,v=new c.a.Sprite(c.a.loader.resources["./static/car.png"].texture);var a=new c.a.filters.BlurFilter(3,3);v.filters=[a],g.addChild(v),p=new c.a.Graphics,p.beginFill(),p.drawRect(0,0,1,1),p.endFill(),v.mask=p,g.addChild(p),g.on("mousedown",t),g.on("mouseup",r),window.requestAnimationFrame(d)}function t(e){w=new c.a.Point(e.data.global.x,e.data.global.y),g.on("mousemove",i),p.beginFill()}function i(e){m=new c.a.Point(e.data.global.x,e.data.global.y),p.clear(),p.drawRect(w.x,w.y,m.x-w.x+20,m.y-w.y+20)}function r(e){p.endFill(),g.off("mousemove",i)}function d(){f.render(g),window.requestAnimationFrame(d)}Object.defineProperty(a,"__esModule",{value:!0});var l=n(0),c=n.n(l),u=550,s=369,w=void 0,m=void 0,p=void 0,v=void 0,g=new c.a.Container,f=c.a.autoDetectRenderer(u,s,{antialias:!0,transparent:!0,resolution:1,autoResize:!0});document.body.appendChild(f.view);var b=document.createElement("button");b.innerHTML="get Image",b.onclick=function(){f.render(g),console.log(f.view.toDataURL())},document.body.appendChild(b),c.a.loader.add("./static/car.png").load(o)}},[2]);
//# sourceMappingURL=app.74625304def1d8416591.js.map
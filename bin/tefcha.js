(function () {var Q={};var R={};var H={},sa=H&&H.__extends||function(){var e=function(r,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])})(r,n)};return function(r,n){function t(){this.constructor=r}e(r,n),r.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}}(),da=H&&H.__assign||function(){return(da=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e}).apply(this,arguments)},U=H&&H.__spreadArrays||function(){for(var e=0,r=0,n=arguments.length;r<n;r++)e+=arguments[r].length;var t=Array(e),o=0;for(r=0;r<n;r++)for(var a=arguments[r],s=0,i=a.length;s<i;s++,o++)t[o]=a[s];return t},z=function(e){function r(r){var n=r.lineno,t=r.msg,o=r.src,a=void 0===o?"":o,s=t;n&&n>0&&(s="at line "+n+": "+s);var i="";return a&&n>0&&(i=a.split(/\n/).map(function(e,r){return{lineno:r+1,line:e}}).slice(Math.max(0,n-1-5),n-1+5).map(function(e){var r=e.lineno,t=e.line;return(r===n?">":" ")+r+": "+t}).join("\n")),e.call(this,s+"\n"+i)||this}return sa(r,e),r}(Error),ea=["if","else","elif","while","for","do","switch","case"],ta=U(ea,["continue","break","pass"]),ua=function(e,r){var n=[],t="",o=r.src,a=o.indentStr,s=o.commentStr;if(e.split(/\r\n|\r|\n/).forEach(function(e,r){if(r++,""!==(e=t+e).trim()){for(var o=0;e.startsWith(a);)o++,e=e.slice(a.length);e.startsWith(s)||(e.endsWith("\\")?t=e.slice(0,-1):(t="",n.push({lineno:r,line:e,nest:o})))}}),""!==t)throw new z({msg:"EOF is found after '\\'"});var i=Math.min.apply(Math,n.map(function(e){return e.nest}));return n=n.map(function(e){return da(da({},e),{nest:e.nest-i})})},va=function(e,r){var n={type:"program",lineno:0,children:[]},t=[n];return e.forEach(function(e){var n=e.lineno,o=e.line,a=e.nest;if(t.length-1<a)throw new z({lineno:n,src:r,msg:"unexpected indent"});for(;t.length-1>a;)t.pop();var s=t.slice(-1)[0],i=o.split(" ")[0];if(ta.includes(i)){var $={type:i,lineno:n,content:o.slice(o.indexOf(" ")+1),children:[]},c=s.children.length>0?s.children.slice(-1)[0]:null;s.children.push($),ea.includes(i)&&(c&&"do"===c.type&&"while"===i||t.push($))}else s.children.push({type:"text",lineno:n,content:o})}),n},fa=function(e,r,n){var t=e.children||[],o={type:"none",lineno:-1};t.forEach(function(a,s){var i=a.lineno;switch(a.type){case"program":case"text":case"if":break;case"else":if(!["if","elif"].includes(o.type))throw new z({lineno:i,src:n,msg:"before \"else\" statement, \"if\" or \"elif\" should exists."});break;case"elif":if(!["if","elif"].includes(o.type))throw new z({lineno:i,src:n,msg:"before \"elif\" statement, \"if\" or \"elif\" should exists."});break;case"while":case"switch":break;case"case":if("switch"!==e.type)throw new z({lineno:i,src:n,msg:"keyword \"case\" should be in \"switch\" statement."});break;case"continue":if(!U(r,[e]).some(function(e){return["for","while","do"].includes(e.type)}))throw new z({lineno:i,src:n,msg:"\"continue\" statement should be in loop"});break;case"break":if(!U(r,[e]).some(function(e){return["for","while","do","case"].includes(e.type)}))throw new z({lineno:i,src:n,msg:"\"break\" statement should be in loop or \"case\"."});break;case"do":if(s+1>=t.length||"while"!==t[s+1].type)throw new z({lineno:i,src:n,msg:"cannot find corresponding keyword \"while\" to keyword \"do\"."});break;case"pass":break;default:throw new z({lineno:i,src:n,msg:"node type \""+a.type+"\" is not implemented yet."});}o=a}),"switch"===e.type&&t.forEach(function(e){var r=e.lineno;if("case"!==e.type)throw new z({lineno:r,src:n,msg:e.type+"\" is found in \"switch\" block. \"switch\" should have \"case\" only"})}),t.forEach(function(t){return fa(t,U(r,[e]),n)})},ga=function(e,r){var n=ua(e,r),t=va(n,e);return fa(t,[],e),t};H.TefchaError=z,H.parse=ga;var K={};var B={},L=B&&B.__extends||function(){var t=function(r,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)r.hasOwnProperty(n)&&(t[n]=r[n])})(r,n)};return function(r,n){function $(){this.constructor=r}t(r,n),r.prototype=null===n?Object.create(n):($.prototype=n.prototype,new $)}}(),wa=B&&B.__spreadArrays||function(){for(var t=0,r=0,n=arguments.length;r<n;r++)t+=arguments[r].length;var $=Array(t),e=0;for(r=0;r<n;r++)for(var s=arguments[r],a=0,i=s.length;a<i;a++,e++)$[e]=s[a];return $},M=Math.max,N=Math.min,J=function(){return function(t){var r=this,n=t.x,$=void 0===n?0:n,e=t.y,s=void 0===e?0:e,a=t.w,i=void 0===a?0:a,o=t.h,u=void 0===o?0:o,x=t.minX,p=void 0===x?0:x,m=t.minY,v=void 0===m?0:m,h=t.maxX,c=void 0===h?0:h,C=t.maxY,d=void 0===C?0:C;this.trans=function(t,n){return r.x+=t,r.y+=n,r},this.x=$,this.y=s,this.w=i,this.h=u,this.minX=p,this.minY=v,this.maxX=c,this.maxY=d}}(),O=function(t){function r(n){var $=n.x,e=n.y,s=t.call(this,{x:$,y:e})||this;return s.clone=function(){return new r({x:s.x,y:s.y})},s.type="point",s}return L(r,t),r}(J),F=function(t){function r(r){var n=r.x,$=r.y,e=r.cmds,s=r.isArrow,a=void 0!==s&&s,i=this,o=0,u=0,x=0,p=0,m=0,v=0;return e.forEach(function(t){var r=t[0],n=t[1];"h"===r?o+=n:u+=n,x=N(x,o),p=N(p,u),m=M(m,o),v=M(v,u)}),(i=t.call(this,{x:n,y:$,minX:x,minY:p,maxX:m,maxY:v,w:m-x,h:v-p})||this).cmds=e,i.isArrow=a,i.type="path",i}return L(r,t),r.vline=function(t){var n=t.x,$=t.y,e=t.step,s=t.isArrow;return new r({x:n,y:$,cmds:[["v",e]],isArrow:void 0!==s&&s})},r.hline=function(t){var n=t.x,$=t.y,e=t.step,s=t.isArrow;return new r({x:n,y:$,cmds:[["h",e]],isArrow:void 0!==s&&s})},r}(J),ha=function(t){function r(r){var n=r.content,$=r.w,e=r.h,s=r.x,a=void 0===s?0:s,i=r.y,o=void 0===i?0:i,u=r.isLabel,x=void 0!==u&&u,p=t.call(this,{x:a,y:o,maxX:$,maxY:e,w:$,h:e})||this;return p.content=n,p.type="text",p.isLabel=x,p}return L(r,t),r.byMeas=function(t){var n=t.x,$=void 0===n?0:n,e=t.y,s=void 0===e?0:e,a=t.text,i=t.attrs,o=t.meas,u=t.isLabel,x=o(a,i);return new r({content:a,x:$,y:s,w:x.w,h:x.h,isLabel:u})},r}(J),ia=function(t){function r(r){var n=r.x,$=void 0===n?0:n,e=r.y,s=void 0===e?0:e,a=r.w,i=r.h,o=t.call(this,{x:$,y:s,w:a,h:i,maxX:a,maxY:i})||this;return o.type="rect",o}return L(r,t),r}(J),ja=function(t){function r(r){var n=r.x,$=void 0===n?0:n,e=r.y,s=void 0===e?0:e,a=r.w,i=r.h,o=t.call(this,{x:$,y:s,w:a,h:i,maxX:a,maxY:i})||this;return o.type="diamond",o}return L(r,t),r}(J),V=function(t){function r(r){var n=r.x,$=r.y,e=r.children,s=t.call(this,{x:n,y:$})||this;return s.add=function(t){return s.minX=N(s.minX,t.x+t.minX),s.minY=N(s.minY,t.y+t.minY),s.maxX=M(s.maxX,t.x+t.maxX),s.maxY=M(s.maxY,t.y+t.maxY),s.w=s.maxX-s.minX,s.h=s.maxY-s.minY,s.children.push(t),s},0===e.length&&(e=wa(e,[new O({x:n,y:$})])),s.minX=N.apply(void 0,e.map(function(t){return t.x+t.minX})),s.minY=N.apply(void 0,e.map(function(t){return t.y+t.minY})),s.maxX=M.apply(void 0,e.map(function(t){return t.x+t.maxX})),s.maxY=M.apply(void 0,e.map(function(t){return t.y+t.maxY})),s.w=s.maxX-s.minX,s.h=s.maxY-s.minY,s.type="group",s.children=e,s}return L(r,t),r}(J);B.BaseShape=J,B.Group=V,B.Diamond=ja,B.Rect=ia,B.Text=ha,B.Path=F,B.Point=O;var X=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={start:-1/0,end:-1/0,next:null},r=n;t.forEach(function(t){var e={start:t[0],end:t[1],next:null};r.next=e,r=e});var a={start:1/0,end:1/0,next:null};return r.next=a,n},_=function(){return function t(e){var n=this;this.clone=function(){return new t(n.ref)},this.cloneDeep=function(){return new t(X.apply(void 0,n.ranges().map(function(t){return[t.start,t.end]})))},this.findSpace=function(t,e){for(var r=n.ref;r.next.start<t;)r=r.next;for(var a=Math.max(t,r.end);r.next.start-a<e;)a=(r=r.next).end;return n.ref=r,a},this.allocate=function(t,e){var r=n.findSpace(t,e),a=r+e,o=n.ref;if(o.end===r)o.next.start===a?(o.end=o.next.end,o.next=o.next.next):o.end=a;else if(o.next.start===a)o.next.start=r,n.ref=o.next;else{var x={start:r,end:a,next:o.next};o.next=x,n.ref=x}return r},this.merge=function(t,e){var r=t+e;t=Math.max(t,n.ref.start);for(var a,o=n.ref;o.next.start<=t;)o=o.next;for(t<=o.end?a=o:(a={start:t,end:t,next:o.next},o.next=a,o=a);o.next.start<=r;)o=o.next;r<=o.end?(a.end=o.end,a.next=o.next):(a.end=r,a.next=o.next),n.ref=a},this.ranges=function(){var t=[],e=n.ref;for(e.start===-1/0&&(e=e.next);e.start!==1/0;)t.push({start:e.start,end:e.end}),e=e.next;return t},this.mergeAllocator=function(t){t.ranges().forEach(function(t){var e=t.start,r=t.end;n.merge(e,r-e)})},this.ref=e}}();var ka=K&&K.__assign||function(){return(ka=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},aa=K&&K.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var a=Array(e),o=0;for(t=0;t<r;t++)for(var n=arguments[t],i=0,s=n.length;i<s;i++,o++)a[o]=n[i];return a},ba={while:{break:"E",continue:"W"},doWhile:{break:"E",continue:"E"},for:{break:"E",continue:"W"}},ca=function(){return function(e){void 0===e&&(e="none"),this.type=e,this.breaks=[],this.continues=[]}}(),la=function(){return function e(t){var r=this,a=t.shapes,o=t.measureText,n=t.config,i=t.loop,s=t.AllocW,c=t.AllocE,l=t.x,h=t.y;this.shiftX=function(e){var t=r,a=t.shapes,o=t.loop;a.trans(e,0),r.x+=e;var n=o.breaks,i=o.continues;n.forEach(function(t){return t.trans(e,0)}),i.forEach(function(t){return t.trans(e,0)})},this.step=function(e){void 0===e&&(e=r.dy),r.shapes.add(F.vline({x:0,y:r.y,step:e})),r.move(e)},this.stepAbs=function(e){r.step(e-r.y)},this.move=function(e){void 0===e&&(e=r.dy),r.y+=e},this.moveAbs=function(e){r.move(e-r.y)},this.rect=function(e){var t=e.x,a=e.y,o=e.text,n=r.measureText(o,r.config.text.attrs),i=n.w,s=n.h,c=r.config.rect,l=i+2*c.padX,h=s+2*c.padY;return r.wrapText({cls:ia,text:o,x:t,y:a,w:l,h:h,tw:i,th:s})},this.diamond=function(e){var t=e.x,a=e.y,o=e.text,n=r.measureText(o,r.config.text.attrs),i=n.w,s=n.h,c=r.config.diamond.aspectRatio,l=i+s/c,h=s+i*c;return r.wrapText({cls:ja,text:o,x:t,y:a,w:l,h:h,tw:i,th:s})},this.wrapText=function(e){var t=e.cls,a=e.text,o=e.x,n=e.y,i=e.w,s=e.h,c=e.tw,l=e.th,h=r.text({text:a,x:-c/2,y:s/2-l/2,isLabel:!1}),p=new t({x:-i/2,w:i,h:s});return new V({x:o,y:n,children:[h,p]})},this.text=function(e){var t=e.x,a=e.y,o=e.text,n=e.isLabel;return ha.byMeas({x:t,y:a,text:o,attrs:r.config.text.attrs,meas:r.measureText,isLabel:n})},this.stepText=function(e){var t=r,a=t.dy,o=t.hlineMargin,n=r.rect({x:0,y:0,text:e}),i=r.AllocE.findSpace(r.y+a-o,n.h+o);r.AllocW.merge(i,n.h+o),r.stepAbs(i+o),n.trans(0,r.y),r.shapes.add(n),r.move(n.h)},this.stepCond=function(e){var t,a=e.content,o=e.yesDir,n=e.noDir,i=e.jumpW,s=e.jumpE,c=e.stepY,l=void 0===c?r.dy:c,h=r,p=h.AllocW,$=h.AllocE,w=h.shapes,y=h.diamond,u=h.text,x=h.stepAbs,m=h.move,f=h.hlineMargin,d=r.config.label,v=d.yesText,T=d.noText,D=r.config.diamond,g=D.labelMarginX,A=D.labelMarginY,b=y({x:0,y:0,text:a});if(i)for(var E=r.y+l-f;;){var W=$.findSpace(E,b.h+f),S=p.findSpace(W+b.h/2,f);if(S===W+b.h/2){t=W;break}E=S-b.h/2}else t=$.findSpace(r.y+l-f,b.h+f);p.merge(t,b.h+f),s&&$.merge(t+b.h/2,f),x(t+f),b.trans(0,r.y),w.add(b),m(b.h);var j={E:{x:b.w/2,y:b.y+b.h/2},W:{x:-b.w/2,y:b.y+b.h/2},S:{x:0,y:b.y+b.h}};return w.add(u({x:j[o].x+g,y:j[o].y+A,text:v,isLabel:!0})),w.add(u({x:j[n].x+g,y:j[n].y+A,text:T,isLabel:!0})),j},this.branch=function(){return new e({shapes:new V({x:r.x,y:r.y,children:[]}),measureText:r.measureText,config:r.config,loop:new ca(r.loop.type),AllocW:r.AllocW.clone(),AllocE:r.AllocE.clone(),x:r.x,y:r.y})},this.merge=function(e){var t,a;e.shapes.children.forEach(function(t){t.trans(e.shapes.x,0),r.shapes.add(t)}),(t=r.loop.breaks).push.apply(t,e.loop.breaks),(a=r.loop.continues).push.apply(a,e.loop.continues),e.y>r.y&&r.moveAbs(e.y)},this.withLoop=function(e,t){var a=r,o=a.loop,n=a.AllocW,i=a.AllocE;r.loop=new ca(e);var s=new _(X()),c=i.cloneDeep(),l=s.clone(),h=c.clone();r.AllocW=s,r.AllocE=c,t();var p=r.loop;return r.loop=o,r.AllocW=n,r.AllocE=i,r.AllocW.mergeAllocator(l),r.AllocW.mergeAllocator(h),p},this.type="flowchart",this.shapes=a,this.measureText=o,this.config=n,this.loop=i,this.AllocW=s,this.AllocE=c,this.alive=!0,this.dy=n.flowchart.stepY,this.dx=n.flowchart.stepX,this.hlineMargin=n.flowchart.hlineMargin,this.x=l,this.y=h}}(),ma=function(e){var t=e.node,r=e.config,a=e.measureText,o=new la({shapes:new V({x:0,y:0,children:[]}),measureText:a,config:r,loop:new ca,AllocW:new _(X()),AllocE:new _(X()),x:0,y:r.flowchart.marginY});return P(t,o),o.shiftX(-o.shapes.minX+r.flowchart.marginX),o},P=function(e,t,r){void 0===r&&(r=!1);for(var a=t.step,o=t.stepAbs,n=t.stepText,i=t.AllocW,s=t.AllocE,c=t.loop,l=t.hlineMargin,h=e.children,p=h.length,$=0;$<p&&t.alive;){var w=h[$];switch(w.type){case"text":n(w.content);break;case"pass":a();break;case"if":var y=[];for($<p&&"if"===h[$].type&&(y.push(h[$]),$++);$<p&&"elif"===h[$].type;)y.push(h[$]),$++;$<p&&"else"===h[$].type&&(y.push(h[$]),$++),na(y,t);continue;case"while":xa(w,t);break;case"do":ya(w,h[$+1],t),$+=2;continue;case"break":case"continue":var u=ba[c.type][w.type],x=r?t.y-l:("W"===u?i:s).findSpace(t.y,l);i.merge(x,l),"E"===u&&s.merge(x,l),r||o(x+l);var m=c.breaks,f=c.continues;("break"===w.type?m:f).push(new O({x:0,y:t.y})),t.alive=!1;}$++}},na=function(e,t,r){if(void 0===r&&(r=!1),0!==e.length)if("else"!==e[0].type){var a,o=t.dx,n=t.dy,i=t.hlineMargin,s=t.branch(),c=t.branch(),l=t.loop.type,h=e[0],p={dir:"S",jump:!1},$={dir:"E",jump:!1};if(h.children.length>0)"break"!==(a=h.children[0].type)&&"continue"!==a||(p={dir:ba[l][a],jump:!0},$={dir:"S",jump:!1});if(e.length>1&&"else"===e[1].type&&e[1].children.length>0)if("break"===(a=e[1].children[0].type)||"continue"===a){var w=ba[l][a];w!==p.dir&&($={dir:w,jump:!0})}var y=t.stepCond({content:h.content,yesDir:p.dir,noDir:$.dir,jumpW:p.jump&&"W"===p.dir||$.jump&&"W"===$.dir,jumpE:p.jump&&"E"===p.dir||$.jump&&"E"===$.dir,stepY:"if"===e[0].type?n:i});if(s.moveAbs(y[p.dir].y),P(h,s,p.jump),s.shiftX(y[p.dir].x),c.moveAbs(y[$.dir].y),na(e.slice(1),c,$.jump),$.jump||p.jump)c.shiftX(y[$.dir].x);else{var u=Math.max(y.E.x,s.shapes.maxX)+o-c.shapes.minX;c.shiftX(u),s.shapes.add(F.hline({x:y.E.x,y:y.E.y,step:c.shapes.x-y.E.x}));var x=void 0;if(c.alive){var m=t.AllocE.findSpace(Math.max(s.y,c.y),i);t.AllocW.merge(m,i),x=m+i}else x=Math.max(s.y,c.y);s.alive&&s.stepAbs(x),c.alive&&c.stepAbs(x),c.alive&&s.shapes.add(F.hline({x:c.shapes.x,y:x,step:-c.shapes.x+s.shapes.x,isArrow:s.alive}))}t.merge(s),t.merge(c),s.alive||c.alive||(t.alive=!1)}else P(e[0],t,r)},xa=function(e,t){var r=t.branch(),a=r.moveAbs,o=r.stepAbs,n=r.dx,i=r.dy,s=r.stepCond,c=r.withLoop,l=r.shapes,h=r.AllocW,p=r.AllocE,$=r.hlineMargin,w=p.findSpace(r.y+i-$,$);h.merge(w,$),o(w+$);var y=r.y,u=s({content:e.content,yesDir:"S",noDir:"E",jumpE:!1,jumpW:!1,stepY:$}),x=c("while",function(){P(e,r)}),m=x.breaks,f=x.continues,d=aa(f),v=aa(m);if(r.alive){w=p.findSpace(r.y,$);h.merge(w,$),o(w+$),d.push(new O({x:0,y:r.y}))}v.push(new O(ka({},u.E)));var T=Math.min(u.W.x,l.minX)-n,D=Math.max(u.E.x,l.maxX)+n;d.sort(function(e,t){return e.y>t.y?-1:1}).forEach(function(e,t){l.add(new F({x:e.x,y:e.y,isArrow:!0,cmds:0===t?[["h",T-e.x],["v",y-e.y],["h",-T]]:[["h",T-e.x]]}))});w=p.findSpace(r.y,$);h.merge(w,$),a(w+$),v.sort(function(e,t){return e.y<t.y?-1:1}).forEach(function(e,t){l.add(new F({x:e.x,y:e.y,isArrow:0!==t,cmds:0===t?[["h",D-e.x],["v",r.y-e.y],["h",-D]]:[["h",D-e.x]]}))}),t.merge(r)},ya=function(e,t,r){var a=r.branch(),o=a.moveAbs,n=a.stepAbs,i=a.dx,s=a.dy,c=a.stepCond,l=a.shapes,h=a.withLoop,p=a.AllocW,$=a.AllocE,w=a.hlineMargin,y=$.findSpace(a.y+s-w,w);p.merge(y,w),n(y+w);var u,x,m=a.y,f=h("doWhile",function(){P(e,a)}),d=f.breaks,v=f.continues,T=aa(d),D=0;if(a.alive||v.length>0){if(v.length>0){y=$.findSpace(a.y,w);p.merge(y,w),a.alive?n(y+w):o(y+w),D=l.maxX+i,v.sort(function(e,t){return e.y<t.y?-1:1}).forEach(function(e,t){l.add(new F({x:e.x,y:e.y,isArrow:!0,cmds:0===t?[["h",D-e.x],["v",a.y-e.y],["h",-D]]:[["h",D-e.x]]}))})}var g=c({content:t.content,yesDir:"S",noDir:"E",jumpW:!1,jumpE:!1});y=$.findSpace(a.y,w);p.merge(y,w),n(y+w),u=Math.min(g.W.x,l.minX)-i,l.add(new F({x:0,y:a.y,isArrow:!0,cmds:[["h",u],["v",m-a.y],["h",-u]]})),x=Math.max(g.E.x,l.maxX,D)+i,T.push(new O(ka({},g.E)))}else{y=$.findSpace(a.y,w);p.merge(y,w),o(y+w),x=l.maxX+i}y=$.findSpace(a.y,w);p.merge(y,w),o(y+w),T.sort(function(e,t){return e.y<t.y?-1:1}).forEach(function(e,t){l.add(new F({x:e.x,y:e.y,isArrow:0!==t,cmds:0===t?[["h",x-e.x],["v",a.y-e.y],["h",-x]]:[["h",x-e.x]]}))}),r.merge(a)};K.Flowchart=la,K.createFlowchart=ma;var Y={},k=Y&&Y.__assign||function(){return(k=Object.assign||function($){for(var a,t=1,r=arguments.length;t<r;t++)for(var s in a=arguments[t])Object.prototype.hasOwnProperty.call(a,s)&&($[s]=a[s]);return $}).apply(this,arguments)},Z="100%",G="black",oa="white",q={src:{indentStr:"  ",commentStr:"#"},flowchart:{marginX:35,marginY:35,stepX:24,stepY:24,hlineMargin:24},rect:{padX:12,padY:8,attrs:{stroke:G,fill:oa,"stroke-width":"2px","fill-opacity":"0%"}},diamond:{aspectRatio:.75,labelMarginX:1,labelMarginY:0,attrs:{stroke:G,fill:oa,"fill-opacity":"0%","stroke-width":"2px"}},path:{attrs:{stroke:G,fill:"none","stroke-linecap":"square","stroke-width":"2px","fill-opacity":"0%","stroke-opacity":Z}},arrowHead:{size:15,attrs:{stroke:G,fill:G,"fill-opacity":Z,"stroke-width":"0px"}},text:{attrs:{stroke:G,fill:G,"fill-opacity":Z,"font-size":"14px","stroke-width":"0"}},label:{yesText:"Y",noText:"N",attrs:{stroke:G,fill:G,"fill-opacity":Z,"font-size":"10px","font-weight":"lighter"}}},pa=function($){return void 0===$&&($={}),{src:k(k({},q.src),$.src||{}),flowchart:k(k({},q.flowchart),$.flowchart||{}),rect:k(k(k({},q.rect),$.rect||{}),{attrs:k(k({},q.rect.attrs),$.rect&&$.rect.attrs||{})}),diamond:k(k(k({},q.diamond),$.diamond||{}),{attrs:k(k({},q.diamond.attrs),$.diamond&&$.diamond.attrs||{})}),path:k(k(k({},q.path),$.path||{}),{attrs:k(k({},q.path.attrs),$.path&&$.path.attrs||{})}),arrowHead:k(k(k({},q.arrowHead),$.arrowHead||{}),{attrs:k(k({},q.arrowHead.attrs),$.arrowHead&&$.arrowHead.attrs||{})}),text:k(k(k({},q.text),$.text||{}),{attrs:k(k({},q.text.attrs),$.text&&$.text.attrs||{})}),label:k(k(k({},q.label),$.label||{}),{attrs:k(k({},q.label.attrs),$.label&&$.label.attrs||{})})}};Y.mergeDefaultConfig=pa,Y.defaultConfig=q;var I=R&&R.__assign||function(){return(I=Object.assign||function(e){for(var r,a=1,t=arguments.length;a<t;a++)for(var n in r=arguments[a])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},qa=function(){return function(e){var r=this,a=e.src,t=e.config,n=e.document;this.el=function(e,a){for(var t=[],n=2;n<arguments.length;n++)t[n-2]=arguments[n];var s=r._document.createElementNS("http://www.w3.org/2000/svg",e);return Object.entries(a||{}).forEach(function(e){var r=e[0],a=e[1];return s.setAttribute("className"===r?"class":r,a.toString())}),(t||[]).forEach(function(e){return s.append(e)}),s},this.createTextSVGElement=function(e,a){var t=r.el,n=t("text",a||{});return e.split(/\\n/).forEach(function(e,r){n.append(t("tspan",{x:a.x,dy:(0===r?0:1)+"em"},e))}),n},this.measureText=function(e,a){void 0===a&&(a={});var t=r,n=t.dummySVG,s=t.createTextSVGElement,o=I(I({},a),{x:a.x||0});r._document.body.append(n);var i=s(e,o);n.append(i);var p=i.getBoundingClientRect(),$=p.width,c=p.height;return n.removeChild(i),r._document.body.removeChild(n),{w:$,h:c}},this.renderShape=function(e){var a=e.layers,t=e.shape,n=e.config,s=e.offsetX,o=void 0===s?0:s,i=e.offsetY,p=void 0===i?0:i,$=r,c=$.el,d=$.createTextSVGElement,h=$.renderShape,u=$.measureText,l=o+t.x,g=p+t.y,f=t.w,m=t.h;switch(t.type){case"group":t.children.forEach(function(e){return h({layers:a,config:n,shape:e,offsetX:l,offsetY:g})});break;case"text":a.textLayer.append(d(t.content,I({x:l,y:g+u("A",t.isLabel?n.label.attrs:n.text.attrs).h/2,"dominant-baseline":"central"},t.isLabel?n.label.attrs:n.text.attrs)));break;case"path":var v="M "+l+" "+g,x=t.cmds.map(function(e){return e.join(" ")}).join(" ");a.pathLayer.append(c("path",I(I({d:v+" "+x},t.isArrow?{"marker-end":"url(#arrow-head)"}:{}),n.path.attrs)));break;case"rect":a.nodeLayer.append(c("rect",I({x:l,y:g,width:f,height:m},n.rect.attrs)));break;case"diamond":a.nodeLayer.append(c("polygon",I({points:l+f/2+","+g+", "+(l+f)+","+(g+m/2)+" "+(l+f/2)+","+(g+m)+" "+l+","+(g+m/2)},n.diamond.attrs)));}},this.render=function(){var e=r,a=e.src,t=e.config,n=e.el,s=e.measureText,o=e.renderShape,i=r.el("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg"}),p=n("defs",null,n("marker",{id:"arrow-head",markerUnits:"userSpaceOnUse",markerWidth:""+t.arrowHead.size,markerHeight:""+2*t.arrowHead.size,viewBox:"0 0 10 10",refX:"10",refY:"5",orient:"auto-start-reverse"},n("polygon",I({points:"0,0 0,10 10,5",class:"arrow-head"},t.arrowHead.attrs))));i.append(p);var $=n("g"),c=n("g"),d=n("g"),h=ma({node:ga(a,t),config:t,measureText:s});return o({layers:{pathLayer:$,nodeLayer:c,textLayer:d},shape:h.shapes,config:t}),i.append($),i.append(c),i.append(d),i.setAttribute("width",(h.shapes.w+2*t.flowchart.marginX).toString()),i.setAttribute("height",(h.shapes.h+2*t.flowchart.marginY).toString()),i},this._document=n,this.src=a,this.config=t=pa(t),this.dummySVG=this.el("svg")}}(),ra=function(e){return new qa(e).render()};R.Renderer=qa,R.render=ra;var za=Q&&Q.__spreadArrays||function(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;var a=Array(r),c=0;for(e=0;e<t;e++)for(var n=arguments[e],$=0,f=n.length;$<f;$++,c++)a[c]=n[$];return a},Aa={initialize:function(r){za(document.getElementsByClassName("tefcha")).forEach(function(e){var t=e.textContent;e.textContent="",e.append(ra({src:t,document:document,config:r}))})}};window.tefcha=Aa;if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=Q}else if(typeof define==="function"&&define.amd){define(function(){return Q})}})();
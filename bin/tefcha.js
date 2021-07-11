(function () {var Z={};var aa={};var J={},za=J&&J.__extends||function(){var e=function(r,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])})(r,n)};return function(r,n){function t(){this.constructor=r}e(r,n),r.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}}(),ka=J&&J.__assign||function(){return(ka=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e}).apply(this,arguments)},V=J&&J.__spreadArrays||function(){for(var e=0,r=0,n=arguments.length;r<n;r++)e+=arguments[r].length;var t=Array(e),o=0;for(r=0;r<n;r++)for(var s=arguments[r],a=0,i=s.length;a<i;a++,o++)t[o]=s[a];return t},z=function(e){function r(r){var n=r.lineno,t=r.msg,o=r.src,s=void 0===o?"":o,a=this,i=t;n&&n>0&&(i="at line "+n+": "+i);var $="";return s&&void 0!==n&&n>0&&($=s.split(/\n/).map(function(e,r){return{lineno:r+1,line:e}}).slice(Math.max(0,n-1-5),n-1+5).map(function(e){var r=e.lineno,t=e.line;return(r===n?">":" ")+r+": "+t}).join("\n")),(a=e.call(this,i+"\n"+$)||this).lineno=null!=n?n:null,a.msg=t,a.src=s,a.type="tefcha",a}return za(r,e),r}(Error),la=["if","else","elif","while","for","do","switch","case","try","except"],ma=V(la,["continue","break","pass"]),a=V(ma,["program","none","text"]),Aa=function(e){return la.includes(e)},Ba=function(e){return ma.includes(e)},Ca=function(e,r){var n=[],t="",o=r.src,s=o.indentStr,a=o.commentStr;if(e.split(/\r\n|\r|\n/).forEach(function(e,r){if(r++,""!==(e=t+e).trim()){for(var o=0;e.startsWith(s);)o++,e=e.slice(s.length);e.startsWith(a)||(e.endsWith("\\")?t=e.slice(0,-1):(t="",n.push({lineno:r,line:e,nest:o})))}}),""!==t)throw new z({msg:"EOF is found after '\\'"});var i=Math.min.apply(Math,n.map(function(e){return e.nest}));return n=n.map(function(e){return ka(ka({},e),{nest:e.nest-i})})},Da=function(e,r){var n={type:"program",lineno:0,content:"",children:[]},t=[n];return e.forEach(function(e){var n=e.lineno,o=e.line,s=e.nest;if(t.length-1<s)throw new z({lineno:n,src:r,msg:"unexpected indent"});for(;t.length-1>s;)t.pop();var a=t.slice(-1)[0],i=o.split(" ")[0];if(Ba(i)){var $={type:i,lineno:n,content:o.slice(o.indexOf(" ")+1),children:[]},c=a.children.length>0?a.children.slice(-1)[0]:null;a.children.push($),Aa(i)&&(c&&"do"===c.type&&"while"===i||t.push($))}else a.children.push({type:"text",lineno:n,content:o,children:[]})}),n},na=function(e,r,n){var t=e.children||[],o={type:"none",lineno:-1,content:"",children:[]};t.forEach(function(s,a){var i=s.lineno;switch(s.type){case"program":break;case"none":throw new z({lineno:i,src:n,msg:"node type \""+s.type+"\" must not be here... this may be bug"});case"text":case"if":break;case"else":if(!["if","elif"].includes(o.type))throw new z({lineno:i,src:n,msg:"before \"else\" statement, \"if\" or \"elif\" should exists."});break;case"elif":if(!["if","elif"].includes(o.type))throw new z({lineno:i,src:n,msg:"before \"elif\" statement, \"if\" or \"elif\" should exists."});break;case"while":break;case"for":throw new z({lineno:i,src:n,msg:"node type \""+s.type+"\" is not implemented yet."});case"switch":if(0===s.children.length)throw new z({lineno:i,src:n,msg:"switch blcok needs at least 1 case blocks"});break;case"case":if("switch"!==e.type)throw new z({lineno:i,src:n,msg:"keyword \"case\" should be in \"switch\" statement."});break;case"continue":if(!V(r,[e]).some(function(e){return["for","while","do"].includes(e.type)}))throw new z({lineno:i,src:n,msg:"\"continue\" statement should be in loop"});break;case"break":if(!V(r,[e]).some(function(e){return["for","while","do"].includes(e.type)}))throw new z({lineno:i,src:n,msg:"\"break\" statement should be in loop or \"case\"."});break;case"do":if(a+1>=t.length||"while"!==t[a+1].type)throw new z({lineno:i,src:n,msg:"cannot find corresponding keyword \"while\" to keyword \"do\"."});break;case"pass":break;case"try":if(a+1>=t.length||"except"!==t[a+1].type)throw new z({lineno:i,src:n,msg:"cannot find corresponding keyword \"except\" to keyword \"try\"."});break;case"except":if(!["try","except"].includes(o.type))throw new z({lineno:i,src:n,msg:"before \"except\" block, \"try\" or \"except\" block should exists."});break;default:var $=s.type;throw new z({lineno:i,src:n,msg:"node type \""+$+"\" is invalid."});}o=s}),"switch"===e.type&&t.forEach(function(e){var r=e.lineno;if("case"!==e.type)throw new z({lineno:r,src:n,msg:e.type+"\" is found in \"switch\" block. \"switch\" should have \"case\" only"})}),t.forEach(function(t){return na(t,V(r,[e]),n)})},oa=function(e,r){var n=Ca(e,r),t=Da(n,e);return na(t,[],e),t};J.TefchaError=z,J.parse=oa;var P={};var G={},N=G&&G.__extends||function(){var t=function(r,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)r.hasOwnProperty(n)&&(t[n]=r[n])})(r,n)};return function(r,n){function $(){this.constructor=r}t(r,n),r.prototype=null===n?Object.create(n):($.prototype=n.prototype,new $)}}(),Ea=G&&G.__spreadArrays||function(){for(var t=0,r=0,n=arguments.length;r<n;r++)t+=arguments[r].length;var $=Array(t),e=0;for(r=0;r<n;r++)for(var s=arguments[r],a=0,o=s.length;a<o;a++,e++)$[e]=s[a];return $},Q=Math.max,R=Math.min,K=function(){return function(t){var r=this,n=t.x,$=void 0===n?0:n,e=t.y,s=void 0===e?0:e,a=t.w,o=void 0===a?0:a,i=t.h,u=void 0===i?0:i,x=t.minX,p=void 0===x?0:x,m=t.minY,h=void 0===m?0:m,v=t.maxX,c=void 0===v?0:v,C=t.maxY,d=void 0===C?0:C;this.trans=function(t,n){return r.x+=t,r.y+=n,r},this.x=$,this.y=s,this.w=o,this.h=u,this.minX=p,this.minY=h,this.maxX=c,this.maxY=d}}(),U=function(t){function r(n){var $=n.x,e=n.y,s=t.call(this,{x:$,y:e})||this;return s.clone=function(){return new r({x:s.x,y:s.y})},s.type="point",s}return N(r,t),r}(K),B=function(t){function r(r){var n=r.x,$=r.y,e=r.cmds,s=r.isArrow,a=void 0!==s&&s,o=this,i=0,u=0,x=0,p=0,m=0,h=0;return e.forEach(function(t){var r=t[0],n=t[1];"h"===r?i+=n:u+=n,x=R(x,i),p=R(p,u),m=Q(m,i),h=Q(h,u)}),(o=t.call(this,{x:n,y:$,minX:x,minY:p,maxX:m,maxY:h,w:m-x,h:h-p})||this).cmds=e,o.isArrow=a,o.type="path",o}return N(r,t),r.vline=function(t){var n=t.x,$=t.y,e=t.step,s=t.isArrow;return new r({x:n,y:$,cmds:[["v",e]],isArrow:void 0!==s&&s})},r.hline=function(t){var n=t.x,$=t.y,e=t.step,s=t.isArrow;return new r({x:n,y:$,cmds:[["h",e]],isArrow:void 0!==s&&s})},r}(K),fa=function(t){function r(r){var n=r.content,$=r.w,e=r.h,s=r.x,a=void 0===s?0:s,o=r.y,i=void 0===o?0:o,u=r.isLabel,x=void 0!==u&&u,p=t.call(this,{x:a,y:i,maxX:$,maxY:e,w:$,h:e})||this;return p.content=n,p.type="text",p.isLabel=x,p}return N(r,t),r.byMeas=function(t){var n=t.x,$=void 0===n?0:n,e=t.y,s=void 0===e?0:e,a=t.text,o=t.attrs,i=t.meas,u=t.isLabel,x=i(a,o);return new r({content:a,x:$,y:s,w:x.w,h:x.h,isLabel:u})},r}(K),pa=function(t){function r(r){var n=r.x,$=void 0===n?0:n,e=r.y,s=void 0===e?0:e,a=r.w,o=r.h,i=t.call(this,{x:$,y:s,w:a,h:o,maxX:a,maxY:o})||this;return i.type="rect",i}return N(r,t),r}(K),qa=function(t){function r(r){var n=r.x,$=void 0===n?0:n,e=r.y,s=void 0===e?0:e,a=r.w,o=r.h,i=t.call(this,{x:$,y:s,w:a,h:o,maxX:a,maxY:o})||this;return i.type="frame",i}return N(r,t),r}(K),ra=function(t){function r(r){var n=r.x,$=void 0===n?0:n,e=r.y,s=void 0===e?0:e,a=r.w,o=r.h,i=t.call(this,{x:$,y:s,w:a,h:o,maxX:a,maxY:o})||this;return i.type="diamond",i}return N(r,t),r}(K),ba=function(t){function r(r){var n=r.x,$=r.y,e=r.children,s=t.call(this,{x:n,y:$})||this;return s.add=function(t){return s.minX=R(s.minX,t.x+t.minX),s.minY=R(s.minY,t.y+t.minY),s.maxX=Q(s.maxX,t.x+t.maxX),s.maxY=Q(s.maxY,t.y+t.maxY),s.w=s.maxX-s.minX,s.h=s.maxY-s.minY,s.children.push(t),s},0===e.length&&(e=Ea(e,[new U({x:n,y:$})])),s.minX=R.apply(void 0,e.map(function(t){return t.x+t.minX})),s.minY=R.apply(void 0,e.map(function(t){return t.y+t.minY})),s.maxX=Q.apply(void 0,e.map(function(t){return t.x+t.maxX})),s.maxY=Q.apply(void 0,e.map(function(t){return t.y+t.maxY})),s.w=s.maxX-s.minX,s.h=s.maxY-s.minY,s.type="group",s.children=e,s}return N(r,t),r}(K);G.BaseShape=K,G.Group=ba,G.Diamond=ra,G.Frame=qa,G.Rect=pa,G.Text=fa,G.Path=B,G.Point=U;var Y=function(t){return"number"==typeof(null==t?void 0:t.start)&&"number"==typeof(null==t?void 0:t.end)&&null===(null==t?void 0:t.next)},ca=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={start:1/0,end:1/0,next:null};return t.slice().reverse().forEach(function(t){var e=t[0],r=t[1];n={start:e,end:r,next:n}}),{start:-1/0,end:-1/0,next:n}},ga=function(){return function t(e){var n=this;this.clone=function(){return new t(n.head)},this.cloneDeep=function(){return new t(ca.apply(void 0,n.ranges().map(function(t){return[t.start,t.end]})))},this.findSpace=function(t,e){for(var r=n.head;!Y(r.next)&&r.next.start<t;)r=r.next;for(var a=Math.max(t,r.end);!Y(r.next)&&r.next.start-a<e;)a=(r=r.next).end;return a},this.merge=function(t,e){for(var r,a=t+e,o=n.head;!Y(o.next)&&o.next.start<=t;)o=o.next;for(t<=o.end?r=o:(r={start:t,end:t,next:o.next},o.next=r,o=r);!Y(o.next)&&o.next.start<=a;)o=o.next;a<=o.end?(r.end=o.end,r.next=o.next):(r.end=a,r.next=o.next)},this.ranges=function(){var t=[],e=n.head;for(e.start===-1/0&&(e=e.next);!Y(e);)t.push({start:e.start,end:e.end}),e=e.next;return t},this.mergeAllocator=function(t){t.ranges().forEach(function(t){var e=t.start,r=t.end;n.merge(e,r-e)})},this.head=e}}();var sa=P&&P.__assign||function(){return(sa=Object.assign||function(e){for(var r,t=1,a=arguments.length;t<a;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},O=P&&P.__spreadArrays||function(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;var a=Array(e),n=0;for(r=0;r<t;r++)for(var o=arguments[r],i=0,s=o.length;i<s;i++,n++)a[n]=o[i];return a},Fa=!1,ha={while:{break:"E",continue:"W"},doWhile:{break:"E",continue:"E"},for:{break:"E",continue:"W"}},ia=function(){return function(e){void 0===e&&(e="none"),this.type=e,this.breaks=[],this.continues=[]}}(),ta=function(){return function e(r){var t=this,a=r.shapes,n=r.measureText,o=r.config,i=r.loop,s=r.AllocW,c=r.AllocE,h=r.x,l=r.y;this.shiftX=function(e){var r=t,a=r.shapes,n=r.loop;a.trans(e,0),t.x+=e;var o=n.breaks,i=n.continues;o.forEach(function(r){return r.trans(e,0)}),i.forEach(function(r){return r.trans(e,0)})},this.step=function(e,r){void 0===e&&(e=t.dy),void 0===r&&(r=!1),t.shapes.add(B.vline({x:0,y:t.y,step:e,isArrow:r})),t.move(e)},this.stepAbs=function(e,r){void 0===r&&(r=!1),t.step(e-t.y,r)},this.move=function(e){void 0===e&&(e=t.dy),t.y+=e},this.moveAbs=function(e){t.move(e-t.y)},this.rect=function(e){var r=e.x,a=e.y,n=e.text,o=t.measureText(n,t.config.text.attrs),i=o.w,s=o.h,c=t.config.rect,h=i+2*c.padX,l=s+2*c.padY;return t.wrapText({cls:pa,text:n,x:r,y:a,w:h,h:l,tw:i,th:s})},this.diamond=function(e){var r=e.x,a=e.y,n=e.text,o=t.measureText(n,t.config.text.attrs),i=o.w,s=o.h,c=t.config.diamond.aspectRatio,h=i+s/c,l=s+i*c;return t.wrapText({cls:ra,text:n,x:r,y:a,w:h,h:l,tw:i,th:s})},this.wrapText=function(e){var r=e.cls,a=e.text,n=e.x,o=e.y,i=e.w,s=e.h,c=e.tw,h=e.th,l=t.text({text:a,x:-c/2,y:s/2-h/2,isLabel:!1}),p=new r({x:-i/2,w:i,h:s});return new ba({x:n,y:o,children:[l,p]})},this.text=function(e){var r=e.x,a=e.y,n=e.text,o=e.isLabel;return fa.byMeas({x:r,y:a,text:n,attrs:t.config.text.attrs,meas:t.measureText,isLabel:o})},this.stepText=function(e){var r=t,a=r.dy,n=r.hlineMargin,o=t.rect({x:0,y:0,text:e}),i=t.AllocE.findSpace(t.y+a-n,o.h+n);t.AllocW.merge(i,o.h+n),t.stepAbs(i+n,!0),o.trans(0,t.y),t.shapes.add(o),t.move(o.h)},this.stepCond=function(e){var r,a=e.content,n=e.yesDir,o=e.noDir,i=e.jumpW,s=e.jumpE,c=e.stepY,h=void 0===c?t.dy:c,l=t,p=l.AllocW,$=l.AllocE,u=l.shapes,f=l.diamond,w=l.text,m=l.stepAbs,v=l.move,y=l.hlineMargin,x=t.config.label,d=x.yesText,T=x.noText,D=t.config.label,g=D.marginX,A=D.marginY,b=f({x:0,y:0,text:a});if(i)for(var E=t.y+h-y;;){var W=$.findSpace(E,b.h+y),S=p.findSpace(W+b.h/2,y);if(S===W+b.h/2){r=W;break}E=S-b.h/2}else r=$.findSpace(t.y+h-y,b.h+y);p.merge(r,b.h+y),s&&$.merge(r+b.h/2,y),m(r+y,!0),b.trans(0,t.y),u.add(b),v(b.h);var X={E:{x:b.w/2,y:b.y+b.h/2},W:{x:-b.w/2,y:b.y+b.h/2},S:{x:0,y:b.y+b.h}},_=t.measureText(d,t.config.label.attrs),j="W"!==n?X[n].x+g:X[n].x-g-_.w;u.add(w({x:j,y:X[n].y+A,text:d,isLabel:!0}));var F=t.measureText(T,t.config.label.attrs),M="W"!==o?X[o].x+g:X[o].x-g-F.w;return u.add(w({x:M,y:X[o].y+A,text:T,isLabel:!0})),X},this.branch=function(){if(Fa){var r="",a=t.AllocW.ranges()[0],n=Math.round(t.y);a?t.AllocW.ranges().forEach(function(e){var t=Math.round(e.start),a=Math.round(e.end);r+="\n",r+="s:"+t+", e:"+a}):r="first is undef",t.h(t.y,"b:"+n+", "+r)}return new e({shapes:new ba({x:t.x,y:t.y,children:[]}),measureText:t.measureText,config:t.config,loop:new ia(t.loop.type),AllocW:t.AllocW.clone(),AllocE:t.AllocE.clone(),x:t.x,y:t.y})},this.merge=function(e){var r,a;if(Object.is(t,e))throw"cannot merge same flowchart";e.shapes.children.forEach(function(r){r.trans(e.shapes.x,0),t.shapes.add(r)}),(r=t.loop.breaks).push.apply(r,e.loop.breaks),(a=t.loop.continues).push.apply(a,e.loop.continues),e.y>t.y&&t.moveAbs(e.y)},this.withLoop=function(e,r){var a=t,n=a.loop,o=a.AllocW,i=a.AllocE;t.loop=new ia(e);var s=new ga(ca()),c=i.cloneDeep(),h=s.clone(),l=c.clone();t.AllocW=s,t.AllocE=c,r();var p=t.loop;return t.loop=n,t.AllocW=o,t.AllocE=i,t.AllocW.mergeAllocator(h),t.AllocW.mergeAllocator(l),p},this.h=function(e,r){void 0===r&&(r=""),t.shapes.add(B.hline({x:0,y:e,step:100})),""!==r&&t.shapes.add(new fa({content:r,x:0,y:e,w:0,h:0}))},this.type="flowchart",this.shapes=a,this.measureText=n,this.config=o,this.loop=i,this.AllocW=s,this.AllocE=c,this.alive=!0,this.dy=o.flowchart.stepY,this.dx=o.flowchart.stepX,this.hlineMargin=o.flowchart.hlineMargin,this.x=h,this.y=l}}(),ua=function(e){var r=e.node,t=e.config,a=e.measureText,n=new ta({shapes:new ba({x:0,y:0,children:[]}),measureText:a,config:t,loop:new ia,AllocW:new ga(ca()),AllocE:new ga(ca()),x:0,y:t.flowchart.marginY});return L(r,n),n.shiftX(-n.shapes.minX+t.flowchart.marginX),n},L=function(e,r,t){void 0===t&&(t=!1);for(var a=r.step,n=r.stepAbs,o=r.stepText,i=r.AllocW,s=r.AllocE,c=r.loop,h=r.hlineMargin,l=e.children,p=l.length,$=0;$<p&&r.alive;){var u=l[$];switch(u.type){case"text":o(u.content);break;case"pass":a();break;case"if":var f=[];for($<p&&"if"===l[$].type&&(f.push(l[$]),$++);$<p&&"elif"===l[$].type;)f.push(l[$]),$++;$<p&&"else"===l[$].type&&(f.push(l[$]),$++),va(f,r);continue;case"while":Ga(u,r);break;case"do":Ha(u,l[$+1],r),$+=2;continue;case"break":case"continue":if("none"===c.type)throw"loop type must not be none here.";var w=ha[c.type][u.type],m=void 0;if(t)m=r.y-h;else if("W"===w)for(var v=(m=r.y)-99999;m!==v;)v=m,m=i.findSpace(m,h),m=s.findSpace(m,h);else m=s.findSpace(r.y,h);i.merge(m,h),"E"===w&&s.merge(m,h),t||n(m+h);var y=c.breaks,x=c.continues;("break"===u.type?y:x).push(new U({x:0,y:r.y})),r.alive=!1;break;case"try":var d=u,T=[];for($++;$<p&&"except"===l[$].type;)T.push(l[$]),$++;Ia(d,T,r);continue;case"switch":var D=u,g=D.children;Ja(D,g,r);break;case"program":case"none":case"else":case"elif":case"for":case"case":case"except":throw"child type "+u.type+" is not expected. this may be bug...";default:throw"child type "+u.type+" is invalid.";}$++}},va=function(e,r,t){if(void 0===t&&(t=!1),0!==e.length)if("else"!==e[0].type){var a,n=r.dx,o=r.dy,i=r.hlineMargin,s=r.branch(),c=r.branch(),h=r.loop.type,l=e[0],p={dir:"S",jump:!1},$={dir:"E",jump:!1};if(l.children.length>0)if("break"===(a=l.children[0].type)||"continue"===a){if("none"===h)throw"loop type must not be none here.";p={dir:ha[h][a],jump:!0},$={dir:"S",jump:!1}}if(e.length>1&&"else"===e[1].type&&e[1].children.length>0)if("break"===(a=e[1].children[0].type)||"continue"===a){if("none"===h)throw"loop type must not be none here.";var u=ha[h][a];u!==p.dir&&($={dir:u,jump:!0})}var f=r.stepCond({content:l.content,yesDir:p.dir,noDir:$.dir,jumpW:p.jump&&"W"===p.dir||$.jump&&"W"===$.dir,jumpE:p.jump&&"E"===p.dir||$.jump&&"E"===$.dir,stepY:"if"===e[0].type?o:i});if(s.moveAbs(f[p.dir].y),L(l,s,p.jump),s.shiftX(f[p.dir].x),c.moveAbs(f[$.dir].y),va(e.slice(1),c,$.jump),$.jump||p.jump)c.shiftX(f[$.dir].x);else{var w=Math.max(f.E.x,s.shapes.maxX)+n-c.shapes.minX;c.shiftX(w),s.shapes.add(B.hline({x:f.E.x,y:f.E.y,step:c.shapes.x-f.E.x}));var m=void 0;if(c.alive){var v=r.AllocE.findSpace(Math.max(s.y,c.y),i);r.AllocW.merge(v,i),m=v+i}else m=Math.max(s.y,c.y);s.alive&&s.stepAbs(m),c.alive&&c.stepAbs(m),c.alive&&s.shapes.add(B.hline({x:c.shapes.x,y:m,step:-c.shapes.x+s.shapes.x,isArrow:s.alive}))}r.merge(s),r.merge(c),s.alive||c.alive||(r.alive=!1)}else L(e[0],r,t)},Ga=function(e,r){var t=r.branch(),a=t.moveAbs,n=t.stepAbs,o=t.dx,i=t.dy,s=t.stepCond,c=t.withLoop,h=t.shapes,l=t.AllocW,p=t.AllocE,$=t.hlineMargin,u=p.findSpace(t.y+i-$,$);l.merge(u,$),n(u+$);var f=t.y,w=s({content:e.content,yesDir:"S",noDir:"E",jumpE:!1,jumpW:!1,stepY:$}),m=c("while",function(){L(e,t)}),v=m.breaks,y=m.continues,x=O(y),d=O(v);if(t.alive){u=p.findSpace(t.y,$);l.merge(u,$),n(u+$),x.push(new U({x:0,y:t.y}))}d.push(new U(sa({},w.E)));var T=Math.min(w.W.x,h.minX)-o,D=Math.max(w.E.x,h.maxX)+o;x.sort(function(e,r){return e.y>r.y?-1:1}).forEach(function(e,r){h.add(new B({x:e.x,y:e.y,isArrow:!0,cmds:0===r?[["h",T-e.x],["v",f-e.y],["h",-T]]:[["h",T-e.x]]}))});u=p.findSpace(t.y,$);l.merge(u,$),a(u+$),d.sort(function(e,r){return e.y<r.y?-1:1}).forEach(function(e,r){h.add(new B({x:e.x,y:e.y,isArrow:0!==r,cmds:0===r?[["h",D-e.x],["v",t.y-e.y],["h",-D]]:[["h",D-e.x]]}))}),r.merge(t)},Ha=function(e,r,t){var a=t.branch(),n=a.moveAbs,o=a.stepAbs,i=a.dx,s=a.dy,c=a.shapes,h=a.withLoop,l=a.AllocW,p=a.AllocE,$=a.hlineMargin,u=p.findSpace(a.y+s-$,$);l.merge(u,$),o(u+$);var f,w,m=a.y,v=h("doWhile",function(){L(e,a)}),y=v.breaks,x=v.continues,d=O(y),T=0;if(a.alive||x.length>0){if(x.length>0){u=p.findSpace(a.y,$);l.merge(u,$),a.alive?o(u+$):n(u+$),T=c.maxX+i,x.sort(function(e,r){return e.y<r.y?-1:1}).forEach(function(e,r){c.add(new B({x:e.x,y:e.y,isArrow:0!==r||a.alive,cmds:0===r?[["h",T-e.x],["v",a.y-e.y],["h",-T]]:[["h",T-e.x]]}))})}var D=a.branch(),g=D.stepCond({content:r.content,yesDir:"S",noDir:"E",jumpW:!1,jumpE:!1}),A=D.shapes.maxX,b=D.shapes.minX;a.merge(D);u=p.findSpace(a.y,$);l.merge(u,$),o(u+$),f=Math.min(b,c.minX)-i,c.add(new B({x:0,y:a.y,isArrow:!0,cmds:[["h",f],["v",m-a.y],["h",-f]]})),w=y.length>0?Math.max(A,c.maxX,T)+i:A+i,d.push(new U(sa({},g.E)))}else{u=p.findSpace(a.y,$);l.merge(u,$),n(u+$),w=c.maxX+i}u=p.findSpace(a.y,$);l.merge(u,$),n(u+$),d.sort(function(e,r){return e.y<r.y?-1:1}).forEach(function(e,r){c.add(new B({x:e.x,y:e.y,isArrow:0!==r,cmds:0===r?[["h",w-e.x],["v",a.y-e.y],["h",-w]]:[["h",w-e.x]]}))}),t.merge(a)},Ia=function(e,r,t){var a,n,o=t.dx,i=t.hlineMargin,s=t.branch(),c=r.map(function(){return t.branch()}),h=s.branch(),l=h.AllocE.findSpace(h.y,i);h.AllocW.merge(l,i);var p=l+i;h.stepAbs(p),L(e,h);var $=s.AllocE.findSpace(p,i);s.AllocW.merge($,i),n=$+i;var u=s.AllocE.findSpace(Math.max(h.y,n),i);s.AllocW.merge(u,i);var f=u+i;h.alive?h.stepAbs(f):h.moveAbs(f),a=h.x+h.shapes.maxX+o;var w=h.x+h.shapes.minX-o;h.shapes.add(new qa({x:w,y:p,w:a-w,h:f-p})),s.merge(h),h.alive||(s.alive=!1),c.forEach(function(e){e.moveAbs(n)});var m=s;if(r.forEach(function(e,r){var t=c[r],a=t.y;L(e,t);var n=m.x+m.shapes.maxX+o-t.shapes.minX;t.shiftX(n),t.shapes.add(t.text({x:t.config.label.marginX,y:a+t.config.label.marginY,text:e.content,isLabel:!0})),m=t}),s.shapes.add(B.hline({x:a,y:n,step:c.slice(-1)[0].shapes.x-a})),c.some(function(e){return e.alive})){var v=O([s],c).map(function(e){return e.y}).reduce(function(e,r){return Math.max(e,r)}),y=t.AllocE.findSpace(v,i);t.AllocW.merge(y,i);var x=y+i;O([s],c).filter(function(e){return e.alive}).forEach(function(e){e.stepAbs(x)});var d=c.filter(function(e){return e.alive}).slice(-1)[0];s.shapes.add(B.hline({x:d.shapes.x,y:x,step:-d.shapes.x+s.shapes.x,isArrow:s.alive}))}else if(s.alive){var T=O([s],c).map(function(e){return e.y}).reduce(function(e,r){return Math.max(e,r)});s.stepAbs(T)}t.merge(s),c.forEach(function(e){return t.merge(e)}),O([s],c).every(function(e){return!e.alive})&&(t.alive=!1)},Ja=function(e,r,t){var a=t.dx,n=t.hlineMargin,o=t.branch(),i=r.map(function(){return t.branch()}),s=o.diamond({x:0,y:0,text:e.content}),c=o.AllocE.findSpace(t.y,n+s.h+n);o.AllocW.merge(c,n+s.h+n);var h=c+n;o.stepAbs(h,!0),o.move(s.h),s.trans(0,h),o.shapes.add(s),o.step(n);var l=o.y;i.forEach(function(e){e.moveAbs(l)});var p=0;r.forEach(function(e,r){var t=i[r],n=t.y;L(e,t);var o=0===r?0:p+a-t.shapes.minX;t.shiftX(o),t.shapes.add(t.text({x:t.config.label.marginX,y:n+t.config.label.marginY,text:e.content,isLabel:!0})),p=t.x+t.shapes.maxX}),o.shapes.add(B.hline({x:0,y:l,step:i.slice(-1)[0].shapes.x}));var $=i.map(function(e){return e.alive?1:0}).reduce(function(e,r){return e+r}),u=i.map(function(e){return e.y}).reduce(function(e,r){return Math.max(e,r)});if($>0&&(!i[0].alive||1!==$)){var f=t.AllocE.findSpace(u,n);t.AllocW.merge(f,n);var w=f+n;i.filter(function(e){return e.alive}).forEach(function(e){e.stepAbs(w)});var m=i.filter(function(e){return e.alive}).slice(-1)[0];o.shapes.add(B.hline({x:m.shapes.x,y:w,step:-m.shapes.x+o.shapes.x,isArrow:i[0].alive}))}var v=i.map(function(e){return e.y}).reduce(function(e,r){return Math.max(e,r)});i.forEach(function(e){e.alive?e.stepAbs(v):e.moveAbs(v)}),t.merge(o),i.forEach(function(e){t.merge(e)}),0===$&&(t.alive=!1)};P.Flowchart=ta,P.createFlowchart=ua;var da={},k=da&&da.__assign||function(){return(k=Object.assign||function($){for(var a,r=1,t=arguments.length;r<t;r++)for(var s in a=arguments[r])Object.prototype.hasOwnProperty.call(a,s)&&($[s]=a[s]);return $}).apply(this,arguments)},ea="100%",H="black",ja="white",q={src:{indentStr:"  ",commentStr:"#"},flowchart:{marginX:35,marginY:35,stepX:24,stepY:24,hlineMargin:24,backgroundColor:"white"},rect:{padX:12,padY:8,attrs:{stroke:H,fill:ja,"stroke-width":"2px","fill-opacity":"0%"}},frame:{attrs:{stroke:H,"stroke-dasharray":"2",fill:ja,"stroke-width":"2px","fill-opacity":"0%"}},diamond:{aspectRatio:.75,attrs:{stroke:H,fill:ja,"fill-opacity":"0%","stroke-width":"2px"}},path:{attrs:{stroke:H,fill:"none","stroke-linecap":"square","stroke-width":"2px","fill-opacity":"0%","stroke-opacity":ea}},arrowHead:{size:9,attrs:{stroke:H,fill:H,"fill-opacity":ea,"stroke-width":"0px"}},text:{attrs:{stroke:H,fill:H,"fill-opacity":ea,"font-size":"14px","stroke-width":"0"}},label:{yesText:"Y",noText:"N",marginX:4,marginY:4,attrs:{stroke:H,fill:H,"fill-opacity":ea,"font-size":"10px","font-weight":"lighter"}}},wa=function($){return void 0===$&&($={}),{src:k(k({},q.src),$.src||{}),flowchart:k(k({},q.flowchart),$.flowchart||{}),rect:k(k(k({},q.rect),$.rect||{}),{attrs:k(k({},q.rect.attrs),$.rect&&$.rect.attrs||{})}),diamond:k(k(k({},q.diamond),$.diamond||{}),{attrs:k(k({},q.diamond.attrs),$.diamond&&$.diamond.attrs||{})}),path:k(k(k({},q.path),$.path||{}),{attrs:k(k({},q.path.attrs),$.path&&$.path.attrs||{})}),arrowHead:k(k(k({},q.arrowHead),$.arrowHead||{}),{attrs:k(k({},q.arrowHead.attrs),$.arrowHead&&$.arrowHead.attrs||{})}),text:k(k(k({},q.text),$.text||{}),{attrs:k(k({},q.text.attrs),$.text&&$.text.attrs||{})}),frame:k(k(k({},q.frame),$.frame||{}),{attrs:k(k({},q.frame.attrs),$.frame&&$.frame.attrs||{})}),label:k(k(k({},q.label),$.label||{}),{attrs:k(k({},q.label.attrs),$.label&&$.label.attrs||{})})}};da.mergeDefaultConfig=wa,da.defaultConfig=q;var I=aa&&aa.__assign||function(){return(I=Object.assign||function(e){for(var r,a=1,t=arguments.length;a<t;a++)for(var n in r=arguments[a])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},xa=function(){return function(e){var r=this,a=e.src,t=e.config,n=e.document;this.el=function(e,a){for(var t=[],n=2;n<arguments.length;n++)t[n-2]=arguments[n];var s=r._document.createElementNS("http://www.w3.org/2000/svg",e);return Object.entries(a||{}).forEach(function(e){var r=e[0],a=e[1];return s.setAttribute("className"===r?"class":r,a.toString())}),(t||[]).forEach(function(e){return s.append(e)}),s},this.createTextSVGElement=function(e,a){var t=r.el,n=t("text",a||{});return e.split(/\\n/).forEach(function(e,r){n.append(t("tspan",{x:a.x,dy:(0===r?0:1)+"em"},e))}),n},this.measureText=function(e,a){void 0===a&&(a={});var t=r,n=t.dummySVG,s=t.createTextSVGElement,i=I(I({},a),{x:a.x||0});r._document.body.append(n);var o=s(e,i);n.append(o);var h=o.getBoundingClientRect(),p=h.width,c=h.height;return n.removeChild(o),r._document.body.removeChild(n),{w:p,h:c}},this.renderShape=function(e){var a=e.layers,t=e.shape,n=e.config,s=e.offsetX,i=void 0===s?0:s,o=e.offsetY,h=void 0===o?0:o,p=i+t.x,c=h+t.y;switch(t.type){case"group":t.children.forEach(function(e){return r.renderShape({layers:a,config:n,shape:e,offsetX:p,offsetY:c})});break;case"text":a.textLayer.append(r.renderText({x:p,y:c,shape:t,config:n}));break;case"path":a.pathLayer.append(r.renderPath({x:p,y:c,shape:t,config:n}));break;case"rect":a.nodeLayer.append(r.renderRect({x:p,y:c,shape:t,config:n}));break;case"frame":a.frameLayer.append(r.renderFrame({x:p,y:c,shape:t,config:n}));break;case"diamond":a.nodeLayer.append(r.renderDiamond({x:p,y:c,shape:t,config:n}));break;case"point":break;default:throw"shape "+t+" is invalid";}},this.renderText=function(e){var a=e.x,t=e.y,n=e.shape,s=e.config;return r.createTextSVGElement(n.content,I({x:a,y:t+r.measureText("A",n.isLabel?s.label.attrs:s.text.attrs).h/2,"dominant-baseline":"central"},n.isLabel?s.label.attrs:s.text.attrs))},this.renderRect=function(e){var a=e.x,t=e.y,n=e.shape,s=e.config,i=n.w,o=n.h;return r.el("rect",I({x:a,y:t,width:i,height:o},s.rect.attrs))},this.renderFrame=function(e){var a=e.x,t=e.y,n=e.shape,s=e.config,i=n.w,o=n.h;return r.el("rect",I({x:a,y:t,width:i,height:o},s.frame.attrs))},this.renderDiamond=function(e){var a=e.x,t=e.y,n=e.shape,s=e.config,i=n.w,o=n.h;return r.el("polygon",I({points:a+i/2+","+t+", "+(a+i)+","+(t+o/2)+" "+(a+i/2)+","+(t+o)+" "+a+","+(t+o/2)},s.diamond.attrs))},this.renderPath=function(e){var a=e.x,t=e.y,n=e.shape,s=e.config,i="M "+a+" "+t,o=n.cmds.map(function(e){return e.join(" ")}).join(" ");return r.el("path",I(I({d:i+" "+o},n.isArrow?{"marker-end":"url(#arrow-head)"}:{}),s.path.attrs))},this.render=function(){var e=r,a=e.src,t=e.config,n=e.el,s=e.measureText,i=e.renderShape,o=r.svg,h=n("defs",null,n("marker",{id:"arrow-head",markerUnits:"userSpaceOnUse",markerWidth:""+t.arrowHead.size,markerHeight:""+2*t.arrowHead.size,viewBox:"0 0 10 10",refX:"10",refY:"5",orient:"auto-start-reverse"},n("polygon",I({points:"0,0 0,10 10,5",class:"arrow-head"},t.arrowHead.attrs))));o.append(h);var p=n("g"),c=n("g"),d=n("g"),$=n("g"),f=n("g"),g=ua({node:oa(a,t),config:t,measureText:s});i({layers:{frameLayer:c,pathLayer:d,nodeLayer:$,textLayer:f},shape:g.shapes,config:t}),o.append(p),o.append(c),o.append(d),o.append($),o.append(f),o.setAttribute("width",(g.shapes.w+2*t.flowchart.marginX).toString()),o.setAttribute("height",(g.shapes.h+2*t.flowchart.marginY).toString());var u=t.flowchart.backgroundColor;if(!["","none","transparent"].includes(u)){var l=Number(o.getAttribute("width")),m=Number(o.getAttribute("height"));p.append(n("rect",{x:0,y:0,width:l,height:m,fill:u}))}return o},this._document=n,this.src=a,this.config=t=wa(t),this.dummySVG=this.el("svg"),this.svg=this.el("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg"})}}(),ya=function(e){return new xa(e).render()};aa.Renderer=xa,aa.render=ya;var Ka=Z&&Z.__spreadArrays||function(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;var a=Array(r),c=0;for(e=0;e<t;e++)for(var n=arguments[e],$=0,f=n.length;$<f;$++,c++)a[c]=n[$];return a},La={initialize:function(r){Ka(document.getElementsByClassName("tefcha")).forEach(function(e){var t=e.textContent;e.textContent="",e.append(ya({src:t,document:document,config:r}))})}};window.tefcha=La;if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=Z}else if(typeof define==="function"&&define.amd){define(function(){return Z})}})();
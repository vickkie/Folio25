import{r as c}from"./index-B2FDVODs.js";let S={data:""},_=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||S,H=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,L=/\/\*[^]*?\*\/|  +/g,D=/\n+/g,b=(t,e)=>{let a="",s="",o="";for(let r in t){let n=t[r];r[0]=="@"?r[1]=="i"?a=r+" "+n+";":s+=r[1]=="f"?b(n,r):r+"{"+b(n,r[1]=="k"?"":e)+"}":typeof n=="object"?s+=b(n,e?e.replace(/([^,])+/g,i=>r.replace(/(^:.*)|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):r):n!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=b.p?b.p(r,n):r+":"+n+";")}return a+(e&&o?e+"{"+o+"}":o)+s},y={},T=t=>{if(typeof t=="object"){let e="";for(let a in t)e+=a+T(t[a]);return e}return t},U=(t,e,a,s,o)=>{let r=T(t),n=y[r]||(y[r]=(l=>{let d=0,u=11;for(;d<l.length;)u=101*u+l.charCodeAt(d++)>>>0;return"go"+u})(r));if(!y[n]){let l=r!==t?t:(d=>{let u,f,m=[{}];for(;u=H.exec(d.replace(L,""));)u[4]?m.shift():u[3]?(f=u[3].replace(D," ").trim(),m.unshift(m[0][f]=m[0][f]||{})):m[0][u[1]]=u[2].replace(D," ").trim();return m[0]})(t);y[n]=b(o?{["@keyframes "+n]:l}:l,a?"":"."+n)}let i=a&&y.g?y.g:null;return a&&(y.g=y[n]),((l,d,u,f)=>{f?d.data=d.data.replace(f,l):d.data.indexOf(l)===-1&&(d.data=u?l+d.data:d.data+l)})(y[n],e,s,i),n},R=(t,e,a)=>t.reduce((s,o,r)=>{let n=e[r];if(n&&n.call){let i=n(a),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;n=l?"."+l:i&&typeof i=="object"?i.props?"":b(i,""):i===!1?"":i}return s+o+(n??"")},"");function A(t){let e=this||{},a=t.call?t(e.p):t;return U(a.unshift?a.raw?R(a,[].slice.call(arguments,1),e.p):a.reduce((s,o)=>Object.assign(s,o&&o.call?o(e.p):o),{}):a,_(e.target),e.g,e.o,e.k)}let M,I,N;A.bind({g:1});let h=A.bind({k:1});function Y(t,e,a,s){b.p=e,M=t,I=a,N=s}function v(t,e){let a=this||{};return function(){let s=arguments;function o(r,n){let i=Object.assign({},r),l=i.className||o.className;a.p=Object.assign({theme:I&&I()},i),a.o=/ *go\d+/.test(l),i.className=A.apply(a,s)+(l?" "+l:"");let d=t;return t[0]&&(d=i.as||t,delete i.as),N&&d[0]&&N(i),M(d,i)}return e?e(o):o}}var Z=t=>typeof t=="function",j=(t,e)=>Z(t)?t(e):t,q=(()=>{let t=0;return()=>(++t).toString()})(),F=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),B=20,$=new Map,G=1e3,P=t=>{if($.has(t))return;let e=setTimeout(()=>{$.delete(t),x({type:4,toastId:t})},G);$.set(t,e)},J=t=>{let e=$.get(t);e&&clearTimeout(e)},z=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,B)};case 1:return e.toast.id&&J(e.toast.id),{...t,toasts:t.toasts.map(r=>r.id===e.toast.id?{...r,...e.toast}:r)};case 2:let{toast:a}=e;return t.toasts.find(r=>r.id===a.id)?z(t,{type:1,toast:a}):z(t,{type:0,toast:a});case 3:let{toastId:s}=e;return s?P(s):t.toasts.forEach(r=>{P(r.id)}),{...t,toasts:t.toasts.map(r=>r.id===s||s===void 0?{...r,visible:!1}:r)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(r=>r.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let o=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},k=[],O={toasts:[],pausedAt:void 0},x=t=>{O=z(O,t),k.forEach(e=>{e(O)})},Q={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(t={})=>{let[e,a]=c.useState(O);c.useEffect(()=>(k.push(a),()=>{let o=k.indexOf(a);o>-1&&k.splice(o,1)}),[e]);let s=e.toasts.map(o=>{var r,n;return{...t,...t[o.type],...o,duration:o.duration||((r=t[o.type])==null?void 0:r.duration)||(t==null?void 0:t.duration)||Q[o.type],style:{...t.style,...(n=t[o.type])==null?void 0:n.style,...o.style}}});return{...e,toasts:s}},W=(t,e="blank",a)=>({createdAt:Date.now(),visible:!0,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...a,id:(a==null?void 0:a.id)||q()}),w=t=>(e,a)=>{let s=W(e,t,a);return x({type:2,toast:s}),s.id},p=(t,e)=>w("blank")(t,e);p.error=w("error");p.success=w("success");p.loading=w("loading");p.custom=w("custom");p.dismiss=t=>{x({type:3,toastId:t})};p.remove=t=>x({type:4,toastId:t});p.promise=(t,e,a)=>{let s=p.loading(e.loading,{...a,...a==null?void 0:a.loading});return t.then(o=>(p.success(j(e.success,o),{id:s,...a,...a==null?void 0:a.success}),o)).catch(o=>{p.error(j(e.error,o),{id:s,...a,...a==null?void 0:a.error})}),t};var X=(t,e)=>{x({type:1,toast:{id:t,height:e}})},K=()=>{x({type:5,time:Date.now()})},tt=t=>{let{toasts:e,pausedAt:a}=V(t);c.useEffect(()=>{if(a)return;let r=Date.now(),n=e.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(r-i.createdAt);if(l<0){i.visible&&p.dismiss(i.id);return}return setTimeout(()=>p.dismiss(i.id),l)});return()=>{n.forEach(i=>i&&clearTimeout(i))}},[e,a]);let s=c.useCallback(()=>{a&&x({type:6,time:Date.now()})},[a]),o=c.useCallback((r,n)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:d}=n||{},u=e.filter(g=>(g.position||d)===(r.position||d)&&g.height),f=u.findIndex(g=>g.id===r.id),m=u.filter((g,C)=>C<f&&g.visible).length;return u.filter(g=>g.visible).slice(...i?[m+1]:[0,m]).reduce((g,C)=>g+(C.height||0)+l,0)},[e]);return{toasts:e,handlers:{updateHeight:X,startPause:K,endPause:s,calculateOffset:o}}},et=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,at=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,rt=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ot=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${et} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${at} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${rt} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,st=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,it=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${st} 1s linear infinite;
`,nt=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,lt=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,dt=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${nt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${lt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ct=v("div")`
  position: absolute;
`,ut=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,pt=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,mt=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${pt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ft=({toast:t})=>{let{icon:e,type:a,iconTheme:s}=t;return e!==void 0?typeof e=="string"?c.createElement(mt,null,e):e:a==="blank"?null:c.createElement(ut,null,c.createElement(it,{...s}),a!=="loading"&&c.createElement(ct,null,a==="error"?c.createElement(ot,{...s}):c.createElement(dt,{...s})))},gt=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,yt=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,ht="0%{opacity:0;} 100%{opacity:1;}",bt="0%{opacity:1;} 100%{opacity:0;}",vt=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,xt=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,wt=(t,e)=>{let a=t.includes("top")?1:-1,[s,o]=F()?[ht,bt]:[gt(a),yt(a)];return{animation:e?`${h(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Et=c.memo(({toast:t,position:e,style:a,children:s})=>{let o=t.height?wt(t.position||e||"top-center",t.visible):{opacity:0},r=c.createElement(ft,{toast:t}),n=c.createElement(xt,{...t.ariaProps},j(t.message,t));return c.createElement(vt,{className:t.className,style:{...o,...a,...t.style}},typeof s=="function"?s({icon:r,message:n}):c.createElement(c.Fragment,null,r,n))});Y(c.createElement);var $t=({id:t,className:e,style:a,onHeightUpdate:s,children:o})=>{let r=c.useCallback(n=>{if(n){let i=()=>{let l=n.getBoundingClientRect().height;s(t,l)};i(),new MutationObserver(i).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[t,s]);return c.createElement("div",{ref:r,className:e,style:a},o)},kt=(t,e)=>{let a=t.includes("top"),s=a?{top:0}:{bottom:0},o=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:F()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(a?1:-1)}px)`,...s,...o}},Ot=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,E=16,At=({reverseOrder:t,position:e="top-center",toastOptions:a,gutter:s,children:o,containerStyle:r,containerClassName:n})=>{let{toasts:i,handlers:l}=tt(a);return c.createElement("div",{style:{position:"fixed",zIndex:9999,top:E,left:E,right:E,bottom:E,pointerEvents:"none",...r},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},i.map(d=>{let u=d.position||e,f=l.calculateOffset(d,{reverseOrder:t,gutter:s,defaultPosition:e}),m=kt(u,f);return c.createElement($t,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?Ot:"",style:m},d.type==="custom"?j(d.message,d):o?o(d):c.createElement(Et,{toast:d,position:u}))}))},Ct=p;export{At as I,Ct as _};

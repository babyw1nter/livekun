import{d as k,u as L,b$ as M,a as i,r as j,n as W,b as Y,j as m,bN as q,c as d,N as H,_ as G,S as $,P as I,v as B,aY as J}from"./index-ZdwlXMyw.js";import{u as K}from"./useFlexGapSupport-BLXtpBiY.js";const Q={small:8,middle:16,large:24},U=()=>({prefixCls:String,size:{type:[String,Number,Array]},direction:I.oneOf(B("horizontal","vertical")).def("horizontal"),align:I.oneOf(B("start","end","center","baseline")),wrap:J()});function X(e){return typeof e=="string"?Q[e]:e||0}const o=k({compatConfig:{MODE:3},name:"ASpace",inheritAttrs:!1,props:U(),slots:Object,setup(e,F){let{slots:r,attrs:f}=F;const{prefixCls:n,space:g,direction:x}=L("space",e),[P,D]=M(n),z=K(),l=i(()=>{var t,a,s;return(s=(t=e.size)!==null&&t!==void 0?t:(a=g==null?void 0:g.value)===null||a===void 0?void 0:a.size)!==null&&s!==void 0?s:"small"}),y=j(),c=j();W(l,()=>{[y.value,c.value]=(Array.isArray(l.value)?l.value:[l.value,l.value]).map(t=>X(t))},{immediate:!0});const h=i(()=>e.align===void 0&&e.direction==="horizontal"?"center":e.align),E=i(()=>Y(n.value,D.value,`${n.value}-${e.direction}`,{[`${n.value}-rtl`]:x.value==="rtl",[`${n.value}-align-${h.value}`]:h.value})),R=i(()=>x.value==="rtl"?"marginLeft":"marginRight"),T=i(()=>{const t={};return z.value&&(t.columnGap=`${y.value}px`,t.rowGap=`${c.value}px`),m(m({},t),e.wrap&&{flexWrap:"wrap",marginBottom:`${-c.value}px`})});return()=>{var t,a;const{wrap:s,direction:V="horizontal"}=e,b=(t=r.default)===null||t===void 0?void 0:t.call(r),C=q(b),w=C.length;if(w===0)return null;const u=(a=r.split)===null||a===void 0?void 0:a.call(r),N=`${n.value}-item`,A=y.value,S=w-1;return d("div",G(G({},f),{},{class:[E.value,f.class],style:[T.value,f.style]}),[C.map((O,v)=>{let _=b.indexOf(O);_===-1&&(_=`$$space-${v}`);let p={};return z.value||(V==="vertical"?v<S&&(p={marginBottom:`${A/(u?2:1)}px`}):p=m(m({},v<S&&{[R.value]:`${A/(u?2:1)}px`}),s&&{paddingBottom:`${c.value}px`})),P(d(H,{key:_},[d("div",{class:N,style:p},[O]),v<S&&u&&d("span",{class:`${N}-split`,style:p},[u])]))})])}}});o.Compact=$;o.install=function(e){return e.component(o.name,o),e.component($.name,$),e};const te=o;export{te as _};
import{d as k,u as L,ca as M,a as i,r as O,n as W,b as q,j as m,bI as H,c as d,N as J,_ as j,S as $,P as G,v as B,av as K}from"./index-igQZxn8-.js";import{u as Q}from"./useFlexGapSupport-GI9GMh44.js";const U={small:8,middle:16,large:24},X=()=>({prefixCls:String,size:{type:[String,Number,Array]},direction:G.oneOf(B("horizontal","vertical")).def("horizontal"),align:G.oneOf(B("start","end","center","baseline")),wrap:K()});function Y(e){return typeof e=="string"?U[e]:e||0}const o=k({compatConfig:{MODE:3},name:"ASpace",inheritAttrs:!1,props:X(),slots:Object,setup(e,F){let{slots:r,attrs:f}=F;const{prefixCls:n,space:g,direction:x}=L("space",e),[P,D]=M(n),z=Q(),l=i(()=>{var t,a,s;return(s=(t=e.size)!==null&&t!==void 0?t:(a=g==null?void 0:g.value)===null||a===void 0?void 0:a.size)!==null&&s!==void 0?s:"small"}),y=O(),c=O();W(l,()=>{[y.value,c.value]=(Array.isArray(l.value)?l.value:[l.value,l.value]).map(t=>Y(t))},{immediate:!0});const h=i(()=>e.align===void 0&&e.direction==="horizontal"?"center":e.align),E=i(()=>q(n.value,D.value,`${n.value}-${e.direction}`,{[`${n.value}-rtl`]:x.value==="rtl",[`${n.value}-align-${h.value}`]:h.value})),R=i(()=>x.value==="rtl"?"marginLeft":"marginRight"),T=i(()=>{const t={};return z.value&&(t.columnGap=`${y.value}px`,t.rowGap=`${c.value}px`),m(m({},t),e.wrap&&{flexWrap:"wrap",marginBottom:`${-c.value}px`})});return()=>{var t,a;const{wrap:s,direction:V="horizontal"}=e,b=(t=r.default)===null||t===void 0?void 0:t.call(r),C=H(b),w=C.length;if(w===0)return null;const u=(a=r.split)===null||a===void 0?void 0:a.call(r),A=`${n.value}-item`,N=y.value,S=w-1;return d("div",j(j({},f),{},{class:[E.value,f.class],style:[T.value,f.style]}),[C.map((I,v)=>{let _=b.indexOf(I);_===-1&&(_=`$$space-${v}`);let p={};return z.value||(V==="vertical"?v<S&&(p={marginBottom:`${N/(u?2:1)}px`}):p=m(m({},v<S&&{[R.value]:`${N/(u?2:1)}px`}),s&&{paddingBottom:`${c.value}px`})),P(d(J,{key:_},[d("div",{class:A,style:p},[I]),v<S&&u&&d("span",{class:`${A}-split`,style:p},[u])]))})])}}});o.Compact=$;o.install=function(e){return e.component(o.name,o),e.component($.name,$),e};const te=o;export{te as _};

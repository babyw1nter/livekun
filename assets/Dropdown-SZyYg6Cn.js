import{d as V,P as n,r as g,n as B,a as m,c as d,_ as v,b as D,a2 as y,cd as M,N as $}from"./index-mEXGfnHG.js";import{T as L}from"./index-hd02fP8N.js";const l={adjustX:1,adjustY:1},s=[0,0],W={topLeft:{points:["bl","tl"],overflow:l,offset:[0,-4],targetOffset:s},topCenter:{points:["bc","tc"],overflow:l,offset:[0,-4],targetOffset:s},topRight:{points:["br","tr"],overflow:l,offset:[0,-4],targetOffset:s},bottomLeft:{points:["tl","bl"],overflow:l,offset:[0,4],targetOffset:s},bottomCenter:{points:["tc","bc"],overflow:l,offset:[0,4],targetOffset:s},bottomRight:{points:["tr","br"],overflow:l,offset:[0,4],targetOffset:s}},F=W;var R=function(e,c){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&c.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)c.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(a[o[i]]=e[o[i]]);return a};const K=V({compatConfig:{MODE:3},props:{minOverlayWidthMatchTrigger:{type:Boolean,default:void 0},arrow:{type:Boolean,default:!1},prefixCls:n.string.def("rc-dropdown"),transitionName:String,overlayClassName:n.string.def(""),openClassName:String,animation:n.any,align:n.object,overlayStyle:{type:Object,default:void 0},placement:n.string.def("bottomLeft"),overlay:n.any,trigger:n.oneOfType([n.string,n.arrayOf(n.string)]).def("hover"),alignPoint:{type:Boolean,default:void 0},showAction:n.array,hideAction:n.array,getPopupContainer:Function,visible:{type:Boolean,default:void 0},defaultVisible:{type:Boolean,default:!1},mouseEnterDelay:n.number.def(.15),mouseLeaveDelay:n.number.def(.1)},emits:["visibleChange","overlayClick"],setup(e,c){let{slots:a,emit:o,expose:i}=c;const f=g(!!e.visible);B(()=>e.visible,t=>{t!==void 0&&(f.value=t)});const p=g();i({triggerRef:p});const b=t=>{e.visible===void 0&&(f.value=!1),o("overlayClick",t)},h=t=>{e.visible===void 0&&(f.value=t),o("visibleChange",t)},C=()=>{var t;const r=(t=a.overlay)===null||t===void 0?void 0:t.call(a),u={prefixCls:`${e.prefixCls}-menu`,onClick:b};return d($,{key:M},[e.arrow&&d("div",{class:`${e.prefixCls}-arrow`},null),y(r,u,!1)])},w=m(()=>{const{minOverlayWidthMatchTrigger:t=!e.alignPoint}=e;return t}),O=()=>{var t;const r=(t=a.default)===null||t===void 0?void 0:t.call(a);return f.value&&r?y(r[0],{class:e.openClassName||`${e.prefixCls}-open`},!1):r},P=m(()=>!e.hideAction&&e.trigger.indexOf("contextmenu")!==-1?["click"]:e.hideAction);return()=>{const{prefixCls:t,arrow:r,showAction:u,overlayStyle:x,trigger:N,placement:A,align:j,getPopupContainer:S,transitionName:T,animation:_,overlayClassName:k}=e,E=R(e,["prefixCls","arrow","showAction","overlayStyle","trigger","placement","align","getPopupContainer","transitionName","animation","overlayClassName"]);return d(L,v(v({},E),{},{prefixCls:t,ref:p,popupClassName:D(k,{[`${t}-show-arrow`]:r}),popupStyle:x,builtinPlacements:F,action:N,showAction:u,hideAction:P.value||[],popupPlacement:A,popupAlign:j,popupTransitionName:T,popupAnimation:_,popupVisible:f.value,stretch:w.value?"minWidth":"",onPopupVisibleChange:h,getPopupContainer:S}),{popup:C,default:O})}}});export{K as D};

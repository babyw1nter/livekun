import{_ as p}from"./Paid-40fd08bc.js";import{d,v as y,r as v,f as x,z as k,X as l,Y as c,a as m,Z as P,F as b,a0 as h,$ as f,bl as I,bI as C}from"./index-75645e87.js";import{_ as L}from"./_plugin-vue_export-helper-366eeb79.js";const N=d({__name:"PaidPanel",props:{list:{type:Array,default:()=>[]},level:{type:Array,default:()=>[0,9,49,99,199,249,499]},maximum:{type:Number,default:150}},setup(r,{expose:u}){const _=r,t=y([]),a=v();x(t,()=>{k(()=>{a.value&&(a.value.scrollTop=a.value.scrollHeight)})});const g=n=>{n.uid&&(t.length>=_.maximum&&i(t[0].key),t.push(n))},i=n=>{const s=t.findIndex(o=>o.key===n);s>-1&&t.splice(s,1)};return u({add:g,del:i,clear:()=>{t.splice(0,t.length)}}),(n,s)=>{const o=p;return l(),c("ul",{class:"paid-panel clearfix",ref_key:"PaidPanelRef",ref:a},[m(I,{name:"fade"},{default:P(()=>[(l(!0),c(b,null,h(f(t),e=>(l(),c("li",{key:e.key},[m(o,{type:e.type||`level-${f(C)(e.money,r.level)}`,"avatar-url":e.avatarUrl,nickname:e.nickname,money:e.money,"gift-name":e.giftName,"gift-count":e.giftCount,"gift-image":e.giftImage,"gift-icon":e.giftIcon,message:e.message,comment:e.comment},null,8,["type","avatar-url","nickname","money","gift-name","gift-count","gift-image","gift-icon","message","comment"])]))),128))]),_:1})],512)}}});const F=L(N,[["__scopeId","data-v-bb76d8d3"]]);export{F as _};

import{_ as l}from"./HFont.vue_vue_type_script_setup_true_lang-f9cc6f23.js";import{d as m,r as d,c as _,bK as p,X as o,Y as c,al as t,a,$ as f,bH as u,an as y}from"./index-75645e87.js";import{A as g}from"./index-fa8fc9b6.js";import{_ as v}from"./_plugin-vue_export-helper-366eeb79.js";const x={class:"card-body"},S={class:"p-wrap"},h={class:"nickname"},N={class:"money"},b={key:0,class:"card-footer"},k={class:"message"},C=m({__name:"Paid",props:{type:{type:String,default:"level-0"},avatarUrl:{type:String,default:""},nickname:{type:String,default:""},money:{type:Number,default:0},giftName:{type:String,default:""},giftCount:{type:Number,default:0},giftImage:{type:String,default:""},giftIcon:{type:String,default:""},profile:{type:String,default:""},message:{type:String,default:""},comment:{type:String,default:""}},setup(e){const s=e;d(s.type);const r=_(()=>p(Number(s.money.toFixed(2)),2));return(B,I)=>{const i=g,n=l;return o(),c("div",{class:y(["paid no-select",e.type])},[t("div",x,[a(i,{class:"card-avatar",src:e.avatarUrl,size:24},null,8,["src"]),t("div",S,[t("p",h,[a(n,{text:e.nickname},null,8,["text"])]),t("p",N,[a(n,{text:e.profile||`¥${f(r)}`},null,8,["text"])])])]),e.comment!==""?(o(),c("div",b,[t("p",k,[a(n,{text:e.comment},null,8,["text"])])])):u("",!0)],2)}}});const F=v(C,[["__scopeId","data-v-8e6c68ae"]]);export{F as _};

import{_}from"./TicketPanel-41858164.js";import{u as g}from"./socket-d834a0cf.js";import{d as f,r as C,W as k,a1 as m,X as P,a8 as d,$ as r,a9 as s}from"./index-2c669624.js";import{a as E}from"./config-7ba7c755.js";import"./HFont.vue_vue_type_script_setup_true_lang-97f33369.js";import"./index-c0899095.js";import"./_plugin-vue_export-helper-9ca58efc.js";import"./index-aa503dc4.js";import"./index-1c193e01.js";import"./collapseMotion-cfe5aa9b.js";import"./Dropdown-538712f6.js";import"./index-4a29f061.js";import"./RightOutlined-1be948f3.js";const H=f({__name:"PluginPage",async setup(v){let a,l;const i=C();let{reactivityPluginConfig:o,pull:c,reset:R,save:T}=([a,l]=k(()=>E(m.PLUGIN_TICKET)),a=await a,l(),a);const u=t=>{var e;switch(t){case s.CLEAR:(e=i.value)==null||e.clear();break;case s.REFRESH_PAGE:break;case s.REFRESH_CONFIG:c();break}},p=t=>{var n;const e=t;(n=i.value)==null||n.add({...e})};return g(m.PLUGIN_TICKET,u,p),(t,e)=>{const n=_;return P(),d(n,{ref_key:"TicketPanelRef",ref:i,maximum:r(o).pluginConfig.maximum,level:r(o).pluginConfig.level,duration:r(o).pluginConfig.duration},null,8,["maximum","level","duration"])}}});export{H as default};
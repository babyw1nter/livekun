import{ce as a,r as n,d as r,a as c,cf as l,o as f,L as u,K as i,J as p}from"./index--OMG9p4T.js";const S=()=>{var o;const t=a(),e=n("");return t&&typeof t.default=="function"&&(e.value=((o=t.default()[0].children)==null?void 0:o.toString())||""),{text:e}},d=["innerHTML"],T=r({__name:"HFont",props:{text:{type:String,default:""},color:{type:String,default:""},fontSize:{type:Number,default:18}},setup(t){const e=t,o=S(),s=c(()=>l(o.text.value||e.text));return(m,x)=>(f(),u("span",{class:"h-font",style:i({color:t.color,fontSize:`${t.fontSize}px`}),innerHTML:p(s)},null,12,d))}});var E=(t=>(t.PLUGIN_CHAT_MESSAGE="chat-message",t.PLUGIN_TICKET="ticket",t.PLUGIN_PAID="paid",t))(E||{}),_=(t=>(t.REFRESH_PAGE="refresh",t.REFRESH_CONFIG="get-config",t.CLEAR="clear",t))(_||{});export{E as P,T as _,_ as a,S as u};
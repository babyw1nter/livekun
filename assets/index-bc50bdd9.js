import{r as No,K as Bo,a_ as Eo,a as p,d as L,aM as Do,s as P,o as no,h as lo,aC as To,aZ as eo,l as Oo,M as ao,c as I,e as Ao,f as wo,z as Io,P as Mo,bG as fo,L as vo,_ as r,I as io,af as _o,bQ as Go,v as jo,q as Ho,j as Vo,N as Fo,k as Uo,A as Xo,b as M,bR as qo}from"./index-75645e87.js";import{w as bo,v as Ko}from"./index-9ef8003b.js";import{g as Qo,h as Zo,d as zo,u as Jo}from"./collapseMotion-860d47bd.js";function w(o){const e=typeof o=="function"?o():o,t=No(e);function l(s){t.value=s}return[t,l]}const Yo=o=>{const{componentCls:e,colorPrimary:t}=o;return{[e]:{position:"absolute",background:"transparent",pointerEvents:"none",boxSizing:"border-box",color:`var(--wave-color, ${t})`,boxShadow:"0 0 0 0 currentcolor",opacity:.2,"&.wave-motion-appear":{transition:[`box-shadow 0.4s ${o.motionEaseOutCirc}`,`opacity 2s ${o.motionEaseOutCirc}`].join(","),"&-active":{boxShadow:"0 0 0 6px currentcolor",opacity:0}}}}},ko=Bo("Wave",o=>[Yo(o)]);function oe(o){const e=(o||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);return e&&e[1]&&e[2]&&e[3]?!(e[1]===e[2]&&e[2]===e[3]):!0}function k(o){return o&&o!=="#fff"&&o!=="#ffffff"&&o!=="rgb(255, 255, 255)"&&o!=="rgba(255, 255, 255, 1)"&&oe(o)&&!/rgba\((?:\d*, ){3}0\)/.test(o)&&o!=="transparent"}function ee(o){const{borderTopColor:e,borderColor:t,backgroundColor:l}=getComputedStyle(o);return k(e)?e:k(t)?t:k(l)?l:null}function oo(o){return Number.isNaN(o)?0:o}const te=L({props:{target:Do(),className:String},setup(o){const e=P(null),[t,l]=w(null),[s,d]=w([]),[u,c]=w(0),[g,a]=w(0),[h,H]=w(0),[x,F]=w(0),[z,E]=w(!1);function T(){const{target:i}=o,m=getComputedStyle(i);l(ee(i));const R=m.position==="static",{borderLeftWidth:X,borderTopWidth:q}=m;c(R?i.offsetLeft:oo(-parseFloat(X))),a(R?i.offsetTop:oo(-parseFloat(q))),H(i.offsetWidth),F(i.offsetHeight);const{borderTopLeftRadius:K,borderTopRightRadius:uo,borderBottomLeftRadius:go,borderBottomRightRadius:n}=m;d([K,uo,n,go].map(f=>oo(parseFloat(f))))}let C,b,B;const W=()=>{clearTimeout(B),bo.cancel(b),C==null||C.disconnect()},N=()=>{var i;const m=(i=e.value)===null||i===void 0?void 0:i.parentElement;m&&(Eo(null,m),m.parentElement&&m.parentElement.removeChild(m))};no(()=>{W(),B=setTimeout(()=>{N()},5e3);const{target:i}=o;i&&(b=bo(()=>{T(),E(!0)}),typeof ResizeObserver<"u"&&(C=new ResizeObserver(T),C.observe(i)))}),lo(()=>{W()});const U=i=>{i.propertyName==="opacity"&&N()};return()=>{if(!z.value)return null;const i={left:`${u.value}px`,top:`${g.value}px`,width:`${h.value}px`,height:`${x.value}px`,borderRadius:s.value.map(m=>`${m}px`).join(" ")};return t&&(i["--wave-color"]=t.value),p(To,{appear:!0,name:"wave-motion",appearFromClass:"wave-motion-appear",appearActiveClass:"wave-motion-appear",appearToClass:"wave-motion-appear wave-motion-appear-active"},{default:()=>[p("div",{ref:e,class:o.className,style:i,onTransitionend:U},null)]})}}});function re(o,e){const t=document.createElement("div");t.style.position="absolute",t.style.left="0px",t.style.top="0px",o==null||o.insertBefore(t,o==null?void 0:o.firstChild),Eo(p(te,{target:o,className:e},null),t)}function ne(o,e){function t(){const l=eo(o);re(l,e.value)}return t}const le=L({compatConfig:{MODE:3},name:"Wave",props:{disabled:Boolean},setup(o,e){let{slots:t}=e;const l=Oo(),{prefixCls:s}=ao("wave",o),[,d]=ko(s),u=ne(l,I(()=>Ao(s.value,d.value)));let c;const g=()=>{eo(l).removeEventListener("click",c,!0)};return no(()=>{wo(()=>o.disabled,()=>{g(),Io(()=>{const a=eo(l);a==null||a.removeEventListener("click",c,!0),!(!a||a.nodeType!==1||o.disabled)&&(c=h=>{h.target.tagName==="INPUT"||!Ko(h.target)||!a.getAttribute||a.getAttribute("disabled")||a.disabled||a.className.includes("disabled")||a.className.includes("-leave")||u()},a.addEventListener("click",c,!0))})},{immediate:!0,flush:"post"})}),lo(()=>{g()}),()=>{var a;return(a=t.default)===null||a===void 0?void 0:a.call(t)[0]}}});function Re(o){return o==="danger"?{danger:!0}:{type:o}}const ae=()=>({prefixCls:String,type:String,htmlType:{type:String,default:"button"},shape:{type:String},size:{type:String},loading:{type:[Boolean,Object],default:()=>!1},disabled:{type:Boolean,default:void 0},ghost:{type:Boolean,default:void 0},block:{type:Boolean,default:void 0},danger:{type:Boolean,default:void 0},icon:Mo.any,href:String,target:String,title:String,onClick:fo(),onMousedown:fo()}),ie=ae,ho=o=>{o&&(o.style.width="0px",o.style.opacity="0",o.style.transform="scale(0)")},yo=o=>{Io(()=>{o&&(o.style.width=`${o.scrollWidth}px`,o.style.opacity="1",o.style.transform="scale(1)")})},Co=o=>{o&&o.style&&(o.style.width=null,o.style.opacity=null,o.style.transform=null)},se=L({compatConfig:{MODE:3},name:"LoadingIcon",props:{prefixCls:String,loading:[Boolean,Object],existIcon:Boolean},setup(o){return()=>{const{existIcon:e,prefixCls:t,loading:l}=o;if(e)return p("span",{class:`${t}-loading-icon`},[p(vo,null,null)]);const s=!!l;return p(To,{name:`${t}-loading-icon-motion`,onBeforeEnter:ho,onEnter:yo,onAfterEnter:Co,onBeforeLeave:yo,onLeave:d=>{setTimeout(()=>{ho(d)})},onAfterLeave:Co},{default:()=>[s?p("span",{class:`${t}-loading-icon`},[p(vo,null,null)]):null]})}}}),$o=(o,e)=>({[`> span, > ${o}`]:{"&:not(:last-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineEndColor:e}}},"&:not(:first-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineStartColor:e}}}}}),ce=o=>{const{componentCls:e,fontSize:t,lineWidth:l,colorPrimaryHover:s,colorErrorHover:d}=o;return{[`${e}-group`]:[{position:"relative",display:"inline-flex",[`> span, > ${e}`]:{"&:not(:last-child)":{[`&, & > ${e}`]:{borderStartEndRadius:0,borderEndEndRadius:0}},"&:not(:first-child)":{marginInlineStart:-l,[`&, & > ${e}`]:{borderStartStartRadius:0,borderEndStartRadius:0}}},[e]:{position:"relative",zIndex:1,"&:hover,\n          &:focus,\n          &:active":{zIndex:2},"&[disabled]":{zIndex:0}},[`${e}-icon-only`]:{fontSize:t}},$o(`${e}-primary`,s),$o(`${e}-danger`,d)]}},de=ce;function ue(o,e){return{[`&-item:not(${e}-last-item)`]:{marginBottom:-o.lineWidth},"&-item":{"&:hover,&:focus,&:active":{zIndex:2},"&[disabled]":{zIndex:0}}}}function ge(o,e){return{[`&-item:not(${e}-first-item):not(${e}-last-item)`]:{borderRadius:0},[`&-item${e}-first-item:not(${e}-last-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderEndEndRadius:0,borderEndStartRadius:0}},[`&-item${e}-last-item:not(${e}-first-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderStartStartRadius:0,borderStartEndRadius:0}}}}function pe(o){const e=`${o.componentCls}-compact-vertical`;return{[e]:r(r({},ue(o,e)),ge(o.componentCls,e))}}const me=o=>{const{componentCls:e,iconCls:t}=o;return{[e]:{outline:"none",position:"relative",display:"inline-block",fontWeight:400,whiteSpace:"nowrap",textAlign:"center",backgroundImage:"none",backgroundColor:"transparent",border:`${o.lineWidth}px ${o.lineType} transparent`,cursor:"pointer",transition:`all ${o.motionDurationMid} ${o.motionEaseInOut}`,userSelect:"none",touchAction:"manipulation",lineHeight:o.lineHeight,color:o.colorText,"> span":{display:"inline-block"},[`> ${t} + span, > span + ${t}`]:{marginInlineStart:o.marginXS},"> a":{color:"currentColor"},"&:not(:disabled)":r({},_o(o)),[`&-icon-only${e}-compact-item`]:{flex:"none"},[`&-compact-item${e}-primary`]:{[`&:not([disabled]) + ${e}-compact-item${e}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:-o.lineWidth,insetInlineStart:-o.lineWidth,display:"inline-block",width:o.lineWidth,height:`calc(100% + ${o.lineWidth*2}px)`,backgroundColor:o.colorPrimaryHover,content:'""'}}},"&-compact-vertical-item":{[`&${e}-primary`]:{[`&:not([disabled]) + ${e}-compact-vertical-item${e}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:-o.lineWidth,insetInlineStart:-o.lineWidth,display:"inline-block",width:`calc(100% + ${o.lineWidth*2}px)`,height:o.lineWidth,backgroundColor:o.colorPrimaryHover,content:'""'}}}}}}},S=(o,e)=>({"&:not(:disabled)":{"&:hover":o,"&:active":e}}),fe=o=>({minWidth:o.controlHeight,paddingInlineStart:0,paddingInlineEnd:0,borderRadius:"50%"}),ve=o=>({borderRadius:o.controlHeight,paddingInlineStart:o.controlHeight/2,paddingInlineEnd:o.controlHeight/2}),to=o=>({cursor:"not-allowed",borderColor:o.colorBorder,color:o.colorTextDisabled,backgroundColor:o.colorBgContainerDisabled,boxShadow:"none"}),j=(o,e,t,l,s,d,u)=>({[`&${o}-background-ghost`]:r(r({color:e||void 0,backgroundColor:"transparent",borderColor:t||void 0,boxShadow:"none"},S(r({backgroundColor:"transparent"},d),r({backgroundColor:"transparent"},u))),{"&:disabled":{cursor:"not-allowed",color:l||void 0,borderColor:s||void 0}})}),so=o=>({"&:disabled":r({},to(o))}),Wo=o=>r({},so(o)),V=o=>({"&:disabled":{cursor:"not-allowed",color:o.colorTextDisabled}}),Ro=o=>r(r(r(r(r({},Wo(o)),{backgroundColor:o.colorBgContainer,borderColor:o.colorBorder,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlTmpOutline}`}),S({color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),j(o.componentCls,o.colorBgContainer,o.colorBgContainer,o.colorTextDisabled,o.colorBorder)),{[`&${o.componentCls}-dangerous`]:r(r(r({color:o.colorError,borderColor:o.colorError},S({color:o.colorErrorHover,borderColor:o.colorErrorBorderHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),j(o.componentCls,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder)),so(o))}),be=o=>r(r(r(r(r({},Wo(o)),{color:o.colorTextLightSolid,backgroundColor:o.colorPrimary,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlOutline}`}),S({color:o.colorTextLightSolid,backgroundColor:o.colorPrimaryHover},{color:o.colorTextLightSolid,backgroundColor:o.colorPrimaryActive})),j(o.componentCls,o.colorPrimary,o.colorPrimary,o.colorTextDisabled,o.colorBorder,{color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),{[`&${o.componentCls}-dangerous`]:r(r(r({backgroundColor:o.colorError,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.colorErrorOutline}`},S({backgroundColor:o.colorErrorHover},{backgroundColor:o.colorErrorActive})),j(o.componentCls,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder,{color:o.colorErrorHover,borderColor:o.colorErrorHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),so(o))}),he=o=>r(r({},Ro(o)),{borderStyle:"dashed"}),ye=o=>r(r(r({color:o.colorLink},S({color:o.colorLinkHover},{color:o.colorLinkActive})),V(o)),{[`&${o.componentCls}-dangerous`]:r(r({color:o.colorError},S({color:o.colorErrorHover},{color:o.colorErrorActive})),V(o))}),Ce=o=>r(r(r({},S({color:o.colorText,backgroundColor:o.colorBgTextHover},{color:o.colorText,backgroundColor:o.colorBgTextActive})),V(o)),{[`&${o.componentCls}-dangerous`]:r(r({color:o.colorError},V(o)),S({color:o.colorErrorHover,backgroundColor:o.colorErrorBg},{color:o.colorErrorHover,backgroundColor:o.colorErrorBg}))}),$e=o=>r(r({},to(o)),{[`&${o.componentCls}:hover`]:r({},to(o))}),Se=o=>{const{componentCls:e}=o;return{[`${e}-default`]:Ro(o),[`${e}-primary`]:be(o),[`${e}-dashed`]:he(o),[`${e}-link`]:ye(o),[`${e}-text`]:Ce(o),[`${e}-disabled`]:$e(o)}},co=function(o){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const{componentCls:t,iconCls:l,controlHeight:s,fontSize:d,lineHeight:u,lineWidth:c,borderRadius:g,buttonPaddingHorizontal:a}=o,h=Math.max(0,(s-d*u)/2-c),H=a-c,x=`${t}-icon-only`;return[{[`${t}${e}`]:{fontSize:d,height:s,padding:`${h}px ${H}px`,borderRadius:g,[`&${x}`]:{width:s,paddingInlineStart:0,paddingInlineEnd:0,[`&${t}-round`]:{width:"auto"},"> span":{transform:"scale(1.143)"}},[`&${t}-loading`]:{opacity:o.opacityLoading,cursor:"default"},[`${t}-loading-icon`]:{transition:`width ${o.motionDurationSlow} ${o.motionEaseInOut}, opacity ${o.motionDurationSlow} ${o.motionEaseInOut}`},[`&:not(${x}) ${t}-loading-icon > ${l}`]:{marginInlineEnd:o.marginXS}}},{[`${t}${t}-circle${e}`]:fe(o)},{[`${t}${t}-round${e}`]:ve(o)}]},xe=o=>co(o),Be=o=>{const e=io(o,{controlHeight:o.controlHeightSM,padding:o.paddingXS,buttonPaddingHorizontal:8,borderRadius:o.borderRadiusSM});return co(e,`${o.componentCls}-sm`)},Ee=o=>{const e=io(o,{controlHeight:o.controlHeightLG,fontSize:o.fontSizeLG,borderRadius:o.borderRadiusLG});return co(e,`${o.componentCls}-lg`)},Te=o=>{const{componentCls:e}=o;return{[e]:{[`&${e}-block`]:{width:"100%"}}}},we=Bo("Button",o=>{const{controlTmpOutline:e,paddingContentHorizontal:t}=o,l=io(o,{colorOutlineDefault:e,buttonPaddingHorizontal:t});return[me(l),Be(l),xe(l),Ee(l),Te(l),Se(l),de(l),Qo(o,{focus:!1}),pe(o)]}),Ie=()=>({prefixCls:String,size:{type:String}}),Po=Zo(),ro=L({compatConfig:{MODE:3},name:"AButtonGroup",props:Ie(),setup(o,e){let{slots:t}=e;const{prefixCls:l,direction:s}=ao("btn-group",o),[,,d]=Go();Po.useProvide(jo({size:I(()=>o.size)}));const u=I(()=>{const{size:c}=o;let g="";switch(c){case"large":g="lg";break;case"small":g="sm";break;case"middle":case void 0:break;default:zo(!c,"Button.Group","Invalid prop `size`.")}return{[`${l.value}`]:!0,[`${l.value}-${g}`]:g,[`${l.value}-rtl`]:s.value==="rtl",[d.value]:!0}});return()=>{var c;return p("div",{class:u.value},[Ho((c=t.default)===null||c===void 0?void 0:c.call(t))])}}}),So=/^[\u4e00-\u9fa5]{2}$/,xo=So.test.bind(So);function _(o){return o==="text"||o==="link"}const G=L({compatConfig:{MODE:3},name:"AButton",inheritAttrs:!1,__ANT_BUTTON:!0,props:Vo(ie(),{type:"default"}),slots:Object,setup(o,e){let{slots:t,attrs:l,emit:s,expose:d}=e;const{prefixCls:u,autoInsertSpaceInButton:c,direction:g,size:a}=ao("btn",o),[h,H]=we(u),x=Po.useInject(),F=Fo(),z=I(()=>{var n;return(n=o.disabled)!==null&&n!==void 0?n:F.value}),E=P(null),T=P(void 0);let C=!1;const b=P(!1),B=P(!1),W=I(()=>c.value!==!1),{compactSize:N,compactItemClassnames:U}=Jo(u,g),i=I(()=>typeof o.loading=="object"&&o.loading.delay?o.loading.delay||!0:!!o.loading);wo(i,n=>{clearTimeout(T.value),typeof i.value=="number"?T.value=setTimeout(()=>{b.value=n},i.value):b.value=n},{immediate:!0});const m=I(()=>{const{type:n,shape:f="default",ghost:$,block:y,danger:Q}=o,v=u.value,D={large:"lg",small:"sm",middle:void 0},O=N.value||(x==null?void 0:x.size)||a.value,A=O&&D[O]||"";return[U.value,{[H.value]:!0,[`${v}`]:!0,[`${v}-${f}`]:f!=="default"&&f,[`${v}-${n}`]:n,[`${v}-${A}`]:A,[`${v}-loading`]:b.value,[`${v}-background-ghost`]:$&&!_(n),[`${v}-two-chinese-chars`]:B.value&&W.value,[`${v}-block`]:y,[`${v}-dangerous`]:!!Q,[`${v}-rtl`]:g.value==="rtl"}]}),R=()=>{const n=E.value;if(!n||c.value===!1)return;const f=n.textContent;C&&xo(f)?B.value||(B.value=!0):B.value&&(B.value=!1)},X=n=>{if(b.value||z.value){n.preventDefault();return}s("click",n)},q=n=>{s("mousedown",n)},K=(n,f)=>{const $=f?" ":"";if(n.type===qo){let y=n.children.trim();return xo(y)&&(y=y.split("").join($)),p("span",null,[y])}return n};return Uo(()=>{zo(!(o.ghost&&_(o.type)),"Button","`link` or `text` button can't be a `ghost` button.")}),no(R),Xo(R),lo(()=>{T.value&&clearTimeout(T.value)}),d({focus:()=>{var n;(n=E.value)===null||n===void 0||n.focus()},blur:()=>{var n;(n=E.value)===null||n===void 0||n.blur()}}),()=>{var n,f;const{icon:$=(n=t.icon)===null||n===void 0?void 0:n.call(t)}=o,y=Ho((f=t.default)===null||f===void 0?void 0:f.call(t));C=y.length===1&&!$&&!_(o.type);const{type:Q,htmlType:v,href:D,title:O,target:A}=o,Lo=b.value?"loading":$,Z=r(r({},l),{title:O,disabled:z.value,class:[m.value,l.class,{[`${u.value}-icon-only`]:y.length===0&&!!Lo}],onClick:X,onMousedown:q});z.value||delete Z.disabled;const po=$&&!b.value?$:p(se,{existIcon:!!$,prefixCls:u.value,loading:!!b.value},null),mo=y.map(Y=>K(Y,C&&W.value));if(D!==void 0)return h(p("a",M(M({},Z),{},{href:D,target:A,ref:E}),[po,mo]));let J=p("button",M(M({},Z),{},{ref:E,type:v}),[po,mo]);if(!_(Q)){const Y=function(){return J}();J=p(le,{ref:"wave",disabled:!!b.value},{default:()=>[Y]})}return h(J)}}});G.Group=ro;G.install=function(o){return o.component(G.name,G),o.component(ro.name,ro),o};export{G as B,le as W,ie as b,Re as c,w as u};

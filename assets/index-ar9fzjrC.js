import{g as J,m as K,j as B,Z as Q,$ as U,v as Y,d as ee,u as oe,s as _,a as ne,b as le,c as s,a0 as te,a1 as ie,a2 as ae,a3 as se,a4 as re,a5 as ce,_ as j,a6 as de,C as ue,a7 as ge,e as pe,E as me,a8 as fe,T as ve,a9 as $e,aa as ye,P as v}from"./index-mEXGfnHG.js";const w=(e,o,n,i,a)=>({backgroundColor:e,border:`${i.lineWidth}px ${i.lineType} ${o}`,[`${a}-icon`]:{color:n}}),he=e=>{const{componentCls:o,motionDurationSlow:n,marginXS:i,marginSM:a,fontSize:u,fontSizeLG:r,lineHeight:g,borderRadiusLG:$,motionEaseInOutCirc:c,alertIconSizeLG:d,colorText:m,paddingContentVerticalSM:f,alertPaddingHorizontal:y,paddingMD:C,paddingContentHorizontalLG:S}=e;return{[o]:B(B({},Q(e)),{position:"relative",display:"flex",alignItems:"center",padding:`${f}px ${y}px`,wordWrap:"break-word",borderRadius:$,[`&${o}-rtl`]:{direction:"rtl"},[`${o}-content`]:{flex:1,minWidth:0},[`${o}-icon`]:{marginInlineEnd:i,lineHeight:0},"&-description":{display:"none",fontSize:u,lineHeight:g},"&-message":{color:m},[`&${o}-motion-leave`]:{overflow:"hidden",opacity:1,transition:`max-height ${n} ${c}, opacity ${n} ${c},
        padding-top ${n} ${c}, padding-bottom ${n} ${c},
        margin-bottom ${n} ${c}`},[`&${o}-motion-leave-active`]:{maxHeight:0,marginBottom:"0 !important",paddingTop:0,paddingBottom:0,opacity:0}}),[`${o}-with-description`]:{alignItems:"flex-start",paddingInline:S,paddingBlock:C,[`${o}-icon`]:{marginInlineEnd:a,fontSize:d,lineHeight:0},[`${o}-message`]:{display:"block",marginBottom:i,color:m,fontSize:r},[`${o}-description`]:{display:"block"}},[`${o}-banner`]:{marginBottom:0,border:"0 !important",borderRadius:0}}},Ce=e=>{const{componentCls:o,colorSuccess:n,colorSuccessBorder:i,colorSuccessBg:a,colorWarning:u,colorWarningBorder:r,colorWarningBg:g,colorError:$,colorErrorBorder:c,colorErrorBg:d,colorInfo:m,colorInfoBorder:f,colorInfoBg:y}=e;return{[o]:{"&-success":w(a,i,n,e,o),"&-info":w(y,f,m,e,o),"&-warning":w(g,r,u,e,o),"&-error":B(B({},w(d,c,$,e,o)),{[`${o}-description > pre`]:{margin:0,padding:0}})}}},Se=e=>{const{componentCls:o,iconCls:n,motionDurationMid:i,marginXS:a,fontSizeIcon:u,colorIcon:r,colorIconHover:g}=e;return{[o]:{"&-action":{marginInlineStart:a},[`${o}-close-icon`]:{marginInlineStart:a,padding:0,overflow:"hidden",fontSize:u,lineHeight:`${u}px`,backgroundColor:"transparent",border:"none",outline:"none",cursor:"pointer",[`${n}-close`]:{color:r,transition:`color ${i}`,"&:hover":{color:g}}},"&-close-text":{color:r,transition:`color ${i}`,"&:hover":{color:g}}}}},xe=e=>[he(e),Ce(e),Se(e)],Ie=J("Alert",e=>{const{fontSizeHeading3:o}=e,n=K(e,{alertIconSizeLG:o,alertPaddingHorizontal:12});return[xe(n)]}),be={success:ue,info:ge,error:pe,warning:me},_e={success:fe,info:ve,error:$e,warning:ye},we=Y("success","info","warning","error"),Be=()=>({type:v.oneOf(we),closable:{type:Boolean,default:void 0},closeText:v.any,message:v.any,description:v.any,afterClose:Function,showIcon:{type:Boolean,default:void 0},prefixCls:String,banner:{type:Boolean,default:void 0},icon:v.any,closeIcon:v.any,onClose:Function}),Te=ee({compatConfig:{MODE:3},name:"AAlert",inheritAttrs:!1,props:Be(),setup(e,o){let{slots:n,emit:i,attrs:a,expose:u}=o;const{prefixCls:r,direction:g}=oe("alert",e),[$,c]=Ie(r),d=_(!1),m=_(!1),f=_(),y=t=>{t.preventDefault();const p=f.value;p.style.height=`${p.offsetHeight}px`,p.style.height=`${p.offsetHeight}px`,d.value=!0,i("close",t)},C=()=>{var t;d.value=!1,m.value=!0,(t=e.afterClose)===null||t===void 0||t.call(e)},S=ne(()=>{const{type:t}=e;return t!==void 0?t:e.banner?"warning":"info"});u({animationEnd:C});const N=_({});return()=>{var t,p,T,H,E,z,A,L,O,F;const{banner:D,closeIcon:W=(t=n.closeIcon)===null||t===void 0?void 0:t.call(n)}=e;let{closable:M,showIcon:h}=e;const P=(p=e.closeText)!==null&&p!==void 0?p:(T=n.closeText)===null||T===void 0?void 0:T.call(n),x=(H=e.description)!==null&&H!==void 0?H:(E=n.description)===null||E===void 0?void 0:E.call(n),G=(z=e.message)!==null&&z!==void 0?z:(A=n.message)===null||A===void 0?void 0:A.call(n),I=(L=e.icon)!==null&&L!==void 0?L:(O=n.icon)===null||O===void 0?void 0:O.call(n),R=(F=n.action)===null||F===void 0?void 0:F.call(n);h=D&&h===void 0?!0:h;const V=(x?_e:be)[S.value]||null;P&&(M=!0);const l=r.value,k=le(l,{[`${l}-${S.value}`]:!0,[`${l}-closing`]:d.value,[`${l}-with-description`]:!!x,[`${l}-no-icon`]:!h,[`${l}-banner`]:!!D,[`${l}-closable`]:M,[`${l}-rtl`]:g.value==="rtl",[c.value]:!0}),X=M?s("button",{type:"button",onClick:y,class:`${l}-close-icon`,tabindex:0},[P?s("span",{class:`${l}-close-text`},[P]):W===void 0?s(te,null,null):W]):null,Z=I&&(ie(I)?ae(I,{class:`${l}-icon`}):s("span",{class:`${l}-icon`},[I]))||s(V,{class:`${l}-icon`},null),q=se(`${l}-motion`,{appear:!1,css:!0,onAfterLeave:C,onBeforeLeave:b=>{b.style.maxHeight=`${b.offsetHeight}px`},onLeave:b=>{b.style.maxHeight="0px"}});return $(m.value?null:s(de,q,{default:()=>[re(s("div",j(j({role:"alert"},a),{},{style:[a.style,N.value],class:[a.class,k],"data-show":!d.value,ref:f}),[h?Z:null,s("div",{class:`${l}-content`},[G?s("div",{class:`${l}-message`},[G]):null,x?s("div",{class:`${l}-description`},[x]):null]),R?s("div",{class:`${l}-action`},[R]):null,X]),[[ce,!d.value]])]}))}}}),Ee=U(Te);export{Ee as _};

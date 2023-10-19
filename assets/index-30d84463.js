import{g as J,m as K,j as B,Z as Q,$ as U,v as Y,d as oo,u as eo,s as _,a as no,b as to,c as s,a0 as lo,a1 as io,a2 as ao,a3 as so,a4 as ro,_ as j,a5 as co,C as uo,a6 as go,e as po,E as mo,a7 as fo,T as vo,a8 as $o,a9 as yo,P as v}from"./index-15cc7a47.js";import{c as ho}from"./index-8c4f3fbc.js";const w=(o,e,n,i,a)=>({backgroundColor:o,border:`${i.lineWidth}px ${i.lineType} ${e}`,[`${a}-icon`]:{color:n}}),Co=o=>{const{componentCls:e,motionDurationSlow:n,marginXS:i,marginSM:a,fontSize:u,fontSizeLG:r,lineHeight:g,borderRadiusLG:$,motionEaseInOutCirc:c,alertIconSizeLG:d,colorText:m,paddingContentVerticalSM:f,alertPaddingHorizontal:y,paddingMD:C,paddingContentHorizontalLG:S}=o;return{[e]:B(B({},Q(o)),{position:"relative",display:"flex",alignItems:"center",padding:`${f}px ${y}px`,wordWrap:"break-word",borderRadius:$,[`&${e}-rtl`]:{direction:"rtl"},[`${e}-content`]:{flex:1,minWidth:0},[`${e}-icon`]:{marginInlineEnd:i,lineHeight:0},"&-description":{display:"none",fontSize:u,lineHeight:g},"&-message":{color:m},[`&${e}-motion-leave`]:{overflow:"hidden",opacity:1,transition:`max-height ${n} ${c}, opacity ${n} ${c},
        padding-top ${n} ${c}, padding-bottom ${n} ${c},
        margin-bottom ${n} ${c}`},[`&${e}-motion-leave-active`]:{maxHeight:0,marginBottom:"0 !important",paddingTop:0,paddingBottom:0,opacity:0}}),[`${e}-with-description`]:{alignItems:"flex-start",paddingInline:S,paddingBlock:C,[`${e}-icon`]:{marginInlineEnd:a,fontSize:d,lineHeight:0},[`${e}-message`]:{display:"block",marginBottom:i,color:m,fontSize:r},[`${e}-description`]:{display:"block"}},[`${e}-banner`]:{marginBottom:0,border:"0 !important",borderRadius:0}}},So=o=>{const{componentCls:e,colorSuccess:n,colorSuccessBorder:i,colorSuccessBg:a,colorWarning:u,colorWarningBorder:r,colorWarningBg:g,colorError:$,colorErrorBorder:c,colorErrorBg:d,colorInfo:m,colorInfoBorder:f,colorInfoBg:y}=o;return{[e]:{"&-success":w(a,i,n,o,e),"&-info":w(y,f,m,o,e),"&-warning":w(g,r,u,o,e),"&-error":B(B({},w(d,c,$,o,e)),{[`${e}-description > pre`]:{margin:0,padding:0}})}}},xo=o=>{const{componentCls:e,iconCls:n,motionDurationMid:i,marginXS:a,fontSizeIcon:u,colorIcon:r,colorIconHover:g}=o;return{[e]:{"&-action":{marginInlineStart:a},[`${e}-close-icon`]:{marginInlineStart:a,padding:0,overflow:"hidden",fontSize:u,lineHeight:`${u}px`,backgroundColor:"transparent",border:"none",outline:"none",cursor:"pointer",[`${n}-close`]:{color:r,transition:`color ${i}`,"&:hover":{color:g}}},"&-close-text":{color:r,transition:`color ${i}`,"&:hover":{color:g}}}}},Io=o=>[Co(o),So(o),xo(o)],bo=J("Alert",o=>{const{fontSizeHeading3:e}=o,n=K(o,{alertIconSizeLG:e,alertPaddingHorizontal:12});return[Io(n)]}),_o={success:uo,info:go,error:po,warning:mo},wo={success:fo,info:vo,error:$o,warning:yo},Bo=Y("success","info","warning","error"),To=()=>({type:v.oneOf(Bo),closable:{type:Boolean,default:void 0},closeText:v.any,message:v.any,description:v.any,afterClose:Function,showIcon:{type:Boolean,default:void 0},prefixCls:String,banner:{type:Boolean,default:void 0},icon:v.any,closeIcon:v.any,onClose:Function}),Ho=oo({compatConfig:{MODE:3},name:"AAlert",inheritAttrs:!1,props:To(),setup(o,e){let{slots:n,emit:i,attrs:a,expose:u}=e;const{prefixCls:r,direction:g}=eo("alert",o),[$,c]=bo(r),d=_(!1),m=_(!1),f=_(),y=l=>{l.preventDefault();const p=f.value;p.style.height=`${p.offsetHeight}px`,p.style.height=`${p.offsetHeight}px`,d.value=!0,i("close",l)},C=()=>{var l;d.value=!1,m.value=!0,(l=o.afterClose)===null||l===void 0||l.call(o)},S=no(()=>{const{type:l}=o;return l!==void 0?l:o.banner?"warning":"info"});u({animationEnd:C});const N=_({});return()=>{var l,p,T,H,E,z,A,L,O,F;const{banner:D,closeIcon:W=(l=n.closeIcon)===null||l===void 0?void 0:l.call(n)}=o;let{closable:M,showIcon:h}=o;const P=(p=o.closeText)!==null&&p!==void 0?p:(T=n.closeText)===null||T===void 0?void 0:T.call(n),x=(H=o.description)!==null&&H!==void 0?H:(E=n.description)===null||E===void 0?void 0:E.call(n),G=(z=o.message)!==null&&z!==void 0?z:(A=n.message)===null||A===void 0?void 0:A.call(n),I=(L=o.icon)!==null&&L!==void 0?L:(O=n.icon)===null||O===void 0?void 0:O.call(n),R=(F=n.action)===null||F===void 0?void 0:F.call(n);h=D&&h===void 0?!0:h;const V=(x?wo:_o)[S.value]||null;P&&(M=!0);const t=r.value,k=to(t,{[`${t}-${S.value}`]:!0,[`${t}-closing`]:d.value,[`${t}-with-description`]:!!x,[`${t}-no-icon`]:!h,[`${t}-banner`]:!!D,[`${t}-closable`]:M,[`${t}-rtl`]:g.value==="rtl",[c.value]:!0}),X=M?s("button",{type:"button",onClick:y,class:`${t}-close-icon`,tabindex:0},[P?s("span",{class:`${t}-close-text`},[P]):W===void 0?s(lo,null,null):W]):null,Z=I&&(io(I)?ho(I,{class:`${t}-icon`}):s("span",{class:`${t}-icon`},[I]))||s(V,{class:`${t}-icon`},null),q=ao(`${t}-motion`,{appear:!1,css:!0,onAfterLeave:C,onBeforeLeave:b=>{b.style.maxHeight=`${b.offsetHeight}px`},onLeave:b=>{b.style.maxHeight="0px"}});return $(m.value?null:s(co,q,{default:()=>[so(s("div",j(j({role:"alert"},a),{},{style:[a.style,N.value],class:[a.class,k],"data-show":!d.value,ref:f}),[h?Z:null,s("div",{class:`${t}-content`},[G?s("div",{class:`${t}-message`},[G]):null,x?s("div",{class:`${t}-description`},[x]):null]),R?s("div",{class:`${t}-action`},[R]):null,X]),[[ro,!d.value]])]}))}}}),Ao=U(Ho);export{Ao as _};

import{v as L,p as b,k as K,_ as l,i as x,K as F,bd as D,bb as H,bS as w,bT as B,bB as W,bU as z,bV as G,bW as j,c as u,e as A,d as C,M as Q,q as V,a as M,b as O,P as N,ag as g,U as $,z as Y}from"./index-75645e87.js";let h={};function Z(t,n){}function X(t,n,e){!n&&!h[e]&&(t(!1,e),h[e]=!0)}function q(t,n){X(Z,t,n)}const Ct=(t,n,e)=>{q(t,`[ant-design-vue: ${n}] ${e}`)},s={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,isTextModifyingKeyEvent:function(n){const{keyCode:e}=n;if(n.altKey&&!n.ctrlKey||n.metaKey||e>=s.F1&&e<=s.F12)return!1;switch(e){case s.ALT:case s.CAPS_LOCK:case s.CONTEXT_MENU:case s.CTRL:case s.DOWN:case s.END:case s.ESC:case s.HOME:case s.INSERT:case s.LEFT:case s.MAC_FF_META:case s.META:case s.NUMLOCK:case s.NUM_CENTER:case s.PAGE_DOWN:case s.PAGE_UP:case s.PAUSE:case s.PRINT_SCREEN:case s.RIGHT:case s.SHIFT:case s.UP:case s.WIN_KEY:case s.WIN_KEY_RIGHT:return!1;default:return!0}},isCharacterKey:function(n){if(n>=s.ZERO&&n<=s.NINE||n>=s.NUM_ZERO&&n<=s.NUM_MULTIPLY||n>=s.A&&n<=s.Z||window.navigator.userAgent.indexOf("WebKit")!==-1&&n===0)return!0;switch(n){case s.SPACE:case s.QUESTION_MARK:case s.NUM_PLUS:case s.NUM_MINUS:case s.NUM_PERIOD:case s.NUM_DIVISION:case s.SEMICOLON:case s.DASH:case s.EQUALS:case s.COMMA:case s.PERIOD:case s.SLASH:case s.APOSTROPHE:case s.SINGLE_QUOTE:case s.OPEN_SQUARE_BRACKET:case s.BACKSLASH:case s.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}},_t=s;function J(t){const n=Symbol("contextKey");return{useProvide:(i,o)=>{const c=L({});return b(n,c),K(()=>{l(c,i,o||{})}),c},useInject:()=>x(n,t)||{}}}const k=t=>{const{componentCls:n}=t;return{[n]:{display:"inline-flex","&-block":{display:"flex",width:"100%"},"&-vertical":{flexDirection:"column"}}}},tt=k,et=t=>{const{componentCls:n}=t;return{[n]:{display:"inline-flex","&-rtl":{direction:"rtl"},"&-vertical":{flexDirection:"column"},"&-align":{flexDirection:"column","&-center":{alignItems:"center"},"&-start":{alignItems:"flex-start"},"&-end":{alignItems:"flex-end"},"&-baseline":{alignItems:"baseline"}},[`${n}-space-item`]:{"&:empty":{display:"none"}}}}},nt=F("Space",t=>[et(t),tt(t)]);function st(t,n,e,a){for(var i=t.length,o=e+(a?1:-1);a?o--:++o<i;)if(n(t[o],o,t))return o;return-1}function at(t){return t!==t}function it(t,n,e){for(var a=e-1,i=t.length;++a<i;)if(t[a]===n)return a;return-1}function ct(t,n,e){return n===n?it(t,n,e):st(t,at,e)}function Mt(t,n){var e=t==null?0:t.length;return!!e&&ct(t,n,0)>-1}function Ot(t,n,e){for(var a=-1,i=t==null?0:t.length;++a<i;)if(e(n,t[a]))return!0;return!1}var ot="[object Map]",rt="[object Set]",lt=Object.prototype,ut=lt.hasOwnProperty;function y(t){if(t==null)return!0;if(D(t)&&(H(t)||typeof t=="string"||typeof t.splice=="function"||w(t)||B(t)||W(t)))return!t.length;var n=z(t);if(n==ot||n==rt)return!t.size;if(G(t))return!j(t).length;for(var e in t)if(ut.call(t,e))return!1;return!0}const mt=()=>({compactSize:String,compactDirection:N.oneOf(g("horizontal","vertical")).def("horizontal"),isFirstItem:$(),isLastItem:$()}),m=J(null),$t=(t,n)=>{const e=m.useInject(),a=u(()=>{if(!e||y(e))return"";const{compactDirection:i,isFirstItem:o,isLastItem:c}=e,r=i==="vertical"?"-vertical-":"-";return A({[`${t.value}-compact${r}item`]:!0,[`${t.value}-compact${r}first-item`]:o,[`${t.value}-compact${r}last-item`]:c,[`${t.value}-compact${r}item-rtl`]:n.value==="rtl"})});return{compactSize:u(()=>e==null?void 0:e.compactSize),compactDirection:u(()=>e==null?void 0:e.compactDirection),compactItemClassnames:a}},ht=C({name:"NoCompactStyle",setup(t,n){let{slots:e}=n;return m.useProvide(null),()=>{var a;return(a=e.default)===null||a===void 0?void 0:a.call(e)}}}),Et=()=>({prefixCls:String,size:{type:String},direction:N.oneOf(g("horizontal","vertical")).def("horizontal"),align:N.oneOf(g("start","end","center","baseline")),block:{type:Boolean,default:void 0}}),ft=C({name:"CompactItem",props:mt(),setup(t,n){let{slots:e}=n;return m.useProvide(t),()=>{var a;return(a=e.default)===null||a===void 0?void 0:a.call(e)}}}),pt=C({name:"ASpaceCompact",inheritAttrs:!1,props:Et(),setup(t,n){let{attrs:e,slots:a}=n;const{prefixCls:i,direction:o}=Q("space-compact",t),c=m.useInject(),[r,E]=nt(i),R=u(()=>A(i.value,E.value,{[`${i.value}-rtl`]:o.value==="rtl",[`${i.value}-block`]:t.block,[`${i.value}-vertical`]:t.direction==="vertical"}));return()=>{var f;const p=V(((f=a.default)===null||f===void 0?void 0:f.call(a))||[]);return p.length===0?null:r(M("div",O(O({},e),{},{class:[R.value,e.class]}),[p.map((d,I)=>{var S;const P=d&&d.key||`${i.value}-item-${I}`,_=!c||y(c);return M(ft,{key:P,compactSize:(S=t.size)!==null&&S!==void 0?S:"middle",compactDirection:t.direction,isFirstItem:I===0&&(_||(c==null?void 0:c.isFirstItem)),isLastItem:I===p.length-1&&(_||(c==null?void 0:c.isLastItem))},{default:()=>[d]})})]))}}}),Tt=pt,dt=t=>({[t.componentCls]:{[`${t.antCls}-motion-collapse-legacy`]:{overflow:"hidden","&-active":{transition:`height ${t.motionDurationMid} ${t.motionEaseInOut},
        opacity ${t.motionDurationMid} ${t.motionEaseInOut} !important`}},[`${t.antCls}-motion-collapse`]:{overflow:"hidden",transition:`height ${t.motionDurationMid} ${t.motionEaseInOut},
        opacity ${t.motionDurationMid} ${t.motionEaseInOut} !important`}}}),vt=dt;function It(t,n,e){const{focusElCls:a,focus:i,borderElCls:o}=e,c=o?"> *":"",r=["hover",i?"focus":null,"active"].filter(Boolean).map(E=>`&:${E} ${c}`).join(",");return{[`&-item:not(${n}-last-item)`]:{marginInlineEnd:-t.lineWidth},"&-item":l(l({[r]:{zIndex:2}},a?{[`&${a}`]:{zIndex:2}}:{}),{[`&[disabled] ${c}`]:{zIndex:0}})}}function St(t,n,e){const{borderElCls:a}=e,i=a?`> ${a}`:"";return{[`&-item:not(${n}-first-item):not(${n}-last-item) ${i}`]:{borderRadius:0},[`&-item:not(${n}-last-item)${n}-first-item`]:{[`& ${i}, &${t}-sm ${i}, &${t}-lg ${i}`]:{borderStartEndRadius:0,borderEndEndRadius:0}},[`&-item:not(${n}-first-item)${n}-last-item`]:{[`& ${i}, &${t}-sm ${i}, &${t}-lg ${i}`]:{borderStartStartRadius:0,borderEndStartRadius:0}}}}function At(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{focus:!0};const{componentCls:e}=t,a=`${e}-compact`;return{[a]:l(l({},It(t,a,n)),St(e,a,n))}}function U(t,n){return t.classList?t.classList.contains(n):` ${t.className} `.indexOf(` ${n} `)>-1}function T(t,n){t.classList?t.classList.add(n):U(t,n)||(t.className=`${t.className} ${n}`)}function v(t,n){if(t.classList)t.classList.remove(n);else if(U(t,n)){const e=t.className;t.className=` ${e} `.replace(` ${n} `," ")}}const Nt=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"ant-motion-collapse",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return{name:t,appear:n,css:!0,onBeforeEnter:e=>{e.style.height="0px",e.style.opacity="0",T(e,t)},onEnter:e=>{Y(()=>{e.style.height=`${e.scrollHeight}px`,e.style.opacity="1"})},onAfterEnter:e=>{e&&(v(e,t),e.style.height=null,e.style.opacity=null)},onBeforeLeave:e=>{T(e,t),e.style.height=`${e.offsetHeight}px`,e.style.opacity=null},onLeave:e=>{setTimeout(()=>{e.style.height="0px",e.style.opacity="0"})},onAfterLeave:e=>{e&&(v(e,t),e.style&&(e.style.height=null,e.style.opacity=null))}}},yt=Nt;export{_t as K,ht as N,Tt as _,Ot as a,st as b,Mt as c,Ct as d,vt as e,yt as f,At as g,J as h,nt as i,$t as u,Z as w};

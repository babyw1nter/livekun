import{bQ as h,c as m,_ as d}from"./index-2c669624.js";const v=["xxxl","xxl","xl","lg","md","sm","xs"],p=e=>({xs:`(max-width: ${e.screenXSMax}px)`,sm:`(min-width: ${e.screenSM}px)`,md:`(min-width: ${e.screenMD}px)`,lg:`(min-width: ${e.screenLG}px)`,xl:`(min-width: ${e.screenXL}px)`,xxl:`(min-width: ${e.screenXXL}px)`,xxxl:`{min-width: ${e.screenXXXL}px}`});function b(){const[,e]=h();return m(()=>{const i=p(e.value),t=new Map;let a=-1,n={};return{matchHandlers:{},dispatch(s){return n=s,t.forEach(c=>c(n)),t.size>=1},subscribe(s){return t.size||this.register(),a+=1,t.set(a,s),s(n),a},unsubscribe(s){t.delete(s),t.size||this.unregister()},unregister(){Object.keys(i).forEach(s=>{const c=i[s],r=this.matchHandlers[c];r==null||r.mql.removeListener(r==null?void 0:r.listener)}),t.clear()},register(){Object.keys(i).forEach(s=>{const c=i[s],r=l=>{let{matches:x}=l;this.dispatch(d(d({},n),{[s]:x}))},o=window.matchMedia(c);o.addListener(r),this.matchHandlers[c]={mql:o,listener:r},r(o)})},responsiveMap:i}})}const w=(e,i)=>{const t=e.__vccOpts||e;for(const[a,n]of i)t[a]=n;return t};export{w as _,v as r,b as u};
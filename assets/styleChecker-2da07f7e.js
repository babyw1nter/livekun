import{B as d}from"./index-75645e87.js";const i=()=>d()&&window.document.documentElement,c=e=>{if(d()&&window.document.documentElement){const t=Array.isArray(e)?e:[e],{documentElement:n}=window.document;return t.some(r=>r in n.style)}return!1},u=(e,t)=>{if(!c(e))return!1;const n=document.createElement("div"),r=n.style[e];return n.style[e]=t,n.style[e]!==r};function s(e,t){return!Array.isArray(e)&&t!==void 0?u(e,t):c(e)}let o;const p=()=>{if(!i())return!1;if(o!==void 0)return o;const e=document.createElement("div");return e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e),o=e.scrollHeight===1,document.body.removeChild(e),o};export{i as c,p as d,s as i};

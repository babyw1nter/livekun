import{bS as S,bT as P,bU as u,bC as f,bV as b,bW as m,bX as C,bY as w,bZ as E,b_ as x,bp as N}from"./index-SR252RJJ.js";var $="[object Symbol]";function l(n){return typeof n=="symbol"||S(n)&&P(n)==$}function A(n,r){for(var t=-1,i=n==null?0:n.length,e=Array(i);++t<i;)e[t]=r(n[t],t,n);return e}var F=1/0,c=u?u.prototype:void 0,g=c?c.toString:void 0;function d(n){if(typeof n=="string")return n;if(f(n))return A(n,d)+"";if(l(n))return g?g.call(n):"";var r=n+"";return r=="0"&&1/n==-F?"-0":r}var M=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,O=/^\w*$/;function R(n,r){if(f(n))return!1;var t=typeof n;return t=="number"||t=="symbol"||t=="boolean"||n==null||l(n)?!0:O.test(n)||!M.test(n)||r!=null&&n in Object(r)}var _="Expected a function";function h(n,r){if(typeof n!="function"||r!=null&&typeof r!="function")throw new TypeError(_);var t=function(){var i=arguments,e=r?r.apply(this,i):i[0],s=t.cache;if(s.has(e))return s.get(e);var a=n.apply(this,i);return t.cache=s.set(e,a)||s,a};return t.cache=new(h.Cache||b),t}h.Cache=b;var z=500;function X(n){var r=h(n,function(i){return t.size===z&&t.clear(),i}),t=r.cache;return r}var Y=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Z=/\\(\\)?/g,G=X(function(n){var r=[];return n.charCodeAt(0)===46&&r.push(""),n.replace(Y,function(t,i,e,s){r.push(e?s.replace(Z,"$1"):i||t)}),r});const K=G;function L(n){return n==null?"":d(n)}function y(n,r){return f(n)?n:R(n,r)?[n]:K(L(n))}var U=1/0;function I(n){if(typeof n=="string"||l(n))return n;var r=n+"";return r=="0"&&1/n==-U?"-0":r}function q(n,r){r=y(r,n);for(var t=0,i=r.length;n!=null&&t<i;)n=n[I(r[t++])];return t&&t==i?n:void 0}var p=u?u.isConcatSpreadable:void 0;function k(n){return f(n)||m(n)||!!(p&&n&&n[p])}function T(n,r,t,i,e){var s=-1,a=n.length;for(t||(t=k),e||(e=[]);++s<a;){var o=n[s];r>0&&t(o)?r>1?T(o,r-1,t,i,e):C(e,o):i||(e[e.length]=o)}return e}function D(n){var r=n==null?0:n.length;return r?T(n,1):[]}function B(n){return w(E(n,void 0,D),n+"")}function H(n,r){return n!=null&&r in Object(n)}function V(n,r,t){r=y(r,n);for(var i=-1,e=r.length,s=!1;++i<e;){var a=I(r[i]);if(!(s=n!=null&&t(n,a)))break;n=n[a]}return s||++i!=e?s:(e=n==null?0:n.length,!!e&&x(e)&&N(a,e)&&(f(n)||m(n)))}function J(n,r){return n!=null&&V(n,r,H)}export{R as a,q as b,y as c,A as d,B as f,J as h,l as i,I as t};

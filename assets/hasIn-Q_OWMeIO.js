import{c1 as S,c2 as P,c3 as u,bx as f,c4 as p,c5 as d,c6 as w,c7 as x,c8 as C,c9 as E,bS as N}from"./index-igQZxn8-.js";var $="[object Symbol]";function c(n){return typeof n=="symbol"||S(n)&&P(n)==$}function A(n,r){for(var t=-1,i=n==null?0:n.length,e=Array(i);++t<i;)e[t]=r(n[t],t,n);return e}var F=1/0,h=u?u.prototype:void 0,g=h?h.toString:void 0;function y(n){if(typeof n=="string")return n;if(f(n))return A(n,y)+"";if(c(n))return g?g.call(n):"";var r=n+"";return r=="0"&&1/n==-F?"-0":r}var M=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,O=/^\w*$/;function R(n,r){if(f(n))return!1;var t=typeof n;return t=="number"||t=="symbol"||t=="boolean"||n==null||c(n)?!0:O.test(n)||!M.test(n)||r!=null&&n in Object(r)}var z="Expected a function";function l(n,r){if(typeof n!="function"||r!=null&&typeof r!="function")throw new TypeError(z);var t=function(){var i=arguments,e=r?r.apply(this,i):i[0],s=t.cache;if(s.has(e))return s.get(e);var a=n.apply(this,i);return t.cache=s.set(e,a)||s,a};return t.cache=new(l.Cache||p),t}l.Cache=p;var _=500;function G(n){var r=l(n,function(i){return t.size===_&&t.clear(),i}),t=r.cache;return r}var K=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,L=/\\(\\)?/g,X=G(function(n){var r=[];return n.charCodeAt(0)===46&&r.push(""),n.replace(K,function(t,i,e,s){r.push(e?s.replace(L,"$1"):i||t)}),r});const Y=X;function Z(n){return n==null?"":y(n)}function I(n,r){return f(n)?n:R(n,r)?[n]:Y(Z(n))}var k=1/0;function b(n){if(typeof n=="string"||c(n))return n;var r=n+"";return r=="0"&&1/n==-k?"-0":r}function J(n,r){r=I(r,n);for(var t=0,i=r.length;n!=null&&t<i;)n=n[b(r[t++])];return t&&t==i?n:void 0}var m=u?u.isConcatSpreadable:void 0;function D(n){return f(n)||d(n)||!!(m&&n&&n[m])}function T(n,r,t,i,e){var s=-1,a=n.length;for(t||(t=D),e||(e=[]);++s<a;){var o=n[s];r>0&&t(o)?r>1?T(o,r-1,t,i,e):w(e,o):i||(e[e.length]=o)}return e}function H(n){var r=n==null?0:n.length;return r?T(n,1):[]}function Q(n){return x(C(n,void 0,H),n+"")}function U(n,r){return n!=null&&r in Object(n)}function q(n,r,t){r=I(r,n);for(var i=-1,e=r.length,s=!1;++i<e;){var a=b(r[i]);if(!(s=n!=null&&t(n,a)))break;n=n[a]}return s||++i!=e?s:(e=n==null?0:n.length,!!e&&E(e)&&N(a,e)&&(f(n)||d(n)))}function V(n,r){return n!=null&&q(n,r,U)}export{R as a,J as b,A as c,I as d,Q as f,V as h,c as i,b as t};

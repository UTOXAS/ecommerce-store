(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{5463:(e,a,t)=>{Promise.resolve().then(t.t.bind(t,4917,23)),Promise.resolve().then(t.t.bind(t,5455,23)),Promise.resolve().then(t.bind(t,4608)),Promise.resolve().then(t.t.bind(t,347,23))},4608:(e,a,t)=>{"use strict";t.d(a,{default:()=>d});var s=t(5155),n=t(8173),r=t.n(n),l=t(5565),i=t(2115),c=t(1892);let d=()=>{let[e,a]=(0,i.useState)(0);return(0,i.useEffect)(()=>{t.e(28).then(t.t.bind(t,28,23)),a((0,c.cr)());let e=()=>a((0,c.cr)());return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[]),(0,s.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark",children:(0,s.jsxs)("div",{className:"container",children:[(0,s.jsxs)(r(),{href:"/",className:"navbar-brand fw-bold",children:[(0,s.jsx)(l.default,{id:"header-logo",src:"".concat("/ecommerce-store","/assets/images/logo.png"),alt:"Ecommerce Website Logo",className:"img-fluid me-4 d-inline-block align-text-top",width:30,height:30}),"Storefront"]}),(0,s.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav",children:(0,s.jsx)("span",{className:"navbar-toggler-icon"})}),(0,s.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:(0,s.jsxs)("ul",{className:"navbar-nav ms-auto",children:[(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(r(),{href:"/",className:"nav-link",children:"Home"})}),(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsxs)(r(),{href:"/cart",className:"nav-link",children:["Cart ",e>0&&(0,s.jsx)("span",{className:"badge bg-light text-dark ms-1",children:e})]})})]})})]})})}},1892:(e,a,t)=>{"use strict";t.d(a,{Xl:()=>s,bE:()=>n,cr:()=>l,dt:()=>r});let s=()=>{let e=localStorage.getItem("cart");return e?JSON.parse(e):[]},n=function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=s(),n=t.findIndex(a=>a.productId===e);n>-1?t[n].quantity+=a:t.push({productId:e,quantity:a}),localStorage.setItem("cart",JSON.stringify(t)),window.dispatchEvent(new Event("storage"))},r=e=>{let a=s().filter(a=>a.productId!==e);localStorage.setItem("cart",JSON.stringify(a)),window.dispatchEvent(new Event("storage"))},l=()=>s().reduce((e,a)=>e+a.quantity,0)},347:()=>{}},e=>{var a=a=>e(e.s=a);e.O(0,[815,740,690,555,441,517,358],()=>a(5463)),_N_E=e.O()}]);
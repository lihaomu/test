(function(e){function t(t){for(var r,u,a=t[0],s=t[1],c=t[2],f=0,p=[];f<a.length;f++)u=a[f],i[u]&&p.push(i[u][0]),i[u]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==i[s]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},i={app:0},o=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var l=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Time",{attrs:{time:e.time}}),n("a",{attrs:{target:"_blank",href:"http://wpa.qq.com/msgrd?v=3&uin=2719901709&site=qq&menu=yes"}},[e._v("\n    QQ客服\n  ")])],1)},o=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[e._v(e._s(e.date))])},a=[],s=(n("6b54"),n("7618")),c=(n("c5f6"),function(e){return e<10?"0"+e:e}),l=function(e){return(new Date).toDateString()===e.toDateString()},f=function(e){return(new Date).getFullYear()===e.getFullYear()},p=function(e){var t=Date.now()-e;if(t<12e4)return"1分钟前";if(t<36e5)return~~(t/6e4)+"分钟前";var n=new Date(e),r=n.getFullYear(),i=c(n.getMonth()+1),o=c(n.getDate()),u=c(n.getHours()),a=c(n.getMinutes());return l(n)?"今天 "+u+":"+a:f(n)?i+"/"+o+" "+u+":"+a:r+"/"+i+"/"+o+" "+u+":"+a},m=function(e){return p(e)},d={name:"Time",props:{time:{type:[Number,Date,String],required:!0}},data:function(){return{date:"",timer:null}},computed:{},methods:{setTime:function(){var e,t=Object(s["a"])(this.time);if(console.log(t),"number"===t){var n=this.time.toString().length>10?this.time:1e3*this.time;e=new Date(n).getTime()}else"object"===t?e=this.time.getTime():"string"===t&&(e=new Date(this.time).getTime());this.date=m(e)}},mounted:function(){this.setTime(),this.timer=setInterval(this.setTime,1e3)},beforeDestroy:function(){this.timer&&clearInterval(this.timer)}},h=d,g=n("2877"),v=Object(g["a"])(h,u,a,!1,null,null,null),b=v.exports,w=b,y={components:{Time:w},data:function(){return{time:new Date("2019/3/27 15:47:38")}}},_=y,j=Object(g["a"])(_,i,o,!1,null,null,null),D=j.exports,O=n("8c4f");r["a"].use(O["a"]);var T=new O["a"]({mode:"history",base:"",routes:[]}),S=n("2f62");r["a"].use(S["a"]);var x=new S["a"].Store({state:{},mutations:{},actions:{}}),M=n("8eca");n("6643");r["a"].use(M["a"]),r["a"].config.productionTip=!1,new r["a"]({router:T,store:x,render:function(e){return e(D)}}).$mount("#app")}});
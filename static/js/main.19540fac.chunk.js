(window["webpackJsonpreddit-diagram"]=window["webpackJsonpreddit-diagram"]||[]).push([[0],{10:function(e,t,a){e.exports={app:"App_app__1kX79",attribution:"App_attribution__1Q091"}},26:function(e,t,a){e.exports={tooltip:"Tooltip_tooltip__2efxb"}},29:function(e,t,a){e.exports=a(52)},5:function(e,t,a){e.exports={storyline:"StoryLine_storyline__3sU0T",column:"StoryLine_column__38MPb",tick:"StoryLine_tick__2rO5J",year:"StoryLine_year__1d-fD"}},51:function(e,t,a){},52:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(21),l=a.n(o),c=a(22),i=a(4),s=a(23),m=a.n(s),u=a(11),p=a(24),d=a(25),f=a.n(d),h=a(27),v=a(7),b=a(28),y=a(54),g=a(55),O=a(26),E=a.n(O),_=function(e){var t=e.top,a=e.title,n=e.score,o=e.comments,l=e.url;return r.a.createElement("div",{className:E.a.tooltip,style:{top:t}},r.a.createElement("h4",null,a),r.a.createElement("p",null,r.a.createElement("span",{role:"img","aria-label":"post score"},"\u2b06\ufe0f")," ",n),r.a.createElement("p",null,r.a.createElement("span",{role:"img","aria-label":"comments"},"\ud83d\udcac\ufe0f")," ",o),r.a.createElement("a",{href:"https://www.reddit.com/r/ForeverAloneDating/comments/"+l,target:"_blank",rel:"noopener noreferrer"},"Open the post"))},w=a(9),j=a.n(w);var S=function(e){var t,a,n=e.isSelected,o=e.top,l=e.fontSize,c=e.post,i=e.onSelect;return r.a.createElement("div",{className:"".concat(j.a.post," ").concat(n?j.a.selected:""),style:{top:o,fontSize:l},onClick:i},(t=c.age,a=c.fromGender,t<20&&"m"===a?"\ud83d\udc66":t<20&&"f"===a?"\ud83d\udc67":t<40&&"m"===a?"\ud83d\udc68":t<40&&"f"===a?"\ud83d\udc69":t<60&&"m"===a?"\ud83d\udc68\u200d\ud83e\uddb3":t<60&&"f"===a?"\ud83d\udc69\u200d\ud83e\uddb3":"f"===a?"\ud83d\udc75":"m"===a?"\ud83d\udc74":"\ud83d\udc7d"))},k=/\d\d/,x=/([M,F,f,m])4([M,F,f,m])/;function P(e){return e.fromGender&&e.toGender&&e.age}function C(e){var t=k.exec(e.h)||[null],a=Object(i.a)(t,1)[0],n=x.exec(e.h)||[null,null,null],r=Object(i.a)(n,3),o=r[1],l=r[2];return{createdUtc:new Date(1e3*e.t),age:a&&parseInt(a)>=14&&parseInt(a)<150?parseInt(a):void 0,score:e.s,url:e.u,fromGender:o?o.toLowerCase():void 0,toGender:l?l.toLowerCase():void 0,title:e.h,comments:e.c}}var G=a(5),I=a.n(G);function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var D=[0,500],z=Object(b.a)().domain([0,100]).range([18,60]),A=Array(55).fill(0).map(function(e,t){return"./data/data".concat(t,".json")}),F=[],L=r.a.memo(function(e){var t=e.style,a=e.date,n=e.posts,o=e.selectedUrl,l=e.setSelectedUrl,c=e.verticalScale;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:I.a.column,style:t},r.a.createElement("div",{className:I.a.tick},r.a.createElement("div",{className:I.a.year},Object(v.a)(a,"y")),r.a.createElement("div",null,Object(v.a)(a,"MMM")),r.a.createElement("div",null,Object(v.a)(a,"dd"))),n.map(function(e){var t=c(e.score),a=e.url===o;return r.a.createElement(r.a.Fragment,null,r.a.createElement(S,{key:e.url,isSelected:a,top:t,fontSize:z(e.comments),post:e,onSelect:function(t){return l(e.url)}}),a&&r.a.createElement(_,Object.assign({top:t},e)))})))},u.b),M=function(){var e=r.a.useRef(null),t=f()(e),a=r.a.useState(""),n=Object(i.a)(a,2),o=n[0],l=n[1],s=r.a.useState([]),d=Object(i.a)(s,2),v=d[0],b=d[1],O=r.a.useCallback(function(){var e=A.shift();return e?m.a.get(e).then(function(e){Array.prototype.push.apply(F,e.data.map(C).filter(P));var t=Array.from(Object(g.a)(F,function(e){return Object(h.a)(e.createdUtc).valueOf()}));b(t)}):Promise.resolve()},[]),E=Object(y.a)().exponent(.7).domain(D).range([54,t?t.height:600]),_=function(e){return 0===A.length||e<v.length},w=A.length>0?v.length+1:v.length;return r.a.createElement("div",{className:I.a.storyline,ref:e},t.height&&r.a.createElement(p.a,{isItemLoaded:_,itemCount:w,loadMoreItems:O},function(e){var a=e.onItemsRendered,n=e.ref;return r.a.createElement(u.a,{height:t.height,width:t.width,itemCount:w,itemData:v,itemSize:40,layout:"horizontal",onItemsRendered:a,ref:n},function(e){var t=e.index,a=e.style,n=e.data[t]||[],s=Object(i.a)(n,2),m=s[0],u=s[1],p=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(a,!0).forEach(function(t){Object(c.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},a,{left:a.left+20});return _(t)?r.a.createElement(L,{style:p,date:m,posts:u,selectedUrl:o,setSelectedUrl:l,verticalScale:E}):r.a.createElement("div",{className:I.a.column,style:p},'"..."')})}))},U=a(10),B=a.n(U);var R=function(){return r.a.createElement("main",{className:B.a.app},r.a.createElement(M,null),r.a.createElement("p",{className:B.a.attribution},"Built by ",r.a.createElement("a",{href:"https://pyzhianov.github.io/"},"Alex")," / Get the full"," ",r.a.createElement("a",{href:"https://drive.google.com/open?id=1GHJROCkmbGTE6K9WfCQ8z636aGuTcqIB",target:"_blank",rel:"noopener noreferrer"},"dataset")," "))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(51);l.a.render(r.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports={post:"Face_post__28TVh",selected:"Face_selected__3RvCB"}}},[[29,1,2]]]);
//# sourceMappingURL=main.19540fac.chunk.js.map
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{19:function(e,t,a){"use strict";(function(e){a.d(t,"a",(function(){return h}));var n=a(2),c=a.n(n),r=a(6),s=a(4),i=a(0),l=a(1),d=(a(30),a(31),a(7)),o=a.n(d),u=a(20),j=a(5),b=a.n(j);function h(){var t=Object(l.useState)([]),a=Object(s.a)(t,2),n=a[0],d=a[1],j=Object(l.useState)(null),h=Object(s.a)(j,2),f=h[0],p=h[1],v=Object(l.useState)(),O=Object(s.a)(v,2),m=O[0],x=O[1],g=Object(l.useState)(null),N=Object(s.a)(g,2),T=N[0],C=N[1],S=Object(l.useState)(null),H=Object(s.a)(S,2),w=H[0],y=H[1],L=Object(l.useState)("DXB"),R=Object(s.a)(L,2),U=R[0],D=R[1],M=Object(l.useState)(),Y=Object(s.a)(M,2),A=Y[0],B=Y[1],F=Object(l.useState)(!0),k=Object(s.a)(F,2),E=k[0],_=k[1],z=Object(l.useState)("LHR"),I=Object(s.a)(z,2),G=I[0],J=I[1],P=Object(l.useState)("DXB"),X=Object(s.a)(P,2),q=X[0],K=X[1],Q=Object(l.useState)([]),V=Object(s.a)(Q,2),W=V[0],Z=V[1],$=function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("".concat(e.BASE_URL,"/api/flights/busiest-airport"));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),ee=function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("".concat(e.BASE_URL,"/api/flights/busiest-day/").concat(G.toUpperCase()));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),te=function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("".concat(e.BASE_URL,"/api/flights/percentage-of-flights/").concat(q.toUpperCase()));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),ae=function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("".concat(e.BASE_URL,"/api/flights/proportion-business-class/").concat(G.toUpperCase(),"/").concat(q.toUpperCase()));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),ne=function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("".concat(e.BASE_URL,"/api/flights/average-journey-time/").concat(G.toUpperCase(),"/").concat(q.toUpperCase()));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),ce=function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("".concat(e.BASE_URL,"/api/flights/travel-time/").concat(G.toUpperCase(),"/").concat(q.toUpperCase()));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),re=function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("".concat(e.BASE_URL,"/api/flights/iata"));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),se=function(){d([]),p(null),x(),C(null),y(null),B(),_(!0),ce().then((function(e){d(e.data),ne().then((function(e){p(e.data.averagetime),ee().then((function(e){x(e.data),ae().then((function(e){e.data.percentage%1!==0?C(e.data.percentage.toFixed(2)):null!==e.data.percentage&&C(e.data.percentage.toFixed(0)),te().then((function(e){e.data.percentagetotalflights%1!==0?y(e.data.percentagetotalflights.toFixed(2)):y(e.data.percentagetotalflights.toFixed(0)),D(e.data.destair),$().then((function(e){B(e.data),_(!1)}))}))}))}))}))}))};return Object(l.useEffect)((function(){re().then((function(e){Z(e.data),se()}))}),[]),Object(i.jsx)("div",{className:"App",children:Object(i.jsxs)("header",{className:"App-header",children:[Object(i.jsxs)("div",{className:"form",children:[Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{children:"From"}),Object(i.jsx)("select",{className:"form-control",value:G,onChange:function(e){return J(e.target.value)},children:W?W.map((function(e){return Object(i.jsx)("option",{value:e,children:e},e)})):null})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{children:"To"}),Object(i.jsx)("select",{className:"custom-select",value:q,onChange:function(e){return K(e.target.value)},children:W?W.map((function(e){return Object(i.jsx)("option",{value:e,children:e},e)})):null})]})]}),Object(i.jsx)("button",{className:"btn btn-lg",disabled:E,onClick:se,children:E?"LOADING":"FIND FLIGHTS"}),null!==f&&n.length?Object(i.jsxs)("h4",{children:["1. Average journey time from ",n[0].depair," to"," ",n[0].destair," is"," ",b.a.utc(b.a.duration(f,"minutes").asMilliseconds()).format("HH:mm")]}):Object(i.jsx)("h4",{children:"1. Loading..."}),m&&n.length?Object(i.jsxs)("h4",{children:["2. ",m.date," has the most departures from"," ",m.depair,Object(i.jsxs)("b",{style:{fontSize:"1.3em"},children:[" - ",m.count]})]}):Object(i.jsx)("h4",{children:"2. Loading..."}),null!==T&&n.length?Object(i.jsxs)("h4",{children:["3. ",Object(i.jsxs)("b",{style:{fontSize:"1.3em"},children:[T,"%"]})," of flights in this search are business class"]}):Object(i.jsx)("h4",{children:"3. Loading..."}),null!==w?Object(i.jsxs)("h4",{children:["4. From a total set of flights"," ",Object(i.jsxs)("b",{style:{fontSize:"1.3em"},children:[w,"%"]})," flies to"," ",U]}):Object(i.jsx)("h4",{children:"4. Loading..."}),A?Object(i.jsxs)("h4",{children:["5. Busiest airport from a total set is"," ",Object(i.jsx)("b",{style:{fontSize:"1.3em"},children:A.depair})," with a total of"," ",Object(i.jsx)("b",{style:{fontSize:"1.3em"},children:A.count})," ","flights"]}):Object(i.jsx)("h4",{children:"5. Loading..."}),n.length>0?Object(i.jsx)(u.a,{data:n}):Object(i.jsx)("h3",{children:"Sorry, nothing was found for this search. :("})]})})}}).call(this,a(9))},20:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(0),c=(a(1),a(49),a(5)),r=a.n(c);function s(e){return Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"divTable",children:[Object(n.jsx)("div",{className:"divTableHeading",children:Object(n.jsxs)("div",{className:"divTableRow",children:[Object(n.jsx)("div",{className:"divTableHead",children:"Carrier"}),Object(n.jsx)("div",{className:"divTableHead",children:"DepartureAir"}),Object(n.jsx)("div",{className:"divTableHead",children:"Destination"}),Object(n.jsx)("div",{className:"divTableHead",children:"Depart date/time"}),Object(n.jsx)("div",{className:"divTableHead",children:"Arrival date/time"}),Object(n.jsx)("div",{className:"divTableHead",children:"Flight duration"}),Object(n.jsx)("div",{className:"divTableHead",children:"Out flight class"}),Object(n.jsx)("div",{className:"divTableHead",children:"ReturnAir"}),Object(n.jsx)("div",{className:"divTableHead",children:"Rtrn depart date/time"}),Object(n.jsx)("div",{className:"divTableHead",children:"Rtrn arrival date/time"}),Object(n.jsx)("div",{className:"divTableHead",children:"Rtrn flight duration"}),Object(n.jsx)("div",{className:"divTableHead",children:"Rtrn flight class"})]})}),Object(n.jsx)("div",{className:"divTableBody",children:e.data?e.data.map((function(e){var t=r.a.duration(e.outjourneytime,"minutes"),a=Math.floor(t.asHours()),c=a+":"+(Math.floor(t.asMinutes())-60*a),s=r.a.duration(e.injourneytime,"minutes"),i=Math.floor(s.asHours()),l=i+":"+(Math.floor(s.asMinutes())-60*i);return Object(n.jsxs)("div",{className:"divTableRow",children:[Object(n.jsx)("div",{className:"divTableCell",children:e.carrier}),Object(n.jsx)("div",{className:"divTableCell",children:e.depair}),Object(n.jsx)("div",{className:"divTableCell",children:e.destair}),Object(n.jsx)("div",{className:"divTableCell",children:r()(e.outdepartutc).format("HH:mm:ss DD/MM/YYYY")}),Object(n.jsx)("div",{className:"divTableCell",children:r()(e.outarrivaltime.concat(" ".concat(e.outarrivaldate))).format("HH:mm:ss DD/MM/YYYY")}),Object(n.jsx)("div",{className:"divTableCell",children:c}),Object(n.jsx)("div",{className:"divTableCell",children:e.outflightclass}),e.indepartcode?Object(n.jsx)("div",{className:"divTableCell",children:e.indepartcode}):Object(n.jsx)("div",{className:"divTableCell",children:"Return Unavailable"}),e.indepartcode?Object(n.jsx)("div",{className:"divTableCell",children:r()(e.indeparttime.concat(" ".concat(e.indepartdate))).format("HH:mm:ss DD/MM/YYYY")}):null,e.indepartcode?Object(n.jsxs)("div",{className:"divTableCell",children:[" ",r()(e.inarrivaltime.concat(" ".concat(e.inarrivaldate))).format("HH:mm:ss DD/MM/YYYY")]}):null,e.indepartcode?Object(n.jsx)("div",{className:"divTableCell",children:l}):null,e.indepartcode?Object(n.jsx)("div",{className:"divTableCell",children:e.inflightclass}):null]},e.id)})):Object(n.jsx)("div",{className:"divTableCell",children:"Sorry, nothing was found for this search."})})]}),Object(n.jsx)("p",{children:"\xa0"})]})}},21:function(e,t,a){"use strict";t.a=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,52)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))}},22:function(e,t,a){"use strict";a.r(t),function(e){var t=a(0),n=a(1),c=a.n(n),r=a(18),s=a.n(r),i=(a(28),a(19)),l=a(21);a(51);e.BASE_URL="http://localhost:5001",s.a.render(Object(t.jsx)(c.a.StrictMode,{children:Object(t.jsx)(i.a,{})}),document.getElementById("root")),Object(l.a)()}.call(this,a(9))},28:function(e,t,a){},30:function(e,t,a){"use strict";a.p},31:function(e,t,a){},49:function(e,t,a){}},[[22,1,2]]]);
//# sourceMappingURL=main.26fac152.chunk.js.map
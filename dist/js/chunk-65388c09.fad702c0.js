(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65388c09"],{"02f4":function(e,t,n){var r=n("4588"),a=n("be13");e.exports=function(e){return function(t,n){var i,o,c=String(a(t)),s=r(n),u=c.length;return s<0||s>=u?e?"":void 0:(i=c.charCodeAt(s),i<55296||i>56319||s+1===u||(o=c.charCodeAt(s+1))<56320||o>57343?e?c.charAt(s):i:e?c.slice(s,s+2):o-56320+(i-55296<<10)+65536)}}},"0390":function(e,t,n){"use strict";var r=n("02f4")(!0);e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},"214f":function(e,t,n){"use strict";n("b0c5");var r=n("2aba"),a=n("32e9"),i=n("79e5"),o=n("be13"),c=n("2b4c"),s=n("520a"),u=c("species"),l=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),f=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();e.exports=function(e,t,n){var d=c(e),p=!i(function(){var t={};return t[d]=function(){return 7},7!=""[e](t)}),v=p?!i(function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[u]=function(){return n}),n[d](""),!t}):void 0;if(!p||!v||"replace"===e&&!l||"split"===e&&!f){var g=/./[d],h=n(o,d,""[e],function(e,t,n,r,a){return t.exec===s?p&&!a?{done:!0,value:g.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),b=h[0],m=h[1];r(String.prototype,e,b),a(RegExp.prototype,d,2==t?function(e,t){return m.call(e,this,t)}:function(e){return m.call(e,this)})}}},"268f":function(e,t,n){e.exports=n("2a04")},"28a5":function(e,t,n){"use strict";var r=n("aae3"),a=n("cb7c"),i=n("ebd6"),o=n("0390"),c=n("9def"),s=n("5f1b"),u=n("520a"),l=Math.min,f=[].push,d="split",p="length",v="lastIndex",g=!!function(){try{return new RegExp("x","y")}catch(e){}}();n("214f")("split",2,function(e,t,n,h){var b;return b="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[p]||2!="ab"[d](/(?:ab)*/)[p]||4!="."[d](/(.?)(.?)/)[p]||"."[d](/()()/)[p]>1||""[d](/.?/)[p]?function(e,t){var a=String(this);if(void 0===e&&0===t)return[];if(!r(e))return n.call(a,e,t);var i,o,c,s=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),d=0,g=void 0===t?4294967295:t>>>0,h=new RegExp(e.source,l+"g");while(i=u.call(h,a)){if(o=h[v],o>d&&(s.push(a.slice(d,i.index)),i[p]>1&&i.index<a[p]&&f.apply(s,i.slice(1)),c=i[0][p],d=o,s[p]>=g))break;h[v]===i.index&&h[v]++}return d===a[p]?!c&&h.test("")||s.push(""):s.push(a.slice(d)),s[p]>g?s.slice(0,g):s}:"0"[d](void 0,0)[p]?function(e,t){return void 0===e&&0===t?[]:n.call(this,e,t)}:n,[function(n,r){var a=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a,r):b.call(String(a),n,r)},function(e,t){var r=h(b,e,this,t,b!==n);if(r.done)return r.value;var u=a(e),f=String(this),d=i(u,RegExp),p=u.unicode,v=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),m=new d(g?u:"^(?:"+u.source+")",v),x=void 0===t?4294967295:t>>>0;if(0===x)return[];if(0===f.length)return null===s(m,f)?[f]:[];var y=0,j=0,w=[];while(j<f.length){m.lastIndex=g?j:0;var k,O=s(m,g?f:f.slice(j));if(null===O||(k=l(c(m.lastIndex+(g?0:j)),f.length))===y)j=o(f,j,p);else{if(w.push(f.slice(y,j)),w.length===x)return w;for(var _=1;_<=O.length-1;_++)if(w.push(O[_]),w.length===x)return w;j=y=k}}return w.push(f.slice(y)),w}]})},"2a04":function(e,t,n){n("4938");var r=n("a7d3").Object;e.exports=function(e,t){return r.getOwnPropertyDescriptor(e,t)}},4938:function(e,t,n){var r=n("6a9b"),a=n("626e").f;n("c165")("getOwnPropertyDescriptor",function(){return function(e,t){return a(r(e),t)}})},5176:function(e,t,n){e.exports=n("81ee")},"520a":function(e,t,n){"use strict";var r=n("0bfb"),a=RegExp.prototype.exec,i=String.prototype.replace,o=a,c="lastIndex",s=function(){var e=/a/,t=/b*/g;return a.call(e,"a"),a.call(t,"a"),0!==e[c]||0!==t[c]}(),u=void 0!==/()??/.exec("")[1],l=s||u;l&&(o=function(e){var t,n,o,l,f=this;return u&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),s&&(t=f[c]),o=a.call(f,e),s&&o&&(f[c]=f.global?o.index+o[0].length:t),u&&o&&o.length>1&&i.call(o[0],n,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(o[l]=void 0)}),o}),e.exports=o},5698:function(e,t,n){n("d256"),e.exports=n("a7d3").Object.getOwnPropertySymbols},"5f1b":function(e,t,n){"use strict";var r=n("23c6"),a=RegExp.prototype.exec;e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"81ee":function(e,t,n){n("9a51"),e.exports=n("a7d3").Object.assign},"9a51":function(e,t,n){var r=n("d13f");r(r.S+r.F,"Object",{assign:n("9e44")})},"9e44":function(e,t,n){"use strict";var r=n("7633"),a=n("31c2"),i=n("d74e"),o=n("0185"),c=n("8bab"),s=Object.assign;e.exports=!s||n("d782")(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e}),7!=s({},e)[n]||Object.keys(s({},t)).join("")!=r})?function(e,t){var n=o(e),s=arguments.length,u=1,l=a.f,f=i.f;while(s>u){var d,p=c(arguments[u++]),v=l?r(p).concat(l(p)):r(p),g=v.length,h=0;while(g>h)f.call(p,d=v[h++])&&(n[d]=p[d])}return n}:s},a4bb:function(e,t,n){e.exports=n("fda6")},aae3:function(e,t,n){var r=n("d3f4"),a=n("2d95"),i=n("2b4c")("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==a(e))}},b0c5:function(e,t,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},b1f9:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("v-toolbar",{attrs:{flat:""}},[n("v-toolbar-title",[e._v("Projects list")]),n("v-spacer"),n("v-btn",{attrs:{fab:"",dark:"",small:"",color:"primary",title:"Create New Project"},on:{click:e.onShowDialogToCreate}},[n("v-icon",{attrs:{dark:""}},[e._v("add")])],1)],1),e._.isEmpty(e.projects)?n("v-container",{attrs:{flud:""}},[n("v-flex",{staticClass:"text-xs-center"},[n("span",{staticStyle:{cursor:"pointer"},on:{click:e.onShowDialogToCreate}},[n("v-btn",{attrs:{fab:"",small:"",outline:"",color:"primary",title:"Create New Project"},on:{click:e.onShowDialogToCreate}},[n("v-icon",{attrs:{dark:""}},[e._v("add")])],1),e._v("\n      Create you new project\n      ")],1)])],1):e._e(),n("v-container",[n("v-list",{attrs:{"two-line":""}},[e._l(e.projectList,function(t,r){return[n("v-list-tile",{key:t.id,attrs:{avatar:"",ripple:""},on:{click:function(n){return e.openProject(t)}}},[n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.name))]),n("v-list-tile-sub-title",[e._v(e._s(t.description))])],1),n("v-list-tile-content",{staticStyle:{"flex-direction":"row","align-items":"center"}},e._l(e.showLanguagesWithFlag(t.languages),function(t,r){return n("v-chip",{key:r},[n("flag",{attrs:{iso:t.flagCode}}),e._v("\n               \n              "+e._s(t.title)+" ("+e._s(t.key)+")\n            ")],1)}),1),n("v-list-tile-action",[n("v-btn",{attrs:{icon:""},on:{click:function(n){return e.onDelete(n,t)}}},[n("v-icon",[e._v("delete")])],1)],1)],1),r+1<e.projectList.length?n("v-divider",{key:r}):e._e()]})],2)],1),n("debug",[e._v(e._s(e.projectWithOutData))]),n("v-dialog",{attrs:{"max-width":"700"},on:{keydown:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"]))return null;e.dialogForm=!1}},model:{value:e.dialogForm,callback:function(t){e.dialogForm=t},expression:"dialogForm"}},[n("v-card",[n("v-form",{on:{submit:e.onSave}},[n("v-card-title",[n("span",{staticClass:"headline"},[e._v(" Create Projects")])]),n("v-card-text",[n("v-container",{attrs:{"grid-list-md":""}},[n("v-layout",{attrs:{wrap:""}},[n("v-flex",{attrs:{xs6:""}},[n("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:5",expression:"'required|min:5'"}],attrs:{label:"Project Name *",hint:"unique name","data-vv-name":"name","error-messages":e.errors.collect("name")},model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),n("v-flex",{attrs:{xs6:""}},[n("v-combobox",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{items:e.languageListKeys,label:"Select a languages for project",multiple:"","data-vv-name":"languages","error-messages":e.errors.collect("languages")},model:{value:e.model.languages,callback:function(t){e.$set(e.model,"languages",t)},expression:"model.languages"}})],1),n("v-flex",{attrs:{xs12:""}},[n("v-textarea",{model:{value:e.model.description,callback:function(t){e.$set(e.model,"description",t)},expression:"model.description"}})],1)],1)],1)],1),n("v-divider"),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{flat:""},on:{click:function(t){e.dialogForm=!1}}},[e._v("Cancel\n          ")]),n("v-btn",{attrs:{type:"submit",color:"primary",flat:""}},[e._v("\n            Save\n          ")])],1)],1)],1)],1)],1)},a=[],i=(n("6b54"),n("06db"),n("7f7f"),n("96cf"),n("3b8d")),o=n("bd86"),c=n("cebc"),s=n("5176"),u=n.n(s),l=n("fef5"),f=n("2ef0"),d={mixins:[l["a"]],data:function(){return{dialogForm:!1,model:{},projects:{}}},mounted:function(){var e=this;this.$gun.get("projects").map().on(function(t,n){e.projects=t?u()({},e.projects,Object(o["a"])({},n,Object(c["a"])({},t))):u()({},e.projects,Object(o["a"])({},n,null))}),this.$initLanguages()},beforeDestroy:function(){this.$gun.get("projects").off()},computed:{projectWithOutData:function(){return f["map"](this.projects,function(e){var t=Object(c["a"])({},e);return delete t.data,t})},projectList:function(){var e=[];return f["forEach"](this.projects,function(t,n){t&&e.push(Object(c["a"])({id:n},t))}),e}},methods:{openProject:function(e){this.$router.push("/projects/"+e.id)},onShowDialogToCreate:function(){this.dialogForm=!0,this.model={}},onSave:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var n,r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.$validator.validateAll();case 3:if(e.t0=e.sent,!1!==e.t0){e.next=6;break}return e.abrupt("return");case 6:return e.prev=6,e.next=9,this.$gun.get("projects").get(this.model.name).val();case 9:if(!e.sent){e.next=11;break}throw"Project with this name already exist!";case 11:n=this.$gun.get(this.model.name),n.put(Object(c["a"])({},this.model,{languages:f["join"](f["filter"](this.model.languages,function(e){return!!r.languages[e]}),","),data:{}})),this.$gun.get("projects").set(n),this.dialogForm=!1,e.next=20;break;case 17:e.prev=17,e.t1=e["catch"](6),this.$notify({text:e.t1.toString(),type:"error"});case 20:case"end":return e.stop()}},e,this,[[6,17]])}));function t(t){return e.apply(this,arguments)}return t}(),onDelete:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t,n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.stopPropagation(),console.log(n.id),e.next=4,this.$confirm("Are you really want remove this Project?",{title:"! Danger !",color:"red"});case 4:if(!e.sent){e.next=7;break}return e.next=7,this.$gun.get("projects").unset(n.id);case 7:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()}},p=d,v=n("2877"),g=n("6544"),h=n.n(g),b=n("8336"),m=n("b0af"),x=n("99d9"),y=n("12b2"),j=n("cc20"),w=n("2b5d"),k=n("a523"),O=n("169a"),_=n("ce7e"),C=n("0e8f"),V=n("4bd4"),S=n("132d"),E=n("a722"),T=n("8860"),$=n("ba95"),R=n("40fe"),L=n("5d23"),D=n("9910"),F=n("2677"),P=n("a844"),A=n("71d9"),q=n("2a7f"),I=Object(v["a"])(p,r,a,!1,null,null,null);t["default"]=I.exports;h()(I,{VBtn:b["a"],VCard:m["a"],VCardActions:x["b"],VCardText:x["d"],VCardTitle:y["a"],VChip:j["a"],VCombobox:w["a"],VContainer:k["a"],VDialog:O["a"],VDivider:_["a"],VFlex:C["a"],VForm:V["a"],VIcon:S["a"],VLayout:E["a"],VList:T["a"],VListTile:$["a"],VListTileAction:R["a"],VListTileContent:L["g"],VListTileSubTitle:L["h"],VListTileTitle:L["i"],VSpacer:D["e"],VTextField:F["a"],VTextarea:P["a"],VToolbar:A["a"],VToolbarTitle:q["d"]})},c165:function(e,t,n){var r=n("d13f"),a=n("a7d3"),i=n("d782");e.exports=function(e,t){var n=(a.Object||{})[e]||Object[e],o={};o[e]=t(n),r(r.S+r.F*i(function(){n(1)}),"Object",o)}},cebc:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("268f"),a=n.n(r),i=n("e265"),o=n.n(i),c=n("a4bb"),s=n.n(c),u=n("bd86");function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=s()(n);"function"===typeof o.a&&(r=r.concat(o()(n).filter(function(e){return a()(n,e).enumerable}))),r.forEach(function(t){Object(u["a"])(e,t,n[t])})}return e}},e265:function(e,t,n){e.exports=n("5698")},f3e0:function(e,t,n){var r=n("0185"),a=n("7633");n("c165")("keys",function(){return function(e){return a(r(e))}})},fda6:function(e,t,n){n("f3e0"),e.exports=n("a7d3").Object.keys},fef5:function(e,t,n){"use strict";n("28a5");var r=n("bd86"),a=n("5176"),i=n.n(a),o=(n("96cf"),n("3b8d"));n("ac6a"),n("06db");t["a"]={data:function(){return{languages:[]}},computed:{languageListKeys:function(){return _.keys(this.languages)}},created:function(){this.$initLanguages()},methods:{$initLanguages:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$gun.get("languages").map().once(function(e,n){e&&(t.languages=i()({},t.languages,Object(r["a"])({},n,e)))});case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),showLanguagesWithFlag:function(e){return"string"===typeof e&&(e=_.split(e,",")),_.filter(this.languages,function(t){return e&&e.indexOf(t.key)>-1})}}}}}]);
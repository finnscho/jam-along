(function(e){function t(t){for(var r,i,l=t[0],c=t[1],s=t[2],u=0,v=[];u<l.length;u++)i=l[u],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&v.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(v.length)v.shift()();return n.push.apply(n,s||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,l=1;l<a.length;l++){var c=a[l];0!==o[c]&&(r=!1)}r&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var r={},o={app:0},n=[];function i(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=r,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var d=c;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("cd49")},"034f":function(e,t,a){"use strict";var r=a("8a23"),o=a.n(r);o.a},1:function(e,t){},1922:function(e,t,a){"use strict";var r=a("9ca9"),o=a.n(r);o.a},"2f91":function(e,t,a){},7525:function(e,t,a){"use strict";var r=a("2f91"),o=a.n(r);o.a},"8a23":function(e,t,a){},"9ca9":function(e,t,a){},ba99:function(e,t,a){},cc4b:function(e,t,a){"use strict";var r=a("ba99"),o=a.n(r);o.a},cd49:function(e,t,a){"use strict";a.r(t);a("4de4"),a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("div",{staticStyle:{},attrs:{id:"app"}},[a("v-card",[a("VideoRecorderGrid"),a("div",{attrs:{height:"50%"}},[a("DetailPanel")],1)],1)],1)])},n=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticStyle:{},attrs:{fluid:""}},[a("v-layout",[a("v-app-bar",{staticStyle:{"vertical-align":"bottom"},attrs:{fixed:"",dense:""}},[a("v-btn",{on:{click:e.addPlayer,mouseover:e.mouseoverAddBtn,mouseleave:e.mouseleaveAddBtn}},[a("v-icon",{attrs:{color:"orange"}},[e._v("mdi-camera-plus")])],1),a("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:function(t){return e.handleFileUpload()}}}),a("v-btn",{on:{click:function(t){return e.$refs.file.click()}}},[a("v-icon",{attrs:{color:"orange"}},[e._v("mdi-movie-open")])],1),a("v-btn",{on:{click:e.record}},[a("v-icon",{attrs:{color:e.recording?"red":"orange"}},[e._v("mdi-record")])],1),a("v-btn",{on:{click:e.click}},[a("v-icon",{attrs:{color:"orange"}},[e._v("mdi-play")])],1),a("v-btn",{on:{click:e.pause}},[a("v-icon",{attrs:{color:"orange"}},[e._v("mdi-pause")])],1),a("v-btn",{staticStyle:{"margin-left":"10vw"},on:{click:e.save}},[0==e.downloading?a("v-icon",{attrs:{color:"orange"}},[e._v("mdi-download")]):e._e(),1==e.downloading?a("v-progress-circular",{attrs:{width:3,color:"orange",indeterminate:""}}):e._e()],1),a("v-btn",{on:{click:e.removePlayer}},[a("v-icon",{attrs:{color:"orange"}},[e._v("mdi-delete")])],1)],1),a("v-card",{staticStyle:{"margin-top":"8vh"},attrs:{id:"myCard"}},[a("v-row",{attrs:{id:"VideoRow"}},[e._l(this.$store.state.children,(function(t){return a("v-col",{key:t.id,attrs:{md:{getColMd:e.getColMd}}},[a("div",{style:{width:e.videoWidth},attrs:{id:"addFile",centered:""},on:{drop:function(t){return t.preventDefault(),e.addFile(t)},dragover:function(e){e.preventDefault()}}},[a("video-js-recorder",{attrs:{id:t.id,src:t.src}})],1)])})),a("v-col",{attrs:{cols:"1",md:"6"}},[a("div",{attrs:{id:"blib"},on:{drop:function(t){return t.preventDefault(),e.addFile(t)},dragover:function(e){e.preventDefault()}}},[a("video",{staticStyle:{display:"none"},attrs:{playsinline:"",controls:"",muted:"",preload:"auto",id:"output"},domProps:{muted:!0}})])])],2)],1)],1)],1)},l=[],c=(a("4160"),a("d3b7"),a("3ca3"),a("159b"),a("ddb0"),a("2b3d"),a("2909")),s=a("d4ec"),d=a("bee2"),u=a("262e"),v=a("2caf"),f=a("9ab4"),h=a("60a3"),p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{on:{click:e.activate,touchstart:e.activate}},[a("div",{attrs:{id:"videoJs"},on:{drop:function(t){return t.preventDefault(),e.addFile(t)},dragover:function(e){e.preventDefault()}}},[a("video",{staticClass:"video-js vjs-layout-large",style:e.isActive()?"border: dashed;":"",attrs:{id:e.id,playsinline:"",controls:"",preload:"auto"}},[null!=e.src?a("source",{attrs:{src:e.src,type:"video/mp4"}}):e._e()])])])},y=[],b=(a("99af"),a("25f0"),a("6b7b")),g=a("257e"),m=(a("ade3"),a("63ae")),w=(a("f890"),a("9c0b"),a("c9d5"),a("494e"),a("b9b7")),j=a.n(w),k=(a("fda2"),a("d52a"),a("d093"),a("a9ee"),a("f0e2")),O=(a("3966"),a("b2c5"),a("a434"),a("2f62"));r["a"].use(O["a"]);var C,P,S,V,_,A,x,D,R,E,T=function e(t,a){Object(s["a"])(this,e),this.id=t,this.src=a},F=new O["a"].Store({state:{children:Array(),players:Array(),activePlayer:N},mutations:{addPlayer:function(e,t){e.players.push(t)},activePlayer:function(e,t){e.activePlayer=t},addChildren:function(e,t){e.children.push(t)},removeChildren:function(e,t){for(var a=0;a<e.children.length;a++)e.children[a].id===t&&e.children.splice(a,1);for(var r=0;r<e.players.length;r++)e.players[r].id===t&&e.players.splice(r,1)}}}),M=(C=Object(h["a"])(),P=Object(h["b"])(),S=Object(h["b"])(),V=Object(h["b"])(),C((E=function(e){Object(u["a"])(a,e);var t=Object(v["a"])(a);function a(){var e;Object(s["a"])(this,a);for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return e=t.call.apply(t,[this].concat(o)),Object(b["a"])(Object(g["a"])(e),"id",x,Object(g["a"])(e)),Object(b["a"])(Object(g["a"])(e),"active",D,Object(g["a"])(e)),Object(b["a"])(Object(g["a"])(e),"src",R,Object(g["a"])(e)),e}return Object(d["a"])(a,[{key:"data",value:function(){return{min:0,max:3e3,slider:0,player:""}}},{key:"isActive",value:function(){return F.state.activePlayer==this}},{key:"created",value:function(){this.$root.$refs.A=this}},{key:"mounted",value:function(){var e=this,t={controls:!1,autoplay:!1,fluid:!0,responsive:!0,loop:!1,width:1920,height:1080,controlBar:{volumePanel:!0,seeking:!0},plugins:{record:null==this.src?{audio:!0,maxLength:500,debug:!0,video:{width:1920,height:1080}}:{},wavesurfer:{barHeight:100,debug:!0,waveColor:"orange",progressColor:"orangered",cursorColor:"yellow",container:".waveform",hideScrollbar:!0}}};this.player=Object(k["default"])("#"+this.id,t,(function(){var e="Using video.js "+k["default"].VERSION+" with videojs-wavesurfer "+k["default"].getPluginVersion("wavesurfer")+" and wavesurfer.js "+j.a.VERSION;k["default"].log(e)})),this.player.width=1920,this.player.height=1080;/Mobi/i.test(window.navigator.userAgent);if(F.commit("addPlayer",this),null!==this.src)this.player.src=this.src;else try{this.player.record().getDevice()}catch(a){alert("fehler")}F.commit("activePlayer",this),this.player.on("deviceReady",(function(){console.log("device is ready!")})),this.player.on("startRecord",(function(){var t=(new Date).getTime();console.log("time x : "+t.toString()),F.state.players.forEach((function(e){console.log("play"),e.player.play()}));var a=(new Date).getTime();console.log("time y : "+a.toString()),e.slider=a-t,console.log("offset: "+e.slider.toString())})),this.player.on("finishRecord",(function(){var t=/Mobi/i.test(window.navigator.userAgent);t||e.player.wavesurfer().load(e.player.recordedData),console.log("finished recording: ",e.player.recordedData)})),this.player.on("error",(function(e,t){console.warn(t)})),this.player.on("deviceError",(function(){console.error("device error:",e.player.deviceErrorCode)}))}},{key:"addFile",value:function(e){var t=this,a=e.dataTransfer.files;a&&Object(c["a"])(a).forEach((function(e){var a=new FileReader;a.onload=t.loadData,a.addEventListener("load",(function(){var e=document.querySelector("video");e.src=a.result;var t=document.createElement("style");t.type="text/css",t.setAttributeNode(document.createAttribute("scopped")),t.appendChild(document.createTextNode(".vjs-record .vjs-device-button.vjs-control{display:none}")),this.$el.appendChild(t)}),!1),a.readAsDataURL(e),t.files.push(e)}))}},{key:"loadData",value:function(e){null!==e&&null!==e.target&&(this.src=e.target.result)}},{key:"removeFile",value:function(e){this.files=this.files.filter((function(t){return t!=e}))}},{key:"style",value:function(){return alert(""),F.state.activePlayer==this?"border: dashed;":""}},{key:"activate",value:function(){F.commit("activePlayer",this)}},{key:"beforeDestroy",value:function(){this.player&&this.player.dispose()}}]),a}(r["a"]),A=E,x=Object(m["a"])(A.prototype,"id",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),D=Object(m["a"])(A.prototype,"active",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),R=Object(m["a"])(A.prototype,"src",[V],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),_=A))||_);M.player=void 0;var B=M,L=(a("cc4b"),a("2877")),U=a("6544"),$=a.n(U),J=a("a523"),I=Object(L["a"])(B,p,y,!1,null,null,null),N=I.exports;$()(I,{VContainer:J["a"]});var z=a("53ca"),G=a("a366"),q=a.n(G),W=function(){function e(){Object(s["a"])(this,e)}return Object(d["a"])(e,[{key:"mergeVideos",value:function(e){var t=new q.a;t.setOutputSize(1920,1080);var a=0,r=e.length>2?0:t.height/4,o=0;e.forEach((function(e){var n;switch(n=null!=e.src?document.getElementById(e.id+"_html5_api"):e.player.record().mediaElement,t.addMediaElement("webm",n,{x:a,y:r,width:t.width/2,height:t.height/2}),o++,o){case 1:a=t.width/2;break;case 2:a=0,r=t.height/2;break;case 3:a=t.width/2,r=t.height/2;break;default:break}})),t.start();var n=document.querySelector("#output");if(null!==n){var i=n;i.srcObject=t.result,i.autoplay=!0}return t}},{key:"deepCopy",value:function(e){var t;if(null==e||"object"!=Object(z["a"])(e))return e;if(e instanceof Date)return t=new Date,t.setTime(e.getTime()),t;if(e instanceof Array){t=[];for(var a=0,r=e.length;a<r;a++)t[a]=this.deepCopy(e[a]);return t}if(e instanceof Object){for(var o in t={},e)e.hasOwnProperty(o)&&(t[o]=this.deepCopy(e[o]));return t}throw alert("Unable to copy obj! Its type isn't supported.")}}]),e}(),H=a("21a6"),K=function e(t,a){Object(s["a"])(this,e),this.offset=a,this.videourl=t},Q=function(){function e(){Object(s["a"])(this,e)}return Object(d["a"])(e,[{key:"saveState",value:function(){var e=new Array;F.state.players.forEach((function(t){var a=F.state.activePlayer.slider,r=t;r.id!=F.state.activePlayer.id&&(a=r.slider);var o=new K("./assets/video1.webm",a);e.push(o)}));var t=new Blob([JSON.stringify(e)],{type:"application/json;"}),a="jam-along-".concat((new Date).getTime(),".json");Object(H["saveAs"])(t,a)}},{key:"loadState",value:function(e){var t=new FileReader;t.onload=function(e){var t=JSON.parse(e.target.result);F.state.players=[],F.state.children=[],t.forEach((function(e){e.videourl}))},t.readAsText(e)}}]),e}(),X=function(e){Object(u["a"])(a,e);var t=Object(v["a"])(a);function a(e){var r;Object(s["a"])(this,a),r=t.call(this,e),r.hover=!1,r.downloading=!1,r.file="",r.recording=!1,r.mediaRecorder=null,r.service=new W;var o=/Mobi/i.test(window.navigator.userAgent);return o&&alert("Jam-Along might not work with mobile devices. Please use Google Chrome on a Desktop PC"),sessionStorage.clear(),r.files=[],r.data=[],r.recordedChunks=[],r}return Object(d["a"])(a,[{key:"handleFileUpload",value:function(){var e=this.$refs.file.files[0],t=new FileReader;t.onload=this.loadData,t.readAsDataURL(e),this.files.push(e)}},{key:"addFile",value:function(e){var t=this,a=e.dataTransfer.files;a&&Object(c["a"])(a).forEach((function(e){var a=new FileReader;a.onload=t.loadData,a.readAsDataURL(e),t.files.push(e)}))}},{key:"loadData",value:function(e){if(null!==e&&null!==e.target){this.data.push(e.target.result);var t="JALvideojs"+Date.now();F.commit("addChildren",new T(t,e.target.result))}}},{key:"removeFile",value:function(e){this.files=this.files.filter((function(t){return t!=e}))}},{key:"mouseoverAddBtn",value:function(){this.hover=!0}},{key:"mouseleaveAddBtn",value:function(){this.hover=!1}},{key:"refreshMergedStream",value:function(){console.log("Try to refresh merged Stream:");var e=[];F.state.players.forEach((function(t){e.push(t),void 0!==t.player.record()&&(console.log("save"))})),this.merger=this.service.mergeVideos(e);var t=this.merger.result;console.log(t);var a={mimeType:"video/webm; codecs=vp9"};this.mediaRecorder=new MediaRecorder(t,a),F.state.players.forEach((function(e){document.getElementById(e.id)}))}},{key:"addPlayer",value:function(){F.commit("addChildren",new T("JALvideojs"+Date.now(),null)),this.mediaRecorder=null}},{key:"removePlayer",value:function(){F.commit("removeChildren",F.state.activePlayer.id)}},{key:"record",value:function(){var e=this;if(null!=this.mediaRecorder){var t,a;if(1!=this.recording)this.mediaRecorder.ondataavailable=this.handleDataAvailable,null===(t=this.mediaRecorder)||void 0===t||t.start(),this.recording=!0,this.click();else null===(a=this.mediaRecorder)||void 0===a||a.stop(),this.recording=!1,this.merger.destroy()}else{var r,o,n;if(void 0!=this.service.player)r=this.service.player.record();else r=null===F||void 0===F||null===(o=F.state)||void 0===o||null===(n=o.activePlayer)||void 0===n?void 0:n.player.record();r.isRecording()?(r.stop(),this.recording=!1):(r.start(),this.recording=!0)}this.recording&&F.state.players.forEach((function(t){t.player.on("ended",(function(){e.recording&&e.record()}))}))}},{key:"onFileChange",value:function(e){alert();var t=e.target.files||e.dataTransfer.files;t.length&&(Q.prototype.loadState(t[0]),F.state.players.forEach((function(e){F.commit("addChildren",new T("JALvideojs"+Date.now(),null))})))}},{key:"click",value:function(){F.state.players.forEach((function(e){console.log("play");var t=/Mobi/i.test(window.navigator.userAgent);t?(e.player.wavesurfer().play(),e.player.wavesurfer().surfer.setVolume(0)):e.player.play()}))}},{key:"pause",value:function(){F.state.players.forEach((function(e){console.log("pause"),e.player.pause()}))}},{key:"stop",value:function(){F.state.players.forEach((function(e){console.log("stop"),e.player.stop()}))}},{key:"saveProject",value:function(){Q.prototype.saveState()}},{key:"save",value:function(){console.log("todoSave"),this.downloading=!0;try{this.refreshMergedStream(),this.record()}catch(e){alert(e.message)}finally{this.downloading=!1}}},{key:"handleDataAvailable",value:function(e){console.log("data-available"),e.data.size>0&&(this.recordedChunks.push(e.data),console.log(this.recordedChunks),this.download(),this.downloading=!1)}},{key:"download",value:function(){var e=new Blob(this.recordedChunks,{type:"video/webm"}),t=URL.createObjectURL(e),a=document.createElement("a");document.body.appendChild(a),a.href=t,a.download="test.webm",a.click(),window.URL.revokeObjectURL(t)}},{key:"videoWidth",get:function(){switch(F.state.children.length){case 1:return"100vw";case 2:return"48vw";case 3:case 4:case 5:case 6:return"32vw";default:return"15vw"}}},{key:"getColMd",get:function(){return 6}}]),a}(r["a"]);X=Object(f["a"])([Object(h["a"])({components:{"video-js-recorder":N}})],X);var Y=X,Z=Y,ee=(a("7525"),a("40dc")),te=a("8336"),ae=a("b0af"),re=a("62ad"),oe=a("132d"),ne=a("a722"),ie=a("490a"),le=a("0fd9"),ce=Object(L["a"])(Z,i,l,!1,null,null,null),se=ce.exports;$()(ce,{VAppBar:ee["a"],VBtn:te["a"],VCard:ae["a"],VCol:re["a"],VContainer:J["a"],VIcon:oe["a"],VLayout:ne["a"],VProgressCircular:ie["a"],VRow:le["a"]});var de=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-app-bar",{attrs:{fixed:"",bottom:!0,height:"auto",extended:!1,"extension-height":"auto"}},[a("v-card",{attrs:{width:"100%"}},[a("v-row",{attrs:{"align-start":""}},[a("v-col",{attrs:{cols:"12"}},[a("div",{staticClass:"waveform",attrs:{height:"30%"}})])],1),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-tabs",{attrs:{color:"orange",centered:!0}},[a("v-tab",{attrs:{href:"#tab-up"}},[a("v-icon",[e._v("mdi-chevron-down")])],1),a("v-tab",{attrs:{href:"#tab-sync"}},[a("v-icon",{attrs:{hint:"Timing..."}},[e._v("mdi-metronome")])],1),a("v-tab",{attrs:{href:"#tab-audio"}},[a("v-icon",{attrs:{hint:"Audio..."}},[e._v("mdi-microphone")])],1),a("v-tab",{attrs:{href:"#tab-filter"}},[a("v-icon",{attrs:{hint:"Camera..."}},[e._v("mdi-camera")])],1),a("v-tab-item",{attrs:{color:"orange",value:"tab-sync",height:"300px"}},[a("v-card",{attrs:{flat:"",tile:""}},[a("v-row",[a("v-col",{attrs:{cols:"1"}}),a("v-col",{attrs:{cols:"10"}},[a("v-btn",{attrs:{margin:"auto"},on:{click:e.setOffset}},[a("v-icon",{attrs:{color:"orange"}},[e._v("mdi-check")])],1),a("v-card-text",[a("label",[e._v("Offset")]),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-slider",{staticClass:"align-center",staticStyle:{"margin-bottom":"2%"},attrs:{max:"3000"},scopedSlots:e._u([{key:"append",fn:function(){return[a("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"60px"},attrs:{"thumb-label":"","hide-details":"","single-line":"",type:"number"},model:{value:e.slider,callback:function(t){e.slider=t},expression:"slider"}})]},proxy:!0}]),model:{value:e.slider,callback:function(t){e.slider=t},expression:"slider"}})],1)],1)],1)],1),a("v-col",{attrs:{cols:"1"}})],1)],1)],1),a("v-tab-item",{attrs:{color:"orange",value:"tab-filter",height:"300px"}})],1)],1)],1)],1)],1)],1)},ue=[],ve=function(e){Object(u["a"])(a,e);var t=Object(v["a"])(a);function a(e){var r;return Object(s["a"])(this,a),r=t.call(this,e),r.slider=F.state.activePlayer.player.slider,r}return Object(d["a"])(a,[{key:"setOffset",value:function(){console.log("offset: "+this.slider/1e3),F.state.activePlayer.slider=this.slider/1e3,F.state.activePlayer.player.offset({start:this.slider/1e3})}}]),a}(r["a"]);ve=Object(f["a"])([Object(h["a"])({components:{"video-js-recorder":N}})],ve);var fe=ve,he=fe,pe=(a("1922"),a("99d9")),ye=a("ba0d"),be=a("71a3"),ge=a("c671"),me=a("fe57"),we=a("8654"),je=Object(L["a"])(he,de,ue,!1,null,null,null),ke=je.exports;$()(je,{VAppBar:ee["a"],VBtn:te["a"],VCard:ae["a"],VCardText:pe["a"],VCol:re["a"],VContainer:J["a"],VIcon:oe["a"],VRow:le["a"],VSlider:ye["a"],VTab:be["a"],VTabItem:ge["a"],VTabs:me["a"],VTextField:we["a"]});var Oe={name:"app",components:{VideoRecorderGrid:se,DetailPanel:ke}},Ce=Oe,Pe=(a("034f"),a("7496")),Se=Object(L["a"])(Ce,o,n,!1,null,null,null),Ve=Se.exports;$()(Se,{VApp:Pe["a"],VCard:ae["a"]});var _e=a("f309");r["a"].use(_e["a"]);var Ae=new _e["a"]({theme:{dark:!0}});r["a"].config.productionTip=!1,r["a"].filter("kb",(function(e){return Math.floor(e/1024)})),new r["a"]({store:F,vuetify:Ae,render:function(e){return e(Ve)}}).$mount("#app")}});
//# sourceMappingURL=app.6b265e8f.js.map
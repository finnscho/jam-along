(function(e){function t(t){for(var a,i,l=t[0],c=t[1],s=t[2],u=0,v=[];u<l.length;u++)i=l[u],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&v.push(o[i][0]),o[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(v.length)v.shift()();return n.push.apply(n,s||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],a=!0,l=1;l<r.length;l++){var c=r[l];0!==o[c]&&(a=!1)}a&&(n.splice(t--,1),e=i(i.s=r[0]))}return e}var a={},o={app:0},n=[];function i(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=a,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(r,a,function(t){return e[t]}.bind(null,a));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var d=c;n.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},"034f":function(e,t,r){"use strict";var a=r("8a23"),o=r.n(a);o.a},1:function(e,t){},"2f91":function(e,t,r){},7525:function(e,t,r){"use strict";var a=r("2f91"),o=r.n(a);o.a},"8a23":function(e,t,r){},ba99:function(e,t,r){},cc4b:function(e,t,r){"use strict";var a=r("ba99"),o=r.n(a);o.a},cd49:function(e,t,r){"use strict";r.r(t);r("4de4"),r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("div",{attrs:{id:"app"}},[r("v-card",[r("VideoRecorderGrid")],1)],1)])},n=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{staticStyle:{},attrs:{fluid:""}},[r("v-layout",[r("v-app-bar",{staticStyle:{"vertical-align":"bottom"},attrs:{fixed:"",dense:""}},[r("v-btn",{on:{click:e.record}},[r("v-icon",{attrs:{color:e.recording?"red":"orange"}},[e._v("mdi-record")])],1),r("v-btn",{on:{click:e.click}},[r("v-icon",{attrs:{color:"orange"}},[e._v("mdi-play")])],1),r("v-btn",{on:{click:e.pause}},[r("v-icon",{attrs:{color:"orange"}},[e._v("mdi-pause")])],1),r("v-btn",{on:{click:e.stop}},[r("v-icon",{attrs:{color:"orange"}},[e._v("mdi-stop")])],1),r("v-btn",{staticStyle:{"margin-left":"50px"},on:{click:e.save}},[0==e.downloading?r("v-icon",{attrs:{color:"orange"}},[e._v("mdi-download")]):e._e(),1==e.downloading?r("v-progress-circular",{attrs:{width:3,color:"orange",indeterminate:""}}):e._e()],1),r("v-btn",{on:{click:e.addPlayer,mouseover:e.mouseoverAddBtn,mouseleave:e.mouseleaveAddBtn}},[r("v-icon",{attrs:{color:"orange"}},[e._v("mdi-view-grid-plus-outline")])],1),r("v-card-text",[r("label",[e._v("offset")]),r("v-row",[r("v-col",{staticClass:"pr-4"},[r("v-slider",{staticClass:"align-center",staticStyle:{"margin-bottom":"2%"},attrs:{max:"3000"},scopedSlots:e._u([{key:"append",fn:function(){return[r("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"60px"},attrs:{"thumb-label":"","hide-details":"","single-line":"",type:"number"},model:{value:e.slider,callback:function(t){e.slider=t},expression:"slider"}})]},proxy:!0}]),model:{value:e.slider,callback:function(t){e.slider=t},expression:"slider"}})],1)],1)],1),r("v-btn",{attrs:{margin:"auto"},on:{click:e.setOffset}},[r("v-icon",{attrs:{color:"orange"}},[e._v("mdi-pokeball")])],1)],1),r("v-card",{staticClass:"maincard",staticStyle:{padding:"2%"},attrs:{width:"100%",height:"50%"}},[r("v-row",[r("v-col",[r("v-row",{staticStyle:{"padding-top":"5%","padding-left":"10%"}},[e._l(e.children,(function(t){return r("v-col",{key:t,attrs:{"height:200px":"","padding-top":"10%",cols:"6",md:"5"}},[r("div",{attrs:{id:"app"},on:{drop:function(t){return t.preventDefault(),e.addFile(t)},dragover:function(e){e.preventDefault()}}},[r("video-js-recorder",{attrs:{id:t}})],1)])})),r("v-col",{attrs:{"height:200px":"",cols:"6",md:"5"}},[r("div",{attrs:{id:"app"},on:{drop:function(t){return t.preventDefault(),e.addFile(t)},dragover:function(e){e.preventDefault()}}},[r("video",{staticStyle:{display:"none"},attrs:{playsinline:"",controls:"",muted:"",preload:"auto",id:"output"},domProps:{muted:!0}})])]),r("v-col",[e.hover?r("div",[r("div",{staticStyle:{width:"560px",height:"420px","border-style":"dashed","border-color":"orange"},attrs:{padding:"10%"}},[r("v-icon",{attrs:{color:"orange"}},[e._v("mdi-music-box-multiple")])],1)]):e._e()])],2)],1)],1)],1)],1)],1)},l=[],c=(r("4160"),r("d3b7"),r("3ca3"),r("159b"),r("ddb0"),r("2b3d"),r("2909")),s=r("d4ec"),d=r("bee2"),u=r("262e"),v=r("2caf"),f=r("9ab4"),p=r("60a3"),h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{on:{click:e.activate}},[r("div",{attrs:{id:"app"},on:{drop:function(t){return t.preventDefault(),e.addFile(t)},dragover:function(e){e.preventDefault()}}},[r("video",{staticClass:"video-js vjs-layout-large",style:e.isActive()?"border: dashed;":"",attrs:{id:e.id,playsinline:"",controls:"",preload:"auto"}})])])},y=[],b=(r("99af"),r("25f0"),r("6b7b")),g=r("257e"),m=(r("ade3"),r("63ae")),w=(r("f890"),r("fda2"),r("d52a"),r("d093"),r("a9ee")),k=r.n(w),j=r("f0e2"),O=(r("3966"),r("b2c5"),r("2f62"));a["a"].use(O["a"]);var x,S,_,P,R,C,D,V,E=new O["a"].Store({state:{videos:Array(),players:Array(),activePlayer:j["default"]},mutations:{addVideo:function(e,t){e.videos.push(t)},addPlayer:function(e,t){e.players.push(t)},activePlayer:function(e,t){e.activePlayer=t}}}),A=(x=Object(p["a"])(),S=Object(p["b"])(),_=Object(p["b"])(),x((V=function(e){Object(u["a"])(r,e);var t=Object(v["a"])(r);function r(){var e;Object(s["a"])(this,r);for(var a=arguments.length,o=new Array(a),n=0;n<a;n++)o[n]=arguments[n];return e=t.call.apply(t,[this].concat(o)),Object(b["a"])(Object(g["a"])(e),"id",C,Object(g["a"])(e)),Object(b["a"])(Object(g["a"])(e),"active",D,Object(g["a"])(e)),e}return Object(d["a"])(r,[{key:"data",value:function(){return{src:{},min:0,max:3e3,slider:0,player:"",options:{controls:!1,autoplay:!1,fluid:!0,responsive:!0,loop:!1,width:1920,height:1080,controlBar:{volumePanel:!0,seeking:!0},plugins:{record:{audio:!0,maxLength:500,debug:!0,video:{width:1920,height:1080}}}}}}},{key:"isActive",value:function(){return E.state.activePlayer==this.player}},{key:"created",value:function(){this.$root.$refs.A=this}},{key:"mounted",value:function(){var e=this;this.player=Object(j["default"])("#"+this.id,this.options,(function(){var e="Using video.js "+j["default"].VERSION+" with videojs-record "+j["default"].getPluginVersion("record")+" and recordrtc "+k.a.version;j["default"].log(e)})),this.player.width=1920,this.player.height=1080,E.commit("addPlayer",this);try{this.player.record().getDevice()}catch(t){alert("fehler")}this.player.on("deviceReady",(function(){console.log("device is ready!")})),this.player.on("startRecord",(function(){var t=(new Date).getTime();console.log("time x : "+t.toString()),E.state.players.forEach((function(e){console.log("play"),e.player.play()}));var r=(new Date).getTime();console.log("time y : "+r.toString()),e.slider=r-t,console.log("offset: "+e.slider.toString())})),this.player.on("finishRecord",(function(){console.log("finished recording: ",e.player.recordedData),E.commit("addVideo",e.player.recordedData)})),this.player.on("error",(function(e,t){console.warn(t)})),this.player.on("deviceError",(function(){console.error("device error:",e.player.deviceErrorCode)}))}},{key:"addFile",value:function(e){var t=this,r=e.dataTransfer.files;r&&Object(c["a"])(r).forEach((function(e){var r=new FileReader;r.onload=t.loadData,r.addEventListener("load",(function(){var e=document.querySelector("video");e.src=r.result;var t=document.createElement("style");t.type="text/css",t.setAttributeNode(document.createAttribute("scopped")),t.appendChild(document.createTextNode(".vjs-record .vjs-device-button.vjs-control{display:none}")),this.$el.appendChild(t)}),!1),r.readAsDataURL(e),t.files.push(e)}))}},{key:"loadData",value:function(e){null!==e&&null!==e.target&&(this.src=e.target.result)}},{key:"removeFile",value:function(e){this.files=this.files.filter((function(t){return t!=e}))}},{key:"style",value:function(){return alert(""),E.state.activePlayer==this.player?"border: dashed;":""}},{key:"activate",value:function(){E.commit("activePlayer",this.player)}},{key:"beforeDestroy",value:function(){this.player&&this.player.dispose()}}]),r}(a["a"]),R=V,C=Object(m["a"])(R.prototype,"id",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),D=Object(m["a"])(R.prototype,"active",[_],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),P=R))||P),T=A,F=(r("cc4b"),r("2877")),L=r("6544"),B=r.n(L),M=r("a523"),U=Object(F["a"])(T,h,y,!1,null,null,null),$=U.exports;B()(U,{VContainer:M["a"]});var z=r("53ca"),I=r("a366"),G=r.n(I),J=function(){function e(){Object(s["a"])(this,e)}return Object(d["a"])(e,[{key:"mergeVideos",value:function(e){var t=new G.a;t.setOutputSize(1920,1080);var r=0,a=e.length>2?0:t.height/4,o=0;e.forEach((function(e){var n=e.record().mediaElement;switch(t.addMediaElement("webm",n,{x:r,y:a,width:t.width/2,height:t.height/2}),o++,o){case 1:r=t.width/2;break;case 2:r=0,a=t.height/2;break;case 3:r=t.width/2,a=t.height/2;break;default:break}})),t.start();var n=document.querySelector("#output");return null!==n&&(n.srcObject=t.result,n.autoplay=!0),t.result}},{key:"deepCopy",value:function(e){var t;if(null==e||"object"!=Object(z["a"])(e))return e;if(e instanceof Date)return t=new Date,t.setTime(e.getTime()),t;if(e instanceof Array){t=[];for(var r=0,a=e.length;r<a;r++)t[r]=this.deepCopy(e[r]);return t}if(e instanceof Object){for(var o in t={},e)e.hasOwnProperty(o)&&(t[o]=this.deepCopy(e[o]));return t}throw alert("Unable to copy obj! Its type isn't supported.")}}]),e}(),N=function(e){Object(u["a"])(r,e);var t=Object(v["a"])(r);function r(e){var a;return Object(s["a"])(this,r),a=t.call(this,e),a.hover=!1,a.downloading=!1,a.recording=!1,a.mediaRecorder=null,a.service=new J,a.children=["Gustav"],a.files=[],a.data=[],a.slider=0,a.recordedChunks=[],a}return Object(d["a"])(r,[{key:"addFile",value:function(e){var t=this,r=e.dataTransfer.files;r&&Object(c["a"])(r).forEach((function(e){var r=new FileReader;r.onload=t.loadData,r.readAsDataURL(e),t.files.push(e)}))}},{key:"loadData",value:function(e){null!==e&&null!==e.target&&(alert(null===e||void 0===e?void 0:e.target.result),this.data.push(e.target.result))}},{key:"removeFile",value:function(e){this.files=this.files.filter((function(t){return t!=e}))}},{key:"setOffset",value:function(){console.log("offset: "+this.slider/1e3),E.state.activePlayer.offset({start:this.slider/1e3})}},{key:"mouseoverAddBtn",value:function(){this.hover=!0}},{key:"mouseleaveAddBtn",value:function(){this.hover=!1}},{key:"refreshMergedStream",value:function(){console.log("Try to refresh merged Stream:");var e=[];E.state.players.forEach((function(t){e.push(t.player),void 0!==t.player.record()&&(console.log("save"))}));var t=this.service.mergeVideos(e);console.log(t);var r={mimeType:"video/webm; codecs=vp9"};this.mediaRecorder=new MediaRecorder(t,r),E.state.players.forEach((function(e){document.getElementById(e.id)}))}},{key:"addPlayer",value:function(){this.children.push("JALvideojs"+Date.now()),this.mediaRecorder=null}},{key:"record",value:function(){var e=this;if(null!=this.mediaRecorder){var t,r;if(1!=this.recording)this.mediaRecorder.ondataavailable=this.handleDataAvailable,null===(t=this.mediaRecorder)||void 0===t||t.start(),this.recording=!0,this.click();else null===(r=this.mediaRecorder)||void 0===r||r.stop(),this.recording=!1}else{var a,o,n;if(void 0!=this.service.player)a=this.service.player.record();else a=null===E||void 0===E||null===(o=E.state)||void 0===o||null===(n=o.activePlayer)||void 0===n?void 0:n.record();a.isRecording()?(a.stop(),this.recording=!1):(a.start(),this.recording=!0)}this.recording&&E.state.players.forEach((function(t){t.player.on("ended",(function(){e.recording&&e.record()}))}))}},{key:"click",value:function(){E.state.players.forEach((function(e){console.log("play"),e.player.play()}))}},{key:"pause",value:function(){E.state.players.forEach((function(e){console.log("pause"),e.player.pause()}))}},{key:"stop",value:function(){E.state.players.forEach((function(e){console.log("stop"),e.player.stop()}))}},{key:"save",value:function(){console.log("todoSave"),this.downloading=!0,this.refreshMergedStream(),this.record()}},{key:"handleDataAvailable",value:function(e){console.log("data-available"),e.data.size>0&&(this.recordedChunks.push(e.data),console.log(this.recordedChunks),this.download(),this.downloading=!1)}},{key:"download",value:function(){var e=new Blob(this.recordedChunks,{type:"video/webm"}),t=URL.createObjectURL(e),r=document.createElement("a");document.body.appendChild(r),r.href=t,r.download="test.webm",r.click(),window.URL.revokeObjectURL(t)}}]),r}(a["a"]);N=Object(f["a"])([Object(p["a"])({components:{"video-js-recorder":$}})],N);var q=N,H=q,K=(r("7525"),r("40dc")),Q=r("8336"),W=r("b0af"),X=r("99d9"),Y=r("62ad"),Z=r("132d"),ee=r("a722"),te=r("490a"),re=r("0fd9"),ae=r("ba0d"),oe=r("8654"),ne=Object(F["a"])(H,i,l,!1,null,null,null),ie=ne.exports;B()(ne,{VAppBar:K["a"],VBtn:Q["a"],VCard:W["a"],VCardText:X["a"],VCol:Y["a"],VContainer:M["a"],VIcon:Z["a"],VLayout:ee["a"],VProgressCircular:te["a"],VRow:re["a"],VSlider:ae["a"],VTextField:oe["a"]});var le={name:"app",components:{VideoRecorderGrid:ie}},ce=le,se=(r("034f"),r("7496")),de=Object(F["a"])(ce,o,n,!1,null,null,null),ue=de.exports;B()(de,{VApp:se["a"],VCard:W["a"]});var ve=r("f309");a["a"].use(ve["a"]);var fe=new ve["a"]({theme:{dark:!0}});a["a"].config.productionTip=!1,a["a"].filter("kb",(function(e){return Math.floor(e/1024)})),new a["a"]({store:E,vuetify:fe,render:function(e){return e(ue)}}).$mount("#app")}});
//# sourceMappingURL=app.82e47e0b.js.map
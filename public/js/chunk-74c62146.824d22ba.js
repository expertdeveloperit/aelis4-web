(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74c62146"],{3582:function(e,s,t){"use strict";var a=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"shipper-container"},[a("div",{staticClass:"shipper-group"},[a("transition",{attrs:{name:"slide"}},[e.show?a("div",{staticClass:"shipper-list"},[a("div",{staticClass:"title"},[e._v(e._s(e.$t("shipperComponent.shipperList")))]),a("div",{staticClass:"search-shippers-div"},[a("el-input",{directives:[{name:"alphanumeric-validation",rawName:"v-alphanumeric-validation"}],ref:"search-shipper-list",staticClass:"inline-input",attrs:{maxlength:"50",clearable:"",size:"mini","suffix-icon":"el-icon-search",id:"search-shipper-list"},on:{change:e.search},model:{value:e.searchText,callback:function(s){e.searchText=s},expression:"searchText"}})],1),a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.search,expression:"search"}],staticClass:"list",attrs:{"infinite-scroll-immediate":"","infinite-scroll-distance":"100","infinite-scroll-disabled":"disabled"}},e._l(e.shippers.list,function(s){return a("div",{key:s.id,staticClass:"list-item"},[a("span",{staticClass:"span-name"},[e._v(e._s(s.name)+" - "+e._s(s.number))]),a("span",{staticClass:"span-check"},[a("el-radio",{attrs:{label:s.number},on:{change:function(t){return e.change(s)}},model:{value:e.user.shipperAccountNumber,callback:function(s){e.$set(e.user,"shipperAccountNumber",s)},expression:"user.shipperAccountNumber"}},[e._v(" ")])],1)])}),0),e.shippers.loading?a("p",{staticClass:"loading-shippers"},[a("img",{attrs:{src:t("e96b"),alt:"loading"}})]):e._e(),e.noMore||e.shippers.loading?e._e():a("p",{staticClass:"scroll-ellipsis"},[e._v("...")])]):e._e()]),a("div",{staticClass:"shipper-selected"},[a("span",{staticClass:"shipper-label"},[e._v(e._s(e.user.shipperAccountLabel))]),a("span",{staticClass:"shipper-change"},[e.shippers.multipleShippers&&e.user.shipperAccountNumber?a("el-button",{attrs:{icon:"fa fa-random",size:"mini",circle:""},on:{click:e.openList}}):e._e()],1)])],1),e.show?a("div",{staticClass:"shipper-container-overlay"}):e._e()])},i=[],n=(t("8e6e"),t("ac6a"),t("456d"),t("96cf"),t("3b8d")),l=(t("386d"),t("bd86")),r=t("5c96"),o=t("2f62"),c=t("c9d9");function p(e){for(var s=1;s<arguments.length;s++)if(s%2){var t=null!=arguments[s]?arguments[s]:{},a=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.forEach(function(s){Object(l["a"])(e,s,t[s])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[s]));return e}var u={name:"shipperList",props:{actionStrSelectChained:{type:Array,default:null}},data:function(){return{show:!1,searchText:""}},computed:p({},Object(o["b"])(["shippers","user"]),{noMore:function(){return this.shippers.list.length>=this.shippers.totalRows},disabled:function(){return this.shippers.loading||this.noMore}}),methods:{search:function(e){return(this.searchText!==this.shippers.filters.search||e)&&this.$store.dispatch("account/resetShipperList"),this.$store.dispatch("account/getShipperListScroll",this.searchText)},change:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(s){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.$store.dispatch("setUserShipperAccount",s),t=r["Loading"].service(c["a"].LOADING.DEFAULT_CONFIG),e.next=4,this.callSelectAction();case 4:t.close(),this.show=!1;case 6:case"end":return e.stop()}},e,this)}));function s(s){return e.apply(this,arguments)}return s}(),openList:function(){var e=this;this.show=!this.show,this.show&&this.$nextTick(function(){e.$refs["search-shipper-list"].focus()})},callSelectAction:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));function s(){return e.apply(this,arguments)}return s}()},mounted:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var s,t,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(s=!0,!this.user.shipperAccountNumber){e.next=6;break}this.callSelectAction(),this.search(s),e.next=12;break;case 6:return t=r["Loading"].service(c["a"].LOADING.DEFAULT_CONFIG),e.next=9,this.search(s);case 9:this.show=this.shippers.list&&this.shippers.list.length>1,this.shippers.list&&1===this.shippers.list.length&&this.change(this.shippers.list[0]),t.close();case 12:this.show&&this.$nextTick(function(){a.$refs["search-shipper-list"].focus()});case 13:case"end":return e.stop()}},e,this)}));function s(){return e.apply(this,arguments)}return s}()},d=u,h=(t("f257"),t("2877")),m=Object(h["a"])(d,a,i,!1,null,null,null);s["a"]=m.exports},"7a5d":function(e,s,t){e.exports=t.p+"img/upload-icon.0b5ac41c.png"},8284:function(e,s,t){"use strict";var a=t("8f56"),i=t.n(a);i.a},"8f56":function(e,s,t){},9014:function(e,s,t){"use strict";var a=t("956c"),i=t.n(a);i.a},9063:function(e,s,t){"use strict";var a=t("95cb"),i=t.n(a);i.a},"956c":function(e,s,t){},"95cb":function(e,s,t){},dfa8:function(e,s,t){},e96b:function(e,s,t){e.exports=t.p+"img/loading.c5590569.svg"},ecea:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("shipper-list"),t("div",{staticClass:"app-view-container upload-container"},[t("div",{staticClass:"app-view-title"},[e._v(e._s(e.$t("uploadXmlFiles.uploadShipmentTitle"))+"\n    "),t("el-popover",{staticClass:"explanation-popover",attrs:{placement:"bottom",title:e.$t("uploadXmlFiles.explanation"),width:"200",trigger:"click",content:e.$t("uploadXmlFiles.explanationText")}},[t("i",{staticClass:"el-icon-question",attrs:{slot:"reference"},slot:"reference"})])],1),t("el-collapse",{staticClass:"explanation-container",model:{value:e.activeCollapsibleName,callback:function(s){e.activeCollapsibleName=s},expression:"activeCollapsibleName"}},[t("el-collapse-item",{attrs:{title:e.$t("uploadXmlFiles.explanation"),name:"explanation",id:"explanation"}},[t("div",[e._v(e._s(e.$t("uploadXmlFiles.explanationText")))])])],1),t("upload-response",{staticClass:"upload-response"})],1),t("upload-drop")],1)},i=[],n=t("3582"),l=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"upload-drop-container",class:{"upload-drop-container-mini":e.isMinimized,"upload-drop-container-max":!e.isMinimized}},[a("div",{staticClass:"upload-template-info"},[a("i",{staticClass:"el-icon-info red-armellini"}),e._v(" \n    "),a("span",{staticClass:"font-gray info-text"},[e._v(" "+e._s(e.$t("uploadXmlFiles.youCanDownload"))+"  ")]),a("a",{staticClass:"red-link-bold",attrs:{id:"xml-upload-download-template-link",href:e.templateExampleUrl,download:""}},[e._v(" "+e._s(e.$t("uploadXmlFiles.here"))+" ")])]),e.processing?a("span",{staticClass:"xml-loading",attrs:{id:"xml-loading"}},[a("img",{class:{"padding-left_28":e.actualFileProcessed},attrs:{src:t("e96b"),alt:"loading"}})]):e._e(),a("div",{staticClass:"upload-dropzone-area",class:{"upload-dropzone-area-mini":e.isMinimized,"upload-dropzone-area-max":!e.isMinimized},on:{click:e.handleOpenSearchFile}},[e.actualFileProcessed?a("i",{staticClass:"collapse-drop-zone el-icon-arrow-right",attrs:{id:"collapse-drop-zone"},on:{click:function(s){return s.stopPropagation(),e.handleMinimized(s)}}}):e._e(),a("el-upload",{ref:"upload",staticClass:"upload-xml",attrs:{id:"upload-xml",drag:"","show-file-list":!1,action:e.url,headers:e.headers,"on-success":e.handleSuccess,"on-progress":e.handleProgress,"on-error":e.handleError,"before-upload":e.handleBeforeUpload,limit:1,accept:".xml"}},[a("div",{staticClass:"upload-icon-container"},[a("img",{staticClass:"upload-icon",attrs:{src:t("7a5d"),alt:"upload-icon"}}),e.isMinimized?e._e():a("el-progress",{attrs:{type:"circle",percentage:e.uploadProgress,"show-text":!1}})],1),a("div",{staticClass:"el-upload__text"},[a("div",{staticClass:"drag-and-drop-text"},[e._v(" "+e._s(e.$t("uploadXmlFiles.dragAndDrop"))+" ")]),e._v(" "+e._s(e.$t("uploadXmlFiles.yourFilesOr"))+" "),a("em",[e._v(e._s(e.$t("uploadXmlFiles.browse")))])])])],1)])},r=[],o=(t("8e6e"),t("ac6a"),t("456d"),t("7f7f"),t("bd86")),c=t("2f62"),p=t("4436");function u(e){for(var s=1;s<arguments.length;s++)if(s%2){var t=null!=arguments[s]?arguments[s]:{},a=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.forEach(function(s){Object(o["a"])(e,s,t[s])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[s]));return e}var d={name:"UploadDrop",computed:u({},Object(c["b"])(["user"])),data:function(){return{isMinimized:!1,uploadProgress:0,processing:!1,actualFileProcessed:!1,url:"",templateExampleUrl:"",headers:{}}},mounted:function(){this.url="".concat("http://aelis4-server-913239114.us-east-1.elb.amazonaws.com/api","/data-entry/shipment/upload"),this.templateExampleUrl="".concat("https://s3.amazonaws.com/aelis4-assets-dev/","xml-upload-template.xml"),this.headers.Authorization="Bearer ".concat(p["a"].accessToken),this.headers.shipperAccountNumber=this.user.shipperAccountNumber},methods:{handleSuccess:function(e,s){this.$store.dispatch("SetUploadXmlResponse",u({},e,{fileName:s.name})),this.isMinimized=!0,this.processing=!1,this.actualFileProcessed=!0,this.$refs.upload.clearFiles()},handleOpenSearchFile:function(){this.isMinimized=!1,this.uploadProgress=0},handleMinimized:function(){this.isMinimized=!this.isMinimized},handleProgress:function(e,s,t){this.processing||(this.processing=!0),this.uploadProgress=t[0].percentage},handleError:function(){this.processing=!1,this.$message.error(this.$t("common.errorServer"))},handleBeforeUpload:function(e){var s="text/xml"===e.type,t=e.size/1024/1024<=5;return s||this.$message.error(this.$t("uploadXmlFiles.errorExtension")),t||this.$message.error(this.$t("uploadXmlFiles.fileSizeExceed")),s&&t}}},h=d,m=(t("9063"),t("2877")),f=Object(m["a"])(h,l,r,!1,null,null,null),v=f.exports,b=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("el-collapse",{directives:[{name:"show",rawName:"v-show",value:e.uploadXmlResponse.activeElement.length,expression:"uploadXmlResponse.activeElement.length"}],model:{value:e.uploadXmlResponse.activeElement,callback:function(s){e.$set(e.uploadXmlResponse,"activeElement",s)},expression:"uploadXmlResponse.activeElement"}},[t("el-collapse-item",{attrs:{title:e.$t("uploadXmlFiles.xmlResponse"),name:"xml-upload-response-collapsible",id:"xml-upload-response-collapsible"}},[t("div",{staticClass:"header-response",attrs:{id:"header-response"}},[t("span",{staticClass:"response-field"},[e._v(e._s(e.$t("common.orderNumberShort"))+": "+e._s(e.uploadXmlResponse.header.orderNumber))]),t("span",{staticClass:"response-field"},[e._v(e._s(e.$t("common.shipdate"))+": "+e._s(e.uploadXmlResponse.header.shipdate))]),t("span",{staticClass:"response-field"},[e._v(e._s(e.$t("common.shipper"))+": "+e._s(e.uploadXmlResponse.header.shipper))]),t("span",{staticClass:"response-field"},[e._v(e._s(e.$t("common.unitsInFile"))+": "+e._s(e.uploadXmlResponse.header.totalUnitsInFile))]),t("span",{staticClass:"response-field"},[e._v(e._s(e.$t("common.unitsSuccess"))+": "+e._s(e.uploadXmlResponse.header.totalUnitsSuccess))]),t("span",{staticClass:"response-field"},[e._v(e._s(e.$t("common.unitsDuplicates"))+": "+e._s(e.uploadXmlResponse.header.totalUnitsDuplicates))]),t("span",{staticClass:"response-field"},[e._v(e._s(e.$t("common.unitsDiscrepancy"))+": "+e._s(e.uploadXmlResponse.header.totalUnitsDiscrepancy))])]),t("div",{staticClass:"header-response-message",attrs:{id:"header-response-message"}},[e.uploadXmlResponse.header.errorMessage?t("div",[t("i",{staticClass:"el-icon-warning yellow-warning"}),e._v("   "),t("span",[e._v(e._s(e.uploadXmlResponse.header.errorMessage))])]):e._e(),e.uploadXmlResponse.details.length||e.uploadXmlResponse.header.errorMessage||!e.uploadXmlResponse.header.fileName?e._e():t("div",[t("i",{staticClass:"el-icon-success green-success"}),e._v(" "),t("span",[e._v(e._s(e.$t("uploadXmlFiles.uploadSuccess")))])])]),e.uploadXmlResponse.details.length?t("el-table",{staticClass:"xml-table-response-data",attrs:{id:"response-data",size:"mini",height:"100%","tooltip-effect":"dark",sortable:"",data:e.uploadXmlResponse.details}},[t("el-table-column",{attrs:{prop:"consignee",width:"270",label:e.$t("common.consigneeAccount")},scopedSlots:e._u([{key:"default",fn:function(s){return[t("span",[e._v(" "+e._s(s.row.consignee_name)+" - "+e._s(s.row.consignee))])]}}],null,!1,423175605)}),t("el-table-column",{attrs:{prop:"unitsFailed",width:"100",label:e.$t("uploadXmlFiles.failedUnits")}}),t("el-table-column",{attrs:{prop:"unitFailedDetail.unitID[0]",width:"120",label:e.$t("uploadXmlFiles.unitIds")},scopedSlots:e._u([{key:"default",fn:function(s){return[1===s.row.unitFailedDetail.unitID.length?t("span",[e._v(e._s(s.row.unitFailedDetail.unitID[0]))]):[t("el-popover",{attrs:{placement:"right",width:"100",trigger:"hover"}},[t("el-table",{attrs:{data:s.row.unitFailedDetail.unitID,"max-height":"500"}},[t("el-table-column",{attrs:{width:"300",label:e.$t("uploadXmlFiles.unitIds")},scopedSlots:e._u([{key:"default",fn:function(s){return[e._v("\n                                        "+e._s(s.row)+"\n                                    ")]}}],null,!0)})],1),t("el-button",{staticClass:"pop-over-unitIds-error",attrs:{slot:"reference",type:"text"},slot:"reference"},[e._v(e._s(s.row.unitFailedDetail.unitID[0])+"...")])],1)]]}}],null,!1,850806456)}),t("el-table-column",{attrs:{prop:"message",label:e.$t("common.message")}})],1):e._e()],1)],1)],1)},g=[];function _(e){for(var s=1;s<arguments.length;s++)if(s%2){var t=null!=arguments[s]?arguments[s]:{},a=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.forEach(function(s){Object(o["a"])(e,s,t[s])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[s]));return e}var w={name:"UploadResponse",computed:_({},Object(c["b"])(["uploadXmlResponse"])),data:function(){return{}},beforeDestroy:function(){this.$store.dispatch("clearXmlResponse")}},x=w,C=(t("8284"),Object(m["a"])(x,b,g,!1,null,null,null)),O=C.exports,$={name:"UploadXml",components:{UploadDrop:v,UploadResponse:O,ShipperList:n["a"]},data:function(){return{activeCollapsibleName:["explanation"]}}},y=$,X=(t("9014"),Object(m["a"])(y,a,i,!1,null,null,null));s["default"]=X.exports},f257:function(e,s,t){"use strict";var a=t("dfa8"),i=t.n(a);i.a}}]);
//# sourceMappingURL=chunk-74c62146.824d22ba.js.map
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.syncPoc={})}(this,function(t){var n=function(t){return t?t.replace(/[^\s]/gm,"•"):""},r=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32};r.Diff=function(t,n){this[0]=t,this[1]=n},r.Diff.prototype.length=2,r.Diff.prototype.toString=function(){return this[0]+","+this[1]},r.prototype.diff_main=function(t,n,e,i){void 0===i&&(i=this.Diff_Timeout<=0?Number.MAX_VALUE:(new Date).getTime()+1e3*this.Diff_Timeout);var o=i;if(null==t||null==n)throw new Error("Null input. (diff_main)");if(t==n)return t?[new r.Diff(0,t)]:[];void 0===e&&(e=!0);var s=e,a=this.diff_commonPrefix(t,n),f=t.substring(0,a);t=t.substring(a),n=n.substring(a),a=this.diff_commonSuffix(t,n);var u=t.substring(t.length-a);t=t.substring(0,t.length-a),n=n.substring(0,n.length-a);var h=this.t(t,n,s,o);return f&&h.unshift(new r.Diff(0,f)),u&&h.push(new r.Diff(0,u)),this.diff_cleanupMerge(h),h},r.prototype.t=function(t,n,e,i){var o;if(!t)return[new r.Diff(1,n)];if(!n)return[new r.Diff(-1,t)];var s=t.length>n.length?t:n,a=t.length>n.length?n:t,f=s.indexOf(a);if(-1!=f)return o=[new r.Diff(1,s.substring(0,f)),new r.Diff(0,a),new r.Diff(1,s.substring(f+a.length))],t.length>n.length&&(o[0][0]=o[2][0]=-1),o;if(1==a.length)return[new r.Diff(-1,t),new r.Diff(1,n)];var u=this.i(t,n);if(u){var h=u[1],c=u[3],v=u[4],l=this.diff_main(u[0],u[2],e,i),w=this.diff_main(h,c,e,i);return l.concat([new r.Diff(0,v)],w)}return e&&t.length>100&&n.length>100?this.o(t,n,i):this.s(t,n,i)},r.prototype.o=function(t,n,e){var i=this.u(t,n),o=i.lineArray,s=this.diff_main(t=i.chars1,n=i.chars2,!1,e);this.v(s,o),this.diff_cleanupSemantic(s),s.push(new r.Diff(0,""));for(var a=0,f=0,u=0,h="",c="";a<s.length;){switch(s[a][0]){case 1:u++,c+=s[a][1];break;case-1:f++,h+=s[a][1];break;case 0:if(f>=1&&u>=1){s.splice(a-f-u,f+u),a=a-f-u;for(var v=this.diff_main(h,c,!1,e),l=v.length-1;l>=0;l--)s.splice(a,0,v[l]);a+=v.length}u=0,f=0,h="",c=""}a++}return s.pop(),s},r.prototype.s=function(t,n,e){for(var i=t.length,o=n.length,s=Math.ceil((i+o)/2),a=s,f=2*s,u=new Array(f),h=new Array(f),c=0;c<f;c++)u[c]=-1,h[c]=-1;u[a+1]=0,h[a+1]=0;for(var v=i-o,l=v%2!=0,w=0,p=0,y=0,d=0,b=0;b<s&&!((new Date).getTime()>e);b++){for(var m=-b+w;m<=b-p;m+=2){for(var g=a+m,M=(z=m==-b||m!=b&&u[g-1]<u[g+1]?u[g+1]:u[g-1]+1)-m;z<i&&M<o&&t.charAt(z)==n.charAt(M);)z++,M++;if(u[g]=z,z>i)p+=2;else if(M>o)w+=2;else if(l&&(j=a+v-m)>=0&&j<f&&-1!=h[j]&&z>=(x=i-h[j]))return this.l(t,n,z,M,e)}for(var k=-b+y;k<=b-d;k+=2){for(var x,j=a+k,A=(x=k==-b||k!=b&&h[j-1]<h[j+1]?h[j+1]:h[j-1]+1)-k;x<i&&A<o&&t.charAt(i-x-1)==n.charAt(o-A-1);)x++,A++;if(h[j]=x,x>i)d+=2;else if(A>o)y+=2;else if(!l){var z;if((g=a+v-k)>=0&&g<f&&-1!=u[g]&&(M=a+(z=u[g])-g,z>=(x=i-x)))return this.l(t,n,z,M,e)}}}return[new r.Diff(-1,t),new r.Diff(1,n)]},r.prototype.l=function(t,n,r,e,i){var o=t.substring(0,r),s=n.substring(0,e),a=t.substring(r),f=n.substring(e),u=this.diff_main(o,s,!1,i),h=this.diff_main(a,f,!1,i);return u.concat(h)},r.prototype.u=function(t,n){var r=[],e={};function i(t){for(var n="",i=0,s=-1,a=r.length;s<t.length-1;){-1==(s=t.indexOf("\n",i))&&(s=t.length-1);var f=t.substring(i,s+1);(e.hasOwnProperty?e.hasOwnProperty(f):void 0!==e[f])?n+=String.fromCharCode(e[f]):(a==o&&(f=t.substring(i),s=t.length),n+=String.fromCharCode(a),e[f]=a,r[a++]=f),i=s+1}return n}r[0]="";var o=4e4,s=i(t);return o=65535,{chars1:s,chars2:i(n),lineArray:r}},r.prototype.v=function(t,n){for(var r=0;r<t.length;r++){for(var e=t[r][1],i=[],o=0;o<e.length;o++)i[o]=n[e.charCodeAt(o)];t[r][1]=i.join("")}},r.prototype.diff_commonPrefix=function(t,n){if(!t||!n||t.charAt(0)!=n.charAt(0))return 0;for(var r=0,e=Math.min(t.length,n.length),i=e,o=0;r<i;)t.substring(o,i)==n.substring(o,i)?o=r=i:e=i,i=Math.floor((e-r)/2+r);return i},r.prototype.diff_commonSuffix=function(t,n){if(!t||!n||t.charAt(t.length-1)!=n.charAt(n.length-1))return 0;for(var r=0,e=Math.min(t.length,n.length),i=e,o=0;r<i;)t.substring(t.length-i,t.length-o)==n.substring(n.length-i,n.length-o)?o=r=i:e=i,i=Math.floor((e-r)/2+r);return i},r.prototype.p=function(t,n){var r=t.length,e=n.length;if(0==r||0==e)return 0;r>e?t=t.substring(r-e):r<e&&(n=n.substring(0,r));var i=Math.min(r,e);if(t==n)return i;for(var o=0,s=1;;){var a=t.substring(i-s),f=n.indexOf(a);if(-1==f)return o;s+=f,0!=f&&t.substring(i-s)!=n.substring(0,s)||(o=s,s++)}},r.prototype.i=function(t,n){if(this.Diff_Timeout<=0)return null;var r=t.length>n.length?t:n,e=t.length>n.length?n:t;if(r.length<4||2*e.length<r.length)return null;var i=this;function o(t,n,r){for(var e,o,s,a,f=t.substring(r,r+Math.floor(t.length/4)),u=-1,h="";-1!=(u=n.indexOf(f,u+1));){var c=i.diff_commonPrefix(t.substring(r),n.substring(u)),v=i.diff_commonSuffix(t.substring(0,r),n.substring(0,u));h.length<v+c&&(h=n.substring(u-v,u)+n.substring(u,u+c),e=t.substring(0,r-v),o=t.substring(r+c),s=n.substring(0,u-v),a=n.substring(u+c))}return 2*h.length>=t.length?[e,o,s,a,h]:null}var s,a,f,u,h,c=o(r,e,Math.ceil(r.length/4)),v=o(r,e,Math.ceil(r.length/2));return c||v?(s=v?c&&c[4].length>v[4].length?c:v:c,t.length>n.length?(a=s[0],f=s[1],u=s[2],h=s[3]):(u=s[0],h=s[1],a=s[2],f=s[3]),[a,f,u,h,s[4]]):null},r.prototype.diff_cleanupSemantic=function(t){for(var n=!1,e=[],i=0,o=null,s=0,a=0,f=0,u=0,h=0;s<t.length;)0==t[s][0]?(e[i++]=s,a=u,f=h,u=0,h=0,o=t[s][1]):(1==t[s][0]?u+=t[s][1].length:h+=t[s][1].length,o&&o.length<=Math.max(a,f)&&o.length<=Math.max(u,h)&&(t.splice(e[i-1],0,new r.Diff(-1,o)),t[e[i-1]+1][0]=1,i--,s=--i>0?e[i-1]:-1,a=0,f=0,u=0,h=0,o=null,n=!0)),s++;for(n&&this.diff_cleanupMerge(t),this.diff_cleanupSemanticLossless(t),s=1;s<t.length;){if(-1==t[s-1][0]&&1==t[s][0]){var c=t[s-1][1],v=t[s][1],l=this.p(c,v),w=this.p(v,c);l>=w?(l>=c.length/2||l>=v.length/2)&&(t.splice(s,0,new r.Diff(0,v.substring(0,l))),t[s-1][1]=c.substring(0,c.length-l),t[s+1][1]=v.substring(l),s++):(w>=c.length/2||w>=v.length/2)&&(t.splice(s,0,new r.Diff(0,c.substring(0,w))),t[s-1][0]=1,t[s-1][1]=v.substring(0,v.length-w),t[s+1][0]=-1,t[s+1][1]=c.substring(w),s++),s++}s++}},r.prototype.diff_cleanupSemanticLossless=function(t){function n(t,n){if(!t||!n)return 6;var e=t.charAt(t.length-1),i=n.charAt(0),o=e.match(r.m),s=i.match(r.m),a=o&&e.match(r.g),f=s&&i.match(r.g),u=a&&e.match(r.M),h=f&&i.match(r.M),c=u&&t.match(r.k),v=h&&n.match(r.j);return c||v?5:u||h?4:o&&!a&&f?3:a||f?2:o||s?1:0}for(var e=1;e<t.length-1;){if(0==t[e-1][0]&&0==t[e+1][0]){var i=t[e-1][1],o=t[e][1],s=t[e+1][1],a=this.diff_commonSuffix(i,o);if(a){var f=o.substring(o.length-a);i=i.substring(0,i.length-a),o=f+o.substring(0,o.length-a),s=f+s}for(var u=i,h=o,c=s,v=n(i,o)+n(o,s);o.charAt(0)===s.charAt(0);){i+=o.charAt(0),o=o.substring(1)+s.charAt(0),s=s.substring(1);var l=n(i,o)+n(o,s);l>=v&&(v=l,u=i,h=o,c=s)}t[e-1][1]!=u&&(u?t[e-1][1]=u:(t.splice(e-1,1),e--),t[e][1]=h,c?t[e+1][1]=c:(t.splice(e+1,1),e--))}e++}},r.m=/[^a-zA-Z0-9]/,r.g=/\s/,r.M=/[\r\n]/,r.k=/\n\r?\n$/,r.j=/^\r?\n\r?\n/,r.prototype.diff_cleanupEfficiency=function(t){for(var n=!1,e=[],i=0,o=null,s=0,a=!1,f=!1,u=!1,h=!1;s<t.length;)0==t[s][0]?(t[s][1].length<this.Diff_EditCost&&(u||h)?(e[i++]=s,a=u,f=h,o=t[s][1]):(i=0,o=null),u=h=!1):(-1==t[s][0]?h=!0:u=!0,o&&(a&&f&&u&&h||o.length<this.Diff_EditCost/2&&a+f+u+h==3)&&(t.splice(e[i-1],0,new r.Diff(-1,o)),t[e[i-1]+1][0]=1,i--,o=null,a&&f?(u=h=!0,i=0):(s=--i>0?e[i-1]:-1,u=h=!1),n=!0)),s++;n&&this.diff_cleanupMerge(t)},r.prototype.diff_cleanupMerge=function(t){t.push(new r.Diff(0,""));for(var n,e=0,i=0,o=0,s="",a="";e<t.length;)switch(t[e][0]){case 1:o++,a+=t[e][1],e++;break;case-1:i++,s+=t[e][1],e++;break;case 0:i+o>1?(0!==i&&0!==o&&(0!==(n=this.diff_commonPrefix(a,s))&&(e-i-o>0&&0==t[e-i-o-1][0]?t[e-i-o-1][1]+=a.substring(0,n):(t.splice(0,0,new r.Diff(0,a.substring(0,n))),e++),a=a.substring(n),s=s.substring(n)),0!==(n=this.diff_commonSuffix(a,s))&&(t[e][1]=a.substring(a.length-n)+t[e][1],a=a.substring(0,a.length-n),s=s.substring(0,s.length-n))),t.splice(e-=i+o,i+o),s.length&&(t.splice(e,0,new r.Diff(-1,s)),e++),a.length&&(t.splice(e,0,new r.Diff(1,a)),e++),e++):0!==e&&0==t[e-1][0]?(t[e-1][1]+=t[e][1],t.splice(e,1)):e++,o=0,i=0,s="",a=""}""===t[t.length-1][1]&&t.pop();var f=!1;for(e=1;e<t.length-1;)0==t[e-1][0]&&0==t[e+1][0]&&(t[e][1].substring(t[e][1].length-t[e-1][1].length)==t[e-1][1]?(t[e][1]=t[e-1][1]+t[e][1].substring(0,t[e][1].length-t[e-1][1].length),t[e+1][1]=t[e-1][1]+t[e+1][1],t.splice(e-1,1),f=!0):t[e][1].substring(0,t[e+1][1].length)==t[e+1][1]&&(t[e-1][1]+=t[e+1][1],t[e][1]=t[e][1].substring(t[e+1][1].length)+t[e+1][1],t.splice(e+1,1),f=!0)),e++;f&&this.diff_cleanupMerge(t)},r.prototype.diff_text1=function(t){for(var n=[],r=0;r<t.length;r++)1!==t[r][0]&&(n[r]=t[r][1]);return n.join("")},r.prototype.A=function(t,n){if(0!=n.length){if(null===t.start2)throw Error("patch not initialized");for(var e=n.substring(t.start2,t.start2+t.length1),i=0;n.indexOf(e)!=n.lastIndexOf(e)&&e.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)e=n.substring(t.start2-(i+=this.Patch_Margin),t.start2+t.length1+i);var o=n.substring(t.start2-(i+=this.Patch_Margin),t.start2);o&&t.diffs.unshift(new r.Diff(0,o));var s=n.substring(t.start2+t.length1,t.start2+t.length1+i);s&&t.diffs.push(new r.Diff(0,s)),t.start1-=o.length,t.start2-=o.length,t.length1+=o.length+s.length,t.length2+=o.length+s.length}},r.prototype.patch_make=function(t,n,e){var i,o;if("string"==typeof t&&"string"==typeof n&&void 0===e)(o=this.diff_main(i=t,n,!0)).length>2&&(this.diff_cleanupSemantic(o),this.diff_cleanupEfficiency(o));else if(t&&"object"==typeof t&&void 0===n&&void 0===e)i=this.diff_text1(o=t);else if("string"==typeof t&&n&&"object"==typeof n&&void 0===e)i=t,o=n;else{if("string"!=typeof t||"string"!=typeof n||!e||"object"!=typeof e)throw new Error("Unknown call format to patch_make.");i=t,o=e}if(0===o.length)return[];for(var s=[],a=new r.patch_obj,f=0,u=0,h=0,c=i,v=i,l=0;l<o.length;l++){var w=o[l][0],p=o[l][1];switch(f||0===w||(a.start1=u,a.start2=h),w){case 1:a.diffs[f++]=o[l],a.length2+=p.length,v=v.substring(0,h)+p+v.substring(h);break;case-1:a.length1+=p.length,a.diffs[f++]=o[l],v=v.substring(0,h)+v.substring(h+p.length);break;case 0:p.length<=2*this.Patch_Margin&&f&&o.length!=l+1?(a.diffs[f++]=o[l],a.length1+=p.length,a.length2+=p.length):p.length>=2*this.Patch_Margin&&f&&(this.A(a,c),s.push(a),a=new r.patch_obj,f=0,c=v,u=h)}1!==w&&(u+=p.length),-1!==w&&(h+=p.length)}return f&&(this.A(a,c),s.push(a)),s},r.prototype.patch_toText=function(t){for(var n=[],r=0;r<t.length;r++)n[r]=t[r];return n.join("")},r.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0},r.patch_obj.prototype.toString=function(){for(var t,n=["@@ -"+(0===this.length1?this.start1+",0":1==this.length1?this.start1+1:this.start1+1+","+this.length1)+" +"+(0===this.length2?this.start2+",0":1==this.length2?this.start2+1:this.start2+1+","+this.length2)+" @@\n"],r=0;r<this.diffs.length;r++){switch(this.diffs[r][0]){case 1:t="+";break;case-1:t="-";break;case 0:t=" "}n[r+1]=t+encodeURI(this.diffs[r][1])+"\n"}return n.join("").replace(/%20/g," ")};var e=new r,i=function(t){for(var n=5381,r=t.length;r;)n=33*n^t.charCodeAt(--r);return n>>>0},o=!1;try{var s=Object.defineProperty({},"passive",{get:function(){o={passive:!0}}});window.addEventListener("testPassive",null,s),window.removeEventListener("testPassive",null,s)}catch(t){}var a=function(t,n,r){return t.addEventListener(n,r,o)},f=function(t){var n="",r=t.name;if(r)return n+'[name="'+r+'"]';if(t.id)return n+"#"+t.id;t.className&&(n+="."+t.className.split(" ").join("."));var e=t.form;return e&&e.id&&(n="#"+e.id+" "+n),n},u={html:function(t,r){var o=i(""),s="",a=function(){var a=t.innerHTML.replace(/value="([^"]+)"/gm,function(t,r){return'value="'+n(r)+'"'}).replace(/value='([^']+)'/gm,function(t,r){return"value='"+n(r)+"'"}),f=function(t,n){var r=e.patch_make(s,a);return e.patch_toText(r)}();r({patch:f,hash:o}),s=a,o=i(a)};a(),new MutationObserver(a).observe(t,{attributes:!0,childList:!0,subtree:!0,characterData:!0})},focus:function(t,n){a(t,"focusin",function(t){var r=t.target,e=r.parentNode,i=f(r);n({event:{type:"focusin",selector:i,index:Array.prototype.indexOf.call(e.children,r)}})})},change:function(t,r){a(t,"change",function(t){var e=t.target;if(!Number.isInteger(e.selectedIndex)){var i=e.parentNode,o=f(e);r({event:{type:"change",selector:o,index:Array.prototype.indexOf.call(i.children,e),value:n(e.value)}})}})},select:function(t,n){a(t,"change",function(t){var r=t.target,e=r.selectedIndex;if(Number.isInteger(e)){var i=f(r);n({event:{type:"select",selector:i,index:e}})}})},scroll:function(t,n){var r={x:0,y:0},e=!1;a(window,"scroll",function(){r.x=window.pageXOffset,r.y=window.pageYOffset,e||(setTimeout(function(){n({event:{type:"scroll",x:r.x,y:r.y}}),e=!1},100),e=!0)})},mouse:function(t,n){var r=!1,e={x:0,y:0};a(t,"mousemove",function(t){e.x=t.clientX,e.y=t.clientY,r||(setTimeout(function(){r=!1,n({event:{type:"mousemove",x:e.x,y:e.y}})},100),r=!0)})},resize:function(t,n){var r=!1;a(window,"resize",function(){r||(setTimeout(function(){var e=t.getBoundingClientRect();n({event:{type:"resize",w:e.width,h:e.height}}),r=!1},100),r=!0)})}};t.observe=function(t){var n=new WebSocket("ws://localhost:8080");n.addEventListener("open",function(){var r=function(t){t.time=Date.now(),function(t,n){console.log({snapshot:t}),n.send(JSON.stringify(t))}(t,n)};Object.keys(u).forEach(function(n){u[n](t,r)})})}});
//# sourceMappingURL=sender.umd.js.map

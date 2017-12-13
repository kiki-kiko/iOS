//
//  DOMXPath.js
//
//  Copyright (c) 2016 Apple. All rights reserved.
//

function generateXPath(d){var h=d;var g=[];while(h.parentElement){var b=h.parentElement;var f=1;if(b.childNodes){var a=b.childNodes;for(var c=0;c<a.length;c+=1){if(h.nodeName===a[c].nodeName){f+=1}if(h===a[c]){f-=1;break}}}if(f==0){f==1}g.push("/"+h.tagName.toLowerCase()+"["+f+"]");h=b}g=g.reverse();var e="//html[1]"+g.join("");return e};
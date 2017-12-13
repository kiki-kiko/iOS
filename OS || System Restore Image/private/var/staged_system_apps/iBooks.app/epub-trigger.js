(function(){
var evNS = 'http://www.w3.org/2001/xml-events';
var epubNS = 'http://www.idpf.org/2007/ops';
var handleEvent = function (event) {
  var type = this.getAttributeNS(evNS, 'event');
  switch (event.type) {
    case type:
      if (this.getAttributeNS(evNS, 'propagate') === 'stop') event.stopPropagation();
      if (this.getAttributeNS(evNS, 'defaultAction') === 'cancel') event.preventDefault();
      var ref = document.getElementById(this.getAttribute('ref'));
      if (!ref) return;
      switch (this.getAttribute('action')) {
        case 'show': ref.style.visibility = 'visible'; break;
        case 'hide': ref.style.visibility = 'hidden'; break;
        case 'play': if (ref.seekable.length > 0) ref.currentTime = ref.seekable.start(0); ref.play(); break;
        case 'pause': ref.pause(); break;
        case 'resume': ref.play(); break;
        case 'mute': ref.muted = true; break;
        case 'unmute': ref.muted = false; break;
      }
      break;
    case 'DOMNodeRemovedFromDocument':
      removeTrigger(this);
      if (!event.target.isSameNode(this)) {
        // target must be the observer
        outstanding.push(this);
      }
      break;
  }
};
var registered = [];
var data = [];
var outstanding = [];
var processTrigger = function (node) {
  if (registered.indexOf(node) != -1) return;
  var type = node.getAttributeNS(evNS, 'event');
  if (type == null || type == '') return;
  var observer = node.getAttributeNS(evNS, 'observer');
  if (observer == null || observer == '') return;
  observer = document.getElementById(observer);
  if (observer == null) {
    if (outstanding.indexOf(node) == -1) outstanding.push(node);
    return;
  }
  var phase = node.getAttributeNS(evNS, 'phase');
  var capturing = (phase == 'capture' ? true : false);
  node.handleEvent = handleEvent;
  observer.addEventListener(type, node, capturing);
  observer.addEventListener('DOMNodeRemovedFromDocument', node, false);
  node.addEventListener('DOMNodeRemovedFromDocument', node, false);
  registered.push(node);
  data.push({
    target: observer,
    event: type,
    capturing: capturing
  });
};
var removeTrigger = function (node) {
  var idx = registered.indexOf(node);
  if (idx == -1) return;
  var obj = data[idx];
  obj.target.removeEventListener(obj.event, node, obj.capturing);
  obj.target.removeEventListener('DOMNodeRemovedFromDocument', node, false);
  registered.splice(idx, 1);
  data.splice(idx, 1);
};
var processOutstandingTriggers = function () {
  var newOutstanding = [];
  for (var i = 0; i < outstanding.length;i ++) {
    var node = outstanding[i];
    processTrigger(node);
    if (registered.indexOf(node) == -1) {
      newOutstanding.push(node);
    }
  }
  outstanding = newOutstanding;
};
var processTriggers = function (parent) {
  var nodes = parent.querySelectorAll('*|trigger');
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.nodeType == Node.ELEMENT_NODE && node.namespaceURI == epubNS) {
      processTrigger(node);
    }
  }
}
var domNodeInserted = function (event) {
  processTriggers(event.relatedNode);
  processOutstandingTriggers();
};
document.addEventListener('DOMNodeInserted', domNodeInserted, false);
processTriggers(document);
})()

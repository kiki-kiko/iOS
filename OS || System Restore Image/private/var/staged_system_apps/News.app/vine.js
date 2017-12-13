var interval = null;
var expectedMessages = [];

// Check if the DOM tree changes, to search for the vine
document.body.addEventListener('DOMSubtreeModified', function() {
  if (expectedMessages.indexOf('vine-rendered') == -1) {
    // Send expected call
    window.webkit.messageHandlers.ANFExpect.postMessage('vine-rendered');

    // Keep track of the registered calls
    expectedMessages.push('vine-rendered');
  }

  var vine = document.getElementsByClassName('loaded');
  if (vine.length > 0) {
    window.webkit.messageHandlers.ANFDone.postMessage({key: 'vine-rendered', height: vine[0].offsetHeight});
  }
}, false);

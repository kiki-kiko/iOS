var interval = null;  
var expectedMessages = [];

// Check if the DOM tree changes, to search for the facebook post
document.body.addEventListener('DOMSubtreeModified', function() {
  if (expectedMessages.indexOf('facebook-rendered') == -1) {
    // Send expected call
    window.webkit.messageHandlers.ANFExpect.postMessage('facebook-rendered'); 
    
    // Keep track of the registered calls
    expectedMessages.push('facebook-rendered');
  }
  
  // Get the main post div
  var facebookPost = document.getElementsByClassName('fb-post');
  if (facebookPost.length > 0 && interval == null) {
    
    // Poll the fb-xfbml-state every 10 ms to check for rendered changes
    interval = setInterval(function () {
      if (facebookPost[0].getAttribute('fb-xfbml-state') == 'rendered') {
        // Post a message to ANF, telling them we're done
        window.webkit.messageHandlers.ANFDone.postMessage({key: 'facebook-rendered', height: facebookPost[0].offsetHeight});
        
        // Clear the interval
        clearInterval(interval);
        
        // Stop the event listener, no longer needed
        document.body.removeEventListener('DOMSubtreeModified', arguments.callee);
      }
    }, 10);
  }
}, false); 
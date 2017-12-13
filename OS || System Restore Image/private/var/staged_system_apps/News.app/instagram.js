var interval = null;
var expectedMessages = [];

// Check if the DOM tree changes, to search for the instagram post
document.body.addEventListener('DOMSubtreeModified', function() {
  if (expectedMessages.indexOf('instagram-rendered') == -1) {
    // Send expected call
    window.webkit.messageHandlers.ANFExpect.postMessage('instagram-rendered'); 
    
    // Keep track of the registered calls
    expectedMessages.push('instagram-rendered');
  }

  // Get the main post iframe, when rederered
  var instagram = document.getElementsByClassName('instagram-media-rendered');
  
  if (instagram.length > 0) {
    // If the height is explicitly set, and the interval hasn't started yet
    if (instagram[0].height == 0 && interval == null) {
      
      // Poll the class until the height is set
      interval = setInterval(function () {
        if (instagram[0].height != 0) {
          // Post the final height to ANF
          window.webkit.messageHandlers.ANFDone.postMessage({key: "instagram-rendered", height: instagram[0].height});
         
          // Stop the interval
          clearInterval(interval);
          
          // Remove the event listener
          document.body.removeEventListener('DOMSubtreeModified', arguments.callee);
        }
      }, 10);
    }
  }
}, false);

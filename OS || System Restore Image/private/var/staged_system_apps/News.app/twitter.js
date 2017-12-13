var interval = null;

var registeredCardCall = false;
var expectedMessages = [];

// Check if the DOM tree changes, to search for the tweet
document.body.addEventListener('DOMSubtreeModified', function() {
  var tweet = document.getElementsByClassName('twitter-tweet-rendered');
  var card = document.getElementsByClassName('PrerenderedCard');
  
  // Register the expected calls
  if (tweet.length > 0 && expectedMessages.indexOf('tweet-rendered') == -1) {
    window.webkit.messageHandlers.ANFExpect.postMessage("tweet-rendered");    
    
    // Keep track of the registered calls
    expectedMessages.push('tweet-rendered');
  }
  if (card.length > 0 && expectedMessages.indexOf('card') == -1) {
    window.webkit.messageHandlers.ANFExpect.postMessage("card");

    // Keep track of the registered calls        
    expectedMessages.push('card');    
  }
  
  if (tweet.length > 0) {
    // select the target node
    if (tweet.length > 0 && tweet[0].style.height != '0px') {
      window.webkit.messageHandlers.ANFDone.postMessage({key: "tweet-rendered", height: tweet[0].style.height, width: tweet[0].offsetWidth});
      
      // When there is no card, we can remove the event listener
      if (expectedMessages.indexOf('card') != -1) {
        document.body.removeEventListener('DOMSubtreeModified', arguments.callee);
      }
    }
  }  
    
  // Start polling if the not already done
  if (card.length > 0 && interval == null) {
    interval = setInterval(function () {      
      // If the card is ready to display
      if (card[0].classList.contains('is-ready')) {
        // Post the final height to ANF
        window.webkit.messageHandlers.ANFDone.postMessage({key: "card", height: document.body.offsetHeight, width: document.body.offsetWidth});
        
        // Stop the timer
        clearInterval(interval);
        
        // Remove event listener
        document.body.removeEventListener('DOMSubtreeModified', arguments.callee);
      }
    }, 10);
  }
}, false);
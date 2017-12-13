//
//  Async.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class AsyncController {
    
    // MARK: - API
    
    invoke(callback) {
        _NativeBridge.sharedBridge.enqueueAsynchronousCallback(callback);
    }
    
}

this.Async = new AsyncController();

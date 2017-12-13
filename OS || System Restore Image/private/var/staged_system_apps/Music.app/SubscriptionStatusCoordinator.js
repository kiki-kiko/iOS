//
//  SubscriptionStatusCoordinator.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedSubscriptionStatusCoordinator extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.initiateSubscriptionStatusChange = function(self, options, requestIdentifier) {
            let completionHandler = function(segue) {
                _NativeBridge.sharedBridge.enqueueMethodInvocation(self, "registerSegueForSubscriptionStatusChange", [requestIdentifier, segue]);
            };
            let callback = self._state.onSubscriptionStatusChange;
            if (typeof(callback) == "function") {
                callback(options, completionHandler);
            }
            else {
                let segue = {};
                completionHandler(segue);
            }
        };
    }
    
    // MARK: - Properties
    
    get onSubscriptionStatusChange() { return this._state.onSubscriptionStatusChange; }
    set onSubscriptionStatusChange(value) { this._state.onSubscriptionStatusChange = value; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedSubscriptionStatusCoordinator);

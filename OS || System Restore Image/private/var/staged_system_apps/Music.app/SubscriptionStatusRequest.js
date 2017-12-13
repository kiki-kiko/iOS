//
//  SubscriptionStatusRequest.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SubscriptionStatusRequest extends BridgedObject {
    
    // MARK: - Properties
    
    get reason() { return this._state.reason; }
    set reason(value) {
        this._state.reason = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "reason", value);
    }
    
    get ignoreCache() { return this._state.ignoreCache; }
    set ignoreCache(value) {
        this._state.ignoreCache = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "ignoreCache", value);
    }
    
    get wantsPartialResults() { return this._state.wantsPartialResults; }
    set wantsPartialResults(value) {
        this._state.wantsPartialResults = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "wantsPartialResults", value);
    }
    
    get onResponse() { return this._state.onResponse; }
    set onResponse(value) { this._state.onResponse = value; }
    
    // MARK: - Methods
    
    send() {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "send", []);
    }
    
}

// MARK: - Types

SubscriptionStatusRequest.REASON = {
    DEEP_LINK: "deepLink",
};

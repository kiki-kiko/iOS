//
//  NativeExecutionFence.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class NativeExecutionFence extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.kind = NativeExecutionFence.KIND.REGULAR;
        this._state.handleCompletion = function(self, serializedDate) {
            const callback = self._state.onCompletion;
            if (typeof(callback) == "function") {
                delete self._state["onCompletion"];
                callback(new Date(serializedDate));
            }
        };
    }
    
    // MARK: - Properties
    
    get kind() { return this._state.kind; }
    set kind(value) {
        this._state.kind = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "kind", value);
    }
    
    get onCompletion() { return this._state.onCompletion; }
    set onCompletion(value) { this._state.onCompletion = value; }
    
    // MARK: - Methods
    
    register() {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "register", []);
    }
    
}

// MARK: - Types

NativeExecutionFence.KIND = {
    REGULAR:            "regular", 
    LAYOUT_COMPLETED:   "layoutCompleted", 
};


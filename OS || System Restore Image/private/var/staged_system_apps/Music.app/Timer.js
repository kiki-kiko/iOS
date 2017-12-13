//
//  Timer.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Timer extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.handleTimeout = function(self) {
            const callback = self._state.onTimeout;
            if (typeof(callback) == "function") {
                delete self._state["onTimeout"];
                callback();
            }
        };
    }
    
    // MARK: - Properties
    
    get delay() { return this._state.delay; }
    set delay(value) {
        this._state.delay = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "delay", value);
    }
    
    get onTimeout() { return this._state.onTimeout; }
    set onTimeout(value) { this._state.onTimeout = value; }
    
    // MARK: - Methods
    
    schedule() {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "schedule", []);
    }
    
    cancel() {
        delete this._state["onTimeout"];
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "cancel", []);
    }
    
}

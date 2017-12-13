//
//  MetricsController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedMetricsController extends BridgedObject {

    // MARK: - Object Lifecycle
 
    constructor() {
        super();
        this._state.completionHandlers = {};
        this._state.onMetricsTaskCompletion = function(self, token) {
            const completionHandler = self._state.completionHandlers[token];
            delete self._state.completionHandlers[token];
            if (typeof(completionHandler) == "function") {
                completionHandler();
            }
        };
        
        this._state.recordNativeEvent = function(self, event) {
            const callback = self.onRecordNativeEvent;
            if (typeof(callback) == "function") {
                callback(event)
            }
        }
    }
 
    // MARK: - Methods
    
    recordEvent(topic, properties, completionHandler) {
        let token = "";
        if (typeof(completionHandler) == "function") {
            token = UUID();
            this._state.completionHandlers[token] = completionHandler;
        }
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "recordEvent", [topic, properties, token]);
    }
    
    flushUnreportedEvents(completionHandler) {
        let token = "";
        if (typeof(completionHandler) == "function") {
            token = UUID();
            this._state.completionHandlers[token] = completionHandler;
        }
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "flushUnreportedEvents", [token]);
    }
    
    // MARK: - Callbacks
    
    get onRecordNativeEvent() { return this._state.onRecordNativeEvent; }
    set onRecordNativeEvent(value) {
        this._state.onRecordNativeEvent = value;
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedMetricsController);

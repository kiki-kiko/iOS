//
//  StorePlaybackPositionRequest.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class StorePlaybackPositionRequest extends BridgedObject {
    
    // MARK: - Properties
    
    get identifiers() { return this._state.identifiers; }
    set identifiers(value) {
        this._state.identifiers = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "identifiers", value);
    }
    
    get onResponse() { return this._state.onResponse; }
    set onResponse(value) { this._state.onResponse = value; }
    
    // MARK: - Methods
    
    send() {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "send", []);
    }
    
    cancel() {
        delete this._state["onResponse"];
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "cancel", []);
    }
}

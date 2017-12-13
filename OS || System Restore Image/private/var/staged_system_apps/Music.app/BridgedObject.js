//
//  BridgedObject.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor({ _shouldSkipObjectConstructionWithNativeBridge = false } = {}) {
        this._state = {
            nativeBridgeIdentifier: undefined, 
        };
        if (!_shouldSkipObjectConstructionWithNativeBridge) {
            _NativeBridge.sharedBridge.enqueueObjectConstruction(this);
        }
    }
    
}

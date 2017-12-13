//
//  PushSegue.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class PushSegue extends Segue {
    
    // MARK: - Properties
    
    get componentController() { return this._state.componentController; }
    set componentController(value) {
        this._state.componentController = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "componentController", value);
    }
    
}

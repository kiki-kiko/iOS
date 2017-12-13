//
//  ContextAction.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class ContextAction extends BridgedObject {
    
    // MARK: - Properties
    
    get kind() { return this._state.kind; }
    set kind(value) {
        this._state.kind = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "kind", value);
    }
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
}

// MARK: - Types

ContextAction.KIND = {
HIDE_FROM_PROFILE:  "hideFromProfile",
SHOW_ON_PROFILE:    "showOnProfile",
};

_SegueCoordinator.addSupportedSegue(ContextAction, Segue.TYPES.SELECT);


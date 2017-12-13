//
//  InlinePopupButton.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class InlinePopupButton extends BridgedObject {
    
    // MARK: - API
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
}

_SegueCoordinator.addSupportedSegue(InlinePopupButton, Segue.TYPES.SELECT);

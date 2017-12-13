//
//  SettingsLink.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SettingsLink extends BridgedObject {
    
    // MARK: - Properties
    
    get text() { return this._state.text; }
    set text(value) {
        this._state.text = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "text", value);
    }
    
}

_SegueCoordinator.addSupportedSegue(SettingsLink, Segue.TYPES.SELECT);

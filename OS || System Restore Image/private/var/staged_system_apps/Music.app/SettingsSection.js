//
//  SettingsSection.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SettingsSection extends BridgedObject {
    
    // MARK: - Properties
    
    get headerText() { return this._state.headerText; }
    set headerText(value) {
        this._state.headerText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "headerText", value);
    }
    
    get footerText() { return this._state.footerText; }
    set footerText(value) {
        this._state.footerText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "footerText", value);
    }
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
}

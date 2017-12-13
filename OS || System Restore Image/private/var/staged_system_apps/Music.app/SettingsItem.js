//
//  SettingsItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SettingsItem extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.kind = SettingsItem.KIND.DEFAULT;
    }
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get kind() { return this._state.kind; }
    set kind(value) {
        this._state.kind = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "kind", value);
    }
    
    get usesApplicationTintColor() { return this._state.usesApplicationTintColor; }
    set usesApplicationTintColor(value) {
        this._state.usesApplicationTintColor = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "usesApplicationTintColor", value);
    }
    
    get isToggleable() { return this._state.isToggleable; }
    set isToggleable(value) {
        this._state.isToggleable = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isToggleable", value);
    }
    
    get isToggled() { return this._state.isToggled; }
    set isToggled(value) {
        this._state.isToggled = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isToggled", value);
    }
    
    get hasChevron() { return this._state.hasChevron; }
    set hasChevron(value) {
        this._state.hasChevron = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "hasChevron", value);
    }
    
}

_SegueCoordinator.addSupportedSegue(SettingsItem, Segue.TYPES.SELECT);

// MARK: - Types

SettingsItem.KIND = {
    DEFAULT: "default", 
    SIGN_OUT: "signOut",
};

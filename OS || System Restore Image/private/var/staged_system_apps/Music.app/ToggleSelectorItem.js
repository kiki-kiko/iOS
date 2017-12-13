//
//  ToggleSelectorItem.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class ToggleSelectorItem extends BaseItem {
    
    // MARK: - Properties
    
    get titleText() { return this._state.title; }
    set titleText(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "titleText", value);
    }
    
    get subtitleText() { return this._state.subtitleText; }
    set subtitleText(value) {
        this._state.subtitleText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "subtitleText", value);
    }
    
    get isToggled() { return this._state.isToggled; }
    set isToggled(value) {
        this._state.isToggled = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isToggled", value);
    }
}

//
//  InlinePopup.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class InlinePopup extends ViewModel {
    
    // MARK: - API
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get message() { return this._state.message; }
    set message(value) {
        this._state.message = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "message", value);
    }
    
    get button() { return this._state.button; }
    set button(value) {
        this._state.button = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "button", value);
    }
    
    get childViewModel() { return this._state.childViewModel; }
    set childViewModel(value) {
        this._state.childViewModel = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "childViewModel", value);
    }
    
    get onCloseButtonSelectionPerformed() { return this._state.onCloseButtonSelectionPerformed; }
    set onCloseButtonSelectionPerformed(callback) { this._state.onCloseButtonSelectionPerformed = callback; }
    
}

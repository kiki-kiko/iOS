//
//  ToggleSelectorViewModel.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class ToggleSelectorViewModel extends ViewModel {
    
    // MARK: - API
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
    get footerText() { return this._state.footerText; }
    set footerText(value) {
        this._state.footerText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "footerText", value);
    }
}

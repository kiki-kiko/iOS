//
//  BadgingItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BadgingItem extends BaseItem {
    
    // MARK: - API
    
    get wantsTextBorderized() { return this._state.wantsTextBorderized; }
    set wantsTextBorderized(value) {
        this._state.wantsTextBorderized = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "wantsTextBorderized", value);
    }
    
    get text() { return this._state.text; }
    set text(value) {
        this._state.text = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "text", value);
    }
}

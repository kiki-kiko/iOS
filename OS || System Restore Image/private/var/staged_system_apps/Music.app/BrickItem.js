//
//  BrickItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BrickItem extends BaseItem {
    
    // MARK: - Properties

    get headline() { return this._state.headline; }
    set headline(value) {
        this._state.headline = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "headline", value);
    }
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get subtitle() { return this._state.subtitle; }
    set subtitle(value) {
        this._state.subtitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "subtitle", value);
    }
    
}

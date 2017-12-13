//
//  OrderedPlaylistSelectorItem.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class OrderedPlaylistSelectorItem extends BaseItem {
    
    // MARK: - API
    
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
    
    get isSelected() { return this._state.isSelected; }
    set isSelected(value) {
        this._state.isSelected = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isSelected", value);
    }
    
}

//
//  OrderedPlaylistSelector.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class OrderedPlaylistSelector extends ViewModel {
    
    // MARK: - API
    
    get selectedItems() { return this._state.selectedItems; }
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }    
}

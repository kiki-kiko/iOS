//
//  GroupedTextListItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class GroupedTextListItem extends BaseItem {
    
    // MARK: - API
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
}

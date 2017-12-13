//
//  ItemizedTextListItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ItemizedTextListItem extends BaseItem {
    
    // MARK: - API
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get wantsTitleAsBadge() { return this._state.wantsTitleAsBadge; }
    set wantsTitleAsBadge(value) {
        this._state.wantsTitleAsBadge = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "wantsTitleAsBadge", value);
    }
    
    get text() { return this._state.text; }
    set text(value) {
        this._state.text = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "text", value);
    }
    
    get wantsLeadingLineBreak() { return this._state.wantsLeadingLineBreak; }
    set wantsLeadingLineBreak(value) {
        this._state.wantsLeadingLineBreak = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "wantsLeadingLineBreak", value);
    }
    
}

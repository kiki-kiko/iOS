//
//  SocialProfileCollection.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class SocialProfileCollection extends ViewModel {
    
    // MARK: - API
    
    get collectionStyle() { return this._state.collectionStyle; }
    set collectionStyle(value) {
        this._state.collectionStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "collectionStyle", value);
    }
    
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
    
    // MARK: - Methods
    
    appendItems(items) {
        for (const item of items) {
            this._state.items.push(item);
        }
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "appendItems", [items]);
    }
    
}

// MARK: - Types

SocialProfileCollection.COLLECTION_STYLE = {
    DEFAULT: "default",
    FOLLOW_REQUESTS: "followRequests",
    EDIT: "edit",
};

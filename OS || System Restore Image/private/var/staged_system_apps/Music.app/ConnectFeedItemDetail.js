//
//  ConnectFeedItemDetail.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeedItemDetail extends ViewModel {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.items = [];
    }
    
    // MARK: - Properties
    
    get feedItem() { return this._state.feedItem; }
    set feedItem(value) {
        this._state.feedItem = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "feedItem", value);
    }
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
    get shouldDisplayCommentFlow() { return this._state.shouldDisplayCommentFlow; }
    set shouldDisplayCommentFlow(value) {
        this._state.shouldDisplayCommentFlow = value
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "shouldDisplayCommentFlow", value);
    }
    
    get allowsComments() { return this._state.allowsComments; }
    set allowsComments(value) {
        this._state.allowsComments = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "allowsComments", value);
    }
    
    get onNeedsAdditionalItems() { return this._state.onNeedsAdditionalItems; }
    set onNeedsAdditionalItems(value) { this._state.onNeedsAdditionalItems = value; }
    
    // MARK: - Methods
    
    appendItems(items) {
        for (const item of items) {
            this._state.items.push(item);
        }
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "appendItems", [items]);
    }
    
    prependItems(items) {
        for (const item of items) {
            this._state.items.unshift(item);
        }
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "prependItems", [items]);
    }
}

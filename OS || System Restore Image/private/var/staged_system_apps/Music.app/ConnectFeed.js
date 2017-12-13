//
//  ConnectFeed.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeed extends ViewModel {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.items = [];
    }
    
    // MARK: - Properties
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
    get onNeedsAdditionalItems() { return this._state.onNeedsAdditionalItems; }
    set onNeedsAdditionalItems(value) { this._state.onNeedsAdditionalItems = value; }
    
    get allowsComments() { return this._state.allowsComments; }
    set allowsComments(value) {
        this._state.allowsComments = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "allowsComments", value);
    }
    
    get showsFollowingHeaderLink() { return this._state.showsFollowingHeaderLink; }
    set showsFollowingHeaderLink(value) {
        this._state.showsFollowingHeaderLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "showsFollowingHeaderLink", value);
    }
    
    get headerText() { return this._state.headerText; }
    set headerText(value) {
        this._state.headerText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "headerText", value);
    }
    
    get coldStartDetailText() { return this._state.coldStartDetailText; }
    set coldStartDetailText(value) {
        this._state.coldStartDetailText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "coldStartDetailText", value);
    }
    
    get coldStartButtonText() { return this._state.coldStartButtonText; }
    set coldStartButtonText(value) {
        this._state.coldStartButtonText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "coldStartButtonText", value);
    }
    
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


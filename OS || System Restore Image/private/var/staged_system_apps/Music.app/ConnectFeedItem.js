//
//  ConnectFeedItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeedItem extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        if (typeof(onSelect) == "function") {
            this.onSelect = onSelect;
        }
        
        if (typeof(onDelete) == "function") {
            this.onDelete = onDelete;
        }
        
        this._state.registerLinks = function(self, links) {
            const callback = self.onAddLink;
            if (typeof(callback) == "function") {
                for (const link of links) {
                    callback(link);
                }
            }
        };
    }
    
    // MARK: - Properties
    
    get id() { return this._state.id; }
    set id(value) {
        this._state.id = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "postID", value);
    }
    
    get message() { return this._state.message; }
    set message(value) {
        this._state.message = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "text", value);
    }
    
    get dateCreated() { return this._state.dateCreated; }
    set dateCreated(value) {
        this._state.dateCreated = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "timestamp", value);
    }
    
    get owner() { return this._state.owner; }
    set owner(value) {
        this._state.owner = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "owner", value);
    }
    
    get admin() { return this._state.admin; }
    set admin(value) {
        this._state.admin = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "admin", value);
    }
    
    get contentItemStorePlatformDictionary() {
        if (this.contentItem) {
            return this.contentItem.storePlatformDictionary;
        }
        return undefined;
    }
    
    set contentItemStorePlatformDictionary(value) {
        if (!this.contentItem) {
            this.contentItem = new ConnectFeedContentItem();
        }
        this.contentItem.storePlatformDictionary = value;
    }
    
    get contentItem() { return this._state.contentItem; }
    set contentItem(value) {
        this._state.contentItem = value
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "contentItem", value);
    }
    
    get likeCount() { return this._state.likeCount; }
    set likeCount(value) {
        this._state.likeCount = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "numberOfLikes", value);
    }
    
    get playCount() { return this._state.playCount; }
    set playCount(value) {
        this._state.playCount = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "numberOfPlays", value);
    }
    
    get commentCount() { return this._state.commentCount; }
    set commentCount(value) {
        this._state.commentCount = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "numberOfComments", value);
    }
    
    get likeState() { return this._state.likeState; }
    set likeState(value) {
        this._state.likeState = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "likeState", value);
    }
    
    get links() { return this._state.links; }
    
    get onAddLink() { return this._state.onAddLink; }
    set onAddLink(value) {
        this._state.onAddLink = value;
    }
    
    get onDelete() { return this._state.onDelete; }
    set onDelete(value) {
        this._state.onDelete = value;
    }
    
}

_SegueCoordinator.addSupportedSegue(ConnectFeedItem, Segue.TYPES.SELECT);

ConnectFeed.LIKE_STATE = {
    LIKED: "liked",
    NOT_LIKED: "notLiked",
};

ConnectFeed.LINK_TYPE = {
    MENTION: "mention",
    URL: "url",
    COMMENT: "comment",
}

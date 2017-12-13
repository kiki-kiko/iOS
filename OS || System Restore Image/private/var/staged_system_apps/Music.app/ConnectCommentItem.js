//
//  ConnectCommentItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectCommentItem extends BridgedObject {

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
}

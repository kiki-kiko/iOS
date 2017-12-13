//
//  ConnectFeedItemLikeRequest.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeedItemLikeRequest extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.feedItem = attributes.feedItem;
        this._state.likeState = attributes.likeState;
    }
    
    // MARK: - Properties
    
    get feedItem() { return this._state.feedItem; }
    
    get likeState() { return this._state.likeState; }
    
    // MARK: - Methods
    
    perform() {
        // Subclasses should perform the request and then call "handleResponse".
    }
    
    handleResponse(result, error) {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "_handleResponse", [result, error]);
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(ConnectFeedItemLikeRequest);

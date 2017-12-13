//
//  ConnectFeedItemCommentRequest.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeedItemCommentRequest extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.feedItemDetail = attributes.feedItemDetail;
        this._state.requestType = attributes.requestType;
        this._state.requestText = attributes.requestText;
        this._state.authorIdentifier = attributes.authorIdentifier;
        this._state.authorEntityType = attributes.authorEntityType;
        this._state.commentId = attributes.commentId;
    }
    
    // MARK: - Properties
    
    get feedItemDetail() { return this._state.feedItemDetail; }
    
    get commentId() { return this._state.commentId; }
    
    get requestType() { return this._state.requestType; }
    
    get requestText() { return this._state.requestText; }
    
    get authorIdentifier() { return this._state.authorIdentifier; }
    
    get authorEntityType() { return this._state.authorEntityType; }
    
    // MARK: - Methods
    
    perform() {
        // Subclasses should perform the request and then call "handleResponse".
    }
    
    handleResponse(result, error) {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "_handleResponse", [result, error]);
    }
    
}

ConnectFeedItemCommentRequest.REQUEST_TYPE = {
    ADD: "add",
    DELETE: "delete",
    REPORT: "report",
};

_NativeBridge.sharedBridge.registerBridgedConstructor(ConnectFeedItemLikeRequest);

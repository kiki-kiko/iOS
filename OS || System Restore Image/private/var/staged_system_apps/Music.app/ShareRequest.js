//
//  ShareRequest.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ShareRequest extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.contentDictionary = attributes.contentDictionary;
        this._state.shareType = attributes.shareType;
        this._state.contentType = attributes.contentType
        this._state.activityIdentifier = attributes.activityIdentifier;
    }
    
    // MARK: - Properties
    
    get shareType() { return this._state.shareType; }
    
    get activityIdentifier() { return this._state.activityIdentifier; }
    
    get contentDictionary() { return this._state.contentDictionary; }
    
    get contentType() { return this._state.contentType; }
    
    // MARK: - Methods
    
    perform() {
        // Subclasses should perform the request and then call "handleResponse".
    }
    
    handleResponse(result, error) {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "_handleResponse", [result, error]);
    }
}

ShareRequest.CONTENT_TYPES = {
    STORE_PLATFORM: "storePlatform",
    CONNECT_FEED_ITEM: "connectFeedItem",
    SOCIAL_INVITATION: "socialInvitation",
};

ShareRequest.SHARE_TYPES = {
    MESSAGES: "messages",
    MAIL: "mail",
    COPY: "copy",
    FACEBOOK: "facebook",
    TWITTER: "twitter",
    AIRDROP: "airdrop",
    TENCENT_WEIBO: "tencentWeibo",
    SINA_WEIBO: "sinaWeibo",
    OTHER: "other",
};

_NativeBridge.sharedBridge.registerBridgedConstructor(ShareRequest);


//
//  SocialProfile.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class SocialProfile extends BaseItem {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
    }
    
    // MARK: - API
    
    get editProfileLink() { return this._state.editProfileLink; }
    set editProfileLink(value) {
        this._state.editProfileLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "editProfileLink", value);
    }
    
    get hasRequestedToFollowCurrentUser() { return this._state.hasRequestedToFollowCurrentUser; }
    set hasRequestedToFollowCurrentUser(value) {
        this._state.hasRequestedToFollowCurrentUser = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "hasRequestedToFollowCurrentUser", value);
    }
    
    get followeeStates() { return this._state.followeeStates; }
    set followeeStates(value) {
        this._state.followeeStates = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "followeeStates", value);
    }
    
    get followState() { return this._state.followState; }
    set followState(value) {
        this._state.followState = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "followState", value);
    }
    
    get pendingRequestsCount() { return this._state.pendingRequestsCount; }
    set pendingRequestsCount(value) {
        this._state.pendingRequestsCount = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "pendingRequestsCount", value);
    }
        
}

// MARK: - Types

SocialProfile.FOLLOW_STATE = {
    SELF:                   "self",
    NOT_FOLLOWABLE:         "notFollowable",
    NOT_FOLLOWING:          "notFollowing",
    REQUESTED:              "requested",
    FOLLOWING:              "following",
    BLOCKED:                "blocked",
};

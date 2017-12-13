//
//  Account.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedAccount extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.updateWithUserProfile = function(self, userProfile) {
            const userProfileOrUndefined = userProfile || undefined;
            self._state.userProfile = userProfileOrUndefined;
            
            const callback = self.onUserProfileChange;
            if (typeof(callback) == "function") {
                callback(userProfileOrUndefined);
            }
        };
    }
    
    // MARK: - Properties
    
    // A unique identifier for this account. Currently the DSID.
    get uniqueIdentifier() { return this._state.uniqueIdentifier; }
    
    get userProfile() { return this._state.userProfile; }
    get onUserProfileChange() { return this._state.onUserProfileChange; }
    set onUserProfileChange(value) { this._state.onUserProfileChange = value; }
    
    get userSocialProfile() { return this._state.userSocialProfile; }
    set userSocialProfile(value) {
        this._state.userSocialProfile = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "userSocialProfile", value);
    }
    
    // MARK: - Methods
    
    reloadUserProfileIfNeeded() {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "reloadUserProfileIfNeeded", []);
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedAccount);

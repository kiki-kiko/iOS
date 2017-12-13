//
//  SocialOnboardingFriendsFinder.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class SocialOnboardingFriendsFinder extends ViewModel {
    
    // MARK: - API
    
    get networks() { return this._state.networks; }
    set networks(value) {
        this._state.networks = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "networks", value);
    }
    
    get selectedFriendIdentifiers() { return this._state.selectedFriendIdentifiers; }
    
}

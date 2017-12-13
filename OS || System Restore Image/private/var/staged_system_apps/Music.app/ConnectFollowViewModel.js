//
//  ConnectFollowViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFollowViewModel extends ViewModel {
    // MARK: - Properties
    
    get mode() { return this._state.mode; }
    set mode(value) {
        this._state.mode = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "mode", value);
    }
    
}

ConnectFollowViewModel.MODE = {
    FOLLOWING: "following",
    RECOMMENDATIONS: "recommendations",
};

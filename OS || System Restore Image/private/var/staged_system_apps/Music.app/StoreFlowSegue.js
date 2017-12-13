//
//  StoreFlowSegue.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class StoreFlowSegue extends Segue {
    
    // MARK: - Properties
    
    get url() { return this._state.url; }
    set url(value) {
        this._state.url = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "url", value);
    }
    
    get sourceApplicationBundleIdentifier() { return this._state.sourceApplicationBundleIdentifier; }
    set sourceApplicationBundleIdentifier(value) {
        this._state.sourceApplicationBundleIdentifier = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "sourceApplicationBundleIdentifier", value);
    }
    
    get referrerURL() { return this._state.referrerURL; }
    set referrerURL(value) {
        this._state.referrerURL = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "referrerURL", value);
    }
    
    get userInfo() { return this._state.userInfo; }
    set userInfo(value) {
        this._state.userInfo = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "userInfo", value);
    }
    
}

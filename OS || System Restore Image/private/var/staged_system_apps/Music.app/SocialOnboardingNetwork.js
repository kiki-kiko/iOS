//
//  SocialOnboardingNetwork.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class SocialOnboardingNetwork extends BridgedObject {
    
    // MARK: - API
    
    get artwork() { return this._state.artwork; }
    set artwork(value) {
        this._state.artwork = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "artwork", value);
    }
    
    get identifier() { return this._state.identifier; }
    set identifier(value) {
        this._state.identifier = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "identifier", value);
    }
    
    get name() { return this._state.name; }
    set name(value) {
        this._state.name = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "name", value);
    }
    
    get authURL() { return this._state.authURL; }
    set authURL(value) {
        this._state.authURL = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "authURL", value);
    }
    
    get redirectURL() { return this._state.redirectURL; }
    set redirectURL(value) {
        this._state.redirectURL = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "redirectURL", value);
    }
    
    get authProtocol() { return this._state.authProtocol; }
    set authProtocol(value) {
        this._state.authProtocol = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "authProtocol", value);
    }
    
    get authenticated() { return this._state.authenticated; }
    set authenticated(value) {
        this._state.authenticated = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "authenticated", value);
    }
    
}

SocialOnboardingNetwork.AUTH_PROTOCOL = {
    OAUTH_VERSION_2:    "OAuth2.0",
};

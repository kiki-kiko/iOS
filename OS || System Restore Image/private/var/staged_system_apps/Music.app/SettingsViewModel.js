//
//  SettingsViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SettingsViewModel extends ViewModel {
    
    // MARK: - Properties
    
    get sectionsForAuthenticatedState() { return this._state.sectionsForAuthenticatedState; }
    set sectionsForAuthenticatedState(value) {
        this._state.sectionsForAuthenticatedState = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "sectionsForAuthenticatedState", value);
    }
    
    get sectionsForUnauthenticatedState() { return this._state.sectionsForUnauthenticatedState; }
    set sectionsForUnauthenticatedState(value) {
        this._state.sectionsForUnauthenticatedState = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "sectionsForUnauthenticatedState", value);
    }
    
    get sectionsForNoAuthentication() { return this._state.sectionsForNoAuthentication; }
    set sectionsForNoAuthentication(value) {
        this._state.sectionsForNoAuthentication = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "sectionsForNoAuthentication", value);
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(SettingsViewModel);

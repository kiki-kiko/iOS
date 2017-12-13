//
//  SettingsAuthenticationSection.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SettingsAuthenticationSection extends BridgedObject {
    
    // MARK: - Properties
    
    get identifierLabelText() { return this._state.identifierLabelText; }
    set identifierLabelText(value) {
        this._state.identifierLabelText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "identifierLabelText", value);
    }
    
    get identifierFieldPlaceholder() { return this._state.identifierFieldPlaceholder; }
    set identifierFieldPlaceholder(value) {
        this._state.identifierFieldPlaceholder = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "identifierFieldPlaceholder", value);
    }
    
    get passwordLabelText() { return this._state.passwordLabelText; }
    set passwordLabelText(value) {
        this._state.passwordLabelText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "passwordLabelText", value);
    }
    
    get passwordFieldPlaceholder() { return this._state.passwordFieldPlaceholder; }
    set passwordFieldPlaceholder(value) {
        this._state.passwordFieldPlaceholder = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "passwordFieldPlaceholder", value);
    }
    
    get submitButtonText() { return this._state.submitButtonText; }
    set submitButtonText(value) {
        this._state.submitButtonText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "submitButtonText", value);
    }
    
    get forgotCredentialsLink() { return this._state.forgotCredentialsLink; }
    set forgotCredentialsLink(value) {
        this._state.forgotCredentialsLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "forgotCredentialsLink", value);
    }
    
}

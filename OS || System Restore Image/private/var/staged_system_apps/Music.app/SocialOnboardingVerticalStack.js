//
//  SocialOnboardingVerticalStack.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class SocialOnboardingVerticalStack extends ViewModel {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.didFinishEditingProfile = function(self) {
            const callback = self.onEditProfileFinished;
            if (typeof(callback) == "function") {
                callback();
            }
        };
    }
    
    // MARK: - API
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get nextStepButton() { return this._state.nextStepButton; }
    set nextStepButton(value) {
        this._state.nextStepButton = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "nextStepButton", value);
    }
    
    get cancelStepButton() { return this._state.cancelStepButton; }
    set cancelStepButton(value) {
        this._state.cancelStepButton = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "cancelStepButton", value);
    }
    
    get childViewModels() { return this._state.childViewModels; }
    set childViewModels(value) {
        this._state.childViewModels = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "childViewModels", value);
    }
    
    get isEditing() { return this._state.isEditing; }
    set isEditing(value) {
        this._state.isEditing = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isEditing", value);
    }
    
    get pinnedButtonsHeaderText() { return this._state.pinnedButtonsHeaderText; }
    set pinnedButtonsHeaderText(value) {
        this._state.pinnedButtonsHeaderText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "pinnedButtonsHeaderText", value);
    }
    
    get pinnedButtonsFooterText() { return this._state.pinnedButtonsFooterText; }
    set pinnedButtonsFooterText(value) {
        this._state.pinnedButtonsFooterText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "pinnedButtonsFooterText", value);
    }
    
    get requiresValidation() { return this._state.requiresValidation; }
    set requiresValidation(value) {
        this._state.requiresValidation = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "requiresValidation", value);
    }
    
    get onEditProfileFinished() { return this._state.onEditProfileFinished; }
    set onEditProfileFinished(value) { this._state.onEditProfileFinished = value; }
}

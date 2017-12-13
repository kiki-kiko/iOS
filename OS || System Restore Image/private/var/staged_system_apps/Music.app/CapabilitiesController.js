//
//  CapabilitiesController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedCapabilitiesController extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();

        this._state.hasUserRequestedSubscriptionHidden = attributes.hasUserRequestedSubscriptionHidden;
        this._state.canShowConnect = attributes.canShowConnect;
        this._state.canShowRadio = attributes.canShowRadio;
        this._state.canShowSubscriptionContent = attributes.canShowSubscriptionContent;
        this._state.isCloudLibraryEnabled = attributes.isCloudLibraryEnabled;
        this._state.areNotificationsEnabled = attributes.areNotificationsEnabled;

        this._state.updateHasUserRequestedSubscriptionHidden = function(self, hasUserRequestedSubscriptionHidden) {
            self._state.hasUserRequestedSubscriptionHidden = hasUserRequestedSubscriptionHidden;
            
            const callback = self.onHasUserRequestedSubscriptionHiddenChange;
            if (typeof(callback) == "function") {
                callback(hasUserRequestedSubscriptionHidden);
            }
        };
        
        this._state.updateCanShowConnect = function(self, canShowConnect) {
            self._state.canShowConnect = canShowConnect;
            
            const callback = self.onCanShowConnectChange;
            if (typeof(callback) == "function") {
                callback(canShowConnect);
            }
        };
        
        this._state.updateCanShowRadio = function(self, canShowRadioContent) {
            self._state.canShowRadioContent = canShowRadioContent;
            
            const callback = self.onCanShowRadioChange;
            if (typeof(callback) == "function") {
                callback(canShowRadioContent);
            }
        };
        
        this._state.updateCanShowSubscriptionContent = function(self, canShowSubscriptionContent) {
            self._state.canShowSubscriptionContent = canShowSubscriptionContent;
            
            const callback = self.onCanShowSubscriptionContentChange;
            if (typeof(callback) == "function") {
                callback(canShowSubscriptionContent);
            }
        };
        
        this._state.updateCloudLibraryEnabled = function(self, isCloudLibraryEnabled) {
            self._state.isCloudLibraryEnabled = isCloudLibraryEnabled;
            
            const callback = self.onCloudLibraryEnabledChange;
            if (typeof(callback) == "function") {
                callback(isCloudLibraryEnabled);
            }
        };
        
        this._state.updateAreNotificationsEnabled = function(self, areNotificationsEnabled) {
            self._state.areNotificationsEnabled = areNotificationsEnabled;
            
            const callback = self.onNotificationsEnabledCallback;
            if (typeof(callback) == "function") {
                callback(areNotificationsEnabled);
            }
        }
    }
    
    // MARK: - Properties
    
    get hasUserRequestedSubscriptionHidden() { return this._state.hasUserRequestedSubscriptionHidden; }
    set hasUserRequestedSubscriptionHidden(value) {
        this._state.hasUserRequestedSubscriptionHidden = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "hasUserRequestedSubscriptionHidden", value);
    }
    get onHasUserRequestedSubscriptionHiddenChange() { return this._state.onHasUserRequestedSubscriptionHiddenChange; }
    set onHasUserRequestedSubscriptionHiddenChange(value) {
        this._state.onHasUserRequestedSubscriptionHiddenChange = value;
    }
    
    get canShowConnect() { return this._state.canShowConnect; }

    get onCanShowConnectChange() { return this._state.onCanShowConnectChange; }
    set onCanShowConnectChange(value) {
        this._state.onCanShowConnectChange = value;
    }
    
    get canShowRadio() { return this._state.canShowRadio; }
    
    get onCanShowRadioChange() { return this._state.onCanShowRadioChange; }
    set onCanShowRadioChange(value) {
        this._state.onCanShowRadioChange = value;
    }
    
    get canShowSubscriptionContent() { return this._state.canShowSubscriptionContent; }
    
    get onCanShowSubscriptionContentChange() { return this._state.onCanShowSubscriptionContentChange; }
    set onCanShowSubscriptionContentChange(value) {
        this._state.onCanShowSubscriptionContentChange = value;
    }
    
    get isCloudLibraryEnabled() { return this._state.isCloudLibraryEnabled; }
    
    get areNotificationsEnabled() { return this._state.areNotificationsEnabled; }
    
    get onNotificationsEnabledChange() { return this._state.onNotificationsEnabledChange; }
    set onNotificationsEnabledChange(value) {
        this._state.onNotificationsEnabledChange = value;
    }
    
    get onCloudLibraryEnabledChange() { return this._state.onCloudLibraryEnabledChange; }
    set onCloudLibraryEnabledChange(value) {
        this._state.onCloudLibraryEnabledChange = value;
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedCapabilitiesController);

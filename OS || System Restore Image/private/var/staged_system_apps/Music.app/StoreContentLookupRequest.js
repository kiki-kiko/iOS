//
//  StoreContentLookupRequest.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class StoreContentLookupRequest extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super(...arguments);
        
        this._state.personalizationStyle = StoreContentLookupRequest.PERSONALIZATION_STYLE.NEVER;
    }
    
    // MARK: - Properties
    
    get identifiers() { return this._state.identifiers; }
    set identifiers(value) {
        this._state.identifiers = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "identifiers", value);
    }
    
    get timeoutInterval() { return this._state.timeoutInterval; }
    set timeoutInterval(value) {
        this._state.timeoutInterval = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "timeoutInterval", value);
    }
    
    get profile() { return this._state.profile; }
    set profile(value) {
        this._state.profile = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "profile", value);
    }
    
    get onResponse() { return this._state.onResponse; }
    set onResponse(value) { this._state.onResponse = value; }
    
    get personalizationStyle() { return this._state.personalizationStyle; }
    set personalizationStyle(value) {
        this._state.personalizationStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "personalizationStyle", value);
    }
    
    get platform() { return this._state.platform; }
    set platform(value) {
        this._state.platform = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "platform", value);
    }
    
    get shouldIgnoreCache() { return this._state.shouldIgnoreCache; }
    set shouldIgnoreCache(value) {
        this._state.shouldIgnoreCache = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "shouldIgnoreCache", value);
    }
    
    // MARK: - Methods
    
    send() {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "send", []);
    }
    
    cancel() {
        delete this._state["onResponse"];
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "cancel", []);
    }
    
}

// MARK: - Types

StoreContentLookupRequest.PERSONALIZATION_STYLE = {
    // Do not personalize results
    NEVER: "never", 
    // Personalize if able to do so without prompting for credentials
    SILENT: "silent", 
    // Personalize even if must prompt for credentials
    ALWAYS: "always", 
};

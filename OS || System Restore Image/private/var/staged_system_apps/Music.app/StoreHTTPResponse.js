//
//  StoreHTTPResponse.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class StoreHTTPResponse extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.status = attributes.status;
        this._state.output = attributes.output;
        this._state.performanceMetrics = attributes.performanceMetrics;
        this._state.propertyListHandlingType = attributes.propertyListHandlingType;
        this._state.didFailAuthenticationAttempt = attributes.didFailAuthenticationAttempt;
    }
    
    // MARK: - Properties
    
    get status() { return this._state.status; }
    get output() { return this._state.output; }
    get performanceMetrics() { return this._state.performanceMetrics; }
    get propertyListHandlingType() { return this._state.propertyListHandlingType; }
    get didFailAuthenticationAttempt() { return this._state.didFailAuthenticationAttempt; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(StoreHTTPResponse);

// MARK: - Types

StoreHTTPResponse.PROPERTY_LIST_HANDLING_TYPE = {
    SIGN_OUT:   "signOut", 
    DIALOG:     "dialog", 
};

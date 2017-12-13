//
//  Cookie.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Cookie extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.configureWithNativeProperties = function(self, nativeProperties) {
            for (let key of Object.keys(nativeProperties)) {
                let value = nativeProperties[key];
                switch (key) {
                    case "expirationDate":
                        if (typeof(value) == "string") {
                            value = new Date(value);
                        }
                        break;
                    default:
                        break;
                }
                self._state[key] = value;
            }
        };
    }
    
    // MARK: - Properties
    
    get name() { return this._state.name; }
    set name(value) {
        this._state.name = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "name", value);
    }
    
    get value() { return this._state.value; }
    set value(updatedValue) {
        this._state.value = updatedValue;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "value", updatedValue);
    }
    
    get originURL() { return this._state.originURL; }
    set originURL(value) {
        this._state.originURL = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "originURL", value);
    }
    
    get version() { return this._state.version; }
    set version(value) {
        this._state.version = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "version", value);
    }
    
    get domain() { return this._state.domain; }
    set domain(value) {
        this._state.domain = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "domain", value);
    }
    
    get path() { return this._state.path; }
    set path(value) {
        this._state.path = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "path", value);
    }
    
    get isSecure() { return this._state.isSecure; }
    set isSecure(value) {
        this._state.isSecure = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isSecure", value);
    }
    
    get comment() { return this._state.comment; }
    set comment(value) {
        this._state.comment = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "comment", value);
    }
    
    get commentURL() { return this._state.commentURL; }
    set commentURL(value) {
        this._state.commentURL = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "commentURL", value);
    }
    
    get isSessionOnly() { return this._state.isSessionOnly; }
    set isSessionOnly(value) {
        this._state.isSessionOnly = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isSessionOnly", value);
    }
    
    get maximumAge() { return this._state.maximumAge; }
    set maximumAge(value) {
        this._state.maximumAge = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "maximumAge", value);
    }
    
    get portList() { return this._state.portList; }
    set portList(value) {
        this._state.portList = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "portList", value);
    }
    
    get expirationDate() { return this._state.expirationDate; }
    set expirationDate(value) {
        this._state.expirationDate = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "expirationDate", value.toISOString());
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(Cookie);

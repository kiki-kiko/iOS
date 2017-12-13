//
//  CookieStorage.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class CookieStorage extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.defaultURL = attributes.defaultURL;
        this._state.pendingUpdateCompletionHandlers = {};
        
        this._state.updateIndexedCookies = function(self, indexedCookies) {
            self._state.activeCookiesForDefaultURL = indexedCookies;
            
            const callback = self.onActiveCookiesChangeForDefaultURL;
            if (typeof(callback) == "function") {
                callback(indexedCookies);
            }
        };
        
        this._state.pendingUpdateDidComplete = function(self, updateIdentifier) {
            const callback = self._state.pendingUpdateCompletionHandlers[updateIdentifier];
            if (typeof(callback) == "function") {
                delete self._state.pendingUpdateCompletionHandlers[updateIdentifier];
                callback();
            }
        };
    }
    
    // MARK: - Properties
    
    get activeCookiesForDefaultURL() { return this._state.activeCookiesForDefaultURL; }
    
    get defaultURL() { return this._state.defaultURL; }
    
    get onActiveCookiesChangeForDefaultURL() { return this._state.onActiveCookiesChangeForDefaultURL; }
    set onActiveCookiesChangeForDefaultURL(value) { this._state.onActiveCookiesChangeForDefaultURL = value; }
    
    // MARK: - Methods
    
    setCookie(cookie, completionHandler) {
        const updateIdentifier = UUID();
        if (typeof(completionHandler) == "function") {
            this._state.pendingUpdateCompletionHandlers[updateIdentifier] = completionHandler;
        }
        const updateRecord = {
            identifier: updateIdentifier, 
            type: "set", 
            cookie: cookie, 
        };
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "performUpdate", [updateRecord]);
    }
    
    deleteCookie(cookie, completionHandler) {
        const updateIdentifier = UUID();
        if (typeof(completionHandler) == "function") {
            this._state.pendingUpdateCompletionHandlers[updateIdentifier] = completionHandler;
        }
        const updateRecord = {
            identifier: updateIdentifier, 
            type: "delete", 
            cookie: cookie, 
        };
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "performUpdate", [updateRecord]);
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(CookieStorage);


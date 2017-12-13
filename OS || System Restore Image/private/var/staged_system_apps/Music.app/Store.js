//
//  Store.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedStore extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.updateWithBag = function(self, bag) {
            self._state.bag = bag;
            
            const callback = self.onBagChange;
            if (typeof(callback) == "function") {
                callback(bag);
            }
        };
        
        this._state.updateWithAccount = function(self, account, reason, requestIdentifier) {
            const accountOrUndefined = account || undefined;
            self._state.account = accountOrUndefined;
            
            let completionHandler = function(segue) {
                _NativeBridge.sharedBridge.enqueueMethodInvocation(self, "registerSegueForUpdateAccount", [requestIdentifier, segue]);
            };
            const callback = self.onAccountChange;
            if (typeof(callback) == "function") {
                callback(accountOrUndefined, reason, completionHandler);
            }
            else {
                let segue = {}
                completionHandler(segue)
            }
        };
        
        this._state.updateWithStoreFrontIdentifier = function(self, storeFrontIdentifier) {
            self._state.storeFrontIdentifier = storeFrontIdentifier;
            
            const callback = self.onStoreFrontIdentifierChange;
            if (typeof(callback) == "function") {
                callback(storeFrontIdentifier);
            }
        };
        
        this.ACCOUNT_CHANGE_REASON = {
            APPLICATION_LAUNCH: "applicationLaunch",
            UNIQUE_IDENTIFIER_CHANGED: "uniqueIdentifierChanged",
            USER_SOCIAL_PROFILE_CHANGED: "userSocialProfileChanged",
        };

    }
    
    // MARK: - Properties
    
    get bag() { return this._state.bag; }
    get onBagChange() { return this._state.onBagChange; }
    set onBagChange(value) { this._state.onBagChange = value; }
    
    get account() { return this._state.account; }
    get onAccountChange() { return this._state.onAccountChange; }
    set onAccountChange(value) { this._state.onAccountChange = value; }
    
    get storeFrontIdentifier() { return this._state.storeFrontIdentifier; }
    get onStoreFrontIdentifierChange() { return this._state.onStoreFrontIdentifierChange; }
    set onStoreFrontIdentifierChange(value) { this._state.onStoreFrontIdentifierChange = value; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedStore);

//
//  SocialBaseItem.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class SocialBaseItem extends BaseItem {

    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.initiateFollowButtonSelectionPerformed = function(self, requestIdentifier) {
            let completionHandler = function(segue) {
                _NativeBridge.sharedBridge.enqueueMethodInvocation(self, "registerSegueForFollowButtonSelectionPerformed", [requestIdentifier, segue]);
            };
            let callback = self._state.onFollowButtonSelectionPerformed;
            if (typeof(callback) == "function") {
                callback(completionHandler);
            }
            else {
                let segue = {};
                completionHandler(segue);
            }
        };
    }
    
    // MARK: - Properties
    
    get accessorySocialProfiles() { return this._state.accessorySocialProfiles; }
    set accessorySocialProfiles(value) {
        this._state.accessorySocialProfiles = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "accessorySocialProfiles", value);
    }
    
    get onFollowButtonSelectionPerformed() { return this._state.onFollowButtonSelectionPerformed; }
    set onFollowButtonSelectionPerformed(callback) { this._state.onFollowButtonSelectionPerformed = callback; }
    
    // MARK: - Methods
    
    appendAccessorySocialProfiles(items) {
        for (const item of items) {
            this._state.accessorySocialProfiles.push(item);
        }
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "appendAccessorySocialProfiles", [items]);
    }
}

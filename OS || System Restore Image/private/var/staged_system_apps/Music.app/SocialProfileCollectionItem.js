//
//  SocialProfileCollectionItem.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class SocialProfileCollectionItem extends BridgedObject {
    
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
    
    // MARK: - API
    
    get profile() { return this._state.profile; }
    set profile(value) {
        this._state.profile = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "profile", value);
    }
    
    get onApproveButtonSelectionPerformed() { return this._state.onApproveButtonSelectionPerformed; }
    set onApproveButtonSelectionPerformed(callback) { this._state.onApproveButtonSelectionPerformed = callback; }
    
    get onDeclineButtonSelectionPerformed() { return this._state.onDeclineButtonSelectionPerformed; }
    set onDeclineButtonSelectionPerformed(callback) { this._state.onDeclineButtonSelectionPerformed = callback; }
    
    get onFollowButtonSelectionPerformed() { return this._state.onFollowButtonSelectionPerformed; }
    set onFollowButtonSelectionPerformed(callback) { this._state.onFollowButtonSelectionPerformed = callback; }
    
    get onRemoveFollowerSelectionPerformed() { return this._state.onRemoveFollowerSelectionPerformed; }
    set onRemoveFollowerSelectionPerformed(callback) { this._state.onRemoveFollowerSelectionPerformed = callback; }
}

_SegueCoordinator.addSupportedSegue(SocialProfileCollectionItem, Segue.TYPES.SELECT);

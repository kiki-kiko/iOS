//
//  SocialProfileVerticalStack.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SocialProfileVerticalStack extends VerticalStack {
    
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
    
    get artistPageLink() { return this._state.artistPageLink; }
    set artistPageLink(value) {
        this._state.artistPageLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "artistPageLink", value);
    }
    
    get artistPageLinkTitle() { return this._state.artistPageLinkTitle; }
    set artistPageLinkTitle(value) {
        this._state.artistPageLinkTitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "artistPageLinkTitle", value);
    }
    
    get followRequestsLink() { return this._state.followRequestsLink; }
    set followRequestsLink(value) {
        this._state.followRequestsLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "followRequestsLink", value);
    }
    
    get onApproveButtonSelectionPerformed() { return this._state.onApproveButtonSelectionPerformed; }
    set onApproveButtonSelectionPerformed(callback) { this._state.onApproveButtonSelectionPerformed = callback; }
    
    get onDeclineButtonSelectionPerformed() { return this._state.onDeclineButtonSelectionPerformed; }
    set onDeclineButtonSelectionPerformed(callback) { this._state.onDeclineButtonSelectionPerformed = callback; }
    
    get onFollowButtonSelectionPerformed() { return this._state.onFollowButtonSelectionPerformed; }
    set onFollowButtonSelectionPerformed(callback) { this._state.onFollowButtonSelectionPerformed = callback; }
    
}

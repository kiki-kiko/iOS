//
//  SocialActivityController.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class BridgedSocialActivityController extends BridgedObject {
    
    // MARK: - Properties
    
    get onFollowStateDidChange() { return this._state.onFollowStateDidChange; }
    set onFollowStateDidChange(value) { this._state.onFollowStateDidChange = value; }
    
    get onFollowApprovalDidChange() { return this._state.onFollowApprovalDidChange; }
    set onFollowApprovalDidChange(value) { this._state.onFollowApprovalDidChange = value; }
    
    get onDidApproveAll() { return this._state.onDidApproveAll; }
    set onDidApproveAll(value) { this._state.onDidApproveAll = value; }
    
    get onRemovedFollower() { return this._state.onRemovedFollower; }
    set onRemovedFollower(value) { this._state.onRemovedFollower = value; }
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedSocialActivityController);

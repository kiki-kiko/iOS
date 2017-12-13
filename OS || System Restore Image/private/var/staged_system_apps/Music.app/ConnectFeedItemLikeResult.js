//
//  ConnectFeedItemLikeResult.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeedItemLikeResult extends BridgedObject {
    
    // MARK: - Properties
    
    get likeState() { return this._state.likeState; }
    set likeState(value) {
        this._state.likeState = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "likeState", value);
    }
    
    get resultState() { return this._state.resultState; }
    set resultState(value) {
        this._state.resultState = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "resultState", value);
    }
}

ConnectFeedItemLikeResult.RESULT_STATE = {
    SUCCESS: "success",
    FAILED: "failed",
};

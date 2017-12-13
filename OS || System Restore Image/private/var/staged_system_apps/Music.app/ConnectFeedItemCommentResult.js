//
//  ConnectFeedItemCommentResult.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeedItemCommentResult extends BridgedObject {
    
    // MARK: - Properties
    
    get resultState() { return this._state.resultState; }
    set resultState(value) {
        this._state.resultState = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "resultState", value);
    }
    
}

ConnectFeedItemCommentResult.RESULT_STATE = {
    SUCCESS: "success",
    FAILED: "failed",
};

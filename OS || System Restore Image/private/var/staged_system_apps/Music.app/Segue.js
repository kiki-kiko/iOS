//
//  Segue.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Segue extends BridgedObject {
    
    // MARK: - Properties
    
    get playbackIntent() { return this._state.playbackIntent; }
    set playbackIntent(value) {
        this._state.playbackIntent = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "playbackIntent", value);
    }
    
}

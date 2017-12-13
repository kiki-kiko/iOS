//
//  PlaybackIntent.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class PlaybackIntent extends BridgedObject {
    
    // MARK: - Properties
    
    get playActivityFeatureName() { return this._state.playActivityFeatureName; }
    set playActivityFeatureName(value) {
        this._state.playActivityFeatureName = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "playActivityFeatureName", value);
    }
    
    get playActivityRecommendationID() { return this._state.playActivityRecommendationID; }
    set playActivityRecommendationID(value) {
        this._state.playActivityRecommendationID = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "playActivityRecommendationID", value);
    }
    
    get shuffleMode() { return this._state.shuffleMode; }
    set shuffleMode(value) {
        this._state.shuffleMode = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "shuffleMode", value);
    }
    
}

PlaybackIntent.SHUFFLE_MODE = {
    SONGS: "songs", 
};

//
//  RadioPlaybackIntent.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class RadioPlaybackIntent extends PlaybackIntent {
    
    // MARK: - Properties
    
    get radioStationStorePlatformDictionary() { return this._state.radioStationStorePlatformDictionary; }
    set radioStationStorePlatformDictionary(value) {
        this._state.radioStationStorePlatformDictionary = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "radioStationStorePlatformDictionary", value);
    }
    
}

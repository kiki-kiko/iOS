//
//  MovieClipItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class MovieClipItem extends BridgedObject {
    
    // MARK: - Properties
    
    get movieClipDictionary() { return this._state.movieClipDictionary; }
    set movieClipDictionary(value) {
        this._state.movieClipDictionary = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "movieClipDictionary", value);
    }
    
    get movieStorePlatformDictionary() { return this._state.movieStorePlatformDictionary; }
    set movieStorePlatformDictionary(value) {
        this._state.movieStorePlatformDictionary = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "movieStorePlatformDictionary", value);
    }
}

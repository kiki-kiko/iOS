//
//  CatalogPlaybackIntent.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class CatalogPlaybackIntent extends PlaybackIntent {
    
    // MARK: - Properties
    
    get containerStorePlatformDictionary() { return this._state.containerStorePlatformDictionary; }
    set containerStorePlatformDictionary(value) {
        this._state.containerStorePlatformDictionary = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "containerStorePlatformDictionary", value);
    }
    
    get itemStorePlatformDictionaries() { return this._state.itemStorePlatformDictionaries; }
    set itemStorePlatformDictionaries(value) {
        this._state.itemStorePlatformDictionaries = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "itemStorePlatformDictionaries", value);
    }
    
    get startItemIdentifier() { return this._state.startItemIdentifier; }
    set startItemIdentifier(value) {
        this._state.startItemIdentifier = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "startItemIdentifier", value);
    }
    
}

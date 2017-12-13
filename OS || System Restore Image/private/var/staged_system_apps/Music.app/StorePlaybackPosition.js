//
//  StorePlaybackPosition.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class StorePlaybackPosition extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.bookmarkDate = new Date(attributes.serializedBookmarkDate);
        this._state.bookmarkTime = attributes.bookmarkTime;
        this._state.hasBeenPlayed = attributes.hasBeenPlayed;
        this._state.userPlayCount = attributes.userPlayCount;
    }
    
    // MARK: - Properties
    
    get bookmarkDate() { return this._state.bookmarkDate; }
    get bookmarkTime() { return this._state.bookmarkTime; }
    get hasBeenPlayed() { return this._state.hasBeenPlayed; }
    get userPlayCount() { return this._state.userPlayCount; }
}

_NativeBridge.sharedBridge.registerBridgedConstructor(StorePlaybackPosition);

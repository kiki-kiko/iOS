//
//  ConnectFeed.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectUser extends BridgedObject {
    
    // MARK: - Properties

    get connectID() { return this._state.connectID; }
    set connectID(value) {
        this._state.connectID = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "connectID", value);
    }
    
    get displayName() { return this._state.displayName; }
    set displayName(value) {
        this._state.displayName = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "displayName", value);
    }
    
    get name() { return this._state.name; }
    set name(value) {
        this._state.name = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "name", value);
    }
    
    get artwork() {
        let result = this._state.artwork;
        if (this._state.artworkWasSetAsDictionary) {
            result = result.dictionary;
        }
        return result;
    }
    
    set artwork(value) {
        let artwork;
        if (value instanceof Artwork) {
            artwork = value;
            this._state.artworkWasSetAsDictionary = false;
        }
        else {
            console.warn("Setting artwork as a dictionary was deprecated; please make an instance of the Artwork class and pass it the dictionary instead.");
            artwork = new Artwork();
            artwork.dictionary = value;
            this._state.artworkWasSetAsDictionary = true;
        }
        
        this._state.artwork = artwork;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "artwork", artwork);
    }
    
    get artworkDictionary() {
        console.warn("connectUser.artworkDictionary was deprecated, and replaced with connectUser.artwork.");
        return this.artwork;
    }
    
    set artworkDictionary(value) {
        console.warn("connectUser.artworkDictionary was deprecated, and replaced with connectUser.artwork.");
        this.artwork = value;
    }
    
}

_SegueCoordinator.addSupportedSegue(ConnectUser, Segue.TYPES.SELECT);

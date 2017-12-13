//
//  ShareResult.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ShareResult extends BridgedObject {
    
    // MARK: - Properties
    
    get url() { return this._state.url; }
    set url(value) {
        this._state.url = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "url", value);
    }
    
    get message() { return this._state.message; }
    set message(value) {
        this._state.message = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "message", value);
    }
    
    get subject() { return this._state.subject; }
    set subject(value) {
        this._state.url = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "subject", value);
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
    
}

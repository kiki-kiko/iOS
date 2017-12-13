//
//  BaseItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BaseItem extends BridgedObject {
    
    // MARK: - Properties
    
    get storePlatformDictionary() { return this._state.storePlatformDictionary; }
    set storePlatformDictionary(value) {
        this._state.storePlatformDictionary = value;
        this._state.identifierSet = null;
        this._state.movieClipItem = null;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "storePlatformDictionary", value);
    }
    
    get identifierSet() { return this._state.identifierSet; }
    set identifierSet(value) {
        this._state.identifierSet = value;
        this._state.storePlatformDictionary = null;
        this._state.movieClipItem = null;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "identifierSet", value);
    }
    
    get movieClipItem() { return this._state.movieClipItem; }
    set movieClipItem(value) {
        this._state.movieClipItem = value;
        this._state.identifierSet = null;
        this._state.storePlatformDictionary = null;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "movieClipItem", value);
    }
    
    get backgroundArtwork() {
        let result = this._state.backgroundArtwork;
        if (this._state.backgroundArtworkWasSetAsDictionary) {
            result = result.dictionary;
        }
        return result;
    }
    
    set backgroundArtwork(value) {
        let artwork;
        if (value instanceof Artwork) {
            artwork = value;
            this._state.backgroundArtworkWasSetAsDictionary = false;
        }
        else {
            console.warn("Setting artwork as a dictionary was deprecated; please make an instance of the Artwork class and pass it the dictionary instead.");
            artwork = new Artwork();
            artwork.dictionary = value;
            this._state.backgroundArtworkWasSetAsDictionary = true;
        }
        
        this._state.backgroundArtwork = artwork;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "backgroundArtwork", artwork);
    }
    
    get contextActions() { return this._state.contextActions; }
    set contextActions(value) {
        this._state.contextActions = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "contextActions", value);
    }
    
    get promotionalBackgroundArtwork() { return this._state.promotionalBackgroundArtwork; }
    set promotionalBackgroundArtwork(value) {
        this._state.promotionalBackgroundArtwork = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "promotionalBackgroundArtwork", value);
    }
    
    get promotionalThumbnailArtwork() { return this._state.promotionalThumbnailArtwork; }
    set promotionalThumbnailArtwork(value) {
        this._state.promotionalThumbnailArtwork = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "promotionalThumbnailArtwork", value);
    }
    
}

_SegueCoordinator.addSupportedSegue(BaseItem, Segue.TYPES.SELECT);

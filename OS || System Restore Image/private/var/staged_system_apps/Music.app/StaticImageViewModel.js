//
//  StaticImageViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class StaticImageViewModel extends ViewModel {
    
    // MARK: - API
    
    get embeddedImageName() { return this._state.embeddedImageName; }
    set embeddedImageName(value) {
        this._state.embeddedImageName = value;
        this._state.artwork = null;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "embeddedImageName", value);
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
        if (value) {
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
        }
        this._state.artwork = artwork;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "artwork", artwork);
    }
    
    get artworkDictionary() {
        console.warn("staticImageViewModel.artworkDictionary was deprecated, and replaced with staticImageViewModel.artwork.");
        return this.artwork;
    }
    
    set artworkDictionary(value) {
        console.warn("staticImageViewModel.artworkDictionary was deprecated, and replaced with staticImageViewModel.artwork.");
        this.artwork = value;
    }
    
}

_SegueCoordinator.addSupportedSegue(StaticImageViewModel, Segue.TYPES.SELECT);

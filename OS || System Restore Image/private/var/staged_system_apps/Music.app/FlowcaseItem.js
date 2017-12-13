//
//  FlowcaseItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class FlowcaseItem extends BaseItem {
    
    // MARK: - Properties
 
    get headline() { return this._state.headline; }
    set headline(value) {
        this._state.headline = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "headline", value);
    }
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get subtitle() { return this._state.subtitle; }
    set subtitle(value) {
        this._state.subtitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "subtitle", value);
    }
    
    get descriptionTitle() { return this._state.descriptionTitle; }
    set descriptionTitle(value) {
        this._state.descriptionTitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "descriptionTitle", value);
    }
    
    get description() { return this._state.description; }
    set description(value) {
        this._state.description = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "description", value);
    }
    
    get thumbnailArtwork() {
        let result = this._state.thumbnailArtwork;
        if (this._state.thumbnailArtworkWasSetAsDictionary) {
            result = result.dictionary;
        }
        return result;
    }
    
    set thumbnailArtwork(value) {
        let artwork;
        if (value instanceof Artwork) {
            artwork = value;
            this._state.thumbnailArtworkWasSetAsDictionary = false;
        }
        else {
            console.warn("Setting artwork as a dictionary was deprecated; please make an instance of the Artwork class and pass it the dictionary instead.");
            artwork = new Artwork();
            artwork.dictionary = value;
            this._state.thumbnailArtworkWasSetAsDictionary = true;
        }
        
        this._state.thumbnailArtwork = artwork;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "thumbnailArtwork", artwork);
    }
    
    get thumbnailHorizontalAlignment() { return this._state.thumbnailHorizontalAlignment; }
    set thumbnailHorizontalAlignment(value) {
        this._state.thumbnailHorizontalAlignment = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "thumbnailHorizontalAlignment", value);
    }
    
}

// MARK: - Types

FlowcaseItem.THUMBNAIL_HORIZONTAL_ALIGNMENT = {
    LEADING:    "leading", 
    TRAILING:   "trailing", 
    LEFT:       "left", 
    RIGHT:      "right", 
};

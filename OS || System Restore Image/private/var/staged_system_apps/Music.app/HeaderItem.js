//
//  HeaderItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class HeaderItem extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        this._state.titleHeaderStyle = HeaderItem.TITLE_HEADER_STYLE.LARGE_ADAPTIVE;
    }
    
    // MARK: - Properties
    
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
    
    get supertitle() { return this._state.supertitle; }
    set supertitle(value) {
        this._state.supertitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "supertitle", value);
    }
    
    get showsLargeTitleHeader() {
        console.warn("headerItem.showsLargeTitleHeader is deprecated; you must now use headerItem.titleHeaderStyle instead.");
        return (this.titleHeaderStyle == HeaderItem.TITLE_HEADER_STYLE.LARGE_FIXED);
    }
    set showsLargeTitleHeader(value) {
        console.warn("headerItem.showsLargeTitleHeader is deprecated; you must now use headerItem.titleHeaderStyle instead.");
        if (value) {
            this.titleHeaderStyle = HeaderItem.TITLE_HEADER_STYLE.LARGE_FIXED;
        }
        else {
            this.titleHeaderStyle = HeaderItem.TITLE_HEADER_STYLE.LARGE_ADAPTIVE;
        }
    }
    
    get titleHeaderStyle() { return this._state.titleHeaderStyle; }
    set titleHeaderStyle(value) {
        this._state.titleHeaderStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "titleHeaderStyle", value);
    }
    
    get promotionalLayoutStyle() { return this._state.promotionalLayoutStyle; }
    set promotionalLayoutStyle(value) {
        this._state.promotionalLayoutStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "promotionalLayoutStyle", value);
    }
    
    get promotionalBackgroundArtwork() {
        let result = this._state.promotionalBackgroundArtwork;
        if (this._state.promotionalBackgroundArtworkWasSetAsDictionary) {
            result = result.dictionary;
        }
        return result;
    }
    
    set promotionalBackgroundArtwork(value) {
        if (value instanceof Artwork) {
            this._state.promotionalBackgroundArtwork = value;
            _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "promotionalBackgroundArtwork", value);
            this._state.promotionalBackgroundArtworkWasSetAsDictionary = false;
        }
        else {
            console.warn("Setting artwork as a dictionary was deprecated; please make an instance of the Artwork class and pass it the dictionary instead.");
            if (this._state.promotionalBackgroundArtwork instanceof Artwork) {
                this._state.promotionalBackgroundArtwork.dictionary = value;
            }
            else {
                let artwork = new Artwork();
                artwork.dictionary = value;
                this._state.promotionalBackgroundArtwork = artwork;
                _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "promotionalBackgroundArtwork", artwork);
            }
            this._state.promotionalBackgroundArtworkWasSetAsDictionary = true;
        }
    }
    
    get promotionalThumbnailArtwork() {
        let result = this._state.promotionalThumbnailArtwork;
        if (this._state.promotionalThumbnailArtworkWasSetAsDictionary) {
            result = result.dictionary;
        }
        return result;
    }
    
    set promotionalThumbnailArtwork(value) {
        if (value instanceof Artwork) {
            this._state.promotionalThumbnailArtwork = value;
            _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "promotionalThumbnailArtwork", value);
            this._state.promotionalThumbnailArtworkWasSetAsDictionary = false;
        }
        else {
            console.warn("Setting artwork as a dictionary was deprecated; please make an instance of the Artwork class and pass it the dictionary instead.");
            if (this._state.promotionalThumbnailArtwork instanceof Artwork) {
                this._state.promotionalThumbnailArtwork.dictionary = value;
            }
            else {
                let artwork = new Artwork();
                artwork.dictionary = value;
                this._state.promotionalThumbnailArtwork = artwork;
                _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "promotionalThumbnailArtwork", artwork);
            }
            this._state.promotionalThumbnailArtworkWasSetAsDictionary = true;
        }
    }
    
    get promotionalThumbnailStyle() {
        let result = undefined;
        if (this._state.promotionalThumbnailArtwork) {
            result = this._state.promotionalThumbnailArtwork.treatment;
        }
        return result;
    }
    
    set promotionalThumbnailStyle(value) {
        console.warn("headerItem.promotionalThumbnailStyle is deprecated; please set the treatment of the headerItem.promotionalThumbnailArtwork instead.");
        if (!this.promotionalThumbnailArtwork) {
            this.promotionalThumbnailArtwork = new Artwork();
        }
        this.promotionalThumbnailArtwork.treatment = value;
    }
    
    get upsellBanner() { return this._state.upsellBanner; }
    set upsellBanner(value) {
        this._state.upsellBanner = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "upsellBanner", value);
    }
    
    get storePlatformDictionary() { return this._state.storePlatformDictionary; }
    set storePlatformDictionary(value) {
        this._state.storePlatformDictionary = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "storePlatformDictionary", value);
    }
    
    get trailingBarButtonItem() { return this._state.trailingBarButtonItem; }
    set trailingBarButtonItem(value) {
        this._state.trailingBarButtonItem = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "trailingBarButtonItem", value);
    }

}

// MARK: - Types

HeaderItem.THUMBNAIL_STYLE = {
    DEFAULT: Artwork.TREATMENT.DEFAULT,
    CIRCLE: Artwork.TREATMENT.CIRCLE,
};

HeaderItem.PROMOTIONAL_LAYOUT_STYLE = {
    DEFAULT: "default",
    PROFILE: "profile",
};

HeaderItem.TITLE_HEADER_STYLE = {
    LARGE_ADAPTIVE: "largeAdaptive",
    LARGE_FIXED: "largeFixed",
    STANDARD: "standard",
};

_NativeBridge.sharedBridge.registerBridgedConstructor(HeaderItem);

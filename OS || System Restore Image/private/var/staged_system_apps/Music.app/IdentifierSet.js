//
//  IdentifierSet.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class IdentifierSet extends BridgedObject {
    
    // MARK: - Properties
    
    get storePurchasedAdamID() { return this._state.storePurchasedAdamID; }
    set storePurchasedAdamID(value) {
        this._state.storePurchasedAdamID = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "storePurchasedAdamID", value);
    }
    
    get storeCloudID() { return this._state.storeCloudID; }
    set storeCloudID(value) {
        this._state.storeCloudID = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "storeCloudID", value);
    }
    
    get storeCloudAlbumID() { return this._state.storeCloudID; }
    set storeCloudAlbumID(value) {
        this._state.storeCloudAlbumID = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "storeCloudAlbumID", value);
    }
    
    get cloudUniversalLibraryID() { return this._state.cloudUniversalLibraryID; }
    set cloudUniversalLibraryID(value) {
        this._state.cloudUniversalLibraryID = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "cloudUniversalLibraryID", value);
    }
    
    get contentKind() { return this._state.kind; }
    set contentKind(value) {
        this._state.contentKind = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "contentKind", value);
    }
}

IdentifierSet.CONTENT_KIND = {
    ALBUM: "album",
    PLAYLIST: "playlist",
    SONG: "song",
};


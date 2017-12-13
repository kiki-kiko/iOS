//
//  AlbumDetail.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class AlbumDetail extends ViewModel {
    
    // MARK: - Properties
    
    get albumStorePlatformDictionary() { return this._state.albumStorePlatformDictionary; }
    set albumStorePlatformDictionary(value) {
        this._state.albumStorePlatformDictionary = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "albumStorePlatformDictionary", value);
    }
    
    get artistDetailLink() { return this._state.artistDetailLink; }
    set artistDetailLink(value) {
        this._state.artistDetailLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "artistDetailLink", value);
    }

    get footerViewModels() { return this._state.footerViewModels; }
    set footerViewModels(value) {
        this._state.footerViewModels = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "footerViewModels", value);
    }
    
    get prominentItemIdentifier() { return this._state.prominentItemIdentifier; }
    set prominentItemIdentifier(value) {
        this._state.prominentItemIdentifier = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "prominentItemIdentifier", value);
    }
}

_NativeBridge.sharedBridge.registerBridgedConstructor(AlbumDetail);

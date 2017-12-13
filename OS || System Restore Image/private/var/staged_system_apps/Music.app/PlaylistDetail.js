//
//  PlaylistDetail.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class PlaylistDetail extends ViewModel {
    
    // MARK: - Properties
    
    get playlistStorePlatformDictionary() { return this._state.playlistStorePlatformDictionary; }
    set playlistStorePlatformDictionary(value) {
        this._state.playlistStorePlatformDictionary = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "playlistStorePlatformDictionary", value);
    }
    
    get curatorDetailLink() { return this._state.curatorDetailLink; }
    set curatorDetailLink(value) {
        this._state.curatorDetailLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "curatorDetailLink", value);
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

_NativeBridge.sharedBridge.registerBridgedConstructor(PlaylistDetail);

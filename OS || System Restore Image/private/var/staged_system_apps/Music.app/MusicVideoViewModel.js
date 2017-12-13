//
//  MusicVideoViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class MusicVideoViewModel extends ViewModel {
    
    // MARK: - Properties
    
    get item() { return this._state.item; }
    set item(value) {
        this._state.item = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "item", value);
    }
    
    get artistDetailLink() { return this._state.artistDetailLink; }
    set artistDetailLink(value) {
        this._state.artistDetailLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "artistDetailLink", value);
    }
    
    get shouldHideArtist() { return this._state.shouldHideArtist; }
    set shouldHideArtist(value) {
        this._state.shouldHideArtist = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "shouldHideArtist", value);
    }
}

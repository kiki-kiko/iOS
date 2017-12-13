//
//  TVShowEpisodeDetail.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class TVShowEpisodeDetail extends ViewModel {
    
    // MARK: - Properties
    
    get item() { return this._state.item; }
    set item(value) {
        this._state.item = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "item", value);
    }
    
    get showDetailLink() { return this._state.showDetailLink; }
    set showDetailLink(value) {
        this._state.showDetailLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "showDetailLink", value);
    }
}

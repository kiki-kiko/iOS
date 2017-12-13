//
//  TVShowPlayBarViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class TVShowPlayBarViewModel extends ViewModel {
    
    // MARK: - Properties
    
    get item() { return this._state.item; }
    set item(value) {
        this._state.item = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "item", value);
    }
    
    get wantsBottomHairline() { return this._state.wantsBottomHairline; }
    set wantsBottomHairline(value) {
        this._state.wantsBottomHairline = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "wantsBottomHairline", value);
    }
}

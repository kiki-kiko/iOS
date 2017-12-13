//
//  BadgingViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BadgingViewModel extends ViewModel {
    
    // MARK: - API
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
}

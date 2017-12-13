//
//  Flowcase.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Flowcase extends ViewModel {
    
    // MARK: - Properties
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
}

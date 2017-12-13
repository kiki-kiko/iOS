//
//  RedirectSegue.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class RedirectSegue extends Segue {
    
    // MARK: - Properties
    
    get url() { return this._state.url; }
    set url(value) {
        this._state.url = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "url", value);
    }
    
}

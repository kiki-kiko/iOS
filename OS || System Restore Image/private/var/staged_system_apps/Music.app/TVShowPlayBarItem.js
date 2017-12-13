//
//  TVShowContinueWatchingItem.js
//  Music
//s
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class TVShowPlayBarItem extends BaseItem {
    
    // MARK: - Properties
    
    get title() { return this._state.item; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
}

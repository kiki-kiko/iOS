//
//  SearchTrendingItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SearchTrendingItem extends BridgedObject {
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get url() { return this._state.accessoryButtonTitle; }
    set url(value) {
        this._state.url = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "url", value);
    }
    
}

_SegueCoordinator.addSupportedSegue(SearchTrendingItem, Segue.TYPES.SELECT);

//
//  SearchResultSection.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SearchResultSection extends BridgedObject {
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }

    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
    get accessoryButtonTitle() { return this._state.accessoryButtonTitle; }
    set accessoryButtonTitle(value) {
        this._state.accessoryButtonTitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "accessoryButtonTitle", value);
    }
    
}

_SegueCoordinator.addSupportedSegue(SearchResultSection, Segue.TYPES.ACCESSORY_BUTTON_SELECT);

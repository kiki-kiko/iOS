//
//  Shelf.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Shelf extends ViewModel {
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get sections() { return this._state.sections; }
    set sections(value) {
        this._state.sections = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "sections", value);
    }
    
    get accessoryButtonTitle() { return this._state.accessoryButtonTitle; }
    set accessoryButtonTitle(value) {
        this._state.accessoryButtonTitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "accessoryButtonTitle", value);
    }
    
}

_SegueCoordinator.addSupportedSegue(Shelf, Segue.TYPES.ACCESSORY_BUTTON_SELECT);

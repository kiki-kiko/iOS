//
//  MenuItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class MenuItem extends BridgedObject {
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get submenu() { return this._state.submenu; }
    set submenu(value) {
        this._state.submenu = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "submenu", value);
    }
    
}

_SegueCoordinator.addSupportedSegue(MenuItem, Segue.TYPES.SELECT);

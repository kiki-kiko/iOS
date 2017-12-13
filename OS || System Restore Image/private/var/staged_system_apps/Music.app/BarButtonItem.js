//
//  BarButtonItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BarButtonItem extends BridgedObject {

    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
}

_SegueCoordinator.addSupportedSegue(BarButtonItem, Segue.TYPES.SELECT);

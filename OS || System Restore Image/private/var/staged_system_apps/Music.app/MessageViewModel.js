//
//  MessageViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class MessageViewModel extends ViewModel {
    
    // MARK: - API
    
    get message() { return this._state.message; }
    set message(value) {
        if (typeof(value) == "string") {
            this._state.message = value;
            _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "message", value);
        }
        else {
            throw "Incorrect passed value type";
        }
    }
    
    get accessoryButtonTitle() { return this._state.accessoryButtonTitle; }
    set accessoryButtonTitle(value) {
        this._state.accessoryButtonTitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "accessoryButtonTitle", value);
    }

    get headerTitle() { return this._state.headerTitle; }
    set headerTitle(value) {
        this._state.headerTitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "headerTitle", value);
    }
}

_SegueCoordinator.addSupportedSegue(MessageViewModel, Segue.TYPES.ACCESSORY_BUTTON_SELECT);

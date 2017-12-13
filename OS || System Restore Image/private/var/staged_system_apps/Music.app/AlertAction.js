//
//  AlertAction.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class AlertAction extends BridgedObject {

    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get alertActionStyle() { return this._state.alertActionStyle; }
    set alertActionStyle(value) {
        this._state.alertActionStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "alertActionStyle", value);
    }
}

// MARK: - Types

AlertAction.ALERT_ACTION_STYLE = {
    DEFAULT: "default",
    CANCEL: "cancel",
    DESTRUCTIVE: "destructive",
};

_SegueCoordinator.addSupportedSegue(AlertAction, Segue.TYPES.SELECT);

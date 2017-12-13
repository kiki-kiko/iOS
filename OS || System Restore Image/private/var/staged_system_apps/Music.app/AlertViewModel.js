//
//  AlertViewModel.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class AlertViewModel extends ViewModel {
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get message() { return this._state.message; }
    set message(value) {
        this._state.message = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "message", value);
    }
    
    get alertActions() { return this._state.alertActions; }
    set alertActions(value) {
        this._state.alertActions = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "alertActions", value);
    }
    
    get alertStyle() { return this._state.alertStyle; }
    set alertStyle(value) {
        this._state.alertStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "alertStyle", value);
    }
}

// MARK: - Types

AlertViewModel.ALERT_STYLE = {
    ALERT: "alert",
    ACTION_SHEET: "actionSheet",
};


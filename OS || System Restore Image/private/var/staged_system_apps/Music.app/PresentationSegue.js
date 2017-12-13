//
//  PresentationSegue.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class PresentationSegue extends Segue {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.presentationStyle = PresentationSegue.PRESENTATION_STYLE.FORM_SHEET;
    }
    
    // MARK: - Properties
    
    get componentController() { return this._state.componentController; }
    set componentController(value) {
        this._state.componentController = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "componentController", value);
    }
    
    get presentationStyle() { return this._state.presentationStyle; }
    set presentationStyle(value) {
        this._state.presentationStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "presentationStyle", value);
    }
}

// MARK: - Types

PresentationSegue.PRESENTATION_STYLE = {
    FORM_SHEET: "formSheet",
    POPOVER: "popover",
};


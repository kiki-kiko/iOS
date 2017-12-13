//
//  GridItemButton.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class GridItemButton extends BridgedObject {
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get subtitle() { return this._state.subtitle; }
    set subtitle(value) {
        this._state.subtitle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "subtitle", value);
    }
    
    get displayStyle() { return this._state.displayStyle; }
    set displayStyle(value) {
        this._state.displayStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "displayStyle", value);
    }
    
    get shouldDismissPresentation() { return this._state.shouldDismissPresentation; }
    set shouldDismissPresentation(value) {
        this._state.shouldDismissPresentation = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "shouldDismissPresentation", value);
    }
    
    get horizontalAlignment() { return this._state.horizontalAlignment; }
    set horizontalAlignment(value) {
        this._state.horizontalAlignment = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "horizontalAlignment", value);
    }
    
}

// MARK: - Types

GridItemButton.HORIZONTAL_ALIGNMENT = {
    LEFT: "left",
    CENTERED: "centered",
};

GridItemButton.DISPLAY_STYLE = {
    FILL: "fill",
    STROKE: "stroke",
};

_SegueCoordinator.addSupportedSegue(GridItemButton, Segue.TYPES.SELECT);

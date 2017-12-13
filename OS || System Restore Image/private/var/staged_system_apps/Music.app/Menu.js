//
//  Menu.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Menu extends ViewModel {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.selectionStyle = Menu.SELECTION_STYLE.NONE;
    }
    
    // MARK: - Properties
    
    get sections() { return this._state.sections; }
    set sections(value) {
        this._state.sections = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "sections", value);
    }
    
    get preselectedItem() { return this._state.preselectedItem; }
    set preselectedItem(value) {
        this._state.preselectedItem = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "preselectedItem", value);
    }
    
    get selectionStyle() { return this._state.selectionStyle; }
    set selectionStyle(value) {
        this._state.selectionStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "selectionStyle", value);
    }
}

Menu.SELECTION_STYLE = {
    NONE: "none",
    CHECKMARK: "checkmark",
};

//
//  PersonalMixesViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class PersonalMixesViewModel extends ViewModel {
    
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
    
    get layoutStyle() { return this._state.layoutStyle; }
    set layoutStyle(value) {
        this._state.layoutStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "layoutStyle", value);
    }
    
}

PersonalMixesViewModel.LAYOUT_STYLE = {
    SHOWCASE: "showcase",
    SHELF: "shelf",
};

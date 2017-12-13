//
//  MultiChoiceViewModel.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class MultiChoiceViewModel extends ViewModel {
    
    // MARK: - API
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
    get selectedItem() { return this._state.selectedItem; }
    set selectedItem(value) {
        this._state.selectedItem = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "selectedItem", value);
    }
}

//
//  VerticalStack.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class VerticalStack extends ViewModel {
    
    // MARK: - API
    
    get childViewModels() { return this._state.childViewModels; }
    set childViewModels(value) {
        this._state.childViewModels = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "childViewModels", value);
    }
    
    get onNeedsAdditionalChildViewModels() { return this._state.onNeedsAdditionalChildViewModels; }
    set onNeedsAdditionalChildViewModels(value) {
        this._state.onNeedsAdditionalChildViewModels = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "onNeedsAdditionalChildViewModels", value);
    }
    
    // MARK: - Methods
    
    appendChildViewModels(childViewModels) {
        for (const childViewModel of childViewModels) {
            this._state.childViewModels.push(childViewModel);
        }
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "appendChildViewModels", [childViewModels]);
    }
    
}

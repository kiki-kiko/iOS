//
//  UpsellBanner.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class UpsellBanner extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.showsAppleMusicLogo = true;
    }
    
    // MARK: - Properties
    
    get compactText() { return this._state.compactText; }
    set compactText(value) {
        this._state.compactText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "compactText", value);
    }
    
    get regularText() { return this._state.regularText; }
    set regularText(value) {
        this._state.regularText = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "regularText", value);
    }
    
    get showsAppleMusicLogo() { return this._state.showsAppleMusicLogo; }
    set showsAppleMusicLogo(value) {
        this._state.showsAppleMusicLogo = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "showsAppleMusicLogo", value);
    }
}

_SegueCoordinator.addSupportedSegue(UpsellBanner, Segue.TYPES.SELECT);

_NativeBridge.sharedBridge.registerBridgedConstructor(UpsellBanner);

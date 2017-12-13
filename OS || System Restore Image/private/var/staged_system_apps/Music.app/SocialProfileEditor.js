//
//  SocialProfileEditor.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class SocialProfileEditor extends BridgedObject {
    
    get isNameEditable() { return this._state.isNameEditable; }
    set isNameEditable(value) {
        this._state.isNameEditable = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isNameEditable", value);
    }
    
}

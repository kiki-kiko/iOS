//
//  PlayActivityController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedPlayActivityController extends BridgedObject {
    
    // MARK: - Properties
    
    get onEventFlush() { return this._state.onEventFlush; }
    set onEventFlush(value) { this._state.onEventFlush = value; }
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedPlayActivityController);

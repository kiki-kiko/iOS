//
//  Window.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedWindow extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.size = attributes.size;
        
        this._state.update = function(self, size) {
            self._state.size = size;
            
            const callback = self.onSizeChange;
            if (typeof(callback) == "function") {
                callback(size);
            }
        };
    }
    
    // MARK: - Properties
    
    get size() { return this._state.size; }
    
    get onSizeChange() { return this._state.onSizeChange; }
    set onSizeChange(value) { this._state.onSizeChange = value; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedWindow);

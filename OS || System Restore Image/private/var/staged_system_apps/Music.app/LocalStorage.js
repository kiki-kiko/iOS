//
//  LocalStorage.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class LocalStorage extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.orderedKeys = [];
        this._state.values = {};
        
        this._state.update = function(self, orderedKeys, values) {
            self._state.orderedKeys = orderedKeys;
            self._state.values = values;
        };
    }
    
    // MARK: - Properties
    
    get length() {
        return this._state.orderedKeys.length;
    }
    
    // MARK: - Methods
    
    key(keyIndex) {
        return this._state.orderedKeys[keyIndex];
    }
    
    getItem(keyName) {
        return this._state.values[keyName];
    }
    
    setItem(keyName, value) {
        if (this._state.orderedKeys.indexOf(keyName) < 0) {
            this._state.orderedKeys.push(keyName);
        }
        this._state.values[keyName] = value;
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "setItem", [keyName, value]);
    }
    
    removeItem(keyName) {
        const keyIndex = this._state.orderedKeys.indexOf(keyName);
        if (keyIndex >= 0) {
            this._state.orderedKeys.splice(keyIndex, 1);
            delete this._state.values[keyName];
            _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "removeItem", [keyName]);
        }
    }
    
    clear() {
        this._state.orderedKeys = [];
        this._state.values = {};
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "clear", []);
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(LocalStorage);

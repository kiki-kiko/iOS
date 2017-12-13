//
//  Network.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedNetwork extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this.TYPES = {
            NONE:       "none", 
            CELLULAR:   "cellular", 
            WIFI:       "wifi", 
        };
        
        this._state.type = attributes.type;
        this._state.operatorName = attributes.operatorName;
        this._state.connectionTypeHeader = attributes.connectionTypeHeader;
        
        this._state.update = function(self, updatedAttributes) {
            if (updatedAttributes.type) {
                self._state.type = updatedAttributes.type;
            }
            if (updatedAttributes.operatorName) {
                self._state.operatorName = updatedAttributes.operatorName;
            }
            if (updatedAttributes.connectionTypeHeader) {
                self._state.connectionTypeHeader = updatedAttributes.connectionTypeHeader;
            }
            
            const callback = self.onNetworkChange;
            if (typeof(callback) == "function") {
                callback();
            }
        };
    }
    
    // MARK: - Properties
    
    get type() { return this._state.type; }
    get operatorName() { return this._state.operatorName; }
    get connectionTypeHeader() { return this._state.connectionTypeHeader; }
    
    get onNetworkChange() { return this._state.onNetworkChange; }
    set onNetworkChange(value) { this._state.onNetworkChange = value; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedNetwork);

//
//  Restrictions.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedRestrictions extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.updateWithAllowsExplicitContent = function(self, allowsExplicitContent) {
            self._state.allowsExplicitContent = allowsExplicitContent;
            
            const callback = self.onAllowsExplicitContentChange;
            if (typeof(callback) == "function") {
                callback(allowsExplicitContent);
            }
        };
    }
    
    // MARK: - Properties
    
    get allowsExplicitContent() { return this._state.allowsExplicitContent; }
    
    get onAllowsExplicitContentChange() { return this._state.onAllowsExplicitContentChange; }
    set onAllowsExplicitContentChange(value) { this._state.onAllowsExplicitContentChange = value; }
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedRestrictions);

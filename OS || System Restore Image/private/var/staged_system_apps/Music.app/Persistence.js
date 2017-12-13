//
//  Persistence.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedPersistence extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.cookieStorage = attributes.cookieStorage;
        this._state.localStorage = attributes.localStorage;
    }
    
    // MARK: - Properties
  
    get cookieStorage() { return this._state.cookieStorage; }
    get localStorage() { return this._state.localStorage; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedPersistence);

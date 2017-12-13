//
//  Device.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedDevice extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes, mainScreen) {
        super();
        
        this._state.isInternalInstall = attributes.isInternalInstall;
        this._state.guid = attributes.guid;
        this._state.model = attributes.model;
        this._state.systemVersion = attributes.systemVersion;
        this._state.userAgent = attributes.userAgent;
        this._state.mainScreen = mainScreen;
    }
    
    // MARK: - Properties
    
    get isInternalInstall() { return this._state.isInternalInstall; }
    get guid() { return this._state.guid; }
    get model() { return this._state.model; }
    get systemVersion() { return this._state.systemVersion; }
    get userAgent() { return this._state.userAgent; }
    get mainScreen() { return this._state.mainScreen; }
    
    get diskUsage() {
        if (!this._state.diskUsage) {
            this._state.diskUsage = __retrieveDiskUsage();
            
            let self = this;
            Async.invoke(function() {
                delete self._state["diskUsage"];
            });
        }
        return this._state.diskUsage;
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedDevice);

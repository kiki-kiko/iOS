//
//  ConnectFeedItemLink.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeedItemLink extends ViewModel {
    
    constructor(attributes) {
        super();
        
        this._state.targetID = attributes.targetID;
        this._state.targetIDType = attributes.targetIDType;
        this._state.displayString = attributes.displayString;
        this._state.targetType = attributes.targetType;
    }
    
    get targetID() { return this._state.targetID; }
    get targetIDType() { return this._state.targetIDType; }
    get displayString() { return this._state.displayString; }
    get targetType() { return this._state.targetType; }
}

_SegueCoordinator.addSupportedSegue(ConnectFeedItemLink, Segue.TYPES.SELECT);

_NativeBridge.sharedBridge.registerBridgedConstructor(ConnectFeedItemLink);

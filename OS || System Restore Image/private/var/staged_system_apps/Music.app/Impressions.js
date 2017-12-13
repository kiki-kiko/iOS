//
//  Impressions.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

// MARK: - ImpressionNode

class ImpressionNode extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.object = attributes.object;
        this._state.events = attributes.events;
        this._state.childImpressionNodes = attributes.childImpressionNodes;
    }
    
    // MARK: - Properties
    
    get object() { return this._state.object; }
    get events() { return this._state.events; }
    get childImpressionNodes() { return this._state.childImpressionNodes; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(ImpressionNode);


// MARK: - ImpressionEvent

class ImpressionEvent extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.kind = attributes.kind;
        this._state.date = new Date(attributes.serializedDate);
    }
    
    // MARK: - Properties
    
    get kind() { return this._state.kind; }
    get date() { return this._state.date; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(ImpressionEvent);

ImpressionEvent.KIND = {
    APPEARED:       "appeared", 
    DISAPPEARED:    "disappeared", 
};

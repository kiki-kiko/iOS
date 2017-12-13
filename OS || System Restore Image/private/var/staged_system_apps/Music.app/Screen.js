//
//  Screen.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedScreen extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes, mainWindow) {
        super();
        
        this._state.scale = attributes.scale;
        this._state.size = attributes.dimensions.size;
        this._state.fixedSize = attributes.dimensions.fixedSize;
        this._state.mainWindow = mainWindow;
        
        this._state.updateWithDimensions = function(self, dimensions) {
            self._state.size = dimensions.size;
            self._state.fixedSize = dimensions.fixedSize;
            
            const callback = self.onDimensionsChange;
            if (typeof(callback) == "function") {
                callback(dimensions);
            }
        };
    }
    
    // MARK: - Properties
    
    get scale() { return this._state.scale; }
    
    get size() { return this._state.size; }
    get fixedSize() { return this._state.fixedSize; }
    
    get onDimensionsChange() { return this._state.onDimensionsChange; }
    set onDimensionsChange(value) { this._state.onDimensionsChange = value; }
    
    get mainWindow() { return this._state.mainWindow; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedScreen);

//
//  Artwork.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Artwork extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        this._state.treatment = Artwork.TREATMENT.DEFAULT;
    }
    
    // MARK: - Properties
    
    get dictionary() { return this._state.dictionary; }
    set dictionary(value) {
        this._state.dictionary = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "dictionary", value);
    }
    
    get cropStyle() { return this._state.cropStyle; }
    set cropStyle(value) {
        this._state.cropStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "cropStyle", value);
    }
    
    get treatment() { return this._state.treatment; }
    set treatment(value) {
        this._state.treatment = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "treatment", value);
    }
    
}

// MARK: - Types

Artwork.CROP_STYLE = {
    BOUNDED_BOX:        "bb", 
    CONSTRAINED_WIDTH:  "w", 
    CONSTRAINED_HEIGHT: "h", 
    SOURCE_SIZE:        "ss", 
    SPECIFIC_RECTANGLE: "sr", 
    SQUARE_CENTER_CROP: "cc", 
    FA:                 "fa", // -270T
    FB:                 "fb", // -39T -39B
    FC:                 "fc", // -170T -100B
};

Artwork.TREATMENT = {
    DEFAULT:    "default", 
    CIRCLE:     "circle", 
};

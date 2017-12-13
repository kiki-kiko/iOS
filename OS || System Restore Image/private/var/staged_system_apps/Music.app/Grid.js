//
//  Grid.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Grid extends ViewModel {
    
    // MARK: - Properties
    
    get sections() { return this._state.sections; }
    set sections(value) {
        this._state.sections = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "sections", value);
    }

    get adaptiveLayoutStyle() { return this._state.adaptiveLayoutStyle; }
    set adaptiveLayoutStyle(value) {
        this._state.adaptiveLayoutStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "adaptiveLayoutStyle", value);
    }
}

// MARK: - Types

Grid.ADAPTIVE_LAYOUT_STYLE = {
    DEFAULT: "default",
    COMPACT_LIST: "compactList",
};

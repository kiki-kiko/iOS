//
//  SearchWelcome.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SearchWelcome extends ViewModel {
    
    // MARK: - Properties
    
    get sections() { return this._state.sections; }
    set sections(value) {
        this._state.sections = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "sections", value);
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(SearchWelcome);

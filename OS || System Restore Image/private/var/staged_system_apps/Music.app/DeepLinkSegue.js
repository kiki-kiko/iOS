//
//  DeepLinkSegue.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class DeepLinkSegue extends Segue {
    
    // MARK: - Properties
    
    get viewIdentifier() { return this._state.viewIdentifier; }
    set viewIdentifier(value) {
        this._state.viewIdentifier = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "viewIdentifier", value);
    }
    
    get pushSegues() { return this._state.pushSegues; }
    set pushSegues(value) {
        this._state.pushSegues = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "pushSegues", value);
    }
    
}

DeepLinkSegue.VIEW_IDENTIFIER = {
    LIBRARY_TAB:    "libraryTab", 
    FOR_YOU_TAB:    "forYouTab", 
    CONNECT_TAB:    "connectTab", 
    BROWSE_TAB:     "browseTab", 
    RADIO_TAB:      "radioTab", 
    SEARCH_TAB:     "searchTab", 
    NOW_PLAYING:    "nowPlaying", 
};


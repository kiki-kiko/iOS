//
//  SearchRecentsSection.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SearchRecentsSection extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super(...arguments);
        
        this._state.didSelectSearchRecent = function(self, searchRecentTitle, searchRecentIndex) {
            const searchRecent = {
                title: searchRecentTitle, 
                index: searchRecentIndex, 
            };
            
            const callback = self.onSearchRecentSelectionPerformed;
            if (typeof(callback) == "function") {
                callback(searchRecent);
            }
        };
    }
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get onSearchRecentSelectionPerformed() { return this._state.onSearchRecentSelectionPerformed; }
    set onSearchRecentSelectionPerformed(callback) { this._state.onSearchRecentSelectionPerformed = callback; }
    
}

//
//  TVShowEpisodeDetailItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class TVShowEpisodeDetailItem extends BaseItem {
    
    // MARK: - Properties
    
    get headline() { return this._state.headline; }
    set headline(value) {
        this._state.headline = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "headline", value);
    }
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get showName() { return this._state.showName; }
    set showName(value) {
        this._state.showName = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "showName", value);
    }
    
    get description() { return this._state.description; }
    set description(value) {
        this._state.description = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "description", value);
    }
    
    get episodeInformationItems() { return this._state.episodeInformationItems; }
    set episodeInformationItems(value) {
        this._state.episodeInformationItems = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "episodeInformationItems", value);
    }
}

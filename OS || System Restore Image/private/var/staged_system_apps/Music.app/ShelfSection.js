//
//  ShelfSection.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ShelfSection extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        this._state.height = ShelfSection.HEIGHT.DEFAULT;
    }
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }

    get isRankedList() { return this._state.isRankedList; }
    set isRankedList(value) {
        this._state.isRankedList = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isRankedList", value);
    }
    
    get isFeatured() { return this._state.isFeatured; }
    set isFeatured(value) {
        this._state.isFeatured = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isFeatured", value);
    }
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
    get height() {return this._state.height; }
    set height(value) {
        this._state.height = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "height", value);
    }
    
    get uniformCellType() {return this._state.uniformCellType; }
    set uniformCellType(value) {
        this._state.uniformCellType = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "uniformCellType", value);
    }
    
    // MARK: - Methods
    
    appendItems(items) {
        for (const item of items) {
            this._state.items.push(item);
        }
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "appendItems", [items]);
    }
    
}

// MARK: - Types

ShelfSection.HEIGHT = {
    DEFAULT: "default", 
    COMPACT: "compact", 
    REGULAR: "regular", 
};

ShelfSection.UNIFORM_CELL_TYPE = {
    ALBUM: "album",
    ARTIST: "artist",
    FEATURED_RADIO_SHOW: "featuredRadioShow",
    FEATURED_MUSIC_VIDEO: "featuredMusicVideo",
    FEATURED_SHOWCASE: "featuredShowcase",
    CUSTOM_ROOM_ALBUM: "customRoomAlbum",
};

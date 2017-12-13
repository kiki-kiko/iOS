//
//  GridSection.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class GridSection extends BridgedObject {
    
    // MARK: - Properties
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get items() { return this._state.items; }
    set items(value) {
        this._state.items = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "items", value);
    }
    
    get isRankedList() { return this._state.isRankedList; }
    set isRankedList(value) {
        this._state.isRankedList = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "isRankedList", value);
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

GridSection.UNIFORM_CELL_TYPE = {
    ALBUM: "album",
    ARTIST: "artist",
    CUSTOM_ROOM_ALBUM: "customRoomAlbum",
    TV_SHOW: "tvShow",
};

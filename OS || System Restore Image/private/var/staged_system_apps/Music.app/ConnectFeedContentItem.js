//
//  ConnectFeedContentItem.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ConnectFeedContentItem extends BaseItem {
    
    // MARK: - Deprecated
    
    get artwork() {
        console.warn("connectFeedContentItem.artwork was deprecated, and replaced with connectFeedContentItem.backgroundArtwork.");
        return this.backgroundArtwork;
    }
    
    set artwork(value) {
        console.warn("connectFeedContentItem.artwork was deprecated, and replaced with connectFeedContentItem.backgroundArtwork.");
        this.backgroundArtwork = value;
    }
    
}

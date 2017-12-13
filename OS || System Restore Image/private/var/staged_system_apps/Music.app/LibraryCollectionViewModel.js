//
//  LibraryCollectionViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class LibraryCollectionViewModel extends ViewModel {
    constructor({_collectionStorePlatformDictionary = undefined} = {}) {
        super(...arguments);
        this._state.collectionStorePlatformDictionary = _collectionStorePlatformDictionary;
    }
    
    get relatedContentLink() { return this._state.relatedContentLink; }
    set relatedContentLink(value) {
        this._state.relatedContentLink = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "relatedContentLink", value);
    }
    
    get collectionStorePlatformDictionary() { return this._state.collectionStorePlatformDictionary; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(LibraryCollectionViewModel);

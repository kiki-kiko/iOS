//
//  AlbumDetailComponentController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class AlbumDetailComponentController extends ComponentController {
    
    // MARK: - Object lifecycle
    
    constructor({ viewModel = undefined, albumStorePlatformDictionary = undefined } = {}) {
        super(...arguments);
        
        if (viewModel) {
            this._state.viewModel = viewModel;
        }
        else if (albumStorePlatformDictionary) {
            this.viewModel = new AlbumDetail({ albumStorePlatformDictionary });
        }
        else {
            let errorMessage = "Incorrect usage of the AlbumDetailComponentController API. ";
            errorMessage += "Unlike vanilla ComponentController subclasses, ";
            errorMessage += "AlbumDetailComponentController is meant to ";
            errorMessage += "have enough metadata to have a fully initialized ";
            errorMessage += "view model in the constructor.";
            throw errorMessage;
        }
    }
    
    // MARK: - ComponentController
    
    // TODO: override viewModel setter to throw when trying to replace the view model.
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(AlbumDetailComponentController);

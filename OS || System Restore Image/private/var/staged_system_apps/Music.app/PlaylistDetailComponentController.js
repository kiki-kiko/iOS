//
//  PlaylistDetailComponentController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class PlaylistDetailComponentController extends ComponentController {
    
    // MARK: - Object lifecycle
    
    constructor({ viewModel = undefined, playlistStorePlatformDictionary = undefined } = {}) {
        super(...arguments);
        
        if (viewModel) {
            this._state.viewModel = viewModel;
        }
        else if (playlistStorePlatformDictionary) {
            this.viewModel = new PlaylistDetail({ playlistStorePlatformDictionary });
        }
        else {
            let errorMessage = "Incorrect usage of the PlaylistDetailComponentController API. ";
            errorMessage += "Unlike vanilla ComponentController subclasses, ";
            errorMessage += "PlaylistDetailComponentController is meant to ";
            errorMessage += "have enough metadata to have a fully initialized ";
            errorMessage += "view model in the constructor.";
            throw errorMessage;
        }
    }
    
    // MARK: - ComponentController
    
    // TODO: override viewModel setter to throw when trying to replace the view model.
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(PlaylistDetailComponentController);

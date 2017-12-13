//
//  LibraryCollectionComponentController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class LibraryCollectionComponentController extends ComponentController {
    
    // MARK: - Object lifecycle
    
    constructor({ _viewModel = undefined } = {}) {
        super(...arguments);

        if (_viewModel) {
            this._state.viewModel = _viewModel;
        }
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(LibraryCollectionComponentController);

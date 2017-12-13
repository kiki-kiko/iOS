//
//  SearchWelcomeComponentController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SearchWelcomeComponentController extends ComponentController {
    
    // MARK: - Object lifecycle
    
    constructor({ viewModel = undefined } = {}) {
        super(...arguments);
        
        if (viewModel) {
            this._state.viewModel = viewModel;
        }
        else {
            let errorMessage = "Incorrect usage of the SearchWelcomeComponentController API. ";
            errorMessage += "Unlike vanilla ComponentController subclasses, ";
            errorMessage += "SearchWelcomeComponentController is meant to ";
            errorMessage += "have enough metadata to have a fully initialized ";
            errorMessage += "view model in the constructor.";
            throw errorMessage;
        }
    }
    
    // MARK: - ComponentController
    
    // TODO: override viewModel setter to throw when trying to replace the view model.
    
}

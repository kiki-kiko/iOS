//
//  AlertComponentController.js
//  Music
//
//  Copyright © 2017 Apple Inc. All rights reserved.
//

class AlertComponentController extends ComponentController {
    
    constructor({ viewModel = undefined } = {}) {
        super(...arguments);
        
        if (typeof(viewModel) == "object" && viewModel instanceof AlertViewModel) {
            super.viewModel = viewModel;
        }
        else {
            console.error("You can only instantiate this class with an AlertViewModel instance.");
        }
    }
    
    get viewModel() { return super.viewModel; }
    set viewModel(value) {
        console.error("Setting the viewModel property of this class is not supported, you must pass the viewModel into the constructor.");
    }
}

//
//  ComponentController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ComponentController extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor({ _headerItem = undefined } = {}) {
        super();
        
        if (_headerItem) {
            this._state.headerItem = _headerItem;
        }
        else {
            let newHeaderItem = new HeaderItem();
            this._state.headerItem = newHeaderItem;
            _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "headerItem", newHeaderItem);
        }
        
        this._state.contentLoadingObserverCompletionHandlers = {};
        
        this._state.contentLoadingDidComplete = function(self, contentLoadingObserverIdentifier, serializedDate) {
            const callback = self._state.contentLoadingObserverCompletionHandlers[contentLoadingObserverIdentifier];
            if (typeof(callback) == "function") {
                delete self._state.contentLoadingObserverCompletionHandlers[contentLoadingObserverIdentifier];
                let date = new Date(serializedDate);
                callback(date);
            }
        };
    }
    
    get headerItem() { return this._state.headerItem; }

    // MARK: - Properties
    
    get viewModel() { return this._state.viewModel; }
    set viewModel(value) {
        this._state.viewModel = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "viewModel", value);
    }
    
    get title() { return this.headerItem.title; }
    set title(value) {
        this.headerItem.title = value;
    }
    
    get showsLargeTitleHeader() { return this.headerItem.showsLargeTitleHeader; }
    set showsLargeTitleHeader(value) {
        this.headerItem.showsLargeTitleHeader = value;
    }
    
    // MARK: - Methods
    
    notifyWhenCurrentlyVisibleContentLoadingCompletes(completionHandler) {
        if (typeof(completionHandler) == "function") {
            const contentLoadingObserverIdentifier = UUID();
            this._state.contentLoadingObserverCompletionHandlers[contentLoadingObserverIdentifier] = completionHandler;
            _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "notifyWhenCurrentlyVisibleContentLoadingCompletes", [contentLoadingObserverIdentifier]);
        }
    }
    
    // MARK: - View Lifecycle Hooks
    
    didLoad() {}
    willAppear(animated) {}
    didAppear(animated) {}
    willDisappear(animated) {}
    didDisappear(animated) {}
    willUnload() {}
    
}

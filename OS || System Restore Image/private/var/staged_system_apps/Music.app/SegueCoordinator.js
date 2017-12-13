//
//  SegueCoordinator.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

Segue.TYPES = {
    SELECT: "select",
    ACCESSORY_BUTTON_SELECT: "accessoryButtonSelect",
};

class _BridgedSegueCoordinator extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor() {
        let attributes = {
            _shouldSkipObjectConstructionWithNativeBridge: true, 
        };
        super(attributes);
    }
    
    // MARK: - API
    
    addSupportedSegue(classForSegue, segueType) {
        const eventCallbackPropertyName = this.synthesizeEventCallbackPropertyName(segueType);
        Object.defineProperty(classForSegue.prototype, eventCallbackPropertyName, {
            get: function() {
                return this._state[eventCallbackPropertyName];
            },
            set: function(callback) {
                this._state[eventCallbackPropertyName] = callback;
                _SegueCoordinator.updateValidHandlers(this, segueType, (typeof(callback) == "function"));
            }
        });
        
        if (segueType == Segue.TYPES.SELECT) {
            const selectionPerformedEventCallbackPropertyName = "onSelectionPerformed";
            Object.defineProperty(classForSegue.prototype, selectionPerformedEventCallbackPropertyName, {
                get: function() {
                    return this._state[selectionPerformedEventCallbackPropertyName];
                },
                set: function(callback) {
                    this._state[selectionPerformedEventCallbackPropertyName] = callback;
                }
            });
        }
    }
    
    initiateSegue(item, segueType, options) {
        let segue = {};
        
        const eventCallbackPropertyName = this.synthesizeEventCallbackPropertyName(segueType);
        const callback = item._state[eventCallbackPropertyName];
        if (typeof(callback) == "function") {
            segue = callback(item);
            
            if (options.allowsInvokingDidLoadPreemptivelyForComponentControllerBasedSegue) {
                if ((segue instanceof PushSegue) || (segue instanceof PresentationSegue)) {
                    const componentController = segue.componentController;
                    if (typeof(componentController) == "object") {
                        componentController.didLoad();
                        _NativeBridge.sharedBridge.enqueuePropertyUpdate(segue, "hasInvokedDidLoadPreemptively", true);
                    }
                }
            }
        }
        
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "registerPendingSegue", [item, segueType, segue]);
    }
    
    reportSelectionPerformed(item, snapshotImpressionsTree) {
        const callback = item._state.onSelectionPerformed;
        if (typeof(callback) == "function") {
            callback(item, snapshotImpressionsTree);
        }
    }
    
    updateValidHandlers(item, segueType, hasValidHandler) {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "updateValidHandlers", [item, segueType, hasValidHandler]);
    }
    
    // MARK: - Internal
    
    synthesizeEventCallbackPropertyName(segueType) {
        const capitalizedSegueType = segueType.charAt(0).toUpperCase() + segueType.slice(1);
        const eventCallbackPropertyName = "on" + capitalizedSegueType;
        return eventCallbackPropertyName;
    }
    
}

_SegueCoordinator = new _BridgedSegueCoordinator();

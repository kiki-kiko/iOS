const DataActivationController = {
    dataPlanAccountUpdatedWithIccid (iccid) {
        window.webkit.messageHandlers.dataPlanAccountUpdatedWithIccid.postMessage(iccid)
    },
    
    showCancelButtonSelected () {
        window.webkit.messageHandlers.showCancelButtonSelected.postMessage({})
    },
    
    hideCancelButtonSelected () {
        window.webkit.messageHandlers.hideCancelButtonSelected.postMessage({})
    },
    
    dataPlanAccountUpdated() {
        window.webkit.messageHandlers.dataPlanAccountUpdated.postMessage({})
    },
    
    doneSelected () {
        window.webkit.messageHandlers.doneSelected.postMessage({})
    },
    
    showVerifyingIndicator () {
        window.webkit.messageHandlers.showVerifyingIndicator.postMessage({})
    },
    
    hideVerifyingIndicator () {
        window.webkit.messageHandlers.hideVerifyingIndicator.postMessage({})
    },
    
    dismissKeyboard () {
        window.webkit.messageHandlers.dismissKeyboard.postMessage({})
    },
    
    dataPlanAccountUpdatedWithInfo (info) {
        window.webkit.messageHandlers.dataPlanAccountUpdatedWithInfo.postMessage(info)
    },
    
    dataPlanAccountCancelled () {
        window.webkit.messageHandlers.dataPlanAccountCancelled.postMessage({})
    }
}

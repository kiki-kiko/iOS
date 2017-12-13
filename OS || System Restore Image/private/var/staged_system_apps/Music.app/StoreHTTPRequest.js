//
//  StoreHTTPRequest.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

const HTTP = {
    METHOD: {
        GET:        "GET", 
        POST:       "POST", 
        PUT:        "PUT", 
        DELETE:     "DELETE", 
        HEAD:       "HEAD", 
    }, 
    STATUS_CODES: {
        SUCCESS:                    200, 
        CLIENT_TIMEOUT:             900, 
        CLIENT_PARSING_ERROR:       901, 
        CLIENT_FAILED_UNEXPECTEDLY: 950, 
    }, 
};

class StoreHTTPRequest extends BridgedObject {
    
    // MARK: - Properties
    
    get url() { return this._state.url; }
    set url(value) {
        this._state.url = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "url", value);
    }
    
    get method() { return this._state.method; }
    set method(value) {
        this._state.method = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "method", value);
    }
    
    get headers() { return this._state.headers; }
    set headers(value) {
        this._state.headers = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "headers", value);
    }
    
    get queryItems() { return this._state.queryItems; }
    set queryItems(value) {
        this._state.queryItems = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "queryItems", value);
    }
    
    get body() { return this._state.body; }
    set body(value) {
        this._state.body = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "body", value);
    }
    
    get timeout() { return this._state.timeout; }
    set timeout(value) {
        this._state.timeout = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "timeout", value);
    }
    
    get retryCount() { return this._state.retryCount; }
    set retryCount(value) {
        this._state.retryCount = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "retryCount", value);
    }
    
    get shouldSuppressResponseDialogs() { return this._state.shouldSuppressResponseDialogs; }
    set shouldSuppressResponseDialogs(value) {
        this._state.shouldSuppressResponseDialogs = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "shouldSuppressResponseDialogs", value);
    }
    
    get onResponse() { return this._state.onResponse; }
    set onResponse(value) { this._state.onResponse = value; }
    
    // MARK: - Methods
    
    send() {
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "send", []);
    }
    
    cancel() {
        delete this._state["onResponse"];
        _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "cancel", []);
    }
    
}

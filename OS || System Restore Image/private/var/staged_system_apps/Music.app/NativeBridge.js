//
//  NativeBridge.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class _NativeBridge {
    
    // MARK: - Object lifecycle
    
    constructor(globalScope) {
        this.records = [];
        this.bridgedObjects = {};
        this.bridgedConstructors = {};
        this.asynchronousCallbacks = [];
        this.globalScope = globalScope;
        this.shouldIgnoreNextObjectConstructionEnqueuing = false;
    }
    
    // MARK: - API
    
    enqueueObjectConstruction(object) {
        if (this.shouldIgnoreNextObjectConstructionEnqueuing) {
            this.shouldIgnoreNextObjectConstructionEnqueuing = false;
        }
        else {
            const nativeBridgeIdentifier = UUID();
            object._state.nativeBridgeIdentifier = nativeBridgeIdentifier;
            
            let serializedClassHierarchy = [];
            let currentClass = object.constructor;
            while (typeof(currentClass) == "function" && currentClass.name.length > 0) {
                serializedClassHierarchy.push(currentClass.name);
                currentClass = Object.getPrototypeOf(currentClass);
            }
            
            let record = {};
            record.type = "construction";
            record.classHierarchy = serializedClassHierarchy;
            record.nativeBridgeIdentifier = nativeBridgeIdentifier;
            this.records.push(record);
            
            this.bridgedObjects[nativeBridgeIdentifier] = object;
        }
    }
    
    enqueueMethodInvocation(object, methodName, methodInvocationArguments) {
        let record = {};
        record.type = "methodInvocation";
        record.nativeBridgeIdentifier = object._state.nativeBridgeIdentifier;
        record.methodName = methodName;
        record.arguments = this.serializeScriptingObject(methodInvocationArguments);
        this.records.push(record);
    }
    
    enqueuePropertyUpdate(object, propertyName, value) {
        let record = {};
        record.type = "propertyUpdate";
        record.nativeBridgeIdentifier = object._state.nativeBridgeIdentifier;
        record.propertyName = propertyName;
        record.value = this.serializeScriptingObject(value);
        this.records.push(record);
    }
    
    enqueueAsynchronousCallback(callback) {
        if (typeof(callback) == "function") {
            this.asynchronousCallbacks.push(callback);
        }
    }
    
    processNativeRecords(nativeRecords) {
        for (const nativeRecord of nativeRecords) {
            const nativeBridgeIdentifier = nativeRecord.nativeBridgeIdentifier;
            const type = nativeRecord.type;
            if (type == "construction") {
                let bridgedConstructor = undefined;
                const constructorName = nativeRecord.constructorName;
                if (typeof(constructorName) == "string") {
                    bridgedConstructor = this.bridgedConstructors[constructorName];
                }
                else {
                    const constructorReference = nativeRecord.constructorReference;
                    if (typeof(constructorReference) == "object") {
                        const constructorHolder = this.bridgedObjects[constructorReference.nativeBridgeIdentifier];
                        if (typeof(constructorHolder) == "object") {
                            bridgedConstructor = constructorHolder._state[constructorReference.propertyName];
                        }
                    }
                }
                
                if (typeof(bridgedConstructor) == "function") {
                    const wasIgnoringNextObjectConstructionEnqueuing = this.shouldIgnoreNextObjectConstructionEnqueuing;
                    this.shouldIgnoreNextObjectConstructionEnqueuing = true;
                    
                    let object = new (Function.prototype.bind.apply(bridgedConstructor, [undefined].concat(this.deserializeNativeObject(nativeRecord.arguments))));
                    
                    this.shouldIgnoreNextObjectConstructionEnqueuing = wasIgnoringNextObjectConstructionEnqueuing;
                    
                    object._state.nativeBridgeIdentifier = nativeBridgeIdentifier;
                    this.bridgedObjects[nativeBridgeIdentifier] = object;
                }
            }
            else if (type == "independentlyInstantiatedObjectReconciliation") {
                const nativeBridgeIdentifier = nativeRecord.nativeBridgeIdentifier;
                const object = this.globalScope[nativeRecord.globalName];
                object._state.nativeBridgeIdentifier = nativeBridgeIdentifier;
                this.bridgedObjects[nativeBridgeIdentifier] = object;
            }
            else {
                let object = this.bridgedObjects[nativeBridgeIdentifier];
                if (typeof(object) == "object") {
                    switch (type) {
                        case "callbackInvocation": {
                            const callback = object._state[nativeRecord.callbackName];
                            if (typeof(callback) == "function") {
                                callback.apply(undefined, this.deserializeNativeObject(nativeRecord.arguments));
                            }
                            break;
                        }
                        case "globalScopeAssignment": {
                            this.globalScope[nativeRecord.globalName] = object;
                            break;
                        }
                        case "methodInvocation": {
                            const method = object.constructor.prototype[nativeRecord.methodName];
                            if (typeof(method) == "function") {
                                method.apply(object, this.deserializeNativeObject(nativeRecord.arguments));
                            }
                            break;
                        }
                        case "propertyUpdate": {
                            object._state[nativeRecord.propertyName] = this.deserializeNativeObject(nativeRecord.value);
                            break;
                        }
                        case "destruction": {
                            delete this.bridgedObjects[nativeBridgeIdentifier];
                            break;
                        }
                        default:
                            console.log("Ignoring unsupported record: " + JSON.stringify(nativeRecord, null, 4));
                            break;
                    }
                }
            }
        }
        
        while (this.asynchronousCallbacks.length > 0) {
            const asynchronousCallbacks = this.asynchronousCallbacks;
            this.asynchronousCallbacks = [];
            for (const callback of asynchronousCallbacks) {
                callback();
            }
        }
        
        const records = this.records;
        this.records = [];
        return records;
    }
    
    registerBridgedConstructor(bridgedConstructor) {
        this.bridgedConstructors[bridgedConstructor.name] = bridgedConstructor;
    }
    
    // MARK: - Internal
    
    deserializeNativeObject(nativeObject) {
        let deserializedNativeObject = undefined;
        if ((nativeObject instanceof Object) && (Object.keys(nativeObject).length == 1) && (typeof(nativeObject.nativeBridgeIdentifier) == "string")) {
            deserializedNativeObject = this.bridgedObjects[nativeObject.nativeBridgeIdentifier];
        }
        else if (nativeObject instanceof Array) {
            let deserializedArray = [];
            for (let item of nativeObject) {
                deserializedArray.push(this.deserializeNativeObject(item));
            }
            deserializedNativeObject = deserializedArray;
        }
        else if (nativeObject instanceof Object) {
            let deserializedDictionary = {};
            for (let key of Object.keys(nativeObject)) {
                let deserializedKey = this.deserializeNativeObject(key);
                let deserializedValue = this.deserializeNativeObject(nativeObject[key]);
                deserializedDictionary[deserializedKey] = deserializedValue;
            }
            deserializedNativeObject = deserializedDictionary;
        }
        else {
            deserializedNativeObject = nativeObject;
        }
        return deserializedNativeObject;
    }
    
    serializeScriptingObject(scriptingObject) {
        let serializedScriptingObject = undefined;
        if (scriptingObject instanceof Array) {
            let serializedArray = [];
            for (let item of scriptingObject) {
                serializedArray.push(this.serializeScriptingObject(item));
            }
            serializedScriptingObject = serializedArray;
        }
        else if (scriptingObject instanceof BridgedObject) {
            serializedScriptingObject = {
                nativeBridgeIdentifier: scriptingObject._state.nativeBridgeIdentifier
            };
        }
        else if (scriptingObject instanceof Object) {
            let serializedDictionary = {};
            for (let key of Object.keys(scriptingObject)) {
                let serializedKey = this.serializeScriptingObject(key);
                let serializedValue = this.serializeScriptingObject(scriptingObject[key]);
                serializedDictionary[serializedKey] = serializedValue;
            }
            serializedScriptingObject = serializedDictionary;
        }
        else {
            serializedScriptingObject = scriptingObject;
        }
        return serializedScriptingObject;
    }
    
}

_NativeBridge.sharedBridge = new _NativeBridge(this);


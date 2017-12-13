//
//  Promise.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

/*
 *  See https://promisesaplus.com/
 *  and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */

const _PROMISE_STATE = {
    PENDING:    0, 
    FULFILLED:  1, 
    REJECTED:   2, 
};

const _PROMISE_RESOLUTION_SCHEDULING_POLICY = {
    ASYNCHRONOUS:   0,  
    SYNCHRONOUS:    1, 
};

class _PromiseImplementation {
    constructor(executor) {
        this.state = _PROMISE_STATE.PENDING;
        this.observers = [];
        
        if (executor != _PromiseImplementation.noopFunction) {
            try {
                const self = this;
                executor(
                    (fulfilledValue) => {
                        self.fulfill(fulfilledValue, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
                    }, 
                    (rejectionReason) => {
                        self.reject(rejectionReason, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
                    }
                );
            }
            catch(exception) {
                this.reject(exception, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
            }
        }
    }
                
    then(parentPromise, onFulfilled, onRejected, options) {
        const skipSubsequentPromiseReturn = options.skipSubsequentPromiseReturn;
        const allowsSynchronousResolutionForStaticValueOrReason = options.allowsSynchronousResolutionForStaticValueOrReason;
        let returnedPromise = skipSubsequentPromiseReturn ? undefined : parentPromise;
        const numberOfArguments = arguments.length;
        const onFulfilledTypeIsFunction = (numberOfArguments > 0 && typeof(onFulfilled) == "function");
        const onRejectedTypeIsFunction  = (numberOfArguments > 1 && typeof(onRejected)  == "function");
        if (onFulfilledTypeIsFunction || onRejectedTypeIsFunction) {
            const state = this.state;
            let needsFlushObservers = false;
            
            if (state == _PROMISE_STATE.PENDING) {
                let observer = {};
                if (onFulfilledTypeIsFunction) {
                    observer.onFulfilled = onFulfilled;
                }
                if (onRejectedTypeIsFunction) {
                    observer.onRejected = onRejected;
                }
                if (!skipSubsequentPromiseReturn) {
                    returnedPromise = new _Promise(_PromiseImplementation.noopFunction);
                    observer.promise = returnedPromise;
                }
                observer.parentPromise = parentPromise;
                this.observers.push(observer);
            }
            else if (state == _PROMISE_STATE.FULFILLED && onFulfilledTypeIsFunction) {
                let observer = {};
                observer.onFulfilled = onFulfilled;
                if (!skipSubsequentPromiseReturn) {
                    returnedPromise = new _Promise(_PromiseImplementation.noopFunction);
                    observer.promise = returnedPromise;
                }
                observer.parentPromise = parentPromise;
                this.observers.push(observer);
                needsFlushObservers = true;
            }
            else if (state == _PROMISE_STATE.REJECTED && onRejectedTypeIsFunction) {
                let observer = {};
                observer.onRejected = onRejected;
                if (!skipSubsequentPromiseReturn) {
                    returnedPromise = new _Promise(_PromiseImplementation.noopFunction);
                    observer.promise = returnedPromise;
                }
                observer.parentPromise = parentPromise;
                this.observers.push(observer);
                needsFlushObservers = true;
            }
            
            if (needsFlushObservers) {
                let resolutionSchedulingPolicy = _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS;
                if (allowsSynchronousResolutionForStaticValueOrReason) {
                    resolutionSchedulingPolicy = _PROMISE_RESOLUTION_SCHEDULING_POLICY.SYNCHRONOUS;
                }
                
                const self = this;
                self.schedule(resolutionSchedulingPolicy, function() {
                    self.flushObservers();
                });
            }
        }
        return returnedPromise;
    }
    
    flushObservers() {
        switch (this.state) {
            case _PROMISE_STATE.PENDING:
                break;
            case _PROMISE_STATE.FULFILLED:
                this.flushSpecificObservers("onFulfilled", this.fulfilledValue);
                break;
            case _PROMISE_STATE.REJECTED:
                this.flushSpecificObservers("onRejected", this.rejectionReason);
                break;
            default:
                break;
        }
    }
    
    flushSpecificObservers(callbackName, callbackArgument) {
        const observers = this.observers;
        this.observers = [];
        
        const observerPromiseResolutionProcedureOptions = {
            allowsSynchronousResolutionForStaticValueOrReason: false, 
        };
        
        for (const observer of observers) {
            const callback = observer[callbackName];
            const observerPromise = observer.promise; 
            if (callback) {
                let returnedValue;
                let didRejectObserverPromise = false;
                try {
                    returnedValue = callback(callbackArgument);
                }
                catch(exception) {
                    if (observerPromise) {
                        observerPromise._implementation.reject(exception, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
                    }
                    didRejectObserverPromise = true;
                }
                if (!didRejectObserverPromise) {
                    if (observerPromise) {
                        observerPromise._implementation.resolutionProcedure(returnedValue, observerPromiseResolutionProcedureOptions);
                    }
                }
            }
            else {
                if (observerPromise) {
                    observerPromise._implementation.resolutionProcedure(observer.parentPromise, observerPromiseResolutionProcedureOptions);
                }
            }
        }
    }
    
    fulfill(fulfilledValue, resolutionSchedulingPolicy) {
        if (this.state == _PROMISE_STATE.PENDING) {
            this.fulfilledValue = fulfilledValue;
            this.state = _PROMISE_STATE.FULFILLED;
            
            const self = this;
            self.schedule(resolutionSchedulingPolicy, function() {
                self.flushObservers();
            });
        }
    }
    
    reject(rejectionReason, resolutionSchedulingPolicy) {
        if (this.state == _PROMISE_STATE.PENDING) {
            this.rejectionReason = rejectionReason;
            this.state = _PROMISE_STATE.REJECTED;
            
            const self = this;
            self.schedule(resolutionSchedulingPolicy, function() {
                self.flushObservers();
            });
        }
    }
    
    resolutionProcedure(x, options) {
        const allowsSynchronousResolutionForStaticValueOrReason = options.allowsSynchronousResolutionForStaticValueOrReason;
        if (this.state == _PROMISE_STATE.PENDING) {
            let needsStaticFulfillment = false;
            if (x === this) {
                this.reject(new TypeError("A promise can't be resolved with itself."), _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
            }
            else if (x instanceof _Promise) {
                const self = this;
                const nestedResolutionOptions = {
                    skipSubsequentPromiseReturn: true, 
                    allowsSynchronousResolutionForStaticValueOrReason: false, 
                };
                x._implementation.then(
                    x, 
                    (fulfilledValue) => {
                        self.fulfill(fulfilledValue, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
                    }, 
                    (rejectionReason) => {
                        self.reject(rejectionReason, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
                    },
                    options
                );
            }
            else if (typeof(x) == "object" || typeof(x) == "function") {
                let then;
                let didReject = false;
                try {
                    then = x.then;
                }
                catch(exception) {
                    this.reject(exception, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
                    didReject = true;
                }
                
                if (!didReject) {
                    if (typeof(then) == "function") {
                        const self = this;
                        let didHandleThenCallback = false;
                        const resolvePromise = function(y) {
                            if (!didHandleThenCallback) {
                                didHandleThenCallback = true;
                                const nestedResolutionOptions = {
                                    allowsSynchronousResolutionForStaticValueOrReason: false, 
                                };
                                self.resolutionProcedure(y, nestedResolutionOptions);
                            }
                        };
                        const rejectPromise = function(r) {
                            if (!didHandleThenCallback) {
                                didHandleThenCallback = true;
                                self.reject(r, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
                            }
                        };
                        
                        try {
                            then.apply(x, [resolvePromise, rejectPromise]);
                        }
                        catch(exception) {
                            if (!didHandleThenCallback) {
                                didHandleThenCallback = true;
                                this.reject(exception, _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS);
                            }
                        }
                    }
                    else {
                        needsStaticFulfillment = true;
                    }
                }
            }
            else {
                needsStaticFulfillment = true;
            }
            if (needsStaticFulfillment) {
                let resolutionSchedulingPolicy = _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS;
                if (allowsSynchronousResolutionForStaticValueOrReason) {
                    resolutionSchedulingPolicy = _PROMISE_RESOLUTION_SCHEDULING_POLICY.SYNCHRONOUS;
                }
                this.fulfill(x, resolutionSchedulingPolicy);
            }
        }
    }
    
    schedule(schedulingPolicy, callback) {
        switch (schedulingPolicy) {
            case _PROMISE_RESOLUTION_SCHEDULING_POLICY.ASYNCHRONOUS:
                Async.invoke(callback);
                break;
            case _PROMISE_RESOLUTION_SCHEDULING_POLICY.SYNCHRONOUS:
                callback();
                break;
            default:
                break;
        }
    }
}

_PromiseImplementation.noopFunction = function() {};

class _Promise {
    constructor(executor) {
        if (typeof(executor) != "function") {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor.");
        }
        else if (!(this instanceof _Promise)) {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }
        else {
            this._implementation = new _PromiseImplementation(executor);
        }
    }
    
    then(onFulfilled, onRejected) {
        const options = {
            skipSubsequentPromiseReturn: false, 
            allowsSynchronousResolutionForStaticValueOrReason: false, 
        };
        return this._implementation.then(this, onFulfilled, onRejected, options);
    }
    
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
}

_Promise.all = function(iterable) {
    const executor = (resolve, reject) => {
        let fulfilledValues = [];
        let index = 0;
        for (let object of iterable) {
            fulfilledValues[index] = undefined;
            index += 1;
        }
        
        let didReject = false;
        let numberOfFulfilledValues = 0;
        const numberOfPromises = index;
        index = 0;
        
        const resolutionProcedureOptions = {
            allowsSynchronousResolutionForStaticValueOrReason: true, 
        };
        
        const thenInvocationOptions = {
            skipSubsequentPromiseReturn: true, 
            allowsSynchronousResolutionForStaticValueOrReason: true, 
        };
        
        for (const object of iterable) {
            let promise;
            if (object instanceof _Promise) {
                promise = object;
            }
            else {
                promise = new _Promise(_PromiseImplementation.noopFunction);
                promise._implementation.resolutionProcedure(object, resolutionProcedureOptions);
            }
            const currentIndex = index;
            promise._implementation.then(
                promise, 
                (fulfilledValue) => {
                    fulfilledValues[currentIndex] = fulfilledValue;
                    numberOfFulfilledValues += 1;
                    if (numberOfFulfilledValues == numberOfPromises) {
                         resolve(fulfilledValues);
                    }
                }, 
                (rejectionReason) => {
                    if (!didReject) {
                        didReject = true;
                        reject(rejectionReason);
                    }
                }, 
                thenInvocationOptions
            );
            index += 1;
        }
        
        if (iterable.length == 0) {
            resolve([]);
        }
    };
    return new _Promise(executor);
};

_Promise.race = function(iterable) {
    const executor = (resolve, reject) => {
        const resolutionProcedureOptions = {
            allowsSynchronousResolutionForStaticValueOrReason: true, 
        };
        
        const thenInvocationOptions = {
            skipSubsequentPromiseReturn: true, 
            allowsSynchronousResolutionForStaticValueOrReason: true, 
        };
        
        let didFulfillOrReject = false;
        for (const object of iterable) {
            let promise;
            if (object instanceof _Promise) {
                promise = object;
            }
            else {
                promise = new _Promise(_PromiseImplementation.noopFunction);
                promise._implementation.resolutionProcedure(object, resolutionProcedureOptions);
            }
            promise._implementation.then(
                promise, 
                (fulfilledValue) => {
                    if (!didFulfillOrReject) {
                        didFulfillOrReject = true;
                        resolve(fulfilledValue);
                    }
                }, 
                (rejectionReason) => {
                    if (!didFulfillOrReject) {
                        didFulfillOrReject = true;
                        reject(rejectionReason);
                    }
                }, 
                thenInvocationOptions
            );
        }
    };
    return new _Promise(executor);
};

_Promise.reject = function(reason) {
    let promise = new _Promise(_PromiseImplementation.noopFunction);
    promise._implementation.reject(reason);
    return promise;
};

_Promise.resolve = function(x) {
    let promise = new _Promise(_PromiseImplementation.noopFunction);
    const options = {
        allowsSynchronousResolutionForStaticValueOrReason: false, 
    };
    promise._implementation.resolutionProcedure(x, options);
    return promise;
};

Promise = _Promise;

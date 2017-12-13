//
//  PushNotificationObserver.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedPushNotificationObserver extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.currentTopicObserverToken = 1;
        this._state.topicObservers = [];
        
        this._state.observersForTopic = function(bridgedObserver, topic) {
            var observers = bridgedObserver._state.topicObservers;
            return observers.filter(function(currentObserver) {
                return currentObserver.topic === topic;
            });
        }
        
        this._state.handlePushNotification = function(bridgedObserver, topic, userInfo) {
            var topicObservers = bridgedObserver._state.observersForTopic(bridgedObserver, topic);
            var currentEvent = { 'topic' : topic, 'userInfo' : userInfo };
            topicObservers.forEach(function(currentObserver) {
                var currentHandler = currentObserver.handler;
                currentHandler(currentEvent);
            });
        }
    }
    
    // MARK: - Methods
    
    addTopicObserver(topic, handler) {
        var previousTopicObservers = this._state.observersForTopic(this, topic);
        var currentTopicObserverToken = this._state.currentTopicObserverToken;
        this._state.currentTopicObserverToken = currentTopicObserverToken + 1;
        
        var observers = this._state.topicObservers;
        observers.push({ 'topic': topic, 'handler' : handler, 'token' : currentTopicObserverToken });
        if (previousTopicObservers.length == 0) {
            _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "registerPushTopic", [topic]);
        }
        return currentTopicObserverToken;
    }
    
    removeTopicObserver(token) {
        var observers = this._state.topicObservers;
        var foundIndex = observers.findIndex(function(currentObserver) {
                                                 return currentObserver.token === token;
                                             });
        if (foundIndex != -1) {
            var removedObserver = observers[foundIndex];
            observers.splice(foundIndex, 1);
            var newTopicObservers = this._state.observersForTopic(this, removedObserver.topic);
            if (newTopicObservers.length == 0) {
                _NativeBridge.sharedBridge.enqueueMethodInvocation(this, "unregisterPushTopic", [topic]);
            }
        }
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedPushNotificationObserver);

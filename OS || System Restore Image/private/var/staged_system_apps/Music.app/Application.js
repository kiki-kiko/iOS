//
//  Application.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class BridgedApplication extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.identifier = attributes.identifier;
        this._state.version = attributes.version;
        this._state.isDeployedScript = attributes.isDeployedScript;
        this._state.selectedTabIdentifier = attributes.selectedTabIdentifier;
        
        this._state.initiateBecomingActive = function(self, options, requestIdentifier) {
            let completionHandler = function(segue) {
                _NativeBridge.sharedBridge.enqueueMethodInvocation(self, "registerSegueForBecomingActive", [requestIdentifier, segue]);
            };
            let callback = self._state.onBecomingActive;
            if (typeof(callback) == "function") {
                callback(options, completionHandler);
            }
            else {
                let segue = {};
                completionHandler(segue);
            }
        };
        
        this._state.initiateOpenURL = function(self, url, options, requestIdentifier) {
            let completionHandler = function(segue) {
                _NativeBridge.sharedBridge.enqueueMethodInvocation(self, "registerSegueForOpenURL", [requestIdentifier, segue]);
            };
            let callback = self._state.onOpenURL;
            if (typeof(callback) == "function") {
                // Horrible hack for backward compatibility.
                let argumentsString = callback.toString().split("(")[1].split(")")[0];
                let expectsOptions = (argumentsString.split(",").length >= 3);
                if (expectsOptions) {
                    callback(url, options, completionHandler);
                }
                else {
                    callback(url, completionHandler);
                }
            }
            else {
                let segue = {};
                completionHandler(segue);
            }
        };
        
        this._state.initiateSubscriptionRequired = function(self, storePlatformDictionary, reason) {
            let completionHandler = function(segue) {
                _NativeBridge.sharedBridge.enqueueMethodInvocation(self, "registerSegueForSubscriptionRequired", [segue]);
            };
            let callback = self._state.onSubscriptionRequired;
            if (typeof(callback) == "function") {
                callback(storePlatformDictionary, reason, completionHandler);
            }
            else {
                let segue = {};
                completionHandler(segue);
            }
        };
        
        this._state.updateSelectedTab = function(self, selectedTabIdentifier) {
            self._state.selectedTabIdentifier = selectedTabIdentifier;
            
            let callback = self._state.onSelectedTabChanged;
            if (typeof(callback) == "function") {
                callback(selectedTabIdentifier);
            }
        };
        
        this.connectTabController = ComponentController;
        this.forYouTabController = ComponentController;
        this.browseTabController = ComponentController;
        this.radioTabController = ComponentController;
        this.searchResultsController = SearchResultsComponentController;
        this.searchWelcomeController = SearchWelcomeComponentController;
        this.settingsController = ComponentController;
        this.albumDetailController = AlbumDetailComponentController;
        this.playlistDetailController = PlaylistDetailComponentController;
        this.shareRequest = ShareRequest;
        this.connectFeedItemLikeRequest = ConnectFeedItemLikeRequest;
        this.connectFeedItemCommentRequest = ConnectFeedItemCommentRequest;
        this.libraryCollectionComponentController = LibraryCollectionComponentController;
        
        this.ACTIVATION_METHOD = {
            REGULAR:    "regular", 
            OPEN_URL:   "openURL", 
        };
        
        this.SUBSCRIPTION_REQUIRED_REASONS = {
            STORE_PLAYBACK: "storePlayback", 
            RADIO_PLAYBACK: "radioPlayback", 
            LYRICS_VIEW:    "lyricsView",
            SHARED_QUEUE:   "sharedQueue",
        };
        
        this.TAB_IDENTIFIER = {
            LIBRARY:    "library", 
            FOR_YOU:    "forYou", 
            CONNECT:    "connect", 
            BROWSE:     "browse", 
            RADIO:      "radio", 
            SEARCH:     "search", 
        };
    }
    
    // MARK: - Properties
    
    get identifier() { return this._state.identifier; }
    get version() { return this._state.version; }
    get isDeployedScript() { return this._state.isDeployedScript; }
    get selectedTabIdentifier() { return this._state.selectedTabIdentifier; }
    
    get connectTabController() { return this._state.connectTabController; }
    set connectTabController(value) { this._state.connectTabController = value; }
    
    get forYouTabController() { return this._state.forYouTabController; }
    set forYouTabController(value) { this._state.forYouTabController = value; }
    
    get browseTabController() { return this._state.browseTabController; }
    set browseTabController(value) { this._state.browseTabController = value; }
    
    get radioTabController() { return this._state.radioTabController; }
    set radioTabController(value) { this._state.radioTabController = value; }
    
    get searchResultsController() { return this._state.searchResultsController; }
    set searchResultsController(value) { this._state.searchResultsController = value; }
    
    get searchWelcomeController() { return this._state.searchWelcomeController; }
    set searchWelcomeController(value) { this._state.searchWelcomeController = value; }
    
    get settingsController() { return this._state.settingsController; }
    set settingsController(value) { this._state.settingsController = value; }
    
    get albumDetailController() { return this._state.albumDetailController; }
    set albumDetailController(value) { this._state.albumDetailController = value; }
    
    get playlistDetailController() { return this._state.playlistDetailController; }
    set playlistDetailController(value) { this._state.playlistDetailController = value; }
        
    get shareRequest() { return this._state.shareRequest; }
    set shareRequest(value) { this._state.shareRequest = value; }
    
    get connectFeedItemLikeRequest() { return this._state.connectFeedItemLikeRequest; }
    set connectFeedItemLikeRequest(value) { this._state.connectFeedItemLikeRequest = value; }
    
    get connectFeedItemCommentRequest() { return this._state.connectFeedItemCommentRequest; }
    set connectFeedItemCommentRequest(value) { this._state.connectFeedItemCommentRequest = value; }
    
    get libraryCollectionComponentController() { return this._state.libraryCollectionComponentController; }
    set libraryCollectionComponentController(value) { this._state.libraryCollectionComponentController = value; }
    
    get onOpenURL() { return this._state.onOpenURL; }
    set onOpenURL(value) { this._state.onOpenURL = value; }
    
    get onLaunch() { return this._state.onLaunch; }
    set onLaunch(value) { return this._state.onLaunch = value; }
    
    get onEnteringForeground() { return this._state.onEnteringForeground; }
    set onEnteringForeground(value) { return this._state.onEnteringForeground = value; }
    
    get onBecomingActive() { return this._state.onBecomingActive; }
    set onBecomingActive(value) { return this._state.onBecomingActive = value; }
    
    get onResigningActive() { return this._state.onResigningActive; }
    set onResigningActive(value) { return this._state.onResigningActive = value; }
    
    get onEnteringBackground() { return this._state.onEnteringBackground; }
    set onEnteringBackground(value) { return this._state.onEnteringBackground = value; }
    
    get onSelectedTabChanged() { return this._state.onSelectedTabChanged; }
    set onSelectedTabChanged(value) { return this._state.onSelectedTabChanged = value; }
    
    get onSubscriptionRequired() { return this._state.onSubscriptionRequired; }
    set onSubscriptionRequired(value) { return this._state.onSubscriptionRequired = value; }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(BridgedApplication);

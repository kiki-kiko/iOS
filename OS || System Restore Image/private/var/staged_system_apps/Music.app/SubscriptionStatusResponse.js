//
//  SubscriptionStatusResponse.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SubscriptionStatusResponse extends BridgedObject {
    
    // MARK: - Object lifecycle
    
    constructor(attributes) {
        super();
        
        this._state.accountIdentifier = attributes.accountIdentifier;
        this._state.sessionIdentifier = attributes.sessionIdentifier;
        this._state.accountStatus = attributes.accountStatus;
        this._state.isSubscribed = attributes.isSubscribed;
        this._state.carrierBundlingStatus = attributes.carrierBundlingStatus;
        this._state.eligibilityStatus = attributes.eligibilityStatus;
        this._state.isDiscoveryModeEligible = attributes.isDiscoveryModeEligible;
        this._state.isFamilyOrganizer = attributes.isFamilyOrganizer;
        this._state.isFamilySubscription = attributes.isFamilySubscription;
        this._state.hasFamily = attributes.hasFamily;
        this._state.hasFamilyMembers = attributes.hasFamilyMembers;
        this._state.acceptedStoreTermsVersion = attributes.acceptedStoreTermsVersion;
        this._state.latestStoreTermsVersion = attributes.latestStoreTermsVersion;
        this._state.rawResponseData = attributes.rawResponseData;
        this._state.isFinal = attributes.isFinal;
    }
    
    // MARK: - Properties
    
    get accountIdentifier() { return this._state.accountIdentifier; }
    get sessionIdentifier() { return this._state.sessionIdentifier; }
    get accountStatus() { return this._state.accountStatus; }
    get isSubscribed() { return this._state.isSubscribed; }
    get carrierBundlingStatus() { return this._state.carrierBundlingStatus; }
    get eligibilityStatus() { return this._state.eligibilityStatus; }
    get isDiscoveryModeEligible() { return this._state.isDiscoveryModeEligible; }
    get isFamilyOrganizer() { return this._state.isFamilyOrganizer; }
    get isFamilySubscription() { return this._state.isFamilySubscription; }
    get hasFamily() { return this._state.hasFamily; }
    get hasFamilyMembers() { return this._state.hasFamilyMembers; }
    get acceptedStoreTermsVersion() { return this._state.acceptedStoreTermsVersion; }
    get latestStoreTermsVersion() { return this._state.latestStoreTermsVersion; }
    get rawResponseData() { return this._state.rawResponseData; }
    get isFinal() { return this._state.isFinal; }
    
    // MARK: - Deprecated
    
    get subscribed() {
        console.warn("subscriptionStatusResponse.subscribed was deprecated. subscriptionStatusResponse.isSubscribed.");
        return this.isSubscribed;
    }
    
    get subscriptionStatusDictionary() {
        console.warn("subscriptionStatusResponse.subscriptionStatusDictionary was deprecated. All the attributes are available as top level keys now.");
        return this;
    }
    
}

_NativeBridge.sharedBridge.registerBridgedConstructor(SubscriptionStatusResponse);

// MARK: - Types

SubscriptionStatusResponse.ACCOUNT_STATUS = {
    NEEDS_AUTHENTICATION:   "needsAuthentication",
    NOT_SUBSCRIBED:         "notSubscribed",
    SUBSCRIBED:             "subscribed",
    UNKNOWN:                "unknown",
};

SubscriptionStatusResponse.CARRIER_BUNDLING_STATUS = {
    UNLINKED:                   "unlinked", 
    NEEDS_MANUAL_VERIFICATION:  "needsManualVerification", 
    ELIGIBLE:                   "eligible", 
    NOT_ELIGIBLE:               "notEligible", 
    UNKNOWN:                    "unknown", 
};

SubscriptionStatusResponse.ELIGIBILITY_STATUS = {
    UNKNOWN:        "unknown", 
    ELIGIBLE:       "eligible", 
    NOT_ELIGIBLE:   "notEligible", 
};

//
//  OnboardingViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class OnboardingViewModel extends ViewModel {
    get onOnboardingCompleted() { return this._state.onOnboardingCompleted; }
    set onOnboardingCompleted(value) { this._state.onOnboardingCompleted = value; }
}

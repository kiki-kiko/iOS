//
//  SearchResultsComponentController.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class SearchResultsComponentController extends ComponentController {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super(...arguments);
        
        this._state.updateWithSearchTerm = function(self, searchTerm, searchTermURL, searchTermCategory, searchIsPersonalized) {
            let sanitizedSearchTermURL = searchTermURL;
            if (!searchTermURL || searchTermURL.length == 0) {
                sanitizedSearchTermURL = undefined;
            }
            
            let sanitizedSearchTermCategory = searchTermCategory;
            if (!searchTermCategory || searchTermCategory.length == 0) {
                sanitizedSearchTermCategory = undefined;
            }
            
            self._state.searchTerm = searchTerm;
            self._state.searchTermURL = sanitizedSearchTermURL;
            self._state.searchTermCategory = sanitizedSearchTermCategory;
            self._state.searchIsPersonalized = searchIsPersonalized;
            self.updateForSearchTerm(searchTerm, sanitizedSearchTermURL, sanitizedSearchTermCategory, searchIsPersonalized);
        };
        
        this._state.didSelectKeyboardSearchButton = function(self, searchTerm) {
            const callback = self.onKeyboardSearchButtonSelectionPerformed;
            if (typeof(callback) == "function") {
                callback(searchTerm);
            }
        };
        
        this._state.didSelectSearchBarDoneButton = function(self) {
            const callback = self.onSearchBarDoneButtonSelectionPerformed;
            if (typeof(callback) == "function") {
                callback();
            }
        };
        
        this._state.didSelectSearchHint = function(self, searchHintTitle, searchHintURL, searchHintCategory, searchIsPersonalized, searchHintIndex) {
            const searchHint = {
                title: searchHintTitle, 
                url: searchHintURL,
                category: searchHintCategory,
                isPersonalized: searchIsPersonalized,
                index: searchHintIndex,
            };
            
            const callback = self.onSearchHintSelectionPerformed;
            if (typeof(callback) == "function") {
                callback(searchHint);
            }
        };
    }
    
    // MARK: - Properties
    
    get searchTerm() { return this._state.searchTerm; }
    get searchTermURL() { return this._state.searchTermURL; }
    
    get onKeyboardSearchButtonSelectionPerformed() { return this._state.onKeyboardSearchButtonSelectionPerformed; }
    set onKeyboardSearchButtonSelectionPerformed(callback) { this._state.onKeyboardSearchButtonSelectionPerformed = callback; }
    
    get onSearchBarDoneButtonSelectionPerformed() { return this._state.onSearchBarDoneButtonSelectionPerformed; }
    set onSearchBarDoneButtonSelectionPerformed(callback) { this._state.onSearchBarDoneButtonSelectionPerformed = callback; }
    
    get onSearchHintSelectionPerformed() { return this._state.onSearchHintSelectionPerformed; }
    set onSearchHintSelectionPerformed(callback) { this._state.onSearchHintSelectionPerformed = callback; }

    // MARK: - Methods
    
    updateForSearchTerm(searchTerm, searchTermURL, searchTermCategory, searchIsPersonalized) {
        // To be overriden by subclasses
    }
    
}

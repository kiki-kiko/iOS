//
//  ParagraphViewModel.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class ParagraphViewModel extends ViewModel {
    
    // MARK: - Object lifecycle
    
    constructor() {
        super();
        
        this._state.backgroundStyle = ParagraphViewModel.BACKGROUND_STYLE.LIGHT;
        this._state.textStyle = ParagraphViewModel.TEXT_STYLE.DARK;
        this._state.textSize = ParagraphViewModel.TEXT_SIZE.REGULAR;
    }
    
    // MARK: - API
    
    get title() { return this._state.title; }
    set title(value) {
        this._state.title = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "title", value);
    }
    
    get text() { return this._state.text; }
    set text(value) {
        this._state.text = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "text", value);
    }
    
    get backgroundStyle() { return this._state.backgroundStyle; }
    set backgroundStyle(value) {
        this._state.backgroundStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "backgroundStyle", value);
    }
    
    get textStyle() { return this._state.textStyle; }
    set textStyle(value) {
        this._state.textStyle = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "textStyle", value);
    }
    
    get textSize() { return this._state.textSize; }
    set textSize(value) {
        this._state.textSize = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "textSize", value);
    }
    
    get titleSize() { return this._state.titleSize; }
    set titleSize(value) {
        this._state.titleSize = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "titleSize", value);
    }
    
    get shouldHideDivider() { return this._state.shouldHideDivider; }
    set shouldHideDivider(value) {
        this._state.shouldHideDivider = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "shouldHideDivider", value);
    }
    
    get shouldTruncate() { return this._state.shouldTruncate; }
    set shouldTruncate(value) {
        this._state.shouldTruncate = value;
        _NativeBridge.sharedBridge.enqueuePropertyUpdate(this, "shouldTruncate", value);
    }
}

ParagraphViewModel.BACKGROUND_STYLE = {
    LIGHT: "light",
    DARK: "dark",
};

ParagraphViewModel.TEXT_STYLE = {
    LIGHT: "light",
    DARK: "dark",
};

ParagraphViewModel.TEXT_SIZE = {
    REGULAR: "regular",
    SMALL: "small",
    EXTRA_SMALL: "extraSmall",
};


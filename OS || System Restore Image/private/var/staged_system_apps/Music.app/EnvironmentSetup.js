//
//  JavaScriptEnvironmentSetup.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

const __concatenate_arguments_for_printing = function() {
    let completeMessage = "";
    for (let i = 0; i < arguments.length; i++) {
        completeMessage += arguments[i];
        if (i + 1 < arguments.length) {
            completeMessage += " ";
        }
    }
    return completeMessage;
};


const __original_console_log = console.log.bind(console);
const __original_console_warn = console.warn.bind(console);
const __original_console_error = console.error.bind(console);

console.log = function() {
    __original_console_log.apply(this, arguments);
    print(__concatenate_arguments_for_printing.apply(this, arguments));
};

console.warn = function() {
    __original_console_warn.apply(this, arguments);
    print("warning: " + __concatenate_arguments_for_printing.apply(this, arguments));
};

console.error = function() {
    __original_console_error.apply(this, arguments);
    print("error: " + __concatenate_arguments_for_printing.apply(this, arguments));
};

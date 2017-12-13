//
// The run function is is based on the code from fetchIconLinksSource in ICAttachmentWebModel.m
// We should keep these two in sync as needed.
//
var isAbsoluteURLRegExp = new RegExp('^(?:[a-z]+:)?//', 'i');
function qualifyURL(url) {
    if (isAbsoluteURLRegExp.test(url)) {
        return url;
    } else {
        var a = document.createElement('a');
        a.href = url;
        return a.href;
    }
}

var SEWebScrape = function() {};

SEWebScrape.prototype = {
    
    run: function(parameters) {
        var title = document.querySelector('meta[property="og:title"]');
        if (title) {
            title = title.content;
        } else if (title = document.querySelector('meta[property="twitter:title"]')) {
            title = title.content;
        } else {
            title = document.title;
        }
        var description = document.querySelector('meta[property="og:description"]');
        if (description) {
            description = description.content;
        } else if (description = document.querySelector('meta[property="twitter:description"]')) {
            description = description.content;
        } else if (description = document.querySelector('meta[name="Description"]')) {
            description = description.content;
        } else if (description = document.querySelector('meta[name="description"]')) {
            description = description.content;
        } else {
            description = "";
        }
        var imageURL = document.querySelector('meta[property="og:image"]');
        if (imageURL) {
            imageURL = qualifyURL(imageURL.content);
        } else if (imageURL = document.querySelector('meta[property="twitter:image:src"]')) {
            imageURL = qualifyURL(imageURL.content);
        } else {
            imageURL = "";
        }
        var touchIcons = [];
        var touchIconElements = document.querySelectorAll('link[rel="apple-touch-icon"]');
        var precomposedTouchIconElements = document.querySelectorAll('link[rel="apple-touch-icon-precomposed"]');
        var touchIconArray = Array.prototype.slice.call(touchIconElements);
        var precomposedTouchIconArray = Array.prototype.slice.call(precomposedTouchIconElements);
        var allTouchIconElements = touchIconArray.concat(precomposedTouchIconArray);
        for (var i = 0; i < allTouchIconElements.length; i++) {
            var element = allTouchIconElements[i];
            var sizes = [];
            for (var j = 0; j < element['sizes'].length; j++) {
                var size = element['sizes'][j];
                sizes.push(size);
            }
            touchIcons.push({
                            sizes: sizes,
                            href: qualifyURL(element['href'].toString())
                            });
        }
        
        parameters.completionFunction({
                                      URL: document.URL,
                                      title: title,
                                      description: description,
                                      imageURL: imageURL,
                                      icons: touchIcons
                                      });
    },
    
    finalize: function(parameters) {
    }
    
};

var ExtensionPreprocessingJS = new SEWebScrape

var MyCustomJavaScript = function() {};

MyCustomJavaScript.prototype = {
doWorkAfterDelay: function doWorkAfterDelay(arguments) {
    var feeds = document.querySelectorAll("link[type='application/rss+xml'], link[type='application/atom+xml']");
    var ogSiteName = document.querySelector("meta[property='og:site_name']");
    var siteName;
    
    if (ogSiteName && ogSiteName.hasAttribute('content')) {
        siteName = ogSiteName['content'];
    }

    if (!siteName) {
        siteName = document.title;
    }
    
    var linkTitle;
    var rssURLs = new Array;
    var feedable = 0;
    
    for (var i = 0; i < feeds.length; i++) {
        var link = feeds[i];
        // RSS feeds must have a href
        if (link.hasAttribute('href')) {
            feedable++;
            
            if (link.hasAttribute('title')) {
                linkTitle = link['title'];
            } else {
                linkTitle = siteName;
            }
            
            var rssFeed = {
            url: link['href'],
            title: linkTitle
            }
            
            rssURLs.push(rssFeed);
            if (feedable > 12)
                break;
        }
    }

    arguments.completionFunction({"rssURLs": rssURLs, "baseURI": document.baseURI});
}

, returnWork: function returnWork() {
    var results = null;
    var completionFunction = function (resultsDictioanry)
    {
        results = resultsDictioanry;
    }
    
    var arguments = {"completionFunction": completionFunction}
    this.doWorkAfterDelay(arguments)
    
    return results;
}

};

var PreprocessingJavaScript = function() {};

PreprocessingJavaScript.prototype = {
    run: function(arguments) {
        // Simulate asynchronous work by generating results after a .05 second delay.
        setTimeout(MyCustomJS.doWorkAfterDelay, 50, arguments);
    },
    finalize: function(arguments) {
        // Do nothing for Pinterest case.
        /*
        var d = document;
        e = d.createElement('script');
        e.setAttribute('type', 'text/javascript');
        e.setAttribute('charset', 'UTF-8');
        e.setAttribute('src', '//assets.pinterest.com/js/pinmarklet.js?r=' + Math.random() * 99999999);
        d.body.appendChild(e);        
         */
    }
};

var MyCustomJS = new MyCustomJavaScript;
var ExtensionPreprocessingJS = new PreprocessingJavaScript;

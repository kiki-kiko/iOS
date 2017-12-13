/*
 * AppleWidgetController.js
 * Copyright (c) 2010-2011 Apple, Inc.
 * All rights reserved.
 *
 * Responsibility: drb
 */

//
// Class: AppleWidgetController
//
var AppleWidgetController = function() {};
AppleWidgetController.prototype = {
  kAjaxFailedEvent : 'AppleWidgetController:AjaxFailed',
  kMaxAjaxWaitTimeMs : 5000.0,
  prefs : { },

	initialize : function(rootUrl) {
		this.rootUrl = rootUrl;
    this.browserObjects = new Object();

    this.passTimestamp = false;  // whether to auto include timestamp parameter
    this.inflight = 0;  // how many requests in flight
		this.result = null;  // result of request under rootUrl
	},

  /* ------------------------------------------------------------------
   * notifyContentLoaded
   *   Notifies native widget controller that widget is loaded, but not
   *   necessarily ready to show, typically when "onload" is called.
   * ------------------------------------------------------------------ */
  notifyContentLoaded : function() {
    window.location = 'apb:///do?c=loaded';
  },

  /* ------------------------------------------------------------------
   * notifyContentIsReady
   *   Notifies native widget controller that js widget is ready to show.
   *   Typically used when heavy-duty post-load processing is complete.
   * ------------------------------------------------------------------ */
  notifyContentIsReady : function() {
    window.location = 'apb:///do?c=ready';
  },

  /* ------------------------------------------------------------------
   * notifyContentExited
   *   Notifies native widget controller that js widget is closing down.
   *   Called when the user ends the slideshow
   * ------------------------------------------------------------------ */
  notifyContentExited : function() {
    window.location = 'apb:///do?c=exited';
  },

  /* ------------------------------------------------------------------
   * notifyContentPropertyChanged
   *   Notifies native widget controller that some attribute of the show
   *   has changed.  (e.g. the current slide, sound setting, etc.)
   * ------------------------------------------------------------------ */
  notifyContentPropertyChanged : function(propertyName, propertyValue) {
    window.location = 'apb:///do?c=propertyChanged&arg1=' + propertyName + '&arg2=' + propertyValue;
  },

  /* ------------------------------------------------------------------
   * notifyContentAutoplayInterrupted
   *   Notifies native widget controller that automatic content playback
   *   was interrupted, e.g. to allow the widget controller to decide
   *   when to start playback.
   * ------------------------------------------------------------------ */
  notifyContentAutoplayInterrupted : function() {
    window.location = 'apb:///do?c=contentAutoplayInterrupted';
  },

  /* ------------------------------------------------------------------
   * notifyNavigationButtonsChanged
   *   Tells native widget controller to update navigation bar state.
   * ------------------------------------------------------------------ */
  notifyNavigationButtonsChanged : function(buttonStateMask) {
    window.location = 'apb:///do?c=navButtonsChanged&arg1=' + buttonStateMask;
  },

  /* ------------------------------------------------------------------
   * registerObject
   *
   * objectName - key for the object
   * objectRef - the object itself
   * ------------------------------------------------------------------ */
  registerObject : function(objectName, objectRef) {
    this.browserObjects[objectName] = objectRef;
  },

  /* ------------------------------------------------------------------
   * unregisterObject
   *
   * objectName - key for the object
   * ------------------------------------------------------------------ */
  unregisterObject : function(objectName) {
    this.browserObjects[objectName] = null;
  },

  /* ------------------------------------------------------------------
   * browserCall
   *
   * objectName - key for the object
   * methodName - method to invoke
   * argumentString - string, typically JSON
   * ------------------------------------------------------------------ */
  browserInvoke : function(objectName, methodName, argumentString) {
    this.debugLog('browserCall: ' + objectName + ', ' + methodName + ', ' + argumentString);
    if (this.browserObjects[objectName]) {
      if (this.browserObjects[objectName][methodName]) {
        this.browserObjects[objectName][methodName](argumentString);
      } else {
        this.debugLog('object "' + objectName + '" lacks method: ' + methodName);
      }
    } else {
      this.debugLog('no such object: "' + objectName + '"');
    }
  },
	
  /* ------------------------------------------------------------------
   * issueRequest -- issue xhr request
   *
   * subPath - path under rootUrl, e.g. '/stuff.json'
   * urlParameters - string for parameters, e.g. '?foo=12'
   * ------------------------------------------------------------------ */
	issueRequest : function(subPath, urlParameters) {
    if (this.inflight > 0) {
      // alert('multiple inflight requests not supported');
    }
    this.inflight++;
		this.downloadTimeout = setTimeout(
      function() {
        self.requestDidNotDownload(null);
      },
      this.kMaxAjaxWaitTimeMs
    );

    // TODO(dbeaver): check for inflight requests; this will collide.
		this.downloadAlreadyFailed = false;
		
    var targetUrl = this.rootUrl + subPath;
    if (this.passTimestamp) {
		  var timeStamp = new Date();
      if (urlParameters != null) {
        targetUrl += urlParameters + '&ts=' + timestamp.valueOf();
      } else {
        targetUrl += '?ts=' + timestamp.valueOf();
      }
    }

		var self = this;
		var successCompletionRoutine = function(transport) {
      self.inflight--;
      self.requestDidDownload(transport);
    };
		var failureCompletionRoutine = function(transport) {
      self.inflight--;
      self.requestDidNotDownload(transport);
    };

		new Ajax.Request(targetUrl, 
		{
			method: 'get',
			onSuccess: successCompletionRoutine,
			onFailure: failureCompletionRoutine
		});
	},
	
  /* ------------------------------------------------------------------
   * requestDidDownload
   * ------------------------------------------------------------------ */
	requestDidDownload : function(transport) {
		clearTimeout(this.downloadTimeout);
    this.result = JSON.parse(transport.responseText);
    this.debugLog('success: ' + Object.toJSON(this.result));
	},
	
  /* ------------------------------------------------------------------
   * requestDidNotDownload
   * ------------------------------------------------------------------ */
	requestDidNotDownload : function(transport) {
		if (this.downloadAlreadyFailed) {
			// already executed due to previous timeout or onFailure invocation,
            // ignoring.
		}
		
		this.downloadAlreadyFailed = true;
		
		if (transport) {
			// 'readyState: ' + transport.readyState + ' status: ' + transport.status
            // + 'responseText: ' + transport.responseText
			clearTimeout(this.downloadTimeout);
		}
		
		document.fire(this.kAjaxFailedEvent, {});
	},

  /* ------------------------------------------------------------------
   * debugLog
   * ------------------------------------------------------------------ */
  debugLog : function(message) {
    // AppleDebugger.prototype.log(message);
  },

  /* ------------------------------------------------------------------
   * toString
   * ------------------------------------------------------------------ */
  toString : function () {
    var browserObjectsStr = '';
    var key;
    for (key in this.browserObjects) {
      browserObjectsStr += '"' + key + '":' + this.browserObjects[key] + ' ';
    }
    return '{ '
      + 'rootUrl: ' + this.rootUrl
      + ', browserObjects: ' + browserObjectsStr
      + ', passTimestamp: ' + this.passTimestamp
      + ', inflight: ' + this.inflight
      + ', result: ' + this.result
      + ' }';
  },

  /* ------------------------------------------------------------------ */
  /* Widget methods                                                     */
  /* ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
   * willEnterWidgetMode
   * Prepare for fullscreen, fixed or gutter mode.
   * Override as needed.
   * ------------------------------------------------------------------ */
  willEnterWidgetMode : function(newMode) {
    this.debugLog('willEnterWidgetMode: ' + newMode);
  },

  /* ------------------------------------------------------------------
   * didEnterWidgetMode
   * Finish transition to fullscreen, fixed or gutter mode.
   * Override as needed.
   * ------------------------------------------------------------------ */
  didEnterWidgetMode : function(newMode) {
    this.debugLog('didEnterWidgetMode: ' + newMode);
    this.widgetMode = newMode;
  },

  /* ------------------------------------------------------------------
   * pauseAudioVisual
   * Pause all audio and visual elements.
   * Override as needed.
   * ------------------------------------------------------------------ */
  pauseAudioVisual : function() {
    this.debugLog('pauseAudioVisual');
    var widgetVideos = document.getElementsByTagName('video');
    var videoIdx;
    for (videoIdx = 0; videoIdx < widgetVideos.length; videoIdx++) {
        widgetVideos[videoIdx].pause();
    }
    var widgetAudios = document.getElementsByTagName('audio');
    var audioIdx;
    for (audioIdx = 0; audioIdx < widgetAudios.length; audioIdx++) {
        widgetAudios[audioIdx].pause();
    }
  }

};

var widget = new AppleWidgetController();


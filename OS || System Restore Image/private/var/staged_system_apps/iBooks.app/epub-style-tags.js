(function(classes){
  // build up the current list of sets, including the "active" set.
  // If any link tags are disabled, assume we've run before and pick the first
  // set that's not disabled. If none are disabled, look for "alternate" in rel.
  var styleSets = [];
  var styleSetMap = {};
  var links = document.querySelectorAll('link[rel~="stylesheet"][title]');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var set = styleSetMap[link.title];
    if (set === void 0) {
      set = {name:link.title, links:[], classes:[], preferred:false};
      styleSetMap[link.title] = set;
      styleSets.push(set);
    }
    set.links.push(link);
    if (!set.preferred) {
      set.preferred = !link.webkitMatchesSelector('[rel~="alternate"]');
    }
    var linkClasses = Array.prototype.slice.call(link.classList);
    for (var j = 0; j < linkClasses.length; j++) {
      var clas = linkClasses[j];
      if (set.classes.indexOf(clas) < 0) {
        set.classes.push(clas);
      }
    }
  }

  var activeSet = null;
  if (classes !== null) {
    // now disable all sets
    for (var i = 0; i < styleSets.length; i++) {
      var set = styleSets[i];
      for (var j = 0; j < set.links.length; j++) {
        set.links[j].disabled = true;
      }
    }

    // find the first set that matches our classes
    // allow for partial match if we can't find a full one
    var inverses = {
      "day": "night",
      "night": "day",
      "horizontal": "vertical",
      "vertical": "horizontal"
    };
    var match = null;
    var matchCount = -1; // number of matching classes
    for (var i = 0; i < styleSets.length; i++) {
      var set = styleSets[i];
      var ok = true;
      var count = 0;
      for (var j = 0; j < classes.length; j++) {
        var clas = classes[j];
        if (set.classes.indexOf(clas) >= 0) {
          count++;
        } else if (set.classes.indexOf(inverses[clas]) >= 0) {
          ok = false;
          break;
        }
      }
      if (ok) {
        if (count > matchCount) {
          match = set;
          matchCount = count;
        }
        if (count == classes.length) {
          // full match
          break;
        }
      }
    }
    if (match) {
      for (var j = 0; j < match.links.length; j++) {
        match.links[j].disabled = false;
      }
    }
    activeSet = match;
  }

  if (activeSet === null) {
    // we need to figure out the current active set

    // instead of doing 2 passes, one to determine disabled, and the second to
    // pick the set, we'll just stick with the one pass and approximate it.
    // Update activeSet to point to the first non-disabled set. If we run across
    // a non-disabled preferred set, update it to that one instead. This should
    // match the behavior of the 2-pass scenario.  Regarding alternative status,
    // I'm unsure as to how you're supposed to treat a set if one of the <link>
    // tags specifies alternate and a second <link> tag does not. This code will
    // assume that the presence of any prefererd <link> tag in a set makes the
    // entire set preferred.
    var foundDisabled = false;
    for (var i = 0; i < styleSets.length; i++) {
      var set = styleSets[i];
      for (var j = 0; j < set.links.length; j++) {
        var link = set.links[j];
        if (!link.disabled) {
          if (activeSet === null || !activeSet.preferred) {
            activeSet = set;
          }
        } else {
          foundDisabled = true;
        }
      }
    }
    if (activeSet !== null && (!activeSet.preferred && !foundDisabled)) {
      // no preferred sets, and nothing was disabled. There should be no active
      // set.
      activeSet = null;
    }
  }

  // return all known and active classes
  classes = [];
  for (var i = 0; i < styleSets.length; i++) {
    var set = styleSets[i];
    for (var j = 0; j < set.classes.length; j++) {
      var clas = set.classes[j];
      if (classes.indexOf(clas) < 0) {
        classes.push(clas);
      }
    }
  }
  var active = (activeSet === null ? [] : activeSet.classes);
  return {classes: classes, active: active};
})

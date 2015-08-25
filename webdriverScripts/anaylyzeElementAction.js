
console.log("anaylyzeElementAction.js loaded");


window.anaylyzeElementAction = function anaylyzeElementAction(elementXpath){
  var element = lookupElementByXPath(elementXpath);
  console.log(element);

  var observer = new MutationSummary({
    callback: funcCall,
    queries: [{ all: true }]
  });


  element.click();

}

function funcCall(summaries){
  var hTweetSummary = summaries[0];
  console.log(summaries);
  var array = [];
  hTweetSummary.added.forEach(function(newEl) {
    array.push($(newEl));

  });
  console.log(array);

  console.log(commonAncestor(array));
}

window.commonAncestor = function commonAncestor(array) {
  var parents = [];
  var minlen = Infinity;

  for (var index = 0; index < array.length; ++index) {
    var curparents = array[index].parents();
    parents.push(curparents);
    minlen = Math.min(minlen, curparents.length);
  }


  for (var i in parents) {
    parents[i] = parents[i].slice(parents[i].length - minlen);
  }

  if(parents.length > 0){
    // Iterate until equality is found
    for (var i = 0; i < parents[0].length; i++) {
      var equal = true;
      for (var j in parents) {
        if (parents[j][i] != parents[0][i]) {
          equal = false;
          break;
        }
      }
      if (equal) return $(parents[0][i]);
    }
  }

  return $([]);
}

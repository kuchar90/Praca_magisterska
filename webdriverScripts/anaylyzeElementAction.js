
console.log("anaylyzeElementAction.js loaded");

window.anaylyzeElementAction = function anaylyzeElementAction(elementXpath){
  console.log(elementXpath);
  var element = lookupElementByXPath(elementXpath);
console.log(element);

  element.click();

}







//var observer = new MutationSummary({
//  callback: funcCall,
//  queries: [{ all: true }]
//});
//
//function funcCall(summaries){
//  var hTweetSummary = summaries[0];
//  console.log(summaries);
//   hTweetSummary.added.forEach(function(newEl) {
//    //console.log(newEl);
//	 //console.log($(newEl));
//  });
//
//}



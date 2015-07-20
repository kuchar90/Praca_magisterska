
	
var observer = new MutationSummary({
  callback: funcCall,
  queries: [{ all: true }]
});

function funcCall(summaries){
  var hTweetSummary = summaries[0];
  console.log(summaries);
   hTweetSummary.added.forEach(function(newEl) {
    //console.log(newEl);
	 //console.log($(newEl));
  });
  
}
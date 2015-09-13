
console.log("anaylyzeElementAction.js loaded");
var observer;

function anaylyzeElementAction(elementXpath){
  var element = lookupElementByXPath(elementXpath);
  console.log(element);

  observer = new MutationSummary({
    callback: funcCall,
    queries: [{ all: true }]
  });


  element.click();


}

function funcCall(summaries){
  var hTweetSummary = summaries[0];
  var array = [];

  hTweetSummary.added.forEach(function(newEl) {
    if(newEl.nodeType != 3){
      var treeObject = {};
      treeObject.object = newEl;
      treeObject.children = []
      array.push(treeObject);
    }



  });
  console.log('array');
  console.log(array);


  var objectsTree = sortObjects(array);


}

function sortObjects(array){
  console.log('begin');
  console.log(array);
  var objectsTree = [];

  for(i = 0; i< array.length; i++){
    var treeObject = {};
    treeObject.object = array[i].object;
    treeObject.children = []
    objectsTree.push(treeObject);


    for(j = i+1; j< array.length; j++){
      if($.contains(treeObject.object, array[j].object)){
        treeObject.children.push(array[j]);
        array.splice(j, 1);
        j--;
      }
    }
    array = array.splice(i, 1);

    for(k = 0; k < objectsTree.length ;k++) {
      if ($.contains(treeObject.object, objectsTree[k].object)) {
        treeObject.children.push(objectsTree[k]);
        objectsTree[k] = treeObject;
      }
    }

    if(treeObject.children.length > 0){
      console.log('recurs');
      console.log(treeObject.object);
      console.log(treeObject.children);
      treeObject.children = sortObjects(treeObject.children) ;
    }


  }
  console.log('end');
  console.log(objectsTree);
  return objectsTree
}
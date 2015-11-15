
console.log("anaylyzeElementAction.js loaded");
var observer;
var funcCall;
var treeToXpaths;
var sortObjects;
var test;
var testXpath;



var preSortedArray;

function anaylyzeElementAction(elementXpath){


  if(typeof observer != 'undefined'){
    observer.disconnect();
  }

  var element = lookupElementByXPath(elementXpath);
  console.log(element);

  observer = new MutationSummary({
    callback: funcCall,
    queries: [{ all: true }]
  });


  element.click();


}

funcCall = function funcCall(summaries){
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

  var objectsTree = sortObjects(array);


  //console.log(objectsTree);
  //console.log(objectsTree[0]);
  //test = objectsTree[0];
  //testXpath= treeToXpaths(objectsTree[0]);
  //   console.log(testXpath);
  //console.log(JSON.stringify(testXpath));
  //    $.ajax({
  //  url: 'http://localhost:8080/Praca_magisterska/main/saveElementActionElements',
  //  data: { elements: JSON.stringify(testXpath)},
  //  success: function(data) {
  //
  //  },
  //  type: 'POST'
  //});



}

treeToXpaths = function treeToXpaths(elementsTree){
  //console.log(elementsTree);
  var xpathTree = {};
  if(typeof elementsTree != 'undefined' && typeof  elementsTree.object != 'undefined'){
    xpathTree.object = createXPathFromElement(elementsTree.object);
    var childrens = elementsTree.children;
    if(childrens.length > 0){
      xpathTree.childrens = [];
      for(j = 0; j< childrens.length; j++){
        xpathTree.childrens[j] =  treeToXpaths(childrens[j]);
      }
    }
  }

  //console.log(xpathTree);
  return xpathTree;
}

sortObjects = function sortObjects(array){
  var objectsTree = [];
  console.log(array);
  for(i = 0; i < array.length; i++){

    var treeObject = {};
    treeObject.object = array[i].object;
    treeObject.children = []
    objectsTree.push(treeObject);
    console.log('sorting for object');
    console.log(treeObject.object);
    for(j = i+1; j< array.length; j++){
      if($.contains(treeObject.object, array[j].object)){
        treeObject.children.push(array[j]);
        console.log(array[j].object);
        console.log( 'is child of ');
        console.log(treeObject.object);
        console.log(treeObject.children);
        array.splice(j, 1);
        j--;

        console.log('childrens...');
        console.log(treeObject.children);
      }
    }
    console.log('after children was find');
    console.log(array);


    array.splice(i, 1);


    for(k = 0; k < objectsTree.length ;k++) {
      if ($.contains(treeObject.object, objectsTree[k].object)) {
        treeObject.children.push(objectsTree[k]);
        objectsTree[k] = treeObject;
      }
    }

    if(treeObject.children.length > 0){
      console.log('sorting childs of:');
      console.log(treeObject.object);
      treeObject.children = sortObjects(treeObject.children) ;
    }

  }
  return objectsTree
}
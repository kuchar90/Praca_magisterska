if (typeof jqueryUrl != 'string') {
    jqueryUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
}
if (typeof jQuery == 'undefined') {
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    var done = false;
    script.onload = script.onreadystatechange = (function() {
        if (!done && (!this.readyState || this.readyState == 'loaded'
            || this.readyState == 'complete')) {
            done = true;
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
            getAllCursorElement();
        }
    });
    script.src = jqueryUrl;
    head.appendChild(script);
}
else {
    getAllCursorElement();
}




function getAllCursorElement(){
    var cursorElement = $(':visible').filter(function(){ return $(this).css('cursor') == 'pointer';});
    var cursorElementXPath = [];
    cursorElement.each(function(){
        cursorElementXPath.push(createXPathFromElement($(this)[0]));


    })
    console.log(cursorElementXPath);


    $.ajax({
        url: 'http://localhost:8080/Praca_magisterska/main/saveCursorXPathElements',
        data: { elements: JSON.stringify(cursorElementXPath)},
        success: function(data) {

        },
        type: 'POST'
    });

}


function createXPathFromElement(elm) {
    var allNodes = document.getElementsByTagName('*');
    for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode)
    {
        if (elm.hasAttribute('id')) {
            var uniqueIdCount = 0;
            for (var n=0;n < allNodes.length;n++) {
                if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
                if (uniqueIdCount > 1) break;
            };
            if ( uniqueIdCount == 1) {
                segs.unshift('id("' + elm.getAttribute('id') + '")');
                return segs.join('/');
            } else {
                segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
            }
        } else if (elm.hasAttribute('class')) {
            segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
        } else {
            for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                if (sib.localName == elm.localName)  i++; };
            segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
        };
    };
    return segs.length ? '/' + segs.join('/') : null;
}

function lookupElementByXPath(path) {
    var evaluator = new XPathEvaluator();
    var result = evaluator.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return  result.singleNodeValue;
}
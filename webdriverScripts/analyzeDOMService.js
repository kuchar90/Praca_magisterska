getAllCursorElement = function(){
    console.log('getAllCursorElement');
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


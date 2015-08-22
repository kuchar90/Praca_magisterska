package com.kuchar

class Element {

    String elementXPath;

    static belongsTo = [Website]
    static constraints = {

    }
    static mapping = {
        elementXPath type: "text"
    }
}

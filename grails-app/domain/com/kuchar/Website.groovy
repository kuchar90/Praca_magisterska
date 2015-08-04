package com.kuchar

/**
 * Created by assassin on 2015-08-04.
 */
class Website {
    String url;
    static hasMany = [elements : Element]

    static mapping = {
        elements cascade: 'all-delete-orphan'
    }

}

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
        }
    });
    script.src = 'http://localhost:8080/Praca_magisterska/main/getJavascriptFile?src=webdriverScripts//mutation-summary.js';
    head.appendChild(script);
    console.log("jQuery added to site");
}



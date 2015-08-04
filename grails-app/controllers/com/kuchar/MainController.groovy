package com.kuchar

import grails.converters.JSON
import org.codehaus.groovy.grails.web.json.JSONArray
import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxProfile
import org.openqa.selenium.firefox.internal.ProfilesIni
import org.openqa.selenium.logging.LoggingPreferences
import org.openqa.selenium.remote.DesiredCapabilities

import java.nio.charset.Charset
import java.util.concurrent.TimeUnit
import java.util.logging.Level

class MainController {

    def saveCursorXPathElements(){
        log.debug("saveCursorXPathElements")
        println params
        JSONArray elements = JSON.parse(params.elements);
        Website website = Website.list()[0];
        elements.each {
            println it
            Element element = new Element(XPath: it)
            website.addToElements(element);

        }


        render 200
    }

    def index() {


        List<Website> websites = Website.list();
        websites.each {
            it.delete(flush: true);
        }

        ProfilesIni profile = new ProfilesIni();
        FirefoxProfile ffprofile = profile.getProfile("default");

        WebDriver driver = new FirefoxDriver(ffprofile);

        Website website = new Website(url: "http://webwavecms.com/");
        website.save();

     //   driver.get("https://drive.google.com/drive/my-drive");
        driver.get(website.url);

        // give jQuery time to load asynchronously
        driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("console.log(groupService);")
        js.executeScript(readFile("webdriverScripts//XPathUtils.js"));
        js.executeScript(readFile("webdriverScripts//jQuerify.js"));
        js.executeScript(readFile("webdriverScripts//analyzeDOMService.js"));


        //js.executeAsyncScript(readFile("webdriverScripts//libLoad.js"));
        //js.executeAsyncScript(readFile("webdriverScripts//tmp.js"));

//        String www = readFile("webdriverScripts//tmp.js");
//        // ready to rock
//        js.executeScript(
//                www
//        );


        driver.quit();

    }


    def

    // helper method
    String readFile(String file) throws IOException {
        Charset cs = Charset.forName("UTF-8");
        FileInputStream stream = new FileInputStream(file);
        try {
            Reader reader = new BufferedReader(new InputStreamReader(stream, cs));
            StringBuilder builder = new StringBuilder();
            char[] buffer = new char[8192];
            int read;
            while ((read = reader.read(buffer, 0, buffer.length)) > 0) {
                builder.append(buffer, 0, read);
            }
            return builder.toString();
        }
        finally {
            stream.close();
        }
    }

}

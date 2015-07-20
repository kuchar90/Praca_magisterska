package com.kuchar

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

    def consoleOut(){
        println params
    }

    def index() {

        ProfilesIni profile = new ProfilesIni();
        FirefoxProfile ffprofile = profile.getProfile("default");

        WebDriver driver = new FirefoxDriver(ffprofile);



        driver.get("https://drive.google.com/drive/my-drive");

        String jQueryLoader = readFile("webdriverScripts//jQuerify.js");

        // give jQuery time to load asynchronously
        driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeAsyncScript(jQueryLoader /*, http://localhost:8080/jquery-1.7.2.js */);




        String qqq = readFile("webdriverScripts//libLoad.js");

        js.executeAsyncScript(qqq);
        //js.executeAsyncScript(readFile("webdriverScripts//tmp.js"));

//        String www = readFile("webdriverScripts//tmp.js");
//        // ready to rock
//        js.executeScript(
//                www
//        );





    }

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

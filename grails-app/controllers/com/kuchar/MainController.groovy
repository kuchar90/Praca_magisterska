package com.kuchar

import grails.converters.JSON
import org.codehaus.groovy.grails.web.json.JSONArray
import org.openqa.selenium.By
import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.Keys
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxProfile
import org.openqa.selenium.firefox.internal.ProfilesIni
import org.openqa.selenium.logging.LoggingPreferences
import org.openqa.selenium.remote.DesiredCapabilities
import org.openqa.selenium.support.ui.ExpectedCondition
import org.openqa.selenium.support.ui.Wait
import org.openqa.selenium.support.ui.WebDriverWait

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
            Element element = new Element(elementXPath: it)
            website.addToElements(element);

        }


        render 200
    }




    def index() {

        List<Website> websites = Website.list();
        websites.each {
            it.delete(flush: true);
        }

        WebDriver driver = this.getFirefoxDriver();

        Website website = new Website(url: "http://webwavecms.com/");
        //Website website = new Website(url:"http://allegro.pl/");
        website.save();

        driver.get(website.url);

        login(driver)

        driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        loadjsFile(driver, "webdriverScripts//jQuerify.js");
        loadjsFile(driver, "webdriverScripts//XPathUtils.js");
        loadjsFile(driver, "webdriverScripts//analyzeDOMService.js");
        js.executeScript(
                "getAllCursorElement();"
        );

       driver.quit();

    }

    def getElement(){
        Website website = Website.list()[0]
       println  website.elements.find{it.elementXPath == 'id("ownWebsitesList")/ul[@class="websiteInfo \n' +
               '\t\t\n' +
               '\t\texpired"]/li[@class="websiteNameCell"]'}


    }

    def anaylyzeElementAction(){
        Website website = Website.list()[0]
        Element element = website.elements.find{it.elementXPath == 'id("ownWebsitesList")/ul[@class="websiteInfo \n' +
                '\t\t\n' +
                '\t\texpired"]/li[@class="websiteNameCell"]'}


        //anaylyzeElementAction(createXPathFromElement($('.websiteCellWrapper').eq(0)[0]))

        WebDriver driver = this.getFirefoxDriver();


        driver.get(website.url);

        login(driver)

        // give jQuery time to load asynchronously
        driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        loadjsFile(driver, "webdriverScripts//jQuerify.js");
        loadjsFile(driver, "webdriverScripts//XPathUtils.js");
        loadjsFile(driver, "webdriverScripts//mutation-summary.js");
       // loadjsFile(driver, "webdriverScripts//anaylyzeElementAction.js");
//        js.executeScript(
//                "anaylyzeElementAction('${element.elementXPath.replaceAll("(\\r|\\n|\\r\\n)+", "\\\\n")}');"
//        );



    }

     void loadjsFile(WebDriver driver, String scriptSrc) {
        String injectScript = 'var script = document.createElement("script");';
        injectScript += 'script.src = "http://localhost:8080/Praca_magisterska/main/getJavascriptFile?src=' + scriptSrc + '";';
        injectScript += 'script.setAttribute("type","text/javascript");';
        injectScript += 'document.body.appendChild(script);';
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(injectScript);
    }



    void login(WebDriver driver){
        WebElement loginPopupButton = driver.findElement(By.id("element_724")).findElement(By.tagName("a"));
        loginPopupButton.click()
        WebElement username = driver.findElement(By.name("j_username"));
        username.sendKeys("assassin90@gmail.com");
        WebElement password = driver.findElement(By.name("j_password"));
        password.sendKeys("zalman1952");

        String  currentURL = driver.getCurrentUrl();
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement loginButton = driver.findElement(By.id('login_submit_button'));
        loginButton.click();
        ExpectedCondition e = new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return (d.getCurrentUrl() != currentURL );
            }
        };

        wait.until(e);

    }


    WebDriver getFirefoxDriver(){
        ProfilesIni profile = new ProfilesIni();
        FirefoxProfile ffprofile = profile.getProfile("default");
        return new FirefoxDriver(ffprofile);
    }


    def getJavascriptFile(){
        render readFile(params.src)
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

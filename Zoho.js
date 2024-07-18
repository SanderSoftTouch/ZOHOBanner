//variabelen
var kopy = document.getElementById("kopy");
var begroetingen = document.getElementsByClassName("begroeting");
var begroeting1 = document.getElementById("begroeting1");
var begroeting2 = document.getElementById("begroeting2");
var profo = document.getElementById("profo");
var naam = document.getElementById("naam");
var Taak = document.getElementById("Taak");
var Mail = document.getElementById("Mail");
var Banner = document.getElementById("Banner");
var line = document.getElementById("line");
var profo_ = document.getElementById("profo_");
var naam_ = document.getElementById("naam_");
var Taak_ = document.getElementById("Taak_");
var Mail_ = document.getElementById("Mail_");
var Banner_ = document.getElementById("Banner_");
var url = document.getElementById("url");
var inputvelden = [line, profo_, naam_, Taak_, Mail_, Banner_, url];
var checkers = document.getElementsByClassName("check");
var errorText = document.getElementsByClassName("errorText");
var hiddenBool = true;
let instelling;

//instellingobject aanmaken
class storageItem {
    constructor(begroetingen, profo, naam, taak, mail, banner_foto, banner_url) {
        this.begroetingen = begroetingen;
        this.profo = profo;
        this.naam = naam;
        this.taak = taak;
        this.mail = mail;
        this.banner_foto = banner_foto;
        this.banner_link = banner_url;
    }
}

//Tekst aanpassen inputvelden
function setValues(sItem){
    line.value = sItem.begroetingen.join("\n")
    profo_.value = sItem.profo
    naam_.value = sItem.naam
    Taak_.value = sItem.taak
    Mail_.value = sItem.mail
    Banner_.value = sItem.banner_foto
    url.value = sItem.banner_link
}

//Tekst aanpassen van html
function setHTML(sItem){
    var Mailto = "mailto:" + sItem.mail
    var begroetingParent = begroetingen[0].parentElement
    var begroetingTemplate = begroetingen[0].cloneNode().outerHTML
    begroetingParent.innerHTML = ""
    for(var i = 0; i < sItem.begroetingen.length; i++){
        begroetingParent.innerHTML += begroetingTemplate;
        begroetingParent.children[i].innerHTML = sItem.begroetingen[i] + "<br>";
    }
    profo.src = sItem.profo
    naam.innerText = sItem.naam
    Taak.innerText = sItem.taak
    Mail.firstChild.innerText = sItem.mail
    Mail.firstChild.href = Mailto
    Banner.src = sItem.banner_foto
    Banner.parentElement.parentElement.parentElement.href = sItem.banner_link
}

//bij het inladen init() uitvoeren
window.addEventListener("load", init);

//input aanpassen
document.addEventListener("DOMContentLoaded", function() {
    inputvelden.forEach(function(input) {
      input.addEventListener("input", function(event) {
        exchange();
      });
    });
});

//de functie die word aangeroepen bij het inladen van de pagina
function init(){
    var begroetingenInnerText = []
    for(var i = 0; i < begroetingen.length; i++){
        begroetingenInnerText.push(begroetingen[i].innerText);
    }
    if(localStorage.getItem("persoonlijkeInstelling") == null){
        instelling = new storageItem(begroetingenInnerText, profo.src, naam.innerText, Taak.innerText, Mail.firstChild.innerText, Banner.src, Banner.parentElement.parentElement.parentElement.href);
        localStorage.setItem("init_instelling", JSON.stringify(instelling));
        localStorage.setItem("persoonlijkeInstelling", JSON.stringify(instelling));
    } else {
        instelling = JSON.parse(localStorage.getItem("persoonlijkeInstelling"));
    }
    console.log(Banner.parentElement.parentElement.parentElement.href)
    setValues(instelling);
    exchange();
}

//de functie die de values die in de html staan opslaat en in HTML omzet
function exchange(){
    mailChecker();
    var fotoArr = [profo_.value.split("&amp;").join("&"), Banner_.value.split("&amp;").join("&")]
    fotoArr = zohoLinkChecker(fotoArr);
    instelling = new storageItem(line.value.split("\n"), fotoArr[0], naam_.value, Taak_.value, Mail_.value, fotoArr[1], url.value) //fline.value, sline.value, 
    localStorage.setItem("persoonlijkeInstelling", JSON.stringify(instelling))
    setHTML(instelling);
    hiddenchecker();
}

//mailchecker toggle voor de mail te checken
function mailChecker(){
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    if(validateEmail(Mail_.value)){
        errorText[0].hidden = true
    } else{
        errorText[0].hidden = false
    }
}

//functie die checkt of de link van de foto een zoho link is
function zohoLinkChecker(fotoArr){
    instelling = JSON.parse(localStorage.getItem("init_instelling"));
    var old_fotoArr = [instelling.profo, instelling.banner_foto]
    zoholink = instelling.profo.split("&")[0].split("/")[2].split(":")[0]
    for(var i = 0; i < checkers.length; i++){
        if(zoholink !== fotoArr[i].split("&")[0].split("/")[2].split(":")[0]){
            checkers[i].hidden = false;
            fotoArr[i] = old_fotoArr[i];
        } else {
            checkers[i].hidden = true;
        }
    }
    return fotoArr
}

//functie die controleert of er nog errorvakken actief zijn
function hiddenchecker(){
    for(var i = 0; i < errorText.length; i++){
        (errorText[i].hidden ? hiddenBool = true : hiddenBool = false)
        if(!hiddenBool) {i = errorText.length}
    }
}

//copy knop functie
function copy(){
    if(hiddenBool){
        exchange()
        var to_copy = kopy.outerHTML;
        navigator.clipboard.writeText(to_copy);
        alert("Gekopy't");
    } else {
        alert("Er klopt iets niet, zorg ervoor dat alle rode tekst weg is!");
    }
}

//reset knop functie
function reset(){
    instelling = JSON.parse(localStorage.getItem("init_instelling"));
    localStorage.setItem("persoonlijkeInstelling", JSON.stringify(instelling));
    setValues(instelling);
    setHTML(instelling);
    for(var i = 0; i < checkers.length; i++){
        checkers[i].hidden = true;
    }
}

//darkmode switch functie
function darkModeToggle(button){
    var toggleMode = button.firstChild.classList[1].split("-");
    var toggleResult;
    var darkClass;
    if(toggleMode[2] == "on"){
        toggleMode[2] = "off"
        darkClass = "copyWhite"
    } else {
        toggleMode[2] = "on"
        darkClass = "copyBlack"
    }
    toggleResult = toggleMode.join("-");
    button.firstChild.classList.remove(button.firstChild.classList[1])
    button.firstChild.classList.add(toggleResult)
    kopy.classList.remove(kopy.classList[0])
    kopy.classList.add(darkClass);
}

/* niet gebruikt
async function checkLink(url) {
    try {
      let response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        console.log(`Valid URL: ${url}`);
      } else {
        console.log(`Invalid URL: ${url}`);
      }
    } catch (error) {
      console.log(`Error checking URL: ${url} - ${error}`);
    }
}*/

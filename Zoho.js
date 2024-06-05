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
var fline = document.getElementById("fline");
var sline = document.getElementById("sline");
var profo_ = document.getElementById("profo_");
var naam_ = document.getElementById("naam_");
var Taak_ = document.getElementById("Taak_");
var Mail_ = document.getElementById("Mail_");
var Banner_ = document.getElementById("Banner_");
var url = document.getElementById("url");
let instelling;

class storageItem {
    constructor(begroetingen, profo, naam, taak, mail, banner_foto, banner_url) {
        this.begroetingen = begroetingen;
        //this.begroeting1 = begroeting1; begroeting1, begroeting2, 
        //this.begroeting2 = begroeting2;
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
    //fline.value = sItem.begroeting1
    //sline.value = sItem.begroeting2
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
    //begroeting1.innerText = sItem.begroeting1
    //begroeting2.innerText = sItem.begroeting2
    profo.firstChild.src = sItem.profo
    naam.innerText = sItem.naam
    Taak.innerText = sItem.taak
    Mail.firstChild.innerText = sItem.mail
    Mail.firstChild.href = Mailto
    Banner.src = sItem.banner_foto
    Banner.parentElement.parentElement.href = sItem.banner_link
}

window.addEventListener("load", init)

function init(){
    var begroetingenInnerText = []
    for(var i = 0; i < begroetingen.length; i++){
        begroetingenInnerText.push(begroetingen[i].innerText);
    }
    if(localStorage.getItem("persoonlijkeInstelling") == null){
        instelling = new storageItem(begroetingenInnerText, profo.firstChild.src, naam.innerText, Taak.innerText, Mail.firstChild.innerText, Banner.src, Banner.parentElement.parentElement.parentElement.href); //begroeting1.innerText, begroeting2.innerText, 
        localStorage.setItem("init_instelling", JSON.stringify(instelling));
        localStorage.setItem("persoonlijkeInstelling", JSON.stringify(instelling));
    } else {
        instelling = JSON.parse(localStorage.getItem("persoonlijkeInstelling"));
    }
    setValues(instelling);
    setHTML(instelling);
}

function copy(){
    exchange()
    var to_copy = kopy.outerHTML;
    navigator.clipboard.writeText(to_copy);
    alert("Gekopy't");
}

function exchange(){
    instelling = new storageItem(line.value.split("\n"), profo_.value.split("&amp;").join("&"), naam_.value, Taak_.value, Mail_.value, Banner_.value.split("&amp;").join("&"), url.value) //fline.value, sline.value, 
    localStorage.setItem("persoonlijkeInstelling", JSON.stringify(instelling))
    var fotoArr = [instelling.profo, instelling.banner_foto]
    //zohoLinkChecker(fotoArr)
    setHTML(instelling);
}

/*function zohoLinkChecker(fotoArr){
    var checkers = document.getElementsByClassName("check");
    instelling = JSON.parse(localStorage.getItem("init_instelling"));
    instelling = JSON.parse(localStorage.getItem("persoonlijkeInstelling"));
    zoholink = instelling.profo.split("&")[0].split("/")[2].split(":")[0]
    console.log("voor if", zoholink)
    for(var i = 0; i < checkers.length; i++){
        
        console.log("in if", fotoArr[i].split("&")[0].split("/")[2].split(":")[0])
        if(zoholink !== fotoArr[i].split("&")[0].split("/")[2].split(":")[0]){
            //checkers[i].hidden = false;
            console.log("true", checkers[i].innerText)
        } else {
            //checkers[i].hidden = true;
            console.log("false", checkers[i].innerText)
        }
    }
}*/

function reset(){
    instelling = JSON.parse(localStorage.getItem("init_instelling"));
    localStorage.setItem("persoonlijkeInstelling", JSON.stringify(instelling));
    setValues(instelling);
    setHTML(instelling);
}

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


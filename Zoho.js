var kopy = document.getElementById("kopy");
var begroeting1 = document.getElementById("begroeting1");
var begroeting2 = document.getElementById("begroeting2");
var profo = document.getElementById("profo");
var naam = document.getElementById("naam");
var Taak = document.getElementById("Taak");
var Mail = document.getElementById("Mail");
var Banner = document.getElementById("Banner");
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
    constructor(begroeting1, begroeting2, profo, naam, taak, mail, banner_foto, banner_url) {
        this.begroeting1 = begroeting1;
        this.begroeting2 = begroeting2;
        this.profo = profo;
        this.naam = naam;
        this.taak = taak;
        this.mail = mail;
        this.banner_foto = banner_foto;
        this.banner_link = banner_url;
    }
}

window.addEventListener("load", init)

function init(){
    if(localStorage.getItem("persoonlijkeInstelling") == null){
        instelling = new storageItem(begroeting1.innerText, begroeting2.innerText, profo.firstChild.src, naam.innerText, Taak.innerText, Mail.firstChild.innerText, Banner.src, Banner.parentElement.parentElement.href);
        localStorage.setItem("init_instelling", JSON.stringify(instelling));
        localStorage.setItem("persoonlijkeInstelling", JSON.stringify(instelling));
    } else {
        instelling = JSON.parse(localStorage.getItem("persoonlijkeInstelling"));
    }

    //Tekst aanpassen inputvelden
    fline.value = instelling.begroeting1
    sline.value = instelling.begroeting2
    profo_.value = instelling.profo
    naam_.value = instelling.naam
    Taak_.value = instelling.taak
    Mail_.value = instelling.mail
    Banner_.value = instelling.banner_foto
    url.value = instelling.banner_link

    //Tekst aanpassen van copy-tekst
    var Mailto = Mail.firstChild.href.split(":")[0] + ":" + Mail_.value
    begroeting1.innerText = instelling.begroeting1
    begroeting2.innerText = instelling.begroeting2
    profo.firstChild.src = instelling.profo
    naam.innerText = instelling.naam
    Taak.innerText = instelling.taak
    Mail.firstChild.innerText = instelling.mail
    Mail.firstChild.href = Mailto
    Banner.src = instelling.banner_foto
    Banner.parentElement.parentElement.href = instelling.banner_link
}

function copy(){
    exchange()
    var to_copy = kopy.outerHTML;
    //console.log(to_copy);
    navigator.clipboard.writeText(to_copy);
    alert("Gekopy't");
}

function exchange(){
    var Mailto = Mail.firstChild.href.split(":")[0] + ":" + Mail_.value
    instelling = new storageItem(fline.value, sline.value, profo_.value.split("&amp;").join("&"), naam_.value, Taak_.value, Mail_.value, Banner_.value.split("&amp;").join("&"), url.value)
    localStorage.setItem("persoonlijkeInstelling", JSON.stringify(instelling))
    var fotoArr = [instelling.profo, instelling.banner_foto]
    begroeting1.innerText = instelling.begroeting1
    begroeting2.innerText = instelling.begroeting2
    profo.firstChild.src = instelling.profo
    naam.innerText = instelling.naam
    Taak.innerText = instelling.taak
    Mail.firstChild.innerText = instelling.mail
    Mail.firstChild.href = Mailto
    Banner.src = instelling.banner_foto
    Banner.parentElement.parentElement.href = instelling.banner_link
    //zohoLinkChecker(fotoArr)
}

function zohoLinkChecker(fotoArr){
    var checkers = document.getElementsByClassName("check");
    instelling = JSON.parse(localStorage.getItem("init_instelling"));
    instelling = JSON.parse(localStorage.getItem("persoonlijkeInstelling"));
    zoholink = instelling.profo.split("&")[0]
    for(var i = 0; i < checkers.length; i++){
        if(zoholink !== fotoArr[i].split("&")[0]){
            console.log(checkers[i], checkers[i].hidden, checkers[i].innerText)
            //checkers[i].hidden = false;
        } else {
            //checkers[i].hidden = true;
            console.log("werkt")
        }
    }
}

function reset(){
    instelling = JSON.parse(localStorage.getItem("init_instelling"));

    //Tekst aanpassen inputvelden
    fline.value = instelling.begroeting1
    sline.value = instelling.begroeting2
    profo_.value = instelling.profo
    naam_.value = instelling.naam
    Taak_.value = instelling.taak
    Mail_.value = instelling.mail
    Banner_.value = instelling.banner_foto
    url.value = instelling.banner_link

    //Tekst aanpassen van copy-tekst
    var Mailto = Mail.firstChild.href.split(":")[0] + ":" + Mail_.value
    begroeting1.innerText = instelling.begroeting1
    begroeting2.innerText = instelling.begroeting2
    profo.firstChild.src = instelling.profo
    naam.innerText = instelling.naam
    Taak.innerText = instelling.taak
    Mail.firstChild.innerText = instelling.mail
    Mail.firstChild.href = Mailto
    Banner.src = instelling.banner_foto
    Banner.parentElement.parentElement.href = instelling.banner_link
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


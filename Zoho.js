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

window.addEventListener("load", init)

function init(){
    //console.log(begroeting1.innerText, begroeting2.innerText, profo.firstChild.src, naam.innerText, Banner.src, Banner.parentElement.parentElement.href)
    console.log(Taak, Mail.firstChild.href.split(":")[1], Mail.firstChild.innerText)
    fline.value = begroeting1.innerText
    sline.value = begroeting2.innerText
    profo_.value = profo.firstChild.src
    naam_.value = naam.innerText
    Taak_.value = Taak.innerText
    Mail_.value = Mail.firstChild.innerText
    Banner_.value = Banner.src
    url.value = Banner.parentElement.parentElement.href
}

function copy(){
    var to_copy = document.getElementById("kopy").outerHTML;
    console.log(to_copy)
    navigator.clipboard.writeText(to_copy);
    alert("Gekopy't");
}

function exchange(){
    var Mailto = Mail.firstChild.href.split(":")[0] + ":" + Mail_.value
    console.log(Mailto)
    begroeting1.innerText = fline.value
    begroeting2.innerText = sline.value
    profo.firstChild.src = profo_.value.split("&amp;").join("&");
    naam.innerText = naam_.value
    Taak.innerText = Taak_.value
    Mail.firstChild.innerText = Mail_.value
    Mail.firstChild.href = Mailto
    Banner.src = Banner_.value.split("&amp;").join("&")
    Banner.parentElement.parentElement.href = url.value

    /*console.log(profo.firstChild.src.split("&"), profo_.value.split("&amp;"))
    console.log(profo.firstChild.src.split("&")[1], profo.firstChild.src.split("&")[2])
    console.log(profo_.value.split("&amp;")[1], profo_.value.split("&amp;")[2])*/
}

// https://desk.zoho.com:443/support/ImageDisplay?downloadType=uploadedFile&amp;fileName=1717406591750.jpg&amp;blockId=edbsn0005cf141d1b394a62bb09407a40ac4f6cca6e7043ffb83a3f268f0ce9f83ec6&amp;zgId=edbsncae68e23a9524156b4f6211ddb91faf8&amp;mode=view


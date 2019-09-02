function openTab(evt, tab) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-black", " red");
    }
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " w3-black";

}

openTab(null,"Character");

ipc.send('version');

ipc.on('reponse-version', function (event, arg) {
    var versionInit = document.getElementById("version");
    versionInit.innerHTML = arg;
})

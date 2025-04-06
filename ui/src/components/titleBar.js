

const titleBar = async function(cmd) {
    if (cmd == "load") {
        addEventListener("DOMContentLoaded", _ => {
            titleBar();
        });
        return;
    }

    //var titleBar = document.createElement("div");
    /*titleBar.innerHTML*/var titleBarHtml = `<div id="titleBar"> <div id="titleBarText"><h1>
        <a class="ttl1">S</a>
        <a class="ttl2">h</a>
        <a class="ttl1">o</a>
        <a class="ttl2">r</a>
        <a class="ttl1">t</a>
        <a class="ttl2">-</a>
        <a class="ttl1">C</a>
        <a class="ttl2">i</a>
        <a class="ttl1">r</a>
        <a class="ttl2">c</a>
        <a class="ttl1">u</a>
        <a class="ttl2">i</a>
        <a class="ttl1">t</a>
        <div class="ttlN"><a class="ttlN">&nbsp;Storie<a class="ttlL">s</a></a></div></h1></div></div>`;
    //titleBar.id = "titleBar";
    //document.body.appendChild(titleBar);

    document.getElementById("titleBar").innerHTML = titleBarHtml;
};



async function getCurrentUser() {

    const invitation_key = new URLSearchParams(window.location.search).get("invitation_key");

    let endpoint = `cgi-bin/users?invitation_key=${invitation_key}`;
    if (invitation_key == null) {
        return;
    }
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-type": "text/plain"
        }
    });
    const usersCsv = (await response.text()).replace(/\r/g, '');
    var usersTable = new window.Table(usersCsv);
    var userId = usersTable.select(["id"], (key,val) => {
        return key=="is_current_user" && val==1;
    })[0][0].value;
    var userName = usersTable.select(["name"], (key,val) => {
        return key=="is_current_user" && val==1;
    })[0][0].value;
    return userName;
}

async function getTitlesCsv(userName) {
    const invitation_key = new URLSearchParams(window.location.search).get("invitation_key");
    let endpoint = `cgi-bin/titles?invitation_key=${invitation_key}&author=${userName}`;
    if (invitation_key == null) {
        return;
    }
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-type": "text/plain"
        }
    });
    return (await response.text()).replace(/\r/g, '');
}

const titleList = async function(cmd, payload) {
    if (cmd == "load") {
        addEventListener("DOMContentLoaded", _ => {
            titleList();
        });
        return;
    }

    if (cmd == null) {
        titleList("render", await getCurrentUser());
        return;
    }

    var currentUser = await getCurrentUser();

    var titlesCsv = await getTitlesCsv(payload);

    var html = "<table style='border-spacing: 30px;margin:0 auto;'>";

    var listings = (await getTitlesCsv()).replaceAll(/\r/g,'').split(/\n/); //window.titles.split("|");
    while (listings.length > 0 && listings[listings.length-1] == "")
    {
        listings.pop();
    }
    if (currentUser == payload) {
        listings = [ "0+&plus; (Add a new short-circuit story!)+0+0", ...listings ];
    } else if (listings.length == 0) {
        listings = [ `0+&plus; (Request access to ${payload}'s stories)+0+0`, ...listings ];
    }
    console.log(listings);
    if (listings == "") {
        listings = ["1+My Story"];
    }

    listings.forEach((l) => {
        var id = l.split("+")[0];
        var title = l.split("+")[1];
        title = title.replace(/SPANISH|ACT|GRE|MEM/g, (m) => {
            return `<a class="vType">${m}</a>`;
        });

        //var progCsv = MyJavascriptInterface.retrieveProgress(id);
        var progNum = l.split("+")[2]; /*progCsv.split("|")[0];*/
        var progPer = l.split("+")[3];/*progCsv.split("|")[1];*/
        //document.write(progPer+"<br/>");

        var onOff = MyJavascriptInterface.retrieveSoundPreference(id);
        //if (id=="2nogi4534")/*{}else*/{document.write(onOff);}
        let audioImgSrc = audioIconFilepath(onOff);
        let sound = `<img src="${audioImgSrc}">`;
        html += `<tr><td onclick="location.href='?s=${id}'" class="storyList" style="background-image:url(${id}/images/${id}.png);">`;<!-- https://stackoverflow.com/a/11877033 -->
        html += `<h2 style="color: white;padding:12px;"><span style="text-decoration:none;color: white;text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;">${title}</span> <button id="hist_${id}" style="width:44px;height:44px;" onclick="histClick(event, this)" class="redo"><img src="lib/evil-icons/evil-icons/ei-redo.svg"></button>&nbsp;<button id="sound_${id}" class="${onOff} speaker" onclick="audioClick(event, this)">${sound}</button></h2>`;
        html += `<br/><span class="progress">${progNum}</span><br/><progress value="${progPer}" max="1" style="width:auto;display:block;margin-left:20px;margin-right:20px;position:relative;top:-27px;height:40px;accent-color:#71af88;"></progress>`;
        /*if (title.indexOf("Des")>0) {
            html += "<div style='height:30px;'></div>";
            for (var i=0; i<3; i++) {
                var text = (i==0) ? "<a style='color:#CAFFB5'>$0.99 - Buy the complete series</a><br/>&nbsp;<a style='color:white'>Unlock <b>GRE</b>en Planet Saga</a>" : ""
                var bgColor = ["sienna","gold","silver"][i];
                var rad = [0,10,0][i];
                var sagaDiv = `<div style="width:100%;height:55px;background-color:${bgColor};border-radius:${rad}px;position:relative;top:${-4*((i+1)*10)}px;z-index:${[1000,999,998][i]};padding-top:10px;"> &nbsp;${text}`;
                sagaDiv += "</div>";
                html += sagaDiv;
            }
        
            //html += `<div style="background-color:white;width:100%;height:100%;position:relative;bottom:0px;padding:0;margin:0;">&nbsp;</div>`;
        }
        */

        html += "</td></tr>"
    });

    html += "</table>";

    document.getElementById("titleList").innerHTML = html;
};

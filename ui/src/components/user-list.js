

async function getUsersCsv() {

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
    const csv = (await response.text()).replace(/\r/g, '');
    return csv;
}

const userSelectBox = async function(cmd) {
    if (cmd == "load") {
        addEventListener("DOMContentLoaded", _ => {
            userSelectBox();
        });
        return;
    }

//document.addEventListener("DOMContentLoaded", async function() {
    var usersCsv = await getUsersCsv();
    var usersTable = new window.Table(usersCsv);
    var userId = usersTable.select(["id"], (key,val) => {
        return key=="is_current_user" && val==1;
    })[0][0].value;
    var isAdmin = usersTable.select(["is_admin"], (key,val) => {
        return key==="id" && val==userId;
    })[0][0].value;
    var userName = usersTable.select(["name"], (key,val) => {
        return key=="is_current_user" && val==1;
    })[0][0].value;

    var rows = [];
    if (isAdmin) {
        rows = [ ...rows, usersTable.select(["name"], (key,val) => true) ];
    } else {
        rows = [ ...rows, usersTable.select(["name"], (key,val) => key==="is_admin" && val==0) ];
        rows = [ ...rows, usersTable.select(["admin_name"], (key,val) => key==="is_admin" && val==1) ];
    }
    var users = [];
    for (var i=0; i<rows.length; i++) {
        if (rows[i].length == 0) continue;
        users = [ ...users, rows[i][0][0].value ];
    }

    var selectHtml = `<select>`;
    for (var i=0; i<users.length; i++) {
        var attr = userName === users[i] ? "selected" : "";
        selectHtml += `<option ${attr}>${users[i]}</option>`
    }
    selectHtml += "</select>";
    document.getElementById("USERS_DIV_ID").innerHTML = selectHtml;
};

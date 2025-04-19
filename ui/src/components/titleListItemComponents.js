const titleListItemExistingTitle = async function(cmd, payload, id = 'Error') {
    if (cmd == "load") {
        if (document.readyState === "loading") {
            addEventListener("DOMContentLoaded", _ => {
                titleListItemExistingTitle();
            });
        } else {
            titleListItemExistingTitle(null, payload, id);
        }
        return;
    }

    // DATA

    var elementId = `titleListItemExistingTitle-${id}`;

    if (cmd == "test") {

        var elementIdComponents = elementId.split('-');

        var inputsTest = (id != 'Error' && payload != null);
        var outputsTest = (elementIdComponents[0] != null && !isNaN(parseInt(elementIdComponents[1])));
        console.log("titleListItemExistingTitle test", inputsTest && outputsTest);
        return;
    }

    // ELEMENTS

    const a = document.createElement("a");
    a.href = "#";
    a.textContent = payload;

    const container = document.getElementById(elementId);
    container.innerHTML = "";
    container.appendChild(a);
};


const titleListItemNewTitle = async function(cmd, payload, id = 1) {
    console.log(cmd,payload,id);
    if (cmd == "load") {
        if (!document.getElementById(`titleListItemNewTitle-${id}`)) {
            console.log('tick');
            setTimeout(()=>{titleListItemNewTitle(cmd, payload, id);}, 200);
        } else {
            titleListItemNewTitle(null, payload, id);
        }
        return;
    }
    // DATA
    var fields = [{ label: "title", value: "" }];
    var modalCmd = "show";
    var titleTextContent = "&plus; (Add a new short-circuit story!)";

    if (cmd == "test") {
        console.log("titleListItemNewTitle test",
            fields.length == 1 && id != null && modalCmd == "show" &&
            titleTextContent.indexOf("Add") > -1);
        return;
    }

    // ELEMENTS
    const a = document.createElement("a");
    a.href = "#";
    a.innerHTML = titleTextContent;

    a.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        textInputsModal(modalCmd, fields, 1);
    });

    const container = document.getElementById(`titleListItemNewTitle-${id}`);
    container.innerHTML = "";
    container.appendChild(a);
};



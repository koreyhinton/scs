// EXISTING TITLE
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

    // TODO:
    //    when adding the textInputsModal
    //    must add a new object property: hidden. To include the id field but don't show it.
    //        e.g., { label: "id", value: "1", key: "id", hidden: true },

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

// NEW TITLE
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
    var modalPayload = {
        title: "Add a new story share",
        inputs: [
            { label: "Title", value: "", key: "title" },
        ],
        onSubmit: "storyShareNew"
    };
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
        textInputsModal(modalCmd, modalPayload, 1);
    });

    const container = document.getElementById(`titleListItemNewTitle-${id}`);
    container.innerHTML = "";
    container.appendChild(a);
};



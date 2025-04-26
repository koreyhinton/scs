const textInputsModal = async function(cmd, payload, id = 1) {
    if (cmd == "load") {
        addEventListener("DOMContentLoaded", _ => {
            textInputsModal(null, payload, id);
        });
        return;
    }

    if (cmd == "collect") {
        var inputs = document.getElementsByClassName("textInputsModalCollectibles");
        var data = {};
        for (var i=0; i<inputs.length; i++) {
            var key = inputs[0].getAttribute("name");
            var value = inputs[0].getAttribute("value");
            data[key] = value;
        }
        return data;
    }

    // DATA

    if (!payload) {
        payload = {inputs:[],title:'',onSubmit:''};
    }

    var inputsHtml = "";
    for (var i=0; i<payload.inputs.length; i++) {
        var inputId = "textInputsModal-input-"+(i+1);
        inputsHtml += `
            <label for="${inputId}">${payload.inputs[i].label}</label>
            <input class="textInputsModalCollectibles" name="${payload.inputs[i].key}" type="text" id="${inputId}" value="${payload.inputs[i].value}"/>
        `;
    }

    if (cmd == "test") {
        var inputsTest = (!!payload[0].value && !!payload[0].label);
        var outputsTest = inputsHtml.indexOf(payload[0].value) > -1 &&
            inputsHtml.indexOf(payload[0].label) > -1;
        console.log("textInputsModal test", inputsTest, outputsTest);
        return;
    }


    // ELEMENTS

    const container = document.getElementById(`textInputsModal-${id}`);

    if (cmd == "show") {
        container.style.visibility = "visible";        
    } else {
        container.style.visibility = "hidden";
    }

    container.innerHTML = `
        <div class="modal-header">
            ${payload.title}
        </div>
        <div class="modal-line"></div>
        <form>
            ${inputsHtml}
        </form>
        <div class="modal-line"></div>
        <div class="modal-footer">
            <button onclick="${payload.onSubmit}">Close</button>
        </div>
    `;
};

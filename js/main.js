var tezaButtonPressed = false;
var resetButtonPressed = false;
var point5ButtonsView = true;
var swapButtonsButtonPressed = false;


function numberButtonClick(b) {
    resetSwapButton();
    var value = b.getAttribute("data-value");

    // if 1 <= value <= 10 
    if (Array.from(Array(10), (e, i) => i+1).some(e => e == value || e - 0.5 == value)) {
        if (resetButtonPressed) {
            // un-active
            resetButtonPressed = false;
            document.getElementsByClassName("reset-button")[0].style.backgroundColor = "#B9A1CF";
            document.getElementsByClassName("reset-button")[0].style.color = "#3A145C";
        }
        if (tezaButtonPressed) {
            addNewTeza(value);
            // set button to un-active
            tezaButtonPressed = false;
            document.getElementsByClassName("teza-button")[0].style.backgroundColor = "#B9A1CF";
            document.getElementsByClassName("teza-button")[0].style.color = "#3A145C";
        }
        else {
            addNewNota(value);
        }
        updateMedie();
    }
    else {
        console.error("invalid value by clicking " + b + " value is not in 1-10: " + value);
    }
}

function addNewTeza(n) {
    document.getElementsByClassName("teza-span")[0].textContent = n;
}

function addNewNota(n) {
    addNewNotaToHtml(n);
}

// called when changing button values
function deactivateResetAndTezaButtons() {
    tezaButtonPressed = false;
    document.getElementsByClassName("teza-button")[0].style.backgroundColor = "#B9A1CF";
    document.getElementsByClassName("teza-button")[0].style.color = "#3A145C";
    resetButtonPressed = false;
    document.getElementsByClassName("reset-button")[0].style.backgroundColor = "#B9A1CF";
    document.getElementsByClassName("reset-button")[0].style.color = "#3A145C";
    document.getElementsByClassName("reset-button")[1].style.backgroundColor = "#B9A1CF";
    document.getElementsByClassName("reset-button")[1].style.color = "#3A145C";
}

function resetSwapButton() {
    var b = document.getElementsByClassName("change-button-values")[0];
    var fas = document.getElementsByClassName("fa-exchange-alt")[0];
    b.style.backgroundColor = "#D7C8E5";
    b.style.color = "#3A145C";
    fas.style.backgroundColor = "#D7C8E5";
    fas.style.color = "#3A145C";
    swapButtonsButtonPressed = false;
}

function swapButtonLayout(b) {
    // un-activate all other buttons
    deactivateResetAndTezaButtons();
    var fas = document.getElementsByClassName("fa-exchange-alt")[0];
    if (swapButtonsButtonPressed) {
        // un-activate button
        resetSwapButton();

        // and change layout
        var e = document.getElementsByClassName("buttons-container")[0];
        var f = document.getElementsByClassName("buttons-container-with-decimals")[0];
        var l = document.getElementsByClassName("edit-note-layout")[0];
        // clicked on button to swap when we had .5 layout active, so we 'activate' the other one
        if (point5ButtonsView) {
            e.style.display = "grid";
            f.style.display = "none";
            l.style.display = "none";
        }
        else {
            e.style.display = "none";
            f.style.display = "grid";
            l.style.display = "none";
        }
        resetAll();
        point5ButtonsView = !point5ButtonsView;
    }
    else {
        // activate button
        b.style.backgroundColor = "#7B579D"
        b.style.color = "#D7C8E5";
        fas.style.backgroundColor = "#7B579D";
        fas.style.color = "#D7C8E5";
        swapButtonsButtonPressed = true;
    }

}

function swapEditNoteLayout() {
    var e = document.getElementsByClassName("buttons-container")[0];
    var f = document.getElementsByClassName("buttons-container-with-decimals")[0];
    var l = document.getElementsByClassName("edit-note-layout")[0];
    var eDisplay = getComputedStyle(e, null).display;
    var fDisplay = getComputedStyle(f, null).display;
    if (eDisplay == "" || eDisplay == "grid" || fDisplay == "" || fDisplay == "grid") {
        e.style.display = "none";
        f.style.display = "none";
        l.style.display = "flex";
    }
    else {
        if (point5ButtonsView) {
            e.style.display = "none";
            f.style.display = "grid";
        }
        else {
            e.style.display = "grid";
            f.style.display = "none";
        }
        l.style.display = "none";
    }
}

function getNotaFlexItemHtmlAsStringWithNota(n) {
    return '<div class="nota-flex-item"><div class="nota-flex-item-text">' + n + '</div></div>';
}

function deleteNode(e) {
    e.parentNode.removeChild(e);
}

function addNewNotaToHtml(n) {
    var s = getNotaFlexItemHtmlAsStringWithNota(n);

    var smallContainer = document.getElementsByClassName('note-container-text')[0];
    smallContainer.insertAdjacentHTML('afterbegin', s);
    var smallContainerChild = smallContainer.firstElementChild;
    
    var bigContainer = document.getElementsByClassName('edit-note-layout')[0];
    bigContainer.insertAdjacentHTML('afterbegin', s);
    var bigContainerChild = bigContainer.firstElementChild;
    bigContainerChild.onclick = function() {
        deleteNode(bigContainerChild);
        deleteNode(smallContainerChild);
        updateMedie();
    }
}

function tezaButtonClick(b) {
    resetSwapButton();
    tezaButtonPressed = !tezaButtonPressed;
    if (resetButtonPressed) {
        addNewTeza("-");
        updateMedie();
        // set button to un-active
        tezaButtonPressed = false;
        b.style.backgroundColor = "#B9A1CF";
        b.style.color = "#3A145C";
        resetButtonPressed = false;
        document.getElementsByClassName("reset-button")[0].style.backgroundColor = "#B9A1CF";
        document.getElementsByClassName("reset-button")[0].style.color = "#3A145C";
    }
    else if (tezaButtonPressed) {
        b.style.backgroundColor = "#7B579D";
        b.style.color = "#D7C8E5";
    }
    else {
        b.style.backgroundColor = "#B9A1CF";
        b.style.color = "#3A145C";
    }
}

function resetButtonClick(b) {
    resetSwapButton();
    resetButtonPressed = !resetButtonPressed;
    if (tezaButtonPressed) {
        addNewTeza("-");
        updateMedie();
        // set button to un-active
        tezaButtonPressed = false;
        document.getElementsByClassName("teza-button")[0].style.backgroundColor = "#B9A1CF";
        document.getElementsByClassName("teza-button")[0].style.color = "#3A145C";
        resetButtonPressed = false;
        b.style.backgroundColor = "#B9A1CF";
        b.style.color = "#3A145C";
    }
    else {
        if (resetButtonPressed) {
            b.style.backgroundColor = "#7B579D";
            b.style.color = "#D7C8E5";
        }
        else {
            b.style.backgroundColor = "#B9A1CF";
            b.style.color = "#3A145C";
            resetAll();
        }
    }
}

function resetAll() {
    resetSwapButton();
    addNewTeza("-");
    var toClick = [];
    Array.prototype.forEach.call(
        document.getElementsByClassName("edit-note-layout")[0].children,
        function (e) { toClick.push(e); }
    );
    toClick.forEach(e => e.click());
    updateMedie();
}

function checkIfTeza() {
    return document.getElementsByClassName("teza-span")[0].textContent != "-";
}

function writeToMedieContainer(value) {
    document.getElementsByClassName("medie-container-text")[0].textContent = value;
}

function updateMedie() {
    var t;
    var m;
    var n = 0;
    var s = 0;
    
    var toSum = [];
    Array.prototype.forEach.call(
        document.getElementsByClassName("edit-note-layout")[0].children,
        function (e) { 
            s = s + parseInt(e.textContent);
            n = n + 1;
        }
    );

    if (n > 0) {
        m = Math.trunc((s / n) * 100) / 100;
        
        if (checkIfTeza()) {
            var valTeza = parseInt(document.getElementsByClassName("teza-span")[0].textContent);
            t = Math.trunc(((3 * m + valTeza) / 4) * 1000) / 1000;
        }
        else {
            t = Math.trunc((m * 1000)) / 1000;
        }
        
        writeToMedieContainer(t);
    }
    else {
        writeToMedieContainer("");
    }
}
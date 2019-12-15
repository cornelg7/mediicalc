var tezaButtonPressed = false;
var resetButtonPressed = false;


function numberButtonClick(b) {
    var value = b.getAttribute("data-value");

    // if 1 <= value <= 10 
    if (Array.from(Array(10), (e, i) => i+1).some(e => e == value)) {
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

function swapEditNoteLayout() {
    var e = document.getElementsByClassName("buttons-container")[0];
    var l = document.getElementsByClassName("edit-note-layout")[0];
    var d = getComputedStyle(e, null).display;
    if (d == "" || d == "grid") {
        e.style.display = "none";
        l.style.display = "flex";
    }
    else {
        e.style.display = "grid";
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
    smallContainer.insertAdjacentHTML('beforeend', s);
    var smallContainerChild = smallContainer.lastElementChild;
    
    var bigContainer = document.getElementsByClassName('edit-note-layout')[0];
    bigContainer.insertAdjacentHTML('beforeend', s);
    var bigContainerChild = bigContainer.lastElementChild;
    bigContainerChild.onclick = function() {
        deleteNode(bigContainerChild);
        deleteNode(smallContainerChild);
        updateMedie();
    }
}

function tezaButtonClick(b) {
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
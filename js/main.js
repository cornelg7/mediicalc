var tezaButtonPressed = false;


function numberButtonClick(b) {
    var value = b.getAttribute("data-value");

    // if 1 <= value <= 10 
    if (Array.from(Array(10), (e, i) => i+1).some(e => e == value)) {
        if (tezaButtonPressed) {
            addNewTeza(value);
        }
        else {
            addNewNota(value);
        }
    }
    else {
        console.error("invalid value by clicking " + b + " value is not in 1-10: " + value);
    }
}

function addNewTeza(n) {
    document.getElementsByClassName("teza-span")[0].textContent = value;
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
    }
}
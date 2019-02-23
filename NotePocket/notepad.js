const addNoteButton = document.querySelector("#add-note");
const noteContainer = document.querySelector("#notes-container");
const clearStorage = document.querySelector("#clear-storage");
const ntitle = document.querySelector("#ntitle");

const colors = ["#deeaee", "#b1cbbb", "#eea29a", "#c94c4c", "#588c7e", "#f2e394", "#f2ae72", "#d96459"];

function Notatka(content, date, color, title) {
    this.content = content;
    this.date = date;
    this.color = color;
    this.title = title;
}

// dodawanie notatki

addNoteButton.addEventListener('click', function () {
    let titleValue = ntitle.value;
    let d = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let noteTime = d.getDate() + ' ' + months[d.getMonth()];
    let noteColor = colors[Math.floor(Math.random() * (colors.length - 1))];
    let notatka = new Notatka("", noteTime, noteColor, titleValue);

    let note = document.createElement("div");
    note.classList.add('note');

    let tytul = document.createElement("div");
    let data1 = document.createElement("div");
    let kontener = document.createElement("div");
    kontener.classList.add('kontener');

    tytul.innerHTML = notatka.title;
    data1.innerHTML = notatka.date;
    kontener.appendChild(tytul);
    kontener.appendChild(data1);
    note.appendChild(kontener);

    let eContent = document.createElement("div");
    eContent.setAttribute("contenteditable", "true");
    eContent.classList.add('econtent');
    note.appendChild(eContent);

    note.style.background = notatka.color;
    note.style.opacity = "1";

    noteContainer.appendChild(note);

    localStorage.setItem('notatka' + localStorage.length, JSON.stringify(notatka));

    ntitle.value = "";

    saveEditedNote();
});

// wyświetlanie notatek z localstorage

for (let i = 0; i < localStorage.length; i++) {

    let note = document.createElement("div");
    note.classList.add('note');

    let noteParse = JSON.parse(localStorage["notatka" + i]);

    let tytul = document.createElement("div");
    let data1 = document.createElement("div");
    let kontener = document.createElement("div");
    kontener.classList.add('kontener');

    tytul.innerHTML = noteParse.title;
    data1.innerHTML = noteParse.date;
    kontener.appendChild(tytul);
    kontener.appendChild(data1);
    note.appendChild(kontener);

    let eContent = document.createElement("div");
    eContent.setAttribute("contenteditable", "true");
    eContent.classList.add('econtent');
    eContent.innerText = noteParse.content;
    note.appendChild(eContent);

    note.style.background = noteParse.color;
    noteContainer.appendChild(note);
}

// 'czyszczenie' localstorage
clearStorage.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});



function saveEditedNote() {
    let allNotes = document.querySelectorAll('.econtent');

    for (let y = 0; y < allNotes.length; y++) {
        allNotes[y].addEventListener('keyup', function () {
            console.log('eventKeyUp');
            let c = JSON.parse(localStorage["notatka" + y]);
            console.log(c);

            c.content = this.innerHTML;
            localStorage.setItem("notatka" + y, JSON.stringify(c));
        })
    }
}

saveEditedNote();
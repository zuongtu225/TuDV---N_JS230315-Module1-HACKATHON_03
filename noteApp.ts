class Note {
  getNote() {
    let title = (document.getElementById("title") as HTMLInputElement).value;
    let content = (document.getElementById("content") as HTMLInputElement)
      .value;
    if (listNoteLocal.length == 0) {
      const newNote: object = { id: 1, title: title, content: content };
      return newNote;
    } else {
      const maxId = Math.max(...listNoteLocal.map((note: any) => note.id));
      const newNote: object = { id: maxId + 1, title: title, content: content };
      return newNote;
    }
  }
}
const getnote = new Note();

const listNote = localStorage.getItem("listNote");
const listNoteLocal = listNote ? JSON.parse(listNote) : [];

const add = document.getElementById("addNote") as HTMLElement;
add.addEventListener("click", () => {
  const newNote = getnote.getNote();
  const checkForm = validate();
  if (checkForm) {
    alert("Vui lòng nhập đầy đủ thông tin");
  } else {
    listNoteLocal.push(newNote);
    localStorage.setItem("listNote", JSON.stringify(listNoteLocal));
    renderNote(listNoteLocal);
  }
});

function renderNote(data: any) {
  const print = document.getElementById("listNote") as HTMLDivElement;
  let content = "";
  data.forEach((note: any) => {
    content += ` <div id="note">
    <p id="renderTitle">${note.title}</p>    
    <p id="noted">${note.content}</p>
      <i class="bx bxs-trash-alt" id="delete" onclick="handleDelete(${note.id})" ></i>
    </div>`;
  });
  print.innerHTML = content;
}

renderNote(listNoteLocal);

function handleDelete(id: number) {
  listNoteLocal.forEach((note: any, index: number) => {
    if (note.id == id) {
      listNoteLocal.splice(index, 1);
    }
  });
  localStorage.setItem("listNote", JSON.stringify(listNoteLocal));
  renderNote(listNoteLocal);
}

function validate() {
  let title = (document.getElementById("title") as HTMLInputElement).value;
  let content = (document.getElementById("content") as HTMLInputElement).value;
  let isDulicate = false;
  if (title === "" && content === "") {
    isDulicate = true;
  }
  return isDulicate;
}

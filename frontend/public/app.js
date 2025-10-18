const API_URL = "http://localhost:5000/notes";


async function fetchNotes() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderNotes(data);
}

function renderNotes(notes) {
  const container = document.getElementById("notes");
  container.innerHTML = "";
  if (!notes.length) {
    container.innerHTML = "<p>No notes yet!</p>";
    return;
  }

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;
    container.appendChild(div);
  });
}

async function addNote(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body })
  });

  document.getElementById("noteForm").reset();
  fetchNotes();
}

async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchNotes();
}

document.getElementById("noteForm").addEventListener("submit", addNote);
fetchNotes();

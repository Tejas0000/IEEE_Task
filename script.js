// script.js
const stickyContainer = document.getElementById("sticky-container");
const addNoteButton = document.getElementById("add-note-button");

addNoteButton.addEventListener("click", createStickyNote);

function createStickyNote() {
  const colors = ['#ffeb3b', '#ff5722', '#03a9f4', '#4caf50', '#9c27b0'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const stickyNote = document.createElement("div");
  stickyNote.className = "sticky-note";
  stickyNote.style.backgroundColor = randomColor;
  stickyNote.innerHTML = `
    <button class="delete-button">Delete</button>
    <textarea class="title-input" placeholder="Title"></textarea>
    <textarea class="note-content" placeholder="Write your content here..."></textarea>
  `;

  // Make the sticky note draggable using interact.js
  interact(stickyNote).draggable({
    onstart: () => {
      stickyNote.classList.add("dragging");
    },
    onend: () => {
      stickyNote.classList.remove("dragging");
    },
  });

  const noteContent = stickyNote.querySelector(".note-content");
  const deleteButton = stickyNote.querySelector(".delete-button");

  // Add an event listener to delete the note
  deleteButton.addEventListener("click", () => {
    deleteStickyNote(stickyNote);
  });

  // Automatically adjust the text area height as content increases
  noteContent.addEventListener("input", () => {
    resizeTextarea(noteContent);
    
  });

  stickyContainer.appendChild(stickyNote);
}

function deleteStickyNote(note) {
  note.remove();
}

// Automatically adjust the text area height as content increases

function resizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// Create an initial sticky note
createStickyNote();
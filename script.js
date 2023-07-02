const addbutton = document.querySelector("#add");
const mainContainer = document.querySelector(".main-container");


const updateData = () =>{
    const textarea = document.querySelectorAll("textarea");
     const notesData = [];
     textarea.forEach((currElem) =>{
        notesData.push(currElem.value);
     })

     localStorage.setItem('notesData' , JSON.stringify(notesData));
}

const addNewNote = (text = "") =>{
    
    const note = document.createElement("div");
    note.classList.add("Note");

    const htmlData = `
    <div class="btns">
    <button class="edit"> <i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>

  <div class="textera">
      <div class="main" class =${text? "" : "hidden"}></div>
      <textarea class = ${text? "hidden" : ""}></textarea>
  </div>    
    `;

    note.insertAdjacentHTML('afterbegin' , htmlData);
    mainContainer.appendChild(note);

    // getting refrences 

    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textarea = note.querySelector("textarea");


     
    // delete the node
    deleteButton.addEventListener('click' , () => {
        note.remove();
        updateData();
    })

   
    // Toggle using edit icon
    textarea.value = text;
     mainDiv.innerHTML = text;
  
     editButton.addEventListener('click' , ()=>{
        // mainDiv.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
     })

     textarea.addEventListener('change' , (event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateData();
     })


}

const notes = JSON.parse(localStorage.getItem('notesData'));

if(notes){
    notes.forEach((currElem) =>{
     addNewNote(currElem);
    })
}

addbutton.addEventListener('click' , () => addNewNote());
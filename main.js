let rightElement = document.querySelector('.right');
let notesListRootElement = document.querySelector('.notesList');

let notes = [];
document.querySelector('#NEWNOTE').addEventListener('click', () => {

   
    const existingcreatenewtask = document.querySelector('.createnewtask');
    if (existingcreatenewtask) {
        existingcreatenewtask.remove();
    }

    rendercreatenote();
   
});

function rendercreatenote() {
    const existingDisplaySection = document.querySelector('.displaysection');
    if (existingDisplaySection) {
        existingDisplaySection.remove();
    }
    const existingNONOTESFOUND = document.querySelector('.NONOTESFOUND');
    if (existingNONOTESFOUND) {
        existingNONOTESFOUND.remove();
    }

    let maindiv = document.createElement('div');
    maindiv.className = 'createnewnote';
    let createNoteDiv = document.createElement('div');
    createNoteDiv.className = 'createNote';
    let Titleinput = document.createElement('input');
    Titleinput.id = 'createNoteTitle';
    Titleinput.placeholder = 'NOTE TITLE';
    let Inputdescription = document.createElement('textarea');
    Inputdescription.id = 'createNoteContent';
    Inputdescription.cols = "20";
    Inputdescription.rows = "7";
    Inputdescription.placeholder = 'NOTE DESCRIPTION';
    let createNoteButton = document.createElement('button');
    createNoteButton.id = 'createNoteButton';
    createNoteButton.innerHTML = 'Create Note';

    createNoteDiv.appendChild(Titleinput);
    createNoteDiv.appendChild(Inputdescription);
    maindiv.appendChild(createNoteDiv);
    maindiv.appendChild(createNoteButton);
    rightElement.appendChild(maindiv);

    document.querySelector('#createNoteTitle').value = '';
    document.querySelector('#createNoteContent').value = '';

    createNoteButton.addEventListener('click', () => {

        let uniqueID = 'note' + Math.floor(Math.random() * 1000);
        let note = {
            title: document.querySelector('#createNoteTitle').value,
            content: document.querySelector('#createNoteContent').value,
            tasks:[],
        };
        addNoteToLocalStorage(note, uniqueID);
        renderNoteToList(note, uniqueID);
        const existingcreatenewnote = document.querySelector('.createnewnote');
        if (existingcreatenewnote) {
            existingcreatenewnote.remove();
        }
    });
}

function renderNoteToList(note, uniqueID) {

    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note', uniqueID);
    let noteTitle = document.createElement('h1');
    let noteContent = document.createElement('p');

    noteTitle.innerText = note.title;
    noteContent.innerText = note.content;

    noteDiv.appendChild(noteTitle);
    noteDiv.appendChild(noteContent);
    notesListRootElement.appendChild(noteDiv);
   

    noteDiv.addEventListener('click', () => {

        const existingcreatenewnote = document.querySelector('.createnewnote');
        if (existingcreatenewnote) {
            existingcreatenewnote.remove();
        }
        const existingdisplaysection = document.querySelector('.displaysection');
        if (existingdisplaysection) {
            existingdisplaysection.remove();
        }
        notedisplay(note, uniqueID);
    });
}

function addNoteToLocalStorage(note, uniqueID) {
    note = { ...note, uniqueID };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}
function renderElementsToScreen() {
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'));
        if (notes.length > 0) {
            notes.forEach((note) => {
                renderNoteToList(note, note.uniqueID);
                if (note.tasks && note.tasks.length > 0) {
                    note.tasks.forEach((task) => {
                        addtask(task,note.uniqueID);
                    });
                }
            });
        } else {
            NONOTESFOUND();
        }
    }
}




renderElementsToScreen();

function notedisplay(note, uniqueID) {
    const existingcreatenewtask = document.querySelector('.createnewtask');
    if (existingcreatenewtask) {
        existingcreatenewtask.remove();
    }
    let displaysection = document.createElement('section');
    displaysection.className = 'displaysection';
    let notedisplayheader = document.createElement('div');
    notedisplayheader.className = 'notedisplayheader';
    let titleheading = document.createElement('h1');
    titleheading.innerText = note.title;
    let buttondiv = document.createElement('div');
    buttondiv.className = 'buttondiv';
    let taskbutton = document.createElement('button');
    taskbutton.innerHTML = 'NEW TASK';
    taskbutton.id = 'taskbutton';

    let deletebutton = document.createElement('button');
    deletebutton.innerHTML = 'DELETE NOTE';
    deletebutton.id = 'deletebutton';
    deletebutton.addEventListener('click', () => {
        removeElementFromNotesList(uniqueID);
    });
    let notedisplaydiv = document.createElement('div');
    notedisplaydiv.className = 'notedisplaydiv';

    let notecontentdiv=document.createElement('div')
    notecontentdiv.className='notecontentdiv'
    notecontentdiv.innerText = note.content;
    

    let tasklistdiv = document.createElement('div');
    tasklistdiv.className = 'tasklistdiv';
    let tasklistheading = document.createElement('h4');
    tasklistheading.innerHTML = 'TASKS LIST';

    notedisplayheader.appendChild(titleheading);
    notedisplayheader.appendChild(buttondiv);
    buttondiv.appendChild(taskbutton);
    buttondiv.appendChild(deletebutton);
    displaysection.appendChild(notedisplayheader);
    tasklistdiv.appendChild(tasklistheading);
    notedisplaydiv.appendChild(notecontentdiv)
    notedisplaydiv.appendChild(tasklistdiv);

    displaysection.appendChild(notedisplaydiv);
    rightElement.appendChild(displaysection);

    taskbutton.addEventListener('click', () => {
        const existingcreatenewtask = document.querySelector('.createnewtask');
        if (existingcreatenewtask) {
            existingcreatenewtask.remove();
        }
        createnewtask(uniqueID);
        
    });
    renderTasksForNote(uniqueID) 
}

function removeElementFromNotesList(id) {
    document.querySelector('.' + id).remove();
    notes = JSON.parse(localStorage.getItem('notes'));
    let index = notes.findIndex(note => note.uniqueID == id);
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    if (notes.length === 0) {
        NONOTESFOUND();
    }
    document.querySelector('.displaysection').remove();
}

function NONOTESFOUND(){
    let NONOTESFOUNDdiv=document.createElement('div')
    NONOTESFOUNDdiv.className='NONOTESFOUND'
    let NONOTESFOUNDimg=document.createElement('img')
    NONOTESFOUNDimg.src="./images/file.png"
    let NONOTESFOUNDh3=document.createElement('h3')
    NONOTESFOUNDh3.textContent='NO NOTES FOUND'
    let NONOTESFOUNDp=document.createElement('p')
    NONOTESFOUNDp.textContent='ADD SOME NOTES FROM THE LEFT COLUMN'
    NONOTESFOUNDdiv.appendChild(NONOTESFOUNDimg)
    NONOTESFOUNDdiv.appendChild(NONOTESFOUNDh3)
    NONOTESFOUNDdiv.appendChild(NONOTESFOUNDp)
    rightElement.appendChild(NONOTESFOUNDdiv)
    }

function createnewtask(uniqueID) {
    let createnewtask = document.createElement('div');
    createnewtask.className = 'createnewtask';
    let inputdiv = document.createElement('div');
    inputdiv.className = 'inputdiv';
    let taskname = document.createElement('input');
    taskname.className = 'taskname';
    taskname.placeholder = 'TASK NAME';
    let createtask = document.createElement('button');
    createtask.id = 'createtask';
    createtask.innerHTML = 'CREATE TASK';
    createtask.addEventListener('click', () => {
        
       let task = {
      name: document.querySelector(".taskname").value,
      taskid: "task" + Math.floor(Math.random() * 1000),
      completed: false,
        };  
        addtask(task, uniqueID);
         
    });
    inputdiv.appendChild(taskname);
    createnewtask.appendChild(inputdiv);
    createnewtask.appendChild(createtask);
    rightElement.appendChild(createnewtask);
}


function addtask(task,uniqueID,) {
     
    
    let tasklist = document.createElement('div');
    tasklist.classList.add('task', task.taskid);

    let taskName = document.createElement('input');
    taskName.type = 'radio'; 
    taskName.name = 'taskRadioGroup'; 
    taskName.value = task.name;

    let label = document.createElement('label');
    label.innerText = task.name;
    
    tasklist.appendChild(taskName);
    tasklist.appendChild(label);
    let tasklistdiv = document.querySelector('.tasklistdiv');
    if (tasklistdiv) {
        tasklistdiv.appendChild(tasklist);
    }
    

  
    const existingcreatenewtask = document.querySelector('.createnewtask');
    if (existingcreatenewtask) {
        existingcreatenewtask.remove();
    }


  let localData = JSON.parse(localStorage.getItem("notes"));

  let requiredNote = localData.filter((note) => note.uniqueID === uniqueID);


  let requiredTasks = requiredNote[0].tasks;
  requiredTasks.push(task);

  let updatedData = localData.map((note) => {
    return note.uniqueID === uniqueID
      ? { ...note, tasks: requiredTasks }
      : { ...note };
  });
  localStorage.setItem('notes', JSON.stringify(updatedData));
}

function renderTasksForNote(uniqueID) {
    let localData = JSON.parse(localStorage.getItem("notes"));
    let requiredNote = localData.find((note) => note.uniqueID === uniqueID);

    if (requiredNote && requiredNote.tasks && requiredNote.tasks.length > 0) {
        requiredNote.tasks.forEach((task) => {
            renderTask(task, uniqueID);
        });
    }
}

function renderTask(task, uniqueID) {
    let tasklistdiv = document.querySelector('.tasklistdiv');

    if (tasklistdiv) {
        let existingTask = document.querySelector(`.task.${task.taskid}`);
        if (!existingTask) {
            let tasklist = document.createElement('div');
            tasklist.classList.add('task', task.taskid);

            let taskName = document.createElement('input');
            taskName.type = 'radio';
            taskName.name = 'taskRadioGroup';
            taskName.value = task.name;

            let label = document.createElement('label');
            label.innerText = task.name;

            tasklist.appendChild(taskName);
            tasklist.appendChild(label);

            tasklistdiv.appendChild(tasklist);
        }
    }
}
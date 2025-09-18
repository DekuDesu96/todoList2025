// // Seleziona elementi DOM
// const taskInput = document.getElementById('taskInput');
// const addTaskButton = document.getElementById('addTask');
// const taskList = document.getElementById('taskList');
// let showCompletedOnly = false;
// let currentPage = 1;
// const tasksPerPage = 5;

// // Funzione per aggiungere un task
// function addTask() {
//     const taskText = taskInput.value.trim(); // Prende il testo e rimuove spazi
//     if (taskText !== '') {
//         // Crea un nuovo elemento li
//         const li = document.createElement('li');
//         li.textContent = taskText;

//         // Crea bottone di eliminazione
//         const deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'Elimina';
//         deleteBtn.className = 'delete-btn';

//         const completeBtn = document.createElement('button');
//         completeBtn.textContent = 'Completa';
//         completeBtn.className = 'complete-btn';

//         // Aggiungi bottone al li
//         li.appendChild(completeBtn);
//         li.appendChild(deleteBtn);
//         taskList.appendChild(li);
//         taskInput.value = ''; // Svuota l'input
//     }
// }

// async function loadTasks(page = 1) {
//     try {
//         const start = (page - 1) * tasksPerPage;
//         const url = showCompletedOnly
//             ? `https://jsonplaceholder.typicode.com/todos?completed=true&_start=${start}&_limit=${tasksPerPage}`
//             : `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${tasksPerPage}`;
//         const response = await fetch(url);
//         const tasks = await response.json();
//         taskList.innerHTML = '';
//         tasks.forEach(task => {
//             const li = document.createElement('li');
//             li.textContent = task.title;
//             const deleteBtn = document.createElement('button');
//             deleteBtn.textContent = 'Elimina';
//             deleteBtn.className = 'delete-btn';
//             const completeBtn = document.createElement('button');
//             completeBtn.textContent = 'Completa';
//             completeBtn.className = 'complete-btn';
//             li.appendChild(completeBtn);
//             li.appendChild(deleteBtn);
//             taskList.appendChild(li);
//         });
//     } catch (error) {
//         console.error('Errore nel caricamento dei task:', error);
//     }
// }

// // Aggiungi task al clic del bottone
// addTaskButton.addEventListener('click', addTask);

// // Aggiungi task con Invio
// taskInput.addEventListener('keypress', function(event) {
//     if (event.key === 'Enter') {
//         addTask();
//     }
// });

// taskList.addEventListener('click', function(event) {
//     if (event.target.className === 'delete-btn') {
//         event.target.parentElement.remove();
//     } else if (event.target.className === 'complete-btn') {
//         const li = event.target.parentElement;
//         li.classList.toggle('completed'); // Alterna la classe per barratura
//     }
// });

// // Aggiungi evento per il toggle
// document.getElementById('toggleCompleted').addEventListener('click', function() {
//     showCompletedOnly = !showCompletedOnly;
//     currentPage = 1; // Resetta la pagina quando cambi filtro
//     loadTasks(currentPage);
// });

// document.getElementById('nextPage').addEventListener('click', () => {
//     currentPage++;
//     loadTasks(currentPage);
// });

// window.addEventListener('load', () => loadTasks(currentPage));

// Seleziona elementi DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
let showCompletedOnly = false;
let currentPage = 1;
const tasksPerPage = 5;

// Funzione per aggiungere un task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Elimina';
        deleteBtn.className = 'delete-btn';
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completa';
        completeBtn.className = 'complete-btn';
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

// Funzione per caricare task con paginazione e filtro
async function loadTasks(page = 1) {
    try {
        const start = (page - 1) * tasksPerPage;
        const url = showCompletedOnly
            ? `https://jsonplaceholder.typicode.com/todos?completed=true&_start=${start}&_limit=${tasksPerPage}`
            : `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${tasksPerPage}`;
        const response = await fetch(url);
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            if (showCompletedOnly && task.completed) {
                li.classList.add('completed'); // Solo se filtro attivo e task completato
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Elimina';
            deleteBtn.className = 'delete-btn';
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Completa';
            completeBtn.className = 'complete-btn';
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Errore nel caricamento dei task:', error);
    }
}

// Aggiungi task al clic del bottone
addTaskButton.addEventListener('click', addTask);

// Aggiungi task con Invio
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskList.addEventListener('click', function(event) {
    if (event.target.className === 'delete-btn') {
        event.target.parentElement.remove();
    } else if (event.target.className === 'complete-btn') {
        const li = event.target.parentElement;
        li.classList.toggle('completed');
    }
});

// Aggiungi evento per il toggle
document.getElementById('toggleCompleted').addEventListener('click', function() {
    showCompletedOnly = !showCompletedOnly;
    currentPage = 1; // Resetta la pagina quando cambi filtro
    loadTasks(currentPage);
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    loadTasks(currentPage);
});

window.addEventListener('load', () => loadTasks(currentPage));
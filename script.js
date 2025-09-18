// Seleziona elementi DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Funzione per aggiungere un task
function addTask() {
    const taskText = taskInput.value.trim(); // Prende il testo e rimuove spazi
    if (taskText !== '') {
        // Crea un nuovo elemento li
        const li = document.createElement('li');
        li.textContent = taskText;

        // Crea bottone di eliminazione
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Elimina';
        deleteBtn.className = 'delete-btn';

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completa';
        completeBtn.className = 'complete-btn';

        // Aggiungi bottone al li
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = ''; // Svuota l'input
    }
}

async function loadTasks() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const tasks = await response.json();
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
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
        li.classList.toggle('completed'); // Alterna la classe per barratura
    }
});

window.addEventListener('load', loadTasks);
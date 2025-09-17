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

        // Aggiungi bottone al li
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = ''; // Svuota l'input
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
    }
});
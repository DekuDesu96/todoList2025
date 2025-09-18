// Seleziona elementi DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
let showCompletedOnly = false;
let currentPage = 1;
const tasksPerPage = 5;
let allTasks = [];

// Funzione per aggiungere un task via POST
async function addTaskToAPI(taskText) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: taskText,
                completed: false,
                userId: 1,
            }),
        });
        const newTask = await response.json();
        const li = document.createElement('li');
        li.textContent = newTask.title;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Elimina';
        deleteBtn.className = 'delete-btn';
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completa';
        completeBtn.className = 'complete-btn';
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        updateTaskDisplay();
    } catch (error) {
        console.error('Errore nell\'aggiunta del task:', error);
    }
}

// Funzione per aggiungere un task (manuale o via API)
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToAPI(taskText); // Usa POST per aggiungere
        taskInput.value = '';
    }
}

// Funzione per caricare tutti i task dall'API
async function loadAllTasks() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        allTasks = await response.json();
        loadTasks(currentPage);
    } catch (error) {
        console.error('Errore:', error);
    }
}

// Funzione per caricare task per pagina
function loadTasks(page = 1) {
    taskList.innerHTML = '';
    const start = (page - 1) * tasksPerPage;
    const end = start + tasksPerPage;
    const pageTasks = allTasks.slice(start, end);
    pageTasks.forEach(task => {
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
    updateTaskDisplay();
}

// Funzione per aggiornare la visualizzazione con filtro
function updateTaskDisplay() {
    const allTasks = taskList.getElementsByTagName('li');
    Array.from(allTasks).forEach(li => {
        if (showCompletedOnly) {
            li.style.display = li.classList.contains('completed') ? 'flex' : 'none';
        } else {
            li.style.display = 'flex';
        }
    });
}

// Funzione per aggiornare il completamento via PATCH
async function updateTaskCompletion(taskId, completed) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: completed }),
        });
        const updatedTask = await response.json();
        console.log('Task aggiornato:', updatedTask);
    } catch (error) {
        console.error('Errore nell\'aggiornamento:', error);
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
        updateTaskDisplay();
    } else if (event.target.className === 'complete-btn') {
        const li = event.target.parentElement;
        const isCompleted = li.classList.toggle('completed');
        updateTaskCompletion(1, isCompleted); // Placeholder ID
        updateTaskDisplay();
    }
});

// Aggiungi evento per il toggle
document.getElementById('toggleCompleted').addEventListener('click', function() {
    showCompletedOnly = !showCompletedOnly;
    updateTaskDisplay();
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    loadTasks(currentPage);
});

window.addEventListener('load', loadAllTasks);
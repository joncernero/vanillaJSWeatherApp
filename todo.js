const todoDisplay = document.querySelector('.todoDisplay');
const todoList = document.querySelector('.todoList');
const todoInput = document.querySelector('.todoInput');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(e) {
  e.preventDefault();
  const text = this.querySelector('[name=todo]').value;
  const task = {
    text,
    done: false,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateTasks(tasks, todoList);
  this.reset();
}

function populateTasks(tasks = [], todoList) {
  todoList.innerHTML = tasks
    .map((task, i) => {
      return `
            <li>
                <p>${task.text}</p>
                <button type="click" name="complete" data-index=${i}>X</button>
            </li>
        `;
    })
    .join('');
}

function removeTask(e) {
  if (!e.target.matches('button')) return;
  const elementIndex = e.target.dataset.index;
  tasks.splice(elementIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateTasks(tasks, todoList);
}

todoInput.addEventListener('submit', addTask);
todoList.addEventListener('click', removeTask);
populateTasks(tasks, todoList);

document.addEventListener("DOMContentLoaded", function () {

  const taskNameInput = document.getElementById("taskName");
  const taskLabelInput = document.getElementById("taskLabel");
  const addTaskBtn = document.getElementById("btnAddTask");
  const todoList = document.getElementById("todo-list");
  const taskCounter = document.getElementById("task-counter");

  
  let tasks = [];
  let completedTasks = 0;

  // Inicio 
  initTasks();
  renderTasks();
  updateTaskCounter();

  // Função para iniciar tarefas
  function initTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    } else {
      tasks = [
        {
          id: 1,
          name: "Implementar tela de listagem de tarefas",
          label: "frontend",
          createdAt: new Date("2024-08-21").toLocaleDateString("pt-BR"),
          completed: false,
        },
        {
          id: 2,
          name: "Criar endpoint para cadastro de tarefas",
          label: "backend",
          createdAt: new Date("2024-08-21").toLocaleDateString("pt-BR"),
          completed: false,
        },
        {
          id: 3,
          name: "Implementar protótipo da listagem de tarefas",
          label: "ux",
          createdAt: new Date("2024-08-21").toLocaleDateString("pt-BR"),
          completed: true,
        },
      ];
      // Salva as tarefas iniciais no localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    completedTasks = tasks.filter((task) => task.completed).length;
  }

  addTaskBtn.addEventListener("click", addTask);

  // Função para adicionar tarefa
  function addTask() {
    const name = taskNameInput.value.trim();
    const label = taskLabelInput.value.trim();

    if (!name || !label) {
      alert("Adicione nome e etiqueta da sua tarefa");
      return;
    }

    const newTask = {
      id: Date.now(),
      name,
      label,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();

    taskNameInput.value = "";
    taskLabelInput.value = "";

    renderTasks();
  }

  // Função para completar tarefa
  function completeTask(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].completed = true;
      completedTasks = tasks.filter((task) => task.completed).length;
      saveTasks();
      renderTasks();
      updateTaskCounter();
    }
  }

  // Função para renderizar tarefas
  function renderTasks() {
    todoList.innerHTML = "";

    if (tasks.length === 0) {
      todoList.innerHTML =
        '<p style="text-align: center; color: #B1BACB;">Nenhuma tarefa cadastrada</p>';
      return;
    }

    tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.className = "tasks-div";
      taskElement.dataset.id = task.id;

      taskElement.innerHTML = `
                <div>
                    <h2 class="task-name ${
                      task.completed ? "completed" : ""
                    }">${task.name}</h2>
                    <div class="tasks-info">
                        <div class="layout-label">
                            <h3 class="task-label">${task.label}</h3>
                        </div>
                        <h4 class="task-date">Criado em: ${task.createdAt}</h4>
                    </div>
                </div>
                <div>
                    ${
                      task.completed
                        ? '<div id="btn-checked"><img src="assets/Checked.svg" alt="Tarefa Concluída"></div>'
                        : `<button class="btn-complete" data-id="${task.id}">Concluir</button>`
                    }
                </div>
            `;

      todoList.appendChild(taskElement);
    });

    // Adiciona event listeners aos botões de concluir
    document.querySelectorAll(".btn-complete").forEach((btn) => {
      btn.addEventListener("click", function () {
        completeTask(parseInt(this.dataset.id));
      });
    });
  }

  // Função para atualizar contador
  function updateTaskCounter() {
    const count = tasks.filter((task) => task.completed).length;
    taskCounter.textContent = `${count} tarefa${
      count !== 1 ? "s" : ""
    } concluída${count !== 1 ? "s" : ""}`;
  }

  // Funções para LocalStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      // Tarefas iniciais se não houver dados salvos
      return [
        {
          id: 1,
          name: "Implementar tela de listagem de tarefas",
          label: "frontend",
          createdAt: "21/08/2024",
          completed: false,
        },
        {
          id: 2,
          name: "Criar endpoint para cadastro de tarefas",
          label: "backend",
          createdAt: "21/08/2024",
          completed: false,
        },
        {
          id: 3,
          name: "Implementar protótipo da listagem de tarefas",
          label: "ux",
          createdAt: "21/08/2024",
          completed: true,
        },
      ];
    }
  }
});

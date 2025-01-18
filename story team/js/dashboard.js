



let projects = JSON.parse(localStorage.getItem("projects")) || [
  {
    id: 1,
    title: "Project 1",
    description: "Description for project 1",
    tasks: [
      { id: 1, title: "Task 1", status: "To-Do", dueDate: "2025-01-20" },
      { id: 2, title: "Task 2", status: "In Progress", dueDate: "2025-01-18" }
    ]
  }
];

// story-Save to Local Storage
function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function displayWelcomeMessage() {
  const username = localStorage.getItem("username"); 
  const greeting = document.getElementById("greeting");



  if (username) {
    greeting.textContent = ` Welcome, ${username}! Ready to manage your projects?`;
  } else {
    greeting.textContent = "Welcome! Please log in to manage your projects.";
  }
}


window.onload = () => {
  displayWelcomeMessage();
  renderProjects(); 
};


function logout() {
  localStorage.removeItem("username"); 
  window.location.href = "index.html"; 
}

document.getElementById("logout-btn").addEventListener("click", logout);
// story-Filter Tasks
function filterTasks() {
  const filterValue = document.getElementById("status-filter").value;
  const dateValue = document.getElementById("date-filter").value;
  const sortOrder = document.getElementById("sort-order").value;
  const searchBarValue = document.getElementById("search-bar").value.toLowerCase();

  renderProjects(filterValue, dateValue, sortOrder, searchBarValue);
}

// story-Render Projects and Tasks
function renderProjects(filterValue = "All", dateValue = "", sortOrder = "asc", searchBarValue = "") {
  const app = document.getElementById("app");
  app.innerHTML = "";

  projects.forEach((project) => {
    const sortedTasks = [...project.tasks].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    const filteredTasks = sortedTasks.filter((task) => {
      const matchesFilter = filterValue === "All" || task.status === filterValue;
      const matchesDate = !dateValue || task.dueDate === dateValue;
      const matchesSearch = task.title.toLowerCase().includes(searchBarValue);

      return matchesFilter && matchesDate && matchesSearch;
    });

    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    const progressBar = calculateProgress(project.tasks);

    projectDiv.innerHTML = `
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <div>Progress: ${progressBar}%</div><br>
      <button onclick="deleteProject(${project.id})" style="color: white ;">Delete Project</button>

      <div>
        <h3>Tasks:</h3>
        ${filteredTasks
          .map(
            (task) => `
            <div class="task ${task.status === "Completed" ? "completed" : ""}">
              <h4>${task.title}</h4>
              <p>Status: ${task.status}</p>
              <p>Due Date: ${task.dueDate}</p>
              <button onclick="editTask(${project.id}, ${task.id})">Edit</button>
              <button onclick="deleteTask(${project.id}, ${task.id})">Delete</button>
              <button onclick="changeTaskStatus(${project.id}, ${task.id})">Change Status</button>
            </div>
          `
          )
          .join("")}
      </div>
      <button onclick="addTask(${project.id})">Add Task</button>
    `;

    app.appendChild(projectDiv);
  });
}

// story-Add Project
function addProject() {
  const projectTitle = prompt("Enter Project Title:");
  const projectDescription = prompt("Enter Project Description:");

  if (projectTitle && projectDescription) {
    projects.push({
      id: projects.length + 1, // array projects 5 + 1 = 6
      title: projectTitle,
      description: projectDescription,
      tasks: []
    });

    saveToLocalStorage();
    renderProjects();
  }
}

// story-Add Task
function addTask(projectId) {
  const taskTitle = prompt("Enter Task Title:");
  const taskDueDate = prompt("Enter Due Date (YYYY-MM-DD):");

  if (taskTitle && taskDueDate) {
    const project = projects.find((p) => p.id === projectId);
    project.tasks.push({
      id: project.tasks.length + 1,
      title: taskTitle,
      status: "To-Do",
      dueDate: taskDueDate
    });

    saveToLocalStorage();
    renderProjects();
  }
}

// story-Edit Task
function editTask(projectId, taskId) {
  const project = projects.find((p) => p.id === projectId);
  const task = project.tasks.find((t) => t.id === taskId);

  const newTitle = prompt("Enter new task title:", task.title);
  const newDueDate = prompt("Enter new due date (YYYY-MM-DD):", task.dueDate);

  if (newTitle && newDueDate) {
    task.title = newTitle;
    task.dueDate = newDueDate;

    saveToLocalStorage();
    renderProjects();
  }
}

// story-Delete Task
function deleteTask(projectId, taskId) {
  const project = projects.find((p) => p.id === projectId);
  project.tasks = project.tasks.filter((t) => t.id !== taskId);

  saveToLocalStorage();
  renderProjects();
}

// story-Delete Project
function deleteProject(projectId) {
  const confirmation = confirm("Are you sure you want to delete this project?");
  if (confirmation) {
    projects = projects.filter((project) => project.id !== projectId);
    saveToLocalStorage();
    renderProjects();
  }
}

// story-Change Task Status
function changeTaskStatus(projectId, taskId) {
  const project = projects.find((p) => p.id === projectId);
  const task = project.tasks.find((t) => t.id === taskId);

  const statusOptions = ["To-Do", "In Progress", "Completed"];
  const currentIndex = statusOptions.indexOf(task.status);
  const newIndex = (currentIndex + 1) % statusOptions.length;

  task.status = statusOptions[newIndex];

  saveToLocalStorage();
  renderProjects();
}

// story-Calculate Progress
function calculateProgress(tasks) {
  if (!tasks.length) return 0;
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  return Math.floor((completedTasks.length / tasks.length) * 100);
}

// story-Initialize
renderProjects();











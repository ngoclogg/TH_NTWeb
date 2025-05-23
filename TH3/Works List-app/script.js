const showFormBtn = document.getElementById('show-add-form-btn');
const addTaskForm = document.getElementById('add-task-form');
const submitTaskBtn = document.getElementById('submit-task-btn');
const cancelTaskBtn = document.getElementById('cancel-task-btn');

const taskList = document.getElementById('task-list');

const inputDesc = document.getElementById('task-desc');
const inputDate = document.getElementById('task-date');
const selectPriority = document.getElementById('task-priority');
const selectProject = document.getElementById('task-project');

let tasks = [];

// === Thêm vào đây: Hàm lưu và tải từ localStorage ===
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    tasks = JSON.parse(stored);
  }
}
// ================================================

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = createTaskItem(task, index);
    taskList.appendChild(li);
  });
}

function createTaskItem(task, index) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center flex-wrap';

  // Trạng thái hoàn thành
  const statusBtn = document.createElement('button');
  statusBtn.type = 'button';
  statusBtn.className = 'btn btn-sm me-3';
  statusBtn.style.minWidth = '40px';
  statusBtn.style.height = '40px';
  statusBtn.style.fontSize = '1.2rem';
  statusBtn.style.padding = '0';

  const updateStatusIcon = () => {
    if (task.isDone === true) {
      statusBtn.textContent = '✅';
      statusBtn.classList.remove('btn-outline-secondary', 'btn-outline-danger');
      statusBtn.classList.add('btn-outline-success');
    } else if (task.isDone === false) {
      statusBtn.textContent = '❌';
      statusBtn.classList.remove('btn-outline-success', 'btn-outline-secondary');
      statusBtn.classList.add('btn-outline-danger');
    } else {
      statusBtn.textContent = '🔲';
      statusBtn.classList.remove('btn-outline-success', 'btn-outline-danger');
      statusBtn.classList.add('btn-outline-secondary');
    }
  };

  updateStatusIcon();

  statusBtn.addEventListener('click', () => {
    const confirmed = confirm("Bạn đã hoàn thành công việc này chưa, bro?");
    task.isDone = confirmed ? true : false;
    saveTasksToLocalStorage(); // ✅ Lưu thay đổi trạng thái
    renderTasks();
  });

  li.appendChild(statusBtn);

  const contentDiv = document.createElement('div');
  contentDiv.style.flexGrow = '1';
  contentDiv.style.minWidth = '200px';

  contentDiv.innerHTML = `
    <strong style="${task.isDone === true ? 'text-decoration: line-through; color: #999;' : ''}">${task.text}</strong><br>
    <small>${task.date ? new Date(task.date).toLocaleString() : 'Không có thời gian'}</small><br>
    <small>Độ gấp: ${task.priority}</small><br>
    <small>Chủ đề: ${task.project}</small>
  `;
  li.appendChild(contentDiv);

  const btnGroup = document.createElement('div');
  btnGroup.style.display = 'flex';
  btnGroup.style.gap = '8px';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-sm btn-outline-primary';
  editBtn.type = 'button';
  editBtn.textContent = '✏️ Sửa';
  btnGroup.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-sm btn-outline-danger';
  deleteBtn.type = 'button';
  deleteBtn.textContent = '🗑️ Xóa';
  btnGroup.appendChild(deleteBtn);

  li.appendChild(btnGroup);

  // Sửa công việc
  editBtn.addEventListener('click', () => {
    li.innerHTML = '';

    const editDesc = document.createElement('input');
    editDesc.type = 'text';
    editDesc.className = 'form-control mb-2';
    editDesc.value = task.text;

    const editDate = document.createElement('input');
    editDate.type = 'datetime-local';
    editDate.className = 'form-control mb-2';
    if (task.date) {
      editDate.value = task.date.slice(0, 16);
    }

    const editPriority = document.createElement('select');
    editPriority.className = 'form-select mb-2';
    ['🔥 Quan trọng (Gấp)', '❄️ Quan trọng (Thư thả)', '🌊 Không quan trọng (Gấp)', '⛱️ Không quan trọng (Thư thả)'].forEach(p => {
      const option = document.createElement('option');
      option.value = p;
      option.textContent = p;
      if (task.priority === p) option.selected = true;
      editPriority.appendChild(option);
    });

    const editProject = document.createElement('select');
    editProject.className = 'form-select mb-2';
    ['🏢 THE OFFICE', '🚀 DAILY', '🎯 FUTURE', '📚 WORDS', '🎵 MUSIC'].forEach(prj => {
      const option = document.createElement('option');
      option.value = prj;
      option.textContent = prj;
      if (task.project === prj) option.selected = true;
      editProject.appendChild(option);
    });

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-sm btn-success me-2';
    saveBtn.textContent = '💾 Lưu';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-sm btn-secondary';
    cancelBtn.textContent = '✖️ Hủy';

    li.appendChild(editDesc);
    li.appendChild(editDate);
    li.appendChild(editPriority);
    li.appendChild(editProject);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);

    saveBtn.addEventListener('click', () => {
      const newText = editDesc.value.trim();
      const newDate = editDate.value;
      const newPriority = editPriority.value;
      const newProject = editProject.value;

      if (!newText) {
        alert('Nội dung công việc không được để trống!');
        return;
      }

      tasks[index] = {
        ...tasks[index],
        text: newText,
        date: newDate,
        priority: newPriority,
        project: newProject,
      };
      saveTasksToLocalStorage(); // ✅ Lưu sau khi sửa
      renderTasks();
    });

    cancelBtn.addEventListener('click', () => {
      renderTasks();
    });
  });

  // Xóa công việc
  deleteBtn.addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn xóa công việc này?')) {
      tasks.splice(index, 1);
      saveTasksToLocalStorage(); // ✅ Lưu sau khi xóa
      renderTasks();
    }
  });

  return li;
}

showFormBtn.addEventListener('click', () => {
  addTaskForm.style.display = addTaskForm.style.display === 'none' ? 'block' : 'none';
});

cancelTaskBtn.addEventListener('click', () => {
  addTaskForm.style.display = 'none';
  clearForm();
});

submitTaskBtn.addEventListener('click', () => {
  const text = inputDesc.value.trim();
  const date = inputDate.value;
  const priority = selectPriority.value;
  const project = selectProject.value;

  if (!text) {
    alert('Vui lòng nhập nội dung công việc!');
    return;
  }

  tasks.push({
    text,
    date,
    priority,
    project,
    isDone: null // Trạng thái ban đầu là chưa xác định
  });

  saveTasksToLocalStorage(); // ✅ Lưu sau khi thêm
  renderTasks();
  clearForm();
  addTaskForm.style.display = 'none';
});

function clearForm() {
  inputDesc.value = '';
  inputDate.value = '';
  selectPriority.value = '🔥';
  selectProject.value = '🏢 THE OFFICE';
}

// === Bộ lọc công việc ===
const sidebarLinks = document.querySelectorAll('.nav-link');

sidebarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filterText = link.textContent.trim();

    let filteredTasks = [];

    if (filterText.includes('Hôm nay')) {
      const today = new Date().toISOString().slice(0, 10);
      filteredTasks = tasks.filter(task => task.date && task.date.startsWith(today));
    } else if (filterText.includes('Tuần này')) {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Chủ nhật
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Thứ bảy

      filteredTasks = tasks.filter(task => {
        if (!task.date) return false;
        const taskDate = new Date(task.date);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
      });
    } else if (
      filterText.includes('🔥') ||
      filterText.includes('❄️') ||
      filterText.includes('🌊') ||
      filterText.includes('⛱️')
    ) {
      filteredTasks = tasks.filter(task => task.priority === filterText);
    } else if (
      filterText.includes('🏢') ||
      filterText.includes('🚀') ||
      filterText.includes('🎯') ||
      filterText.includes('📚') ||
      filterText.includes('🎵')
    ) {
      filteredTasks = tasks.filter(task => task.project === filterText);
    } else {
      filteredTasks = tasks;
    }

    renderFilteredTasks(filteredTasks);
  });

  document.getElementById('filter-all').addEventListener('click', (e) => {
  e.preventDefault();
  currentFilter = 'all-status';
  renderTasks(); // render tất cả
});

document.getElementById('filter-undone').addEventListener('click', (e) => {
  e.preventDefault();
  currentFilter = 'undone';
  const filtered = tasks.filter(task => task.isDone !== true);
  renderFilteredTasks(filtered);
});

document.getElementById('filter-done').addEventListener('click', (e) => {
  e.preventDefault();
  currentFilter = 'done';
  const filtered = tasks.filter(task => task.isDone === true);
  renderFilteredTasks(filtered);
});

});

// Hiển thị công việc đã lọc
function renderFilteredTasks(filteredList) {
  taskList.innerHTML = '';
  filteredList.forEach((task, index) => {
    const li = createTaskItem(task, index);
    taskList.appendChild(li);
  });
}


// === Tải dữ liệu khi load trang ===
loadTasksFromLocalStorage();
renderTasks();


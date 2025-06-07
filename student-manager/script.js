// Lấy các phần tử từ DOM
const fullNameInput = document.getElementById("fullName");
const classNameInput = document.getElementById("className");
const errorFullName = document.getElementById("errorFullName");
const errorClassName = document.getElementById("errorClassName");
const notification = document.getElementById("notification");

const btnAdd = document.getElementById("btnAdd");
const btnUpdate = document.getElementById("btnUpdate");
const btnCancel = document.getElementById("btnCancel");

let editId = null; // Để lưu id đang chỉnh sửa

// Hàm hiển thị thông báo
function showNotification(message) {
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}

// Hàm kiểm tra dữ liệu đầu vào
function validateForm() {
  let isValid = true;
  const fullName = fullNameInput.value.trim();
  const className = classNameInput.value.trim();

  if (fullName === "") {
    errorFullName.textContent = "Họ tên không được để trống";
    errorFullName.style.display = "block";
    isValid = false;
  } else if (fullName.length > 50) {
    errorFullName.textContent = "Họ tên không quá 50 ký tự";
    errorFullName.style.display = "block";
    isValid = false;
  } else {
    errorFullName.style.display = "none";
  }

  if (className === "") {
    errorClassName.textContent = "Lớp không được để trống";
    errorClassName.style.display = "block";
    isValid = false;
  } else {
    errorClassName.style.display = "none";
  }

  return isValid;
}

// Xử lý thêm học sinh mới
btnAdd.addEventListener("click", () => {
  if (validateForm()) {
    const fullName = fullNameInput.value.trim();
    const className = classNameInput.value.trim();

    const table = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    const newId = table.rows.length;

    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${fullName}</td>
      <td>${className}</td>
      <td>
        <button class="btn-edit" data-id="${newId}">Sửa</button>
        <button class="btn-delete">Xóa</button>
      </td>
    `;

    // Gắn lại sự kiện cho dòng mới
    newRow.querySelector(".btn-edit").addEventListener("click", handleEdit);
    newRow.querySelector(".btn-delete").addEventListener("click", handleDelete);

    showNotification("Thêm Học sinh thành công!");
    fullNameInput.value = "";
    classNameInput.value = "";
  }
});

// Hàm xử lý nút "Sửa"
function handleEdit(event) {
  const btn = event.target;
  const row = btn.closest("tr");

  editId = btn.dataset.id;

  fullNameInput.value = row.children[1].textContent;
  classNameInput.value = row.children[2].textContent;

  btnAdd.style.display = "none";
  btnUpdate.style.display = "inline-block";
  btnCancel.style.display = "inline-block";

  btnUpdate.currentRow = row;
}

// Hàm xử lý nút "Cập nhật"
btnUpdate.addEventListener("click", () => {
  if (validateForm()) {
    const fullName = fullNameInput.value.trim();
    const className = classNameInput.value.trim();

    const row = btnUpdate.currentRow;
    row.children[1].textContent = fullName;
    row.children[2].textContent = className;

    showNotification("Chỉnh sửa thành công!");

    fullNameInput.value = "";
    classNameInput.value = "";

    btnAdd.style.display = "inline-block";
    btnUpdate.style.display = "none";
    btnCancel.style.display = "none";
  }
});

// Hàm xử lý nút "Hủy"
btnCancel.addEventListener("click", () => {
  fullNameInput.value = "";
  classNameInput.value = "";
  errorFullName.style.display = "none";
  errorClassName.style.display = "none";

  btnAdd.style.display = "inline-block";
  btnUpdate.style.display = "none";
  btnCancel.style.display = "none";
});

// Hàm xử lý nút "Xóa"
function handleDelete(event) {
  const row = event.target.closest("tr");
  if (confirm("Bạn có chắc muốn xóa học sinh này?")) {
    row.remove();
    showNotification("Xóa thành công!");
  }
}

// Gắn sự kiện cho các nút Sửa/Xóa mặc định
document.querySelectorAll(".btn-edit").forEach(btn => {
  btn.addEventListener("click", handleEdit);
});
document.querySelectorAll(".btn-delete").forEach(btn => {
  btn.addEventListener("click", handleDelete);
});

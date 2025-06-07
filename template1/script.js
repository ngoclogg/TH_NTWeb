let danhSachNhanSu = [
    { hoTen: "Nguyễn Văn A", email: "vana@gmail.com", sdt: "0909123456", gioiTinh: "Nam", chucVu: "Giám đốc" },
    { hoTen: "Trần Thị B", email: "tranb@gmail.com", sdt: "0912345678", gioiTinh: "Nữ", chucVu: "Quản lý" },
    { hoTen: "Lê Hoàng C", email: "lehoangc@gmail.com", sdt: "0987654321", gioiTinh: "Nam", chucVu: "Nhân viên" },
    { hoTen: "Phạm Quỳnh D", email: "phamd@gmail.com", sdt: "0911222333", gioiTinh: "Nữ", chucVu: "Nhân viên" },
    { hoTen: "Võ Thanh E", email: "vothanhe@gmail.com", sdt: "0909000111", gioiTinh: "Nam", chucVu: "Quản lý" },
    { hoTen: "Đỗ Mỹ F", email: "domyf@gmail.com", sdt: "0977665544", gioiTinh: "Nữ", chucVu: "Nhân viên" },
    { hoTen: "Ngô Kiến G", email: "ngokieng@gmail.com", sdt: "0966887788", gioiTinh: "Nam", chucVu: "Nhân viên" },
    { hoTen: "Hồ Phương H", email: "hophuongh@gmail.com", sdt: "0922334455", gioiTinh: "Nữ", chucVu: "Quản lý" },
    { hoTen: "Bùi Anh I", email: "buianhi@gmail.com", sdt: "0933555777", gioiTinh: "Nam", chucVu: "Nhân viên" },
    { hoTen: "Dương Ngọc J", email: "duongj@gmail.com", sdt: "0944666888", gioiTinh: "Nữ", chucVu: "Giám đốc" },
    { hoTen: "Trịnh Công K", email: "trinhk@gmail.com", sdt: "0933999888", gioiTinh: "Nam", chucVu: "Nhân viên" },
    { hoTen: "Mai Thị L", email: "mail@gmail.com", sdt: "0909111222", gioiTinh: "Nữ", chucVu: "Nhân viên" }
  ];
  
  let currentPage = 1;
  const itemsPerPage = 10;
  
  function renderBang() {
    const tbody = document.getElementById("nhanSuTable");
    tbody.innerHTML = "";
  
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const dsPhanTrang = danhSachNhanSu.slice(start, end);
  
    dsPhanTrang.forEach((ns, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${start + index + 1}</td>
          <td>${ns.hoTen}</td>
          <td>${ns.email}</td>
          <td>${ns.sdt}</td>
          <td>${ns.gioiTinh}</td>
          <td>${ns.chucVu}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1" onclick="suaNhanSu(${start + index})">Sửa</button>
            <button class="btn btn-danger btn-sm" onclick="xoaNhanSu(${start + index})">Xóa</button>
          </td>
        </tr>
      `;
    });
  
    renderPhanTrang();
  }
  
  function renderPhanTrang() {
    const totalPages = Math.ceil(danhSachNhanSu.length / itemsPerPage);
    let html = "";
  
    html += `<button class="btn btn-sm btn-outline-success me-1" ${currentPage === 1 ? "disabled" : ""} onclick="chuyenTrang(currentPage - 1)">◀️</button>`;
  
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="btn btn-sm ${currentPage === i ? 'btn-success' : 'btn-outline-success'} me-1" onclick="chuyenTrang(${i})">${i}</button>`;
    }
  
    html += `<button class="btn btn-sm btn-outline-success" ${currentPage === totalPages ? "disabled" : ""} onclick="chuyenTrang(currentPage + 1)">▶️</button>`;
  
    document.getElementById("phanTrang").innerHTML = html;
  }
  
  function chuyenTrang(trang) {
    currentPage = trang;
    renderBang();
  }
  
  function luuNhanSu(event) {
    event.preventDefault();
    const hoTen = document.getElementById("hoTen").value;
    const email = document.getElementById("email").value;
    const sdt = document.getElementById("sdt").value;
    const gioiTinh = document.querySelector('input[name="gioiTinh"]:checked').value;
    const chucVu = document.getElementById("chucVu").value;
    const editIndex = document.getElementById("editIndex").value;
  
    const nhanSu = { hoTen, email, sdt, gioiTinh, chucVu };
  
    if (editIndex === "") {
      danhSachNhanSu.push(nhanSu);
    } else {
      danhSachNhanSu[editIndex] = nhanSu;
    }
  
    renderBang();
    document.getElementById("nhanSuForm").reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("modalTitle").textContent = "Thêm nhân sự";
    bootstrap.Modal.getInstance(document.getElementById("themModal")).hide();
  }
  
  function suaNhanSu(index) {
    const ns = danhSachNhanSu[index];
    document.getElementById("hoTen").value = ns.hoTen;
    document.getElementById("email").value = ns.email;
    document.getElementById("sdt").value = ns.sdt;
    document.getElementById(ns.gioiTinh.toLowerCase()).checked = true;
    document.getElementById("chucVu").value = ns.chucVu;
    document.getElementById("editIndex").value = index;
    document.getElementById("modalTitle").textContent = "Sửa nhân sự";
    new bootstrap.Modal(document.getElementById("themModal")).show();
  }
  
  function xoaNhanSu(index) {
    if (confirm("Bạn có chắc muốn xóa nhân sự này không?")) {
      danhSachNhanSu.splice(index, 1);
      renderBang();
    }
  }
  
  function resetForm() {
    document.getElementById("nhanSuForm").reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("modalTitle").textContent = "Thêm nhân sự";
  }
  
  renderBang();
  
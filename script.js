document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  const mobileMenu = document.querySelector(".mobile-menu");
  const sidebar = document.querySelector(".sidebar");
  if (mobileMenu && sidebar) {
    mobileMenu.addEventListener("click", () => sidebar.classList.toggle("open"));
  }

  document.querySelectorAll(".toggle-pass").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
      btn.textContent = input.type === "password" ? "👁" : "🙈";
    });
  });

  document.querySelectorAll("[data-search]").forEach(input => {
    input.addEventListener("input", () => {
      document.querySelectorAll(input.dataset.search).forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(input.value.toLowerCase()) ? "" : "none";
      });
    });
  });

  const registrationForm = document.querySelector("[data-registration]");
  if (registrationForm) {
    registrationForm.addEventListener("submit", event => {
      event.preventDefault();

      const type = registrationForm.dataset.registration;
      const keys = {
        doctor: "yhms_doctors",
        nurse: "yhms_nurses",
        patient: "yhms_patients"
      };
      const targets = {
        doctor: "doctors.html",
        nurse: "nurses.html",
        patient: "patients.html"
      };

      const data = Object.fromEntries(new FormData(registrationForm).entries());
      data.id = Date.now().toString();

      const records = JSON.parse(localStorage.getItem(keys[type]) || "[]");
      records.push(data);
      localStorage.setItem(keys[type], JSON.stringify(records));

      const message = document.querySelector(".form-message");
      if (message) {
        message.classList.remove("hidden");
        message.textContent = "معلومات با موفقیت ثبت شد. در حال انتقال به فهرست...";
      }

      setTimeout(() => window.location.href = targets[type], 700);
    });
  }

  renderStoredRecords("doctor", "doctors");
  renderStoredRecords("nurse", "staff");
  renderStoredRecords("patient", "patients");
});

function renderStoredRecords(type, tableId) {
  const table = document.getElementById(tableId);
  if (!table || !table.tBodies[0]) return;

  const keys = {
    doctor: "yhms_doctors",
    nurse: "yhms_nurses",
    patient: "yhms_patients"
  };

  let records = [];
  try {
    records = JSON.parse(localStorage.getItem(keys[type]) || "[]");
  } catch {
    records = [];
  }

  records.forEach(record => {
    const row = document.createElement("tr");

    if (type === "doctor") {
      row.innerHTML = `
        <td>${safe(record.name)}</td>
        <td>${safe(record.specialty)}</td>
        <td>${safe(record.phone)}</td>
        <td><span class="badge badge-success">${safe(record.status || "فعال")}</span></td>
        <td><div class="actions"><button class="btn btn-danger btn-sm" data-remove="${safe(record.id)}" data-type="doctor">حذف</button></div></td>`;
    }

    if (type === "nurse") {
      row.innerHTML = `
        <td>${safe(record.name)}</td>
        <td>نرس</td>
        <td>${safe(record.phone)}</td>
        <td><span class="badge badge-success">${safe(record.status || "فعال")}</span></td>
        <td><div class="actions"><button class="btn btn-danger btn-sm" data-remove="${safe(record.id)}" data-type="nurse">حذف</button></div></td>`;
    }

    if (type === "patient") {
      row.innerHTML = `
        <td>${safe(record.name)}</td>
        <td>${safe(record.age)}</td>
        <td>${safe(record.blood)}</td>
        <td>${safe(record.phone)}</td>
        <td><div class="actions"><a class="btn btn-primary btn-sm" href="medical_records.html">پرونده</a><button class="btn btn-danger btn-sm" data-remove="${safe(record.id)}" data-type="patient">حذف</button></div></td>`;
    }

    table.tBodies[0].appendChild(row);
  });

  table.addEventListener("click", event => {
    const button = event.target.closest("[data-remove]");
    if (!button) return;

    if (!confirm("این ثبت حذف شود؟")) return;

    const records = JSON.parse(localStorage.getItem(keys[button.dataset.type]) || "[]")
      .filter(item => item.id !== button.dataset.remove);

    localStorage.setItem(keys[button.dataset.type], JSON.stringify(records));
    button.closest("tr")?.remove();
  });
}

function safe(value) {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  return div.innerHTML;
}

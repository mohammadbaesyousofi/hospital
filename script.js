
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
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
      btn.textContent = input.type === "password" ? "نمایش" : "پنهان";
    });
  });

  document.querySelectorAll("[data-search]").forEach(input => {
    const selector = input.dataset.search;
    const rows = document.querySelectorAll(selector);
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
  });

  document.querySelectorAll("[data-filter]").forEach(select => {
    const selector = select.dataset.filter;
    const rows = document.querySelectorAll(selector);
    select.addEventListener("change", () => {
      const value = select.value;
      rows.forEach(row => {
        row.style.display = !value || row.dataset.status === value ? "" : "none";
      });
    });
  });

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const message = document.getElementById("loginMessage");
      if (!username || !password) {
        message.textContent = "لطفاً نام کاربری و رمز عبور را وارد کنید.";
        message.className = "alert alert-error";
        return;
      }
      message.textContent = "ورود آزمایشی موفق بود. در نسخه PHP باید اعتبارسنجی از دیتابیس انجام شود.";
      message.className = "alert alert-success";
      setTimeout(() => location.href = "dashboard.html", 700);
    });
  }

  document.querySelectorAll("[data-confirm]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (confirm(btn.dataset.confirm)) {
        btn.closest("tr")?.remove();
      }
    });
  });
});

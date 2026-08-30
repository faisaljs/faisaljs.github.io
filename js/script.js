(function () {
  "use strict";

  var GITHUB_USERNAME = "faisaljs";

  /* ---------------- theme toggle ---------------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* ignore (sandboxed preview) */ }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      var isDark = theme === "dark";
      themeBtn.setAttribute("aria-pressed", String(isDark));
      themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  var stored = safeGet("theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (prefersDark ? "dark" : "light"));

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      safeSet("theme", next);
    });
  }

  /* ---------------- mobile menu ---------------- */
  var menuBtn = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- scroll reveal ---------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- GitHub: profile stats ---------------- */
  function setStat(name, value) {
    var el = document.querySelector('[data-stat="' + name + '"]');
    if (el) el.textContent = value;
  }

  fetch("https://api.github.com/users/" + GITHUB_USERNAME)
    .then(function (res) { if (!res.ok) throw new Error("profile fetch failed"); return res.json(); })
    .then(function (data) {
      if (typeof data.public_repos === "number") setStat("repos", data.public_repos);
      if (typeof data.followers === "number") setStat("followers", data.followers);
    })
    .catch(function () {
      setStat("repos", "–");
      setStat("followers", "–");
    });

  /* ---------------- GitHub: repositories ---------------- */
  var LANG_COLORS = {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219", C: "#555555",
    "C++": "#f34b7d", Shell: "#89e051", Go: "#00ADD8", Rust: "#dea584",
    PHP: "#4F5D95", Ruby: "#701516", Dart: "#00B4AB", Kotlin: "#A97BFF"
  };

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderProjects(repos) {
    var grid = document.getElementById("project-grid");
    if (!grid) return;

    if (!repos.length) {
      grid.innerHTML = '<p class="project-empty">No public repositories yet — check back soon.</p>';
      return;
    }

    grid.innerHTML = repos.map(function (repo) {
      var lang = repo.language || "";
      var color = LANG_COLORS[lang] || "var(--accent-2)";
      var desc = repo.description ? escapeHtml(repo.description) : "No description provided.";
      return (
        '<a class="project-card" href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="pname">' + escapeHtml(repo.name) + "</span>" +
          '<span class="pdesc">' + desc + "</span>" +
          '<span class="pmeta">' +
            (lang ? '<span><span class="lang-dot" style="background:' + color + '"></span>' + escapeHtml(lang) + "</span>" : "") +
            '<span>★ ' + repo.stargazers_count + "</span>" +
            '<span>⑂ ' + repo.forks_count + "</span>" +
          "</span>" +
        "</a>"
      );
    }).join("");
  }

  fetch("https://api.github.com/users/" + GITHUB_USERNAME + "/repos?per_page=100&sort=updated")
    .then(function (res) { if (!res.ok) throw new Error("repos fetch failed"); return res.json(); })
    .then(function (repos) {
      var top = repos
        .filter(function (r) { return !r.fork; })
        .sort(function (a, b) {
          if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .slice(0, 6);
      renderProjects(top);
    })
    .catch(function () {
      var grid = document.getElementById("project-grid");
      if (grid) {
        grid.innerHTML =
          '<p class="project-error">Couldn\'t load projects from GitHub right now (rate limit or offline). ' +
          '<a class="text-link" href="https://github.com/' + GITHUB_USERNAME + '?tab=repositories" target="_blank" rel="noopener noreferrer">View them directly on GitHub →</a></p>';
      }
    });
})();
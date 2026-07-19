/* =========================================================================
   NCST - Application Core (state, api, router, UI primitives)
   Loaded first. Exposes window.App and shared helpers.
   ========================================================================= */
(function () {
  "use strict";

  const API = "/api/v1";

  /* ---------- Icons (inline SVG strings) ---------- */
  const ICON = {
    dashboard: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
    users: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>',
    calendar: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
    check: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
    bell: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>',
    megaphone: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683a4.001 4.001 0 011.662-2.307l.929-.929M18 13l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414M18 13l-2.293 2.293a1 1 0 01-1.414 0L15 13"/>',
    audit: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
    camera: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
    settings: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
    user: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>',
    face: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    search: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>',
    download: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>',
    plus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>',
    edit: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>',
    trash: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>',
    archive: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>',
    refresh: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-3M20 15a8 8 0 01-14 3"/>',
    close: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
    menu: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>',
    clipboard: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>',
    alert: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.071 19h13.858c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
    info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    checkCircle: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    xCircle: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    logout: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>',
    upload: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>',
    clock: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    eye: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>',
    eyeOff: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m3.965 7.965L3 3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a10.05 10.05 0 01-2.457 4.543M15 12a3 3 0 00-3-3m0 0l3-3m-3 3H3"/>'
  };

  function svg(path, size) {
    const dim = size ? ` width="${size}" height="${size}"` : "";
    return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"${dim} focusable="false">${path}</svg>`;
  }

  /* ---------- App state ---------- */
  const App = {
    API,
    ICON,
    svg,
    _token: localStorage.getItem("ncst_token"),
    _user: (function () { try { return JSON.parse(localStorage.getItem("ncst_user")); } catch (e) { return null; } })(),
    get token() { return this._token; },
    get user() { return this._user; },
    isAuthed() { return !!this._token; },
    payload() { try { return JSON.parse(atob(this._token.split(".")[1])); } catch (e) { return null; } },
    role() { return this.payload()?.role || "STUDENT"; },
    uid() { return this.payload()?.sub; },
    name() { return this._user?.name || "User"; },
    setAuth(token, user) { this._token = token; this._user = user; localStorage.setItem("ncst_token", token); localStorage.setItem("ncst_user", JSON.stringify(user)); },
    clear() { this._token = null; this._user = null; localStorage.removeItem("ncst_token"); localStorage.removeItem("ncst_user"); },
    content() { return document.getElementById("content"); },
    setPageTitle(t) { const el = document.getElementById("page-title"); if (el) el.textContent = t; },
  };

  /* ---------- API ---------- */
  App.api = async function (path, opts = {}) {
    const isForm = opts.body instanceof FormData;
    const headers = Object.assign({}, opts.headers || {});
    if (!isForm) headers["Content-Type"] = "application/json";
    if (App.token) headers["Authorization"] = "Bearer " + App.token;
    const res = await fetch(API + path, Object.assign({}, opts, { headers }));
    if (res.status === 401 && App.token) {
      App.clear();
      toast("Session expired. Please sign in again.", "error");
      setTimeout(() => (window.location.href = "/login"), 800);
      throw new Error("Session expired");
    }
    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? await res.json() : null;
    if (!res.ok) {
      const detail = data?.detail || (data?.message) || ("Error " + res.status);
      throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
    }
    return data;
  };

  /* ---------- Formatting ---------- */
  App.esc = function (s) {
    if (s === null || s === undefined) return "";
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  };
  App.fmtDateTime = function (ts) {
    if (!ts) return "\u2014";
    try { return new Date(ts).toLocaleString("en-US", { timeZone: "Asia/Manila", month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch (e) { return String(ts); }
  };
  App.fmtDate = function (d) {
    if (!d) return "\u2014";
    try { return new Date(d).toLocaleDateString("en-US", { timeZone: "Asia/Manila", month: "short", day: "numeric", year: "numeric" }); }
    catch (e) { return String(d); }
  };
  App.fmtTime = function (t) { return t || "\u2014"; };
  App.initials = function (name) {
    if (!name) return "?";
    return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  };
  App.badge = function (type, text, dot) {
    const cls = { primary: "badge-primary", success: "badge-success", warning: "badge-warning", danger: "badge-danger", muted: "badge-muted" }[type] || "badge-muted";
    return `<span class="badge ${cls}">${dot ? '<span class="badge-dot"></span>' : ""}${App.esc(text)}</span>`;
  };
  App.statusBadge = function (status) {
    const s = (status || "").toUpperCase();
    if (s === "ACTIVE" || s === "APPROVED" || s === "PRESENT" || s === "REGISTERED" || s === "OK") return App.badge("success", status);
    if (s === "ARCHIVED" || s === "REJECTED" || s === "ABSENT") return App.badge("danger", status);
    if (s === "PENDING" || s === "LATE" || s === "RE_REGISTRATION_PENDING") return App.badge("warning", status);
    return App.badge("muted", status);
  };

  /* ---------- UI primitives ---------- */
  function toast(msg, type = "info") {
    const c = document.getElementById("toast-container");
    if (!c) return;
    const icons = { success: ICON.checkCircle, error: ICON.xCircle, warning: ICON.alert, info: ICON.info };
    const el = document.createElement("div");
    el.className = "toast " + type;
    el.innerHTML = `<span class="toast-icon">${svg(icons[type] || icons.info, 18)}</span><span>${App.esc(msg)}</span>`;
    c.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 300); }, 4000);
  }
  App.toast = toast;

  App.spinner = function (lg) { return `<span class="spinner ${lg ? "spinner-lg" : ""}"></span>`; };

  App.skeleton = function (lines = 3) {
    let s = "";
    for (let i = 0; i < lines; i++) s += `<div class="skeleton skeleton-line" style="width:${90 - i * 10}%"></div>`;
    return s;
  };

  App.emptyState = function (title, msg, icon = ICON.info, actionHtml = "") {
    const iconHtml = typeof icon === "string" && icon.startsWith("<svg") ? icon : svg(icon);
    return `<div class="empty-state"><div class="icon">${iconHtml}</div><h3>${App.esc(title)}</h3><p>${App.esc(msg)}</p>${actionHtml}</div>`;
  };

  /* In-app "route not found" view. Distinct from the server 404 so a missing
     client route is never silently redirected to the dashboard. */
  App.notFound = function (path) {
    App.setPageTitle("Not Found");
    return `<div class="empty-state" style="padding:3rem">
        <div class="icon">${svg(ICON.search)}</div>
        <h3>Page not found</h3>
        <p>No client route is registered for <code>${App.esc(path || "")}</code>.</p>
        <a class="btn btn-primary mt-2" href="#/dashboard/overview">Return to Dashboard</a>
      </div>`;
  };

  App.loadingBlock = function (text = "Loading\u2026") {
    return `<div class="text-center text-muted" style="padding:3rem;">${App.spinner(true)}<div class="mt-2">${App.esc(text)}</div></div>`;
  };

  App.alert = function (type, msg) {
    const icons = { error: ICON.xCircle, success: ICON.checkCircle, warning: ICON.alert, info: ICON.info };
    return `<div class="alert alert-${type}"><span>${svg(icons[type] || icons.info, 18)}</span><div>${App.esc(msg)}</div></div>`;
  };

  /* ---------- Modal ---------- */
  App.modal = function ({ title, body, footer, size, onOpen }) {
    App.closeModal();
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
      <div class="modal-card ${size === "lg" ? "lg" : ""}" role="dialog" aria-modal="true">
        <div class="modal-header"><h3>${title}</h3><button class="modal-close" data-close>&times;</button></div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ""}
      </div>`;
    document.body.appendChild(backdrop);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop || e.target.hasAttribute("data-close")) App.closeModal();
    });
    document.addEventListener("keydown", escClose);
    if (typeof onOpen === "function") onOpen(backdrop);
    return backdrop;
  };
  App.closeModal = function () {
    document.querySelectorAll(".modal-backdrop").forEach((m) => m.remove());
    document.removeEventListener("keydown", escClose);
  };
  function escClose(e) { if (e.key === "Escape") App.closeModal(); }

  App.confirm = function (title, message, onConfirm, danger = false) {
    App.modal({
      title,
      body: `<p class="text-muted">${App.esc(message)}</p>`,
      footer: `<button class="btn btn-secondary" data-close>Cancel</button>
               <button class="btn ${danger ? "btn-danger" : "btn-primary"}" id="confirm-ok">Confirm</button>`,
      onOpen: (m) => {
        m.querySelector("#confirm-ok").addEventListener("click", () => { App.closeModal(); onConfirm(); });
      },
    });
  };

  /* ---------- Pagination component ---------- */
  App.pagination = function (total, page, pageSize, cb) {
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const info = `Showing ${total === 0 ? 0 : (page - 1) * pageSize + 1}\u2013${Math.min(page * pageSize, total)} of ${total}`;
    let btns = "";
    btns += `<button class="btn btn-secondary btn-sm" ${page <= 1 ? "disabled" : ""} data-page="${page - 1}">Prev</button>`;
    const start = Math.max(1, page - 2), end = Math.min(pages, page + 2);
    if (start > 1) btns += `<button class="btn btn-ghost btn-sm" data-page="1">1</button>${start > 2 ? "<span class='text-muted'>\u2026</span>" : ""}`;
    for (let i = start; i <= end; i++) {
      btns += `<button class="btn btn-sm ${i === page ? "btn-primary" : "btn-secondary"}" data-page="${i}">${i}</button>`;
    }
    if (end < pages) btns += `${end < pages - 1 ? "<span class='text-muted'>\u2026</span>" : ""}<button class="btn btn-ghost btn-sm" data-page="${pages}">${pages}</button>`;
    btns += `<button class="btn btn-secondary btn-sm" ${page >= pages ? "disabled" : ""} data-page="${page + 1}">Next</button>`;
    const el = document.createElement("div");
    el.className = "pagination";
    el.innerHTML = `<span class="page-info">${info}</span>${btns}`;
    el.addEventListener("click", (e) => {
      const p = e.target.closest("[data-page]");
      if (p && !p.disabled) cb(parseInt(p.dataset.page, 10));
    });
    return el;
  };

  /* ---------- Router ---------- */
  const Router = {
    routes: {},
    add(pattern, handler) { this.routes[pattern] = handler; },
    async resolve() {
      if (App._stream) { App._stream.getTracks().forEach((t) => t.stop()); App._stream = null; }
      if (window._liveTimer) { clearInterval(window._liveTimer); window._liveTimer = null; }
      const hash = (location.hash || "#/dashboard/overview").slice(1);
      let handler = null, params = {};
      for (const [pattern, fn] of Object.entries(this.routes)) {
        const keys = [];
        const re = new RegExp("^" + pattern.replace(/:(\w+)/g, (_, k) => { keys.push(k); return "([^/]+)"; }) + "$");
        const m = re.exec(hash);
        if (m) { handler = fn; keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1]))); break; }
      }
      const isUnknown = !handler && hash && hash !== "/dashboard/overview";
      if (isUnknown) {
        App.content().innerHTML = App.notFound(hash);
      } else {
        if (!handler) handler = this.routes["/dashboard/overview"];
        try {
          await handler(params);
        } catch (err) {
          App.content().innerHTML = App.alert("error", "Failed to load this page: " + err.message);
        }
      }
      App.buildSidebar();
      const sb = document.getElementById("sidebar");
      const ov = document.getElementById("sidebar-overlay");
      if (sb) sb.classList.remove("open");
      if (ov) ov.classList.remove("open");
    },
    async init() {
      this.validateNav();
      if (App.role() === "ADMIN" && App.isAuthed()) {
        try {
          const me = await App.api("/admin/me");
          window.__mainAdminEmail = me.main_admin_email || "";
        } catch (e) { /* ignore */ }
      }
      window.addEventListener("hashchange", () => this.resolve());
      this.resolve();
    },
    /* Single-source-of-truth guard: every sidebar NAV link MUST have a
       matching registered route, otherwise clicking it 404s. Fail loud. */
    validateNav() {
      const nav = App.NAV || {};
      for (const role of Object.keys(nav)) {
        for (const it of nav[role]) {
          if (it.section) continue;
          if (!it.href) continue;
          if (!this.routes[it.href]) {
            console.error(
              "[router] NAV item \"" + it.label + "\" (" + it.href + ") for role " +
              role + " has NO registered route. Navigation to it will fail."
            );
          }
        }
      }
    },
  };
  App.router = Router;

  /* ---------- Sidebar ---------- */
  const NAV = {
    ADMIN: [
      { section: "Management" },
      { href: "/dashboard/overview", label: "Overview", icon: "dashboard" },
      { href: "/dashboard/students", label: "Users", icon: "users" },
      { href: "/dashboard/admin-management", label: "Admin Management", icon: "users", mainAdminOnly: true },
      { href: "/dashboard/attendance", label: "Attendance", icon: "calendar" },
      { href: "/dashboard/approvals", label: "Approval Center", icon: "check" },
      { section: "Communication" },
      { href: "/dashboard/announcements", label: "Announcements", icon: "megaphone" },
      { href: "/dashboard/audit", label: "Audit Logs", icon: "audit" },
      { section: "Account" },
      // Admin-only “My Profile” intentionally removed per audit requirement.
      { section: "Operations" },
      { href: "/dashboard/scanner", label: "Live Scanner", icon: "camera" },
      { href: "/dashboard/rfid", label: "RFID Management", icon: "eye" },
      { href: "/dashboard/settings", label: "Settings", icon: "settings" },
    ],
    STAFF: [
      { href: "/dashboard/overview", label: "Overview", icon: "dashboard" },
      { href: "/dashboard/attendance", label: "Attendance", icon: "calendar" },
      { href: "/dashboard/students", label: "Student Directory", icon: "users" },
      { href: "/dashboard/announcements", label: "Announcements", icon: "megaphone" },
      { href: "/dashboard/scanner", label: "Live Scanner", icon: "camera" },
      { href: "/dashboard/profile", label: "My Profile", icon: "user" },
    ],
    FACULTY: [
      { href: "/dashboard/overview", label: "Overview", icon: "dashboard" },
      { href: "/dashboard/attendance", label: "Attendance", icon: "calendar" },
      { href: "/dashboard/students", label: "Student Directory", icon: "users" },
      { href: "/dashboard/announcements", label: "Announcements", icon: "megaphone" },
      { href: "/dashboard/scanner", label: "Live Scanner", icon: "camera" },
      { href: "/dashboard/profile", label: "My Profile", icon: "user" },
    ],
    STUDENT: [
      { href: "/dashboard/overview", label: "Dashboard", icon: "dashboard" },
      { href: "/dashboard/attendance", label: "My Attendance", icon: "calendar" },
      { href: "/dashboard/announcements", label: "Announcements", icon: "megaphone" },
      { href: "/dashboard/notifications", label: "Notifications", icon: "bell" },
      { href: "/dashboard/profile", label: "My Profile", icon: "user" },
      { href: "/dashboard/face", label: "Face Profile", icon: "face" },
    ],
  };
  App.NAV = NAV;

  App.buildSidebar = function () {
    const role = App.role();
    const items = NAV[role] || NAV.STUDENT;
    const nav = document.getElementById("sidebar-nav");
    if (!nav) return;
    const current = location.hash.slice(1) || "/dashboard/overview";
    const isAdminMain = (window.__mainAdminEmail || "").toLowerCase() ===
      (App.role() === "ADMIN" ? App.name().toLowerCase() : "");
    let html = "";
    for (const it of items) {
      if (it.section) { html += `<div class="nav-section">${App.esc(it.section)}</div>`; continue; }
      if (it.mainAdminOnly && !isAdminMain) continue;
      const active = current === it.href ? " active" : "";
      const link = it.href[0] === "#" ? it.href : "#" + it.href;
      html += `<a href="${link}" class="${active}">${svg(ICON[it.icon] || ICON.dashboard)}<span>${App.esc(it.label)}</span></a>`;
    }
    nav.innerHTML = html;
    const brand = document.getElementById("brand-name");
    if (brand) brand.textContent = role === "ADMIN" ? "NCST Admin" : role === "STAFF" ? "NCST Staff" : role === "FACULTY" ? "NCST Faculty" : "NCST Student";
    const un = document.getElementById("user-name"); if (un) un.textContent = App.name();
    const av = document.getElementById("user-avatar"); if (av) av.textContent = App.initials(App.name());
  };

  App.toggleSidebar = function () {
    const s = document.getElementById("sidebar"), o = document.getElementById("sidebar-overlay");
    if (s) s.classList.toggle("open");
    if (o) o.classList.toggle("open");
  };

  /* ---------- Camera helper (scanner embed) ---------- */
  App.startCamera = async function (videoEl, deviceId) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: deviceId ? { deviceId: { exact: deviceId } } : { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
    });
    videoEl.srcObject = stream;
    App._stream = stream;
    await new Promise((r) => (videoEl.onloadedmetadata = r));
    await videoEl.play();
    return stream;
  };
  App.stopCamera = function () {
    if (App._stream) { App._stream.getTracks().forEach((t) => t.stop()); App._stream = null; }
  };
  App.captureFrame = function (videoEl, quality = 0.9) {
    const canvas = document.createElement("canvas");
    canvas.width = videoEl.videoWidth || 640;
    canvas.height = videoEl.videoHeight || 480;
    canvas.getContext("2d").drawImage(videoEl, 0, 0);
    return new Promise((res) => canvas.toBlob((b) => res(b), "image/jpeg", quality));
  };

  window.App = App;
})();

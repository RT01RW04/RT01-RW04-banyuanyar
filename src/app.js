/* ============================================================
   RT 01 / RW 04 — Margorejo, Banyuanyar, Banjarsari, Surakarta
   Interaksi situs: navigasi, laporan WhatsApp, kuis sampah,
   galeri, tema, dan penyimpanan lokal.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. KONFIGURASI (mudah diubah pengurus) ---------- */
  const CONFIG = {
    rt: "01",
    rw: "04",
    wilayah: "Margorejo, Banyuanyar, Banjarsari",
    kota: "Surakarta",
    provinsi: "Jawa Tengah",
    kodepos: "57137",
    alamatLengkap: "Margorejo, RT 01 / RW 04, Banyuanyar, Banjarsari, Surakarta, Jawa Tengah 57137",
    maps: "https://www.google.com/maps/search/?api=1&query=Banyuanyar+Banjarsari+Surakarta",
    pengurus: [
      { nama: "Awan Prihanto, S.T.", peran: "Ketua RT", wa: "08126943924", lead: true,
        ket: "Koordinator umum & penerima laporan keluhan warga." },
      { nama: "Handayani, S.E.", peran: "Ketua PKK", wa: "082137744787",
        ket: "Pembina kegiatan ibu-ibu PKK & pengelola Kas PKK." },
      { nama: "Sardi, S.Pd.", peran: "Sekretaris I", wa: "0817266669",
        ket: "Penerima laporan usulan, surat-menyurat, dan administrasi warga." },
      { nama: "Tri Widagdo", peran: "Sekretaris II", wa: "081912329060",
        ket: "Pendampingan administrasi dan dokumentasi kegiatan." },
      { nama: "Wiryanto (Antok Comal)", peran: "Bendahara I", wa: "081327731313",
        ket: "Pengelolaan kas RT dan iuran wajib warga." },
      { nama: "Wahyu Widodo", peran: "Bendahara II", wa: "088233491027",
        ket: "Penerima laporan pembayaran iuran wajib warga." },
      { nama: "Ikhsan Jauhari", peran: "Bendahara Jimpitan", wa: "081226299906",
        ket: "Penerima laporan pembayaran jimpitan keliling." }
    ],
    layanan: {
      keluhan: {
        label: "Keluhan Warga",
        penerima: "Awan Prihanto, S.T.",
        peran: "Ketua RT",
        wa: "08126943924",
        judul: "Sampaikan keluhan, usulan, atau masukan untuk lingkungan RT 01.",
        template: [
          "*LAPORAN / KELUHAN WARGA*",
          "RT 01 / RW 04 — " + "Margorejo, Banyuanyar",
          "Banjarsari, Surakarta",
          "──────────────────",
          "Nama: {nama}",
          "Alamat/Blok: {alamat}",
          "No. HP: {hp}",
          "Kategori: {kategori}",
          "Waktu kirim: {waktu}",
          "──────────────────",
          "Isi laporan:",
          "{isi}",
          "",
          "Mohon arahan dan tindak lanjutnya. Terima kasih. 🙏"
        ]
      },
      usulan: {
        label: "Usulan Warga",
        penerima: "Sardi, S.Pd.",
        peran: "Sekretaris I",
        wa: "0817266669",
        judul: "Sampaikan usulan, permohonan surat, atau urusan administrasi warga.",
        kategori: ["Usulan kegiatan", "Permohonan surat / administrasi", "Data & pendataan warga", "Undangan / koordinasi", "Lainnya"],
        template: [
          "*LAPORAN USULAN / ADMINISTRASI WARGA*",
          "RT 01 / RW 04 — Margorejo, Banyuanyar",
          "Banjarsari, Surakarta",
          "──────────────────",
          "Nama: {nama}",
          "Alamat/Blok: {alamat}",
          "No. HP: {hp}",
          "Keperluan: {kategori}",
          "Waktu kirim: {waktu}",
          "──────────────────",
          "Isi usulan / permohonan:",
          "{isi}",
          "",
          "Mohon arahan dan tindak lanjutnya. Terima kasih. 🙏"
        ]
      },
      iuran: {
        label: "Iuran Wajib",
        penerima: "Wahyu Widodo",
        peran: "Bendahara II",
        wa: "088233491027",
        judul: "Laporkan pembayaran iuran wajib agar tercatat oleh bendahara.",
        template: [
          "*LAPORAN PEMBAYARAN IURAN WAJIB*",
          "RT 01 / RW 04 — Margorejo, Banyuanyar",
          "Banjarsari, Surakarta",
          "──────────────────",
          "Nama: {nama}",
          "Alamat/Blok: {alamat}",
          "No. HP: {hp}",
          "Periode: {periode}",
          "Nominal: {nominal}",
          "Metode: {metode}",
          "Waktu lapor: {waktu}",
          "──────────────────",
          "Catatan: {catatan}",
          "",
          "Bukti pembayaran saya lampirkan pada chat ini. Terima kasih. 🙏"
        ]
      },

      jimpitan: {
        label: "Jimpitan",
        penerima: "Ikhsan Jauhari",
        peran: "Bendahara Jimpitan",
        wa: "081226299906",
        judul: "Laporkan setoran jimpitan kepada bendahara jimpitan.",
        template: [
          "*LAPORAN PEMBAYARAN JIMPITAN*",
          "RT 01 / RW 04 — Margorejo, Banyuanyar",
          "Banjarsari, Surakarta",
          "──────────────────",
          "Nama: {nama}",
          "Alamat/Blok: {alamat}",
          "No. HP: {hp}",
          "Periode: {periode}",
          "Nominal: {nominal}",
          "Waktu lapor: {waktu}",
          "──────────────────",
          "Catatan: {catatan}",
          "",
          "Terima kasih. 🙏"
        ]
      }
    }
  };

  /* ---------- 2. Util ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k, fallback) {
      try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); return true; }
      catch (e) { return false; }
    },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  const digits = (s) => String(s || "").replace(/\D/g, "");
  const waNumber = (local) => {
    let d = digits(local);
    if (d.startsWith("0")) d = "62" + d.slice(1);
    return d;
  };
  const formatLocal = (local) => {
    let d = digits(local);
    if (d.startsWith("62")) d = "0" + d.slice(2);
    if (d.length === 11) return d.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
    if (d.length === 10) return d.replace(/^(\d{4})(\d{3})(\d+)$/, "$1-$2-$3");
    if (d.length === 12) return d.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
    if (d.length === 13) return d.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
    return d;
  };
  const escapeHTML = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const nowWIB = () => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  const formatTanggal = (d) => {
    const t = d || nowWIB();
    const jam = String(t.getHours()).padStart(2, "0") + "." + String(t.getMinutes()).padStart(2, "0");
    return `${t.getDate()} ${BULAN[t.getMonth()]} ${t.getFullYear()}, ${jam} WIB`;
  };
  const formatPeriode = (v) => {
    if (!v) return "-";
    const m = /^(\d{4})-(\d{2})$/.exec(v);
    if (!m) return v;
    return `${BULAN[parseInt(m[2], 10) - 1]} ${m[1]}`;
  };
  const rupiah = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 3. Toast ---------- */
  const toastStack = $("#toastStack");
  function toast(msg, type) {
    if (!toastStack) return;
    const el = document.createElement("div");
    el.className = "toast" + (type === "err" ? " toast--err" : "");
    el.setAttribute("role", "status");
    el.innerHTML = (type === "err"
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 12.5 5 5L20 6.5"/></svg>')
      + "<span>" + escapeHTML(msg) + "</span>";
    toastStack.appendChild(el);
    setTimeout(() => { el.classList.add("is-out"); setTimeout(() => el.remove(), 320); }, 3400);
  }

  /* ---------- 4. Gambar (data URI dari bundel) ---------- */
  const IMG = window.__IMG__ || {};
  function paintImages() {
    $$("img[data-img]").forEach((img) => {
      const key = img.getAttribute("data-img");
      if (IMG[key]) img.src = IMG[key];
    });
    $$("[data-bg]").forEach((el) => {
      const key = el.getAttribute("data-bg");
      if (IMG[key]) el.style.backgroundImage = 'url("' + IMG[key] + '")';
    });
  }

  /* ---------- 5. Tema ---------- */
  const root = document.documentElement;
  const THEME_KEY = "rt01_tema_v1";
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    const btn = $("#themeToggle");
    if (btn) btn.setAttribute("aria-label", t === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap");
  }
  (function initTheme() {
    const saved = store.get(THEME_KEY, null);
    if (saved) applyTheme(saved);
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  })();

  /* ---------- 6. Header, nav, scroll ---------- */
  const header = $("#siteHeader");
  const progress = $("#scrollBar");
  const toTop = $("#toTop");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("is-stuck", y > 6);
    if (toTop) toTop.classList.toggle("is-show", y > 620);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const mobileNav = $("#mobileNav");
  const burger = $("#burger");
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
  if (burger) {
    burger.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });
  }
  $$("#mobileNav a").forEach((a) => a.addEventListener("click", closeNav));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });

  // Scroll-spy
  const navLinks = $$(".nav a");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- 7. Reveal ---------- */
  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); revealObs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$("[data-reveal]").forEach((el) => revealObs.observe(el));

    // angka statistik
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseInt(el.getAttribute("data-count"), 10) || 0;
        if (reduceMotion) { el.textContent = target; countObs.unobserve(el); return; }
        let start = null;
        const dur = 1100;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min(1, (ts - start) / dur);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$("[data-count]").forEach((el) => countObs.observe(el));
  } else {
    $$("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    $$("[data-count]").forEach((el) => (el.textContent = el.getAttribute("data-count")));
  }

  /* ---------- 8. Pengurus & hotline ---------- */
  function renderPengurus() {
    const grid = $("#pengurusGrid");
    if (!grid) return;
    grid.innerHTML = CONFIG.pengurus.map((p, i) => {
      const initials = p.nama.replace(/\(.*?\)/g, "").trim().split(/\s+/).slice(0, 2)
        .map((w) => w[0]).join("").toUpperCase();
      const wa = p.wa
        ? `<a class="pcard__wa pcard__wa--bubble" href="https://wa.me/${waNumber(p.wa)}" target="_blank" rel="noopener"
              data-track-wa="${escapeHTML(p.peran)}" aria-label="Chat WhatsApp ${escapeHTML(p.nama)}" title="Chat WhatsApp">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.6a8.4 8.4 0 0 1-8.5 8.3 8.7 8.7 0 0 1-3.7-.8L4 21l1.7-4.6A8.4 8.4 0 1 1 21 11.6Z"/><circle cx="8.8" cy="11.5" r="1.05" fill="currentColor" stroke="none"/><circle cx="12.5" cy="11.5" r="1.05" fill="currentColor" stroke="none"/><circle cx="16.2" cy="11.5" r="1.05" fill="currentColor" stroke="none"/></svg>
             <span>Chat WhatsApp</span>
           </a>`
        : `<span class="pcard__none">WhatsApp belum tersedia</span>`;

      return `<article class="pcard ${p.lead ? "pcard--lead" : ""}" data-reveal style="transition-delay:${Math.min(i * 55, 330)}ms">
          ${p.lead ? '<span class="pcard__tag">Penerima laporan</span>' : ""}
          <div class="pcard__top">
            <div class="avatar" aria-hidden="true">${escapeHTML(initials)}</div>
            <div>
              <p class="pcard__role">${escapeHTML(p.peran)}</p>
              <h3 class="pcard__name">${escapeHTML(p.nama)}</h3>
            </div>
          </div>
          <p class="pcard__meta">${escapeHTML(p.ket)}</p>
          <div class="pcard__foot">${wa}</div>
        </article>`;
    }).join("");
  }

  function renderHotline() {
    const box = $("#hotlineList");
    if (!box) return;
    const rows = [
      { role: "Ketua RT", name: "Awan Prihanto, S.T.", num: "08126943924" },
      { role: "Ketua PKK", name: "Handayani, S.E.", num: "082137744787" },
      { role: "Sekretaris I", name: "Sardi, S.Pd.", num: "0817266669" },
      { role: "Sekretaris II", name: "Tri Widagdo", num: "081912329060" },
      { role: "Bendahara I", name: "Wiryanto (Antok Comal)", num: "081327731313" },
      { role: "Bendahara II", name: "Wahyu Widodo", num: "088233491027" },
      { role: "Bendahara Jimpitan", name: "Ikhsan Jauhari", num: "081226299906" }
    ];
    box.innerHTML = rows.map((r) => `
      <div class="hotline">
        <div class="hotline__ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 4h4l2 5-2.5 1.5a12 12 0 0 0 5.5 5.5L15 13.5l5 2v4a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 2.5 6.2 2 2 0 0 1 4.5 4Z"/></svg>
        </div>
        <div class="hotline__body">
          <p class="hotline__role">${escapeHTML(r.role)}</p>
          <p class="hotline__name">${escapeHTML(r.name)}</p>
        </div>
        <a class="hotline__wa" href="https://wa.me/${waNumber(r.num)}" target="_blank" rel="noopener"
           aria-label="Chat WhatsApp ${escapeHTML(r.name)}" title="Chat WhatsApp">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.6a8.4 8.4 0 0 1-8.5 8.3 8.7 8.7 0 0 1-3.7-.8L4 21l1.7-4.6A8.4 8.4 0 1 1 21 11.6Z"/><circle cx="8.8" cy="11.5" r="1.05" fill="currentColor" stroke="none"/><circle cx="12.5" cy="11.5" r="1.05" fill="currentColor" stroke="none"/><circle cx="16.2" cy="11.5" r="1.05" fill="currentColor" stroke="none"/></svg>
        </a>
      </div>`).join("");
  }

  /* ---------- 9. Salin nomor ---------- */
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const value = btn.getAttribute("data-copy");
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      btn.classList.add("is-done");
      setTimeout(() => btn.classList.remove("is-done"), 1400);
      toast("Nomor " + formatLocal(value) + " disalin.");
    } catch (err) {
      toast("Gagal menyalin. Salin manual: " + formatLocal(value), "err");
    }
  });

  /* ---------- 10. Tabs layanan ---------- */
  const tabs = $$(".tab");
  const forms = $$(".report-form");
  function activateTab(key) {
    tabs.forEach((t) => {
      const on = t.getAttribute("data-tab") === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    forms.forEach((f) => {
      const on = f.getAttribute("data-form") === key;
      f.hidden = !on;
      f.classList.toggle("is-active", on);
    });
  }
  tabs.forEach((t) => {
    t.addEventListener("click", () => activateTab(t.getAttribute("data-tab")));
    t.addEventListener("keydown", (e) => {
      const list = tabs.map((x) => x.getAttribute("data-tab"));
      const i = list.indexOf(t.getAttribute("data-tab"));
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        activateTab(list[next]);
      }
    });
  });
  $$("[data-open-service]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      activateTab(btn.getAttribute("data-open-service"));
      const target = $("#layanan");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ---------- 11. Form laporan -> WhatsApp ---------- */
  const HISTORY_KEY = "rt01_laporan_v1";
  let history = store.get(HISTORY_KEY, []);

  function getField(form, name) {
    const el = form.elements[name];
    return el ? String(el.value || "").trim() : "";
  }
  function setError(form, name, state) {
    const el = form.elements[name];
    if (!el) return;
    const field = el.closest(".field");
    if (field) field.classList.toggle("has-error", !!state);
    el.setAttribute("aria-invalid", state ? "true" : "false");
  }

  function buildMessage(key, values) {
    const svc = CONFIG.layanan[key];
    const t = svc.template.join("\n");
    const map = {
      nama: values.nama || "-",
      alamat: values.alamat || "-",
      hp: values.hp || "-",
      kategori: values.kategori || "-",
      isi: values.isi || "-",
      periode: values.periode || "-",
      nominal: values.nominal ? rupiah(values.nominal) : "-",
      metode: values.metode || "-",
      catatan: values.catatan || "-",
      waktu: formatTanggal()
    };
    return t.replace(/\{(\w+)\}/g, (m, k) => (map[k] !== undefined ? map[k] : m));
  }

  function collect(form) {
    const key = form.getAttribute("data-form");
    const values = {
      nama: getField(form, "nama"),
      alamat: getField(form, "alamat"),
      hp: getField(form, "hp"),
      catatan: getField(form, "catatan")
    };
    if (key === "keluhan" || key === "usulan") {
      values.kategori = getField(form, "kategori");
      values.isi = getField(form, "isi");
    } else {
      values.periode = formatPeriode(getField(form, "periode"));
      values.nominal = getField(form, "nominal").replace(/\D/g, "");
      if (key === "iuran") values.metode = getField(form, "metode");
    }
    return values;
  }

  function validate(form) {
    let ok = true;
    ["nama", "alamat"].forEach((n) => {
      const val = getField(form, n);
      const bad = val.length < 2;
      setError(form, n, bad);
      if (bad) ok = false;
    });
    const key = form.getAttribute("data-form");
    if (key === "keluhan" || key === "usulan") {
      const isi = getField(form, "isi");
      const bad = isi.length < 12;
      setError(form, "isi", bad);
      if (bad) ok = false;
    } else {
      const nominal = getField(form, "nominal").replace(/\D/g, "");
      const bad = !nominal || Number(nominal) <= 0;
      setError(form, "nominal", bad);
      if (bad) ok = false;
    }
    return ok;
  }

  function updatePreview(form, text) {
    const box = $(".preview", form);
    if (!box) return;
    const pre = $("pre", box);
    if (pre) pre.textContent = text;
    box.classList.add("is-open");
  }

  function renderHistory() {
    const list = $("#historyList");
    const count = $("#historyCount");
    if (count) count.textContent = history.length ? history.length + " laporan" : "belum ada";
    const clearBtn = $("#historyClear");
    if (clearBtn) clearBtn.hidden = history.length === 0;
    if (!list) return;
    if (!history.length) {
      list.innerHTML = '<p class="history-empty">Belum ada laporan tersimpan di perangkat ini.<br>Laporan yang Anda susun akan tercatat otomatis di sini.</p>';
      return;
    }
    list.innerHTML = history.slice(0, 12).map((h) => `
      <article class="hitem">
        <div class="hitem__top">
          <span class="hitem__type">${escapeHTML(h.jenis)}</span>
          <span class="hitem__time">${escapeHTML(h.waktuLabel)}</span>
        </div>
        <p class="hitem__title">${escapeHTML(h.nama)} — ${escapeHTML(h.ringkas)}</p>
        <div class="hitem__actions">
          <button type="button" data-resend="${h.id}">Kirim ulang</button>
          <button type="button" class="danger" data-remove="${h.id}">Hapus</button>
        </div>
      </article>`).join("");
  }

  function saveHistory(rec) {
    history.unshift(rec);
    history = history.slice(0, 40);
    store.set(HISTORY_KEY, history);
    renderHistory();
  }

  $$(".report-form").forEach((form) => {
    const key = form.getAttribute("data-form");

    // nominal: format ribuan
    const nominal = form.elements["nominal"];
    if (nominal) {
      nominal.addEventListener("input", () => {
        const raw = nominal.value.replace(/\D/g, "");
        nominal.value = raw ? Number(raw).toLocaleString("id-ID") : "";
      });
    }

    // default periode = bulan berjalan
    const periode = form.elements["periode"];
    if (periode && !periode.value) {
      const d = nowWIB();
      periode.value = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    }

    ["nama", "alamat", "isi", "nominal"].forEach((n) => {
      const el = form.elements[n];
      if (el) el.addEventListener("input", () => setError(form, n, false));
    });

    const previewBtn = $("[data-preview]", form);
    if (previewBtn) {
      previewBtn.addEventListener("click", () => {
        const text = buildMessage(key, collect(form));
        updatePreview(form, text);
        toast("Pratinjau pesan diperbarui.");
      });
    }

    const copyBtn = $("[data-copy-msg]", form);
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const text = $("pre", form) ? $("pre", form).textContent : "";
        if (!text) { toast("Buat pratinjau pesan terlebih dahulu.", "err"); return; }
        try {
          await navigator.clipboard.writeText(text);
          toast("Pesan disalin. Tempel di chat WhatsApp.");
        } catch (e) {
          const pre = $("pre", form);
          const range = document.createRange();
          range.selectNodeContents(pre);
          const sel = window.getSelection();
          sel.removeAllRanges(); sel.addRange(range);
          toast("Pesan ditandai — tekan Ctrl/Cmd + C untuk menyalin.", "err");
        }
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(form)) {
        toast("Lengkapi dulu kolom bertanda merah.", "err");
        const firstErr = $(".field.has-error input, .field.has-error textarea", form);
        if (firstErr) firstErr.focus();
        return;
      }
      const values = collect(form);
      const svc = CONFIG.layanan[key];
      const message = buildMessage(key, values);
      const url = "https://wa.me/" + waNumber(svc.wa) + "?text=" + encodeURIComponent(message);

      updatePreview(form, message);

      const ringkas = (key === "keluhan" || key === "usulan")
        ? (values.kategori + ": " + values.isi.slice(0, 70) + (values.isi.length > 70 ? "…" : ""))
        : ("Setoran " + (values.nominal ? rupiah(values.nominal) : "-") + " · " + values.periode);

      saveHistory({
        id: "L" + Date.now(),
        jenis: svc.label,
        nama: values.nama,
        ringkas: ringkas,
        waktu: new Date().toISOString(),
        waktuLabel: formatTanggal().replace(", ", " · ").replace(" WIB", ""),
        wa: svc.wa,
        pesan: message
      });

      const win = window.open(url, "_blank", "noopener");
      if (win) toast("Membuka WhatsApp ke " + svc.peran + "…");
      else {
        toast("Popup diblokir. Salin pesan di bawah lalu kirim ke " + formatLocal(svc.wa), "err");
        const box = $(".preview", form);
        if (box) box.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }

      // tombol buka manual di pratinjau
      const actions = $(".preview__actions", form);
      if (actions) {
        let openLink = $(".js-open-wa", actions);
        if (!openLink) {
          openLink = document.createElement("a");
          openLink.className = "btn btn--wa btn--sm js-open-wa";
          openLink.target = "_blank";
          openLink.rel = "noopener";
          openLink.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.6a8.4 8.4 0 0 1-8.5 8.3 8.7 8.7 0 0 1-3.7-.8L4 21l1.7-4.6A8.4 8.4 0 1 1 21 11.6Z"/><circle cx="8.8" cy="11.5" r="1.05" fill="currentColor" stroke="none"/><circle cx="12.5" cy="11.5" r="1.05" fill="currentColor" stroke="none"/><circle cx="16.2" cy="11.5" r="1.05" fill="currentColor" stroke="none"/></svg> Buka WhatsApp';
          actions.prepend(openLink);
        }
        openLink.href = url;
      }
    });
  });

  // riwayat: kirim ulang & hapus
  document.addEventListener("click", (e) => {
    const resend = e.target.closest("[data-resend]");
    if (resend) {
      const rec = history.find((h) => h.id === resend.getAttribute("data-resend"));
      if (!rec) return;
      const url = "https://wa.me/" + waNumber(rec.wa) + "?text=" + encodeURIComponent(rec.pesan);
      window.open(url, "_blank", "noopener");
      toast("Membuka WhatsApp untuk laporan " + rec.jenis + "…");
    }
    const rm = e.target.closest("[data-remove]");
    if (rm) {
      history = history.filter((h) => h.id !== rm.getAttribute("data-remove"));
      store.set(HISTORY_KEY, history);
      renderHistory();
      toast("Catatan laporan dihapus dari perangkat.");
    }
    const clear = e.target.closest("#historyClear");
    if (clear) {
      if (!history.length) return;
      if (window.confirm("Hapus semua riwayat laporan di perangkat ini?")) {
        history = [];
        store.del(HISTORY_KEY);
        renderHistory();
        toast("Semua riwayat laporan dihapus.");
      }
    }
  });

  /* ---------- 12. Kuis pilah sampah ---------- */
  const QUIZ = [
    { emo: "🥬", nama: "Sisa sayur & buah", jawab: "organik", alasan: "Sampah basah ini cepat terurai dan bagus untuk kompos." },
    { emo: "🍂", nama: "Daun kering", jawab: "organik", alasan: "Daun kering adalah bahan coklat ideal untuk pupuk organik." },
    { emo: "🥚", nama: "Kulit telur", jawab: "organik", alasan: "Kulit telur dihancurkan lalu dicampur ke kompos." },
    { emo: "☕", nama: "Ampas kopi", jawab: "organik", alasan: "Ampas kopi menambah nitrogen pada kompos." },
    { emo: "🧴", nama: "Botol plastik", jawab: "anorganik", alasan: "Bersihkan, keringkan, lalu pilah ke kantong plastik daur ulang." },
    { emo: "📰", nama: "Koran & kardus", jawab: "anorganik", alasan: "Kertas kering bisa didaur ulang — jangan sampai basah." },
    { emo: "🥫", nama: "Kaleng minuman", jawab: "anorganik", alasan: "Logam bernilai jual; kumpulkan terpisah." },
    { emo: "🍾", nama: "Botol kaca", jawab: "anorganik", alasan: "Kaca dapat didaur ulang; bungkus agar tidak melukai petugas." },
    { emo: "🛍️", nama: "Kantong plastik bekas", jawab: "anorganik", alasan: "Pilah tersendiri, bisa disetor ke bank sampah." },
    { emo: "🔋", nama: "Baterai bekas", jawab: "residu", alasan: "Mengandung bahan berbahaya — buang ke tempat khusus B3." },
    { emo: "💡", nama: "Lampu bekas", jawab: "residu", alasan: "Termasuk sampah B3, jangan dicampur sampah rumah tangga." },
    { emo: "😷", nama: "Masker bekas", jawab: "residu", alasan: "Bungkus rapat lalu buang sebagai residu, bukan sampah organik." }
  ];
  const BINS = {
    organik: { label: "Organik", sub: "Kompos / pupuk" },
    anorganik: { label: "Anorganik", sub: "Daur ulang" },
    residu: { label: "Residu / B3", sub: "Buang khusus" }
  };
  let quizState = { selected: null, score: 0, done: 0, wrong: 0 };

  /* ---------- 12b. Ilustrasi bak sampah (SVG) ---------- */
  const BIN_ART = {
    organik:   { main: "#7ed957", lid: "#57c142", dark: "#3d8f2f", sym: "#2f7d24" },
    anorganik: { main: "#5bb8ff", lid: "#3f9fe8", dark: "#2772b0", sym: "#1c5f96" },
    residu:    { main: "#ff8a5c", lid: "#ef6f3f", dark: "#b8481f", sym: "#a13c1c" }
  };

  function binSymbol(kind, color) {
    if (kind === "organik") {
      return '<path d="M32 33c7.2-.6 11.4 4.6 10.2 11.8-7.2.9-11.7-4.4-10.2-11.8Z" fill="' + color + '"/>' +
             '<path d="M30.6 47.4c-.4-5.2 1.6-8.6 4.8-10.8" stroke="' + color + '" stroke-width="2.1" fill="none" stroke-linecap="round"/>';
    }
    if (kind === "anorganik") {
      return '<path d="M32 33.6 39.4 45H24.6L32 33.6Z" fill="none" stroke="' + color + '" stroke-width="2.4" stroke-linejoin="round"/>' +
             '<path d="M26.6 42.6 23.4 47.8h6.4" stroke="' + color + '" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
             '<path d="M37.4 42.6l3.2 5.2h-6.4" stroke="' + color + '" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    return '<path d="M32 32.8 41 48H23l9-15.2Z" fill="none" stroke="' + color + '" stroke-width="2.4" stroke-linejoin="round"/>' +
           '<path d="M32 39v4.2" stroke="' + color + '" stroke-width="2.6" stroke-linecap="round"/>' +
           '<circle cx="32" cy="46.2" r="1.3" fill="' + color + '"/>';
  }

  function binSVG(kind, label) {
    const c = BIN_ART[kind] || BIN_ART.organik;
    const nama = label || (BINS[kind] ? BINS[kind].label : "sampah");
    return '<svg class="bin-svg" viewBox="0 0 64 78" role="img" aria-label="Ilustrasi bak sampah ' + nama + '">' +
      '<ellipse cx="32" cy="73.4" rx="21" ry="3.4" fill="rgba(6,28,22,.20)"/>' +
      '<rect x="24.5" y="1.6" width="15" height="6.4" rx="3.2" fill="' + c.dark + '"/>' +
      '<rect x="5.5" y="8" width="53" height="11.6" rx="5.8" fill="' + c.lid + '"/>' +
      '<rect x="5.5" y="8" width="53" height="4.2" rx="2.1" fill="rgba(255,255,255,.35)"/>' +
      '<path d="M11.2 20.4h41.6l-4.3 46.9a6.4 6.4 0 0 1-6.4 5.8H21.9a6.4 6.4 0 0 1-6.4-5.8L11.2 20.4Z" fill="' + c.main + '"/>' +
      '<path d="M19.6 26.6v38.6M44.4 26.6v38.6" stroke="rgba(255,255,255,.45)" stroke-width="2.2" stroke-linecap="round"/>' +
      '<rect x="17.6" y="29.4" width="28.8" height="24.4" rx="6" fill="#ffffff" opacity=".96"/>' +
      binSymbol(kind, c.sym) +
      '<path d="M11.2 20.4h41.6" stroke="rgba(0,0,0,.16)" stroke-width="2"/>' +
      '</svg>';
  }

  function renderBinsShowcase() {
    const box = $("#binsShowcase");
    if (!box) return;
    const data = [
      { k: "organik", title: "Bak Organik", tag: "Basah", sub: "Sisa dapur, daun, kulit buah → jadi pupuk organik." },
      { k: "anorganik", title: "Bak Anorganik", tag: "Kering", sub: "Plastik, kertas, logam, kaca → kantong terpisah." },
      { k: "residu", title: "Bak Residu / B3", tag: "Khusus", sub: "Baterai, lampu, masker → buang ke tempat khusus." }
    ];
    box.innerHTML = data.map(function (d) {
      return '<article class="bin-card bin-card--' + d.k + '">' +
        '<div class="bin-card__art">' + binSVG(d.k, d.title) + '</div>' +
        '<div class="bin-card__body">' +
          '<p class="bin-card__title">' + escapeHTML(d.title) + ' <em>' + escapeHTML(d.tag) + '</em></p>' +
          '<p class="bin-card__sub">' + escapeHTML(d.sub) + '</p>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  function renderQuiz() {
    const wrap = $("#quizItems");
    const bins = $("#quizBins");
    if (!wrap || !bins) return;
    wrap.innerHTML = QUIZ.map((q, i) => `
      <button type="button" class="qitem" data-q="${i}" aria-pressed="false">
        <span class="emo" aria-hidden="true">${q.emo}</span>${escapeHTML(q.nama)}
      </button>`).join("");
    bins.innerHTML = Object.keys(BINS).map((k) => `
      <button type="button" class="bin" data-bin="${k}" aria-label="Masukkan ke bak ${BINS[k].label}">
        ${binSVG(k)}
        <strong>${BINS[k].label}</strong>
        <small>${BINS[k].sub}</small>
      </button>`).join("");
  }

  function updateQuizUI() {
    const total = QUIZ.length;
    const bar = $("#quizBar");
    if (bar) bar.style.width = Math.round((quizState.done / total) * 100) + "%";
    const score = $("#quizScore");
    if (score) score.textContent = quizState.score + "/" + total;
    const left = $("#quizLeft");
    if (left) left.textContent = (total - quizState.done) + " jenis tersisa";
    const reset = $("#quizReset");
    if (reset) reset.hidden = quizState.done < total;
    if (quizState.done === total) {
      const fb = $("#quizFeedback");
      if (fb) {
        fb.className = "quiz-feedback ok";
        fb.innerHTML = `<span>🎉</span><span><b>Selesai!</b> Skor akhir ${quizState.score} dari ${total}. ${
          quizState.score >= total - 2
            ? "Luar biasa, Anda siap memilah sampah di rumah!"
            : "Ayo ulangi agar makin terbiasa memilah sampah."
        }</span>`;
      }
    }
  }

  function initQuiz() {
    renderQuiz();
    const wrap = $("#quizItems");
    const bins = $("#quizBins");
    if (!wrap || !bins) return;
    updateQuizUI();

    wrap.addEventListener("click", (e) => {
      const item = e.target.closest("[data-q]");
      if (!item || item.disabled) return;
      $$(".qitem", wrap).forEach((x) => { x.classList.remove("is-sel"); x.setAttribute("aria-pressed", "false"); });
      item.classList.add("is-sel");
      item.setAttribute("aria-pressed", "true");
      quizState.selected = parseInt(item.getAttribute("data-q"), 10);
      const fb = $("#quizFeedback");
      if (fb) { fb.className = "quiz-feedback"; fb.innerHTML = `<span>👉</span><span>Pilih jenis sampah <b>${escapeHTML(QUIZ[quizState.selected].nama)}</b>, lalu tentukan masuk wadah yang mana.</span>`; }
    });

    bins.addEventListener("click", (e) => {
      const bin = e.target.closest("[data-bin]");
      if (!bin) return;
      const fb = $("#quizFeedback");
      if (quizState.selected === null) {
        toast("Pilih salah satu jenis sampah dulu ya.", "err");
        if (fb) { fb.className = "quiz-feedback"; fb.innerHTML = "<span>☝️</span><span>Ketuk salah satu jenis sampah di atas terlebih dahulu.</span>"; }
        return;
      }
      const q = QUIZ[quizState.selected];
      const itemEl = $('.qitem[data-q="' + quizState.selected + '"]', wrap);
      const answered = bin.getAttribute("data-bin");
      if (answered === q.jawab) {
        quizState.score++; quizState.done++;
        if (itemEl) {
          itemEl.classList.add("is-correct");
          itemEl.disabled = true;
          setTimeout(() => itemEl.classList.add("is-gone"), 480);
        }
        quizState.selected = null;
        if (fb) { fb.className = "quiz-feedback ok"; fb.innerHTML = `<span>✅</span><span><b>Benar!</b> ${escapeHTML(q.alasan)}</span>`; }
        updateQuizUI();
      } else {
        quizState.wrong++;
        if (itemEl) {
          itemEl.classList.add("is-wrong");
          setTimeout(() => itemEl.classList.remove("is-wrong"), 600);
        }
        if (fb) { fb.className = "quiz-feedback no"; fb.innerHTML = `<span>❌</span><span>Belum tepat. <b>${escapeHTML(q.nama)}</b> bukan ${BINS[answered].label.toLowerCase()}. Coba wadah lain.</span>`; }
      }
    });

    const reset = $("#quizReset");
    if (reset) {
      reset.addEventListener("click", () => {
        quizState = { selected: null, score: 0, done: 0, wrong: 0 };
        renderQuiz();
        updateQuizUI();
        const fb = $("#quizFeedback");
        if (fb) { fb.className = "quiz-feedback"; fb.innerHTML = "<span>🔎</span><span>Ketuk jenis sampah, lalu pilih wadahnya: organik, anorganik, atau residu/B3.</span>"; }
        toast("Kuis diulang dari awal.");
      });
    }
  }

  /* ---------- 13. Komitmen warga ---------- */
  const COMMIT_KEY = "rt01_komitmen_v1";
  function initCommit() {
    const items = $$(".commit input");
    if (!items.length) return;
    const saved = store.get(COMMIT_KEY, []);
    items.forEach((inp) => { inp.checked = saved.includes(inp.value); });
    const paint = () => {
      const total = items.length;
      const done = items.filter((i) => i.checked).length;
      const bar = $("#commitBar");
      if (bar) bar.style.width = Math.round((done / total) * 100) + "%";
      const lbl = $("#commitLabel");
      if (lbl) lbl.textContent = done + " / " + total + " komitmen";
      store.set(COMMIT_KEY, items.filter((i) => i.checked).map((i) => i.value));
    };
    items.forEach((i) => i.addEventListener("change", () => {
      paint();
      if (items.every((x) => x.checked)) toast("Terima kasih! Anda ikut menjaga lingkungan RT 01. 🌱");
    }));
    paint();
  }

  /* ---------- 14. Galeri + lightbox ---------- */
  const GALLERY = [
    { k: "g01", cat: "PKK", cap: "Ibu-ibu PKK RT 01 / RW 04 dalam kegiatan kebersamaan warga." },
    { k: "g02", cat: "PKK", cap: "PKK RT 01/04 — silaturahmi dan belanja bersama di Kulon Masjid Mujahidin Banyuanyar." },
    { k: "g03", cat: "Kegiatan Warga", cap: "Malam guyub: bermain catur bersama di lingkungan RT." },
    { k: "g04", cat: "Sosial", cap: "Penyaluran bantuan dari Mangkunegaran kepada warga." },
    { k: "g05", cat: "Kerja Bakti", cap: "Kerja bakti: pengecatan marka jalan lingkungan." },
    { k: "g06", cat: "Kerja Bakti", cap: "Kerja bakti membersihkan jalan lingkungan warga." },
    { k: "g07", cat: "Kerja Bakti", cap: "Pembersihan dan perbaikan Pos Kamling RT 01 / RW 04." },
    { k: "g08", cat: "Keamanan", cap: "Pos Kamling RT 01 / RW 04 saat jaga ronda malam." },
    { k: "g09", cat: "Silaturahmi", cap: "Silaturahmi & Halal Bi Halal warga RT 01 / RW 04." },
    { k: "g10", cat: "PKK", cap: "Kebersamaan ibu-ibu warga RT 01 / RW 04." },
    { k: "g11", cat: "Silaturahmi", cap: "Makan bersama di jalan kampung — tradisi guyub warga." },
    { k: "g12", cat: "Olahraga", cap: "Gowes bareng warga RT 01 / RW 04." },
    { k: "g13", cat: "Kegiatan Warga", cap: "Kumpul warga dengan pakaian serba merah — semangat kebangsaan." },
    { k: "g14", cat: "Olahraga", cap: "Gowes warga di kawasan Padang Golf Adi Soemarmo." },
    { k: "g15", cat: "Olahraga", cap: "Gowes susur sawah — sehat dan guyub." },
    { k: "g16", cat: "Silaturahmi", cap: "Foto bersama warga RT 01 / RW 04." },
    { k: "g17", cat: "Sosial", cap: "Penyerahan bingkisan / santunan kepada warga." },
    { k: "g18", cat: "Silaturahmi", cap: "Halal Bi Halal Keluarga RT 01 / RW 04 Banyuanyar." },
    { k: "g19", cat: "Kegiatan Warga", cap: "Mbolang Warga RT 01/04 Banyuanyar — Solo." }
  ];
  let galVisible = GALLERY.slice();
  let lbIndex = 0;

  function renderGallery() {
    const grid = $("#galleryGrid");
    if (!grid) return;
    grid.innerHTML = GALLERY.map((g, i) => {
      const data = (window.__IMGDIM__ || {})[g.k] || {};
      return `<button class="gal-item" type="button" data-gal="${i}" data-cat="${escapeHTML(g.cat)}"
        aria-label="Perbesar foto: ${escapeHTML(g.cap)}">
        <img data-img="${g.k}" alt="${escapeHTML(g.cap)}" loading="lazy" width="${data.w || 800}" height="${data.h || 600}">
        <span class="gal-item__cap">${escapeHTML(g.cap)}</span>
      </button>`;
    }).join("");
    paintImages();
  }

  function filterGallery(cat) {
    const items = $$("#galleryGrid .gal-item");
    galVisible = [];
    items.forEach((el) => {
      const idx = parseInt(el.getAttribute("data-gal"), 10);
      const show = cat === "Semua" || GALLERY[idx].cat === cat;
      el.classList.toggle("is-hidden", !show);
      if (show) galVisible.push(idx);
    });
    const count = $("#galCount");
    if (count) count.textContent = galVisible.length + " foto";
    $$(".gal-filter").forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-filter") === cat));
  }

  function openLightbox(idx) {
    const lb = $("#lightbox");
    if (!lb) return;
    const pos = galVisible.indexOf(idx);
    lbIndex = pos >= 0 ? pos : 0;
    paintLightbox();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const close = $(".lightbox__close", lb);
    if (close) close.focus();
  }
  function paintLightbox() {
    const idx = galVisible[lbIndex];
    if (idx === undefined) return;
    const g = GALLERY[idx];
    const img = $("#lightboxImg");
    if (img) { img.src = IMG[g.k] || ""; img.alt = g.cap; }
    const cap = $("#lightboxCap");
    if (cap) cap.innerHTML = `<b>${escapeHTML(g.cat)}</b>${escapeHTML(g.cap)}`;
    const count = $("#lightboxCount");
    if (count) count.textContent = (lbIndex + 1) + " / " + galVisible.length;
  }
  function closeLightbox() {
    const lb = $("#lightbox");
    if (!lb) return;
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function moveLightbox(dir) {
    if (!galVisible.length) return;
    lbIndex = (lbIndex + dir + galVisible.length) % galVisible.length;
    paintLightbox();
  }

  function initGallery() {
    renderGallery();
    filterGallery("Semua");
    const grid = $("#galleryGrid");
    if (grid) {
      grid.addEventListener("click", (e) => {
        const item = e.target.closest("[data-gal]");
        if (item) openLightbox(parseInt(item.getAttribute("data-gal"), 10));
      });
    }
    $$(".gal-filter").forEach((b) => b.addEventListener("click", () => filterGallery(b.getAttribute("data-filter"))));
    const lb = $("#lightbox");
    if (lb) {
      lb.addEventListener("click", (e) => {
        if (e.target === lb || e.target.closest(".lightbox__close")) closeLightbox();
        if (e.target.closest(".lightbox__nav.next")) moveLightbox(1);
        if (e.target.closest(".lightbox__nav.prev")) moveLightbox(-1);
      });
      let x0 = null;
      lb.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
      lb.addEventListener("touchend", (e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 48) moveLightbox(dx < 0 ? 1 : -1);
        x0 = null;
      }, { passive: true });
    }
    window.addEventListener("keydown", (e) => {
      if (!lb || !lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") moveLightbox(1);
      if (e.key === "ArrowLeft") moveLightbox(-1);
    });
  }


  /* ---------- 15. Tombol kembali ke atas ---------- */
  if (toTop) {
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  /* ---------- 16. Alamat & tautan ---------- */
  function fillConfig() {
    $$("[data-config]").forEach((el) => {
      const key = el.getAttribute("data-config");
      if (CONFIG[key]) el.textContent = CONFIG[key];
    });
    $$("[data-maps]").forEach((a) => (a.href = CONFIG.maps));
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
    const addr = $("#alamatLengkap");
    if (addr) addr.textContent = CONFIG.alamatLengkap;
  }

  /* ---------- 17. Boot ---------- */
  function boot() {
    paintImages();
    renderPengurus();
    renderHotline();
    fillConfig();
    renderHistory();
    renderBinsShowcase();
    initQuiz();
    initCommit();
    initGallery();
    onScroll();

    // re-observasi elemen hasil render
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-in"); obs.unobserve(en.target); }
        });
      }, { threshold: 0.08 });
      $$("[data-reveal]:not(.is-in)").forEach((el) => obs.observe(el));
    } else {
      $$("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    }
  }

  // tema toggle
  const themeBtn = $("#themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      store.set(THEME_KEY, next);
      toast(next === "dark" ? "Mode gelap diaktifkan." : "Mode terang diaktifkan.");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

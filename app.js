/* ============================================================
   app.js — english.compile() application logic
   Pure static: speechSynthesis + SpeechRecognition + localStorage
   ============================================================ */

(function () {
  "use strict";

  const C = window.EC_CONTENT;
  const NS = "englishCompile.";
  const $view = document.getElementById("view");
  const $toast = document.getElementById("toast");

  /* ---------------- storage helpers ---------------- */
  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(NS + key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(NS + key, JSON.stringify(val)); } catch (e) {}
    }
  };

  /* ---------------- speech ---------------- */
  const synth = window.speechSynthesis || null;
  function speak(text, opts) {
    opts = opts || {};
    if (!synth) { toast("এই ব্রাউজারে শব্দ চলবে না (sound not supported)"); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = opts.rate || 0.9;
    u.pitch = opts.pitch || 1;
    synth.speak(u);
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  /* ---------------- SVG icons (mic + speaker) ---------------- */
  const SPK_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l5 5V4L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z"/></svg>';
  const MIC_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg>';
  function dayIndex() { return Math.floor(Date.now() / 86400000); }
  function seededShuffle(arr, seed) {
    const a = arr.slice();
    let s = (seed >>> 0) || 1;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const j = s % (i + 1);
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------------- toast ---------------- */
  let toastTimer = null;
  function toast(msg) {
    $toast.textContent = msg;
    $toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $toast.classList.remove("show"), 2200);
  }

  /* ---------------- storage availability check ---------------- */
  function showStorageWarning() {
    if (document.getElementById("storage-warn")) return;
    const banner = el("div", {
      id: "storage-warn",
      style: "position:fixed;top:0;left:0;right:0;z-index:60;background:#F26D6D;color:#0B0E14;font-family:var(--bn);font-size:13px;padding:10px 14px;display:flex;align-items:center;gap:12px;"
    }, [
      el("span", { style: "flex:1", text: "এই ব্রাউজারে প্রগ্রেস সেভ হচ্ছে না — Incognito/Private mode বন্ধ করে সাধারণ ব্রাউজারে ব্যবহার করো।" }),
      el("button", {
        text: "✕", title: "বন্ধ করো",
        style: "background:transparent;border:1px solid #0B0E14;border-radius:4px;cursor:pointer;font-family:monospace;padding:2px 8px;",
        onclick: () => banner.remove()
      })
    ]);
    document.body.appendChild(banner);
  }
  function checkStorage() {
    const testKey = NS + "__storage_test__";
    try {
      localStorage.setItem(testKey, "1");
      const ok = localStorage.getItem(testKey) === "1";
      localStorage.removeItem(testKey);
      if (!ok) throw new Error("read mismatch");
      return true;
    } catch (e) {
      showStorageWarning();
      return false;
    }
  }

  /* ---------------- boot terminal log ---------------- */
  function bootLog() {
    const lines = [
      ["muted", "[0.00s] $ english compile --target=fluency"],
      ["muted", "[0.10s] resolving modules... A-alphabet B-lexicon C-grammar D-reader E-speak F-write G-dashboard"],
      ["ok", "[0.28s] ✓ speechSynthesis linked"],
      ["ok", "[0.29s] ✓ localStorage state mounted"],
      ["muted", "[0.30s] awaiting input from rani..."]
    ];
    const bootlog = document.getElementById("bootlog");
    if (!bootlog) return;
    lines.forEach((l, i) => {
      const div = document.createElement("div");
      div.className = "line " + (l[0] === "ok" ? "ok" : "muted");
      div.style.animationDelay = (i * 0.35) + "s";
      div.textContent = l[1];
      bootlog.appendChild(div);
    });
    const cur = document.createElement("div");
    cur.className = "line";
    cur.style.animationDelay = (lines.length * 0.35) + "s";
    cur.innerHTML = '<span class="ok">></span> <span class="cursor"></span>';
    bootlog.appendChild(cur);
  }

  /* ---------------- global progress bar ---------------- */
  function overallProgress() {
    const totalVocab = allVocabWords().length;
    const learned = Object.keys(store.get("vocab", {})).length;
    const grammar = store.get("grammar", {});
    let patAttempts = 0;
    for (const id in grammar) if (grammar[id].attempts > 0) patAttempts++;
    const patTotal = C.PATTERNS.length;
    const diaryAll = store.get("diary_all", {});
    const diaryCount = Object.keys(diaryAll).length;
    const streak = store.get("streak", { count: 0 }).count;
    const passages = store.get("passages_seen", {});
    let seenCount = 0;
    for (const k in passages) if (passages[k].attempts > 0) seenCount++;
    const pasTotal = C.PASSAGES.length;
    const pct = (learned / totalVocab) * 40 +
      (patAttempts / patTotal) * 30 +
      (seenCount / pasTotal) * 6 +
      (Math.min(diaryCount, 14) / 14) * 12 +
      (Math.min(streak, 30) / 30) * 12;
    return Math.max(0, Math.min(100, Math.round(pct)));
  }
  function updateGlobalProgress() {
    const pct = overallProgress();
    const fill = document.getElementById("fill");
    const pctEl = document.getElementById("pct");
    if (fill) fill.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
  }

  /* ---------------- small DOM helpers ---------------- */
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") e.className = attrs[k];
        else if (k === "html") e.innerHTML = attrs[k];
        else if (k === "text") e.textContent = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function") e.addEventListener(k.slice(2), attrs[k]);
        else e.setAttribute(k, attrs[k]);
      }
    }
    if (children) (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null) return;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  function setView(nodes) { clear($view); (Array.isArray(nodes) ? nodes : [nodes]).forEach(n => $view.appendChild(n)); }

  function speaker(text, opts) {
    return el("span", { class: "speak", title: "শোনো", onclick: () => speak(text, opts) }, [el("span", { class: "ico", html: SPK_SVG })]);
  }

  function normalize(s) {
    s = (s || "").toLowerCase();
    s = s
      .replace(/i'm/g, "i am").replace(/don't/g, "do not").replace(/can't/g, "cannot")
      .replace(/won't/g, "will not").replace(/ain't/g, "is not").replace(/it's/g, "it is")
      .replace(/that's/g, "that is").replace(/let's/g, "let us").replace(/he's/g, "he is")
      .replace(/she's/g, "she is").replace(/'ll\b/g, " will").replace(/'ve\b/g, " have")
      .replace(/'re\b/g, " are").replace(/n't\b/g, " not")
      .replace(/gonna/g, "going to").replace(/wanna/g, "want to").replace(/gotta/g, "got to")
      .replace(/k\b/g, "okay").replace(/yeah|yep|yup/g, "yes").replace(/nope|nah/g, "no");
    return s.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  // synonym expansion so loosely-worded speech still matches intents
  const SYN = {
    sure: "yes", great: "good", fine: "good", nice: "good", okay: "yes",
    bad: "not good", tired: "not good", sick: "not good", sad: "not good",
    movie: "cinema", film: "cinema", latte: "coffee", tea: "coffee", water: "coffee",
    busy: "not free", later: "not now"
  };
  function expandSyn(s) {
    return normalize(s).split(" ").map(w => SYN[w] || w).join(" ");
  }
  // filler / grammar words ignored when scoring spoken accuracy
  const STOP = new Set(["a", "an", "the", "is", "are", "am", "to", "of", "in", "on", "and",
    "or", "but", "i", "you", "he", "she", "it", "we", "they", "my", "your", "um", "uh",
    "er", "so", "just", "that", "this", "with", "for", "me", "at", "be", "do", "does",
    "have", "has", "will", "can", "would", "could", "should", "not", "good", "yes", "no"]);
  function todayStr() { return new Date().toISOString().slice(0, 10); }

  /* ============================================================
     MODULE A — Alphabet & Sounds + 100 common words
     ============================================================ */
  function renderA() {
    const head = el("div", {}, [
      el("h2", { html: 'A · <span class="bn">বর্ণমালা ও শব্দ</span>' }),
      el("div", { class: "sub bn", text: "প্রতিটি কার্ডে ট্যাপ করে বর্ণ ও উদাহরণ শব্দ শোনো।" })
    ]);

    const grid = el("div", { class: "grid cards-26" });
    C.ALPHABET.forEach(a => {
      const card = el("div", { class: "card", onclick: () => speak(a.l + ". " + a.word) }, [
        el("div", { class: "big", text: a.l }),
        el("div", { class: "ex", text: a.word }),
        el("div", { class: "note", text: a.note })
      ]);
      grid.appendChild(card);
    });

    const commonHead = el("div", { class: "section-title", text: "// 100 most common words" });
    const cw = el("div", { class: "grid cards-words" });
    C.COMMON_WORDS.forEach(w => {
      const card = el("div", { class: "card", onclick: () => speak(w.en) }, [
        el("div", { class: "row", style: "justify-content:center;gap:6px" }, [
          el("span", { text: w.en, style: "font-weight:700" }),
          speaker(w.en)
        ]),
        el("div", { class: "bn", text: w.bn })
      ]);
      cw.appendChild(card);
    });

    setView([head, grid, commonHead, cw]);
  }

  /* ============================================================
     MODULE B — Vocabulary Engine (SM-2 spaced repetition)
     ============================================================ */
  function cardKey(w) { return w.category + "::" + w.en; }
  function loadCardState(w) {
    const all = store.get("vocab", {});
    return all[cardKey(w)] || { ease: 2.5, interval: 0, reps: 0, due: Date.now() };
  }
  function saveCardState(w, st) {
    const all = store.get("vocab", {});
    all[cardKey(w)] = st;
    store.set("vocab", all);
  }

  // grade: again=1, hard=3, easy=5
  function sm2(st, q) {
    if (q < 3) { st.reps = 0; st.interval = 1; }
    else {
      st.reps += 1;
      if (st.reps === 1) st.interval = 1;
      else if (st.reps === 2) st.interval = 6;
      else st.interval = Math.round(st.interval * st.ease);
    }
    st.ease = st.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (st.ease < 1.3) st.ease = 1.3;
    st.due = Date.now() + st.interval * 86400000;
    return st;
  }

  function allVocabWords() {
    const out = [];
    ["daily", "tech"].forEach(cat => C.VOCAB[cat].forEach(w => out.push(Object.assign({ category: cat }, w))));
    return out;
  }

  function dueCards() {
    const now = Date.now();
    return allVocabWords().filter(w => loadCardState(w).due <= now);
  }

  function recordReview() {
    // streak tracking
    const st = store.get("streak", { count: 0, last: null });
    const t = todayStr();
    if (st.last === t) return;
    const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    st.count = (st.last === y) ? st.count + 1 : 1;
    st.last = t;
    store.set("streak", st);
  }

  function recordPassage(idx, ok) {
    const m = store.get("passages_seen", {});
    m[idx] = m[idx] || { attempts: 0, correct: 0 };
    m[idx].attempts += 1;
    if (ok) m[idx].correct += 1;
    store.set("passages_seen", m);
  }
  function passageMastery(idx) {
    const m = store.get("passages_seen", {});
    const p = m[idx];
    if (!p || p.attempts === 0) return 0;
    return Math.round((p.correct / p.attempts) * 100);
  }
  function recordSpeaking() {
    store.set("speaking_sessions", store.get("speaking_sessions", 0) + 1);
    store.set("speaking_last", todayStr());
  }
  function recordShadowing() {
    store.set("shadowing_count", store.get("shadowing_count", 0) + 1);
  }
  function recordConv(idx) {
    const m = store.get("conv_seen", {});
    m[idx] = true;
    store.set("conv_seen", m);
  }

  let reviewQueue = [];
  function renderB() {
    reviewQueue = dueCards();
    const head = el("div", {}, [
      el("h2", { html: 'B · <span class="bn">শব্দ (ফ্ল্যাশকার্ড)</span>' }),
      el("div", { class: "sub bn", text: "স্পেসড-রিপিটিশন: শুধু যেগুলো আজ দরকার সেগুলো দেখাবে।" })
    ]);

    const stats = el("div", { class: "row mb" }, [
      el("span", { class: "bn", text: "দেখার অপেক্ষায়: " + reviewQueue.length }),
      el("span", { class: "spacer" }),
      el("button", { class: "btn small", text: "সব শব্দ দেখো", onclick: () => renderBAll() })
    ]);

    const area = el("div", { id: "review-area" });
    renderReviewCard(area);

    setView([head, stats, area]);
  }

  function renderReviewCard(area) {
    clear(area);
    if (reviewQueue.length === 0) {
      area.appendChild(el("div", { class: "note-box bn", html: "<b>সব শেষ!</b> আজকের রিভিউ শেষ। কাল আবার এসো।" }));
      return;
    }
    const w = reviewQueue[0];
    const card = el("div", { class: "flashcard" }, [
      el("div", { class: "row", style: "justify-content:center;gap:8px" }, [
        el("div", { class: "front", text: w.en }),
        speaker(w.en)
      ]),
      el("div", { class: "hint bn", text: "ট্যাপ করে অর্থ দেখো" }),
      el("div", { class: "back", style: "display:none", text: w.bn }),
      el("button", {
        class: "btn", text: "অর্থ দেখো / Reveal", onclick: (e) => {
          e.target.style.display = "none";
          card.querySelector(".back").style.display = "block";
          card.querySelector(".hint").style.display = "none";
        }
      })
    ]);
    const srOut = el("div", { class: "mt" });
    const recBtn = el("button", {
      class: "btn small", html: MIC_SVG + " উচ্চারণ চেক",
      onclick: () => {
        listenUser(transcript => {
          clear(srOut);
          const target = normalize(w.en);
          const heard = normalize(transcript);
          const ok = heard.split(" ").indexOf(target) !== -1 || heard.indexOf(target) !== -1;
          srOut.appendChild(el("div", { class: "feedback " + (ok ? "ok" : "no"), text: (ok ? "✓ ঠিক উচ্চারণ! " : "শুনলাম: ") + transcript }));
        });
      }
    });
    const rates = el("div", { class: "row mt", style: "justify-content:center;flex-wrap:wrap" }, [
      el("button", { class: "btn danger", text: "আবার (Again)", onclick: () => grade(w, 1) }),
      el("button", { class: "btn warn", text: "কঠিন (Hard)", onclick: () => grade(w, 3) }),
      el("button", { class: "btn primary", text: "সহজ (Easy)", onclick: () => grade(w, 5) }),
      recBtn
    ]);
    area.appendChild(card);
    area.appendChild(rates);
    area.appendChild(srOut);
  }

  function grade(w, q) {
    const st = loadCardState(w);
    sm2(st, q);
    saveCardState(w, st);
    recordReview();
    reviewQueue.shift();
    const area = document.getElementById("review-area");
    renderReviewCard(area);
    updateGlobalProgress();
  }

  function renderBAll() {
    const wrap = el("div", { class: "mt" });
    ["daily", "tech"].forEach(cat => {
      wrap.appendChild(el("div", { class: "section-title bn", text: cat === "daily" ? "দৈনন্দিন (Daily life)" : "টেক / ডেভ (Tech)" }));
      const g = el("div", { class: "grid cards-words" });
      C.VOCAB[cat].forEach(w => {
        g.appendChild(el("div", { class: "card", onclick: () => speak(w.en) }, [
          el("div", { class: "row", style: "justify-content:center;gap:6px" }, [
            el("span", { text: w.en, style: "font-weight:700" }), speaker(w.en)
          ]),
          el("div", { class: "bn", text: w.bn })
        ]));
      });
      wrap.appendChild(g);
    });
    setView([el("h2", { html: 'B · <span class="bn">সব শব্দ</span>' }),
      el("div", { class: "sub bn", text: "পড়ার জন্য — রিভিউ নয়।" }), wrap]);
  }

  /* ============================================================
     MODULE C — Grammar patterns
     ============================================================ */
  function patternMastery(id) {
    const m = store.get("grammar", {});
    const p = m[id];
    if (!p || p.attempts === 0) return 0;
    return Math.round((p.correct / p.attempts) * 100);
  }
  function recordPattern(id, ok) {
    const m = store.get("grammar", {});
    m[id] = m[id] || { attempts: 0, correct: 0 };
    m[id].attempts += 1;
    if (ok) m[id].correct += 1;
    store.set("grammar", m);
  }

  function ring(pct, label) {
    const r = 22, c = 2 * Math.PI * r;
    const off = c - (pct / 100) * c;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "ring");
    svg.setAttribute("width", "56"); svg.setAttribute("height", "56");
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bg.setAttribute("cx", "28"); bg.setAttribute("cy", "28"); bg.setAttribute("r", r);
    bg.setAttribute("fill", "none"); bg.setAttribute("stroke", "#30363d"); bg.setAttribute("stroke-width", "6");
    const fg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fg.setAttribute("cx", "28"); fg.setAttribute("cy", "28"); fg.setAttribute("r", r);
    fg.setAttribute("fill", "none"); fg.setAttribute("stroke", "#2ea043"); fg.setAttribute("stroke-width", "6");
    fg.setAttribute("stroke-dasharray", c); fg.setAttribute("stroke-dashoffset", off);
    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute("x", "28"); txt.setAttribute("y", "32"); txt.setAttribute("text-anchor", "middle");
    txt.setAttribute("fill", "#c9d1d9"); txt.setAttribute("font-size", "13"); txt.setAttribute("font-family", "monospace");
    txt.textContent = pct + "%";
    svg.appendChild(bg); svg.appendChild(fg); svg.appendChild(txt);
    return el("div", { class: "ring-wrap" }, [svg, el("div", { class: "bn", style: "font-size:11px;color:#8b949e", text: label })]);
  }

  function grammarCard(p) {
    const box = el("div", { class: "card", style: "text-align:left;margin:10px 0;padding:14px" });
    box.appendChild(el("div", { class: "row" }, [
      el("div", {}, [
        el("div", { style: "font-weight:700;color:#58a6ff", text: p.pattern }),
        el("div", { class: "bn", style: "color:#8b949e;font-size:13px", text: p.meaning })
      ]),
      el("span", { class: "spacer" }),
      ring(patternMastery(p.id), p.pattern.split(" ")[1] || p.id)
    ]));
    const exLine = el("div", { class: "bn blur-text", style: "color:#8b949e;font-size:12px;margin:8px 0", text: "উদাহরণ: " + p.examples.join("  •  ") });
    exLine.addEventListener("click", () => exLine.classList.add("revealed"));
    box.appendChild(exLine);
    const ex = p.exercise;
    const q = el("div", { class: "mt" }, [
      el("div", { style: "font-size:16px", text: ex.sentence.replace("___", "____") })
    ]);
    const opts = el("div", { class: "mt" });
    const optSeed = (dayIndex() * 131 + (p.id.charCodeAt(1) || 0)) >>> 0;
    seededShuffle(ex.options, optSeed).forEach(opt => {
      opts.appendChild(el("button", {
        class: "opt", text: opt, onclick: (e) => {
          const ok = opt === ex.answer;
          e.target.classList.add(ok ? "correct" : "wrong");
          recordPattern(p.id, ok);
          Array.from(opts.children).forEach(b => b.disabled = true);
          const fb = el("div", { class: "feedback " + (ok ? "ok" : "no"), text: ok ? "✓ ঠিক!" : "✗ সঠিক: " + ex.answer });
          q.appendChild(fb);
          box.querySelector(".ring-wrap").replaceWith(ring(patternMastery(p.id), p.pattern.split(" ")[1] || p.id));
          updateGlobalProgress();
        }
      }));
    });
    const meaningToggle = el("button", {
      class: "btn small mt", text: "বাংলা অর্থ দেখো", onclick: (e) => {
        e.target.style.display = "none";
        q.appendChild(el("div", { class: "bn", style: "color:#8b949e;margin-top:6px", text: "→ " + p.meaning }));
      }
    });
    box.appendChild(q); box.appendChild(opts); box.appendChild(meaningToggle);
    return box;
  }

  function renderC() {
    const reset = el("button", {
      class: "btn small danger", text: "রিসেট",
      onclick: () => {
        if (!confirm("ব্যাকরণের অগ্রগতি মুছে যাবে। নিশ্চিত?")) return;
        store.set("grammar", {});
        renderC(); updateGlobalProgress(); toast("রিসেট হয়েছে");
      }
    });
    const head = el("div", {}, [
      el("h2", { html: 'C · <span class="bn">ব্যাকরণ ও বাক্য প্যাটার্ন</span>' }),
      el("div", { class: "row" }, [
        el("div", { class: "sub bn", text: "১৫টি মূল প্যাটার্ন। ফাঁকা স্থান পূরণ করে নিজেই চেক করো।" }),
        el("span", { class: "spacer" }),
        reset
      ])
    ]);
    const list = el("div", {});
    // Daily drill — a fixed shuffled permutation so it changes every day AND never repeats the previous day's pattern
    const perm = seededShuffle(C.PATTERNS.map((_, i) => i), 987654321);
    const dailyIdx = perm[dayIndex() % C.PATTERNS.length];
    const daily = C.PATTERNS[dailyIdx];
    const dailyCard = grammarCard(daily);
    dailyCard.style.border = "1px solid #F2C14E";
    list.appendChild(el("div", { class: "section-title bn", text: "আজকের অনুশীলন (Daily drill)" }));
    list.appendChild(dailyCard);
    list.appendChild(el("div", { class: "section-title bn", text: "সব প্যাটার্ন" }));
    seededShuffle(C.PATTERNS, dayIndex() * 7 + 3).forEach(p => list.appendChild(grammarCard(p)));
    setView([head, list]);
  }

  /* ============================================================
     MODULE D — Reading
     ============================================================ */
  let popoverEl = null;
  function showPopover(word, x, y) {
    hidePopover();
    const gloss = C.GLOSS[normalize(word)] || C.GLOSS[word.toLowerCase()] || "—";
    popoverEl = el("div", { class: "popover" }, [
      el("div", { style: "font-family:var(--mono);font-weight:700;margin-bottom:3px", text: word }),
      el("div", { text: gloss }),
      el("div", { style: "margin-top:6px" }, [speaker(word)])
    ]);
    popoverEl.style.left = Math.min(x, window.innerWidth - 230) + "px";
    popoverEl.style.top = (y + 8) + "px";
    document.body.appendChild(popoverEl);
  }
  function hidePopover() { if (popoverEl) { popoverEl.remove(); popoverEl = null; } }
  document.addEventListener("click", (e) => { if (!e.target.closest(".w") && !e.target.closest(".popover")) hidePopover(); });

  function renderPassageText(text) {
    const wrap = el("div", { class: "passage" });
    const words = text.split(/(\s+)/);
    words.forEach(tok => {
      if (/^\s+$/.test(tok) || tok === "") { wrap.appendChild(document.createTextNode(tok)); return; }
      const w = el("span", { class: "w", text: tok }, null);
      w.addEventListener("click", (ev) => {
        const r = w.getBoundingClientRect();
        showPopover(tok.replace(/[.,!?;:]/g, ""), r.left, r.bottom);
        speak(tok.replace(/[.,!?;:]/g, ""));
      });
      wrap.appendChild(w);
    });
    return wrap;
  }

  function passageCard(p, i) {
    const box = el("div", { class: "card", style: "text-align:left;margin:12px 0;padding:14px" });
    const titleRow = el("div", { class: "row" }, [
      el("div", { style: "font-weight:700;color:#58a6ff", text: (i + 1) + ". " + p.title }),
      el("span", { class: "spacer" }),
      el("span", { class: "bn", style: "color:#8b949e;font-size:12px", text: p.level })
    ]);
    if (passageMastery(i) > 0) titleRow.appendChild(ring(passageMastery(i), "বুঝেছি"));
    box.appendChild(titleRow);
    box.appendChild(renderPassageText(p.text));
    const qs = el("div", { class: "mt" });
    p.questions.forEach((qq, qi) => {
      qs.appendChild(el("div", { class: "bn", style: "margin:8px 0", text: (i + 1) + "." + (qi + 1) + " " + qq.q }));
      const o = el("div", {});
      qq.options.forEach(op => {
        o.appendChild(el("button", {
          class: "opt", text: op, onclick: (e) => {
            const ok = op === qq.answer;
            e.target.classList.add(ok ? "correct" : "wrong");
            recordPassage(i, ok);
            Array.from(o.children).forEach(b => b.disabled = true);
            const fb = el("div", { class: "feedback " + (ok ? "ok" : "no"), text: ok ? "✓ ঠিক!" : "✗ সঠিক: " + qq.answer });
            qs.appendChild(fb);
            const rw = box.querySelector(".ring-wrap");
            if (rw) rw.replaceWith(ring(passageMastery(i), "বুঝেছি"));
            else titleRow.appendChild(ring(passageMastery(i), "বুঝেছি"));
            updateGlobalProgress();
          }
        }));
      });
      qs.appendChild(o);
    });
    box.appendChild(qs);
    return box;
  }

  function renderD() {
    const reset = el("button", {
      class: "btn small danger", text: "রিসেট",
      onclick: () => {
        if (!confirm("রিডিংয়ের অগ্রগতি মুছে যাবে। নিশ্চিত?")) return;
        store.set("passages_seen", {});
        renderD(); updateGlobalProgress(); toast("রিসেট হয়েছে");
      }
    });
    const head = el("div", {}, [
      el("h2", { html: 'D · <span class="bn">পড়া (Reading)</span>' }),
      el("div", { class: "row" }, [
        el("div", { class: "sub bn", text: "যেকোনো শব্দে ট্যাপ করে শোনো ও অর্থ দেখো।" }),
        el("span", { class: "spacer" }),
        reset
      ])
    ]);
    const list = el("div", {});
    // Passage of the day — changes every day
    const di = dayIndex() % C.PASSAGES.length;
    const dailyCard = passageCard(C.PASSAGES[di], di);
    dailyCard.style.border = "1px solid #F2C14E";
    list.appendChild(el("div", { class: "section-title bn", text: "আজকের পড়া (Passage of the day)" }));
    list.appendChild(dailyCard);
    list.appendChild(el("div", { class: "section-title bn", text: "সব প্যাসেজ" }));
    C.PASSAGES.forEach((p, i) => list.appendChild(passageCard(p, i)));

    // placeholder: paste own README
    const pasteHead = el("div", { class: "section-title bn", text: "নিজের প্রজেক্টের README এখানে paste করে practice করো" });
    const ta = el("textarea", { placeholder: "এখানে তোমার ইংরেজি README / docs পেস্ট করো...", id: "paste-ta" });
    const pasteArea = el("div", { class: "mt" }, [ta]);
    const renderBtn = el("button", {
      class: "btn", text: "দেখো ও শোনো", onclick: () => {
        const txt = ta.value.trim();
        if (!txt) { toast("আগে কিছু paste করো"); return; }
        const out = renderPassageText(txt);
        pasteArea.appendChild(el("hr", { class: "sep" }));
        pasteArea.appendChild(out);
      }
    });
    setView([head, list, pasteHead, ta, el("div", { class: "mt" }, [renderBtn]), pasteArea]);
  }

  /* ============================================================
     MODULE E — Speaking
     ============================================================ */
  function renderE() {
    const head = el("div", {}, [
      el("h2", { html: 'E · <span class="bn">কথা বলা (Speaking)</span>' }),
      el("div", { class: "note-box bn", html: "<b>নোট:</b> Speech Recognition-এর জন্য Chrome (ডেস্কটপ বা Android) ও ইন্টারনেট লাগে। বাকি পেজ অফলাইনেই কাজ করে।" })
    ]);

    // Shadowing drill — sentences from C patterns + D passages
    const sentences = [];
    C.PATTERNS.forEach(p => p.examples.forEach(e => sentences.push(e)));
    C.PASSAGES.forEach(p => sentences.push(p.text));
    C.CONVERSATIONS.forEach(c => c.lines.forEach(l => sentences.push(l.en)));
    let idx = 0;

    const drill = el("div", { class: "card", style: "text-align:left;padding:16px;margin:12px 0" });
    const targetLine = el("div", { style: "font-size:18px;margin:8px 0;color:#2ea043;font-weight:700" });
    const srOut = el("div", {});
    function showTarget() {
      clear(targetLine); clear(srOut);
      targetLine.textContent = sentences[idx];
      drill.querySelector("#sr-btn").disabled = false;
    }
    const listenBtn = el("button", { class: "btn blue", html: SPK_SVG + " শোনো", onclick: () => speak(sentences[idx]) });
    const srBtn = el("button", {
      class: "btn primary", id: "sr-btn", html: MIC_SVG + " বলো", onclick: () => doRecognition(sentences[idx], srOut, srBtn)
    });
    const nextBtn = el("button", { class: "btn", text: "পরবর্তী →", onclick: () => { idx = (idx + 1) % sentences.length; showTarget(); } });
    drill.appendChild(el("div", { class: "section-title bn", text: "Shadowing drill (ছায়া অনুশীলন)" }));
    drill.appendChild(targetLine);
    drill.appendChild(el("div", { class: "row mt" }, [listenBtn, srBtn, nextBtn]));
    drill.appendChild(srOut);
    showTarget();

    // Free-talk timer
    const talk = el("div", { class: "card", style: "text-align:left;padding:16px;margin:12px 0" });
    const timer = el("div", { style: "font-size:40px;font-weight:700;text-align:center;color:#58a6ff", text: "05:00" });
    let talkInt = null;
    const startBtn = el("button", {
      class: "btn primary", text: "▶ Start 5-minute talk", onclick: () => {
        let sec = 300;
        startBtn.disabled = true;
        talkInt = setInterval(() => {
          sec -= 1;
          const m = String(Math.floor(sec / 60)).padStart(2, "0");
          const s = String(sec % 60).padStart(2, "0");
          timer.textContent = m + ":" + s;
          if (sec <= 0) { clearInterval(talkInt); toast("সময় শেষ! ভালো করেছো।"); recordSpeaking(); startBtn.disabled = false; }
        }, 1000);
      }
    });
    const promptList = el("ul", { class: "bn", style: "color:#8b949e;font-size:13px;margin:10px 0" });
    C.FREE_TALK_PROMPTS.forEach(p => promptList.appendChild(el("li", { text: p })));
    talk.appendChild(el("div", { class: "section-title bn", text: "Free-talk timer (নিজের সঙ্গে কথা)" }));
    talk.appendChild(timer);
    talk.appendChild(el("div", { class: "center mt" }, [startBtn]));
    talk.appendChild(promptList);
    talk.appendChild(el("div", { class: "bn", style: "color:#8b949e;font-size:12px", text: "মাইক দিয়ে নিজের সঙ্গে কথা বলো — এটি শুধু সাপোর্টিভ টাইমার।" }));

    setView([head, drill, talk]);
  }

  function doRecognition(target, outNode, btn) {
    if (!SR) {
      outNode.appendChild(el("div", { class: "note-box bn", html: "<b>এই ব্রাউজারে সাপোর্টেড নয়</b> — Chrome (Android/Desktop) ব্যবহার করো।" }));
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    btn.disabled = true;
    btn.innerHTML = MIC_SVG + " শুনছি...";
    outNode.appendChild(el("div", { class: "bn", style: "color:#8b949e", text: "বলো..." }));

    rec.onresult = (ev) => {
      const heard = ev.results[0][0].transcript;
      showMatch(target, heard, outNode);
    };
    rec.onerror = (ev) => {
      outNode.appendChild(el("div", { class: "feedback no", text: "ভুল: " + ev.error + " — ইন্টারনেট/মাইক চেক করো" }));
    };
    rec.onend = () => { btn.disabled = false; btn.innerHTML = MIC_SVG + " বলো"; };
    rec.start();
  }

  function showMatch(target, heard, outNode) {
    clear(outNode);
    recordShadowing();
    const tAll = normalize(target).split(" ");
    const hSet = new Set(normalize(heard).split(" "));
    const tWords = tAll.filter(w => !STOP.has(w));
    const wrap = el("div", { class: "sr-result" });
    wrap.appendChild(el("div", { class: "bn", style: "color:#8b949e", text: "তুমি বলেছো: " + heard }));
    const line = el("div", { style: "margin-top:6px;font-size:16px" });
    tAll.forEach(w => {
      const ok = hSet.has(w);
      line.appendChild(el("span", { class: "word " + (ok ? "ok" : "bad"), text: w + " " }));
    });
    wrap.appendChild(line);
    const matched = tWords.filter(w => hSet.has(w)).length;
    const pct = tWords.length ? Math.round((matched / tWords.length) * 100) : 100;
    wrap.appendChild(el("div", { class: "feedback " + (pct >= 70 ? "ok" : "no"), text: (pct >= 70 ? "✓ চমৎকার! " : "আরেকবার চেষ্টা করো ") + "(" + pct + "%)" }));
    outNode.appendChild(wrap);
  }

  function listenUser(cb) {
    if (!SR) { toast("মাইক সাপোর্টেড নয় — Chrome (Android/Desktop) ব্যবহার করো।"); return; }
    const rec = new SR();
    rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 1;
    rec.onresult = (e) => cb(e.results[0][0].transcript);
    rec.onerror = (e) => toast("ভুল: " + e.error + " — ইন্টারনেট/মাইক চেক করো");
    rec.start();
  }

  /* ============================================================
      MODULE F — Writing
      ============================================================ */
  function renderF() {
    const head = el("div", {}, [
      el("h2", { html: 'F · <span class="bn">লেখা (Writing)</span>' }),
      el("div", { class: "sub bn", text: "প্রতিদিনের ডায়েরি, commit message, আর ভুল-চেকলিস্ট।" })
    ]);

    // Diary
    const diaryKey = "diary:" + todayStr();
    const ta = el("textarea", { placeholder: "আজকের ডায়েরি লেখো (৩-৪ লাইন)...", id: "diary-ta" });
    ta.value = store.get(diaryKey, "");
    ta.addEventListener("input", () => { store.set(diaryKey, ta.value); store.set("diary_all", Object.assign(store.get("diary_all", {}), { [diaryKey.replace("diary:", "")]: true })); toast("সেভ হয়েছে"); updateGlobalProgress(); });
    const diaryBox = el("div", { class: "card", style: "text-align:left;padding:14px;margin:10px 0" }, [
      el("div", { class: "section-title bn", text: "আজকের ডায়েরি" }),
      ta
    ]);

    // history
    const hist = el("div", { class: "hist mt" });
    const diaryAll = store.get("diary_all", {});
    for (let i = 0; i < 14; i++) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      const val = store.get("diary:" + d, "");
      if (val) {
        diaryAll[d] = true;
        hist.appendChild(el("div", { class: "day", text: d.slice(5), onclick: () => toast(store.get("diary:" + d, "").slice(0, 120)) }));
      } else {
        hist.appendChild(el("div", { class: "day empty", text: d.slice(5) }));
      }
    }
    store.set("diary_all", diaryAll);

    // Commit practice
    const commitBox = el("div", { class: "card", style: "text-align:left;padding:14px;margin:10px 0" });
    commitBox.appendChild(el("div", { class: "section-title bn", text: "Commit message practice" }));
    let ci = 0;
    const promptLn = el("div", { class: "bn", style: "font-size:15px;color:#c9d1d9;margin:8px 0", text: C.COMMIT_PRACTICE[ci].bn });
    const cta = el("textarea", { placeholder: "ইংরেজিতে commit message লেখো...", style: "min-height:50px" });
    const cOut = el("div", { class: "mt" });
    const submitBtn = el("button", {
      class: "btn primary", text: "জমা দাও", onclick: () => {
        clear(cOut);
        if (!cta.value.trim()) { toast("আগে লেখো"); return; }
        cOut.appendChild(el("div", { class: "bn", style: "color:#8b949e;margin-bottom:4px", text: "ভালো উদাহরণ:" }));
        const ex = el("div", { class: "chk", text: "git commit -m \"" + C.COMMIT_PRACTICE[ci].en + "\"" });
        cOut.appendChild(ex);
        cOut.appendChild(el("div", { class: "bn", style: "color:#8b949e;margin-top:6px", text: "(নিজেরটা এর সঙ্গে মেলাও — কোনো AI গ্রেডিং নয়)" }));
      }
    });
    const nextCP = el("button", {
      class: "btn small", text: "অন্য উদাহরণ →", onclick: () => {
        ci = (ci + 1) % C.COMMIT_PRACTICE.length;
        promptLn.textContent = C.COMMIT_PRACTICE[ci].bn;
        cta.value = ""; clear(cOut);
      }
    });
    commitBox.appendChild(promptLn);
    commitBox.appendChild(cta);
    commitBox.appendChild(el("div", { class: "row mt" }, [submitBtn, nextCP]));
    commitBox.appendChild(cOut);

    // Common mistakes
    const misBox = el("div", { class: "card", style: "text-align:left;padding:14px;margin:10px 0" }, [
      el("div", { class: "section-title bn", text: "ভুল-চেকলিস্ট (নিজে রিভিউ করো)" })
    ]);
    C.COMMON_MISTAKES.forEach(m => misBox.appendChild(el("div", { class: "chk", text: "• " + m })));

    setView([head, diaryBox, el("div", { class: "section-title bn", text: "গত ১৪ দিন" }), hist, commitBox, misBox]);
  }

  /* ============================================================
     MODULE G — Dashboard
     ============================================================ */
  function renderG() {
    const vocab = store.get("vocab", {});
    const learned = Object.keys(vocab).length;
    const due = dueCards().length;
    const streak = store.get("streak", { count: 0 }).count;
    const grammar = store.get("grammar", {});
    let patternsDone = 0, patTotal = 0;
    for (const id in grammar) { patTotal++; if (grammar[id].attempts > 0) patternsDone++; }
    const diaryAll = store.get("diary_all", {});
    const diaryCount = Object.keys(diaryAll).length;
    const passages = store.get("passages_seen", {});
    let seenCount = 0;
    for (const k in passages) if (passages[k].attempts > 0) seenCount++;
    const convSeen = store.get("conv_seen", {});
    const convCount = Object.keys(convSeen).length;

    const head = el("div", {}, [
      el("h2", { html: 'G · <span class="bn">ড্যাশবোর্ড / অগ্রগতি</span>' }),
      el("div", { class: "sub bn", text: "সব কিছু localStorage-এ সংরক্ষিত (englishCompile.*)।" })
    ]);
    const tiles = el("div", { class: "tiles" }, [
      tile(streak, "স্ট্রিক (দিন)"),
      tile(learned, "শব্দ শেখা"),
      tile(due, "আজ রিভিউ বাকি"),
      tile(patternsDone + "/" + C.PATTERNS.length, "প্যাটার্ন"),
      tile(seenCount + "/" + C.PASSAGES.length, "পাসেজ পড়া"),
      tile(diaryCount, "ডায়েরি লেখা"),
      tile(store.get("speaking_sessions", 0), "স্পিকিং সেশন"),
      tile(store.get("shadowing_count", 0), "শ্যাডোইং"),
      tile(convCount + "/" + C.CONV_TREES.length, "কথোপকথন")
    ]);

    // backup / restore
    function exportProgress() {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(NS)) data[k] = localStorage.getItem(k);
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "english-compile-backup-" + new Date().toISOString().slice(0, 10) + ".json";
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      toast("ব্যাকআপ ডাউনলোড হয়েছে (" + Object.keys(data).length + " keys)");
    }
    const fileInput = el("input", {
      type: "file", accept: ".json", style: "display:none",
      onchange: (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const fr = new FileReader();
        fr.onload = () => {
          try {
            const obj = JSON.parse(fr.result);
            let n = 0;
            for (const k in obj) {
              if (k.startsWith(NS)) { localStorage.setItem(k, obj[k]); n++; }
            }
            toast(n + " টি key রিস্টোর হয়েছে");
            renderG();
            updateGlobalProgress();
          } catch (err) { toast("ফাইল ঠিক নয় — পার্স করা যায়নি"); }
        };
        fr.readAsText(f);
        e.target.value = "";
      }
    });

    const backupRow = el("div", { class: "row mt" }, [
      el("button", { class: "btn", text: "প্রগ্রেস এক্সপোর্ট করো", onclick: exportProgress }),
      el("button", { class: "btn", text: "প্রগ্রেস ইম্পোর্ট করো", onclick: () => fileInput.click() }),
      fileInput
    ]);

    const reset = el("button", {
      class: "btn danger mt", text: "সব অগ্রগতি মুছে ফেলো (Reset)",
      onclick: () => {
        if (!confirm("সব অগ্রগতি মুছে যাবে। নিশ্চিত?")) return;
        Object.keys(localStorage).forEach(k => { if (k.startsWith(NS)) localStorage.removeItem(k); });
        toast("রিসেট হয়েছে");
        renderG();
        updateGlobalProgress();
      }
    });
    setView([head, tiles, el("div", { class: "section-title bn", text: "ব্যাকআপ / রিস্টোর" }), backupRow, reset]);
  }
  function tile(num, lbl) {
    return el("div", { class: "tile" }, [
      el("div", { class: "num", text: String(num) }),
      el("div", { class: "lbl", text: lbl })
    ]);
  }

  /* ============================================================
      MODULE H — Daily Conversations
      ============================================================ */
  function renderH() {
    const head = el("div", {}, [
      el("h2", { html: 'H · <span class="bn">কথোপকথন (Conversation)</span>' }),
      el("div", { class: "sub bn", html: "পরিস্থিতি বাছো → পার্টনার বলবে → তুমি উত্তর দাও (চিপে ট্যাপ করো বা " + MIC_SVG + " বলো) → পার্টনার উত্তর/প্রশ্ন করবে।" })
    ]);
    const wrap = el("div", {});

    function matchOption(transcript, options) {
      const t = expandSyn(transcript);
      for (const o of options) {
        if (o.hear.indexOf("*") !== -1) return o;
        if (o.hear.some(k => t.indexOf(expandSyn(k)) !== -1)) return o;
      }
      return options[options.length - 1];
    }

    function renderMenu() {
      clear(wrap);
      const list = el("div", {});
      C.CONV_TREES.forEach((conv, ci) => {
        const done = !!store.get("conv_seen", {})[ci];
        const card = el("div", { class: "card", style: "text-align:left;padding:14px;margin:10px 0;cursor:pointer", onclick: () => renderPlayer(ci) }, [
          el("div", { class: "row" }, [
            el("div", { style: "font-weight:700;color:#58a6ff", text: (ci + 1) + ". " + conv.title }),
            el("span", { class: "spacer" }),
            el("span", { class: "bn", style: "color:#8b949e;font-size:12px", text: conv.en })
          ]),
          el("div", { class: "bn", style: "color:#8b949e;font-size:13px;margin-top:6px", text: done ? "✓ প্র্যাকটিস করেছো" : "ট্যাপ করে শুরু করো →" })
        ]);
        list.appendChild(card);
      });
      wrap.appendChild(list);
    }

    function renderPlayer(ci) {
      const conv = C.CONV_TREES[ci];
      let currentId = null, busy = false;
      clear(wrap);
      wrap.appendChild(el("div", { class: "row mb" }, [
        el("button", { class: "btn small", text: "← ফিরে", onclick: renderMenu }),
        el("span", { class: "spacer" }),
        el("div", { style: "font-weight:700;color:#58a6ff", text: conv.title + " · " + conv.en })
      ]));

      const chat = el("div", { class: "conv-chat" });
      wrap.appendChild(chat);

      function botBubble(text, bn, autoplay) {
        const bnLine = el("div", { class: "bn", style: "font-size:12px;margin-top:4px;display:none", text: bn });
        const b = el("div", { class: "bubble them" }, [
          el("div", { class: "who", text: "পার্টনার" }),
          el("div", { class: "txt", text: text }),
          bnLine,
          el("div", { class: "acts" }, [
            el("button", { class: "btn small", html: SPK_SVG, title: "শোনো", onclick: () => speak(text) }),
            el("button", { class: "btn small", text: "বাংলা", onclick: (e) => { const s = bnLine.style.display === "none"; bnLine.style.display = s ? "block" : "none"; e.target.textContent = s ? "ইংরেজি" : "বাংলা"; } })
          ])
        ]);
        chat.appendChild(b);
        chat.scrollTop = chat.scrollHeight;
        if (autoplay) speak(text);
        return b;
      }

      function showNode(id) {
        busy = false;
        currentId = id;
        const node = conv.nodes[id];
        const b = botBubble(node.bot, node.bn, true);
        const chips = el("div", { class: "acts" });
        node.options.forEach(opt => {
          chips.appendChild(el("button", { class: "btn small", text: opt.you, onclick: () => { if (!busy) reply(opt, opt.you); } }));
        });
        b.appendChild(chips);
      }

      function reply(chosenOpt, transcript) {
        if (busy) return;
        busy = true;
        const node = conv.nodes[currentId];
        const opt = chosenOpt || matchOption(transcript, node.options);
        const youText = chosenOpt ? chosenOpt.you : transcript;
        chat.appendChild(el("div", { class: "bubble you" }, [ el("div", { class: "who", text: "তুমি" }), el("div", { class: "txt", text: youText }) ]));
        chat.scrollTop = chat.scrollHeight;
        setTimeout(() => {
          botBubble(opt.say, opt.bn, true);
          recordConv(ci); updateGlobalProgress();
          if (opt.goto && conv.nodes[opt.goto]) {
            setTimeout(() => showNode(opt.goto), 800);
          } else {
            chat.appendChild(el("div", { class: "note-box bn", html: "<b>কথা শেষ।</b> ← ফিরে গিয়ে আবার চেষ্টা করো।" }));
            busy = false;
          }
        }, 500);
      }

      const controls = el("div", { class: "row mt" }, [
        el("button", { class: "btn primary", html: MIC_SVG + " বলো (মাইক)", onclick: () => { if (!busy) listenUser(transcript => reply(null, transcript)); } }),
        el("button", { class: "btn", html: SPK_SVG + " আবার শোনো", onclick: () => { const n = conv.nodes[currentId]; if (n) speak(n.bot); } })
      ]);
      wrap.appendChild(controls);

      showNode(conv.start);
    }

    renderMenu();
    setView([head, wrap]);
  }

  /* ============================================================
      Router
      ============================================================ */
  const MODULES = { A: renderA, B: renderB, C: renderC, D: renderD, E: renderE, F: renderF, G: renderG, H: renderH };
  function go(mod) {
    hidePopover();
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.mod === mod));
    (MODULES[mod] || renderA)();
    updateGlobalProgress();
  }
  document.getElementById("tabbar").addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (t) go(t.dataset.mod);
  });

  function applyTheme(t) {
    if (t === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    const b = document.getElementById("theme-btn");
    if (b) b.textContent = (t === "light") ? "☀️" : "🌙";
  }
  function initTheme() {
    applyTheme(store.get("theme", "dark"));
    const b = document.getElementById("theme-btn");
    if (b) b.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = cur === "light" ? "dark" : "light";
      applyTheme(next);
      store.set("theme", next);
    });
  }

  // init
  initTheme();
  checkStorage();
  bootLog();
  if (!synth) toast("শব্দের জন্য speechSynthesis পাওয়া যায়নি");
  go("A");
})();

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

  /* ---------------- toast ---------------- */
  let toastTimer = null;
  function toast(msg) {
    $toast.textContent = msg;
    $toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $toast.classList.remove("show"), 2200);
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
    const pct = (learned / totalVocab) * 40 +
      (patAttempts / patTotal) * 30 +
      (Math.min(diaryCount, 14) / 14) * 15 +
      (Math.min(streak, 30) / 30) * 15;
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
    return el("span", { class: "speak", title: "শোনো", onclick: () => speak(text, opts) }, "🔊");
  }

  function normalize(s) {
    return (s || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
  }
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
    const rates = el("div", { class: "row mt", style: "justify-content:center" }, [
      el("button", { class: "btn danger", text: "আবার (Again)", onclick: () => grade(w, 1) }),
      el("button", { class: "btn warn", text: "কঠিন (Hard)", onclick: () => grade(w, 3) }),
      el("button", { class: "btn primary", text: "সহজ (Easy)", onclick: () => grade(w, 5) })
    ]);
    area.appendChild(card);
    area.appendChild(rates);
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

  function renderC() {
    const head = el("div", {}, [
      el("h2", { html: 'C · <span class="bn">ব্যাকরণ ও বাক্য প্যাটার্ন</span>' }),
      el("div", { class: "sub bn", text: "১৫টি মূল প্যাটার্ন। ফাঁকা স্থান পূরণ করে নিজেই চেক করো।" })
    ]);
    const list = el("div", {});
    C.PATTERNS.forEach(p => {
      const box = el("div", { class: "card", style: "text-align:left;margin:10px 0;padding:14px" });
      box.appendChild(el("div", { class: "row" }, [
        el("div", {}, [
          el("div", { style: "font-weight:700;color:#58a6ff", text: p.pattern }),
          el("div", { class: "bn", style: "color:#8b949e;font-size:13px", text: p.meaning })
        ]),
        el("span", { class: "spacer" }),
        ring(patternMastery(p.id), p.pattern.split(" ")[1] || p.id)
      ]));
      box.appendChild(el("div", { class: "bn", style: "color:#8b949e;font-size:12px;margin:8px 0", text: "উদাহরণ: " + p.examples.join("  •  ") }));

      const ex = p.exercise;
      const q = el("div", { class: "mt" }, [
        el("div", { style: "font-size:16px", text: ex.sentence.replace("___", "____") })
      ]);
      const opts = el("div", { class: "mt" });
      ex.options.forEach(opt => {
        opts.appendChild(el("button", {
          class: "opt", text: opt, onclick: (e) => {
            const ok = opt === ex.answer;
            e.target.classList.add(ok ? "correct" : "wrong");
            recordPattern(p.id, ok);
            Array.from(opts.children).forEach(b => b.disabled = true);
            const fb = el("div", { class: "feedback " + (ok ? "ok" : "no"), text: ok ? "✓ ঠিক!" : "✗ সঠিক: " + ex.answer });
            q.appendChild(fb);
            // refresh ring
            box.querySelector(".ring-wrap").replaceWith(ring(patternMastery(p.id), p.pattern.split(" ")[1] || p.id));
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
      list.appendChild(box);
    });
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

  function renderD() {
    const head = el("div", {}, [
      el("h2", { html: 'D · <span class="bn">পড়া (Reading)</span>' }),
      el("div", { class: "sub bn", text: "যেকোনো শব্দে ট্যাপ করে শোনো ও অর্থ দেখো।" })
    ]);
    const list = el("div", {});
    C.PASSAGES.forEach((p, i) => {
      const box = el("div", { class: "card", style: "text-align:left;margin:12px 0;padding:14px" });
      box.appendChild(el("div", { class: "row" }, [
        el("div", { style: "font-weight:700;color:#58a6ff", text: (i + 1) + ". " + p.title }),
        el("span", { class: "spacer" }),
        el("span", { class: "bn", style: "color:#8b949e;font-size:12px", text: p.level })
      ]));
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
              Array.from(o.children).forEach(b => b.disabled = true);
              const fb = el("div", { class: "feedback " + (ok ? "ok" : "no"), text: ok ? "✓ ঠিক!" : "✗ সঠিক: " + qq.answer });
              qs.appendChild(fb);
            }
          }));
        });
        qs.appendChild(o);
      });
      box.appendChild(qs);
      list.appendChild(box);
    });

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
    let idx = 0;

    const drill = el("div", { class: "card", style: "text-align:left;padding:16px;margin:12px 0" });
    const targetLine = el("div", { style: "font-size:18px;margin:8px 0;color:#2ea043;font-weight:700" });
    const srOut = el("div", {});
    function showTarget() {
      clear(targetLine); clear(srOut);
      targetLine.textContent = sentences[idx];
      drill.querySelector("#sr-btn").disabled = false;
    }
    const listenBtn = el("button", { class: "btn blue", text: "🔊 শোনো", onclick: () => speak(sentences[idx]) });
    const srBtn = el("button", {
      class: "btn primary", id: "sr-btn", text: "🎤 বলো", onclick: () => doRecognition(sentences[idx], srOut, srBtn)
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
          if (sec <= 0) { clearInterval(talkInt); toast("সময় শেষ! ভালো করেছো।"); startBtn.disabled = false; }
        }, 1000);
      }
    });
    const promptList = el("ul", { class: "bn", style: "color:#8b949e;font-size:13px;margin:10px 0" });
    C.FREE_TALK_PROMPTS.forEach(p => promptList.appendChild(el("li", { text: p })));
    talk.appendChild(el("div", { class: "section-title bn", text: "Free-talk timer (নিজের সাথে কথা)" }));
    talk.appendChild(timer);
    talk.appendChild(el("div", { class: "center mt" }, [startBtn]));
    talk.appendChild(promptList);
    talk.appendChild(el("div", { class: "bn", style: "color:#8b949e;font-size:12px", text: "মাইক দিয়ে নিজের সাথে কথা বলো — এটি শুধু সাপোর্টিভ টাইমার।" }));

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
    btn.textContent = "🎤 শুনছি...";
    outNode.appendChild(el("div", { class: "bn", style: "color:#8b949e", text: "বলো..." }));

    rec.onresult = (ev) => {
      const heard = ev.results[0][0].transcript;
      showMatch(target, heard, outNode);
    };
    rec.onerror = (ev) => {
      outNode.appendChild(el("div", { class: "feedback no", text: "ভুল: " + ev.error + " — ইন্টারনেট/মাইক চেক করো" }));
    };
    rec.onend = () => { btn.disabled = false; btn.textContent = "🎤 বলো"; };
    rec.start();
  }

  function showMatch(target, heard, outNode) {
    clear(outNode);
    const tWords = normalize(target).split(" ");
    const hWords = normalize(heard).split(" ");
    const hSet = new Set(hWords);
    const wrap = el("div", { class: "sr-result" });
    wrap.appendChild(el("div", { class: "bn", style: "color:#8b949e", text: "তুমি বলেছো: " + heard }));
    const line = el("div", { style: "margin-top:6px;font-size:16px" });
    tWords.forEach(w => {
      const ok = hSet.has(w);
      line.appendChild(el("span", { class: "word " + (ok ? "ok" : "bad"), text: w + " " }));
    });
    wrap.appendChild(line);
    const matched = tWords.filter(w => hSet.has(w)).length;
    const pct = Math.round((matched / tWords.length) * 100);
    wrap.appendChild(el("div", { class: "feedback " + (pct >= 70 ? "ok" : "no"), text: (pct >= 70 ? "✓ চমৎকার! " : "আরেকবার চেষ্টা করো ") + "(" + pct + "%)" }));
    outNode.appendChild(wrap);
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
        cOut.appendChild(el("div", { class: "bn", style: "color:#8b949e;margin-top:6px", text: "(নিজেরটা এর সাথে মেলাও — কোনো AI গ্রেডিং নয়)" }));
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

    const head = el("div", {}, [
      el("h2", { html: 'G · <span class="bn">ড্যাশবোর্ড / অগ্রগতি</span>' }),
      el("div", { class: "sub bn", text: "সব কিছু localStorage-এ সংরক্ষিত (englishCompile.*)।" })
    ]);
    const tiles = el("div", { class: "tiles" }, [
      tile(streak, "স্ট্রিক (দিন)"),
      tile(learned, "শব্দ শেখা"),
      tile(due, "আজ রিভিউ বাকি"),
      tile(patternsDone + "/" + C.PATTERNS.length, "প্যাটার্ন"),
      tile(C.PASSAGES.length, "পাসেজ পড়া"),
      tile(diaryCount, "ডায়েরি লেখা")
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
    setView([head, tiles, reset]);
  }
  function tile(num, lbl) {
    return el("div", { class: "tile" }, [
      el("div", { class: "num", text: String(num) }),
      el("div", { class: "lbl", text: lbl })
    ]);
  }

  /* ============================================================
     Router
     ============================================================ */
  const MODULES = { A: renderA, B: renderB, C: renderC, D: renderD, E: renderE, F: renderF, G: renderG };
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

  // init
  bootLog();
  if (!synth) toast("শব্দের জন্য speechSynthesis পাওয়া যায়নি");
  go("A");
})();

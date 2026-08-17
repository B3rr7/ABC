# english.compile() — Rani's English Learning Pipeline

A single, self-contained static webpage that teaches English from **zero to conversation** for a Bengali-speaking Android developer. No apps to install, no accounts, no backend, no internet required for the core experience.

> // শূন্য থেকে কথা বলা পর্যন্ত — বাংলায়, শুধু ব্রাউজারেই।

---

## Features (Modules A–H)

| Module | Name (বাংলা) | What it does |
|--------|-------------|--------------|
| **A** | বর্ণমালা ও শব্দ | 26 letters (tap to hear name + example word) + the 100 most common English words with Bengali meanings. |
| **B** | শব্দ (Vocabulary) | Spaced-repetition flashcards (SM-2 style) for ~250 daily-life + tech words. Tap **🎤 উচ্চারণ চেক** to practice pronunciation — the app listens and tells you if you said the word right. |
| **C** | ব্যাকরণ (Grammar) | 20 core sentence patterns with fill-in-the-blank drills and a per-pattern mastery ring. Options are **shuffled** and a **Daily drill** highlights a different pattern every day (in shuffled order), plus a **রিসেট** button to clear grammar progress. |
| **D** | পড়া (Reading) | 6 tech-flavored passages; tap any word to hear it and see a Bengali gloss. A **Passage of the day** rotates daily, and a **রিসেট** button clears reading progress. Plus a box to paste your own README/docs. Comprehension questions are scored per passage. |
| **E** | কথা (Speaking) | Shadowing drill (listen → speak → see word-by-word match) and a 5-minute free-talk timer. |
| **F** | লেখা (Writing) | Daily diary (auto-saved per date), commit-message practice, and a self-review mistake checklist. |
| **G** | ড্যাশবোর্ড | Streak, words learned, patterns mastered, passages read, speaking sessions, conversations practiced — all from `localStorage`. Export / Import backup + Reset. |
| **H** | কথোপকথন (Conversation) | **Interactive partner.** Pick a scene (talking with a girl, friend small-talk, coffee shop, weekend plans, directions, **complimenting a girl, asking for her number, asking her out, office small talk, at a party, at a restaurant**). The partner speaks, you reply by **tapping a suggestion chip or speaking into the mic**, and the partner understands your intent and replies / asks the next question. |

---

## How it works

- **Zero dependencies.** Only three browser-native building blocks:
  - `window.speechSynthesis` — text-to-speech (hear correct pronunciation).
  - `window.SpeechRecognition` / `webkitSpeechRecognition` — speech-to-text (check your spoken practice).
  - `localStorage` — all progress, saved in the `englishCompile.*` namespace.
- **No build step.** Pure HTML + CSS + JS.
- **Offline-first.** System fonts (Noto Sans Bengali fallback) render Bengali with no internet. A Google Fonts `<link>` is included only as progressive enhancement.

### Files
```
index.html   # page shell: hero terminal, sticky progress bar, module nav
style.css    # dark "pipeline / terminal" theme
app.js       # all logic: store helper, el() DOM helper, renderA–renderH, speech
content.js   # ALL learning content (words, patterns, passages, conversations) — edit freely
```

To add more content (words, passages, conversation trees), edit `content.js` — you don't need to touch the app logic.

---

## How to run

1. Open `index.html` directly in a browser, **or**
2. Host it (e.g. GitHub Pages) — it's a static site.

**For speech recognition** you need **Chrome** (desktop or Android) and an internet connection (the recognition engine itself is cloud-backed). Everything else works offline.

> Note: in Incognito / Private mode some browsers block `localStorage`. The app shows a red banner if it can't save your progress — switch to a normal window.

---

## Backup your progress

Progress lives only in this browser. On the **Dashboard (G)** use:
- **প্রগ্রেস এক্সপোর্ট করো** → downloads `english-compile-backup-YYYY-MM-DD.json`
- **প্রগ্রেস ইম্পোর্ট করো** → restores from that file

Keep the file in Google Drive or email it to yourself.

---

## Privacy

No accounts, no servers, no tracking. Your data never leaves the device except when *you* choose to export it.

---

## Roadmap / ideas

- More conversation trees (compliment a girl, ask for her number, office small-talk).
- More daily-life + tech vocabulary.
- Optional online mode (LLM) toggled on only when the user opts in — kept separate from the offline core.

---

Built for Rani · github.com/B3rr7/ABC

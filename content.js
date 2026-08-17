/* ============================================================
   content.js — ALL learning content for english.compile()
   Plain JS data only. Edit this file to add more content later.
   ============================================================ */

window.EC_CONTENT = (function () {
  "use strict";

  /* ---------- Module A: Alphabet & Sounds ---------- */
  // note = short practical Bengali mouth/sound description (not full IPA)
  const ALPHABET = [
    { l: "A", word: "Apple",       note: "মুখ খোলা রেখে 'আ'–এর কাছাকাছি; শব্দ অনুযায়ী বদলায়" },
    { l: "B", word: "Ball",        note: "ঠোঁট বন্ধ করে 'ব'–এর মত, তারপর খুলে বাতাস বের করো" },
    { l: "C", word: "Cat",         note: "জিভ দাঁতের কাছে রেখে 'ক/স'–এর মত (word-এর ওপর নির্ভর করে)" },
    { l: "D", word: "Dog",         note: "জিভ দাঁতের ডগায় ছুঁইয়ে 'ড'–এর মত" },
    { l: "E", word: "Egg",         note: "মুখ সামান্য খোলা, চওড়া 'এ'–এর কাছাকাছি" },
    { l: "F", word: "Fish",        note: "ঠোঁটের ফাঁক দিয়ে হাওয়া ফুৎকার দাও (ফ)" },
    { l: "G", word: "Goat",        note: "গলা দিয়ে 'গ'–এর মত (hard g)" },
    { l: "H", word: "Hat",         note: "ভ্যাঁপসা 'হ'–এর মত হাওয়া ছাড়ো" },
    { l: "I", word: "Ice",         note: "মুখ সরু করে 'ই'–এর মত" },
    { l: "J", word: "Jump",        note: "বাংলা 'জ'–এর কাছাকাছি" },
    { l: "K", word: "Key",         note: "পেছনে বাঁধ দিয়ে 'ক'–এর মত" },
    { l: "L", word: "Lion",        note: "জিভ ওপরে ছাদে ছোঁয়াও (ল)" },
    { l: "M", word: "Moon",        note: "ঠোঁট বুজে নাক দিয়ে 'ম'–এর মত" },
    { l: "N", word: "Nose",        note: "জিভ ওপরে ছাদে, নাক দিয়ে 'ন'–এর মত" },
    { l: "O", word: "Orange",      note: "ঠোঁট গোল করে 'ও'–এর মত" },
    { l: "P", word: "Pen",         note: "ঠোঁট বুজে তারপর 'প'–এর মত খোলো" },
    { l: "Q", word: "Queen",       note: "ক + য়ু মিলে 'কুইন' (q সবসময় u-এর সাথে)" },
    { l: "R", word: "Rat",         note: "জিভ গোল করে কাঁপিয়ে 'র'–এর মত (আমেরিকানে ছোট)" },
    { l: "S", word: "Sun",         note: "দাঁত বুজে হিসহিসে 'স'" },
    { l: "T", word: "Tree",        note: "জিভ দাঁতের ডগায় ছুঁইয়ে 'ট'–এর মত" },
    { l: "U", word: "Umbrella",    note: "ঠোঁট সরু করে 'আ/উ'–এর মাঝামাঝি" },
    { l: "V", word: "Van",         note: "নিচের দাঁত ওপরের ঠোঁটে ছুঁইয়ে 'ভ'–এর মত" },
    { l: "W", word: "Water",       note: "ঠোঁট গোল করে 'ডাবল–ইউ' (উ–উ)'" },
    { l: "X", word: "Box",         note: "ক্স — 'বক্স'–এর শেষে k + s" },
    { l: "Y", word: "Yes",         note: "জিভ সরু করে 'ইয়া'–এর মত" },
    { l: "Z", word: "Zoo",         note: "দাঁত বুজে 'জ'–এর মত (z = voiced s)" }
  ];

  // 100 most common English words — en + one-word Bengali meaning
  const COMMON_WORDS = [
    { en: "the", bn: "যে/উক্ত" }, { en: "be", bn: "হওয়া" }, { en: "to", bn: "–এ/-কে" },
    { en: "of", bn: "–এর" }, { en: "and", bn: "এবং" }, { en: "a", bn: "একটি" },
    { en: "in", bn: "মধ্যে" }, { en: "that", bn: "যে" }, { en: "have", bn: "আছে" },
    { en: "I", bn: "আমি" }, { en: "it", bn: "এটি" }, { en: "for", bn: "জন্য" },
    { en: "not", bn: "না" }, { en: "on", bn: "উপরে" }, { en: "with", bn: "সাথে" },
    { en: "he", bn: "সে (পুরুষ)" }, { en: "as", bn: "যেমন" }, { en: "you", bn: "তুমি/আপনি" },
    { en: "do", bn: "করা" }, { en: "at", bn: "–এ" }, { en: "this", bn: "এই" },
    { en: "but", bn: "কিন্তু" }, { en: "his", bn: "তার (পুরুষ)" }, { en: "by", bn: "দ্বারা" },
    { en: "from", bn: "থেকে" }, { en: "they", bn: "তারা" }, { en: "we", bn: "আমরা" },
    { en: "say", bn: "বলা" }, { en: "her", bn: "তার (মহিলা)" }, { en: "she", bn: "সে (মহিলা)" },
    { en: "or", bn: "অথবা" }, { en: "an", bn: "একটি" }, { en: "will", bn: "হবে" },
    { en: "my", bn: "আমার" }, { en: "one", bn: "এক" }, { en: "all", bn: "সব" },
    { en: "would", bn: "হতো" }, { en: "there", bn: "সেখানে" }, { en: "their", bn: "তাদের" },
    { en: "what", bn: "কী" }, { en: "so", bn: "তাই" }, { en: "up", bn: "ওপরে" },
    { en: "out", bn: "বাইরে" }, { en: "if", bn: "যদি" }, { en: "about", bn: "সম্পর্কে" },
    { en: "who", bn: "কে" }, { en: "get", bn: "পাওয়া" }, { en: "which", bn: "যেটি" },
    { en: "go", bn: "যাওয়া" }, { en: "me", bn: "আমাকে" }, { en: "when", bn: "কখন" },
    { en: "make", bn: "তৈরি করা" }, { en: "can", bn: "পারা" }, { en: "like", bn: "পছন্দ" },
    { en: "time", bn: "সময়" }, { en: "no", bn: "না" }, { en: "just", bn: "শুধু" },
    { en: "him", bn: "তাকে" }, { en: "know", bn: "জানা" }, { en: "take", bn: "নেওয়া" },
    { en: "people", bn: "মানুষ" }, { en: "into", bn: "মধ্যে" }, { en: "year", bn: "বছর" },
    { en: "your", bn: "তোমার" }, { en: "good", bn: "ভালো" }, { en: "some", bn: "কিছু" },
    { en: "could", bn: "পারতাম" }, { en: "them", bn: "তাদের" }, { en: "see", bn: "দেখা" },
    { en: "other", bn: "অন্য" }, { en: "than", bn: "তুলনায়" }, { en: "then", bn: "তখন" },
    { en: "now", bn: "এখন" }, { en: "look", bn: "দেখা" }, { en: "only", bn: "শুধু" },
    { en: "come", bn: "আসা" }, { en: "its", bn: "এর (জিনিস)" }, { en: "over", bn: "ওপর দিয়ে" },
    { en: "think", bn: "ভাবা" }, { en: "also", bn: "ও" }, { en: "back", bn: "ফিরে" },
    { en: "after", bn: "পরে" }, { en: "use", bn: "ব্যবহার" }, { en: "two", bn: "দুই" },
    { en: "how", bn: "কীভাবে" }, { en: "our", bn: "আমাদের" }, { en: "work", bn: "কাজ" },
    { en: "first", bn: "প্রথম" }, { en: "well", bn: "ভালোভাবে" }, { en: "way", bn: "পথ" },
    { en: "even", bn: "এমনকি" }, { en: "new", bn: "নতুন" }, { en: "want", bn: "চাওয়া" },
    { en: "because", bn: "কারণ" }, { en: "any", bn: "যেকোনো" }, { en: "these", bn: "এগুলো" },
    { en: "give", bn: "দেওয়া" }, { en: "day", bn: "দিন" }, { en: "most", bn: "বেশিরভাগ" },
    { en: "us", bn: "আমাদের" }
  ];

  /* ---------- Module B: Vocabulary Engine ---------- */
  const VOCAB = {
    "daily": [
      { en: "family", bn: "পরিবার" }, { en: "mother", bn: "মা" }, { en: "father", bn: "বাবা" },
      { en: "brother", bn: "ভাই" }, { en: "sister", bn: "বোন" }, { en: "friend", bn: "বন্ধু" },
      { en: "food", bn: "খাবার" }, { en: "water", bn: "পানি" }, { en: "rice", bn: "ভাত" },
      { en: "tea", bn: "চা" }, { en: "morning", bn: "সকাল" }, { en: "night", bn: "রাত" },
      { en: "today", bn: "আজ" }, { en: "tomorrow", bn: "আগামীকাল" }, { en: "time", bn: "সময়" },
      { en: "hour", bn: "ঘণ্টা" }, { en: "hello", bn: "হ্যালো" }, { en: "thanks", bn: "ধন্যবাদ" },
      { en: "sorry", bn: "দুঃখিত" }, { en: "please", bn: "দয়া করে" }, { en: "left", bn: "বামে" },
      { en: "right", bn: "ডানে" }, { en: "straight", bn: "সোজা" }, { en: "market", bn: "বাজার" },
      { en: "shop", bn: "দোকান" }, { en: "money", bn: "টাকা" }, { en: "price", bn: "দাম" },
      { en: "buy", bn: "কেনা" }, { en: "happy", bn: "খুশি" }, { en: "sad", bn: "দুঃখিত" },
      { en: "tired", bn: "ক্লান্ত" }, { en: "angry", bn: "রাগ" }, { en: "house", bn: "বাড়ি" },
      { en: "home", bn: "বাড়ি" }, { en: "road", bn: "রাস্তা" }, { en: "bus", bn: "বাস" },
      { en: "train", bn: "ট্রেন" }, { en: "book", bn: "বই" }, { en: "name", bn: "নাম" },
      { en: "phone", bn: "ফোন" }, { en: "work", bn: "কাজ" }, { en: "school", bn: "স্কুল" },
      { en: "doctor", bn: "ডাক্তার" }, { en: "cold", bn: "ঠান্ডা" }, { en: "hot", bn: "গরম" },
      { en: "rain", bn: "বৃষ্টি" }, { en: "sun", bn: "সূর্য" }, { en: "money", bn: "টাকা" },
      { en: "week", bn: "সপ্তাহ" }, { en: "month", bn: "মাস" }, { en: "year", bn: "বছর" },
      { en: "door", bn: "দরজা" }, { en: "window", bn: "জানালা" }, { en: "chair", bn: "চেয়ার" },
      { en: "table", bn: "টেবিল" }, { en: "bag", bn: "ব্যাগ" }, { en: "key", bn: "চাবি" },
      { en: "city", bn: "শহর" }, { en: "village", bn: "গ্রাম" }, { en: "child", bn: "শিশু" },
      { en: "man", bn: "পুরুষ" }, { en: "woman", bn: "মহিলা" }, { en: "people", bn: "মানুষ" },
      { en: "help", bn: "সাহায্য" }, { en: "question", bn: "প্রশ্ন" }, { en: "answer", bn: "উত্তর" },
      { en: "story", bn: "গল্প" }, { en: "song", bn: "গান" }, { en: "color", bn: "রঙ" },
      { en: "red", bn: "লাল" }, { en: "green", bn: "সবুজ" }, { en: "blue", bn: "নীল" }
    ],
    "tech": [
      { en: "variable", bn: "ভেরিয়েবল" }, { en: "function", bn: "ফাংশন" }, { en: "bug", bn: "বাগ" },
      { en: "deploy", bn: "ডিপ্লয়/চালু করা" }, { en: "repository", bn: "রিপোজিটরি" }, { en: "commit", bn: "কমিট" },
      { en: "branch", bn: "ব্রাঞ্চ" }, { en: "merge", bn: "মার্জ" }, { en: "compile", bn: "কম্পাইল" },
      { en: "build", bn: "বিল্ড" }, { en: "error", bn: "এরর/ভুল" }, { en: "debug", bn: "ডিবাগ" },
      { en: "server", bn: "সার্ভার" }, { en: "database", bn: "ডাটাবেস" }, { en: "API", bn: "এপিআই" },
      { en: "config", bn: "কনফিগ" }, { en: "install", bn: "ইনস্টল" }, { en: "update", bn: "আপডেট" },
      { en: "crash", bn: "ক্র্যাশ" }, { en: "log", bn: "লগ" }, { en: "terminal", bn: "টার্মিনাল" },
      { en: "script", bn: "স্ক্রিপ্ট" }, { en: "library", bn: "লাইব্রেরি" }, { en: "package", bn: "প্যাকেজ" },
      { en: "framework", bn: "ফ্রেমওয়ার্ক" }, { en: "environment", bn: "এনভায়রনমেন্ট" }, { en: "version", bn: "ভার্সন" },
      { en: "test", bn: "টেস্ট" }, { en: "feature", bn: "ফিচার" }, { en: "code", bn: "কোড" },
      { en: "program", bn: "প্রোগ্রাম" }, { en: "compiler", bn: "কম্পাইলার" }, { en: "runtime", bn: "রানটাইম" },
      { en: "memory", bn: "মেমোরি" }, { en: "cache", bn: "ক্যাশ" }, { en: "token", bn: "টোকেন" },
      { en: "request", bn: "রিকোয়েস্ট" }, { en: "response", bn: "রেস্পন্স" }, { en: "query", bn: "কোয়েরি" },
      { en: "schema", bn: "স্কিমা" }, { en: "deploy", bn: "ডিপ্লয়" }, { en: "release", bn: "রিলিজ" },
      { en: "patch", bn: "প্যাচ" }, { en: "dependency", bn: "ডিপেন্ডেন্সি" }, { en: "module", bn: "মডিউল" },
      { en: "interface", bn: "ইন্টারফেস" }, { en: "async", bn: "অ্যাসিঙ্ক" }, { en: "promise", bn: "প্রমিস" },
      { en: "callback", bn: "কলব্যাক" }, { en: "event", bn: "ইভেন্ট" }, { en: "state", bn: "স্টেট" },
      { en: "render", bn: "রেন্ডার" }, { en: "cache", bn: "ক্যাশ" }, { en: "index", bn: "ইনডেক্স" },
      { en: "loop", bn: "লুপ" }, { en: "array", bn: "অ্যারে" }, { en: "object", bn: "অবজেক্ট" },
      { en: "string", bn: "স্ট্রিং" }, { en: "boolean", bn: "বুলিয়ান" }, { en: "null", bn: "নাল" },
      { en: "undefined", bn: "আনডেফাইন্ড" }, { en: "syntax", bn: "সিনট্যাক্স" }, { en: "stack", bn: "স্ট্যাক" },
      { en: "queue", bn: "কিউ" }, { en: "thread", bn: "থ্রেড" }, { en: "process", bn: "প্রসেস" },
      { en: "kernel", bn: "কার্নেল" }, { en: "cluster", bn: "ক্লাস্টার" }, { en: "docker", bn: "ডকার" },
      { en: "kubernetes", bn: "কুবারনেটিস" }, { en: "pipeline", bn: "পাইপলাইন" }, { en: "CI", bn: "সিআই" },
      { en: "CD", bn: "সিডি" }, { en: "lint", bn: "লিন্ট" }, { en: "refactor", bn: "রিফ্যাক্টর" },
      { en: "schema", bn: "স্কিমা" }, { en: "endpoint", bn: "এন্ডপয়েন্ট" }, { en: "payload", bn: "পেলোড" },
      { en: "header", bn: "হেডার" }, { en: "cookie", bn: "কুকি" }, { en: "session", bn: "সেশন" },
      { en: "auth", bn: "অথ" }, { en: "token", bn: "টোকেন" }, { en: "route", bn: "রাউট" }
    ]
  };

  /* ---------- Module C: Grammar & Sentence Patterns ---------- */
  // each pattern: id, pattern, meaning (bn), examples[], exercise {sentence, blank, options[], answer}
  const PATTERNS = [
    {
      id: "p1", pattern: "I want to ___", meaning: "আমি ___ চাই",
      examples: ["I want to eat.", "I want to learn English.", "I want to sleep."],
      exercise: { sentence: "I want to ___", blank: true, options: ["eat", "eats", "ate", "eating"], answer: "eat" }
    },
    {
      id: "p2", pattern: "I am going to ___", meaning: "আমি ___ যাচ্ছি",
      examples: ["I am going to work.", "I am going to the market.", "I am going to sleep."],
      exercise: { sentence: "I am going to ___", blank: true, options: ["go", "went", "gone", "going"], answer: "go" }
    },
    {
      id: "p3", pattern: "Can you ___?", meaning: "তুমি কি ___ পারো?",
      examples: ["Can you help me?", "Can you open the door?", "Can you speak slowly?"],
      exercise: { sentence: "Can you ___ me?", blank: true, options: ["help", "helping", "helped", "helps"], answer: "help" }
    },
    {
      id: "p4", pattern: "Could you please ___?", meaning: "দয়া করে কি তুমি ___?",
      examples: ["Could you please wait?", "Could you please repeat?", "Could you please send the file?"],
      exercise: { sentence: "Could you please ___?", blank: true, options: ["wait", "waiting", "waited", "waits"], answer: "wait" }
    },
    {
      id: "p5", pattern: "How do I ___?", meaning: "আমি কীভাবে ___?",
      examples: ["How do I install this?", "How do I open the terminal?", "How do I fix this bug?"],
      exercise: { sentence: "How do I ___ this?", blank: true, options: ["open", "opened", "opening", "opens"], answer: "open" }
    },
    {
      id: "p6", pattern: "What is ___?", meaning: "___ কী?",
      examples: ["What is your name?", "What is a bug?", "What is the time?"],
      exercise: { sentence: "What is your ___?", blank: true, options: ["name", "names", "naming", "named"], answer: "name" }
    },
    {
      id: "p7", pattern: "I think ___", meaning: "আমি মনে করি ___",
      examples: ["I think it is correct.", "I think he is right.", "I think this is a bug."],
      exercise: { sentence: "I think it is ___", blank: true, options: ["correct", "correctly", "correcting", "correction"], answer: "correct" }
    },
    {
      id: "p8", pattern: "I don't think ___", meaning: "আমি মনে করি না ___",
      examples: ["I don't think so.", "I don't think it works.", "I don't think he knows."],
      exercise: { sentence: "I don't think ___ works.", blank: true, options: ["it", "its", "it's", "its'"], answer: "it" }
    },
    {
      id: "p9", pattern: "I have ___ / I don't have ___", meaning: "আমার আছে ___ / নেই ___",
      examples: ["I have a book.", "I don't have time.", "I have a question."],
      exercise: { sentence: "I ___ a question.", blank: true, options: ["have", "has", "having", "had"], answer: "have" }
    },
    {
      id: "p10", pattern: "I am ___-ing", meaning: "আমি এখন ___ করছি (present continuous)",
      examples: ["I am reading a book.", "I am writing code.", "I am learning English."],
      exercise: { sentence: "I am ___ code.", blank: true, options: ["writing", "write", "wrote", "writes"], answer: "writing" }
    },
    {
      id: "p11", pattern: "I ___-ed yesterday", meaning: "আমি গতকাল ___ করেছি (simple past)",
      examples: ["I worked yesterday.", "I fixed the bug yesterday.", "I slept early yesterday."],
      exercise: { sentence: "I ___ yesterday.", blank: true, options: ["worked", "work", "working", "works"], answer: "worked" }
    },
    {
      id: "p12", pattern: "I will ___ tomorrow", meaning: "আমি কাল ___ করব (simple future)",
      examples: ["I will deploy tomorrow.", "I will learn more.", "I will call you tomorrow."],
      exercise: { sentence: "I will ___ tomorrow.", blank: true, options: ["deploy", "deployed", "deploying", "deploys"], answer: "deploy" }
    },
    {
      id: "p13", pattern: "There is / There are ___", meaning: "আছে ___ (একবচন/বহুবচন)",
      examples: ["There is a bug in the code.", "There are many files.", "There is a meeting at 3."],
      exercise: { sentence: "There ___ a bug in the code.", blank: true, options: ["is", "are", "be", "am"], answer: "is" }
    },
    {
      id: "p14", pattern: "Why did you ___?", meaning: "তুমি কেন ___ করেছ?",
      examples: ["Why did you close the file?", "Why did you change this?", "Why did you leave?"],
      exercise: { sentence: "Why did you ___ the file?", blank: true, options: ["close", "closed", "closing", "closes"], answer: "close" }
    },
    {
      id: "p15", pattern: "Because ___", meaning: "কারণ ___",
      examples: ["Because it is broken.", "Because I was busy.", "Because the test failed."],
      exercise: { sentence: "Because the test ___", blank: true, options: ["failed", "fail", "failing", "fails"], answer: "failed" }
    }
  ];

  /* ---------- Module D: Reading ---------- */
  // passages: { title, level, text, questions: [{q, options[], answer}] }
  // gloss: small word->bn meaning lookup used on tap-to-look-up
  const PASSAGES = [
    {
      title: "My name is Rani", level: "Beginner",
      text: "My name is Rani. I am a developer. I write code every day. I like my work.",
      questions: [
        { q: "What is her name?", options: ["Rani", "Rita", "Runa"], answer: "Rani" },
        { q: "What does she do?", options: ["Doctor", "Developer", "Teacher"], answer: "Developer" }
      ]
    },
    {
      title: "Starting the day", level: "Beginner+",
      text: "I open my laptop in the morning. I start the terminal. I read my emails. Then I begin to write code for my project.",
      questions: [
        { q: "When does she open the laptop?", options: ["Night", "Morning", "Evening"], answer: "Morning" },
        { q: "What does she start?", options: ["Browser", "Terminal", "Game"], answer: "Terminal" }
      ]
    },
    {
      title: "What is a bug?", level: "Intermediate",
      text: "A bug is a mistake in the code. The program does not work correctly. A developer finds the bug and fixes it. This is called debugging.",
      questions: [
        { q: "What is a bug?", options: ["A feature", "A mistake in code", "A computer"], answer: "A mistake in code" },
        { q: "Fixing a bug is called...", options: ["compiling", "debugging", "deploying"], answer: "debugging" }
      ]
    },
    {
      title: "Pushing code to GitHub", level: "Intermediate",
      text: "I write a new feature. I commit my changes. Then I push the code to GitHub. My team can see the update and review it.",
      questions: [
        { q: "What do you do after writing a feature?", options: ["Deploy", "Commit changes", "Delete code"], answer: "Commit changes" },
        { q: "Where do you push the code?", options: ["GitHub", "Terminal", "Local file"], answer: "GitHub" }
      ]
    },
    {
      title: "Debugging a crash", level: "Advanced",
      text: "The app crashed at startup. I opened the logs and found a null pointer error. I traced the stack and located the bad request. After the fix, the build passed and I deployed again.",
      questions: [
        { q: "Where did he find the error?", options: ["In the UI", "In the logs", "In an email"], answer: "In the logs" },
        { q: "What happened after the fix?", options: ["The build failed", "The build passed", "Nothing changed"], answer: "The build passed" }
      ]
    },
    {
      title: "Deploying an app update", level: "Advanced",
      text: "We released a new version of the app. The pipeline built the package and ran the tests. The CD step deployed it to the server. Users got the update without any downtime.",
      questions: [
        { q: "What ran the tests?", options: ["The pipeline", "The user", "The bug"], answer: "The pipeline" },
        { q: "What did users experience?", options: ["Downtime", "No downtime", "A crash"], answer: "No downtime" }
      ]
    }
  ];

  // gloss used for tap-to-look-up in Module D (and pasted text)
  const GLOSS = {
    "name": "নাম", "developer": "ডেভেলপার", "code": "কোড", "day": "দিন", "work": "কাজ",
    "laptop": "ল্যাপটপ", "morning": "সকাল", "terminal": "টার্মিনাল", "emails": "ইমেইল",
    "project": "প্রজেক্ট", "bug": "বাগ", "mistake": "ভুল", "program": "প্রোগ্রাম",
    "correctly": "সঠিকভাবে", "finds": "খুঁজে পায়", "fixes": "ঠিক করে", "called": "বলা হয়",
    "debugging": "ডিবাগিং", "feature": "ফিচার", "commit": "কমিট", "changes": "পরিবর্তন",
    "push": "পুশ", "team": "টিম", "update": "আপডেট", "review": "রিভিউ", "app": "অ্যাপ",
    "crashed": "ক্র্যাশ করেছে", "startup": "শুরুতে", "logs": "লগ", "found": "খুঁজে পেয়েছে",
    "null": "নাল/খালি", "pointer": "পয়েন্টার", "error": "এরর", "traced": "খুঁজে বের করেছে",
    "stack": "স্ট্যাক", "located": "খুঁজে পেয়েছে", "bad": "খারাপ", "request": "রিকোয়েস্ট",
    "build": "বিল্ড", "passed": "পাস করেছে", "deployed": "ডিপ্লয় করেছে", "released": "রিলিজ করেছে",
    "version": "ভার্সন", "pipeline": "পাইপলাইন", "package": "প্যাকেজ", "tests": "টেস্ট",
    "server": "সার্ভার", "users": "ইউজাররা", "downtime": "ডাউনটাইম", "without": "ছাড়া",
    "new": "নতুন", "my": "আমার", "every": "প্রতি", "like": "পছন্দ", "then": "তখন",
    "begin": "শুরু", "write": "লেখা", "open": "খোলা", "start": "শুরু", "read": "পড়া"
  };

  /* ---------- Module E: Speaking prompts ---------- */
  const FREE_TALK_PROMPTS = [
    "আজকের কাজ সম্পর্কে বলো (Talk about today's work)",
    "উইকেন্ড প্ল্যান (Weekend plans)",
    "তোমার প্রিয় টুল/ভাষা (Your favorite tool/language)",
    "একটা বাগ ঠিক করার গল্প (A story about fixing a bug)",
    "তুমি কী শিখছ (What you are learning)"
  ];

  /* ---------- Module F: Writing ---------- */
  const COMMIT_PRACTICE = [
    { bn: "তুমি একটা login বাগ ঠিক করেছ", en: "Fix login bug" },
    { bn: "তুমি একটা নতুন API endpoint যোগ করেছ", en: "Add new API endpoint" },
    { bn: "তুমি README আপডেট করেছ", en: "Update README" },
    { bn: "তুমি ডেটাবেস স্কিমা বদলেছ", en: "Change database schema" },
    { bn: "তুমি ক্র্যাশ ফিক্স করে রিলিজ দিয়েছ", en: "Fix crash and release" }
  ];

  // common mistakes Bengali speakers make — self-review checklist
  const COMMON_MISTAKES = [
    "a/an/the — বিশেষ্যের আগে article বসানো (a book, an apple, the server)",
    "Subject-verb agreement — He go → He goes",
    "Preposition — on/in/at ভুল (at 3pm, in the morning, on Monday)",
    "Present continuous — I am work → I am working",
    "Past tense — yesterday-এ verb + ed (I work → I worked)",
    "Word order — 'I also am' → 'I am also'",
    "Since/for — since + time point, for + duration",
    "Much/many — uncountable vs countable",
    "This/these — একবচন/বহুবচন মিল",
    "There/their/they're — অর্থ ও বানান গুলিয়ে ফেলা"
  ];

  return {
    ALPHABET, COMMON_WORDS, VOCAB, PATTERNS, PASSAGES, GLOSS,
    FREE_TALK_PROMPTS, COMMIT_PRACTICE, COMMON_MISTAKES
  };
})();

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
    { l: "Q", word: "Queen",       note: "ক + য়ু মিলে 'কুইন' (q সবসময় u-এর সঙ্গে)" },
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
    { en: "not", bn: "না" }, { en: "on", bn: "উপরে" }, { en: "with", bn: "সঙ্গে" },
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

  // extra vocabulary (expanded word bank)
  VOCAB.daily.push(
    { en: "eat", bn: "খাওয়া" }, { en: "sleep", bn: "ঘুম" }, { en: "run", bn: "দৌড়" },
    { en: "walk", bn: "হাঁটা" }, { en: "read", bn: "পড়া" }, { en: "write", bn: "লেখা" },
    { en: "speak", bn: "কথা বলা" }, { en: "listen", bn: "শোনা" }, { en: "love", bn: "ভালোবাসা" },
    { en: "hate", bn: "ঘৃণা" }, { en: "need", bn: "প্রয়োজন" }, { en: "sit", bn: "বসা" },
    { en: "stand", bn: "দাঁড়ানো" }, { en: "open", bn: "খোলা" }, { en: "close", bn: "বন্ধ" },
    { en: "sell", bn: "বিক্রি" }, { en: "pay", bn: "দেওয়া" }, { en: "cost", bn: "দাম" },
    { en: "cheap", bn: "সস্তা" }, { en: "expensive", bn: "দামি" }, { en: "near", bn: "কাছে" },
    { en: "far", bn: "দূরে" }, { en: "fast", bn: "দ্রুত" }, { en: "slow", bn: "ধীরে" },
    { en: "early", bn: "সকালে/আগে" }, { en: "late", bn: "দেরি" }, { en: "clean", bn: "পরিষ্কার" },
    { en: "dirty", bn: "নোংরা" }, { en: "big", bn: "বড়" }, { en: "small", bn: "ছোট" },
    { en: "old", bn: "পুরনো" }, { en: "young", bn: "তরুণ" }, { en: "beautiful", bn: "সুন্দর" },
    { en: "laugh", bn: "হাসা" }, { en: "cry", bn: "কাঁদা" }, { en: "wait", bn: "অপেক্ষা" },
    { en: "meet", bn: "দেখা" }, { en: "call", bn: "ফোন/ডাক" }, { en: "watch", bn: "দেখা" },
    { en: "play", bn: "খেলা" }, { en: "game", bn: "খেলা" }
  );
  VOCAB.tech.push(
    { en: "css", bn: "সিএসএস" }, { en: "html", bn: "এইচটিএমএল" }, { en: "json", bn: "জেসন" },
    { en: "linux", bn: "লিনাক্স" }, { en: "git", bn: "গিট" }, { en: "ssh", bn: "এসএসএসএইচ" },
    { en: "http", bn: "এইচটিটিপি" }, { en: "url", bn: "ইউআরএল" }, { en: "domain", bn: "ডোমেইন" },
    { en: "host", bn: "হোস্ট" }, { en: "client", bn: "ক্লায়েন্ট" }, { en: "frontend", bn: "ফ্রন্টএন্ড" },
    { en: "backend", bn: "ব্যাকএন্ড" }, { en: "latency", bn: "লেটেন্সি" }, { en: "proxy", bn: "প্রক্সি" },
    { en: "encrypt", bn: "এনক্রিপ্ট" }, { en: "decrypt", bn: "ডিক্রিপ্ট" }, { en: "container", bn: "কন্টেইনার" },
    { en: "image", bn: "ইমেজ" }, { en: "pod", bn: "পড" }, { en: "widget", bn: "উইজেট" },
    { en: "plugin", bn: "প্লাগিন" }, { en: "middleware", bn: "মিডলওয়্যার" }, { en: "bandwidth", bn: "ব্যান্ডউইথ" },
    { en: "packet", bn: "প্যাকেট" }, { en: "socket", bn: "সকেট" }, { en: "enum", bn: "এনাম" },
    { en: "generic", bn: "জেনেরিক" }
  );

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
    },
    {
      id: "p16", pattern: "I have been ___-ing", meaning: "আমি এতক্ষণ ___ করছি (present perfect continuous)",
      examples: ["I have been learning.", "I have been waiting.", "I have been coding."],
      exercise: { sentence: "I have been ___ all day.", blank: true, options: ["coding", "code", "coded", "codes"], answer: "coding" }
    },
    {
      id: "p17", pattern: "If I ___ , I would ___", meaning: "যদি আমি ___ হতাম, আমি ___ (second conditional)",
      examples: ["If I were rich, I would travel.", "If I had time, I would help.", "If I knew, I would tell you."],
      exercise: { sentence: "If I ___ rich, I would travel.", blank: true, options: ["were", "am", "is", "be"], answer: "were" }
    },
    {
      id: "p18", pattern: "He/She ___-s", meaning: "সে ___ করে (third-person singular)",
      examples: ["He writes code.", "She speaks English.", "He likes coffee."],
      exercise: { sentence: "He ___ code.", blank: true, options: ["writes", "write", "wrote", "writing"], answer: "writes" }
    },
    {
      id: "p19", pattern: "Let's ___", meaning: "চলো ___ (suggestion)",
      examples: ["Let's go.", "Let's eat.", "Let's study together."],
      exercise: { sentence: "Let's ___ together.", blank: true, options: ["study", "studies", "studied", "studying"], answer: "study" }
    },
    {
      id: "p20", pattern: "I used to ___", meaning: "আমি আগে ___ করতাম (past habit)",
      examples: ["I used to smoke.", "I used to live in Kolkata.", "I used to play cricket."],
      exercise: { sentence: "I used to ___ in Kolkata.", blank: true, options: ["live", "lived", "living", "lives"], answer: "live" }
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
    "একটা মেয়ের সঙ্গে কথা শুরু করো (Start a talk with a girl)",
    "কফি শপে অর্ডার করো (Order at a coffee shop)",
    "বন্ধুর সঙ্গে আড্ডা (Chat with a friend)",
    "কাউকে কমপ্লিমেন্ট দাও (Give someone a compliment)",
    "ছুটির পরিকল্পনা জিজ্ঞেস করো (Ask about weekend plans)",
    "আজকের কাজ সম্পর্কে বলো (Talk about today's work)",
    "উইকেন্ড প্ল্যান (Weekend plans)",
    "তোমার প্রিয় টুল/ভাষা (Your favorite tool/language)",
    "একটা বাগ ঠিক করার গল্প (A story about fixing a bug)",
    "তুমি কী শিখছ (What you are learning)"
  ];

  /* ---------- Module H: Daily Conversations ---------- */
  // each: { title (bn), en (scene), lines: [{who, en, bn}] }
  const CONVERSATIONS = [
    {
      title: "বন্ধুর সঙ্গে আড্ডা", en: "Small talk with a friend",
      lines: [
        { who: "তুমি", en: "Hey! How are you today?", bn: "হাই! আজ তুমি কেমন আছো?" },
        { who: "বন্ধু", en: "I'm good, thanks. And you?", bn: "আমি ভালো, ধন্যবাদ। আর তুমি?" },
        { who: "তুমি", en: "I'm great. The weather is nice.", bn: "আমি দারুণ। আবহাওয়া ভালো।" },
        { who: "বন্ধু", en: "Yes, let's sit outside.", bn: "হ্যাঁ, চলো বাইরে বসি।" }
      ]
    },
    {
      title: "একটা মেয়ের সঙ্গে কথা", en: "Talking with a girl",
      lines: [
        { who: "তুমি", en: "Hi, I'm Rani. What's your name?", bn: "হাই, আমি রানি। তোমার নাম কী?" },
        { who: "মেয়ে", en: "I'm Aisha. Nice to meet you.", bn: "আমি আয়শা। তোমাকে জানতে ভালো লাগলো।" },
        { who: "তুমি", en: "Nice to meet you too. Do you like this cafe?", bn: "আমারও। তুমি এই কাফেটা পছন্দ করো?" },
        { who: "মেয়ে", en: "Yes, the coffee is really good.", bn: "হ্যাঁ, কফিটা খুব ভালো।" },
        { who: "তুমি", en: "Cool. Can I sit with you?", bn: "দারুণ। আমি তোমার সঙ্গে বসতে পারি?" }
      ]
    },
    {
      title: "কফি শপে", en: "At a coffee shop",
      lines: [
        { who: "তুমি", en: "Hi, can I get a latte, please?", bn: "হাই, একটা লেট পাবো?" },
        { who: "বেরিস্তা", en: "Sure. Small or large?", bn: "অবশ্যই। ছোট নাকি বড়?" },
        { who: "তুমি", en: "Large, please.", bn: "বড়, দয়া করে।" },
        { who: "বেরিস্তা", en: "Anything else?", bn: "আর কিছু?" },
        { who: "তুমি", en: "No, that's all. Thank you.", bn: "না, এটুকুই। ধন্যবাদ।" }
      ]
    },
    {
      title: "ছুটির পরিকল্পনা", en: "Weekend plans",
      lines: [
        { who: "তুমি", en: "What are you doing this weekend?", bn: "এই সপ্তাহান্তে তুমি কী করছো?" },
        { who: "বন্ধু", en: "Maybe a movie. Want to join?", bn: "হয়তো সিনেমা। যোগ দেবে?" },
        { who: "তুমি", en: "Sure! What time?", bn: "অবশ্যই! কটায়?" },
        { who: "বন্ধু", en: "Saturday, 7 pm.", bn: "শনিবার, সন্ধ্যা ৭টায়।" }
      ]
    },
    {
      title: "পথ চাওয়া", en: "Asking for directions",
      lines: [
        { who: "তুমি", en: "Excuse me, where is the station?", bn: "সরি, স্টেশন কোথায়?" },
        { who: "পথচারী", en: "Go straight, then turn left.", bn: "সোজা যাও, তারপর বামে ঘুরো।" },
        { who: "তুমি", en: "Thank you very much!", bn: "খুব ধন্যবাদ!" },
        { who: "পথচারী", en: "You're welcome.", bn: "নাহ, ধন্যবাদ নয়।" }
      ]
    },
    {
      title: "প্রশংসা করা", en: "Giving a compliment",
      lines: [
        { who: "তুমি", en: "I love your dress!", bn: "তোমার ড্রেসটা খুব সুন্দর!" },
        { who: "মেয়ে", en: "Oh, thank you!", bn: "ওহ, ধন্যবাদ!" },
        { who: "তুমি", en: "Where did you get it?", bn: "কোথা থেকে নিয়েছো?" },
        { who: "মেয়ে", en: "From the market nearby.", bn: "কাছের বাজার থেকে।" }
      ]
    },
    {
      title: "ফোনে কথা", en: "On the phone",
      lines: [
        { who: "তুমি", en: "Hello, is Rina there?", bn: "হ্যালো, রিনা আছে?" },
        { who: "সহকর্মী", en: "She's busy right now.", bn: "সে এখন ব্যস্ত।" },
        { who: "তুমি", en: "Okay, I'll call later.", bn: "ঠিক আছে, পরে ফোন করবো।" },
        { who: "সহকর্মী", en: "Sure, bye.", bn: "ঠিক আছে, বাই।" }
      ]
    },
    {
      title: "বিদায়", en: "Saying goodbye",
      lines: [
        { who: "তুমি", en: "It was nice meeting you.", bn: "তোমাকে জানতে ভালো লাগলো।" },
        { who: "মেয়ে", en: "Same here. See you soon!", bn: "আমারও। শিগগির দেখা হবে!" },
        { who: "তুমি", en: "Take care. Bye!", bn: "ভালো থেকো। বাই!" }
      ]
    }
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

  /* ---------- Module H: Interactive conversation trees ---------- */
  // branching dialogue: partner says `bot`, user replies via mic or chip;
  // reply is matched by `hear` keywords -> partner responds with `say` (and asks next via `goto`).
  const CONV_TREES = [
    {
      title: "একটা মেয়ের সঙ্গে কথা", en: "Talking with a girl",
      start: "a",
      nodes: {
        a: { bot: "Hi, I'm Rani. What's your name?", bn: "হাই, আমি রানি। তোমার নাম কী?",
          options: [
            { you: "My name is...", hear: ["my name", "i am", "i'm", "name is"], say: "Nice to meet you! Do you come here often?", bn: "তোমাকে জানতে ভালো লাগলো! তুমি কি এখানে নিয়মিত আসো?" },
            { you: "(সাধারণ উত্তর)", hear: ["*"], say: "Haha, nice to meet you! Do you come here often?", bn: "হাহা, তোমাকে জানতে ভালো লাগলো! তুমি কি এখানে নিয়মিত আসো?" }
          ] },
        b: { bot: "Do you come here often?", bn: "তুমি কি এখানে নিয়মিত আসো?",
          options: [
            { you: "Yes, often", hear: ["yes", "yeah", "often", "always", "every"], say: "Me too! The coffee here is really good. Can I sit with you?", bn: "আমিও! এখানকার কফি খুব ভালো। আমি তোমার সঙ্গে বসতে পারি?" },
            { you: "No, first time", hear: ["no", "not", "first", "never"], say: "Me neither, first time. But the coffee is good. Can I sit with you?", bn: "আমিও না, প্রথমবার। তবে কফি ভালো। আমি তোমার সঙ্গে বসতে পারি?" },
            { you: "(অন্য কিছু)", hear: ["*"], say: "Oh okay. The coffee is good though. Can I sit with you?", bn: "ওহ ঠিক আছে। কফি ভালো। আমি তোমার সঙ্গে বসতে পারি?" }
          ] },
        c: { bot: "Can I sit with you?", bn: "আমি তোমার সঙ্গে বসতে পারি?",
          options: [
            { you: "Sure, please", hear: ["yes", "sure", "okay", "please", "why not"], say: "Great! So, what do you do for work?", bn: "দারুণ! তাহলে, তুমি কী কাজ করো?" },
            { you: "Sorry, I'm busy", hear: ["no", "busy", "later"], say: "No worries! Maybe another time. Bye!", bn: "কোনো সমস্যা নয়! হয়তো আরেকদিন। বাই!", end: true },
            { you: "(অন্য কিছু)", hear: ["*"], say: "Great! So, what do you do for work?", bn: "দারুণ! তাহলে, তুমি কী কাজ করো?" }
          ] },
        d: { bot: "What do you do for work?", bn: "তুমি কী কাজ করো?",
          options: [
            { you: "(যা কাজ করো)", hear: ["*"], say: "That's cool! Nice talking to you. See you around!", bn: "এটা দারুণ! তোমার সঙ্গে কথা বলে ভালো লাগলো। পরে দেখা হবে!", end: true }
          ] }
      }
    },
    {
      title: "বন্ধুর সঙ্গে আড্ডা", en: "Small talk with a friend",
      start: "s1",
      nodes: {
        s1: { bot: "Hey! How are you today?", bn: "হাই! আজ তুমি কেমন আছো?",
          options: [
            { you: "I'm good, thanks", hear: ["good", "fine", "great", "well", "okay"], say: "I'm great too. The weather is nice, right?", bn: "আমিও দারুণ। আবহাওয়া ভালো, তাই না?" },
            { you: "Not so good", hear: ["not", "bad", "tired", "sick", "sad"], say: "Oh no, what happened? Hope you feel better.", bn: "ওহ না, কী হয়েছে? আশা করি ভালো হয়ে যাবে।" },
            { you: "(সাধারণ)", hear: ["*"], say: "I'm great too. The weather is nice, right?", bn: "আমিও দারুণ। আবহাওয়া ভালো, তাই না?" }
          ] },
        s2: { bot: "The weather is nice, right?", bn: "আবহাওয়া ভালো, তাই না?",
          options: [
            { you: "Yes, it's nice", hear: ["yes", "yeah", "nice", "sunny"], say: "Let's sit outside and chat!", bn: "চলো বাইরে বসে আড্ডা দিই!", end: true },
            { you: "Not really", hear: ["no", "not", "cold", "hot"], say: "Haha, maybe inside then. Chat with me!", bn: "হাহা, তাহলে ভেতরে। আমার সঙ্গে আড্ডা দাও!", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Let's sit outside and chat!", bn: "চলো বাইরে বসে আড্ডা দিই!", end: true }
          ] }
      }
    },
    {
      title: "কফি শপে", en: "At a coffee shop",
      start: "c1",
      nodes: {
        c1: { bot: "Hi, what can I get for you?", bn: "হাই, আপনাকে কী দেব?",
          options: [
            { you: "A latte, please", hear: ["latte", "coffee", "tea", "cappuccino"], say: "Sure! Small or large?", bn: "অবশ্যই! ছোট নাকি বড়?" },
            { you: "Just water", hear: ["water"], say: "Okay, coming right up!", bn: "ঠিক আছে, এখুনি আনছি!", end: true },
            { you: "I'll look first", hear: ["*"], say: "No rush, take your time.", bn: "তাড়া নেই, সময় নাও।" }
          ] },
        c2: { bot: "Small or large?", bn: "ছোট নাকি বড়?",
          options: [
            { you: "Large, please", hear: ["large", "big"], say: "Great. Anything else?", bn: "দারুণ। আর কিছু?" },
            { you: "Small", hear: ["small"], say: "Great. Anything else?", bn: "দারুণ। আর কিছু?" },
            { you: "(মাঝারি)", hear: ["*"], say: "Great. Anything else?", bn: "দারুণ। আর কিছু?" }
          ] },
        c3: { bot: "Anything else?", bn: "আর কিছু?",
          options: [
            { you: "No, that's all", hear: ["no", "nothing", "all", "that's"], say: "Perfect, that'll be 4 taka. Thank you!", bn: "দারুণ, ৪ টাকা হবে। ধন্যবাদ!", end: true },
            { you: "Yes, a cake", hear: ["yes", "cake", "cookie", "muffin"], say: "Sure! That'll be 6 taka. Thank you!", bn: "অবশ্যই! ৬ টাকা হবে। ধন্যবাদ!", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Perfect, that'll be 4 taka. Thank you!", bn: "দারুণ, ৪ টাকা হবে। ধন্যবাদ!", end: true }
          ] }
      }
    },
    {
      title: "ছুটির পরিকল্পনা", en: "Weekend plans",
      start: "w1",
      nodes: {
        w1: { bot: "What are you doing this weekend?", bn: "এই সপ্তাহান্তে তুমি কী করছো?",
          options: [
            { you: "Maybe a movie", hear: ["movie", "cinema", "film"], say: "Nice! Want to join me?", bn: "সুন্দর! আমার সঙ্গে যোগ দেবে?" },
            { you: "Nothing much", hear: ["nothing", "rest", "home", "not"], say: "Then come with me to a movie!", bn: "তাহলে আমার সঙ্গে সিনেমায় চলো!" },
            { you: "I'll see", hear: ["*"], say: "Maybe a movie? Want to join me?", bn: "হয়তো সিনেমা? আমার সঙ্গে যোগ দেবে?" }
          ] },
        w2: { bot: "Want to join me?", bn: "আমার সঙ্গে যোগ দেবে?",
          options: [
            { you: "Sure, what time?", hear: ["sure", "yes", "okay", "time"], say: "Saturday, 7 pm. Deal?", bn: "শনিবার, সন্ধ্যা ৭টায়। ঠিক আছে?" },
            { you: "Sorry, busy", hear: ["busy", "sorry", "no", "can't"], say: "No worries, another time! Bye!", bn: "কোনো সমস্যা নয়, আরেকদিন! বাই!", end: true },
            { you: "Maybe", hear: ["*"], say: "Saturday, 7 pm. Deal?", bn: "শনিবার, সন্ধ্যা ৭টায়। ঠিক আছে?" }
          ] },
        w3: { bot: "Saturday, 7 pm. Deal?", bn: "শনিবার, সন্ধ্যা ৭টায়। ঠিক আছে?",
          options: [
            { you: "Deal! See you", hear: ["deal", "yes", "see", "okay"], say: "Awesome, see you Saturday!", bn: "দারুণ, শনিবার দেখা হবে!", end: true },
            { you: "Let me check", hear: ["*"], say: "Sure, text me later. Bye!", bn: "ঠিক আছে, পরে মেসেজ দিও। বাই!", end: true }
          ] }
      }
    },
    {
      title: "পথ চাওয়া", en: "Asking for directions",
      start: "d1",
      nodes: {
        d1: { bot: "Excuse me, where is the station?", bn: "সরি, স্টেশন কোথায়?",
          options: [
            { you: "Go straight, then left", hear: ["straight", "left", "right", "turn"], say: "Thank you very much!", bn: "খুব ধন্যবাদ!" },
            { you: "Sorry, I don't know", hear: ["don't", "no", "sorry", "not"], say: "That's okay, I'll ask someone else. Thanks!", bn: "কোনো সমস্যা নয়, অন্যজনকে জিজ্ঞেস করবো। ধন্যবাদ!", end: true },
            { you: "I'm not sure", hear: ["*"], say: "No worries, thanks anyway!", bn: "কোনো সমস্যা নয়, ধন্যবাদ!", end: true }
          ] }
      }
    },
    {
      title: "একটা মেয়েকে প্রশংসা", en: "Complimenting a girl",
      start: "c1",
      nodes: {
        c1: { bot: "I love your dress! It looks really nice.", bn: "তোমার ড্রেসটা খুব সুন্দর! দারুণ লাগছে।",
          options: [
            { you: "Thank you!", hear: ["thank", "thanks", "thx"], say: "Where did you get it from?", bn: "কোথা থেকে নিয়েছো?" },
            { you: "Oh, this old one?", hear: ["old", "just", "nothing"], say: "Haha, it suits you! Where did you get it?", bn: "হাহা, তোমাকে ভালো লাগছে! কোথা থেকে নিয়েছো?" },
            { you: "(সাধারণ)", hear: ["*"], say: "You look great today! Where did you get it?", bn: "তুমি আজ দারুণ দেখাচ্ছো! কোথা থেকে নিয়েছো?" }
          ] },
        c2: { bot: "Where did you get it from?", bn: "কোথা থেকে নিয়েছো?",
          options: [
            { you: "From the market", hear: ["market", "shop", "store", "mall"], say: "Nice! I should visit there too. You have good taste!", bn: "দারুণ! আমাকেও যেতে হবে। তোমার রুচি ভালো!", end: true },
            { you: "My sister gave it", hear: ["sister", "friend", "gift", "brother"], say: "Sweet! Lucky you. You look lovely!", bn: "সুন্দর! ভাগ্যবান। তুমি খুব সুন্দর দেখাচ্ছো!", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Cool! You have great style. See you around!", bn: "দারুণ! তোমার স্টাইল ভালো। পরে দেখা!", end: true }
          ] }
      }
    },
    {
      title: "নাম্বার চাওয়া", en: "Asking for her number",
      start: "n1",
      nodes: {
        n1: { bot: "This was fun. Can I get your number?", bn: "এটা মজার ছিল। তোমার নাম্বারটা পাবো?",
          options: [
            { you: "Sure, here it is", hear: ["sure", "yes", "okay", "here", "why not"], say: "Awesome! I'll text you later. Talk soon!", bn: "দারুণ! পরে মেসেজ দেবো। শিগগির কথা হবে!", end: true },
            { you: "Let's exchange social", hear: ["social", "insta", "facebook", "whatsapp", "exchange"], say: "Good idea! Send me a request. Talk soon!", bn: "ভালো আইডিয়া! রিকোয়েস্ট পাঠাও। শিগগির কথা হবে!", end: true },
            { you: "Sorry, not comfortable", hear: ["sorry", "no", "not", "busy"], say: "No worries at all, I understand. Nice meeting you!", bn: "কোনো সমস্যা নয়, বুঝতে পারছি। তোমাকে জানতে ভালো লাগলো!", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Awesome, text me later! Talk soon!", bn: "দারুণ, পরে মেসেজ দিও! শিগগির কথা হবে!", end: true }
          ] }
      }
    },
    {
      title: "কফি/ডেটে ডাকা", en: "Asking her out",
      start: "o1",
      nodes: {
        o1: { bot: "Want to grab a coffee sometime?", bn: "কখনো কফি খেতে যাবে?",
          options: [
            { you: "I'd love to!", hear: ["love", "yes", "sure", "okay", "want"], say: "Great! How about Saturday evening?", bn: "দারুণ! শনিবার সন্ধ্যেটা কেমন?" },
            { you: "Maybe another time", hear: ["maybe", "later", "not", "busy"], say: "Sure, another time then. Bye!", bn: "ঠিক আছে, আরেকদিন। বাই!", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Great! How about Saturday evening?", bn: "দারুণ! শনিবার সন্ধ্যেটা কেমন?" }
          ] },
        o2: { bot: "How about Saturday evening?", bn: "শনিবার সন্ধ্যেটা কেমন?",
          options: [
            { you: "Saturday works!", hear: ["saturday", "works", "yes", "fine", "good"], say: "Perfect, 7 pm at the cafe. Can't wait!", bn: "দারুণ, সন্ধ্যা ৭টায় কাফেতে। অপেক্ষায় থাকবো!", end: true },
            { you: "Sunday better", hear: ["sunday", "better"], say: "Sunday works too! 7 pm then?", bn: "রবিবারও চলবে! তাহলে ৭টায়?", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Perfect, 7 pm at the cafe. See you!", bn: "দারুণ, সন্ধ্যা ৭টায় কাফেতে। দেখা হবে!", end: true }
          ] }
      }
    },
    {
      title: "অফিসে কথা", en: "Office small talk",
      start: "w1",
      nodes: {
        w1: { bot: "Hey, how's the new project going?", bn: "হাই, নতুন প্রজেক্টটা কেমন যাচ্ছে?",
          options: [
            { you: "Going well", hear: ["well", "good", "great", "fine"], say: "Nice! Any blockers I can help with?", bn: "সুন্দর! কোনো বাধা থাকলে বলো, সাহায্য করতে পারি।" },
            { you: "A bit stressful", hear: ["stress", "hard", "bad", "not", "tough"], say: "Oh, take it easy. We can pair on it if you want.", bn: "ওহ, ধীরে চলো। চাইলে একসঙ্গে করতে পারি।" },
            { you: "(সাধারণ)", hear: ["*"], say: "Nice! Let me know if you need a hand.", bn: "সুন্দর! দরকার হলে বলো।" }
          ] },
        w2: { bot: "Any blockers I can help with?", bn: "কোনো বাধা থাকলে সাহায্য করতে পারি?",
          options: [
            { you: "Yes, the API is tricky", hear: ["yes", "api", "bug", "error", "help"], say: "Let's sync after lunch and fix it together.", bn: "দুপুরের পর একসঙ্গে বসে ঠিক করি।", end: true },
            { you: "No, I'm good", hear: ["no", "not", "fine", "okay"], say: "Cool, good luck with it!", bn: "দারুণ, শুভকামনা!", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Cool, good luck with it!", bn: "দারুণ, শুভকামনা!", end: true }
          ] }
      }
    },
    {
      title: "পার্টিতে আড্ডা", en: "At a party",
      start: "p1",
      nodes: {
        p1: { bot: "Hi! I haven't seen you here before. I'm Rani.", bn: "হাই! তোমাকে এখানে আগে দেখিনি। আমি রানি।",
          options: [
            { you: "Nice to meet you", hear: ["nice", "meet", "hello", "hi"], say: "Same! How do you know the host?", bn: "আমিও! তুমি হোস্টকে চেনো কীভাবে?" },
            { you: "I'm new here", hear: ["new", "first", "friend", "guest"], say: "Welcome! How do you know the host?", bn: "স্বাগত! তুমি হোস্টকে চেনো কীভাবে?" },
            { you: "(সাধারণ)", hear: ["*"], say: "Cool! How do you know the host?", bn: "দারুণ! তুমি হোস্টকে চেনো কীভাবে?" }
          ] },
        p2: { bot: "How do you know the host?", bn: "তুমি হোস্টকে চেনো কীভাবে?",
          options: [
            { you: "We work together", hear: ["work", "office", "job", "college", "school"], say: "Nice! So you're in tech too? Me too!", bn: "সুন্দর! তাহলে তুমিও টেকে? আমিও!", end: true },
            { you: "Old friends", hear: ["friend", "old", "school", "childhood"], say: "Sweet! Small world. Enjoy the party!", bn: "দারুণ! দুনিয়া ছোট। পার্টি উপভোগ করো!", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Cool! Small world. Enjoy the party!", bn: "দারুণ! দুনিয়া ছোট। পার্টি উপভোগ করো!", end: true }
          ] }
      }
    },
    {
      title: "রেস্টুরেন্টে", en: "At a restaurant",
      start: "r1",
      nodes: {
        r1: { bot: "Good evening! Table for one?", bn: "শুভ সন্ধ্যা! একজনের টেবিল?",
          options: [
            { you: "Yes, one please", hear: ["yes", "one", "sure"], say: "Great, follow me. Here's the menu.", bn: "দারুণ, আসো। এই নাও মেনু।" },
            { you: "Actually two", hear: ["two", "friend", "we"], say: "Sure, a table for two then.", bn: "ঠিক আছে, দুজনের টেবিল।" },
            { you: "(সাধারণ)", hear: ["*"], say: "Great, follow me. Here's the menu.", bn: "দারুণ, আসো। এই নাও মেনু।" }
          ] },
        r2: { bot: "Here's the menu. Ready to order?", bn: "এই নাও মেনু। অর্ডার নেবো?",
          options: [
            { you: "I'll have the pasta", hear: ["pasta", "rice", "chicken", "burger", "pizza", "fish"], say: "Good choice! Anything to drink?", bn: "দারুণ পছন্দ! কিছু পানীয়?" },
            { you: "I need a minute", hear: ["minute", "think", "wait", "not"], say: "No rush, I'll come back.", bn: "তাড়া নেই, পরে আসছি।", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Good choice! Anything to drink?", bn: "দারুণ পছন্দ! কিছু পানীয়?" }
          ] },
        r3: { bot: "Anything to drink?", bn: "কিছু পানীয়?",
          options: [
            { you: "Water, thanks", hear: ["water", "just", "nothing"], say: "Coming right up. Enjoy your meal!", bn: "এখুনি আনছি। খাবার অনেক উপভোগ করো!", end: true },
            { you: "A juice, please", hear: ["juice", "coke", "soda", "tea", "coffee"], say: "Sure! Enjoy your meal!", bn: "অবশ্যই! খাবার উপভোগ করো!", end: true },
            { you: "(সাধারণ)", hear: ["*"], say: "Coming right up. Enjoy!", bn: "এখুনি আনছি। উপভোগ করো!", end: true }
          ] }
      }
    }
  ];

  return {
    ALPHABET, COMMON_WORDS, VOCAB, PATTERNS, PASSAGES, GLOSS,
    FREE_TALK_PROMPTS, CONVERSATIONS, CONV_TREES, COMMIT_PRACTICE, COMMON_MISTAKES
  };
})();

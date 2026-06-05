const typingArea = document.querySelector(".typing-area");
const typingInner = document.querySelector(".typing-inner");
const wpmElement = document.querySelector(".wpm-value");
const accuracyElement = document.querySelector(".accuracy-value");
const progressElement = document.querySelector(".progress-value");
const remainingTimeElement = document.querySelector(".remaining-time-value");
const withPunctuation = document.querySelector(".with-punctuation");
const withNumbers = document.querySelector(".with-numbers");
const wordCount = document.querySelector(".word-count");
const customWordCount = document.querySelector(".custom-word-count");
const timeLimit = document.querySelector(".time-limit");
const customTimeLimit = document.querySelector(".custom-time-limit");
const newTextBtn = document.querySelector(".new-text-btn");
const newSessionBtn = document.querySelector(".new-session-btn");
const resultsModal = document.querySelector(".results-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const modalNewBtn = document.querySelector(".modal-new-btn");
const keyboard = document.querySelector(".keyboard");
const selectLang = document.querySelector(".select-lang");

// Текстовые переводы интерфейса
const TRANSLATIONS = {
  ru: {
    title: "Тренажер слепой печати",
    subtitle: "Печатай, не глядя на клавиатуру. Ритм, точность, спокойствие.",
    lblLang: "Язык / Language",
    lblWordCount: "Количество слов",
    lblTimeLimit: "Время (мин)",
    lblPct: "Пунктуация",
    lblNum: "Цифры",
    btnNew: "Начать заново",
    btnSecondary: "Начать заново / настройки",
    hint: "Нажми на область текста и печатай. Backspace работает.",
    statWpm: "Скорость WPM",
    statAcc: "Точность",
    statProg: "Прогресс",
    statTime: "Осталось времени",
    tipWpmT: "WPM (Words Per Minute)",
    tipWpmD: " — скорость в словах в минуту. Стандартное слово считается равным 5 символам.",
    tipCpmT: "CPM (Characters Per Minute)",
    tipCpmD: " — чистая скорость в знаках (символах) в минуту, включая пробелы и знаки препинания.",
    modalTitle: "Анализ тренировки",
    modalRankLbl: "Ваш статус:",
    modalAcc: "Точность",
    modalTime: "Время",
    modalChars: "Всего знаков",
    modalErr: "Ошибок",
    modalWorst: "⚠️ Самая проблемная клавиша:",
    modalBtnNext: "Следующая тренировка",
    modalBtnClose: "Закрыть окно",
    ranks: ["Новичок", "Любитель 💻", "Профессионал 🚀", "Гонщик Киберспорта ⚡", "Мастер Печати 👑"],
    worstNone: "Нет",
    worstCountStr: "ош."
  },
  en: {
    title: "Touch Typing Trainer",
    subtitle: "Type without looking at the keyboard. Rhythm, accuracy, calm.",
    lblLang: "Язык / Language",
    lblWordCount: "Word Count",
    lblTimeLimit: "Time Limit (min)",
    lblPct: "Punctuation",
    lblNum: "Numbers",
    btnNew: "Restart",
    btnSecondary: "Restart / Settings",
    hint: "Click the text area and start typing. Backspace works.",
    statWpm: "Speed WPM",
    statAcc: "Accuracy",
    statProg: "Progress",
    statTime: "Time Remaining",
    tipWpmT: "WPM (Words Per Minute)",
    tipWpmD: " — speed in words per minute. A standard word is defined as 5 characters.",
    tipCpmT: "CPM (Characters Per Minute)",
    tipCpmD: " — net speed in characters per minute, including spaces and punctuation.",
    modalTitle: "Training Analysis",
    modalRankLbl: "Your Status:",
    modalAcc: "Accuracy",
    modalTime: "Time",
    modalChars: "Total Chars",
    modalErr: "Errors",
    modalWorst: "⚠️ Most problematic key:",
    modalBtnNext: "Next Training",
    modalBtnClose: "Close Window",
    ranks: ["Beginner", "Amateur 💻", "Professional 🚀", "Cyber Racer ⚡", "Typing Master 👑"],
    worstNone: "None",
    worstCountStr: "err."
  }
};

// ОГРОМНЫЙ ЗАПАС СЛОВ НА РУССКОМ
const baseWordsRu = [
  "привычка", "ритм", "скорость", "точность", "практика", "внимание", "мышление", "процесс", 
  "печать", "тренировка", "фокус", "экран", "прогресс", "символ", "слово", "клавиша", 
  "позиция", "ладонь", "палец", "пауза", "движение", "навык", "контроль", "осанка", 
  "результат", "человек", "время", "дело", "жизнь", "день", "рука", "работа", "слово", 
  "место", "лицо", "друг", "глаз", "вопрос", "дом", "сторона", "страна", "мир", 
  "случай", "голова", "ребенок", "сила", "конец", "город", "мысль", "часть", "фирма", 
  "земля", "машина", "книга", "право", "связь", "житель", "закон", "рынок", "окно", 
  "стол", "качество", "проект", "развитие", "опыт", "цель", "программа", "система", 
  "обучение", "знание", "наука", "культура", "история", "будущее", "прошлое", "задача", 
  "решение", "успех", "улыбка", "радость", "ошибка", "свобода", "выбор", "желание", 
  "компьютер", "интернет", "браузер", "скрипт", "стиль", "разработка", "дизайн", "логика", 
  "память", "данные", "поток", "информация", "запись", "чтение", "текст", "абзац", 
  "строка", "редактор", "код", "функция", "переменная", "объект", "массив", "метод", 
  "запрос", "ответ", "сервер", "клиент", "сеть", "интерфейс", "шаблон", "элемент", 
  "настройка", "свойство", "событие", "клик", "фокусировка", "клавиатура", "мышь", "курсор", 
  "экран", "монитор", "ноутбук", "планшет", "телефон", "приложение", "игра", "графика", 
  "звук", "видео", "камера", "микрофон", "наушники", "провод", "зарядка", "батарея", 
  "энергия", "свет", "тень", "цвет", "оттенок", "контраст", "яркость", "разрешение", 
  "пиксель", "вектор", "растр", "шрифт", "размер", "отступ", "рамка", "фон", 
  "картинка", "фото", "рисунок", "схема", "таблица", "список", "форма", "кнопка", 
  "ссылка", "меню", "иконка", "логотип", "шапка", "подвал", "полоса", "прокрутка", 
  "окно", "вкладка", "папка", "файл", "документ", "архив", "копия", "оригинал", 
  "безопасность", "пароль", "логин", "аккаунт", "профиль", "почта", "сообщение", "чат", 
  "письмо", "уведомление", "сигнал", "звонок", "встреча", "календарь", "время", "часы", 
  "минута", "секунда", "дата", "год", "месяц", "неделя", "день", "вечер", 
  "утро", "ночь", "полдень", "полночь", "время суток", "сезон", "зима", "весна", 
  "лето", "осень", "погода", "солнце", "луна", "звезда", "небо", "облако", 
  "дождь", "снег", "ветер", "гроза", "туман", "мороз", "жара", "тепло", 
  "холод", "воздух", "вода", "огонь", "земля", "камень", "песок", "глина", 
  "металл", "золото", "серебро", "железо", "медь", "дерево", "трава", "цветок", 
  "лист", "корень", "ветка", "лес", "парк", "сад", "поле", "гора", 
  "холм", "долина", "река", "озеро", "море", "океан", "берег", "пляж", 
  "остров", "волна", "течение", "рыба", "птица", "животное", "зверь", "кошка", 
  "собака", "лошадь", "корова", "птица", "орёл", "совесть", "честность", "доброта"
];

// ОГРОМНЫЙ ЗАПАС СЛОВ НА АНГЛИЙСКОМ
const baseWordsEn = [
  "habit", "rhythm", "speed", "accuracy", "practice", "attention", "thinking", "process", 
  "typing", "training", "focus", "screen", "progress", "symbol", "word", "key", 
  "position", "palm", "finger", "pause", "movement", "skill", "control", "posture", 
  "result", "people", "time", "business", "life", "day", "hand", "work", "word", 
  "place", "face", "friend", "eye", "question", "house", "side", "country", "world", 
  "case", "head", "child", "power", "end", "city", "thought", "part", "company", 
  "earth", "car", "book", "right", "communication", "resident", "law", "market", "window", 
  "table", "quality", "project", "development", "experience", "goal", "program", "system", 
  "education", "knowledge", "science", "culture", "history", "future", "past", "task", 
  "decision", "success", "smile", "joy", "error", "freedom", "choice", "desire", 
  "computer", "internet", "browser", "script", "style", "development", "design", "logic", 
  "memory", "data", "stream", "information", "record", "reading", "text", "paragraph", 
  "string", "editor", "code", "function", "variable", "object", "array", "method", 
  "request", "response", "server", "client", "network", "interface", "template", "element", 
  "setting", "property", "event", "click", "focusing", "keyboard", "mouse", "cursor", 
  "screen", "monitor", "laptop", "tablet", "phone", "application", "game", "graphics", 
  "sound", "video", "camera", "microphone", "headphones", "wire", "charging", "battery", 
  "energy", "light", "shadow", "color", "shade", "contrast", "brightness", "resolution", 
  "pixel", "vector", "raster", "font", "size", "margin", "border", "background", 
  "picture", "photo", "drawing", "scheme", "table", "list", "form", "button", 
  "link", "menu", "icon", "logo", "header", "footer", "bar", "scrolling", 
  "window", "tab", "folder", "file", "document", "archive", "copy", "original", 
  "security", "password", "username", "account", "profile", "mail", "message", "chat", 
  "letter", "notification", "signal", "call", "meeting", "calendar", "time", "clock", 
  "minute", "second", "date", "year", "month", "week", "day", "evening", 
  "morning", "night", "noon", "midnight", "times", "season", "winter", "spring", 
  "summer", "autumn", "weather", "sun", "moon", "star", "sky", "cloud", 
  "rain", "snow", "wind", "storm", "fog", "frost", "heat", "warmth", 
  "cold", "air", "water", "fire", "ground", "stone", "sand", "clay", 
  "metal", "gold", "silver", "iron", "copper", "wood", "grass", "flower", 
  "leaf", "root", "branch", "forest", "dark", "garden", "field", "mountain", 
  "hill", "valley", "river", "lake", "sea", "ocean", "coast", "beach", 
  "island", "wave", "stream", "fish", "bird", "animal", "beast", "cat", 
  "dog", "horse", "cow", "eagle", "conscience", "honesty", "kindness"
];

const punctPool = [".", ",", "!", "?", ":", ";"];
// Наборы для генерации раздельных чисел/цифр
const numberPool = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const customNumbers = ["15", "24", "7", "42", "100", "55", "365", "12", "0", "99"];

let currentLang = "ru";
let targetText = "";
let typedText = "";
let startTime = null;
let timerId = null;
let timeLimitSeconds = 0;
let isFinished = false;
let totalMistakes = 0;
let typingSessionActive = false;
const wrongKeySet = new Set();

let caretEl = null;
let highlightTimerId = null;
let errorCountMap = {};

function kSym(sym, flex = 1, label = null) {
  return { kind: "sym", sym, flex, label: label || sym };
}

function kSpecial(kind, flex, label, dataKey = null) {
  return { kind, flex, label, dataKey };
}

// Раскладки клавиатур
const KEYBOARD_RU = [
  [
    kSym("ё"), kSym("1"), kSym("2"), kSym("3"), kSym("4"), kSym("5"),
    kSym("6"), kSym("7"), kSym("8"), kSym("9"), kSym("0"), kSym("-"), kSym("="),
    kSym("\\", 1.12, "\\"), kSpecial("back", 1.78, "Backspace", "Backspace")
  ],
  [
    kSpecial("tab", 1.42, "Tab", "Tab"),
    kSym("й"), kSym("ц"), kSym("у"), kSym("к"), kSym("е"), kSym("н"),
    kSym("г"), kSym("ш"), kSym("щ"), kSym("з"), kSym("х"), kSym("ъ")
  ],
  [
    kSpecial("caps", 1.68, "Caps", "CapsLock"),
    kSym("ф"), kSym("ы"), kSym("в"), kSym("а"), kSym("п"), kSym("р"),
    kSym("о"), kSym("л"), kSym("д"), kSym("ж"), kSym("э"),
    kSpecial("enter", 1.62, "Enter", "Enter")
  ],
  [
    kSpecial("shift", 1.72, "Shift", "ShiftLeft"),
    kSym("я"), kSym("ч"), kSym("с"), kSym("м"), kSym("и"), kSym("т"),
    kSym("ь"), kSym("б"), kSym("ю"), kSym("."),
    kSym(",", 0.92), kSym(";", 0.92), kSym(":", 0.92), kSym("!", 0.92), kSym("?", 0.92),
    kSpecial("shift2", 1.72, "Shift", "ShiftRight")
  ],
  [
    kSpecial("ctrl", 1.15, "Ctrl", "ControlLeft"), kSpecial("win", 1.12, "Win", "MetaLeft"), kSpecial("alt", 1.12, "Alt", "AltLeft"),
    { kind: "space", flex: 6.2, label: "Пробел", dataKey: "space" },
    kSpecial("alt2", 1.12, "Alt", "AltRight"), kSpecial("menu", 1.05, "☰", "ContextMenu"), kSpecial("ctrl2", 1.15, "Ctrl", "ControlRight")
  ]
];

const KEYBOARD_EN = [
  [
    kSym("`"), kSym("1"), kSym("2"), kSym("3"), kSym("4"), kSym("5"),
    kSym("6"), kSym("7"), kSym("8"), kSym("9"), kSym("0"), kSym("-"), kSym("="),
    kSym("\\", 1.12, "\\"), kSpecial("back", 1.78, "Backspace", "Backspace")
  ],
  [
    kSpecial("tab", 1.42, "Tab", "Tab"),
    kSym("q"), kSym("w"), kSym("e"), kSym("r"), kSym("t"), kSym("y"),
    kSym("u"), kSym("i"), kSym("o"), kSym("p"), kSym("["), kSym("]")
  ],
  [
    kSpecial("caps", 1.68, "Caps", "CapsLock"),
    kSym("a"), kSym("s"), kSym("d"), kSym("f"), kSym("g"), kSym("h"),
    kSym("j"), kSym("k"), kSym("l"), kSym(";"), kSym("'"),
    kSpecial("enter", 1.62, "Enter", "Enter")
  ],
  [
    kSpecial("shift", 1.72, "Shift", "ShiftLeft"),
    kSym("z"), kSym("x"), kSym("c"), kSym("v"), kSym("b"), kSym("n"),
    kSym("m"), kSym(","), kSym("."), kSym("/"),
    kSym("!", 0.92), kSym("?", 0.92),
    kSpecial("shift2", 1.72, "Shift", "ShiftRight")
  ],
  [
    kSpecial("ctrl", 1.15, "Ctrl", "ControlLeft"), kSpecial("win", 1.12, "Win", "MetaLeft"), kSpecial("alt", 1.12, "Alt", "AltLeft"),
    { kind: "space", flex: 6.2, label: "Space", dataKey: "space" },
    kSpecial("alt2", 1.12, "Alt", "AltRight"), kSpecial("menu", 1.05, "☰", "ContextMenu"), kSpecial("ctrl2", 1.15, "Ctrl", "ControlRight")
  ]
];

function updateInterfaceLanguage() {
  const t = TRANSLATIONS[currentLang];
  document.querySelector(".main-title").textContent = t.title;
  document.querySelector(".subtitle").textContent = t.subtitle;
  document.querySelector(".lbl-lang").textContent = t.lblLang;
  document.querySelector(".lbl-word-count").textContent = t.lblWordCount;
  document.querySelector(".lbl-time-limit").textContent = t.lblTimeLimit;
  document.querySelector(".lbl-pct").textContent = t.lblPct;
  document.querySelector(".lbl-num").textContent = t.lblNum;
  document.querySelector(".new-text-btn").textContent = t.btnNew;
  document.querySelector(".new-session-btn").textContent = t.btnSecondary;
  document.querySelector(".hint-bar").textContent = t.hint;
  
  document.querySelector(".lbl-stat-wpm").textContent = t.statWpm;
  document.querySelector(".lbl-stat-accuracy").textContent = t.statAcc;
  document.querySelector(".lbl-stat-progress").textContent = t.statProg;
  document.querySelector(".lbl-stat-time").textContent = t.statTime;

  document.querySelector(".tip-wpm-title").textContent = t.tipWpmT;
  document.querySelector(".tip-wpm-desc").textContent = t.tipWpmD;
  document.querySelector(".tip-cpm-title").textContent = t.tipCpmT;
  document.querySelector(".tip-cpm-desc").textContent = t.tipCpmD;

  document.querySelector(".results-title").textContent = t.modalTitle;
  document.querySelector(".rank-label").textContent = t.modalRankLbl;
  document.querySelector(".rc-lbl-acc").textContent = t.modalAcc;
  document.querySelector(".rc-lbl-time").textContent = t.modalTime;
  document.querySelector(".rc-lbl-chars").textContent = t.modalChars;
  document.querySelector(".rc-lbl-err").textContent = t.modalErr;
  document.querySelector(".rc-lbl-worst").textContent = t.modalWorst;
  document.querySelector(".modal-new-btn").textContent = t.modalBtnNext;
  document.querySelector(".modal-close-btn").textContent = t.modalBtnClose;
}

function getSelectedWordCount() {
  if (wordCount.value === "custom") {
    return Math.max(1, Number(customWordCount.value || 1));
  }
  return Number(wordCount.value);
}

function getSelectedTimeLimitSeconds() {
  const value = timeLimit.value === "custom" ? Number(customTimeLimit.value || 1) : Number(timeLimit.value);
  return Math.max(1, value) * 60;
}

function createText() {
  const words = [];
  const count = getSelectedWordCount();
  const pool = currentLang === "ru" ? baseWordsRu : baseWordsEn;
  
  for (let i = 0; i < count; i++) {
    // Если включены цифры и сработал шанс, добавляем цифру/число как ОТДЕЛЬНОЕ слово
    if (withNumbers.checked && Math.random() < 0.15) {
      const numPool = Math.random() < 0.5 ? numberPool : customNumbers;
      words.push(numPool[Math.floor(Math.random() * numPool.length)]);
      continue;
    }

    let word = pool[Math.floor(Math.random() * pool.length)];
    
    if (withPunctuation.checked && Math.random() < 0.20) {
      word += punctPool[Math.floor(Math.random() * punctPool.length)];
    }
    words.push(word);
  }
  return words.join(" ");
}

function normalizeKeyChar(char) {
  if (char === " ") return "space";
  return char.toLowerCase();
}

function escapeSelector(value) {
  if (typeof CSS !== "undefined" && CSS.escape) {
    return CSS.escape(value);
  }
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function drawKeyboard() {
  keyboard.innerHTML = "";
  const defSource = currentLang === "ru" ? KEYBOARD_RU : KEYBOARD_EN;

  defSource.forEach((rowKeys) => {
    const row = document.createElement("div");
    row.className = "key-row";

    rowKeys.forEach((def) => {
      const key = document.createElement("div");
      key.className = "key";
      key.style.setProperty("--kf", String(def.flex));

      if (def.kind === "sym") {
        key.textContent = def.label;
        key.dataset.key = normalizeKeyChar(def.sym);
      } else if (def.kind === "space") {
        key.textContent = def.label;
        key.dataset.key = "space";
      } else {
        key.textContent = def.label;
        if (def.dataKey) {
          key.dataset.code = def.dataKey;
        }
        if (def.kind === "back") {
          key.dataset.key = "Backspace";
        }
      }
      row.appendChild(key);
    });
    keyboard.appendChild(row);
  });
}

function clearKeyboardState() {
  document.querySelectorAll(".key").forEach((k) => {
    k.classList.remove("target", "pressed");
  });
}

function refreshErrorKeys() {
  document.querySelectorAll(".key").forEach((k) => {
    if (k.dataset.key && wrongKeySet.has(k.dataset.key)) {
      k.classList.add("error");
    } else {
      k.classList.remove("error");
    }
  });
}

function highlightTargetKey() {
  clearKeyboardState();
  if (highlightTimerId) {
    clearTimeout(highlightTimerId);
    highlightTimerId = null;
  }

  const nextChar = targetText[typedText.length];
  if (!nextChar) {
    refreshErrorKeys();
    return;
  }
  
  const normalized = normalizeKeyChar(nextChar);
  const keyEl = document.querySelector(`.key[data-key="${escapeSelector(normalized)}"]`);
  
  if (keyEl) {
    keyEl.classList.add("target");
    highlightTimerId = setTimeout(() => {
      keyEl.classList.remove("target");
    }, 2000);
  }
  refreshErrorKeys();
}

function initTextSpans() {
  typingInner.innerHTML = "";
  const frag = document.createDocumentFragment();

  caretEl = document.createElement("span");
  caretEl.className = "caret";
  frag.appendChild(caretEl);

  const tokens = targetText.match(/[^\s]+\s*/g) || [];
  let globalCharIndex = 0;

  tokens.forEach((token) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";

    for (let i = 0; i < token.length; i++) {
      const charSpan = document.createElement("span");
      charSpan.textContent = token[i];
      charSpan.dataset.idx = String(globalCharIndex);
      charSpan.className = token[i] === " " ? "char whitespace" : "char";
      wordSpan.appendChild(charSpan);
      globalCharIndex++;
    }
    frag.appendChild(wordSpan);
  });

  typingInner.appendChild(frag);
  updateTextStates();
}

function updateTextStates() {
  const spans = typingInner.querySelectorAll(".char");
  
  spans.forEach((span) => {
    const i = parseInt(span.dataset.idx, 10);
    const isWhitespace = span.classList.contains("whitespace");
    span.className = isWhitespace ? "char whitespace" : "char";
    
    if (i < typedText.length) {
      span.classList.add(typedText[i] === targetText[i] ? "correct" : "incorrect");
    } else if (i === typedText.length) {
      span.classList.add("current");
    }
  });

  const currentSpan = typingInner.querySelector(`.char[data-idx="${typedText.length}"]`);
  if (currentSpan) {
    caretEl.style.left = `${currentSpan.offsetLeft}px`;
    caretEl.style.top = `${currentSpan.offsetTop}px`;
    caretEl.style.height = `${currentSpan.offsetHeight}px`;
  } else {
    const lastSpan = spans[spans.length - 1];
    if (lastSpan) {
      caretEl.style.left = `${lastSpan.offsetLeft + lastSpan.offsetWidth}px`;
      caretEl.style.top = `${lastSpan.offsetTop}px`;
    }
  }
  requestAnimationFrame(scrollCaretToFirstRow);
}

function scrollCaretToFirstRow() {
  if (!typingInner || !caretEl) return;
  const currentSpan = typingInner.querySelector(`.char[data-idx="${typedText.length}"]`);
  const rowTop = currentSpan ? currentSpan.offsetTop : caretEl.offsetTop;
  const lineHeight = currentSpan ? currentSpan.offsetHeight : 57;
  const targetTranslateY = lineHeight - rowTop;
  typingInner.style.transform = `translateY(${targetTranslateY}px)`;
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const secs = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function computeMistakes() {
  let mistakes = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== targetText[i]) mistakes++;
  }
  return mistakes;
}

function updateStats() {
  const now = Date.now();
  const elapsedSeconds = startTime ? Math.max(1, Math.floor((now - startTime) / 1000)) : 0;
  const mistakes = computeMistakes();
  const correctChars = Math.max(0, typedText.length - mistakes);
  const wordsPerMinute = elapsedSeconds ? Math.round((correctChars / 5) / (elapsedSeconds / 60)) : 0;
  const accuracy = typedText.length ? Math.round((correctChars / typedText.length) * 100) : 100;
  const progress = Math.round((typedText.length / targetText.length) * 100);

  wpmElement.textContent = String(wordsPerMinute);
  accuracyElement.textContent = String(accuracy);
  progressElement.textContent = String(Math.min(progress, 100));

  if (timeLimitSeconds) {
    const left = Math.max(0, timeLimitSeconds - elapsedSeconds);
    remainingTimeElement.textContent = formatTime(left);
    if (left === 0) finishTraining();
  }
}

function finishTraining() {
  if (isFinished) return;
  isFinished = true;
  clearInterval(timerId);
  
  const elapsed = startTime ? Math.max(1, Math.floor((Date.now() - startTime) / 1000)) : 0;
  const mistakes = computeMistakes();
  const correctChars = Math.max(0, typedText.length - mistakes);
  
  const minutes = elapsed / 60;
  const wordsPerMinute = elapsed ? Math.round((correctChars / 5) / minutes) : 0;
  const charsPerMinute = elapsed ? Math.round(correctChars / minutes) : 0;
  const accuracy = typedText.length ? Math.round((correctChars / typedText.length) * 100) : 100;

  const t = TRANSLATIONS[currentLang];
  let rank = t.ranks[0];
  if (wordsPerMinute >= 20 && wordsPerMinute < 40) rank = t.ranks[1];
  else if (wordsPerMinute >= 40 && wordsPerMinute < 60) rank = t.ranks[2];
  else if (wordsPerMinute >= 60 && wordsPerMinute < 80) rank = t.ranks[3];
  else if (wordsPerMinute >= 80) rank = t.ranks[4];

  let worstKey = t.worstNone;
  let maxErrors = 0;
  for (const key in errorCountMap) {
    if (errorCountMap[key] > maxErrors) {
      maxErrors = errorCountMap[key];
      worstKey = `"${key}" (${maxErrors} ${t.worstCountStr})`;
    }
  }

  document.querySelector(".result-rank").textContent = rank;
  document.querySelector(".result-accuracy").textContent = `${accuracy}%`;
  document.querySelector(".result-wpm").textContent = String(wordsPerMinute);
  document.querySelector(".result-cpm").textContent = String(charsPerMinute);
  document.querySelector(".result-time").textContent = `${elapsed}s`;
  document.querySelector(".result-chars").textContent = String(typedText.length);
  document.querySelector(".result-errors").textContent = String(totalMistakes);
  document.querySelector(".worst-key").textContent = worstKey;

  resultsModal.classList.remove("hidden");
  highlightTargetKey();
}

function setRunningState() {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(updateStats, 250);
}

function beginTypingSession() {
  if (!typingSessionActive) {
    typingSessionActive = true;
    document.body.classList.add("typing-session");
    requestAnimationFrame(scrollCaretToFirstRow);
  }
}

function resetTraining() {
  targetText = createText();
  typedText = "";
  startTime = null;
  totalMistakes = 0;
  wrongKeySet.clear();
  errorCountMap = {};
  typingSessionActive = false;
  document.body.classList.remove("typing-session");
  refreshErrorKeys();
  timeLimitSeconds = getSelectedTimeLimitSeconds();
  remainingTimeElement.textContent = formatTime(timeLimitSeconds);
  isFinished = false;
  resultsModal.classList.add("hidden");
  wpmElement.textContent = "0";
  accuracyElement.textContent = "100";
  progressElement.textContent = "0";
  initTextSpans();
  highlightTargetKey();
  setRunningState();
  typingArea.focus();
}

function findKeyForEvent(event) {
  if (event.key === "Backspace") return document.querySelector('.key[data-key="Backspace"]');
  if (event.key === " ") return document.querySelector('.key[data-key="space"]');
  
  if (event.code) {
    const byCode = document.querySelector(`.key[data-code="${escapeSelector(event.code)}"]`);
    if (byCode) return byCode;
  }
  if (event.key.length === 1) {
    const n = normalizeKeyChar(event.key);
    return document.querySelector(`.key[data-key="${escapeSelector(n)}"]`);
  }
  return null;
}

function flashPressed(keyEl) {
  if (!keyEl) return;
  keyEl.classList.add("pressed");
  setTimeout(() => keyEl.classList.remove("pressed"), 120);
}

function handleTyping(event) {
  if (isFinished) return;
  if (["Shift", "Control", "Alt", "CapsLock", "Meta"].includes(event.key)) return;
  if (event.key === "Tab") event.preventDefault();

  const keyEl = findKeyForEvent(event);
  flashPressed(keyEl);

  if (event.key === "Backspace") {
    event.preventDefault();
    if (typedText.length > 0) beginTypingSession();
    typedText = typedText.slice(0, -1);
    updateTextStates();
    updateStats();
    highlightTargetKey();
    return;
  }

  if (event.key.length !== 1) return;
  event.preventDefault();
  if (typedText.length >= targetText.length) return;

  beginTypingSession();
  if (!startTime) startTime = Date.now();

  const expected = targetText[typedText.length];
  const pressedNorm = event.key === " " ? "space" : event.key.toLowerCase();
  
  if (event.key !== expected) {
    totalMistakes++;
    wrongKeySet.add(pressedNorm);
    const targetChar = expected === " " ? "Space" : expected;
    errorCountMap[targetChar] = (errorCountMap[targetChar] || 0) + 1;
    refreshErrorKeys();
  }

  typedText += event.key;
  updateTextStates();
  updateStats();
  highlightTargetKey();

  if (typedText.length >= targetText.length) {
    finishTraining();
  }
}

wordCount.addEventListener("change", () => {
  customWordCount.disabled = wordCount.value !== "custom";
});
timeLimit.addEventListener("change", () => {
  customTimeLimit.disabled = timeLimit.value !== "custom";
});
selectLang.addEventListener("change", (e) => {
  currentLang = e.target.value;
  updateInterfaceLanguage();
  drawKeyboard();
  resetTraining();
});

newTextBtn.addEventListener("click", resetTraining);
newSessionBtn.addEventListener("click", resetTraining);
typingArea.addEventListener("keydown", handleTyping);
typingArea.addEventListener("click", () => typingArea.focus());

modalCloseBtn.addEventListener("click", () => resultsModal.classList.add("hidden"));
modalBackdrop.addEventListener("click", () => resultsModal.classList.add("hidden"));
modalNewBtn.addEventListener("click", resetTraining);

window.addEventListener("resize", () => requestAnimationFrame(scrollCaretToFirstRow));

// Инициализация
updateInterfaceLanguage();
drawKeyboard();
resetTraining();
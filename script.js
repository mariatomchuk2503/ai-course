// ===== Дані маршрутів =====
const ROUTES = {
  A: {
    score: "0–4 бали вхідного тесту",
    name: "Маршрут А · початковий",
    who: "Для тих, хто тільки знайомиться з ШІ або пробував його кілька разів.",
    tasks: "Мультидисциплінарні: кілька предметів розглядають одне явище.",
    support: "Готові шаблони запитів і покрокові інструкції.",
    role: "Учасник команди з чіткою підзадачею."
  },
  B: {
    score: "5–8 балів вхідного тесту",
    name: "Маршрут Б · базовий",
    who: "Для тих, хто вже використовує ШІ, але не системно.",
    tasks: "Міждисциплінарні: методи одного предмета для задач іншого.",
    support: "Шаблони-підказки, які ви доповнюєте самі.",
    role: "Відповідальний за частину проєкту."
  },
  C: {
    score: "9–12 балів вхідного тесту",
    name: "Маршрут В · просунутий",
    who: "Для тих, хто впевнено працює з ШІ й хоче вчити колег.",
    tasks: "Трансдисциплінарні: реальна проблема без меж предметів.",
    support: "Лише вимоги до результату.",
    role: "Лідер змішаної команди."
  }
};

// ===== Питання вхідного тесту (correct — номер правильної відповіді, з 0) =====
const QUESTIONS = [
  { q: "Що найточніше описує роботу генеративної мовної моделі?",
    a: ["Шукає готову відповідь у базі інтернету",
        "Генерує текст, передбачаючи найімовірніше продовження на основі закономірностей у навчальних даних",
        "Розуміє тему так, як людина",
        "Перевіряє факти перед відповіддю"], correct: 1 },
  { q: "Що таке «галюцинація» ШІ?",
    a: ["Збій програми", "Правдоподібна, але хибна або вигадана інформація", "Відмова відповідати", "Надто довга відповідь"], correct: 1 },
  { q: "Чому на однакове запитання ШІ може відповісти по-різному?",
    a: ["Генерація має ймовірнісний характер", "Модель втомлюється", "Це завжди ознака помилки", "Відповідь залежить лише від часу доби"], correct: 0 },
  { q: "Який запит найкращий для створення завдань?",
    a: ["«Склади завдання з електротехніки»",
        "«Ти методист. Склади 5 задач з електротехніки для 2 курсу (електромонтаж), середній рівень, з розв’язками та критеріями оцінювання»",
        "«Електротехніка, задачі, швидко»",
        "«Придумай щось цікаве для студентів»"], correct: 1 },
  { q: "Відповідь ШІ не підійшла. Що найрозумніше зробити?",
    a: ["Прийняти як є", "Вирішити, що ШІ непридатний", "Уточнити запит: додати контекст, приклад, вимоги до формату", "Повторити той самий запит кілька разів"], correct: 2 },
  { q: "Яка інформація найбільше допомагає ШІ підготувати матеріал саме для вашої групи?",
    a: ["Рівень підготовки групи, мета заняття, формат результату", "Лише тема", "Лише обсяг тексту", "Нічого додатково не потрібно"], correct: 0 },
  { q: "ШІ навів посилання на наукове джерело. Ваші дії?",
    a: ["Використати без змін", "Перевірити, чи існує джерело і чи містить воно цю інформацію", "Вважати надійним, якщо звучить фахово", "Попросити ШІ підтвердити, що воно справжнє"], correct: 1 },
  { q: "Як перевірити розрахункову задачу, створену ШІ?",
    a: ["Довіритися, бо ШІ добре рахує", "Розв’язати самостійно або звірити з надійним джерелом", "Спитати той самий ШІ, чи правильно", "Перевірка не потрібна для простих задач"], correct: 1 },
  { q: "Що правильно сказати про упередженість відповідей ШІ?",
    a: ["Її не буває", "Вона можлива, бо модель вчилася на даних, які можуть містити стереотипи", "Вона є лише в безкоштовних версіях", "Проявляється тільки в політичних темах"], correct: 1 },
  { q: "Які дані не слід вводити в публічний ШІ-сервіс?",
    a: ["Навчальну тему заняття", "Загальні запитання про методику", "Персональні дані здобувачів (прізвища, оцінки, характеристики)", "Запит на ідеї для вправи"], correct: 2 },
  { q: "Здобувач подав повністю згенеровану ШІ роботу як власну. Що найдоречніше?",
    a: ["Нічого, ШІ дозволений усім",
        "Автоматично виставити 0 без розмови",
        "Звернутися до правил закладу, обговорити зі здобувачем, вимагати вказувати використання ШІ",
        "Перевірити лише детектором і ухвалити рішення"], correct: 2 },
  { q: "Наскільки надійні детектори ШІ-тексту?",
    a: ["Безпомилкові", "Дають хибні спрацювання, тож не можуть бути єдиною підставою для звинувачення", "Надійні для коротких текстів", "Надійні лише для англійської"], correct: 1 }
];

// ===== Допоміжне: збереження результату тесту в браузері =====
function saveRoute(route) {
  try { localStorage.setItem("course-route", route); } catch (e) {}
}
function loadRoute() {
  try { return localStorage.getItem("course-route"); } catch (e) { return null; }
}

// ===== Мобільне меню =====
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("is-open"))
  );
}

// ===== Перемикач маршрутів (головна сторінка) =====
const tabs = document.querySelectorAll(".tab");
if (tabs.length) {
  function showRoute(id) {
    const r = ROUTES[id];
    document.getElementById("route-score").textContent = r.score;
    document.getElementById("route-name").textContent = r.name;
    document.getElementById("route-who").textContent = r.who;
    document.getElementById("route-tasks").textContent = r.tasks;
    document.getElementById("route-support").textContent = r.support;
    document.getElementById("route-role").textContent = r.role;
    tabs.forEach((t) => {
      const active = t.dataset.route === id;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active);
    });
  }
  tabs.forEach((t) => t.addEventListener("click", () => showRoute(t.dataset.route)));
  // якщо людина вже пройшла тест — показуємо її маршрут
  showRoute(loadRoute() || "B");
}

// ===== Вхідний тест (сторінка test.html) =====
const form = document.getElementById("test-form");
if (form) {
  const letters = ["а", "б", "в", "г"];

  // 1. Будуємо питання
  QUESTIONS.forEach((item, i) => {
    const options = item.a.map((text, j) => `
      <label class="option">
        <input type="radio" name="q${i}" value="${j}">
        <span>${letters[j]}) ${text}</span>
      </label>`).join("");
    form.insertAdjacentHTML("beforeend", `
      <fieldset class="question">
        <legend><span class="question__num">${i + 1}.</span>${item.q}</legend>
        ${options}
      </fieldset>`);
  });

  const submitBtn = document.getElementById("submit-btn");
  const bar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const result = document.getElementById("result");

  // 2. Рахуємо, скільки питань уже з відповіддю
  form.addEventListener("change", () => {
    const answered = Array.from(new FormData(form).keys()).length;
    bar.style.width = (answered / QUESTIONS.length) * 100 + "%";
    progressText.textContent = `Відповідей: ${answered} з ${QUESTIONS.length}`;
    submitBtn.disabled = answered < QUESTIONS.length;
  });

  // 3. Підрахунок балів і маршрут
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let score = 0;
    const mistakes = [];
    QUESTIONS.forEach((item, i) => {
      if (Number(data.get("q" + i)) === item.correct) score++;
      else mistakes.push(`<li><b>${i + 1}. ${item.q}</b><br>Правильно: ${item.a[item.correct]}</li>`);
    });

    const route = score <= 4 ? "A" : score <= 8 ? "B" : "C";
    const r = ROUTES[route];
    saveRoute(route);

    result.innerHTML = `
      <div class="result__score">${score} / ${QUESTIONS.length}</div>
      <h2>${r.name}</h2>
      <p>${r.who} Остаточне рішення про маршрут підтверджує викладач.</p>
      ${mistakes.length ? `<h3 class="subhead" style="margin-top:0">Варто повторити</h3><ul class="mistakes">${mistakes.join("")}</ul>` : ""}
      <a href="index.html#routes" class="btn">Детальніше про мій маршрут</a>`;
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth" });
  });
}

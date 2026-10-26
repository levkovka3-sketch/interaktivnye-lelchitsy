document.querySelectorAll(".quiz-card").forEach((card, index) => {
  const result = card.querySelector(".result");
  const questionNumber = index + 1;
  card.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.answer === "correct") {
        result.textContent = questionNumber === 1
          ? "Правильно! Это костёл Пресвятого Сердца Христа и Фатимской Божией Матери в Лельчицах. Отлично знаешь родной город!"
          : "Правильно! Это городской парк в Лельчицах. Отлично знаешь родной город!";
      } else {
        result.textContent = "Пока не угадано. Попробуй ещё раз!";
      }
    });
  });
});

const readerPoll = document.querySelector("#reader-poll");
if (readerPoll) readerPoll.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.querySelector("#poll-message");
  message.textContent = "Спасибо за пример ответа! В этой версии данные не сохраняются и редакции не отправляются. Перед запуском подключим сервис для хранения ответов.";
});


// Игра «Найди 5 отличий»
(() => {
  const game = document.querySelector("#find-differences");
  if (!game) return;
  const targets = [...game.querySelectorAll(".difference-target")];
  const score = game.querySelector("#difference-score");
  const message = game.querySelector("#difference-message");
  const reset = game.querySelector("#difference-reset");
  const found = new Set();
  targets.forEach((target) => {
    target.addEventListener("click", () => {
      const key = target.dataset.difference;
      if (found.has(key)) {
        message.textContent = "Это отличие ты уже нашёл. Ищи следующую деталь!";
        return;
      }
      found.add(key);
      target.classList.add("found");
      target.disabled = true;
      score.textContent = String(found.size);
      if (found.size === targets.length) {
        message.textContent = "Ура! Ты нашёл все пять отличий. Отличное внимание к деталям!";
      } else {
        message.textContent = "Отлично, нашёл! Осталось найти ещё " + (targets.length - found.size) + ".";
      }
    });
  });
  reset.addEventListener("click", () => {
    found.clear();
    score.textContent = "0";
    targets.forEach((target) => {
      target.classList.remove("found");
      target.disabled = false;
      target.textContent = "";
    });
    message.textContent = "Найди пять отличий на второй фотографии и нажимай прямо на места, где заметил изменения.";
  });
})();

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

document.querySelector("#reader-poll").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.querySelector("#poll-message");
  message.textContent = "Спасибо за пример ответа! В этой версии данные не сохраняются и редакции не отправляются. Перед запуском подключим сервис для хранения ответов.";
});

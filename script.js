const quizResult = document.querySelector("#quiz-result");
document.querySelectorAll(".answer").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.answer === "correct") {
      quizResult.textContent = "Правильно! Это костёл Пресвятого Сердца Христа и Фатимской Божией Матери в Лельчицах. Отлично знаешь родной город!";
    } else {
      quizResult.textContent = "Пока не угадано. Попробуй ещё раз! Правильный ответ можно узнать после выбора верного варианта.";
    }
  });
});

document.querySelector("#reader-poll").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.querySelector("#poll-message");
  message.textContent = "Спасибо за пример ответа! В этой версии данные не сохраняются и редакции не отправляются. Перед запуском подключим сервис для хранения ответов.";
});

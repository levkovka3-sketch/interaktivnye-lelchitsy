const quizResult = document.querySelector("#quiz-result");
document.querySelectorAll(".answer").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.answer === "correct") {
      quizResult.textContent = "Верно! Это демонстрационный ответ. Позже добавим настоящее место и интересный факт.";
    } else {
      quizResult.textContent = "Пока нет. Попробуйте ещё раз — это учебный пример, варианты мы заменим.";
    }
  });
});

document.querySelector("#reader-poll").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.querySelector("#poll-message");
  message.textContent = "Спасибо за пример ответа! В этой версии данные не сохраняются и редакции не отправляются. Перед запуском подключим сервис для хранения ответов.";
});

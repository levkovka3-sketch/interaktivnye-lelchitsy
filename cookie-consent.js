(() => {
  const KEY = "lelchitsy-cookie-preferences-v1";
  const readPreferences = () => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  };
  const savePreferences = (optional) => {
    const preferences = {
      necessary: true,
      optional: Boolean(optional),
      updatedAt: new Date().toISOString()
    };
    try { localStorage.setItem(KEY, JSON.stringify(preferences)); } catch (_) {}
    return preferences;
  };

  const existing = readPreferences();
  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-label", "Уведомление о файлах cookie");
  banner.hidden = Boolean(existing);
  banner.innerHTML = `
    <div>
      <h2>Мы используем файлы cookie и локальное хранилище</h2>
      <p>Сейчас сайт не использует рекламные cookie и не подключает сервисы веб-аналитики. Техническое хранилище помогает запомнить ваш выбор в этом уведомлении.</p>
      <p>Подробнее: <a href="cookie-policy.html">Политика cookie</a> и <a href="privacy-policy.html">Политика конфиденциальности</a>.</p>
    </div>
    <div class="cookie-actions">
      <button class="cookie-action cookie-action-link" type="button" data-cookie-settings>Настройки</button>
      <button class="cookie-action cookie-action-secondary" type="button" data-cookie-reject>Отклонить необязательные</button>
      <button class="cookie-action cookie-action-primary" type="button" data-cookie-accept>Принять все</button>
    </div>`;
  document.body.appendChild(banner);

  const reopen = document.createElement("button");
  reopen.className = "cookie-reopen";
  reopen.type = "button";
  reopen.textContent = "Настройки cookie";
  reopen.setAttribute("aria-label", "Открыть настройки cookie");
  reopen.hidden = !existing;
  document.body.appendChild(reopen);

  const settings = document.createElement("div");
  settings.className = "cookie-settings";
  settings.hidden = true;
  settings.innerHTML = `
    <div class="cookie-settings-card" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
      <h2 id="cookie-settings-title">Настройки cookie</h2>
      <p>Вы можете изменить свой выбор в любой момент с помощью кнопки «Настройки cookie» внизу страницы.</p>
      <div class="cookie-setting-row">
        <input type="checkbox" checked disabled aria-label="Необходимое техническое хранилище включено">
        <div><strong>Необходимое хранилище</strong><span>Запоминает решение по этому уведомлению. Его нельзя отключить в настройках сайта, иначе сайт не сможет помнить ваш выбор.</span></div>
      </div>
      <div class="cookie-setting-row">
        <input type="checkbox" id="cookie-optional">
        <div><strong>Необязательные технологии</strong><span>Аналитика и рекламные технологии. Сейчас они на сайте не подключены. Сохранение выбора не активирует такие сервисы автоматически.</span></div>
      </div>
      <p><a href="cookie-policy.html">Прочитать политику cookie</a> · <a href="privacy-policy.html">Политика конфиденциальности</a></p>
      <div class="cookie-settings-actions">
        <button class="cookie-action cookie-action-secondary" type="button" data-cookie-close>Отмена</button>
        <button class="cookie-action cookie-action-secondary" type="button" data-cookie-save-reject>Отклонить необязательные</button>
        <button class="cookie-action cookie-action-primary" type="button" data-cookie-save>Сохранить выбор</button>
      </div>
    </div>`;
  document.body.appendChild(settings);

  const showBanner = () => { banner.hidden = false; reopen.hidden = true; };
  const hideBanner = () => { banner.hidden = true; reopen.hidden = false; };
  const openSettings = () => {
    const current = readPreferences();
    document.getElementById("cookie-optional").checked = Boolean(current && current.optional);
    settings.hidden = false;
    document.querySelector("[data-cookie-close]").focus();
  };
  const closeSettings = () => { settings.hidden = true; };

  banner.querySelector("[data-cookie-accept]").addEventListener("click", () => {
    savePreferences(true); hideBanner(); closeSettings();
  });
  banner.querySelector("[data-cookie-reject]").addEventListener("click", () => {
    savePreferences(false); hideBanner(); closeSettings();
  });
  banner.querySelector("[data-cookie-settings]").addEventListener("click", openSettings);
  reopen.addEventListener("click", () => { showBanner(); openSettings(); });
  settings.querySelector("[data-cookie-close]").addEventListener("click", closeSettings);
  settings.querySelector("[data-cookie-save]").addEventListener("click", () => {
    savePreferences(document.getElementById("cookie-optional").checked);
    hideBanner(); closeSettings();
  });
  settings.querySelector("[data-cookie-save-reject]").addEventListener("click", () => {
    savePreferences(false); hideBanner(); closeSettings();
  });
  settings.addEventListener("click", (event) => {
    if (event.target === settings) closeSettings();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !settings.hidden) closeSettings();
  });
  if (!existing) showBanner();
})();
import { MenuScene } from "./MenuScene";
import { SceneId } from "../core/SceneManager";

export class GreetingScene extends MenuScene {
  id = SceneId.Greeting;
  private onStart: () => void;

  constructor(container: HTMLElement, onStart: () => void) {
    super(container);
    this.onStart = onStart;
    this.topLinks = [
      { label: 'Об игре', action: () => window.location.href = 'about.html' },
      { label: 'Конфиденциальность', action: () => window.location.href = 'privacy-policy.html' },
      { label: 'Контакты', action: () => window.location.href = 'mailto:malytsky@gmail.com' }
    ];
    this.options = [
      { label: 'Да', action: () => this.onStart() },
      { label: 'Нет', action: () => window.location.href = 'https://google.com' }
    ];
    this.selectedIndex = this.topLinks.length; // Начинаем с кнопки "Да"
  }

  init(): void {
    this.render();
  }

  getQuestion(): string {
    return `
      <h1 style="font-size: 3em; color: #44ff44; margin: 10px 0;">Змейка</h1>
      <div class="info-grid">
        <div class="info-block">
          <h3>Правила</h3>
          <p>Собирайте еду, растите и не врезайтесь в свой хвост.</p>
        </div>
        <div class="info-block">
          <h3>Советы</h3>
          <p>Держитесь края и планируйте маршрут заранее.</p>
        </div>
        <div class="info-block">
          <h3>Управление</h3>
          <p>Используйте стрелки для движения. Enter для выбора.</p>
        </div>
        <div class="info-block">
          <h3>О сайте</h3>
          <p>Лучшая классическая змейка в вашем браузере.</p>
        </div>
      </div>
      <h2 style="font-size: 2em; color: #44ff44; margin: 20px 0;">Будете играть?</h2>
    `;
  }
}

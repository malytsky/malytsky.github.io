import { MenuScene } from "./MenuScene";
import { SceneId } from "../core/SceneManager";

export class ReplayScene extends MenuScene {
  id = SceneId.Replay;
  private onReplay: () => void;

  constructor(container: HTMLElement, onReplay: () => void) {
    super(container);
    this.onReplay = onReplay;
    this.topLinks = [
      { label: 'Об игре', action: () => window.location.href = 'about.html' },
      { label: 'Конфиденциальность', action: () => window.location.href = 'privacy-policy.html' }
    ];
    this.options = [
      { label: 'Да', action: () => this.onReplay() },
      { label: 'Нет', action: () => window.location.href = '/' }
    ];
    this.selectedIndex = this.topLinks.length;
  }

  init(): void {
    this.render();
  }

  getQuestion(): string {
    return `
      <h2 style="font-size: 2.5em; margin: 10px 0;">Игра окончена!</h2>
      <div class="info-grid">
        <div class="info-block">
          <h3>Особенности</h3>
          <p>Плавная анимация и мгновенный отклик управления.</p>
        </div>
        <div class="info-block">
          <h3>Версия 1.1</h3>
          <p>Добавлены новые текстовые блоки и улучшена навигация.</p>
        </div>
        <div class="info-block">
          <h3>Рекорды</h3>
          <p>Счет сохраняется в течение текущей сессии игры.</p>
        </div>
        <div class="info-block">
          <h3>Контакты</h3>
          <p>Вопросы? Пишите нам на malytsky@gmail.com</p>
        </div>
      </div>
      <h3 style="font-size: 1.8em; color: #44ff44; margin: 20px 0;">Хотите сыграть заново?</h3>
    `;
  }
}

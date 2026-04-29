import { Scene, SceneId } from "../core/SceneManager";

export class AdsScene implements Scene {
  id = SceneId.Ads;
  private container: HTMLElement;
  private onComplete: () => void;
  private timer: number | null = null;

  constructor(container: HTMLElement, onComplete: () => void) {
    this.container = container;
    this.onComplete = onComplete;
  }

  init(): void {
    this.container.innerHTML = `
      <div class="ads-container">
        <h2>Загрузка игры...</h2>
        <p>Приготовьтесь! Скоро начнется увлекательная игра Змейка.</p>
        <p style="font-size: 0.9em; color: #666;">Пожалуйста, подождите несколько секунд.</p>
        <div class="loader"></div>
      </div>
    `;
    
    // Симуляция рекламы на 3 секунды
    this.timer = window.setTimeout(() => {
      this.onComplete();
    }, 3000);
  }

  destroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.container.innerHTML = '';
  }

  onKeyDown(_e: KeyboardEvent): void {
    // В сцене рекламы управление не требуется или заблокировано
  }
}

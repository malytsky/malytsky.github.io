import { MenuScene } from "./MenuScene";
import { SceneId } from "../core/SceneManager";

export class GreetingScene extends MenuScene {
  id = SceneId.Greeting;
  private onStart: () => void;

  constructor(container: HTMLElement, onStart: () => void) {
    super(container);
    this.onStart = onStart;
    this.topLinks = [];
    this.options = [
      { label: 'Да', action: () => this.onStart() },
      { label: 'Нет', action: () => window.location.href = 'https://google.com' }
    ];
    this.selectedIndex = 0; // Начинаем с кнопки "Да"
  }

  init(): void {
    this.render();
  }

  getQuestion(): string {
    return `
      <h2 style="font-size: 3em; color: #44ff44; margin: 20px 0;">Будете играть?</h2>
    `;
  }
}

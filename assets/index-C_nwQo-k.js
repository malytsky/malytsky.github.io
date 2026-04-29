(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=function(e){return e.Greeting=`greeting`,e.Ads=`ads`,e.Game=`game`,e.Replay=`replay`,e}({}),t=class{currentScene=null;container;constructor(e){this.container=e,window.addEventListener(`keydown`,e=>this.onKeyDown(e))}changeScene(e){this.currentScene&&this.currentScene.destroy(),this.container.innerHTML=``,this.currentScene=e,this.currentScene.init()}onKeyDown(e){this.currentScene&&this.currentScene.onKeyDown(e)}},n=class{selectedIndex=0;options=[];topLinks=[];container;constructor(e){this.container=e}destroy(){this.container.innerHTML=``}render(){this.container.innerHTML=`
      <div class="menu-container">
        <div class="top-links">
          ${this.topLinks.map((e,t)=>`
            <div class="top-link ${t===this.selectedIndex?`selected`:``}">
              ${e.label}
            </div>
          `).join(``)}
        </div>
        <div id="menu-question-container"></div>
        <div class="menu-options">
          ${this.options.map((e,t)=>`
              <div class="menu-option ${t+this.topLinks.length===this.selectedIndex?`selected`:``}">
                ${e.label}
              </div>
            `).join(``)}
        </div>
      </div>
    `;let e=this.container.querySelector(`#menu-question-container`);e&&(e.innerHTML=this.getQuestion())}onKeyDown(e){let t=this.topLinks.length+this.options.length;if(t!==0){if(e.key===`ArrowLeft`||e.key===`ArrowUp`)this.selectedIndex=(this.selectedIndex-1+t)%t,this.render();else if(e.key===`ArrowRight`||e.key===`ArrowDown`)this.selectedIndex=(this.selectedIndex+1)%t,this.render();else if(e.key===`Enter`){let e=[...this.topLinks,...this.options];e[this.selectedIndex]&&e[this.selectedIndex].action()}}}},r=class extends n{id=e.Greeting;onStart;constructor(e,t){super(e),this.onStart=t,this.topLinks=[{label:`Об игре`,action:()=>window.location.href=`about.html`},{label:`Конфиденциальность`,action:()=>window.location.href=`privacy-policy.html`},{label:`Контакты`,action:()=>window.location.href=`mailto:malytsky@gmail.com`}],this.options=[{label:`Да`,action:()=>this.onStart()},{label:`Нет`,action:()=>window.location.href=`https://google.com`}],this.selectedIndex=this.topLinks.length}init(){this.render()}getQuestion(){return`
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
    `}},i=class{id=e.Ads;container;onComplete;timer=null;constructor(e,t){this.container=e,this.onComplete=t}init(){this.container.innerHTML=`
      <div class="ads-container">
        <h2>Загрузка игры...</h2>
        <p>Приготовьтесь! Скоро начнется увлекательная игра Змейка.</p>
        <p style="font-size: 0.9em; color: #666;">Пожалуйста, подождите несколько секунд.</p>
        <div class="loader"></div>
      </div>
    `,this.timer=window.setTimeout(()=>{this.onComplete()},3e3)}destroy(){this.timer&&clearTimeout(this.timer),this.container.innerHTML=``}onKeyDown(e){}},a=class{id=e.Game;container;onGameOver;canvas=null;ctx=null;snake=[{x:10,y:10}];food={x:5,y:5};direction={x:1,y:0};nextDirection={x:1,y:0};gridSize=40;tileCountX=32;tileCountY=18;gameLoop=null;score=0;constructor(e,t){this.container=e,this.onGameOver=t}init(){this.container.innerHTML=`
      <div class="game-container">
        <div class="score">Счет: <span id="score-val">0</span></div>
        <canvas id="gameCanvas" width="1280" height="720"></canvas>
      </div>
    `,this.canvas=this.container.querySelector(`#gameCanvas`),this.ctx=this.canvas.getContext(`2d`),this.resetGame(),this.startGame()}resetGame(){this.snake=[{x:10,y:9},{x:9,y:9},{x:8,y:9}],this.direction={x:1,y:0},this.nextDirection={x:1,y:0},this.score=0,this.spawnFood()}spawnFood(){this.food={x:Math.floor(Math.random()*this.tileCountX),y:Math.floor(Math.random()*this.tileCountY)}}startGame(){this.gameLoop=window.setInterval(()=>this.update(),100)}update(){this.direction=this.nextDirection;let e={x:(this.snake[0].x+this.direction.x+this.tileCountX)%this.tileCountX,y:(this.snake[0].y+this.direction.y+this.tileCountY)%this.tileCountY};if(this.snake.some(t=>t.x===e.x&&t.y===e.y)){this.gameOver();return}if(this.snake.unshift(e),e.x===this.food.x&&e.y===this.food.y){this.score+=10;let e=document.getElementById(`score-val`);e&&(e.textContent=this.score.toString()),this.spawnFood()}else this.snake.pop();this.draw()}draw(){!this.ctx||!this.canvas||(this.ctx.fillStyle=`#222`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle=`#ff4444`,this.ctx.fillRect(this.food.x*this.gridSize,this.food.y*this.gridSize,this.gridSize-2,this.gridSize-2),this.ctx.fillStyle=`#44ff44`,this.snake.forEach((e,t)=>{t===0?this.ctx.fillStyle=`#88ff88`:this.ctx.fillStyle=`#44ff44`,this.ctx.fillRect(e.x*this.gridSize,e.y*this.gridSize,this.gridSize-2,this.gridSize-2)}))}gameOver(){this.gameLoop&&clearInterval(this.gameLoop),this.onGameOver()}destroy(){this.gameLoop&&clearInterval(this.gameLoop),this.container.innerHTML=``}onKeyDown(e){switch(e.key){case`ArrowUp`:this.direction.y===0&&(this.nextDirection={x:0,y:-1});break;case`ArrowDown`:this.direction.y===0&&(this.nextDirection={x:0,y:1});break;case`ArrowLeft`:this.direction.x===0&&(this.nextDirection={x:-1,y:0});break;case`ArrowRight`:this.direction.x===0&&(this.nextDirection={x:1,y:0});break}}},o=class extends n{id=e.Replay;onReplay;constructor(e,t){super(e),this.onReplay=t,this.topLinks=[{label:`Об игре`,action:()=>window.location.href=`about.html`},{label:`Конфиденциальность`,action:()=>window.location.href=`privacy-policy.html`}],this.options=[{label:`Да`,action:()=>this.onReplay()},{label:`Нет`,action:()=>window.location.href=`/`}],this.selectedIndex=this.topLinks.length}init(){this.render()}getQuestion(){return`
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
    `}},s=document.querySelector(`#app`),c=new t(s);function l(){c.changeScene(new r(s,u))}function u(){c.changeScene(new i(s,d))}function d(){c.changeScene(new a(s,f))}function f(){c.changeScene(new o(s,u))}l();
class ProgressBar extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.createShadowRoot();

    this._complete = 0; //this.getAttribute("complete");
    this._color = "gray"; //this.getAttribute("color");
  }

  get complete() {
    return this._complete;
  }
  get color() {
    return this._color;
  }

  set complete(val) {
    this.setAttribute('complete', val);
  }
  set color(val) {
    this.setAttribute('color', val);
  }

  static get observedAttributes() {
    return [ 'complete', 'color' ];
  }

  increase() {
    this.complete += 1;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    var innerBar = this.shadow.querySelector('.progress-bar-inner');

    switch(name) {
      case 'complete':
        this._complete = parseInt(newVal, 10) || 0;
        innerBar.style.width = this.complete + '%';
        innerBar.innerHTML = this.complete + '%';
      case 'color':
        this._color = newVal;
        innerBar.style.background = this.color;
    }
  }

  connectedCallback() {
    var template = `
      <style>
        .progress-bar {
          width: 50%;
          height: 30px;
          background-color: #EDF2F4;
          border-radius: 5px;
          color: #FFF;
        }
        .progress-bar-inner {
          height: 100%;
          line-height: 30px;
          background: #2B2D42;
          text-align: center;
          border-radius: 5px;
          transition: width 0.25s;
        }
      </style>
      <div class="progress-bar">
        <div class="progress-bar-inner">${this.complete}%</div>
      </div>
    `;

    this.shadow.innerHTML = template;
  }

}

window.customElements.define('progress-bar', ProgressBar);

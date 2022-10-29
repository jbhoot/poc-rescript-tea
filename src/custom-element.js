class WordCount extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.textContent = "Click";
        btn.addEventListener("click", (ev) => {
            this.dispatchEvent(new CustomEvent('customClicked', { detail: 'buttonclick' }));
        });
        shadowRoot.appendChild(btn);
        console.log("constructed");
    }

    connectedCallback() {
        console.log("connected");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    customElements.define('word-count', WordCount);
});
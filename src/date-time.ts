/**
 * An example date-time Element.
 *
 * ```
 * <date-time></date-time>
 * ```
 */

//import { DateTime } from './current-time';

// Define the custom element
//customElements.define('current-time', DateTime);

// The class for the custom element
export class DateTime extends HTMLElement {
  public shadowRoot: ShadowRoot;
  private dateElement: HTMLElement;
  private timeElement: HTMLElement;

  constructor() {
    super();

    // Attach a shadow root to the custom element
    this.shadowRoot = this.attachShadow({ mode: 'open' });

    // Add the template to the shadow root
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        /* Style for the custom element */
      </style>
      <div id="time-container">
        <!-- Display the current date and time -->
        <p id="date"></p>
        <p id="time"></p>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Get the date and time elements
    this.dateElement = this.shadowRoot.querySelector('#date')!;
    this.timeElement = this.shadowRoot.querySelector('#time')!;
  }

  // Lifecycle callback that is called when the element is inserted into the DOM
  connectedCallback() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    this.dateElement.textContent = now.toDateString();
    this.timeElement.textContent = now.toTimeString();
  }
}
// Define the custom element
customElements.define('date-time', DateTime);

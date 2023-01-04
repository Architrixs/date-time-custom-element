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
export class DateTimeElement extends HTMLElement {
  public shadowRoot: ShadowRoot
  private dateElement: HTMLElement
  private timeElement: HTMLElement
  private culture = 'en-US'
  private dateFormat = ''
  private timeFormat = ''
  // Observe the format attribute for changes
  static get observedAttributes(): string[] {
    return ['date-format', 'time-format', 'culture']
  }
  constructor() {
    super()

    // Attach a shadow root to the custom element
    this.shadowRoot = this.attachShadow({mode: 'open'})

    // Add the template to the shadow root
    const template = document.createElement('template')

    template.innerHTML = `
      <style>
        #time-container {
          display: flex;
          align-items: center;
          font-size: 1em;
          font-family: system-ui;
        }
        #date {
          margin-right: 1em;
        }
      </style>
      <div id="time-container">
        <!-- Display the current date and time -->
        <p id="date"></p>
        <p id="time"></p>
      </div>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    // Get the date and time elements
    this.dateElement = this.shadowRoot.querySelector('#date')!
    this.timeElement = this.shadowRoot.querySelector('#time')!
  }

  // Update the element when the format attribute changes
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if ((name === 'date-format' || name === 'time-format') && newValue !== oldValue) {
      // Get the current values of the date-format and time-format attributes
      this.dateFormat = this.getAttribute('date-format') || ''
      this.timeFormat = this.getAttribute('time-format') || ''
      this.culture = this.getAttribute('culture') || 'en-US'
      // Update the formatted date and time values using the new formats
      this.updateFormattedDate(this.dateFormat)
      this.updateFormattedTime(this.timeFormat)

      // Update the element every second
      setInterval(() => {
        this.updateFormattedDate(this.dateFormat)
        this.updateFormattedTime(this.timeFormat)
      }, 1000)
    }
  }

  private updateFormattedTime(format: string): void {
    // Get the current time
    const now = new Date()

    // Use the Intl.DateTimeFormat API to format the time
    const timeOptions = {
      hour: format.includes('h') ? 'numeric' : undefined,
      minute: format.includes('m') ? 'numeric' : undefined,
      second: format.includes('s') ? 'numeric' : undefined,
      hour12: format.includes('12') ? undefined : false,
    } as const
    const formattedTime = new Intl.DateTimeFormat(this.culture, timeOptions).format(now)

    // Update the formatted time element with the formatted time
    this.timeElement.textContent = formattedTime
  }

  private updateFormattedDate(format: string): void {
    // Get the current date
    const now = new Date()

    // Use the Intl.DateTimeFormat API to format the date
    const dateOptions = {
      year: format.includes('y') ? 'numeric' : undefined,
      month: format.includes('m') ? 'numeric' : undefined,
      day: format.includes('d') ? 'numeric' : undefined,
    } as const
    const formattedDate = new Intl.DateTimeFormat(this.culture, dateOptions).format(now)

    // Update the formatted date element with the formatted date
    this.dateElement.textContent = formattedDate
  }

  // Lifecycle callback that is called when the element is inserted into the DOM
  connectedCallback() {
    if (this.dateFormat === '' && this.timeFormat === '') {
      this.updateTime()
      setInterval(() => this.updateTime(), 1000)
    }
  }

  updateTime() {
    const now = new Date()
    this.dateElement.textContent = now.toDateString()
    this.timeElement.textContent = now.toTimeString()
  }
}
declare global {
  interface Window {
    DateTimeElement: typeof DateTimeElement
  }
}
// Define the custom element
//customElements.define('date-time', DateTimeElement);

export default DateTimeElement

if (!window.customElements.get('date-time')) {
  window.DateTimeElement = DateTimeElement
  window.customElements.define('date-time', DateTimeElement)
}

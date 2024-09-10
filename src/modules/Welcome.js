import Button from "../elements/Button"

class Welcome {
  /**
   * @type { HTMLDivElement | null }
   * @private
   */
  #$welcome = null

  /**
   * @type { Button }
   * @private
   */
  #$startBtn

  /**
   * @type { VoidFunction }
   * @private
   */
  #handleStart

  /**
   * @constructor
   * @param { {
   *   onStart: VoidFunction,
   * } }
   */
  constructor({ onStart }) {
    this.#handleStart = onStart

    this.#createWelcomeWrapper()
  }

  /**
   * @memberof Welcome
   * @public
   * @returns { HTMLDivElement }
   */
  get welcomeElement() {
    return this.#$welcome
  }

  /**
   * @private
   * @type { VoidFunction }
   */
  #createWelcomeWrapper = () => {
    const $welcomeWrapper = document.createElement("div")

    $welcomeWrapper.classList.add("field_wrapper")

    $welcomeWrapper.appendChild(this.#createWelcomeTitle())
    $welcomeWrapper.appendChild(this.#createStartButton())

    this.#$welcome = $welcomeWrapper
  }

  /**
   * @private
   * @returns { HTMLHeadingElement }
   */
  #createWelcomeTitle = () => {
    const $message = document.createElement("h3")

    $message.innerText = 'Welcome to "TEST SUIT QUEST"'

    return $message
  }

  /**
   * @private
   * @returns { HTMLButtonElement }
   */
  #createStartButton = () => {
    this.#$startBtn = new Button({
      text: "Start quest",
      onClick: this.#start,
    })

    return this.#$startBtn.buttonElement
  }

  /**
   * @type { VoidFunction }
   * @private
   */
  #start = () => {
    this.destroy()

    this.#handleStart()
  }

  /**
   * @type { VoidFunction }
   * @public
   */
  destroy = () => {
    this.#$startBtn.destroy()

    this.#$welcome.remove()
  }
}

export default Welcome

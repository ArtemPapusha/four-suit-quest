import Button from "../elements/Button";

class Welcome {
  /**
  * @type { HTMLDivElement }
  * @private
  */
  #$welcome = null;

  /**
  * @type { Button }
  * @private
  */
  #$startBtn

  /**
  * @type { VoidFunction }
  * @private
  */
    #handleStart;

  /**
  * @constructor
  * @param { {
  *   onStart: VoidFunction,
  * } }
  */
  constructor({ onStart }) {
    this.#handleStart = onStart;

    this.#createWelcomeWrapper();
  }

  /**
  * @memberof Welcome
  * @public
  * @returns { HTMLDivElement }
  */
  get welcomElement () {
    return this.#$welcome
  }

  /**
  * @private
  * @type { VoidFunction }
  */
  #createWelcomeWrapper = () => {
    const $welcomWrapper = document.createElement('div');

    $welcomWrapper.classList.add("field_wrapper");

    $welcomWrapper.appendChild(this.#createWelcomeTitle());
    $welcomWrapper.appendChild(this.#createStartButton());

    this.#$welcome = $welcomWrapper;
  }

  /**
  * @private
  * @returns { HTMLHeadingElement }
  */
  #createWelcomeTitle = () => {
    const $message = document.createElement('h3');

    $message.innerText = 'Welcome to "TEST SUIT QUEST"';

    return $message;
  }

  /**
  * @private
  * @returns { HTMLButtonElement }
  */
  #createStartButton = () => {
    this.#$startBtn = new Button({
      text: 'Start quest',
      onClick: this.#start
    })

    return this.#$startBtn.buttonElement;
  }

  /**
  * @type { VoidFunction }
  * @private
  */
  #start = () => {
    this.destroy();

    this.#handleStart();
  }

  /**
  * @type { VoidFunction }
  * @public
  */
  destroy = () => {
    this.#$welcome.remove();

    this.#$startBtn.destroy();
  }
}

export default Welcome;
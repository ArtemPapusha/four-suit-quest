import Button from "../elements/Button";

class Greetings {
  /**
  * @type { HTMLDivElement }
  * @private
  */
  #$greetings = null;

  /**
  * @type { Button }
  * @private
  */
  #$restartBtn = null;

  /**
  * @type { VoidFunction }
  * @private
  */
  #handleRestart;

  /**
  * @constructor
  * @param { {
  *   onRestart: VoidFunction,
  * } }
  */
  constructor({ onRestart }) {
    this.#handleRestart = onRestart;

    this.#createGreetingsWrapper();
  }

  /**
  * @memberof Greetings
  * @public
  * @returns { HTMLDivElement }
  */
  get greetingsElement () {
    return this.#$greetings
  }

  /**
  * @private
  * @type { VoidFunction }
  */
  #createGreetingsWrapper = () => {
    const $greetingWrapper = document.createElement('div');

    $greetingWrapper.classList.add("field_wrapper");

    $greetingWrapper.appendChild(this.#createGreetingsTitle());
    $greetingWrapper.appendChild(this.createRestartButton());

    this.#$greetings = $greetingWrapper
  }

  /**
  * @private
  * @returns { HTMLHeadingElement }
  */
  #createGreetingsTitle = () => {
    const $message = document.createElement('h3');

    $message.innerText = 'Congratulations! 🎉';

    return $message;
  }

  /**
  * @public
  * @returns { HTMLButtonElement }
  */
  createRestartButton = () => {
    this.#$restartBtn = new Button({
      text: 'Restart',
      onClick: this.#restart
    })

    return this.#$restartBtn.buttonElement;
  }

  /**
  * @type { VoidFunction }
  * @private
  */
  #restart = () => {
    this.destroy();

    this.#handleRestart();
  }

  /**
  * @type { VoidFunction }
  * @public
  */
  destroy = () => {
    this.#$greetings.remove();

    this.#$restartBtn.destroy();
  }
}

export default Greetings;
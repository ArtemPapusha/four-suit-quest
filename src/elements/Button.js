import Component from "./Component";

class Button extends Component {
  /**
  * @type { string }
  * @private
  */
  #text

  /**
  * @type { VoidFunction }
  * @private
  */
  #handleClick;

  /**
  * @constructor
  * @param { {
  *   text: string,
  *   onClick: VoidFunction,
  * } }
  */
  constructor({ text, onClick }) {
    super();

    this.#text = text;

    this.#handleClick = onClick;

    this.createElement();
  }

  /**
  * @memberof Button
  * @public
  * @returns { HTMLButtonElement }
  */
  get buttonElement () {
    return this.$element
  }

  /**
  * @override
  *
  * @type { VoidFunction }
  * @protected
  */
  createElement() {
    this.$element = document.createElement("button");

    this.$element.innerText = this.#text

    this.$element.classList.add("button");

    this.$element.addEventListener('click', this.#handleClick);
  }

  /**
  * @type { VoidFunction }
  * @public
  */
  destroy = () => {
    this.$element.remove();

    this.$element.removeEventListener('click', this.#handleClick)
  }
}

export default Button;
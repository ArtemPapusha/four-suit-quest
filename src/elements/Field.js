import Component from "../elements/Component"

/**
 * @extends Component
 */
class Field extends Component {
  constructor() {
    super()

    this.createElement()
  }

  /**
   * @memberof Field
   * @public
   * @returns { HTMLDivElement }
   */
  get fieldElement() {
    return this.$element
  }

  /**
   * @override
   *
   * @type { VoidFunction }
   * @protected
   */
  createElement() {
    this.$element = document.createElement("div")

    this.$element.classList.add("field")
  }
}

export default Field

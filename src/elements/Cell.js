import Component from "./Component"

/**
 * @extends Component
 */
class Cell extends Component {
  constructor() {
    super()

    this.createElement()
  }

  /**
   * @memberof Cell
   * @public
   * @returns { HTMLDivElement }
   */
  get cellElement() {
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
    this.$element.classList.add("cell")
  }
}

export default Cell

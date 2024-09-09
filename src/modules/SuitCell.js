import Cell from "../elements/Cell"

class SuitCell {
  /**
  * @type { HTMLDivElement }
  * @private
  */
  #$suitCell = null

  /**
  * @type {VoidFunction}
  * @private
  */
  #handleClick
  /**
  * @type {VoidFunction}
  * @private
  */
  #handleMouseEnter
  /**
  * @type {VoidFunction}
  * @private
  */
  #handleMouseLeave

  /**
  * @constructor
  * @param { {
  *   onClick: VoidFunction,
  *   onMouseEnter: VoidFunction,
  *   onMouseLeave: VoidFunction,
  * } }
  */
  constructor({ onClick, onMouseEnter, onMouseLeave }) {
    this.#createSuitCell()

    this.#handleClick = onClick;
    this.#handleMouseEnter = onMouseEnter;
    this.#handleMouseLeave = onMouseLeave;

    this.#addEventListeners();
  }

  /**
  * @memberof SuitCell
  * @public
  * @returns { HTMLDivElement }
  */
  get suitCellElement () {
    return this.#$suitCell
  }

  /**
  * @type { VoidFunction }
  * @private
  */
  #createSuitCell = () => {
    const $cell = new Cell().cellElement
    this.#$suitCell = $cell
  }

  /**
  * @type { VoidFunction }
  * @private
  */
  #addEventListeners = () => {
    this.#$suitCell.addEventListener("click", this.#handleClickWrapper);
    this.#$suitCell.addEventListener("mouseenter", this.#handleMouseEnterWrapper);
    this.#$suitCell.addEventListener("mouseleave", this.#handleMouseLeaveWrapper);
  }

  /**
  * @memberof SuitCell
  * @type { VoidFunction }
  * @public
  */
  removeEventListeners = () => {
    this.#$suitCell.removeEventListener("click", this.#handleClickWrapper);
    this.#$suitCell.removeEventListener("mouseenter", this.#handleMouseEnterWrapper);
    this.#$suitCell.removeEventListener("mouseleave", this.#handleMouseLeaveWrapper);
  }

  /**
  * @type { VoidFunction }
  * @private
  */
  #handleClickWrapper = () => {
    this.#handleClick(this.#$suitCell);
  }

  /**
  * @type { VoidFunction }
  * @private
  */
  #handleMouseEnterWrapper = () => {
    this.#handleMouseEnter(this.#$suitCell);
  }

  /**
  * @type { VoidFunction }
  * @private
  */
  #handleMouseLeaveWrapper = () => {
    this.#handleMouseLeave(this.#$suitCell);
  }
}

export default SuitCell
import Field from "../elements/Field"
import SuitCell from "./SuitCell"

import { COLUMN_AMOUNT, ROW_AMOUNT } from "../constants"

class SuitField {
  /**
   * @type { HTMLDivElement }
   * @private
   */
  #$suitCell = null

  /**
   * @type { HTMLDivElement }
   * @private
   */
  #$suitField = null

  /**
   * @type { Array<HTMLDivElement> }
   * @private
   */
  #suitCells = []

  /**
   * @type { Array<SuitCell> }
   * @private
   */
  #$suitCellInstances = []

  constructor({ createSuitCell }) {
    this.createSuitCell = createSuitCell

    this.#createSuitField()
    this.#suitFieldFilling()
  }

  /**
   * @memberof SuitField
   * @public
   * @returns { HTMLDivElement }
   */
  get suitFieldElement() {
    return this.#$suitField
  }

  /**
   * @memberof SuitField
   * @public
   * @returns { Array<HTMLDivElement> }
   */
  get suitCells() {
    return this.#suitCells
  }

  /**
   * @type { VoidFunction }
   * @private
   */
  #createSuitField = () => {
    const $field = new Field().fieldElement

    this.#$suitField = $field
  }

  /**
   * @type { VoidFunction }
   * @private
   */
  #suitFieldFilling = () => {
    this.#setSuitFieldProperties()

    for (let i = 0; i < COLUMN_AMOUNT * ROW_AMOUNT; i++) {
      this.#$suitCell = this.createSuitCell()
      this.#$suitCellInstances.push(this.#$suitCell)
      this.#suitCells.push(this.#$suitCell.suitCellElement)
      this.#$suitField.appendChild(this.#$suitCell.suitCellElement)
    }
  }

  /**
   * @type { VoidFunction }
   * @private
   */
  #setSuitFieldProperties = () => {
    this.#$suitField.style.setProperty("--column-amount", COLUMN_AMOUNT)
    this.#$suitField.style.setProperty("--row-amount", ROW_AMOUNT)
  }

  /**
   * @type { VoidFunction }
   * @public
   */
  destroy = () => {
    this.#$suitCellInstances.map(cell => cell.removeEventListeners())

    this.#$suitField.remove()
  }
}

export default SuitField

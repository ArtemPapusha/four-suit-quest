import { $app } from "../constants"
import SuitCell from "./SuitCell"
import SuitField from "./SuitField"
import Greetings from "./Greetings"
import Welcome from "./Welcome"

import { SUIT_KEY, SUIT_SYMBOL, CHECK } from "../constants"

class Quest {
  static SUITS = Object.keys(SUIT_KEY)

  /**
   * @type { SuitField | null }
   * @private
   */
  #suitField = null

  /**
   * @private
   * @type { VoidFunction }
   */
  #createSuitField = () => {
    this.#suitField = new SuitField({
      createSuitCell: this.#createSuitCell,
    })
  }

  /**
   * @private
   * @returns { HTMLDivElement }
   */
  #createSuitCell = () => {
    const $suitCell = new SuitCell({
      onClick: this.#handleClickSuitCell,
      onMouseEnter: this.#handleMouseEnterSuitCell,
      onMouseLeave: this.#handleMouseLeaveSuitCell,
    })

    const randomSuit = this.#getRandomSuit()

    $suitCell.suitCellElement.classList.add(SUIT_KEY[randomSuit])

    $suitCell.suitCellElement.innerText = SUIT_SYMBOL[randomSuit] ?? ""

    return $suitCell
  }

  /**
   * @private
   * @param { HTMLDivElement } firstElement
   * @returns { void }
   */
  #handleClickSuitCell = firstElement => {
    this.checkGroup(firstElement, el => {
      el.innerText = CHECK
      el.classList.remove(el.classList[1])
      el.classList.add("check")

      this.#greetings()
    })
  }

  /**
   * @private
   * @param { HTMLDivElement } firstElement
   * @returns { void }
   */
  #handleMouseEnterSuitCell = firstElement => {
    this.checkGroup(firstElement, el => {
      el.classList.add("cell-hover")
    })
  }

  /**
   * @private
   * @param { HTMLDivElement } firstElement
   * @returns { void }
   */
  #handleMouseLeaveSuitCell = firstElement => {
    this.checkGroup(firstElement, el => {
      el.classList.remove("cell-hover")
    })
  }

  /**
   * @private
   * @returns { string }
   */
  #getRandomSuit = () => {
    const randomIndex = Math.floor(Math.random() * Quest.SUITS.length)

    const randomSuit = Quest.SUITS[randomIndex]

    return randomSuit
  }

  /**
   * @private
   * @param { HTMLDivElement } element
   * @returns { Array<HTMLDivElement> }
   */
  #getSuitGroup = element => {
    return this.#suitField.suitCells.filter(cell =>
      cell.classList.contains(element.classList[1])
    )
  }

  /**
   * @param { HTMLDivElement } firstElement
   * @param { (el: HTMLDivElement) => void } callback
   * @memberof SuitField
   * @public
   */
  checkGroup = (firstElement, callback) => {
    /**
     * @type {Set<HTMLDivElement>}
     */
    const processedElements = new Set()

    /**
     * @type {Map<HTMLDivElement, null>}
     */
    const elementsQueue = new Map()

    elementsQueue.set(firstElement)
    processedElements.add(firstElement)

    const processAdjacentElements = element => {
      const elementRect = element?.getBoundingClientRect()
      const suitGroup = this.#getSuitGroup(firstElement)

      suitGroup.forEach(suitElement => {
        const suitRect = suitElement?.getBoundingClientRect()

        if (
          !processedElements.has(suitElement) &&
          ((suitRect.y === elementRect.y - suitRect.height &&
            suitRect.x === elementRect.x) ||
            (suitRect.y - elementRect.height === elementRect.y &&
              suitRect.x === elementRect.x) ||
            (suitRect.x === elementRect.x - suitRect.width &&
              suitRect.y === elementRect.y) ||
            (suitRect.x - elementRect.width === elementRect.x &&
              suitRect.y === elementRect.y))
        ) {
          elementsQueue.set(suitElement)
          processedElements.add(suitElement)
        }
      })

      callback(element)
    }

    while (elementsQueue.size > 0) {
      const currentElement = elementsQueue.keys().next().value
      elementsQueue.delete(currentElement)
      processAdjacentElements(currentElement)
    }
  }

  /**
   * @type { VoidFunction }
   * @private
   */
  #greetings = () => {
    const arr = [...this.#suitField.suitFieldElement.childNodes]

    const allChecked = arr.every(node => node.classList.contains("check"))

    const $greetings = new Greetings({
      onRestart: this.#startQuest,
    })

    if (allChecked) {
      this.#suitField.destroy()
      $app.appendChild($greetings.greetingsElement)
    }
  }

  /**
   * @type { VoidFunction }
   * @public
   */
  welcome = () => {
    const welcome = new Welcome({ onStart: this.#startQuest })

    $app.appendChild(welcome.welcomeElement)
  }

  /**
   * @private
   * @type { VoidFunction }
   */
  #render = () => {
    $app.appendChild(this.#suitField.suitFieldElement)
  }

  /**
   * @private
   * @type { VoidFunction }
   */
  #startQuest = () => {
    this.#createSuitField()

    this.#render()
  }
}

export default Quest


/**
 * @class
 * @abstract
 */
class Component {
  /**
  * @type { HTMLElement }
  * @private
  */
  _$element = null

  constructor() {
    if(this.constructor === Component) {
       throw new Error("Class is of abstract type and can't be instantiated");
    };

    if(this.createElement === undefined) {
        throw new Error("createElement method must be implemented");
    };
 }

  /**
  * @protected
  * @returns { HTMLElement }
  */
  get $element () {
    return this._$element
  }

  /**
  * @protected
  * @param { HTMLElement } $el
  */
   set $element($el) {
      this._$element = $el
   }
}

export default Component
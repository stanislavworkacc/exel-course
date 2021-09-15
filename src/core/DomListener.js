import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`no $root provided for DOMLost`)
    }
    this.$root = $root;
    this.listenets = listeners;
  }

  initDOMListeners() {
    this.listenets.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        // eslint-disable-next-line max-len
        throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    })
  }

  removeDOMListeners() {
    this.listenets.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}

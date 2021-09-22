export class Emitter {
  constructor() {
    this.listenets = {};
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listenets[event])) {
      return;
    }
    this.listenets[event].forEach(listener => {
      listener(...args)
    })
    return true;
  }

  subscribe(event, fn) {
    this.listenets[event] = this.listenets[event] || [];
    this.listenets[event].push(fn);
    return () => {
      this.listenets[event] =
            this.listenets[event]
                .filter(listener => listener !== fn)
    }
  }
}

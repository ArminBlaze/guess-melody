// Издатель
class EventBus {
  constructor() {
    this.subscribers = {
      any: [] // тип события: подписчик
    };
  }


  subscribe(type, fn) {
    type = type || `any`;
    if (typeof this.subscribers[type] === `undefined`) {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  }

  unsubscribe(type, fn) {
    this.visitSubscribers(`unsubscribe`, fn, type);
  }

  publish(type, publication) {
    this.visitSubscribers(`publish`, type, publication);
  }

  visitSubscribers(action, type, arg) {
    let pubtype = type || `any`;
    let subscribers = this.subscribers[pubtype];
    let i;
    let max = subscribers.length;

    for (i = 0; i < max; i += 1) {
      if (action === `publish`) {
        subscribers[i](arg);
      } else {
        if (subscribers[i] === arg) {
          subscribers.splice(i, 1);
        }
      }
    }
  }

}

export default new EventBus();

'use strict';

// Sujeto canonico GoF.
class Subject {
  attach(_eventType, _observer)         { throw new Error('not implemented'); }
  detach(_eventType, _observer)         { throw new Error('not implemented'); }
  notifyObserver(_eventType, _event)    { throw new Error('not implemented'); }
}

module.exports = Subject;

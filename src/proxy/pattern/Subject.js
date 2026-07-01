'use strict';

// Interfaz Subject GoF. En JS: contrato por metodo.
class Subject {
  doService() { throw new Error('not implemented'); }
}

module.exports = Subject;

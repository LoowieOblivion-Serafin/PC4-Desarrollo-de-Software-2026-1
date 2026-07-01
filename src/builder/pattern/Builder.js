'use strict';

// Contrato Builder canonico (GoF).
class Builder {
  buildPartOne()   { throw new Error('not implemented'); }
  buildPartTwo()   { throw new Error('not implemented'); }
  buildPartThree() { throw new Error('not implemented'); }
  getProduct()     { throw new Error('not implemented'); }
}

module.exports = Builder;

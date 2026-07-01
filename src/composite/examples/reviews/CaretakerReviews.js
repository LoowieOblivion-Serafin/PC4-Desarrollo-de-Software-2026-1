'use strict';

/**
 * Composite: perfil del cuidador agrega resenas verificadas.
 * RF3.4: promedio se calcula solo sobre entradas verificadas.
 */
class CaretakerReviews {
  constructor(caretakerName) {
    this.caretakerName = caretakerName;
    this.children = [];
  }

  add(node)    { this.children.push(node); }
  remove(node) {
    const i = this.children.indexOf(node);
    if (i >= 0) this.children.splice(i, 1);
  }

  averageRating() {
    let sum = 0;
    let count = 0;
    for (const n of this.children) {
      sum += n.averageRating() * n.reviewCount();
      count += n.reviewCount();
    }
    return count === 0 ? 0 : sum / count;
  }

  reviewCount() {
    return this.children.reduce((t, n) => t + n.reviewCount(), 0);
  }

  label() { return this.caretakerName; }
}

module.exports = CaretakerReviews;

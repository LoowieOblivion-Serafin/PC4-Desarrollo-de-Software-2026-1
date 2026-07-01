'use strict';

/** Hoja: resena individual verificada de un dueno. */
class Review {
  constructor(ownerName, stars, verified) {
    if (stars < 1 || stars > 5) throw new Error('stars 1..5');
    this.ownerName = ownerName;
    this.stars = stars;
    this.verified = verified;
  }
  averageRating() { return this.verified ? this.stars : 0; }
  reviewCount()   { return this.verified ? 1 : 0; }
  label()         { return `${this.ownerName} (${this.stars}*)`; }
}

module.exports = Review;

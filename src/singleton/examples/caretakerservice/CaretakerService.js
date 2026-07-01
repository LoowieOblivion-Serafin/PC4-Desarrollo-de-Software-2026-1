'use strict';

/**
 * RNF3.2: servicio independiente. Singleton mantiene su propio registro
 * aislado del sistema de alertas para soportar picos de demanda vacacional.
 */
class CaretakerService {
  constructor() {
    this.caretakers = [];
    this.reviews = [];
    this.publiclyEnabled = false;
  }

  static getInstance() {
    if (!CaretakerService._instance) CaretakerService._instance = new CaretakerService();
    return CaretakerService._instance;
  }

  enablePublicListing() { this.publiclyEnabled = true; }
  isPubliclyEnabled()   { return this.publiclyEnabled; }

  register(caretaker, reviews) {
    this.caretakers.push(caretaker);
    this.reviews.push(reviews);
  }

  ratingOf(index) { return this.reviews[index].averageRating(); }
}

module.exports = CaretakerService;

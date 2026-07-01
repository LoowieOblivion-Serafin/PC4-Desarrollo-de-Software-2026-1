'use strict';

class Pet {
  constructor(name, species, breed, photoUrl, description) {
    this.name = name;
    this.species = species;
    this.breed = breed;
    this.photoUrl = photoUrl;
    this.description = description;
  }

  toString() {
    return `Pet{name=${this.name}, species=${this.species}, breed=${this.breed}}`;
  }
}

module.exports = Pet;

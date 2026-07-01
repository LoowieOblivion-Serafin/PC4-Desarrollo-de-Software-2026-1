'use strict';

const PetReportBuilder = require('./PetReportBuilder');
const Owner = require('../../../petapp/domain/Owner');

const report = new PetReportBuilder()
  .withPet('Firulais', 'Perro', 'Labrador', 'http://cdn/pic.jpg', 'Collar rojo, timido')
  .withOwner(new Owner('Ana Perez', '999999999', 'ana@mail.com', '12345678'))
  .withLocation(-12.0464, -77.0428)
  .build();

console.log(report.toString());

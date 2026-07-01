'use strict';

const Owner = require('../../../petapp/domain/Owner');
const RealOwnerContact = require('./RealOwnerContact');
const AnonymousOwnerProxy = require('./AnonymousOwnerProxy');

const owner = new Owner('Ana Perez', '999999999', 'ana@mail.com', '12345678');
const publicView = new AnonymousOwnerProxy(new RealOwnerContact(owner), 'Dueno#4821');
console.log(`Vista publica: ${publicView.getName()} / tel=${publicView.getPhone()} / email=${publicView.getEmail()}`);

'use strict';

const LostPetAlertService = require('./LostPetAlertService');
const LostPetEvent = require('./LostPetEvent');
const NearbyUser = require('./NearbyUser');
const Location = require('../../../petapp/domain/Location');

const svc = new LostPetAlertService();
const center = new Location(-12.0464, -77.0428);

svc.register(new NearbyUser('Alice', new Location(-12.0470, -77.0430)));
svc.register(new NearbyUser('Bob',   new Location(-12.1000, -77.1000)));
svc.register(new NearbyUser('Carla', new Location(-12.0500, -77.0450)));

svc.broadcast(new LostPetEvent('Firulais', center, 'Perro labrador, collar rojo'), center, 1.0);

'use strict';

class Location {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  distanceKmTo(other) {
    const R = 6371;
    const toRad = d => (d * Math.PI) / 180;
    const dLat = toRad(other.latitude - this.latitude);
    const dLon = toRad(other.longitude - this.longitude);
    const a = Math.sin(dLat / 2) ** 2
            + Math.cos(toRad(this.latitude))
            * Math.cos(toRad(other.latitude))
            * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  toString() {
    return `(${this.latitude.toFixed(4)}, ${this.longitude.toFixed(4)})`;
  }
}

module.exports = Location;

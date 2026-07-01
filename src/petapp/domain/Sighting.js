'use strict';

class Sighting {
  constructor(photoUrl, location, anonymousReporterId) {
    this.photoUrl = photoUrl;
    this.location = location;
    this.anonymousReporterId = anonymousReporterId;
  }
}

module.exports = Sighting;

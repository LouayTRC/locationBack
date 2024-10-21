class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude; 
    }

    distanceTo(otherLocation) {
        const R = 6371; // Radius of the Earth in kilometers
    
        // Convert latitude and longitude from degrees to radians
        const lat1 = this.latitude * (Math.PI / 180);
        const lat2 = otherLocation.latitude * (Math.PI / 180);
        const deltaLat = (otherLocation.latitude - this.latitude) * (Math.PI / 180);
        const deltaLon = (otherLocation.longitude - this.longitude) * (Math.PI / 180);
    
        // Apply the Haversine formula
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = R * c; // Distance in kilometers
        return distance;
    }
}

module.exports=Location
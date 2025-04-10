class ParkingAttendant {
  constructor(parkingLot) {
    if (!parkingLot) throw new Error("parkingLot is required")
    this.parkingLot = parkingLot
  }

  park(car) {
    return this.parkingLot.park(car)
  }

  unpark(ticket) {
    return this.parkingLot.unpark(ticket)
  }
}

module.exports = ParkingAttendant
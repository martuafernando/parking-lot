const Car = require("./car")
const ParkingTicket = require("./parking-ticket")

class ParkingLot {
  #availableSlot
  #ticketToCarMap = {}
  #incremental = 1

  constructor(maximumSlot) {
    if (!maximumSlot) throw new Error("maximumSlot is required")
    this.#availableSlot = maximumSlot
  }

  park(car) {
    if (!(car instanceof Car)) {
      throw new Error("Car should be a Car")
    }

    if (this.#availableSlot <= 0) {
      throw new Error("There is no parking slot left")
    }

    const ticketNumber = this.#generateUniqueTicket()
    
    this.#availableSlot--
    this.#ticketToCarMap[ticketNumber] = car

    return new ParkingTicket(ticketNumber)
  }

  unpark(ticket) {
    if (!(ticket instanceof ParkingTicket)) {
      throw new Error("Ticket should be a ParkingTicket")
    }

    const car = this.#ticketToCarMap[ticket.ticketNumber]

    if (!car) {
      throw new Error("There is no ticket with that number")
    }

    delete this.#ticketToCarMap[ticket.ticketNumber]
    this.#availableSlot++

    return car
  }

  #generateUniqueTicket() {
    const result = this.#incremental++

    return result
  }
}

module.exports = ParkingLot

const ParkingAttendant = require("../domain/parking-attendant");
const Car = require("../domain/car");
const ParkingLot = require("../domain/parking-lot");
const ParkingTicket = require("../domain/parking-ticket");

describe("ParkingAttendant", () => {
  describe("Park", () => {
    it("should return parking ticket when parking the car", () => {
      // Given
      const car = new Car("B 1234 ABC");
      const parkingLot = new ParkingLot(10)
      const parkingAttendant = new ParkingAttendant(parkingLot)

      // When
      const result = parkingAttendant.park(car)

      // Then
      expect(result).toBeInstanceOf(ParkingTicket)
    });

    it("should throw error parking when the parking is full", () => {
      // Given
      const car = new Car("B 1234 ABC");
      const car1 = new Car("B 1235 ABC");
      const parkingLot = new ParkingLot(1)
      const parkingAttendant = new ParkingAttendant(parkingLot)

      // When
      parkingLot.park(car)
      const result = () => parkingAttendant.park(car1)

      // Then
      expect(result).toThrow(new Error("There is no parking slot left"))
    });

    it("should throw error when park receive beside car class", () => {
      // Given
      const parkingTicket = new ParkingTicket("B 1234 ABC");
      const parkingLot = new ParkingLot(1)
      const parkingAttendant = new ParkingAttendant(parkingLot)

      // When
      const result = () => parkingAttendant.park(parkingTicket)

      // Then
      expect(result).toThrow(new Error("Car should be a Car"))
    });
  })

  describe("Unpark", () => {
    it("should throw error when unpark receive outside parkingTicket class", () => {
      // Given
      const parkingTicket = new Car("B 1234 ABC");
      const parkingLot = new ParkingLot(1)
      const parkingAttendant = new ParkingAttendant(parkingLot)

      // When
      const result = () => parkingAttendant.unpark(parkingTicket)

      // Then
      expect(result).toThrow(new Error("Ticket should be a ParkingTicket"))
    });

    it("should throw error if the ticket is unregistered", () => {
      // Given
      const ticket = new ParkingTicket("testingTicket");
      const parkingLot = new ParkingLot(1)
      const parkingAttendant = new ParkingAttendant(parkingLot)

      // When
      const result = () => parkingAttendant.unpark(ticket)

      // Then
      expect(result).toThrow(new Error("There is no ticket with that number"))
    });

    it("should unpark the right car", () => {
      // Given
      const parkingLot = new ParkingLot(2)
      const parkingAttendant = new ParkingAttendant(parkingLot)
      parkingAttendant.park(new Car("B 9874 ABC"))
    
      const car = new Car("B 1234 ABC");
      const ticket = parkingAttendant.park(car)

      // When
      const result = parkingAttendant.unpark(ticket)

      // Then
      expect(result).toBeInstanceOf(Car)
      expect(result.plate).toEqual("B 1234 ABC")
    });
  })
});

export type Customer = {
  customerId: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  birthday: string;
  address: string;
  nationality: string;
  emailValidated: boolean;
  cccd: string;
  cccdPicture: string;
  profilePicture: string;
  createAt: string;
  updateAt: string;
};
export type Staff = {
  staffId: string;
  username: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  role: string;
  createAt: string;
  updateAt: string;
};

export type SeatColor = "green" | "red" | "blue" | "yellow";

export type SeatGrid = {
  seatId: string;
  class: string;
  priceBonusInterest: string;
  color: string;
  selected: boolean;
};

export type BookingType = {
  bookingId: string;
  paymentStatus: boolean;
  bookingStatus: string;
  passengerId: string;
  price: string;
  bookedAt: string;
  updateAt: string;
  seatId: string;
  flightId: string;
  class: string;
  brand: string;
};
export type TicketType = {
  ticketId: string;
  flightId: string;
  bookingId: string;
  passenger: {
    passengerId: string;
    fullName: string;
    cccd: string;
    email: string;
    phoneNumber: string;
  };
  price: string;
  seat: {
    seatId: string;
    class: string;
  };
  status: string;
  sellAt: string;
  updateAt: string;
};
export type FlightType = {
  flightId: string;
  logo: string;
  brand: string;
  date: string;
  time: string;
  duration?: string;
  departure: string;
  airportStart?: string;
  airportEnd?: string;
  arrival: string;
  seat: string;
  placed?: string;
  status: string;
  price: string | number;
  seatsTotal: number;
  seatsAvailable: number;
  createAt?: string;
  updateAt?: string;
  description?: string;
  intermediate?: IntermediateAirport[];
};

export type IntermediateAirport = {
  flightId: string;
  airportId: string;
  duration: string;
  notes: string;
};

export type AirplaneType = {
  airplaneModel: string;
  airlinePicture: string;
  airlines: string;
  description?: string;
  total_seat: string;
  total_business_seat: string;
  total_economy_seat: string;
  status: string;
};

export type AirportType = {
  airportId?: string;
  airportCode?: string;
  time?: string;
  airportName?: string;
  city: string;
  country: string;
  description: string;
  status: string;
  available?: string;
};

export type chart = {
  tittle: string;
  indicate?: string;
  unit: string;
  datas: number[];
  labels: string[];
};

export type Rules = {
  minFlightDuration: GLfloat;
  maxIntermediateAirport: number;
  minIntermediateAirportStopDelay: number;
  maxIntermediateAirportStopDelay: number;

  minBookingTime: number;
  minCancelBookingTime: number;
};

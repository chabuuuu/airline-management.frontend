"use client";

function CreateFlightForm() {
    return (
        <form className="p-6 mx-auto bg-white shadow-md rounded  pt-6 pb-8 mb-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Tạo chuyến bay</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Thông tin chuyến bay</h2>

                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline">
                            Hãng máy bay
                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Hãng máy bay"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flightCode">
                            Mã chuyến bay
                        </label>
                        <input
                            id="flightCode"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Mã chuyến bay"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline">
                            Giá vé
                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Giá vé"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flightCode">
                            Ngày giờ
                        </label>
                        <input
                            id="flightCode"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ngày giờ"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureAirport">
                            Sân bay đi
                        </label>
                        <input
                            id="departureAirport"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Sân bay đi"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrivalAirport">
                            Sân bay đến
                        </label>
                        <input
                            id="arrivalAirport"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Sân bay đến"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="grid grid-cols-3 gap-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstClassSeats">
                            Số ghế hạng 1
                        </label>
                        <input
                            id="firstClassSeats"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-20"
                            type="text"
                            placeholder="Số ghế hạng 1"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secondClassSeats">
                            Số ghế hạng 2
                        </label>
                        <input
                            id="secondClassSeats"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-20"
                            type="text"
                            placeholder="Số ghế hạng 2"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Sân bay trung gian</h2>

                <div className="grid grid-cols-3 gap-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stt">
                            STT
                        </label>
                        <input
                            id="stt"
                            className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-9 h-9"
                            type="text"
                        />
                    </div>

                    <div className="col-span-2">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flightCode">
                                    Sân bay trung gian
                                </label>
                                <input
                                    id="flightCode"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Sân bay trung gian"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flightTime">
                                    Thời gian
                                </label>
                                <input
                                    id="flightTime"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Thời gian"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
                            Ghi chú
                        </label>
                        <input
                            id="note"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ghi chú"
                        />
                    </div>
                    <div>
                        <button className="block text-gray-500 text-sm font-bold mb-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:bg-gray-300">
                            +
                        </button>
                    </div>

                </div>
            </div>

            <div className="flex items-center justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                    type="button"
                >
                    Tạo chuyến bay
                </button>
            </div>
        </form>
    );
}

export default CreateFlightForm;

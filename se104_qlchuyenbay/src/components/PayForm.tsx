import PayForm from "@/components/PayForm";
import BottomNavbar from "@/components/BottomNavbar";
import Link from "next/link";

function iPayPage() {
    return (
        <div className=" flex justify-between  md:flex-row">
            <div className="bg-white p-6 rounded-2xl" >
                <h1 className="text-3xl font-bold mb-4">Thanh toán</h1>
                {/* chọn quốc gia */}
                <div className="flex items-center">
                    <h1 className="text-xl font-bold">Quốc gia</h1>
                    <p className="ml-2">(Bắt buộc)</p>
                </div>


                <details className="dropdown">
                    <summary className="m-1 btn">Quốc Gia</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li>Việt Nam</li>
                        <li>Brazils</li>
                    </ul>
                </details>
                <p className="mb-6">CSE is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.</p>
                {/* chọn hình thức thanh toán */}
                <details className="collapse collapse-arrow bg-base-200 mb-2">
                    <summary className="collapse-title text-xl font-medium mb-2">Visa **** 2340</summary>

                    <div className="collapse-content">
                        <label className="block text-gray-700 text-sm font-bold mb-2 w-auto" htmlFor="airline">
                            Name on card
                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Name on card"
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2 w-auto" htmlFor="airline">
                            Card number
                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Card number"
                        />
                        <div className="flex justify-between">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2 w-auto" htmlFor="airline1">
                                    Expiry day
                                </label>
                                <input
                                    id="airline1"
                                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Expiry day"
                                />
                            </div>
                        </div>
                    </div>
                </details>

                <details className="collapse collapse-arrow bg-base-200 mb-2">
                    <summary className="collapse-title text-xl font-medium">Credit/Debit card</summary>
                    <div className="collapse-content">
                        <label className="block text-gray-700 text-sm font-bold mb-2 w-auto" htmlFor="airline">
                            Name on card
                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Name on card"
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2 w-auto" htmlFor="airline">
                            Card number
                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Card number"
                        />
                        <div className="flex justify-between">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2 w-auto" htmlFor="airline1">
                                    Expiry day
                                </label>
                                <input
                                    id="airline1"
                                    className="shadow appearance-none border w-1/2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Expiry day"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2 w-auto" htmlFor="airline2">
                                    CVC/CVV
                                </label>
                                <input
                                    id="airline2"
                                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="CVC/CVV"
                                />
                            </div>
                        </div>
                    </div>
                </details>
                <details className="collapse collapse-arrow bg-base-200">
                    <summary className="collapse-title text-xl font-medium">PayPal</summary>
                    <div className="collapse-content">
                        <label className="block text-gray-700 w-auto text-sm font-bold mb-2" htmlFor="airline">
                            Name on card
                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Name on card"
                        />
                        <label className="block text-gray-700 w-auto text-sm font-bold mb-2" htmlFor="airline">
                            Card number
                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Card number"
                        />
                        <div className="flex justify-between">
                            <div>
                                <label className="block text-gray-700 w-auto text-sm font-bold mb-2" htmlFor="airline1">
                                    Expiry day
                                </label>
                                <input
                                    id="airline1"
                                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Expiry day"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 w-auto text-sm font-bold mb-2" htmlFor="airline2">
                                    CVC/CVV
                                </label>
                                <input
                                    id="airline2"
                                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="CVC/CVV"
                                />
                            </div>
                        </div>
                    </div>
                </details>
            </div>

            <div className="flex flex-col justify-between max-w-[500px] p-4 mb-3 ">
                <div>
                    <h2 className="text-xl font-bold mb-4">Summary</h2>
                    {/* thẻ này để tính tổng tiền cần thanh toán (gốc - giảm giá) */}

                    <div className="flex justify-between">
                        <p>Original Price:</p>
                        <p className="text-xl font-semibold my-1">₫1,350,000</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Discounts:</p>
                        <p className="text-xl font-semibold my-1">-₫1,001,000</p>
                    </div>
                    <div className="divider"></div>
                    <div className="flex justify-between">
                        <p>Total:</p>
                        <p className="text-xl font-semibold my-1">₫349,000</p>
                    </div>
                    <p className="text-sm mt-4">By completing your purchase you agree to these Terms of Service.</p>

                </div>
                <div className="w-full">

                    <button className="w-full bg-purple-500 mx-auto block text-white rounded px-4 py-2 mb-4">Complete Checkout</button>
                    <button className="w-full bg-gray-700 mx-auto block text-white rounded px-4 py-2">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default iPayPage;

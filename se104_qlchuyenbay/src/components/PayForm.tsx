import PayForm from "@/components/PayForm";
import BottomNavbar from "@/components/BottomNavbar";
import Link from "next/link";

function iPayPage() {
    return (
        <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
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
                <p>Udemy is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.</p>
                {/* chọn hình thức thanh toán */}
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        Visa **** 1234
                    </div>
                    <div className="collapse-content">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline">
                            Name on card                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Name on card"
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline">
                            Card number                       </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Card number"
                        />
                        <div className="flex justify-between">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline1">
                                    Expiry day
                                </label>
                                <input
                                    id="airline1"
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Expiry day"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline2">
                                    CVC/CVV
                                </label>
                                <input
                                    id="airline2"
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="CVC/CVV"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        Credit/Debit card
                    </div>
                    <div className="collapse-content">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline">
                            Name on card                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Name on card"
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline">
                            Card number                       </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Card number"
                        />
                        <div className="flex justify-between">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline1">
                                    Expiry day
                                </label>
                                <input
                                    id="airline1"
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Expiry day"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline2">
                                    CVC/CVV
                                </label>
                                <input
                                    id="airline2"
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="CVC/CVV"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        PayPal
                    </div>
                    <div className="collapse-content">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline">
                            Name on card                        </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Name on card"
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline">
                            Card number                       </label>
                        <input
                            id="airline"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Card number"
                        />
                        <div className="flex justify-between">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline1">
                                    Expiry day
                                </label>
                                <input
                                    id="airline1"
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Expiry day"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airline2">
                                    CVC/CVV
                                </label>
                                <input
                                    id="airline2"
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="CVC/CVV"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:w-1/2 p-4 bg-gray-100">
                <h2 className="text-xl font-bold mb-4">Summary</h2>
                {/* thẻ này để tính tổng tiền cần thanh toán (gốc - giảm giá) */}
                <p>Original Price: ₫1,699,000</p>
                <p>Discounts: ₫1,350,000</p>
                <p>Total: ₫349,000</p>
                <p>By completing your purchase you agree to these Terms of Service.</p>
                <button className="bg-purple-500 mx-auto block text-white rounded px-4 py-2 mt-4">Complete Checkout</button>
                <p>30-Day Money-Back Guarantee</p>
            </div>
        </div>
    );
}

export default iPayPage;

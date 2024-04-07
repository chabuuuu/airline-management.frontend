"use client"

const RegulationsPage = () => {
    return(
      <div className="flex justify-center items-center ">
        <div className="flex justify-center w-full h-[700px] items-center bg-white ">
         <div className="flex">
          <div className="flex flex-col justify-center rounded-e-2xl  bg-white p-6">
            <div className="grid grid-cols-3 gap-x-11">
              <div className="px-0">
                <button className="inline-block py-2 px-8 text-gray-800 bg-[#D5D5D5] hover:bg-gray-500 rounded-full">QUAY LẠI</button>
              </div>
              <div className="pt-1">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">QUY ĐỊNH</h2>
              </div>
              <div className="grid grid-cols-2 gap-x-7 px-0">
              <div className="px-0">
                <button className="inline-block py-2 px-8 text-gray-800 bg-[#D5D5D5] hover:bg-gray-500 rounded-full">THÊM</button>
              </div>
              <div className="px-0">
                <button className="inline-block py-2 px-8 text-gray-800 bg-[#D5D5D5] hover:bg-gray-500 rounded-full">SỬA</button>
              </div>
              </div>
              <div className="mt-6 border-t border-gray-100 mb-10">
    <dl className="divide-y divide-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-64 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">QĐ1</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">Có 10 sân bay. Thời gian bay tối thiểu là 30 phút. Có tối đa 2 sân bay trung gian với thời gian dừng từ 10 đến 20 phút.</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-8 sm:gap-64 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">QĐ2</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">Chỉ bán vé khi còn chỗ. Có 2 hạng vé (1, 2). Vé hạng 1 bằng 105% của đơn giá, vé hạng 2 bằng với đơn giá, mỗi chuyến bay có một giá vé riêng.</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-8 sm:gap-64 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">QĐ3</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">Chỉ cho đặt vé chậm nhất 1 ngày trước khi khởi hành. Vào ngày khởi hành tất cả các phiếu đặt sẽ bị hủy.</dd>
      </div>
      </dl>
            </div>

          </div>
        </div>
    </div>
      </div>
    </div>
    
    )
    
}

export default RegulationsPage;

"use client"
import BottomNavbar from "@/components/BottomNavbar";
const RegulationsPage = () => {
  const regulations = [
    {
      id: 1,
      title: 'Quy định về an toàn',
      description: 'Mọi hành khách đều phải tuân thủ quy định về an toàn khi ở trong khu vực sân bay.',
    },
    {
      id: 2,
      title: 'Quy định về hành lý',
      description: 'Hành lý cá nhân của hành khách không được vượt quá kích thước và trọng lượng quy định.',
    },
    {
      id: 3,
      title: 'Quy định về an ninh',
      description: 'Hành khách phải tuân thủ tất cả các biện pháp an ninh do sân bay áp đặt.',
    },
    {
      id: 4,
      title: 'Quy định về mua vé',
      description: 'Chỉ cho đặt vé chậm nhất 1 ngày trước khi khởi hành. Vào ngày khởi hành tất cả các phiếu đặt sẽ bị hủy.',
    },
  ];
    return(
      <div className="flex justify-center items-center ">
        <div className="flex justify-center w-full h-[700px] items-center bg-white ">
          <div className="flex flex-col justify-center rounded-e-2x1  bg-white py-1 ">
           <BottomNavbar/>
            <nav className=" p-4 flex items-center justify-between mb-10 ">
              <div className="px-0 ">
                <button className=" py-2 px-4 text-gray-800 bg-[#D5D5D5] hover:bg-gray-500 rounded mr-2" onClick={() => {}}>QUAY LẠI</button>
              </div> 
              <div className="">
                <h1 className=" lg:text-4xl font-bold text-gray-800">QUY ĐỊNH</h1>
              </div>
              <div>
          <button className="bg-[#D5D5D5] text-gray-800 px-4 py-2 hover:bg-gray-500 rounded mr-2" onClick={() => {}}>
            THÊM
          </button>
          <button className="bg-[#D5D5D5] text-gray-800 px-4 py-2 hover:bg-gray-500 rounded mr-2" onClick={() => {}}>
            SỬA
          </button>
        </div>
              
              </nav>
      
<div className="container mx-auto">
      <h1 className="text-3xl font-bold my-6">Danh sách các quy định sân bay</h1>
      <ul className="divide-y divide-gray-200">
        {regulations.map(regulation => (
          <li key={regulation.id} className="py-4">
            <h2 className="text-xl font-semibold">{regulation.title}</h2>
            <p className="mt-2 text-gray-600">{regulation.description}</p>
          </li>
        ))}
      </ul>
    </div>
          
          
        </div>
    
      </div>
    </div>
    
    )
    
}

export default RegulationsPage;
/**/
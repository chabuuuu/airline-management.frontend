import React from "react";

const SearchModal = () => {
  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  const onSubmit = () => {
    return 0;
  };
  return (
    <div>
      <button className="btn rounded-3xl" onClick={handleOpenModal}>
        Tìm kiếm
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className=" flex font-bold text-3xl justify-center items-center">
            Tìm chuyến bay
          </h3>
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-5 mt-10"
          >
            <div className="flex flex-row justify-between">
              <input
                type="text"
                placeholder="Start"
                className="input input-bordered w-full max-w-lg mr-5"
              />
              <input
                type="text"
                placeholder="Destination"
                className="input input-bordered w-full max-w-lg"
              />
            </div>

            <textarea
              className="textarea textarea-bordered w-full max-w-lg"
              placeholder="Message"
            ></textarea>
          </form>
          <div className="flex justify-end">
            <button className="btn btn-ghost bg-orange-600 text-white ">
              Tìm kiếm
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default SearchModal;

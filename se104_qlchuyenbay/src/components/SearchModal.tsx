import React from "react";
import SearchForm from "./SearchForm";

const SearchModal = () => {
  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  return (
    <div>
      <button className="btn rounded-full" onClick={handleOpenModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-5 h-5"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className=" flex font-bold text-3xl justify-center items-center mb-10">
            Tìm chuyến bay
          </h3>
          <SearchForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default SearchModal;

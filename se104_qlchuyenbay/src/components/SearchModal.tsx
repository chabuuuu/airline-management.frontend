import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const SearchModal = () => {
  const animals = [
    {
      label: "Cat",
      value: "cat",
      description: "The second most popular pet in the world",
    },
    {
      label: "Dog",
      value: "dog",
      description: "The most popular pet in the world",
    },
    {
      label: "Elephant",
      value: "elephant",
      description: "The largest land animal",
    },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    {
      label: "Giraffe",
      value: "giraffe",
      description: "The tallest land animal",
    },
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    {
      label: "Penguin",
      value: "penguin",
      description: "A group of aquatic flightless birds",
    },
    {
      label: "Zebra",
      value: "zebra",
      description: "A several species of African equids",
    },
    {
      label: "Shark",
      value: "shark",
      description:
        "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
      label: "Whale",
      value: "whale",
      description: "Diverse group of fully aquatic placental marine mammals",
    },
    {
      label: "Otter",
      value: "otter",
      description: "A carnivorous mammal in the subfamily Lutrinae",
    },
    {
      label: "Crocodile",
      value: "crocodile",
      description: "A large semiaquatic reptile",
    },
  ];

  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <div>
      <button className="btn rounded-3xl" onClick={handleOpenModal}>
        Open Modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className=" flex font-bold text-3xl justify-center items-center">
            Tìm chuyến bay
          </h3>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete label="Select an animal" className="max-w-xs">
              {animals.map((animal) => (
                <AutocompleteItem key={animal.value} value={animal.value}>
                  {animal.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <p className="py-4">Press ESC key or click outside to close</p>
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

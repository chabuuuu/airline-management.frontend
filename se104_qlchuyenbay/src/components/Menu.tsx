"use client";
import SearchModal from "./SearchModal";
import Button from "./Button";

function Menu() {
  return (
    <div className="flex justify-between h-full items-center mt-5">
      <div>
        <Button
          link="/CreateFlight"
          content={
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 314.84 250.19"
            >
              <path
                d="M323.22,474.64C300,477,278.74,458.46,255.55,462.17c-14.58,3.81-29,8.33-43.45,12.5-9.22,2.66-11.55.37-12.66-9.23-1.62-14,1.48-25.2,15.2-31.62,22-9.2,16.35-28.27,16.68-48-28.92,8.1-55.1,15.59-83.48,23.61-6.83,1.92-10.77-.61-11-7.74,1-12.32-5.23-31.48,7-39.2q40.23-23.57,81-46.29c5.14-2.87,6.9-6.19,6.64-11.92-.46-10.28-.05-20.59-.15-30.88-2-25.27,26.28-68.16,49.63-36.94,25,29.88-.25,73.4,21.2,81.24,9.37,4.59,18.21,10.26,28.36,16.09-46.6,32.29-50.16,101.82-6.84,138Z"
                transform="translate(-136.11 -225.51)"
              />
              <path
                d="M451,407c-.54,91.53-141.14,91.31-140.44-.74C310.63,314,451.28,314.79,451,407Z"
                transform="translate(-136.11 -225.51)"
              />
              <path
                className="fill-white"
                d="M408.6,414H352.86c-9.36.14-9.39-15.18,0-15H408.6a7.11,7.11,0,0,1,7.12,7.11A7.2,7.2,0,0,1,408.6,414Z"
                transform="translate(-136.11 -225.51)"
              />
              <path
                className="fill-white"
                d="M373.21,434.3V378.57c-.14-9.37,15.18-9.39,15,0V434.3a7.12,7.12,0,0,1-7.12,7.12A7.21,7.21,0,0,1,373.21,434.3Z"
                transform="translate(-136.11 -225.51)"
              />
            </svg>
          }
        />
      </div>

      <div className="flex justify-between">
        <div className="flex-1 items-center mr-3">
          <ul className="menu menu-horizontal bg-white  rounded-xl">
            <li>
              <a>20/11/2024</a>
            </li>
            <li>
              <a>21/11/2024</a>
            </li>
            <li>
              <a>22/11/2024</a>
            </li>
            <li>
              <a>23/11/2024</a>
            </li>
            <li>
              <a>24/11/2024</a>
            </li>
            <li>
              <a>25/11/2024</a>
            </li>
            <li>
              <a>26/11/2024</a>
            </li>

            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 448 512"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <SearchModal />
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost mr-3 ml-3 btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 512 512"
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;

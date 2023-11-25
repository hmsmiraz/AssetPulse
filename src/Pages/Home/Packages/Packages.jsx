import { FaCheck } from "react-icons/fa";
import SharedTitle from "../../../Shared/SharedTitle";
const Packages = () => {
  return (
    <div>
      <SharedTitle heading={"Our Exclusive Packages"}></SharedTitle>
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-gray-700 bg-gray-100 md:p-20">
        {/* <h2 className="text-2xl font-medium">Our Exclusive Packages</h2> */}

        {/*     
        <!-- Component Start --> */}
        <div className="flex flex-wrap items-center justify-center w-full max-w-4xl mt-8">
          <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center p-10 bg-gray-200">
              <span className="font-semibold">Five Employee</span>
              <div className="flex items-center">
                <span className="text-3xl">$</span>
                <span className="text-5xl font-bold">5</span>
              </div>
            </div>
            <div className="p-10">
              <ul>
                <li className="flex items-center">
                  <FaCheck></FaCheck>
                  <span className="ml-2">Email Support</span>
                </li>
                <li className="flex items-center">
                  <FaCheck></FaCheck>
                  <span className="ml-2">Basic Feature Updates</span>
                </li>
              </ul>
            </div>
            <div className="flex px-10 pb-10 justify-center">
              <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">
                Join now
              </button>
            </div>
          </div>

          {/* <!-- Tile 2 --> */}
          <div className="z-10 flex flex-col flex-grow mt-8 overflow-hidden transform bg-white rounded-lg shadow-lg md:scale-110">
            <div className="flex flex-col items-center p-10 bg-gray-200">
              <span className="font-semibold">Twenty Employee</span>
              <div className="flex items-center">
                <span className="text-3xl">$</span>
                <span className="text-6xl font-bold">15</span>
              </div>
            </div>
            <div className="p-10">
              <ul>
                <li className="flex items-center">
                  <FaCheck></FaCheck>
                  <span className="ml-2 italic">Priority Support: +</span>
                </li>
                <li className="flex items-center">
                  <FaCheck></FaCheck>
                  <span className="ml-2">Exclusive Training Sessions+</span>
                </li>
                <li className="flex items-center">
                  <FaCheck></FaCheck>
                  <span className="ml-2">Customization Options+</span>
                </li>
              </ul>
            </div>
            <div className="flex px-10 pb-10 justify-center">
              <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">
                Join now
              </button>
            </div>
          </div>

          {/* <!-- Tile 3 --> */}
          <div className="flex flex-col flex-grow overflow-hidden bg-white rounded-lg shadow-lg mt-19">
            <div className="flex flex-col items-center p-10 bg-gray-200">
              <span className="font-semibold">Ten Employee </span>
              <div className="flex items-center">
                <span className="text-3xl">$</span>
                <span className="text-5xl font-bold">8</span>
              </div>
            </div>
            <div className="p-10">
              <ul>
                <li className="flex items-center">
                  <FaCheck></FaCheck>
                  <span className="ml-2 italic">Phone and Email Support</span>
                </li>
                <li className="flex items-center">
                  <FaCheck></FaCheck>
                  <span className="ml-2">Advanced Feature Updates:</span>
                </li>
              </ul>
            </div>
            <div className="flex px-10 pb-10 justify-center">
              <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">
                Join now
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Component End  --> */}
      </div>
    </div>
  );
};

export default Packages;

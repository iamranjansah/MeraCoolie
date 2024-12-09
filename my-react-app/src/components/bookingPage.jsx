import React, { useEffect, useState } from "react";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom"; // Import Clerk hooks
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

const Booking = () => {
  // Parse the query parameters from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pnr = queryParams.get("pnr"); // Get the 'pnr' query parameter

  const { user, isLoaded, isSignedIn } = useUser(); // Get user and auth state from Clerk
  const [trainStatus, setTrainStatus] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    pnr: pnr || "",
    numberOfBags: "",
  });

  const userId = user.id;

  // If Clerk is still loading or user is not signed in, redirect to sign-in page
  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />;
  }

  const getTrainStatus = async (pnr) => {
    try {
      const res = await fetch(
        `http://localhost:5143/api/orders/trainstatus/${pnr}`,
      );
      const data = await res.json();

      if (data.success) {
        const trainDetails = {
          trainName: data.message.train_name,
          updatedTime: data.message.updated_time,
          stations: data.message.data,
        };

        console.log(trainDetails);
        setTrainStatus(trainDetails);
      }
    } catch (error) {
      console.error("Error fetching train status:", error);
    }
  };

  const handleSubmitHandler = async (e) => {
    e.preventDefault();

    if (!selectedStation) {
      alert("Please select a station.");
      return;
    }

    const orderData = {
      pnrNumber: formData.pnr,
      trainNumber: trainStatus?.trainName || "", // Use trainName from trainStatus
      journeyDate: new Date().toISOString(), // Update this to the correct journey date if available
      destinationStation: selectedStation?.station_name || "", // Map selectedStation to destinationStation
      coolieStation: selectedStation?.station_name || "",
      totalBags: formData.numberOfBags,
    };

    console.log(orderData);

    try {
      await updatePhone();

      const response = await fetch(
        `http://localhost:5143/api/orders/create-order/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        },
      );

      const result = await response.json();

      if (result.success) {
        alert("Coolie successfully booked!");
        const orderId = result.order._id;
        window.location.href = `/payment-checkout?orderId=${orderId}`;

        // Reset form or redirect to another page
      } else {
        alert(`Failed to book coolie: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while booking the coolie.");
    }
  };

  const updatePhone = async () => {
    try {
      const updatePhoneResponse = await fetch(
        `http://localhost:5143/api/users/updateProfile/${userId}`, // Your API endpoint
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updatedProfile: {
              phone: formData.phoneNumber, // Update phone number here
            },
          }),
        },
      );

      const updatePhoneData = await updatePhoneResponse.json();
      if (!updatePhoneData.success) {
        alert("Failed to update phone number.");
        return;
      }
    } catch (error) {
      console.error("Error updating phone number: ", error);
      alert("An error occurred while updating phone number.");
      return;
    }
  };

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const res = await fetch(`http://localhost:5143/api/users/${userId}`); // Replace with your API endpoint for fetching user data
        const data = await res.json();

        console.log(data.userProfile.phone);

        if (data.success && data.userProfile.phone) {
          setFormData((prevState) => ({
            ...prevState,
            phoneNumber: data.userProfile.phone, // Set the fetched phone number
          }));
        }
      } catch (error) {
        console.error("Error fetching user phone number:", error);
      }
    };

    if (user?.id) {
      fetchPhoneNumber();
    }

    if (pnr) getTrainStatus(pnr);
  }, [user, pnr]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-6">
        Book Your Coolie
      </h2>
      <div className="flex justify-center items-center my-24 gap-8">
        <div className="py-28 px-20 border-2  bg-[#B1F0F7] rounded-3xl">
          <Listbox value={selectedStation} onChange={setSelectedStation}>
            <Label className="block text-sm/6 font-medium text-gray-900">
              Station
            </Label>
            <div className="relative mt-2">
              <ListboxButton className="grid w-auto min-w-[12rem] cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                  {selectedStation ? (
                    <span className="block truncate">
                      {selectedStation.station_name}
                    </span>
                  ) : (
                    <span className="block truncate text-gray-400">
                      Select Station
                    </span>
                  )}
                </span>
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-auto min-w-[12rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {trainStatus?.stations?.map((stationDetails, index) => (
                  <ListboxOption
                    key={index}
                    value={stationDetails}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                        {stationDetails.is_current_station === false &&
                          stationDetails.station_name}
                      </span>
                    </div>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div>
          <form
            onSubmit={handleSubmitHandler}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4"
          >
            {/* PNR Field */}
            <label className="block text-gray-700 font-semibold">
              Enter Your PNR:
            </label>
            <input
              type="number"
              value={pnr}
              readOnly
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter PNR"
            />

            {/* Phone No. Field */}
            <label className="block text-gray-700 font-semibold">
              Phone No. :
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  phoneNumber: e.target.value, // Allow manual input if phone number is not fetched
                }))
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your Phone No."
              maxLength="10"
              pattern="\d{10}"
              required
            />

            {/* Coolie Preference */}
            {/*<label className="block text-gray-700 font-semibold">*/}
            {/*  Select Coolie Preference:*/}
            {/*</label>*/}
            {/*<select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300">*/}
            {/*  <option value="any">Any Coolie</option>*/}
            {/*  <option value="priority">Priority Coolie</option>*/}
            {/*  <option value="family-friendly">Family-Friendly Coolie</option>*/}
            {/*</select>*/}

            {/* Estimated Luggage Weight */}
            {/*<label className="block text-gray-700 font-semibold">*/}
            {/*  Estimated Luggage Weight (in KG):*/}
            {/*</label>*/}
            {/*<input*/}
            {/*  type="number"*/}
            {/*  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"*/}
            {/*  placeholder="Enter Weight"*/}
            {/*/>*/}

            {/* Number of Bags */}
            <label className="block text-gray-700 font-semibold">
              Number of Bags:
            </label>
            <input
              type="number"
              value={formData.numberOfBags}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  numberOfBags: e.target.value, // Allow manual input if phone number is not fetched
                }))
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Number of Bags"
            />

            {/* Book Coolie Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-bold hover:from-teal-400 hover:to-blue-500 transform transition duration-300"
            >
              Book Coolie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;

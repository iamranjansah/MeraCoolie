import React, { useState, useEffect } from "react";
import coolieData from "../data/coolieData.json"; // Importing data from JSON file

const SearchAndFilterPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [filteredCoolies, setFilteredCoolies] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false); // Track if filters have been applied

  // Function to filter Coolies based on selected criteria
  useEffect(() => {
    if (searchTerm || selectedLocation || selectedAvailability || selectedExperience || selectedRating) {
      setIsFiltered(true); // If any filter is applied, show results
      const filterCoolies = coolieData.filter((coolie) => {
        return (
          coolie.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedLocation ? coolie.location.toLowerCase().includes(selectedLocation.toLowerCase()) : true) &&
          (selectedAvailability ? coolie.availability === selectedAvailability : true) &&
          (selectedExperience ? coolie.experience >= selectedExperience : true) &&
          (selectedRating ? coolie.rating >= selectedRating : true)
        );
      });
      setFilteredCoolies(filterCoolies);
    } else {
      setIsFiltered(false); // Reset the filter state when no filter is applied
      setFilteredCoolies([]);
    }
  }, [searchTerm, selectedLocation, selectedAvailability, selectedExperience, selectedRating]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Search & Filter Coolies</h2>

        {/* Search Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Search Bar */}
          {/* <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
            />
          </div> */}

          {/* Location Filter */}
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              placeholder="e.g., Mumbai"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-gray-700">Availability</label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="">Any</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-gray-700">Minimum Experience (Years)</label>
            <input
              type="number"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-gray-700">Minimum Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Display Filtered Coolie Profiles */}
        {isFiltered ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCoolies.length > 0 ? (
              filteredCoolies.map((coolie) => (
                <div
                  key={coolie.id}
                  className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
                >
                  <img
                    src={coolie.profilePicture}
                    alt={coolie.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800">{coolie.name}</h3>
                    <p className="text-sm text-gray-600">{coolie.location}</p>
                    <p className="text-sm text-gray-600">Experience: {coolie.experience} years</p>
                    <p className="text-sm text-gray-600">Rating: {coolie.rating} / 5</p>
                    <p className="text-sm text-gray-600">Availability: {coolie.availability}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No Coolies found based on the selected criteria.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Please apply filters to see results.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilterPage;

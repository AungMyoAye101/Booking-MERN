import React from "react";

const Filter = () => {
  return (
    <section className="">
      <div className="rounded-lg  bg-white shadow-lg w-72 p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold mb-4">Filter Hotels</h2>
        {/* Location */}
        <div>
          <label htmlFor="location" className="font-roboto  text-sm">
            Desitnation
          </label>
          <input
            type="text"
            id="location"
            // value={location}
            // onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city"
            className="bg-neutral-100 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="date" className="font-roboto  text-sm">
            Check In & Out
          </label>
          <input
            type="date"
            id="date"
            // value={location}
            // onChange={(e) => setLocation(e.target.value)}

            className="bg-neutral-100 p-2 rounded-md w-full"
          />
        </div>

        {/* Guests */}
        <div className="flex justify-between items-center">
          <label>min-price:</label>
          <input
            type="number"
            // value={guests}
            // onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-neutral-100 w-14 h-10 rounded-md"
            min={1}
          />
        </div>
        <div className="flex justify-between items-center">
          <label>max-price:</label>
          <input
            type="number"
            // value={guests}
            // onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-neutral-100 w-14 h-10 rounded-md"
            min={1}
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Guests:</label>
          <input
            type="number"
            // value={guests}
            // onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-neutral-100 w-14 h-10 rounded-md"
            min={1}
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Adults:</label>
          <input
            type="number"
            // value={guests}
            // onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-neutral-100 w-14 h-10 rounded-md"
            min={1}
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Children:</label>
          <input
            type="number"
            // value={guests}
            // onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-neutral-100 w-14 h-10 rounded-md"
            min={1}
          />
        </div>

        {/* Star Rating */}
        {/* <label>Star Rating:</label>
        <select>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Stars
            </option>
          ))}
        </select> */}

        {/* Apply Filters Button */}
        <button>Search</button>
      </div>
    </section>
  );
};

export default Filter;

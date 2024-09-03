import React from 'react';

export const DatePickerWithRange = ({ date, setDate }) => {
  const handleFromChange = (e) => {
    setDate(prevDate => ({ ...prevDate, from: new Date(e.target.value) }));
  };

  const handleToChange = (e) => {
    setDate(prevDate => ({ ...prevDate, to: new Date(e.target.value) }));
  };

  return (
    <div className="date-range-picker">
      <label>
        From:
        <input
          type="date"
          value={date.from.toISOString().split('T')[0]}
          onChange={handleFromChange}
        />
      </label>
      <label>
        To:
        <input
          type="date"
          value={date.to.toISOString().split('T')[0]}
          onChange={handleToChange}
        />
      </label>
    </div>
  );
};
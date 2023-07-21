import React from 'react';

interface UniversityAvailabilityProps {
  availability: boolean[]; // An array representing availability for each month (e.g., [Jan, Feb, Mar, ..., Dec])
}

const UniversityAvailability: React.FC<UniversityAvailabilityProps> = ({ availability }) => {
  const monthLabels = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  return (
    <div className="university-availability flex flex-wrap">
      {monthLabels.map((month, index) => (
        <div
          key={month}
          className={`month p-2 m-1 rounded font-bold ${availability[index] ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
        >
          {month}
        </div>
      ))}
    </div>
  );
};

export default UniversityAvailability;

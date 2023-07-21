import React from 'react';

interface UniversityAvailabilityProps {
  sem1_months: string[];
  sem2_months: string[];
}

const UniversityAvailability: React.FC<UniversityAvailabilityProps> = ({ sem1_months, sem2_months }) => {
  const monthLabels = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  const monthLabelsShort = [
    'JAN', 'FEB', 'MAR', 'APR',
    'MAY', 'JUN', 'JUL', 'AUG',
    'SEP', 'OCT', 'NOV', 'DEC',
  ];

  // const availableMonthIndices = [...sem1_months.map(x => monthLabelsShort.indexOf(x)), ...sem2_months.map(x => monthLabelsShort.indexOf(x))]
  const sem1_indices: number[] = sem1_months.map(x => monthLabelsShort.indexOf(x))
  const sem2_indices: number[] = sem2_months.map(x => monthLabelsShort.indexOf(x))

  const availabilityColour = function(index: number) {
    console.log(index, index in sem1_indices, sem1_indices)
    if (sem1_indices.includes(index)) {
      return 'bg-green-500';
    } else if (sem2_indices.includes(index)) {
      return 'bg-blue-500';
    } else {
      return 'bg-gray-500';
    }
  }


  return (
    <div className='university-availability'>
      <div className="flex flex-wrap">
        {monthLabels.map((month, index) => (
          <div
            key={month}
            className={`month p-2 m-1 rounded font-bold ${availabilityColour(index)} text-white`}
          >
            {month}
          </div>
        ))}
      </div>
      <div className='mt-4'>
        Legend:
        <span className='p-2 font-bold rounded text-white bg-green-500 ml-3'>SEM1</span>
        <span className='p-2 font-bold rounded text-white bg-blue-500 ml-3'>SEM2</span>
      </div>
    </div>
  );
};

export default UniversityAvailability;

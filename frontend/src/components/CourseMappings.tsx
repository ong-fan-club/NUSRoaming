"use client";

import { useState } from "react";

interface MappingProps {
  mappings: MappingInfo[];
}

interface MappingInfo {
  faculty: string;
  partner_uni: string;
  partner_course_code: string;
  partner_course_title: string;
  nus_course_code: string;
  nus_course_title: string;
}

const CourseMappings: React.FC<MappingProps> = ({ mappings }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMappings = mappings.filter((mapping) =>
    mapping.nus_course_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMappings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMappings = filteredMappings.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-full mt-4 border rounded-lg px-4 py-3">
      <h2 className="text-xl font-semibold mb-4">Course Mappings</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset the current page when the search term changes
        }}
        placeholder="Search by NUS Course Code..."
        className="w-full px-4 py-2 mb-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
      <table className="w-full">
        <th className="px-4 py-2 border border-gray-300">NUS Course Title</th>
        <th className="px-4 py-2 border border-gray-300">NUS Course Code</th>
        <th className="px-4 py-2 border border-gray-300">Partner Course Code</th>
        <th className="px-4 py-2 border border-gray-300">Partner Course Title</th>

        <tbody>
          {currentMappings.map((mapping, index) => (
            <tr key={index} className="bg-white">
              <td className="px-4 py-2 border border-gray-300">{mapping.nus_course_title}</td>
              <td className="px-4 py-2 border border-gray-300">{mapping.nus_course_code}</td>
              <td className="px-4 py-2 border border-gray-300">{mapping.partner_course_code}</td>
              <td className="px-4 py-2 border border-gray-300">{mapping.partner_course_title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:ring-blue-300 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:ring-blue-300 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>

      </div>
    </div>
  );
};



export default CourseMappings;

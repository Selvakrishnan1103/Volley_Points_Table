
import React, { useState } from 'react';

interface AddTeamFormProps {
  onAddTeam: (name: string) => void;
}

const AddTeamForm: React.FC<AddTeamFormProps> = ({ onAddTeam }) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      onAddTeam(teamName.trim());
      setTeamName('');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-teal-300">Add New Team</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
          className="flex-grow bg-slate-700 border border-slate-600 text-white rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-500 disabled:cursor-not-allowed"
          disabled={!teamName.trim()}
        >
          Add Team
        </button>
      </form>
    </div>
  );
};

export default AddTeamForm;


import React, { useState } from 'react';
import { Team } from '../types';

interface AddMatchFormProps {
  teams: Team[];
  onAddMatch: (teamAId: string, teamBId: string, scoreA: number, scoreB: number) => void;
}

const AddMatchForm: React.FC<AddMatchFormProps> = ({ teams, onAddMatch }) => {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamA || !teamB || !scoreA || !scoreB) {
      setError('All fields are required.');
      return;
    }
    if (teamA === teamB) {
      setError('A team cannot play against itself.');
      return;
    }
    setError('');
    onAddMatch(teamA, teamB, parseInt(scoreA, 10), parseInt(scoreB, 10));
    setTeamA('');
    setTeamB('');
    setScoreA('');
    setScoreB('');
  };

  if (teams.length < 2) {
    return null;
  }

  const availableTeamsForB = teams.filter(t => t.id !== teamA);
  const availableTeamsForA = teams.filter(t => t.id !== teamB);

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-teal-300">Record a Match</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <select
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            className="md:col-span-2 bg-slate-700 border border-slate-600 text-white rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            <option value="">Select Team A</option>
            {availableTeamsForA.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              value={scoreA}
              onChange={(e) => setScoreA(e.target.value)}
              placeholder="Score"
              min="0"
              className="w-full text-center bg-slate-700 border border-slate-600 text-white rounded-md py-2 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <span className="font-bold text-slate-400">-</span>
            <input
              type="number"
              value={scoreB}
              onChange={(e) => setScoreB(e.target.value)}
              placeholder="Score"
              min="0"
              className="w-full text-center bg-slate-700 border border-slate-600 text-white rounded-md py-2 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <select
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            className="md:col-span-2 bg-slate-700 border border-slate-600 text-white rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            <option value="">Select Team B</option>
            {availableTeamsForB.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          Record Match
        </button>
      </form>
    </div>
  );
};

export default AddMatchForm;

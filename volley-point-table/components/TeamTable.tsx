
import React from 'react';
import { Team } from '../types';

interface TeamTableProps {
  teams: Team[];
}

const TeamTable: React.FC<TeamTableProps> = ({ teams }) => {
  if (teams.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-slate-800 rounded-lg shadow-inner">
        <p className="text-slate-400">No teams added yet. Add a team to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg">
      <table className="w-full text-sm text-left text-slate-300">
        <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">Rank</th>
            <th scope="col" className="px-6 py-3">Team</th>
            <th scope="col" className="px-6 py-3 text-center">Played</th>
            <th scope="col" className="px-6 py-3 text-center">Wins</th>
            <th scope="col" className="px-6 py-3 text-center">Losses</th>
            <th scope="col" className="px-6 py-3 text-center">Points</th>
            <th scope="col" className="px-6 py-3 text-center">Point Diff.</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-200">
              <td className="px-6 py-4 font-medium text-center">{index + 1}</td>
              <th scope="row" className="px-6 py-4 font-bold text-white whitespace-nowrap">{team.name}</th>
              <td className="px-6 py-4 text-center">{team.wins + team.losses}</td>
              <td className="px-6 py-4 text-center text-green-400">{team.wins}</td>
              <td className="px-6 py-4 text-center text-red-400">{team.losses}</td>
              <td className="px-6 py-4 text-center font-semibold">{team.points}</td>
              <td className={`px-6 py-4 text-center font-semibold ${team.pointsDifference >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                {team.pointsDifference > 0 ? '+' : ''}{team.pointsDifference}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;

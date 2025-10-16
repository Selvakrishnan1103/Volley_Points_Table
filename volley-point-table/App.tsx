
import React, { useMemo } from 'react';
import { Team } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import TeamTable from './components/TeamTable';
import AddTeamForm from './components/AddTeamForm';
import AddMatchForm from './components/AddMatchForm';

function App() {
  const [teams, setTeams] = useLocalStorage<Team[]>('volley-teams', []);

  const handleAddTeam = (name: string) => {
    if (teams.some(team => team.name.toLowerCase() === name.toLowerCase())) {
      alert('A team with this name already exists.');
      return;
    }
    const newTeam: Team = {
      id: crypto.randomUUID(),
      name,
      wins: 0,
      losses: 0,
      points: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      pointsDifference: 0,
    };
    setTeams(prevTeams => [...prevTeams, newTeam]);
  };

  const handleAddMatch = (teamAId: string, teamBId: string, scoreA: number, scoreB: number) => {
    const winnerId = scoreA > scoreB ? teamAId : teamBId;
    const loserId = scoreA > scoreB ? teamBId : teamAId;
    const winnerScore = Math.max(scoreA, scoreB);
    const loserScore = Math.min(scoreA, scoreB);

    setTeams(prevTeams =>
      prevTeams.map(team => {
        if (team.id === winnerId) {
          const newPointsFor = team.pointsFor + winnerScore;
          const newPointsAgainst = team.pointsAgainst + loserScore;
          return {
            ...team,
            wins: team.wins + 1,
            points: team.points + 3,
            pointsFor: newPointsFor,
            pointsAgainst: newPointsAgainst,
            pointsDifference: newPointsFor - newPointsAgainst,
          };
        }
        if (team.id === loserId) {
          const newPointsFor = team.pointsFor + loserScore;
          const newPointsAgainst = team.pointsAgainst + winnerScore;
          return {
            ...team,
            losses: team.losses + 1,
            pointsFor: newPointsFor,
            pointsAgainst: newPointsAgainst,
            pointsDifference: newPointsFor - newPointsAgainst,
          };
        }
        return team;
      })
    );
  };
  
  const sortedTeams = useMemo(() => {
    return [...teams].sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.pointsDifference - a.pointsDifference;
    });
  }, [teams]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AddTeamForm onAddTeam={handleAddTeam} />
          <AddMatchForm teams={teams} onAddMatch={handleAddMatch} />
        </div>
        <TeamTable teams={sortedTeams} />
      </main>
    </div>
  );
}

export default App;

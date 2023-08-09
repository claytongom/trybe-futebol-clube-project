import IMatch from '../Interfaces/matches/IMatch';

export default class LeaderboardBuilder {
  private matches: IMatch[];
  private teamId: number;
  private side: 'home' | 'away';

  constructor(matches: IMatch[], teamId: number, side: 'home' | 'away') {
    this.matches = matches;
    this.teamId = teamId;
    this.side = side;
  }

  private filterHome(): IMatch[] {
    return this.matches.filter((match) =>
      (this.side === 'home' ? match.homeTeamId === this.teamId : match.awayTeamId === this.teamId));
  }

  get totalPoints(): number {
    const teamsMatches = this.filterHome();

    return teamsMatches.reduce((total, match) => {
      let points = 0;
      if (this.side === 'home' && match.homeTeamGoals > match.awayTeamGoals) {
        points = 3;
      } else if (this.side === 'away' && match.awayTeamGoals > match.homeTeamGoals) {
        points = 3;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        points = 1;
      }
      return total + points;
    }, 0);
  }

  get totalVictories(): number {
    const teamsMatches = this.filterHome();

    return teamsMatches.reduce((total, match) =>
      total + (
        (this.side === 'home' && match.homeTeamGoals > match.awayTeamGoals)
            || (this.side === 'away' && match.awayTeamGoals > match.homeTeamGoals) ? 1 : 0
      ), 0);
  }

  get totalDraws(): number {
    const teamsMatches = this.filterHome();

    return teamsMatches.reduce((total, match) => total + (
      match.homeTeamGoals === match.awayTeamGoals ? 1 : 0), 0);
  }

  get totalLosses(): number {
    const teamsMatches = this.filterHome();

    return teamsMatches.reduce((total, match) => {
      if (this.side === 'home' && match.homeTeamGoals < match.awayTeamGoals) {
        return total + 1;
      } if (this.side === 'away' && match.awayTeamGoals < match.homeTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  get goalsFavor(): number {
    const teamsMatches = this.filterHome();

    return teamsMatches.reduce((total, match) => {
      if (this.side === 'home') {
        return total + match.homeTeamGoals;
      }
      return total + match.awayTeamGoals;
    }, 0);
  }

  get goalsOwn(): number {
    const teamsMatches = this.filterHome();

    return teamsMatches.reduce((total, match) => total + (
      this.side === 'home' ? match.awayTeamGoals : match.homeTeamGoals), 0);
  }

  get goalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency(): number {
    const maxPoint = this.filterHome().length * 3;
    const efficiencyValue = (this.totalPoints * 100) / maxPoint;
    return +efficiencyValue.toFixed(2);
  }
}

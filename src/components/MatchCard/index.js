// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {
    competingTeamLogo,
    competingTeam,
    result,
    matchStatus,
  } = matchCardDetails
  const toggleClass = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-logo"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={toggleClass}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

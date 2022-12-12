// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamCard} = props
  const {id, name, teamImageUrl} = teamCard

  return (
    <Link to={`/team-matches/${id}`} className="item-link">
      <li className="flex-container">
        <div className="card-container">
          <img src={teamImageUrl} alt={name} className="team-image" />
          <p className="team-name">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default TeamCard

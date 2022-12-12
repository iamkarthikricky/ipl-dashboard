/* eslint-disable react/no-unknown-property */
// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import TeamCard from '../TeamCard/index'

class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const formattedTeams = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({teamsData: formattedTeams, isLoading: false})
  }

  render() {
    const {isLoading, teamsData} = this.state

    return (
      <div className="home-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="app-name">IPL Dashboard</h1>
        </div>
        <div className="team-card-container">
          {isLoading ? (
            <div testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} />
            </div>
          ) : (
            <ul className="home-team-list">
              {teamsData.map(team => (
                <TeamCard teamCard={team} key={team.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home

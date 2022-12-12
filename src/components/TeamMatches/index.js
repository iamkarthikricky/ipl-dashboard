/* eslint-disable react/no-unknown-property */
// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class TeamMatches extends Component {
  state = {matchData: {}, isLoading: true}

  componentDidMount = () => {
    this.getTeamData()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()

    const className = id.toLowerCase()
    const updatedData = {
      bannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: this.getFormattedData(
        fetchedData.latest_match_details,
      ),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
      // eslint-disable-next-line object-shorthand
      className: className,
    }
    this.setState({matchData: updatedData, isLoading: false})
  }

  renderTeamMatchDetails = () => {
    const {matchData} = this.state
    const {bannerUrl, latestMatchDetails, recentMatches, className} = matchData
    return (
      <div className={`loader-container ${className} `}>
        <img src={bannerUrl} alt="team banner" className="banner" />
        <LatestMatch latestDetails={latestMatchDetails} />
        <ul className="ul-list">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchCardDetails={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="loader-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          this.renderTeamMatchDetails()
        )}
      </div>
    )
  }
}

export default TeamMatches

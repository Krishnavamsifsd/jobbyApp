import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl:
          'data:image/jpeg;base64,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',
        shortBio: data.profile_details.short_bio,
      }
      this.setState({apiStatus: apiStatusConstants.success, profileData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileView = () => {
    const {profileData} = this.state
    const {profileImageUrl} = profileData
    return (
      <div className="profile-success-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">Krishna Vamsi</h1>
        <p className="profile-bio">MERN Stack Developer</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-error-view-container">
      <button
        type="button"
        id="button"
        className="profile-failure-button"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container " id="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProfileCard

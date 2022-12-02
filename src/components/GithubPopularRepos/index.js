/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    dataList: [],
    activeTab: languageFiltersData[0].id,
    apiStatus: apiStatusConst.inProgress,
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const {activeTab} = this.state

    const Url = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const response = await fetch(Url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const dataItem = await data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      console.log(dataItem)
      this.setState({dataList: dataItem, apiStatus: apiStatusConst.success})
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader
        type="ThreeDots"
        className="load"
        color="#0284c7"
        height={80}
        width={80}
      />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderPRepoListView = () => {
    const {dataList} = this.state

    return (
      <ul className="ul-con">
        {dataList.map(each => (
          <RepositoryItem key={each.id} repoItem={each} />
        ))}
      </ul>
    )
  }

  renderItemsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.success:
        return this.renderPRepoListView()
      case apiStatusConst.failure:
        return this.renderFailureView()
      case apiStatusConst.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onSelectLanguage = id => {
    this.setState(
      {activeTab: id, apiStatus: apiStatusConst.inProgress},
      this.getItems,
    )
  }

  renderButton = () => {
    const {activeTab} = this.state

    return (
      <ul className="ul-con">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            isActive={each.id === activeTab}
            languageFiltersData={each}
            onSelectLanguage={this.onSelectLanguage}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <div>
          <h1 className="pop">Popular</h1>
          {this.renderButton()}
          {this.renderItemsView()}
        </div>
      </>
    )
  }
}
export default GithubPopularRepos

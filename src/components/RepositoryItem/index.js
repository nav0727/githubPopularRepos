import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props

  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoItem
  return (
    <li>
      <img src={avatarUrl} alt={name} className="image" />
      <h4>{name}</h4>

      <div className="min-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="min-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="min-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

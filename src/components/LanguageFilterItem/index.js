import './index.css'

const LanguageFilterItem = props => {
  const {onSelectLanguage, languageFiltersData, isActive} = props

  const btnClass = isActive ? 'normal ' : 'decoration'

  const {id, language} = languageFiltersData
  const onSelect = () => {
    onSelectLanguage(id)
  }

  return (
    <>
      <li className="list">
        <button type="button" onClick={onSelect} className={btnClass}>
          {language}
        </button>
      </li>
    </>
  )
}

export default LanguageFilterItem

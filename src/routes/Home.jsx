import React from 'react'
import translate from '../shared/translate'
import Quotes from '../components/main/Quotes'

const numberOfQuotes = 10

const Home = ({ language, allQuotes, phrase, password }) => {
  const currentQuotes = allQuotes
    .filter(quote => quote[language] && quote[language].toLowerCase().includes(phrase.toLowerCase()))
    .filter((quote, i) => i < numberOfQuotes)

  return (
    <main>
      <h1>{translate('PROGRAMMING_QUOTES')}</h1>
      {phrase && <small>{translate('SHOWING_RESULTS')} "{phrase}":</small>}
      <Quotes language={language} loaded={allQuotes.length} currentQuotes={currentQuotes} password={password} />
    </main>
  )
}

export default Home
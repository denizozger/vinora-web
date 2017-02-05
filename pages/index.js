import React from 'react'
import css from 'next/css'
import Link from 'next/link'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { wines: [] }
    // this.apiUrl = 'http://localhost:4000'
    this.apiUrl = 'https://vinora-api.herokuapp.com'
  }

  static async getInitialProps ({ query }) {
    return {}
  }

  render () {
    return <div className={mainDiv}>
		<h3>Wine price finder</h3>
      <form onSubmit={this.handleSubmit}>
        <label className={label}>Enter wine list url: </label>
        <input value={this.state.text} className={input} placeholder="https://www.restaurant.com/winelist.pdf"/>
        <button>{'Find the prices'}</button>
      </form>
      <WineList wines={this.state.wines} />
    </div>
  }

  async getWines() {
    try {
      let response = await fetch(this.apiUrl)
      let responseJson = await response.json()
      return responseJson
    } catch(error) {
      console.error(error);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const wines = await this.getWines(this.state.text)
    wines.forEach(w => w.id = Math.random())

    this.setState((prevState) => ({ wines: wines }));
  }
}

class WineList extends React.Component {
  render() {
    return (
      <table>
        <thead>
        <tr>
          <th>List name</th>
          <th>List price</th>
          <th>Name (Guessed)</th>
          <th>Producer (Guessed)</th>
          <th>Rating</th>
          <th># of reviews</th>
        </tr>
        </thead>
        <tbody>
        {this.props.wines.map(wine => (
          <tr key={wine.id}>
          <td><a href={wine['@id']} target="_blank">{wine.pdfName}</a></td>
          <td>{wine.pdfPrice}</td>
          <td>{wine.name}</td>
          <td><a href={wine.manufacturer.url} target="_blank">{wine.manufacturer.name}</a></td>
          <td>{wine.aggregateRating.ratingValue}</td>
          <td>{wine.aggregateRating.reviewCount}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

const input = css({
  display: 'block',
  width: '100%',
  maxWidth: '500px'
})

const label = css({
  display: 'block'
})

const mainDiv = css({
  background: 'white',
  '@media (max-width: 600px)': {
    background: 'blue'
  }
})
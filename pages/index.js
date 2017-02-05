import React from 'react'
import css from 'next/css'
import Link from 'next/link'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {wines: []};
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
      let response = await fetch('https://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      return responseJson.movies;
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
      <ul>
        {this.props.wines.map(wine => (
          <li key={wine.id}>{wine.title}</li>
        ))}
      </ul>
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
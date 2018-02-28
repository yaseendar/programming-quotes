import React, {Component} from 'react'
import ReactStars from 'react-stars'
import * as api from '../../config/endpoints'
import './Stars.css'

class Stars extends Component {
  constructor(props) {
    super()
    this.state = {
      rating: Number(props.rating),
      error: ''
    }
  }

  alreadyVoted(storage) {
    return Array.isArray(storage) && storage.includes(this.props.id)
  }

  rate = newRating => {
    const storage = JSON.parse(localStorage.getItem('programerskicitatiocene'))
    if (this.alreadyVoted(storage)) return this.setState({error: 'You can vote just once!'})

    const newStorage = storage ? [...storage, this.props.id] : [this.props.id]

    fetch(api.rate, {
      method: 'POST',
      body: JSON.stringify({_id: this.props.id, novaOcena: newRating}),
      headers: {'content-type': 'application/json'}
    })
      .then(response => response.json())
      .then(response => this.setNewVote(newStorage, response))
      .catch(e => this.setState({error: 'Problem with network, please try again later'}))
  }

  setNewVote(newStorage, newAverage) {
    localStorage.setItem('programerskicitatiocene', JSON.stringify(newStorage))
    this.setState({rating: newAverage})
  }

  render() {
    return (
      <div>
        <ReactStars size={20} value={this.state.rating} onChange={this.rate} />
        {this.state.error && <p className="vote-error">{this.state.error}</p>}
      </div>
    )
  }
}

export default Stars
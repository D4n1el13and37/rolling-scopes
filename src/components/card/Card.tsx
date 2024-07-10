import { Component } from 'react';
import './card.css';

interface CardProps {
  imageUrl?: string;
  name: string;
  population: string;
  climate: string;
  terrain: string;
}

export default class Card extends Component<CardProps> {
  render() {
    return (
      <article className="card">
        <div className="card__image-wrapper">
          <img
            src={this.props.imageUrl || ''}
            alt={`${this.props.name} planet image`}
          />
        </div>
        <div
          className="card__text-content"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h3>{this.props.name}</h3>
          <span>Population: {this.props.population}</span>
          <span>Climate: {this.props.climate}</span>
          <span>Terrain: {this.props.terrain}</span>
        </div>
      </article>
    );
  }
}

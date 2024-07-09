import React from 'react';
import './Card.css';

interface CardProps {
  imageUrl?: string;
  name: string;
  population: string;
  climate: string;
  terrain: string;
}

const Card: React.FC<CardProps> = ({ ...props }) => (
  <article className="card">
    <div className="card__image-wrapper">
      <img src={props.imageUrl || ''} alt={`${props.name} planet image`} />
    </div>
    <div
      className="card__text-content"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <h3>{props.name}</h3>
      <span>Population: {props.population}</span>
      <span>Climate: {props.climate}</span>
      <span>Terrain: {props.terrain}</span>
    </div>
  </article>
);

export default Card;

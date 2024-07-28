import React from 'react';
import './Card.css';
import { PlanetWithImage } from '../../api/types';

const Card: React.FC<PlanetWithImage> = ({ ...props }) => (
  <article className="card">
    <div className="card__image-wrapper">
      <img
        data-testid="card-image"
        src={props.imageUrl || ''}
        alt={`${props.name} planet image`}
      />
    </div>
    <div className="card__text-content">
      <h3>{props.name}</h3>
      <span>Population: {props.population}</span>
      <span>Climate: {props.climate}</span>
      <span>Terrain: {props.terrain}</span>
    </div>
  </article>
);

export default Card;

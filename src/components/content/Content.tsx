import React from 'react';
import { PlanetWithImage } from '../../api/apiMethods';
import Card from '../card/Card';
import './Content.css';

interface ContentProps {
  planets: PlanetWithImage[];
}

const Content: React.FC<ContentProps> = ({ planets }) => {
  return (
    <div className="content__wrapper">
      <div className="planets__list">
        {planets.map((planet: PlanetWithImage, index) => {
          return (
            <Card
              key={planet.name + index}
              imageUrl={planet.imageUrl}
              name={planet.name}
              population={planet.population}
              climate={planet.climate}
              terrain={planet.terrain}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Content;

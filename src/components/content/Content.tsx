import { Component } from 'react';
import { PlanetWithImage } from '../../api/apiMethods';
import Card from '../card/Card';
import './content.css';

interface ContentProps {
  planets: PlanetWithImage[];
}

export default class Content extends Component<ContentProps> {
  render() {
    return (
      <div className="content__wrapper">
        <div className="planets__list">
          {this.props.planets.map((planet: PlanetWithImage, index) => {
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
  }
}

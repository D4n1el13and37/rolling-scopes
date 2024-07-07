import { Component } from 'react';
import Headline from './components/headline/Headline';
import Content from './components/content/Content';
import Loader from './components/loader/Loader';
import {
  getPlanetBySearch,
  getPlanetsByPage,
  PlanetWithImage,
} from './api/apiMethods';

import './app.css';

interface AppState {
  defaultQuery: string | null;
  isLoading: boolean;
  planets: PlanetWithImage[];
  throwError: boolean;
}

export default class App extends Component {
  state: AppState = {
    defaultQuery: localStorage.getItem('query'),
    isLoading: false,
    planets: [],
    throwError: false,
  };

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = async () => {
    this.setState({ isLoading: true });

    try {
      let response;
      if (this.state.defaultQuery) {
        // if we got something in LS seatch by query
        response = await getPlanetBySearch(this.state.defaultQuery!);
      } else {
        response = await getPlanetsByPage();
      }
      this.setState({ planets: response, isLoading: false });
    } catch (error) {
      console.error('Error fetching planets:', error);
      this.setState({ isLoading: false });
    }
  };

  searchPlanets = async (planetName?: string) => {
    this.setState({ isLoading: true });
    try {
      let response;
      if (planetName) {
        response = await getPlanetBySearch(planetName);
      } else {
        response = await getPlanetsByPage();
      }
      this.setState({ planets: response, isLoading: false });
    } catch (error) {
      console.error('Error fetching planets by searching:', error);
      this.setState({ isLoading: false });
    }
  };

  handleThrowError = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Call an error by button');
    }

    return (
      <div className="app__wrapper">
        {this.state.isLoading && <Loader />}
        <div className="cause-error">
          <button className="button-error" onClick={this.handleThrowError}>
            Throw Error
          </button>
        </div>
        <Headline onSearch={this.searchPlanets} />
        <Content planets={this.state.planets} />
      </div>
    );
  }
}

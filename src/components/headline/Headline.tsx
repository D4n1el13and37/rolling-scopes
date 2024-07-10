import { ChangeEvent, Component, FormEvent } from 'react';
import { Button } from '../ui-kit/Button';
import './headline.css';

interface HeadlineProps {
  onSearch: () => void;
}

interface HeadlineState {
  searchQuery: string;
}

export default class Headline extends Component<HeadlineProps, HeadlineState> {
  state: HeadlineState = {
    searchQuery: localStorage.getItem('query') || '',
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = this.state.searchQuery.trim(); // to reduce spaces use trim
    localStorage.setItem('query', query);
    this.props.onSearch();
  };

  render() {
    return (
      <div className="headline__wrapper">
        <h1 className="headline__title">
          Welcome to <br />
          Star Wars Planets Collection
        </h1>
        <p className="headline__text">
          Welcome to the collection of planets from the Star Wars universe! Here
          you can find detailed information about each planet, including its
          climate, population and unique images. Explore the galaxy and learn
          more about the places that play a key role in the beloved space saga.
        </p>
        <form className="headline__form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
            placeholder="Enter planet name"
          />
          <Button className="headline__form-button" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
            >
              <path
                d="M16.8609 20.9999L15.1992 19.3083L19.4128 15.1666H4.99146V12.8333H19.4128L15.1992 8.69161L16.8609 6.99994L23.9826 13.9999L16.8609 20.9999Z"
                fill="#030B16"
              />
            </svg>
          </Button>
        </form>
      </div>
    );
  }
}

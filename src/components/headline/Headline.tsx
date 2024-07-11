import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../ui-kit/Button';
import './Headline.css';

interface HeadlineProps {
  defaultQuery: string;
  setQuery: (query: string) => void;
}

const Headline: React.FC<HeadlineProps> = ({ defaultQuery, setQuery }) => {
  const [searchQuery, setSearchQuery] = useState(defaultQuery || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim(); // to reduce spaces use trim
    setQuery(query);
  };

  return (
    <div className="headline__wrapper">
      <h1 className="headline__title">
        Welcome to <br />
        Star Wars Planets Collection
      </h1>
      <p className="headline__text">
        Welcome to the collection of planets from the Star Wars universe! Here
        you can find detailed information about each planet, including its
        climate, population and unique images. Explore the galaxy and learn more
        about the places that play a key role in the beloved space saga.
      </p>
      <form className="headline__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
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
};

export default Headline;

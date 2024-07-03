import { ChangeEvent, Component, FormEvent } from 'react';
import { Button } from '../ui-kit/Button';

export default class Headline extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Поиск: ' + this.state.searchQuery);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
          placeholder="Введите запрос"
        />
        <Button type="submit">Поиск</Button>
      </form>
    );
  }
}

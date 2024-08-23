import { Component } from 'react';

import './App.css';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  // Cuando se tenga una clase de componente que necesita hacer una llamada a una API para obtener datos que se necesita mostrar ene la UI, se requiere poner en el componenteDidMount()
  componentDidMount() {
    console.log('componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        ));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }

  // render() determina qué mostrar. Monta la UI een el DOM
  // Los componentes se renderizan cada vez que:
  // - cuando se llama al setState
  // - cuando se actualizan los props
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => { // Se crea un array nuevo "filteredMonsters" que contiene los monstruos filtrados sin modificar el array original 
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox
          className='monsters-search-box'
          onChangeHandler={onSearchChange} 
          placeholder='search monsters'  />

        {/* Los componentes creados se deben escribir con Capitalize */}
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

}

export default App;

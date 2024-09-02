// import { Component } from 'react'; al no utilizar mas componentes de clase lo eliminamos

import { useState, useEffect } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState(''); // [value, set] value = valor que queremos almacenar, set = el que setea nuestra funcion
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  // La unica vez que se tiene qque llamar a esta funcion es cuando se ejecuta por prrimera vezz
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, []); // (callback = efecto que queuremos q suceda, array de dependencias)

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => { 
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);

  }, [monsters,searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };


  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange} 
        placeholder='search monsters'  />
      <CardList monsters={filteredMonsters} /> 
    </div>
  );

}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//   // Cuando se tenga una clase de componente que necesita hacer una llamada a una API para obtener datos que se necesita mostrar ene la UI, se requiere poner en el componenteDidMount()
//   componentDidMount() {
//     console.log('componentDidMount')
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           },
//           () => {
//             console.log(this.state);
//           }
//         ));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   }

//   // render() determina qué mostrar. Monta la UI een el DOM
//   // Los componentes se renderizan cada vez que:
//   // - cuando se llama al setState
//   // - cuando se actualizan los props
//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => { // Se crea un array nuevo "filteredMonsters" que contiene los monstruos filtrados sin modificar el array original 
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
        
//         <SearchBox
//           className='monsters-search-box'
//           onChangeHandler={onSearchChange} 
//           placeholder='search monsters'  />

//         {/* Los componentes creados se deben escribir con Capitalize */}
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }

// }

export default App;

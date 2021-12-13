import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

import CharacterList from './components/Characters/CharacterList';
import FilmList from './components/Films/FilmList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getFilms();
    getCharacters();
  }, []);

  const getFilms = async () => {
    const resp = await fetch('https://the-one-api.dev/v2/movie/', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });

    const data = await resp.json();
    const transformData = data.docs.map((film) => [
      film.name,
      film.boxOfficeRevenueInMillions,
      film.academyAwardNominations,
    ]);

    setFilms(transformData);
  };

  const getCharacters = async () => {
    const resp = await fetch('https://the-one-api.dev/v2/movie/', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });

    return [];
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/films" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
        </header>

        <Switch>
          <Route exact path="/characters">
            <h1>Characters</h1>
            <CharacterList characters={characters} />
          </Route>
          <Route exact path="/films">
            <h1>Films</h1>
            <FilmList films={films} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

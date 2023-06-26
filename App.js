import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Home from './components/Home.js';
import Explore from './components/Explore.js';
import Planets from './components/Planets.js';

function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople(){
      let res = await fetch('https://swapi.dev/api/people');
      let data = await res.json();
      setPeople(data.results);
      setLoading(false);
    }

    async function fetchPlanets(){
      let res = await fetch('https://swapi.dev/api/planets');
      let data = await res.json();
      setPlanets(data.results);
      setLoading(false);
    }

    fetchPeople();
    fetchPlanets();

  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Container>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted >Loading</Loader>
            </Dimmer>
          ) : (
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/people' element={<Explore data={people}/>} />
                <Route path='/planets' element={<Planets data={planets}/>} />
            </Routes>

          )}
        </Container>
      </Router>
    </>
  );
}

export default App;

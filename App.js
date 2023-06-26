import React, { useState, useEffect } from 'react';
import 'https://github.com/anishhhsingh/starwarss/edit/main/App.css';
import Navbar from 'https://github.com/anishhhsingh/starwarss/edit/main/components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Home from 'https://github.com/anishhhsingh/starwarss/edit/main/components/Home.js';
import Explore from 'https://github.com/anishhhsingh/starwarss/edit/main/components/Explore.js';
import Planets from 'https://github.com/anishhhsingh/starwarss/edit/main/components/Planets.js';

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

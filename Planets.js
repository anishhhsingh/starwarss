import React, { useState } from 'react';
import { Card, Grid, Button, Input } from 'semantic-ui-react';
import './Planet.css';

export default function Planets({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const cardsPerPage = 6;
  const filteredData = data.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <h1>Planets</h1>
      <div className="search-container">
        <Input
          type="text"
          placeholder="Search planet names..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <Grid columns={3}>
        {currentCards.map((planets, i) => {
          return (
            <Grid.Column key={i}>
              <Card>
                <Card.Content>
                  <Card.Header>{planets.name}</Card.Header>
                  <Card.Description>
                    <strong>Climate</strong>
                    <p>{planets.climate}</p>
                    <strong>Diameter</strong>
                    <p>{planets.diameter}</p>
                    <strong>Population</strong>
                    <p>{planets.population}</p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid>

      <div className="pagination-container">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          icon="arrow left"
          className="pagination-button"
        />
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          icon="arrow right"
          className="pagination-button"
        />
      </div>
    </>
  );
}

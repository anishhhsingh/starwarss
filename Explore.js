import React, { useState } from 'react';
import { Card, Grid, Button, Input } from 'semantic-ui-react';
import './Explore.css';

export default function People({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const cardsPerPage = 6;

  const filteredData = data.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className='people_page'>
      <h1>Explore</h1>
      <div className='search-container'>
        <Input
          icon='search'
          placeholder='Search people...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Grid columns={3}>
        {currentCards.map((person, i) => (
          <Grid.Column key={i}>
            <Card>
              <Card.Content>
                <Card.Header>{person.name}</Card.Header>
                <Card.Description>
                  <strong>Height</strong>
                  <p>{person.height}</p>
                  <strong>Mass</strong>
                  <p>{person.mass}</p>
                  <strong>Hair Color</strong>
                  <p>{person.hair_color}</p>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
      <div className='pagination-container'>
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          icon='arrow left'
          className='pagination-button'
        />
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          icon='arrow right'
          className='pagination-button'
        />
      </div>
    </div>
  );
}

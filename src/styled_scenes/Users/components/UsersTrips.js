import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TripCart from '../../../shared_components/Carts/Trip';
import Carousel from '../../../shared_components/Carousel';
import { SectionWrap, SectionHeader } from '../../../shared_components/layout/Page';
import LocationCart from '../../../shared_components/Carts/Location';

const CarouselWrap = styled.div`
  padding-right: 32px;
`;

const UsersTrips = props => {
  const dummyTrip = {
    image: 'http://api.please.docker/parse/files/myAppId/0d1d3afec6926a61aac33c9f15941349_pexels-photo-945615.jpeg',
    title: 'Explore New York',
    price: '210',
  };
  return (
    <SectionWrap>
      <SectionHeader>
        <h3>Nick's Trips</h3>
      </SectionHeader>
      <CarouselWrap>
        <Carousel sm_slides_nb={1} md_slides_nb={2} lg_slides_nb={3} xl_slides_nb={4}>
          <Link to={'/trips/'} key={1}>
            <LocationCart item={dummyTrip} index={1} />
          </Link>
          <Link to={'/trips/'} key={1}>
            <LocationCart item={dummyTrip} index={1} />
          </Link>
          <Link to={'/trips/'} key={3}>
            <LocationCart item={dummyTrip} index={3} />
          </Link>
          <Link to={'/trips/'} key={4}>
            <LocationCart item={dummyTrip} index={4} />
          </Link>
          <Link to={'/trips/'} key={5}>
            <LocationCart item={dummyTrip} index={5} />
          </Link>
          <Link to={'/trips/'} key={6}>
            <LocationCart item={dummyTrip} index={6} />
          </Link>
        </Carousel>
      </CarouselWrap>
    </SectionWrap>
  );
};

export default UsersTrips;

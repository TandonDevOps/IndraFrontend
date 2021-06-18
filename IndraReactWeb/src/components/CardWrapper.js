import React from 'react';
import Card from 'react-bootstrap/Card';
import propTypes from 'prop-types';
import Heading from './Heading';

const CardWrapper = ({ title, children }) => (
  <Card>
    <Heading 
      sectionLevel={"h5"}
      style={{ textAlign: 'center', fontSize: 16 }}
      className={"card-header bg-primary text-white"}
      text={title}
    />
    <Card.Body>{children}</Card.Body>
  </Card>
);

CardWrapper.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};

export default CardWrapper;

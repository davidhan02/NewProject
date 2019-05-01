import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import {
  deleteExperience,
  deleteEducation
} from '../../../actions/profileActions';

const ProfileCreds = ({
  auth: { user },
  userId,
  experience,
  education,
  deleteExperience,
  deleteEducation
}) => {
  let eduList, expList;

  eduList = expList = (
    <ListGroup.Item className="text-center">None Listed Yet</ListGroup.Item>
  );

  const deleteExp = id => {
    deleteExperience(id);
  };

  const deleteEdu = id => {
    deleteEducation(id);
  };

  if (experience.length > 0) {
    expList = experience.map(exp => {
      const { _id, company, from, to, title, location, description } = exp;
      const userLinks = (
        <div className="float-right">
          <Link to={`/edit-exp/${_id}`} className="btn btn-outline-info mr-1">
            Edit
          </Link>
          <Button variant="outline-danger" onClick={() => deleteExp(_id)}>
            X
          </Button>
        </div>
      );
      return (
        <ListGroup.Item key={_id}>
          {userId === user._id && userLinks}
          <h4>{company}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{from}</Moment>
            {' - '}
            {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}
          </p>
          <p>
            <strong>Position:</strong> {title}
          </p>
          <p>
            <span>
              <strong>Location: </strong> {location || ''}
            </span>
          </p>
          <p>
            <span>
              <strong>Description: </strong> {description || ''}
            </span>
          </p>
        </ListGroup.Item>
      );
    });
  }
  if (education.length > 0) {
    eduList = education.map(edu => {
      const { _id, school, from, to, degree, major, description } = edu;
      const userLinks = (
        <div className="float-right">
          <Link to={`/edit-edu/${_id}`} className="btn btn-outline-info mr-1">
            Edit
          </Link>
          <Button variant="outline-danger" onClick={() => deleteEdu(_id)}>
            X
          </Button>
        </div>
      );
      return (
        <ListGroup.Item key={_id}>
          {userId === user._id && userLinks}
          <h4>{school}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{from}</Moment>
            {' - '}
            {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}
          </p>
          <p>
            <strong>Degree:</strong> {degree}
          </p>
          <p>
            <span>
              <strong>Major: </strong> {major || ''}
            </span>
          </p>
          <p>
            <span>
              <strong>Description: </strong> {description || ''}
            </span>
          </p>
        </ListGroup.Item>
      );
    });
  }
  return (
    <Row className="mb-3">
      <Col md={6}>
        <h3 className="text-center text-info">Experience</h3>
        <ListGroup>{expList}</ListGroup>
      </Col>
      <Col md={6}>
        <h3 className="text-center text-info">Education</h3>
        <ListGroup>{eduList}</ListGroup>
      </Col>
    </Row>
  );
};

ProfileCreds.propTypes = {
  auth: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { deleteExperience, deleteEducation }
)(ProfileCreds);

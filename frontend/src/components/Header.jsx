import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Breadcrumbs,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Link } from '@reach/router';

const InvisLink = styled(Link)({
  textDecoration: 'none',
  color: '#FFF',
});

const StyledHR = styled(Divider)({
  width: '10%',
});

function StyledLink(props) {
  if (props.to === props.path) {
    return (
      <Typography variant="h6" color="secondary">
        {props.children}
      </Typography>
    );
  }
  return (
    <Typography variant="h6">
      <InvisLink to={props.to}>{props.children}</InvisLink>
    </Typography>
  );
}

export default function(props) {
  const path = props.uri;
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledLink to="/">SquishedIt!</StyledLink>
        <StyledHR orientation="vertical" />
        <Breadcrumbs separator="-" aria-label="breadcrumb">
          <StyledLink to="/garments" path={path}>
            Garments
          </StyledLink>
          <StyledLink to="/clients" path={path}>
            Clients
          </StyledLink>
          <StyledLink to="/measure" path={path}>
            Measure
          </StyledLink>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}

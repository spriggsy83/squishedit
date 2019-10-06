import React from 'react';
import { AppBar, Toolbar, Typography, Divider } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Link } from '@reach/router';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

export default function() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <StyledLink to="/">SquishedIt!</StyledLink>
        </Typography>
        <Divider orientation="vertical" />
      </Toolbar>
    </AppBar>
  );
}

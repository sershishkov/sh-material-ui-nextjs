import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({}));

const Index = () => {
  const classes = useStyles();
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='h1'>Progects</Typography>
      </Grid>
    </Grid>
  );
};

export default Index;

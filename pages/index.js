import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({}));

const createData = (
  name,
  date,
  service,
  features,
  compexity,
  platforms,
  users,
  total
) => {
  return { name, date, service, features, compexity, platforms, users, total };
};

const Index = () => {
  const classes = useStyles();

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSofwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [rows, setRows] = useState([
    createData(
      'Ser Shishkov',
      '21/01/09',
      'Website',
      'E-commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500'
    ),
    createData(
      'Bill Gates',
      '21/02/09',
      'Custom Software',
      'GPS, Push notifications, Users/Authentications, File transfer',
      'Medium',
      'Web Application',
      '0-10',
      '$1600'
    ),
    createData(
      'Steve Jobs',
      '21/03/09',
      'Custom Software',
      'Photo/Video, File Transfer, Users/Authentications',
      'Low',
      'Web Application',
      '10-100',
      '$1250'
    ),
  ]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction='column'>
        <Grid item style={{ marginTop: '2em', marginLeft: '5em' }}>
          <Typography variant='h1'>Progects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder='Search project details or create a new entry.'
            style={{ width: '35em', marginLeft: '5em' }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setDialogOpen(true)}
                >
                  <AddIcon color='primary' style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item style={{ marginLeft: '5em', marginTop: '2em' }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={websiteChecked}
                  color='primary'
                  onChange={() => setWebsiteChecked(!websiteChecked)}
                />
              }
              label='Websites'
              labelPlacement='start'
            />

            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={iOSChecked}
                  color='primary'
                  onChange={() => setiOSChecked(!iOSChecked)}
                />
              }
              label='iOS Apps'
              labelPlacement='start'
            />

            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={androidChecked}
                  color='primary'
                  onChange={() => setAndroidChecked(!androidChecked)}
                />
              }
              label='Android'
              labelPlacement='start'
            />

            <FormControlLabel
              control={
                <Switch
                  checked={softwareChecked}
                  color='primary'
                  onChange={() => setSofwareChecked(!softwareChecked)}
                />
              }
              label='Custom Software'
              labelPlacement='start'
            />
          </FormGroup>
        </Grid>
        <Grid item container justify='flex-end' style={{ marginTop: '5em' }}>
          <Grid item style={{ marginRight: 75 }}>
            <FilterListIcon color='secondary' style={{ fontSize: 50 }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: '15em' }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Service</TableCell>
                  <TableCell align='center'>Features</TableCell>
                  <TableCell align='center'>Compexity</TableCell>
                  <TableCell align='center'>Platforms</TableCell>
                  <TableCell align='center'>Users</TableCell>
                  <TableCell align='center'>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align='center'>{row.name}</TableCell>
                      <TableCell align='center'>{row.date}</TableCell>
                      <TableCell align='center'>{row.service}</TableCell>
                      <TableCell align='center' style={{ maxWidth: '5em' }}>
                        {row.features}
                      </TableCell>
                      <TableCell align='center'>{row.compexity}</TableCell>
                      <TableCell align='center'>{row.platforms}</TableCell>
                      <TableCell align='center'>{row.users}</TableCell>
                      <TableCell align='center'>{row.total}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='h1' gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container>
              <Grid item container direction='column'>
                <Grid item>
                  <TextField
                    label='Name'
                    id='name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item container direction='column'>
                <Grid item>
                  <KeyboardDatePicker
                    // placeholder='01/01/2021'
                    // autoOk
                    format='dd/MM/yyyy'
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Index;

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { format } from 'date-fns';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import EnhancedTable from '../src/ui/EnhancedTable';

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    color: '#FFF',
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const createData = (
  name,
  date,
  service,
  features,
  compexity,
  platforms,
  users,
  total,
  search
) => {
  return {
    name,
    date,
    service,
    features,
    compexity,
    platforms,
    users,
    total,
    search,
  };
};

const Index = () => {
  const classes = useStyles();

  const platformOptions = ['Web', 'iOS', 'Android'];
  let featureOptions = [
    'Photo/Video',
    'GPS',
    'File Transfer',
    'Users/authentications',
    'Biometrics',
    'Push notifications',
  ];
  const websiteOptions = ['Basic', 'Interactive', 'E-commercer'];

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSofwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState('');
  const [service, setService] = useState('');
  const [compexity, setCompexity] = useState('');
  const [users, setUsers] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState('');

  const [rows, setRows] = useState([
    createData(
      'Ser Shishkov',
      '21/01/09',
      'Website',
      'E-commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500',
      true
    ),
    createData(
      'Bill Gates',
      '21/02/09',
      'Custom Software',
      'GPS, Push notifications, Users/Authentications, File transfer',
      'Medium',
      'Web Application',
      '0-10',
      '$1600',
      true
    ),
    createData(
      'Steve Jobs',
      '21/03/09',
      'Custom Software',
      'Photo/Video, File Transfer, Users/Authentications',
      'Low',
      'Web Application',
      '10-100',
      '$1250',
      true
    ),
  ]);

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, 'dd/MM/yyyy'),
        service,
        features.join(', '),
        service === 'Website' ? 'N/A' : compexity,
        service === 'Website' ? 'N/A' : platforms.join(', '),
        service === 'Website' ? 'N/A' : users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpen(false);
    setName('');
    setDate(new Date());
    setTotal('');
    setService('');
    setCompexity('');
    setUsers('');
    setPlatforms([]);
    setFeatures([]);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    //Вернули массивы только начений
    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );
    // console.log(rowData);

    // создали масиивы со значением true or false
    //те находим ячейки где есть совпадения
    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    //Если есть совпадения в строке то поле search=true
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );
    setRows(newRows);
    // console.log(matches);
  };

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
            value={search}
            onChange={handleSearch}
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

        <Grid
          item
          style={{ marginTop: '5em', marginBottom: '35em', padding: '2em' }}
        >
          <EnhancedTable
            rows={rows.filter((row) => row.search)}
            setRows={setRows}
          />
        </Grid>
        <Dialog
          fullWidth
          maxWidth='md'
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='h1' gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justify='space-between'>
              <Grid item>
                <Grid item container direction='column' sm>
                  <Grid item>
                    <TextField
                      label='Name'
                      fullWidth
                      id='name'
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    direction='column'
                    style={{ marginTop: '5em' }}
                  >
                    <Grid item>
                      <Typography variant='h4'>Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label='service'
                        name='service'
                        value={service}
                        onChange={(event) => {
                          setService(event.target.value), setFeatures([]);
                        }}
                      >
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Website'
                          label='Website'
                          control={<Radio />}
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Mobile App'
                          label='Mobile App'
                          control={<Radio />}
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Custom Software'
                          label='Custom Software'
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid item style={{ marginTop: '5em' }}>
                      <Select
                        style={{ width: '12em' }}
                        labelId='platforms'
                        id='platforms'
                        disabled={service === 'Website'}
                        displayEmpty
                        renderValue={
                          platforms.length > 0 ? undefined : () => 'Platforms'
                        }
                        multiple
                        value={platforms}
                        onChange={(event) => setPlatforms(event.target.value)}
                      >
                        {platformOptions &&
                          platformOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction='column'
                  sm
                  alignItems='center'
                  style={{ marginTop: 16 }}
                >
                  <Grid item>
                    <KeyboardDatePicker
                      // placeholder='01/01/2021'
                      // autoOk
                      format='dd/MM/yyyy'
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction='column'
                      style={{ marginTop: '5em' }}
                    >
                      <Grid item>
                        <Typography variant='h4'>Compexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label='compexity'
                          name='compexity'
                          value={compexity}
                          onChange={(event) => setCompexity(event.target.value)}
                        >
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='Low'
                            label='Low'
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='Medium'
                            label='Medium'
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='High'
                            label='High'
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction='column'
                  // alignItems='flex-end'
                  sm
                >
                  <Grid item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>$</InputAdornment>
                        ),
                      }}
                      value={total}
                      id='total'
                      label='Total'
                      onChange={(event) => setTotal(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      alignItems='flex-end'
                      direction='column'
                      style={{ marginTop: '5em' }}
                    >
                      <Grid item>
                        <Typography variant='h4'>Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label='users'
                          name='users'
                          value={users}
                          onChange={(event) => setUsers(event.target.value)}
                        >
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value='0-10'
                            label='0-10'
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value='10-100'
                            label='10-100'
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value='100+'
                            label='100+'
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid item style={{ marginTop: '5em' }}>
                        <Select
                          labelId='features'
                          id='features'
                          style={{ width: '12em' }}
                          MenuProps={{ style: { zIndex: 1302 } }}
                          displayEmpty
                          renderValue={
                            features.length > 0 ? undefined : () => 'Features'
                          }
                          multiple
                          value={features}
                          onChange={(event) => setFeatures(event.target.value)}
                        >
                          {service === 'Website'
                            ? (featureOptions = websiteOptions)
                            : null}
                          {featureOptions &&
                            featureOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify='center' style={{ marginTop: '3em' }}>
              <Grid item>
                <Button
                  onClick={() => setDialogOpen(false)}
                  color='primary'
                  style={{ fontWeight: 300 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={addProject}
                  variant='contained'
                  className={classes.button}
                  disabled={
                    service === 'Website'
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        compexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Index;

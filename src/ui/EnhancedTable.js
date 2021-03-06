import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    label: 'Name',
  },
  { id: 'date', label: 'Date' },
  { id: 'service', label: 'Service' },
  { id: 'features', label: 'Features' },
  { id: 'complexity', label: 'Complexity' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'users', label: 'Users' },
  { id: 'total', label: 'Total' },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  menu: {
    '&:hover': {
      backgroundColor: '#FFF',
    },
    '&:Mui-focusVisible': {
      backgroundColor: '#FFF',
    },
  },
  totalFilter: {
    fontSize: '2rem',
    color: theme.palette.common.orange,
  },
  dollarSign: {
    fontSize: '1.5rem',
    color: theme.palette.common.orange,
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [undo, setUndo] = useState([]);
  const [anchorEl, setAncorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    backgroundColor: '#FF3232',
    color: '#FFF',
    message: 'Rew Deleted',
  });
  const onDelete = () => {
    // console.log(props.selected);
    const newRows = [...props.rows];
    // console.log(newRows);
    const selectedRows = newRows.filter((row) =>
      props.selected.includes(row.name)
    );
    // console.log(selectedRows);
    selectedRows.map((row) => (row.search = false));
    props.setRows(newRows);
    setUndo(selectedRows);
    props.setSelected([]);
    setAlert({ ...alert, open: true });
  };

  const onUndo = () => {
    setAlert({ ...alert, open: false });
    const newRows = [...props.rows];
    const redo = [...undo];
    redo.map((row) => (row.search = true));
    // console.log([...newRows, ...redo]);
    props.setRows([...newRows, ...redo]);
  };
  const handleClick = (e) => {
    setAncorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAncorEl(null);
    setOpenMenu(false);
  };

  const handleTotalFilter = (event) => {
    props.setFilterPrice(event.target.value);
    // console.log(event.target.value);
    // console.log(props.rows);
    if (event.target.value !== '') {
      const newRows = [...props.rows];

      // newRows.filter((row) =>
      //   eval(
      //     `${event.target.value} ${
      //       props.totalFilter === '=' ? '===' : props.totalFilter
      //     } ${row.total.slice(1, row.total.length)}`
      //   )
      // );

      newRows.map((row) =>
        eval(
          `${event.target.value} ${
            props.totalFilter === '=' ? '===' : props.totalFilter
          } ${row.total.slice(1, row.total.length)}`
        )
          ? (row.search = true)
          : (row.search = false)
      );
      props.setRows(newRows);
      // console.log(props.rows);
    } else {
      const newRows = [...props.rows];
      newRows.map((row) => (row.search = true));
      props.setRows(newRows);
    }
  };
  const filterChange = (operator) => {
    if (props.filterPrice !== '') {
      const newRows = [...props.rows];

      // newRows.filter((row) =>
      //   eval(
      //     `${props.filterPrice}  ${
      //       operator === '=' ? '===' : operator
      //     } ${row.total.slice(1, row.total.length)}`
      //   )
      // );

      newRows.map((row) =>
        eval(
          `${props.filterPrice}  ${
            operator === '=' ? '===' : operator
          } ${row.total.slice(1, row.total.length)}`
        )
          ? (row.search = true)
          : (row.search = false)
      );
      props.setRows(newRows);
    } else {
      const newRows = [...props.rows];
      newRows.map((row) => (row.search = true));
      props.setRows(newRows);
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} выбрано
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {null}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete' onClick={onDelete}>
            <DeleteIcon style={{ fontSize: 30 }} color='primary' />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list' onClick={handleClick}>
            <FilterListIcon style={{ fontSize: 50 }} color='secondary' />
          </IconButton>
        </Tooltip>
      )}
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor, color: alert.color },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            setAlert({ ...alert, open: false });
            const newRows = [...props.rows];
            const names = [...undo.map((row) => row.name)];
            props.setRows(newRows.filter((row) => !names.includes(row.name)));
          }
        }}
        // autoHideDuration={5000}
        action={
          <Button style={{ color: '#FFF' }} onClick={onUndo}>
            Undo
          </Button>
        }
      ></Snackbar>
      <Menu
        id='sh-menu-for-services'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        // MenuListProps={{ onMouseLeave: handleClose }}
        // classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        <MenuItem classes={{ root: classes.menu }}>
          <TextField
            value={props.filterPrice}
            onChange={handleTotalFilter}
            placeholder='Enter a price to filter'
            InputProps={{
              type: 'number',
              startAdornment: (
                <InputAdornment position='start'>
                  <span className={classes.dollarSign}>$</span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    {
                      props.totalFilter === '>'
                        ? props.setTotalFilter('<')
                        : props.totalFilter === '<'
                        ? props.setTotalFilter('=')
                        : props.setTotalFilter('>');
                    }
                    filterChange(
                      props.totalFilter === '>'
                        ? props.setTotalFilter('<')
                        : props.totalFilter === '<'
                        ? props.setTotalFilter('=')
                        : props.setTotalFilter('>')
                    );
                  }}
                  position='end'
                  style={{ cursor: 'pointer' }}
                >
                  <span className={classes.totalFilter}>
                    {props.totalFilter}
                  </span>
                </InputAdornment>
              ),
            }}
          />
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  chip: {
    marginRight: '2em',
    backgroundColor: theme.palette.common.blue,
    color: '#FFF',
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filterPrice, setFilterPrice] = useState('');
  const [totalFilter, setTotalFilter] = useState('>');

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const switchFilters = () => {
    const {
      websiteChecked,
      iOSChecked,
      androidChecked,
      softwareChecked,
    } = props;

    const websites = props.rows.filter((row) =>
      websiteChecked ? row.service === 'Website' : null
    );
    const iOSApps = props.rows.filter((row) =>
      iOSChecked ? row.platforms.includes('iOS') : null
    );
    const androidApps = props.rows.filter((row) =>
      androidChecked ? row.platforms.includes('Android') : null
    );
    const softwareApps = props.rows.filter((row) =>
      softwareChecked ? row.service === 'Custom Software' : null
    );

    if (!websiteChecked && !iOSChecked && !androidChecked && !softwareChecked) {
      return props.rows;
    } else {
      let newRows = websites.concat(
        iOSApps.filter((item) => websites.indexOf(item) < 0)
      );
      let newRows2 = newRows.concat(
        androidApps.filter((item) => newRows.indexOf(item) < 0)
      );
      let newRows3 = newRows2.concat(
        softwareApps.filter((item) => newRows2.indexOf(item) < 0)
      );
      return newRows3;
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <EnhancedTableToolbar
          setRows={props.setRows}
          rows={props.rows}
          selected={selected}
          setSelected={setSelected}
          numSelected={selected.length}
          setFilterPrice={setFilterPrice}
          filterPrice={filterPrice}
          totalFilter={totalFilter}
          setTotalFilter={setTotalFilter}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(switchFilters(), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name} //лучше если row.id
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.name}
                      </TableCell>
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
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Grid container justify='flex-end'>
          <Grid item>
            {filterPrice !== '' ? (
              <Chip
                onDelete={() => {
                  setFilterPrice('');
                  const newRows = [...props.rows];
                  newRows.map((row) => (row.search = true));
                  props.setRows(newRows);
                }}
                className={classes.chip}
                label={
                  totalFilter === '>'
                    ? `Less than $${filterPrice}`
                    : totalFilter === '<'
                    ? `Grater than $${filterPrice}`
                    : `Equal to $${filterPrice}`
                }
              />
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

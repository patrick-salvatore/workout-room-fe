import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Close';

import Cell from './cell';

import MockData from './mock.data';

import './grid.scss';

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#5393ff',
      color: theme.palette.common.white,
      width: 'auto',
    },
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      height: 50,
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    maxHeight: 283,
  },
  row: {
    minHeight: 50,
  },
  delete: {
    width: 30,
    border: 'none',
  },
});

const Grid = (): JSX.Element => {
  const classes = useStyles();
  const [columnHeaders, setColumnHeaders] = React.useState<any>([]);
  const [dataRows, setRows] = React.useState<any>([]);

  React.useEffect(() => {
    /*
     * TODO: add API call instead of mock data
     */
    setRows(MockData.testRowsData);
    setColumnHeaders(MockData.defaultColHeader);

    return () => {};
  }, []);

  const handleColHeaderChange = ({ cellCol, value }) => {
    const newCols = columnHeaders;

    if (String(value).length) {
      newCols[cellCol] = value;
    } else {
      return;
    }

    setColumnHeaders([...newCols]);
  };

  const handleCellChange = ({ cellRow, cellCol, value }): void => {
    const newRows = dataRows;

    if (!String(value).length) {
      newRows[cellRow][cellCol] = 'Empty';
    } else {
      newRows[cellRow][cellCol] = value;
    }

    setRows([...newRows]);
  };

  const addNewRow = () => {
    const newRowData = columnHeaders.reduce((acc, prev) => {
      acc[prev.toLowerCase()] = 'Empty';
      return acc;
    }, {});

    dataRows.push(newRowData);
    setRows([...dataRows]);
  };

  const addNewCol = () => {
    const newRowData = dataRows.reduce((acc, prev) => {
      prev['empty'] = 'Empty';
      acc.push(prev);
      return acc;
    }, []);

    setColumnHeaders([...columnHeaders, 'Empty']);
    setRows([...newRowData]);
  };

  const deleteRow = idx => {
    const newRows = dataRows;
    newRows.splice(idx, 1);
    setRows([...newRows]);
  };

  return (
    <div style={{ width: '100%' }} className="grid__container">
      <div className="">
        <Button variant="contained" color="primary" onClick={addNewRow}>
          Add Row
        </Button>
        <Button variant="contained" color="primary" onClick={addNewCol}>
          Add Column
        </Button>
      </div>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="Your workouts"
        >
          <TableHead>
            <StyledTableRow>
              <Cell
                value=""
                canEdit={false}
                className="cell cell--grid-header empty"
              />
              {columnHeaders.map((c, i) => (
                <Cell
                  key={i}
                  value={c}
                  canEdit={true}
                  className="cell cell--grid-header"
                  col={i}
                  handleCellChange={handleColHeaderChange}
                />
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {dataRows.map((r, rIdx) => (
              <StyledTableRow key={`row-${rIdx}`}>
                <TableCell size="small" className="cell cell--grid-body empty">
                  <IconButton size="small" onClick={() => deleteRow(rIdx)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                {Object.keys(r).map((key, colIdx) => (
                  <Cell
                    key={colIdx}
                    value={r[key]}
                    canEdit={true}
                    className="cell cell--grid-body"
                    handleCellChange={handleCellChange}
                    row={rIdx}
                    col={key}
                  />
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(Grid);

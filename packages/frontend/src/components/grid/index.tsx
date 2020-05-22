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
import Button from '@material-ui/core/Button';

import Cell from './cell';

import { DefaultRows } from './interface';

import mockData from './mock.data';

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
});

const _rows: DefaultRows[] = [
  {
    lift: 'clean',
    weight: 'test3',
    sets: 'test88',
    reps: 'test4',
  },
  {
    lift: 'test',
    weight: 'test3',
    sets: 'test88',
    reps: 'test4',
  },
  {
    lift: 'test2',
    weight: 'test3',
    sets: 'test88',
    reps: 'test4',
  },
  {
    lift: 'test22',
    weight: 'test3',
    sets: 'test88',
    reps: 'test4',
  },
];

const defaultColHeader = ['Lifts', 'Weight', 'Sets', 'Reps'];

export default function Grid(): JSX.Element {
  const classes = useStyles();
  const [columnHeaders, setColumnHeaders] = React.useState(defaultColHeader);
  const [rows, setRows] = React.useState(_rows);

  const handleCellChange = ({ cellRow, cellCol, value }): void => {
    rows[cellRow][cellCol] = value;
    console.log(rows);
    setRows(rows);
  };

  return (
    <div style={{ width: '100%' }} className="grid__container">
      <div className="">
        <Button>Add Row</Button>
        <Button>Add Column</Button>
      </div>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <StyledTableRow>
              {columnHeaders.map((c, i) => (
                <Cell
                  key={i}
                  value={c}
                  canEdit={false}
                  className="cell cell--grid-header"
                  col={c}
                />
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIdx) => (
              <StyledTableRow key={`row-${rowIdx}`}>
                {Object.keys(row).map((key, colIdx) => (
                  <Cell
                    key={colIdx}
                    value={row[key]}
                    canEdit={true}
                    className="cell cell--grid-body"
                    handleCellChange={handleCellChange}
                    row={rowIdx}
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
}

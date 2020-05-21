import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { DefaultRows } from './interface';

import mockData from './mock.data';

import './grid.scss';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#5393ff',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
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
  { lift: '', weight: '', sets: '', reps: '', difficultly: '' },
  { lift: '', weight: '', sets: '', reps: '', difficultly: '' },
  { lift: '', weight: '', sets: '', reps: '', difficultly: '' },
  { lift: '', weight: '', sets: '', reps: '', difficultly: '' },
];

const defaultColHeader = ['Lifts', 'Weight', 'Sets', 'Reps', 'Intensity'];

export default function CustomizedTables(): JSX.Element {
  const classes = useStyles();
  const [columns, setColumns] = React.useState(defaultColHeader);
  const [rows, setRows] = React.useState(_rows);

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
            <TableRow>
              {columns.map((c, i) => (
                <StyledTableCell key={i}>{c}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={`row-${i}`}>
                {Object.keys(row).map((key, i) => (
                  <StyledTableCell
                    key={`cell-${i}`}
                    onDoubleClick={() => console.log('2x click')}
                  >
                    {row[key]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

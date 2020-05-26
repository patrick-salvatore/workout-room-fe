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
});

const Grid = (): JSX.Element => {
  const classes = useStyles();
  const [columnHeaders, setColumnHeaders] = React.useState<any>([]);
  const [rows, setRows] = React.useState<any>([]);

  React.useEffect(() => {
    /*
     * TODO: add API call instead of mock data
     */
    setRows(MockData.testRowsData);
    setColumnHeaders(MockData.defaultColHeader);

    return () => {};
  }, []);

  const handleCellChange = ({ cellRow, cellCol, value }): void => {
    const newRows = rows;

    if (!String(value).length) {
      newRows[cellRow][cellCol] = 'Empty';
    } else {
      newRows[cellRow][cellCol] = value;
    }

    setRows(newRows);
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
            {rows.map((r, rIdx) => (
              <StyledTableRow key={`row-${rIdx}`}>
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

export default Grid;

import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';

import Cell from './cell';

import './grid.scss';

interface IGridProps {
  canEdit: boolean;
  rows: any[];
  columns: any[];
  handleGridChange?: (grid: any) => void;
  gridErrors?: any;
}

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
    height: 251,
  },
  row: {
    minHeight: 50,
  },
  delete: {
    width: 30,
    border: 'none',
  },
});

const DeleteRowIcon = ({ canEdit, deleteRow, rowIdx, hasError }) => (
  <>
    {canEdit && (
      <TableCell size="small" className="cell cell--grid-body empty">
        <IconButton size="small" onClick={() => !hasError && deleteRow(rowIdx)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    )}
  </>
);

const GridButtons = ({ canEdit, addNewRow, addNewCol }) => (
  <>
    {canEdit && (
      <div className="">
        <Button variant="contained" color="primary" onClick={addNewRow}>
          Add Row
        </Button>
        <Button variant="contained" color="primary" onClick={addNewCol}>
          Add Column
        </Button>
      </div>
    )}
  </>
);

const Grid: React.FC<IGridProps> = ({
  rows,
  columns,
  canEdit,
  gridErrors,
  handleGridChange,
}): JSX.Element => {
  const classes = useStyles();
  const [columnHeaders, setColumnHeaders] = React.useState<any[] | null>(null);
  const [rowData, setRowData] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<any>(false);
  const [editingColumn, setEditingColumn] = React.useState<boolean>(false);

  const handleColHeaderChange = ({ cellCol, value }) => {
    if (columnHeaders) {
      const isDifferent = value !== columnHeaders[cellCol];

      if (String(value).length && isDifferent) {
        const newCols = columnHeaders;
        newCols[cellCol] = value.trim();
        setColumnHeaders([...newCols]);
        handleGridChange && handleGridChange({ rows: rowData, cols: [...newCols] });
      }
    }
  };

  const handleCellChange = ({ cellRow, cellCol, value }): void => {
    const newRows = rowData;

    if (newRows) {
      if (!String(value).length) {
        newRows[cellRow][cellCol] = '';
      } else {
        newRows[cellRow][cellCol] = value;
      }
      setRowData([...newRows]);
      handleGridChange && handleGridChange({ rows: [...newRows], cols: columnHeaders });
    }
  };

  const addNewRow = () => {
    if (columnHeaders) {
      if (!gridErrors?.emptyColumnHeader.error) {
        const newRow = {};
        const numOfCols = columnHeaders.length;

        for (let c = 0; c < numOfCols; c++) {
          newRow[c] = '';
        }

        if (rowData) {
          rowData.push(newRow);
          setRowData([...rowData]);
          handleGridChange && handleGridChange({ rows: [...rowData], cols: columnHeaders });
        }
      } else {
        setError(true);
      }
    }
  };

  const addNewCol = () => {
    if (columnHeaders) {
      if (!gridErrors?.emptyColumnHeader.error) {
        const newRowData = rowData?.reduce((acc, prev) => {
          prev[columnHeaders?.length] = '';
          acc.push(prev);
          return acc;
        }, []);

        setColumnHeaders([...columnHeaders, 'Empty']);
        setRowData([...newRowData]);
        setEditingColumn(true);
        handleGridChange &&
          handleGridChange({
            rows: [...newRowData],
            cols: [...columnHeaders, 'Empty'],
          });
      } else {
        setError(true);
      }
    }
  };

  const deleteRow = (idx: number) => {
    if (rowData) {
      const newRows = rowData;
      newRows.splice(idx, 1);
      setRowData([...newRows]);
      handleGridChange && handleGridChange({ rows: [...newRows], cols: columnHeaders });
    }
  };

  const deleteColumn = (idx: number) => {
    if (rowData && columnHeaders) {
      const newRowData = [];
      for (let r = 0; r < rowData.length; r++) {
        const oldRowObj = rowData[r];
        const oldRowKeys = Object.keys(oldRowObj);
        const deleteKey = oldRowKeys[idx];
        delete oldRowObj[deleteKey];

        const newRowKeys = Object.keys(oldRowObj);

        const newRowObj = newRowKeys.reduce((acc, prev, i, arr) => {
          acc[i] = oldRowObj[prev];
          return acc;
        }, {});

        newRowData.push(newRowObj as never);
      }

      const newCols = columnHeaders;
      newCols.splice(idx, 1);

      setColumnHeaders([...newCols]);
      setRowData([...newRowData]);
      handleGridChange && handleGridChange({ rows: [...newRowData], cols: [...newCols] });
    }
  };

  React.useEffect(() => {
    if (rows && columns) {
      setRowData(rows);
      setColumnHeaders(columns);
    } else {
      setRowData([]);
      setColumnHeaders([]);
    }
  }, []);

  React.useEffect(() => {
    if (error) {
      setError(false);
    }

    if (editingColumn && !gridErrors?.emptyColumnHeader.error) {
      setEditingColumn(false);
    }
  }, [columnHeaders]);

  return (
    <div style={{ width: '100%' }} className="grid__container">
      <GridButtons canEdit={canEdit} addNewRow={addNewRow} addNewCol={addNewCol} />
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="Your workouts">
          <TableHead>
            <StyledTableRow>
              {canEdit && (
                <Cell
                  isColumn={false}
                  value=""
                  canEdit={false}
                  className="cell cell--grid-header empty"
                />
              )}
              {columnHeaders &&
                columnHeaders?.map((c, i) => (
                  <Cell
                    isEditingColumn={editingColumn}
                    hasError={error || gridErrors?.gridColumnError.error}
                    isColumn={true}
                    key={i}
                    value={c}
                    canEdit={canEdit}
                    className="cell cell--grid-header"
                    col={i}
                    handleCellChange={handleColHeaderChange}
                    deleteColumn={deleteColumn}
                  />
                ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rowData &&
              rowData?.map((r, rIdx) => (
                <StyledTableRow key={`row-${rIdx}`}>
                  <DeleteRowIcon
                    canEdit={canEdit}
                    deleteRow={deleteRow}
                    rowIdx={rIdx}
                    hasError={error}
                  />
                  {Object.keys(r).map((key, colIdx) => (
                    <Cell
                      isEditingColumn={editingColumn}
                      hasError={error}
                      isColumn={false}
                      key={colIdx}
                      value={r[key]}
                      canEdit={canEdit}
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

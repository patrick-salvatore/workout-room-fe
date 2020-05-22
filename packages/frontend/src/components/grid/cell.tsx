import React from 'react';
// import {
//   makeStyles,
//   createStyles,
//   withStyles,
//   Theme,
// } from '@material-ui/core/styles';
// import TableCell from '@material-ui/core/TableCell';

interface CellProps {
  key: any;
  row?: number;
  col?: number | string;
  canEdit: boolean;
  value: string | number;
  className: string;
  handleCellChange?: ({
    cellRow,
    cellCol,
    value,
  }: {
    cellRow: number;
    cellCol: string;
    value: string | number;
  }) => void;
}

// const StyledTableCell = withStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       padding: 0,
//       height: '100%',
//       width: '80px',
//     },
//     head: {
//       backgroundColor: '#5393ff',
//       color: theme.palette.common.white,
//       width: 'auto',
//     },
//     body: {
//       fontSize: 14,
//       cursor: 'pointer',
//       '&:hover': {
//         backgroundColor: 'rgba(196, 194, 194, 0.30)',
//       },
//     },
//   })
// )(TableCell);

// const Node = ({ value }) => {
//   return <>{value}</>;
// };

const Cell = ({
  row,
  col,
  canEdit,
  value,
  className,
  handleCellChange,
}: CellProps): JSX.Element => {
  const cellRef = React.useRef<any>();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [cellInputValue, setCellInputValue] = React.useState(value);

  function handleFirstClick(): void {
    setOpenEdit(!openEdit);
  }

  function handleChange(): void {
    const { value } = cellRef.current;

    setCellInputValue(value);
  }

  function handleBlur(): void {
    const cellRow = Number(cellRef.current.dataset.cellRow);
    const { cellCol } = cellRef.current.dataset;

    if (handleCellChange) {
      handleCellChange({ cellRow, cellCol, value: cellInputValue });
    }

    setOpenEdit(!openEdit);
  }

  return (
    <td className={className} onDoubleClick={handleFirstClick}>
      {canEdit && openEdit ? (
        <input
          style={{
            width: '100%',
            height: '50px',
            border: 'black 1px solid',
            backgroundColor: 'inherit',
            textAlign: 'center',
            fontSize: '14px',
          }}
          value={cellInputValue}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={cellRef}
          data-cell-row={row}
          data-cell-col={col}
        />
      ) : (
        value
      )}
    </td>
  );
};

export default Cell;

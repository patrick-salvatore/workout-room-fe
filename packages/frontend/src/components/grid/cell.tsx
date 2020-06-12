import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';

interface CellProps {
  key?: any;
  row?: number;
  col?: number | string;
  className?: string;
  isColumn: boolean;
  canEdit: boolean;
  value: string | number;
  hasError?: boolean;
  isEditingColumn?: boolean;
  deleteColumn?: (idx: number) => void;
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

const Cell = ({
  row,
  col,
  canEdit,
  value,
  isColumn,
  className,
  deleteColumn,
  handleCellChange,
  hasError,
  isEditingColumn,
}: CellProps): JSX.Element => {
  const cellRef = React.useRef<HTMLInputElement>(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const [shouldAutoFocus, setShouldAutoFocus] = React.useState(false);
  const [cellInputValue, setCellInputValue] = React.useState<string | number>(value);

  React.useEffect(() => {
    if (String(value).toLowerCase() === 'empty' && isColumn) {
      setShouldAutoFocus(true);
    }

    return () => {
      setShouldAutoFocus(false);
    };
  }, [value]);

  React.useEffect(() => {
    if (cellRef) {
      cellRef.current?.focus();
    }
  }, [shouldAutoFocus]);

  React.useEffect(() => {
    if (openEdit && cellRef) {
      cellRef.current?.focus();
    }
    setCellInputValue(value);
  }, [openEdit]);

  function changeMouseOver(val: boolean) {
    setIsMouseOver(val);
  }

  function handleFirstClick(): void {
    setOpenEdit(!openEdit);
    changeMouseOver(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setCellInputValue(e.target.value);
  }

  function handleBlur(): void {
    const cellRow = Number(cellRef?.current?.dataset.cellRow);
    const { cellCol } = cellRef?.current?.dataset as any;
    const { value } = cellRef?.current as any;

    if (handleCellChange) {
      handleCellChange({ cellRow, cellCol, value });
    }

    setOpenEdit(!openEdit);
  }

  function handleNewColumnBlur(): void {
    const cellRow = Number(cellRef?.current?.dataset.cellRow);
    const { cellCol } = cellRef?.current?.dataset as any;
    const { value } = cellRef?.current as any;

    if (!hasError) {
      if (handleCellChange) {
        handleCellChange({ cellRow, cellCol, value });
      }

      setOpenEdit(!openEdit);
      setShouldAutoFocus(false);
    }
  }

  if (shouldAutoFocus) {
    return (
      <td className={className}>
        <input
          style={{
            width: '99%',
            height: '44px',
            backgroundColor: 'inherit',
            textAlign: 'center',
            fontSize: '14px',
            border: hasError && isColumn ? '2px solid #dc3545' : '1px solid rgba(0, 0, 0, 0.1)',
          }}
          className={hasError && isColumn ? 'shake' : ''}
          ref={cellRef}
          data-cell-row={row}
          data-cell-col={col}
          onBlur={handleBlur}
          value={cellInputValue}
          onChange={handleChange}
        />
      </td>
    );
  }

  return (
    <td
      onMouseEnter={canEdit && !openEdit && isColumn ? () => changeMouseOver(true) : undefined}
      onMouseLeave={canEdit && !openEdit && isColumn ? () => changeMouseOver(false) : undefined}
      onDoubleClick={
        canEdit && !openEdit && !hasError && !isEditingColumn
          ? (handleFirstClick as any)
          : undefined
      }
      className={className}
    >
      {openEdit ? (
        <input
          style={{
            width: '99%',
            height: '44px',
            backgroundColor: 'inherit',
            textAlign: 'center',
            fontSize: '14px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
          ref={cellRef}
          data-cell-row={row}
          data-cell-col={col}
          onBlur={handleBlur}
          value={cellInputValue}
          onChange={handleChange}
        />
      ) : (
        <div
          className="value"
          style={{
            cursor: canEdit && !hasError && !isEditingColumn ? 'pointer' : 'initial',
          }}
        >
          {isMouseOver && !hasError && !isEditingColumn && (
            <IconButton size="small" onClick={() => deleteColumn && deleteColumn(col as any)}>
              <DeleteIcon />
            </IconButton>
          )}
          {value}
        </div>
      )}
    </td>
  );
};

export default React.memo(Cell);

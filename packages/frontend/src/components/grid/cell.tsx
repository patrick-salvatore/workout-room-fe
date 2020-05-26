import React from 'react';

interface CellProps {
  key?: any;
  row?: number;
  col?: number | string;
  className?: string;
  canEdit: boolean;
  value: string | number;
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
  className,
  handleCellChange,
}: CellProps): JSX.Element => {
  const cellRef = React.useRef<HTMLInputElement>(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [cellInputValue, setCellInputValue] = React.useState<string | number>();

  React.useEffect(() => {
    setCellInputValue(value);
  }, [value]);

  React.useEffect(() => {
    if (openEdit && cellRef) {
      cellRef.current?.focus();
    }
  }, [openEdit]);

  function handleFirstClick(): void {
    setOpenEdit(!openEdit);
  }

  function handleChange(e): void {
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

  return (
    <td className={className} onDoubleClick={!openEdit ? (handleFirstClick as any) : undefined}>
      {canEdit && openEdit ? (
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
        value
      )}
    </td>
  );
};

export default React.memo(Cell);

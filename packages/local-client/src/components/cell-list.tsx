import './cell-list.css';
import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { useActions } from '../hooks/use-actions';

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      {renderedCells}
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;

import { Fragment } from 'react';
import { useCellContext } from 'src/state/hooks/useCellContext';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  const { states } = useCellContext();
  console.log('states', states);

  const { order = [], data = {} } = states;
  const cells = order.map((id) => data[id]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;

import CellList from '../../components/code-editor/cell-list';
import CellProvider, { useCellContext } from '../../state/hooks/useCellContext';
const BlogEditor = () => {
  const a = useCellContext();
  console.log('a', a);
  return (
    <div>
      <CellProvider>
        <CellList />
      </CellProvider>
    </div>
  );
};

export default BlogEditor;

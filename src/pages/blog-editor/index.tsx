import CellList from '../../components/code-editor/cell-list';
import CellProvider from '../../state/hooks/useCellContext';
const BlogEditor = () => {
  return (
    <div>
      <CellProvider>
        <CellList />
      </CellProvider>
    </div>
  );
};

export default BlogEditor;

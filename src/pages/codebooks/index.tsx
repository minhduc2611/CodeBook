// import CellList from '../../components/code-editor/cell-list';

import { Typography, Chip } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import AddArticleButton from './../../client/page-components/codebooks/add-article-button';
import { useArticleListActions } from './../../client/state/hooks/useArticleListActions';
import { useTypedSelector } from './../../client/state/hooks/useTypedSelector';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams
} from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'link',
    headerName: 'Article',
    width: 500,
    renderCell: (params: GridRenderCellParams) => {
      console.log('params', params);
      return (
        <Typography mt={2}>
          <Link href={params.row.link}>{params.row.title}</Link>
        </Typography>
      );
    }
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 130,
    renderCell: (params: GridRenderCellParams) => {
      const category = params.row.category;
      if (!category) return;
      return <Chip style={{ marginLeft: '10px' }} label={category} />;
    }
  },
  {
    field: 'progress',
    headerName: 'Progress',
    width: 130,
    renderCell: (params: GridRenderCellParams) => {
      const progress = params.row.progress;

      if (!params.row.progress) return;
      return (
        <Chip
          color={
            progress === 'Published'
              ? 'success'
              : progress === 'Opened'
              ? 'info'
              : 'warning'
          }
          style={{ marginLeft: '10px' }}
          label={progress}
        />
      );
    }
  }
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon' },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
// ];
const CodeBook = () => {
  const { fetchArticleList } = useArticleListActions();
  const { data, loading } = useTypedSelector((state) => state.articleList);

  useEffect(() => {
    fetchArticleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return 'loading';

  const rows = data.map((a, idx) => {
    return {
      id: idx + 1,
      link: `/codebooks/${a.articleSlug}`,
      title: a.articleTitle,
      category: a.category,
      progress: a.progress
    };
    // <p key={idx}>

    // </p>
    //     {a.category && (
    //       <Chip style={{ marginLeft: '10px' }} label={a.category} />
    //     )}
  });

  return (
    <div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <AddArticleButton />
    </div>
  );
};

export default CodeBook;

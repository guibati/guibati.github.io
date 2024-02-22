import React, { useMemo } from 'react';
import {
  MaterialReactTable
} from 'material-react-table';
import {Employers} from '../mockData/mockData2'; // Assuming Employers data is in a file named Employers.js in the same directory

const List = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'photo',
        header: 'Foto',
        Cell: ({ cell }) => <img src={cell.getValue()} alt="Employee" />,
        size: 100,
        enableSorting: false,
        enableGrouping: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'id',
        header: 'Id',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Nome',
        size: 150,
      },
      {
        accessorKey: 'area',
        header: 'Departamento',
        size: 150,
      },
      {
        accessorKey: 'skill',
        header: 'Habilidade',
        size: 150,
      },
      {
        accessorKey: 'horario',
        header: 'Horário',
        size: 150,
      },
      {
        accessorKey: 'formation',
        header: 'Formações específicas',
        size: 150,
      },
      
    ],
    []
  );

  return (
    <div style={{ margin: '2%' }}>
      <h3>Employer List</h3>
      <MaterialReactTable
        enableColumnOrdering
        enableGrouping
        columns={columns}
        data={Employers}
      />
    </div>
  );
};

export default List;

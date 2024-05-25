import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import { ProductContext } from '../../../context/ProductContext';

const ProductList = () => {
  const { products } = useContext(ProductContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Product ID',
        accessor: 'product_id',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value}>
            {value}
          </div>
        ),

        width: 900,
      },
      {
        Header: 'SKU',
        accessor: 'sku',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value}>
            {value}
          </div>
        ),
      },
      {
        Header: 'Short Description',
        accessor: 'short_description',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value}>
            {value}
          </div>
        ),
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Original Price',
        accessor: 'original_price',
      },
      {
        Header: 'Discount',
        accessor: 'discount',
      },
      {
        Header: 'Discount Rate',
        accessor: 'discount_rate',
      },
      {
        Header: 'Quantity Sold',
        accessor: 'quantity_sold',
      },
      {
        Header: 'Review Count',
        accessor: 'review_count',
      },
      {
        Header: 'Inventory Status',
        accessor: 'inventory_status',
      },
      {
        Header: 'Stock Item Qty',
        accessor: 'stock_item_qty',
      },
      {
        Header: 'Stock Item Max Sale Qty',
        accessor: 'stock_item_max_sale_qty',
      },
      {
        Header: 'Brand ID',
        accessor: 'brand_id',
      },
      {
        Header: 'Brand Name',
        accessor: 'brand_name',
      },
      {
        Header: 'Images',
        accessor: 'images',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value.join(', ')}>
            {value.join(', ')}
          </div>
        ),
      },
      {
        Header: 'Comments ID',
        accessor: 'comments_id',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value.join(', ')}>
            {value.join(', ')}
          </div>
        ),
      },
      {
        Header: 'Specific Infos',
        accessor: 'specific_infos',
        Cell: ({ value }) => (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={value.join(', ')}>
            {value.join(', ')}
          </div>
        ),
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Link to={`/admin/products/editProduct?product_id=${row.original.product_id}`} className="text-blue-500 hover:underline">
            Edit
          </Link>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: products,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div className="flex justify-center items-center overflow-x-auto">
      <div className="table-container" style={{ maxWidth: "1200px" }}>
        <h2 className="text-xl font-bold mb-5">Product List</h2>
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="w-full">
            {/* Table headers */}
            <thead className="bg-gray-800 text-white">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-2 text-center"
                      style={{ minWidth: column.minWidth, width: column.width }}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* Table body */}
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-200">
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-1 py-5 text-center"
                        style={{ minWidth: cell.column.minWidth, width: cell.column.width }}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <div>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;


import React, { useState } from 'react'
import {
  DeleteOutlined,
  FormOutlined,
  CheckSquareOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';

export default function ArrayData2({ selectedRow, setCount, count, setSelectedRow, editingRows, setEditingRows, oriArray, setoriArray, data, setData, checkedState, setCheckedState }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleDelete = (index) => {
    setoriArray(oriArray.filter((item, i) => i !== index));
    setData(data.filter(item => !oriArray.includes(item)));
  };

  const handleDeleteSelected = () => {
    console.log('hi')
    setoriArray(oriArray => oriArray.filter((item, index) => !selectedRow.includes(index)));
    setData(data => data.filter((item, index) => !selectedRow.includes(index)));
    setSelectedRow([]);
    setCheckedState(!checkedState);
    setCount(0);
    // currentItems = oriArray;
  }

  console.log('arrSearched')

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : totalPages);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = oriArray.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(oriArray.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleCellBlur = (e, index, property) => {
    const newData = [...oriArray];
    newData[index][property] = e.target.textContent;
    setoriArray(newData);
    // setData(newData);
  }

  return (
    <>
      <tbody>
        {currentItems.map((item, index) => (
          <tr className={selectedRow.includes(index) ? 'faded' : ''}>
            <td className='w-[15rem]'>
              <input
                type='checkbox'
                alt='check'
                className='ml-2 mt-4'
                checked={selectedRow.includes(index)}
                onClick={(e) => {
                  if (e.target.checked) {
                    setCount(count + 1);
                    setSelectedRow(prevState => [...prevState, index]);
                  } else {
                    if (count > 0) {
                      setCount(count - 1);
                    }
                    setSelectedRow(prevState => prevState.filter(i => i !== index));
                  }
                }}
              />
            </td>
            <td
              contentEditable={editingRows[index]}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCellBlur(e, index, 'name')
                  setEditingRows(prevState => ({ ...prevState, [index]: !prevState[index] }))
                  {
                    editingRows[index] ? <CheckSquareOutlined /> : <FormOutlined />
                  }
                }
              }
              }
              onBlur={(e) => handleCellBlur(e, index, 'name')}
              className='w-[25rem]'
            >
              {item.name}
            </td>
            <td
              contentEditable={editingRows[index]}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCellBlur(e, index, 'email')
                  setEditingRows(prevState => ({ ...prevState, [index]: !prevState[index] }))
                  {
                    editingRows[index] ? <CheckSquareOutlined /> : <FormOutlined />
                  }
                }
              }
              }
              onBlur={(e) => handleCellBlur(e, index, 'email')}
              className='w-[25rem]'
            >
              {item.email}
            </td>
            <td
              contentEditable={editingRows[index]}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCellBlur(e, index, 'role')
                  setEditingRows(prevState => ({ ...prevState, [index]: !prevState[index] }))
                  {
                    editingRows[index] ? <CheckSquareOutlined /> : <FormOutlined />
                  }
                }
              }
              }
              onBlur={(e) => handleCellBlur(e, index, 'role')}
              className='w-[200px]'
            >
              {item.role}
            </td>
            <td className='space-x-4'>
              <button
                onClick={() => setEditingRows(prevState => ({ ...prevState, [index]: !prevState[index] }))}>
                {
                  editingRows[index] ?
                    <div className='hover:bg-purple-400 hover:text-white transition-all h-10 w-10 border border-[#abaaaa] p-1 rounded-md'>
                      <CheckSquareOutlined style={{ padding: '2px' }} />
                    </div> :
                    <div className='hover:bg-purple-400 hover:text-white transition-all h-10 w-10 border border-[#abaaaa] p-1 rounded-md ml-[4rem]'>
                      <FormOutlined />
                    </div>
                }
              </button>
              <button>
                <div
                  className='hover:bg-red-500 hover:text-white text-red-500 transition-all h-10 w-10 border border-[#abaaaa] p-1 rounded-md '
                  onClick={() => handleDelete(index)}
                >
                  <DeleteOutlined className='font-extrabold' />
                </div>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <div className='absolute ml-4 flex mt-4'>
        <div className='flex'>

          <p className='text-gray-400 font-medium font-rubik'>{count} row(s) out of {oriArray.length} selected.</p>
          <button className='p-2 mb-4 ml-4 bg-red-500 text-white font-mono font-normal rounded-lg'
            onClick={() => handleDeleteSelected()}
          >
            Delete Selected
          </button>
        </div>
        <div className='ml-[44rem]'>
          {/* border ml-4 mr-4 */}
          <DoubleLeftOutlined onClick={() => handleFirstPage()} className='first-page' />
          {/* border mr-4 */}
          <LeftOutlined onClick={() => handlePreviousPage()} className='previous-page' />
          {pageNumbers.map((index) => {
            return (
              <button
                key={index}
                id={index}
                onClick={handleClick}
                className='border mr-4 p-2 h-10 w-10'
              >
                {index}
              </button>
            );
          })}
          <RightOutlined onClick={() => handleNextPage()} className='next-page' />
          <DoubleRightOutlined onClick={() => handleLastPage()} className='last-page' />
        </div>
      </div>
    </>
  )
}
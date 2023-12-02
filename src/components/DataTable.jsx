import React, { useState, useEffect } from 'react'
import {
    DeleteOutlined,
    FormOutlined,
    CheckSquareOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';

export default function DataTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [editingRows, setEditingRows] = useState({});
    const [selectedRow, setSelectedRow] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchEmployis();
    }, [])

    const fetchEmployis = async () => {
        const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
        const options = {
            method: 'GET',
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const data = result;
            setData(data);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handleDelete = (index) => {
        setData(data.filter((item, i) => i !== index));
    };

    const handleDeleteSelected = () => {
        console.log('hi')
        setData(data => data.filter((item, index) => !selectedRow.includes(index)));
        setSelectedRow([]);
        // currentItems = data;
    }

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
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    const handleSearch = () => {
        const filteredData = data.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setData(filteredData);
    };

    // {
    //     selectedRow.map((index) => {
    //         console.log(index);
    //     })
    // }

    return (
        <>
            <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                placeholder='Search'
                className='border border-[#abaaaa] text-black/70 ml-6 mt-4 w-[24rem] h-[2.5rem] rounded-md'
            />
            <div className='ml-6 mr-6 rounded-lg mt-4 border border-[#abaaaa] text-black/70 font-bold'>
                <table className='table'>
                    <thead>
                        <tr className='hover:bg-slate-100 transition-all'>
                            <input type='checkbox' alt='check' className='ml-4 mt-4'
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedRow(data.map((_, index) => index));
                                    } else {
                                        setSelectedRow([]);
                                    }
                                }}
                            />
                            <th scope='col' >Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr className='hover:bg-slate-100 transition-all'>
                                <input type='checkbox' alt='check' className='ml-2 mt-4'
                                    checked={selectedRow.includes(index)}
                                    onClick={(e) => {
                                        if (e.target.checked) {
                                            setSelectedRow(prevState => [...prevState, index]);
                                        } else {
                                            setSelectedRow(prevState => prevState.filter(i => i !== index));
                                        }
                                    }}
                                />
                                <td contentEditable={editingRows[index]}>{item.name} </td>
                                <td contentEditable={editingRows[index]}>{item.email} </td>
                                <td contentEditable={editingRows[index]}>{item.role} </td>
                                <td className='flex space-x-4'>
                                    <button onClick={() => setEditingRows(prevState => ({ ...prevState, [index]: !prevState[index] }))}>
                                        {
                                            editingRows[index] ?
                                                <div className='hover:bg-purple-400 hover:text-white transition-all h-10 w-10 border border-[#abaaaa] p-1 rounded-md'>
                                                    <CheckSquareOutlined style={{ padding: '2px' }} />
                                                </div> :
                                                <div className='hover:bg-purple-400 hover:text-white transition-all h-10 w-10 border border-[#abaaaa] p-1 rounded-md'>
                                                    <FormOutlined />
                                                </div>
                                        }
                                    </button>
                                    <button>
                                        <div className='hover:bg-green-400 hover:text-white transition-all h-10 w-10 border border-[#abaaaa] p-1 rounded-md ' onClick={() => handleDelete(index)}>
                                            <DeleteOutlined style={{ color: 'red' }} />
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex mt-4 justify-between'>
                    <button className='p-2 mb-4 bg-red-500 text-white font-mono font-normal rounded-lg'
                        onClick={() => handleDeleteSelected()}
                    >
                        Delete Selected
                    </button>
                    <div>
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
            </div>
        </>
    );
}
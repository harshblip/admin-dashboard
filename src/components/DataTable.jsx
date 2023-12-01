import React, { useState, useEffect } from 'react'
import { DeleteOutlined, FormOutlined, CheckSquareOutlined } from '@ant-design/icons';

export default function DataTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [editingRows, setEditingRows] = useState({});
    const [selectedRow, setSelectedRow] = useState([]);
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
            console.log(data);
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
        setData(data.filter((item, index) => !selectedRow.includes(index)));
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className='ml-6 mr-6 rounded-lg mt-10 border border-[#abaaaa] text-black/70 font-bold'>
            <table className='table'>
                <thead>
                    <tr>
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
                        <tr>
                            <input type='checkbox' alt='check' className='ml-2 mt-4' />
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
                                    <div className='hover:bg-green-400 hover:text-white transition-all h-10 w-10 border border-[#abaaaa] p-1 rounded-md' onClick={() => handleDelete(index)}>
                                        <DeleteOutlined style={{ color: 'red' }} />
                                    </div>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='mt-4 justify-around'>
                <button className='border border-[#abaaaa] p-2 bg-red-500 text-white font-mono  rounded-lg'
                    onClick={() => handleDeleteSelected}
                >
                    Delete Selected
                </button>
                {pageNumbers.map((index) => {
                    return (
                        <button
                            key={index}
                            id={index}
                            onClick={handleClick}
                            className='border mr-4'
                        >
                            {index}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
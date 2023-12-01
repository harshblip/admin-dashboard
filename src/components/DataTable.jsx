import React, { useState, useEffect } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function DataTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className='ml-6 mr-6 rounded-lg mt-10 h-screen  border border-[#abaaaa] text-black/70 font-bold'>
            <table className='table'>
                <thead>
                    <tr>
                        <input type='checkbox' alt='check' className='ml-4 mt-4'/>
                        <th scope='col' >Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(item => (
                        <tr>
                            <input type='checkbox' alt='check' className='ml-2 mt-4' />
                            <td>{item.name} </td>
                            <td>{item.email} </td>
                            <td>{item.role} </td>
                            <td className='flex space-x-4'>
                                <button>
                                    <EditOutlined />
                                </button>
                                <button>
                                    <DeleteOutlined />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {pageNumbers.map((index) => {
                    return (
                        <button key={index} id={index} onClick={handleClick} className='border mr-4'>
                            {index}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
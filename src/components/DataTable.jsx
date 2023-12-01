import React, { useState, useEffect } from 'react'

export default function DataTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    useEffect(() => {
        fetchEmployis();
    }, [])

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

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
    return (
        <div className='ml-24 mr-4'>
            <table className='table'>
                <thead>
                    <tr>
                        <input type='checkbox' alt='check' />
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr>
                            <input type='checkbox' alt='check' />
                            <td>{item.name} </td>
                            <td>{item.email} </td>
                            <td>{item.role} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
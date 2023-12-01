import React, { useState } from 'react'

export default function DataTable() {
    const [data, setData] = useState([]);
    const fetchemployis = async () => {
        const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
        const options = {
            method: 'GET',
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const data = result;
            setData(data);
            console.log(data)
        } catch(error){
            console.error(error);
        }
    };
    return (
        <table className="table" fetchemployis>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>City</th>

                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr>
                        <td>{item.id} </td>
                        <td>{item.name} </td>
                        <td>{item.email} </td>
                        <td>{item.role} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
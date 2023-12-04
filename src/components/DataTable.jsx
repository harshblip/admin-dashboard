import React, { useState, useEffect } from 'react'
import ArrayNormal from './ArrayOriginal';
import ArraySearched from './ArraySearched';
import { DeleteOutlined } from '@ant-design/icons';

export default function DataTable() {
    const [data, setData] = useState([]);
    const [oriArray, setoriArray] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [editingRows, setEditingRows] = useState({});
    const [selectedRow, setSelectedRow] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [count, setCount] = useState(0);
    const [view, setView] = useState('viu');
    const [checkedState, setCheckedState] = useState(false);

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
            setoriArray(data);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    // setoriArray(data);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = oriArray.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearch = () => {
        console.log('done')
        setView('viu');
        const filteredData = oriArray.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setoriArray(filteredData);
    };

    oriArray.map((index) => {
        console.log(index);
    })

    const handleGoBack = () => {
        setoriArray([]);
        setSearchQuery('');
        setView('normal');
    }
         
    // {
    //     selectedRow.map((index) => {
    //         console.log(index);
    //     })
    // }

    return (
        <>
            <div className='flex justify-between'>
                <input
                    type='text'
                    value={searchQuery}
                    checked={checkedState}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    placeholder='Search'
                    className='border border-[#abaaaa] text-black/70 ml-6 mt-4 w-[24rem] h-[2.5rem] rounded-md'
                />
                <button onClick={handleGoBack} className='first-page'> Go Back </button>
                <div className='mr-10 mt-6 border border-[#abaaaa] h-10 w-10 rounded-lg bg-red-400 text-white'>
                    <DeleteOutlined className='ml-[0.6rem] mt-1 text-xl' />
                </div>
            </div>
            <div className='ml-6 mr-6 rounded-lg mt-4 border border-[#abaaaa] text-black/70 font-bold'>
                <table className='table'>
                    <thead className='font-rubik text-xl underline border border-black'>
                        <tr className='hover:bg-slate-100 transition-all border border-black'>
                            <input
                                type='checkbox'
                                alt='check'
                                className='ml-4 mt-4'
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCount(count + 10);
                                        setSelectedRow(currentItems.slice(0, 10).map((_, index) => index));
                                    } else {
                                        setCount(0)
                                        setSelectedRow([]);
                                    }
                                }}
                            />
                            <th scope='col' className='border border-black'>Name</th>
                            <th scope='col' className='border border-black'>Email</th>
                            <th scope='col' className='border border-black'>Role</th>
                            <th scope='col' className='border border-black'>Actions</th>
                        </tr>
                    </thead>

                    {view === 'normal' ? (
                        < ArrayNormal
                            selectedRow={selectedRow}
                            setCount={setCount}
                            count={count}
                            setSelectedRow={setSelectedRow}
                            editingRows={editingRows}
                            setEditingRows={setEditingRows}
                            oriArray={oriArray}
                            setoriArray={setoriArray}
                            data={data}
                            setData={setData}
                        />
                        // console.log('here')
                    ) : (
                        <ArraySearched
                            selectedRow={selectedRow}
                            setCount={setCount}
                            count={count}
                            setSelectedRow={setSelectedRow}
                            editingRows={editingRows}
                            setEditingRows={setEditingRows}
                            oriArray={oriArray}
                            setoriArray={setoriArray}
                            data={data}
                            setData={setData}
                        />
                        // console.log('here2')
                    )}
                </table>
            </div>
        </>
    );
}
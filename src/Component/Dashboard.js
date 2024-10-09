import React, { useEffect, useState } from 'react';
import Statistics from './Statistics';
const Dashboard = () => {
    const [product, setproduct] = useState([])
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [month, setMonth] = useState('04');
    const getproduct = async (search, page = 2) => {
        const response = await fetch("http://localhost:5000/api/products/getproduct", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: search, page: page })
        })
        const json = await response.json()
        return json.products
    }
    useEffect(() => {
        getproduct(search, page).then(setproduct)
    }, [search, page])
    return (
        <>
            <h1 className="text-4xl text-center p-7 font-bold">Transaction Dashboard</h1>
            <div className='grid grid-rows text-black justify-items-center gap-5'>
                <div className='z-10 grid rows-span-1 grid-cols-2 gap-20'>
                    <input className='cols-span-1 bg-yellow-400 rounded-lg text-black font-bold text-center h-12 w-56' type="text" name="" id="" value={search}
                        onChange={e => setSearch(e.target.value)} placeholder='Search Transaction' />
                    <select className='cols-span-1 bg-yellow-400 rounded-lg text-black font-bold text-center h-12 w-56 ' name="" id="" onChange={e => setMonth(e.target.value)}>Month
                        <option name="" value="" style={{ "display": "none" }}>MM</option>
                        <option name="January" value="01">January</option>
                        <option name="February" value="02">February</option>
                        <option name="March" value="03">March</option>
                        <option name="April" value="04">April</option>
                        <option name="May" value="05">May</option>
                        <option name="June" value="06">June</option>
                        <option name="July" value="07">July</option>
                        <option name="August" value="08">August</option>
                        <option name="September" value="09">September</option>
                        <option name="October" value="10">October</option>
                        <option name="November" value="11">November</option>
                        <option name="December" value="12">December</option>
                    </select>
                </div>
                <div className='grid rows-span-1 bg-yellow-400 rounded-lg m-4 p-2'>
                    <table className='border-collapse border border-slate-500'>
                        <thead className=''>
                            <tr>
                                <th className='border border-slate-600'>ID</th>
                                <th className='border border-slate-600'>Title</th>
                                <th className='border border-slate-600'>Description</th>
                                <th className='border border-slate-600'>Price</th>
                                <th className='border border-slate-600'>Category</th>
                                <th className='border border-slate-600'>Sold</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                            {
                                product && product.map((pro, i) => {
                                    return <tr key={i}>
                                        <th className='border border-slate-600'>{pro.id}</th>
                                        <th className='border border-slate-600'>{pro.title}</th>
                                        <th className='border border-slate-600'>{pro.description.substring(0, 72)}....</th>
                                        <th className='border border-slate-600'>{pro.price}</th>
                                        <th className='border border-slate-600'>{pro.category}</th>
                                        <th className='border border-slate-600'>{pro.sold ? "Yes" : "No"}</th>
                                        {/* <th>{pro.image}</th> */}
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='grid rows-span-1 grid-cols-2 gap-10'>
                    <button className='cols-span-1 bg-yellow-400 rounded-lg text-black font-bold text-center h-10 w-34' disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                    <button className='cols-span-1 bg-yellow-400 rounded-lg text-black font-bold text-center h-10 w-38' onClick={() => setPage(page + 1)}>Next</button>
                </div>
            </div>
            <Statistics month={month}/>
        </>
    )
}

export default Dashboard
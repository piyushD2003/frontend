import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Statistics = ({ month }) => {
    const [List, setList] = useState(["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"])
    const [data, setdata] = useState(null)
    const [COLORS, setCOLORS] = useState(['#0088FE', '#00C49F', '#FFBB28', '#FF8042'])
    useEffect(() => {
        getdata(month).then(setdata)
    }, [month])

    const getdata = async () => {
        const response = await fetch("http://localhost:5000/api/products/combined-data", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ month: month })
        })
        const json = await response.json()
        console.log(json);
        return json
    }
    return (
        <>
            {data && <><h1 className="text-4xl text-center p-7 font-bold">Details - {List[parseInt(month) - 1]}</h1>
                <div>
                    <h1 className="text-2xl px-7 p-2 font-bold">Statistics - {List[parseInt(month) - 1]}</h1>
                    <div className='bg-yellow-400 rounded-lg text-black ms-10 p-2 w-52'>
                        <p className="text-xl font-bold">Total Sales: {data.statistics.totalSales}</p>
                        <p className="text-xl font-bold">Sold Items: {data.statistics.soldItems}</p>
                        <p className="text-xl font-bold">Not Sold Items: {data.statistics.notSoldItems}</p>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl p-7 font-bold"> Bar Chart- {List[parseInt(month) - 1]}</h1>
                    <div>
                        <ResponsiveContainer width={400} height={400}>
                            <BarChart data={data.barChart}>
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="soldCount" fill="#82ca9d" />
                                <Bar dataKey="notSoldCount" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl px-7 pt-9 font-bold">Pie Chart - {List[parseInt(month) - 1]}</h1>
                    <ResponsiveContainer width={400} height={400}>
                        <PieChart>
                            <Pie
                                data={data.pieChart}
                                dataKey="items"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                            >
                                {data.pieChart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div></>}

        </>
    )
}

export default Statistics
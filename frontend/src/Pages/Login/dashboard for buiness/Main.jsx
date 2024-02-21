import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Mainuser() {

const data = [
  {
    category: 'Lotion',
    Sales: 25,
    Popularity: 30,
    total: 35,
  },
  {
    id: 2,
    category: 'Perfume.',
    Sales: 15,
 Popularity: 10,
    total:20
  },
  {
    id: 3,
    category: 'Tea',
    Sales: 20,
    Popularity: 18,
    total: 28
  },
  {
    id: 4,
    category: 'Phone case',
   Sales: 18,
   Popularity: 12,
    total: 30
  },
  // Add more categories as needed
];
const trendData = [
  {
    month: 'Jan',
    category: 'Sungalsses',
    Sales: 25,
    Popularity: 20,
    total: 35,
  },
  {
    month: 'Feb',
    category: 'Product Defects',
    Sales: 28,
    Popularity: 8,
    total: 36,
  },
  {
    month: 'Mar',
    category: 'Product Defects',
    Sales: 30,
   Popularity: 5,
    total: 35,
  },
  {
    month: 'Jan',
   Category: 'Service Dec.',
   Sales: 15,
    Popularity: 5,
    total: 20,
  },
  {
    month: 'Feb',
   Category: 'Service Dec.',
    Sales: 18,
    Popularity: 7,
    total: 25,
  },
  {
    month: 'Mar',
    Category: 'Service Dec.',
    Sales: 20,
    pending: 4,
    total: 24,
  },
  {
    month: 'Jan',
    category: 'Sunglasses',
    Sales: 20,
    Popularity: 18,
    total: 28,
  },
  {
    month: 'Feb',
    category: 'Delivery Issues',
    Sales: 22,
    Popularity: 6,
    total: 28,
  },
  {
    month: 'Mar',
    category: 'Delivery Issues',
    Sales: 25,
    Popularity: 3,
    total: 28,
  },
  {
    month: 'Jan',
    category: 'Customer Service',
    Sales: 18,
    Popularity: 12,
    total: 30,
  },
  {
    month: 'Feb',
    category: 'Customer Service',
    Sales: 20,
    Popularity: 18,
    total: 28,
  },
  {
    month: 'Mar',
    category: 'Customer Service',
    Sales: 22,
    Popularity: 10,
    total: 28,
  },
  // Add more months and categories as needed
];

     

  return (
    <main className='main-container'>
        <div className='main-title'>
           
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Product Line</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1 className='hello'>Lotion</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Unit Price</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1 className='hello'>60.07</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Ratings</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1 className='hello'>8</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Gross Income</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1 className='hello'>123.948</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Sales" fill="#8884d8" />
                <Bar dataKey="Popularity" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={trendData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Popularity" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Mainuser;
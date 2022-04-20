import React, { useState, useEffect }  from "react";
import { AgGridReact } from "ag-grid-react";
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcar from "./Addcar";
import Editcar from "./Editcar";

export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        }
    }

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const columns = [
        {
        headerName: 'Brand',
        field: 'brand',
        filter: true,
        sortable: true,
        floatingFilter : true
        },
        {
        headerName: 'Model',
        field: 'model',
        filter: true,
        sortable: true,
        floatingFilter : true
        },
        {
        headerName: 'Color',
        field: 'color',
        filter: true,
        sortable: true,
        floatingFilter : true
        },
        {
         headerName: 'Fuel',
         field: 'fuel',
         filter: true,
        sortable: true,
        floatingFilter : true
         },
         {
         headerName: 'Year',
         field: 'year',
         filter: true,
        sortable: true,
        floatingFilter : true
         },
         {
         headerName: 'Price',
         field: 'price',
         filter: true,
        sortable: true,
        floatingFilter : true
         },
         {
         headerName: 'Edit',
         width: 100,
         sortable: false,
         cellRenderer: row => <Editcar car={row.original} />
         },
         {
        width: 100,
        headerName: 'Delete',
        field: '_links.self.href',
         cellRenderer:({value})=><div>
         <Button variant="contained" size="small" color="error" onClick={()=>deleteCar(value)}>Delete</Button>
       </div>
         }
    ]

    return (
        <div className="ag-theme-material.css"
        style={{height: '700px', width: '80%', margin: 'auto'}} >
            <Addcar saveCar={saveCar} />
            <AgGridReact  rowData={cars} columnDefs={columns}>
                </AgGridReact>

        </div>
    )
}
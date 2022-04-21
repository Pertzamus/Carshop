import React, { useState, useEffect }  from "react";
import { AgGridReact } from "ag-grid-react";
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Addcar from "./Addcar";
import Editcar from "./Editcar";

export default function Carlist () {

    const [cars, setCars] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');


    useEffect(() => fetchData(), []);

        const fetchData = () => {
      fetch("https://carrestapi.herokuapp.com/cars")
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
      fetch(link , { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          fetchData();
          setOpen(true);
        } else {
          alert('Something went wrong')
        }
      })

    }


    const addCar = (car) => {
      fetch(process.env.REACT_APP_API_URL,{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(car)
      })
      .then(response => {
        if (response.ok) {
          fetchData();
        }
        else {
          alert('Adding car failed');
        }
      })
      .catch(err => console.error(err))
    }
  
    const updateCar = (updatedCar, link) => {
      fetch(link, {
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(updatedCar)
      })
      .then(response => {
        if (response.ok) {
          setMsg('Car edited succesfully');
          setOpen(true);
          fetchData();
        }
        else {
          alert('Something went wrong!');
        }
      })
      .catch(err => console.error(err))
    }

    const columns = [
        { field: 'brand', sortable: true, filter: true},
        { field: 'model', sortable: true, filter: true},
        { field: 'color', sortable: true, filter: true},
        { field: 'fuel', sortable: true, filter: true, width: 120},
        { field: 'year', sortable: true, filter: true, width: 120},
        { field: 'price', sortable: true, filter: true, width: 120},
        {
          
          headerName: '',
          width: 100,
          field: '_links.self.href',
          cellRenderer: params =>
         <Editcar updateCar={updateCar} params={params} />
          
        },
        { 
          headerName: '',
          width: 100,
          field: '_links.self.href',
          cellRenderer: params => 
          <Button variant="contained" size="small" color="error" onClick={() => deleteCar(params.value)}>Delete</Button>
          
        }
        
    ]
 

    return (
        <>
         <div className="ag-theme-material.css" style={{height: 600, width: '100%'}}>
         <Addcar addCar={addCar} />
            <AgGridReact rowData={cars} columnDefs={columns}>
            </AgGridReact>

        
        </div>
        <Snackbar
          open={open}
          message={msg}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        />


        </>
    );
}
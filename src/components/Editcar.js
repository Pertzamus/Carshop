import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Editcar({ updateCar, params }) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: '', model: '', color: '', fuel: '', price: '', year: ''
  })

  const handleClickOpen = () => {
    setOpen(true);
    setCar({  
      brand: params.data.brand,
      model: params.data.model,
      color: params.data.color,
      fuel: params.data.fuel,
      price: params.data.price,
      year: params.data.year
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SaveCar = () => {
    updateCar(car, params.value);
  }

  const inputChanged = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
          Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            name="brand"
            value={car.brand}
            onChange={inputChanged}
            margin="dense"
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            name="model"
            value={car.model}
            onChange={inputChanged}
            margin="dense"
            label="Model"
            fullWidth
            variant="standard"
          />
          <TextField
            name="color"
            value={car.color}
            onChange={inputChanged}
            margin="dense"
            label="Color"
            fullWidth
            variant="standard"
          />
          <TextField
            name="fuel"
            value={car.fuel}
            onChange={inputChanged}
            margin="dense"
            label="Fuel"
            fullWidth
            variant="standard"
          />
          <TextField
            name="year"
            value={car.year}
            onChange={inputChanged}
            margin="dense"
            label="Year"
            fullWidth
            variant="standard"
          />
          <TextField
            name="price"
            value={car.price}
            onChange={inputChanged}
            margin="dense"
            label="Price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={SaveCar}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

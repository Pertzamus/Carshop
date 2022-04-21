import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Addcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', year: '', fuel: '', price: ''
    })

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputchange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const addCar = () => {
      props.saveCar(car);
      handleClose();
  }

    return(
        <div>
        <Button style={{margin: 10}} variant="outlined" onClick={handleClickOpen}>
             Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    value={car.brand}
                    onChange={e => handleInputchange(e)}
                    label="Brand"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="model"
                    value={car.model}
                    onChange={e => handleInputchange(e)}
                    label="Model"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="color"
                    value={car.color}
                    onChange={e => handleInputchange(e)}
                    label="Color"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="fuel"
                    value={car.fuel}
                    onChange={e => handleInputchange(e)}
                    label="Fuel"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="year"
                    value={car.year}
                    onChange={e => handleInputchange(e)}
                    label="Year"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="price"
                    value={car.price}
                    onChange={e => handleInputchange(e)}
                    label="Price"
                    fullWidth
                    variant="standard"
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCar}>Save</Button>
        </DialogActions>
      </Dialog>
  </div>
    );
}
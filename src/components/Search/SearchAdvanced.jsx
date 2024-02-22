/* eslint-disable react/prop-types */
import {Fragment,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Unstable_Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Cars} from '../../mockData/mockData';
import { NavLink } from 'react-router-dom';
import AlertDialog from './DialogAdvancedSearch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
export default function SearchAdvanced({open,handleClose}) {

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [seats, setSeats] = useState(-1);

  const handleChangeSeats = (event) => {
    setSeats(event.target.value);
  };
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState([500, 35000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getSeats(seats,car){
    if(seats!=-1){
      return parseInt(car.dimensions.Seats.description.split(" ")[0]) == seats
    }
    else {
      return true;
    }
  }
  
  function getTraccion(traccion,car){
    if(traccion != "ALL"){
      return  car.motorInfo.traccion.description == traccion
    }
    else {
      return true;
    }
  }

  function getTargetBrands(targetBrands,car,num){
    if(num==0){
      return true;
    }
    return targetBrands.some(brand => brand.title === car.brand);

  }

  function getTargetMotor(targetMotor,car){
      if(targetMotor=="All"){
        return true;
        
      }
      return car.motorInfo.motor.description === targetMotor;
  }

  const filterCars = (cars, minPrice ,maxPrice, targetMotor, targetBrands,num,seats,traccion) => {

      return cars.filter(car => 
        minPrice <= car.price &&
        car.price <= maxPrice &&
        getTraccion(traccion,car) &&
        getSeats(seats,car) &&
        getTargetBrands(targetBrands,car,num) &&
        getTargetMotor(targetMotor,car)
        
      );

  };
  

  function SearchCars(){
    console.log(value[0]);
    console.log(value[1]);
    console.log(selectedBrands);
    const num = selectedBrands.length;
    console.log(engineType);
    
    const filteredCars = filterCars(Cars,value[0], value[1], engineType, selectedBrands,num,seats,traccion);

    localStorage.setItem("AdvancedSearch",JSON.stringify(filteredCars));

    //setOpenDialog(true);
  }

  const brandsList = [
  {title:"Tesla"},
  {title:"Volvo"},
  {title:"BMW"},
  {title:"Mercedes"},
  {title:"Toyota"},
  {title:"Volkswagen"},
  {title:"Dacia"},
  {title:"Audi"},
  {title:"BYD"},
];

  const [selectedBrands, setSelectedBrands] = useState([brandsList[0], brandsList[4]]);

  const handleBrandChange = (event, newValue) => {
    setSelectedBrands(newValue);
  };

  const [engineType, setEngineType] = useState('All');

  const handleEngineTypeChange = (event) => {
    setEngineType(event.target.value);
  };

  const [traccion, setTraccion] = useState("ALL");

  const handleChangeTraccion = (event) => {
    setTraccion(event.target.value);
  };

  


  return (
    <>
    <Fragment>
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <b>Advanced Search</b>
        </DialogTitle>
        <DialogContent sx={{minHeight:"300px"}}>
            <Box sx={{marginTop:5, marginBottom: 5}}>

            <Grid container spacing={2}>
              <Grid xs={3} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                min: {value[0]} €
              </Grid>
                <Grid xs={6}>
                      <Slider
                      getAriaLabel={() => 'Price range'}
                      value={value}
                      onChange={handleChange}
                      min={500}
                      step={500}
                      max={150000}
                      valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid xs={3} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  max: {value[1]} €
                </Grid>

                </Grid>
            </Box>
            <FormControl sx={{marginBottom:5}}>

              <FormLabel id="demo-row-radio-buttons-group-label">Engine type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={engineType}
                onChange={handleEngineTypeChange}
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />      
                <FormControlLabel value="Gasoline" control={<Radio />} label="Gasoline" />
                <FormControlLabel value="Diesel" control={<Radio />} label="Diesel" />
                <FormControlLabel value="Electric" control={<Radio />} label="Electric" />
                <FormControlLabel value="Plug-in" control={<Radio />} label="Plug-in" />
                <FormControlLabel value="Hybrid" control={<Radio />} label="Hybrid" />
                <FormControlLabel value="LPG" control={<Radio />} label="LPG" />   
                          
              </RadioGroup>

            </FormControl>

            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={brandsList}
              getOptionLabel={(option) => option.title}
              value={selectedBrands}
              onChange={handleBrandChange}
              renderInput={(params) => (
                <TextField {...params} label="Brands *" placeholder="Favorites" />
              )}
              sx={{ width: '500px' }}
            />
            <p> * Remove the selected brands to search without brand restriction</p>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between',marginTop:"15px",width: '500px' }}>
              <FormControl sx={{width:"220px"}}>
                <InputLabel id="demo-simple-select-label">Seats</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={seats}
                  label="Seats"
                  onChange={handleChangeSeats}
                >
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={-1}>ALL</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{width:"220px"}} >
                <InputLabel id="demo-simple-select-label">Traccion</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={traccion}
                  label="Traccion"
                  onChange={handleChangeTraccion}
                >
                  <MenuItem value={"AWD"}>AWD</MenuItem>
                  <MenuItem value={"FWD"}>FWD</MenuItem>
                  <MenuItem value={"RWD"}>RWD</MenuItem>
                  <MenuItem value={"ALL"}>ALL</MenuItem>
                </Select>
              </FormControl>
            </Box>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
         
         <NavLink  onClick={() => SearchCars()} to="/list/advanced">
         <Button autoFocus>
            
            Search
            
          </Button>
         </NavLink>
          
         
         
        </DialogActions>
      </Dialog>
    </Fragment>
    <AlertDialog open={openDialog} handleClose={handleCloseDialog}/>
  </>
  );
}
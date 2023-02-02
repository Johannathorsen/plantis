import './Plant.css';

import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Plant as PlantType } from './PlantGallery';


export default function Plant() {
  const { id } = useParams();
  const [plant, setPlant ] = useState<PlantType>({});
  // const [treatments, setTreatments ] = useState([{events: {water: false, nutrition: false}, text: ''}]);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/Johannathorsen/plantis/main/data/${id}/plant.json?ref=main`).then((res)=>res.json()).then((data: PlantType)=> {
      setPlant(data);
    });
    }, [id] )

  return (
    <div className="Plant">
      <h1> {plant.name} </h1>
      <h2 className="species"> {plant.species} </h2>
      <p className="acquired"> 📅 {plant.acquired} från {plant.from}</p>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          <h3 className="date">10 augusti 2022</h3>
          <Paper className="item">
          <img
              src={`?w=248&fit=crop&auto=format`}
              srcSet={`?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={plant.name}
              loading="lazy"
            />
          </Paper>
          <Paper className="item">Item 2</Paper>
          <Paper className="item">Item 3</Paper>
        </Stack>
      </Box>
    </div>
  );
}

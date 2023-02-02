import './Plant.css';

import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Plant as PlantType } from './PlantGallery';

type Image = {
  name: string,
  download_url: string,
}

type Treatment = {
  events?: {
    water?: boolean,
    nutrition?: boolean,
  },
  text?: string
};

type Treatments = Record<string, Treatment>;

export default function Plant() {
  const { id } = useParams();
  const [plant, setPlant ] = useState<PlantType>({});
  const [treatments, setTreatments ] = useState<Treatments>({});
  const [images, setImages] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/Johannathorsen/plantis/main/data/${id}/plant.json?ref=main`).then((res)=>res.json()).then((data: PlantType)=> {
      setPlant(data);
    });
    }, [id] )

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/Johannathorsen/plantis/main/data/${id}/treatments.json?ref=main`).then((res)=>res.json()).then((data: Treatments)=> {
      setTreatments(data);
    });
    }, [id] )

  useEffect(() => {
    fetch(`https://api.github.com/repos/johannathorsen/plantis/contents/data/${id}/images?ref=main`).then((res)=>res.json()).then((data)=> {
      const images = {} as Record<string, string>;
      data.forEach((image: Image) => {
        images[image.name] = image.download_url
      })
      setImages(images);
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
          <Paper className="item">{JSON.stringify(treatments)}</Paper>
          {
            Object.entries(images).map(([id, url]) => {
              return (
              <Paper className="item">
              <img
                  src={`${url}?w=248&fit=crop&auto=format`}
                  srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={id}
                  loading="lazy"
                />
              </Paper>
              )
            })
          }
        </Stack>
      </Box>
    </div>
  );
}

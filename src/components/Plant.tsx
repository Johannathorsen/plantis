import './Plant.css';

import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Plant as PlantType } from './PlantGallery';

type Image = {
  caption: string,
  media_url: string,
  timestamp: string,
}

export default function Plant() {
  const { id } = useParams();
  const [plant, setPlant ] = useState<PlantType>({});
  const [images, setImages] = useState<Record<string, string>>({})
  const [sortedList, setSortedList] = useState();

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/Johannathorsen/plantis/main/data/${id}/plant.json?ref=main`).then((res)=>res.json()).then((data: PlantType)=> {
      setPlant(data);
    });
    }, [id] )

  useEffect(() => {
    fetch(`https://graph.instagram.com/me/media?fields=media_url,timestamp,caption`).then((res)=>res.json()).then((data)=> {
      const images = {} as Record<string, string>;
      data.data.forEach((image: Image) => {
        console.log(image);
        if (image.caption.startsWith(id!)) {
          console.log('match');
          images[image.timestamp] = image.media_url;
        }
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
          <Paper className="item">hello</Paper>
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
/*
{
  "2011-04-11T10:20:31Z": {
      "events": {
          "water": true,
          "nutrition": false
      },
      "text": "Flyttade till vardagsrummet"
  }
}
*/
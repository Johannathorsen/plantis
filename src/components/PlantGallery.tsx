import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

export type Plant = {
  id?: string;
  name?: string;
  species?: string;
  from?: string;
  acquired?: string;
  image?: string;
};

type Plants = Record<string, Plant>;

export default function PlantGallery() {
  const navigate = useNavigate();
  const [ids, setIds] = useState<string[]>([]);
  const [plants, setPlants] = useState<Plants>({});
  

  useEffect(() => {
    fetch('https://api.github.com/repos/johannathorsen/plantis/contents/data?ref=main').then((res)=>res.json()).then((data)=> {
       const plantIds: string[] = [];
      data.forEach((plant: any) => {
        plantIds.push(plant.name);
      })
      setIds(plantIds)
     })
    }, [])

  useEffect(() => {
    ids.forEach((id) => {
      fetch(`https://raw.githubusercontent.com/Johannathorsen/plantis/main/data/${id}/plant.json?ref=main`).then((res)=>res.json()).then((data: Plant)=> {
        setIds(ids.filter(i => i !== id))
        setPlants({ ...plants, [id]: {...data, image: `https://raw.githubusercontent.com/Johannathorsen/plantis/main/data/${id}/plant.png`, id}})
        })
    })
    }, [ids, plants])
  
  const boxSX = {
    "&:hover": {
      cursor: 'pointer',
      opacity: '50%'
    },
  };

  return (
    <ImageList sx={{ padding: '0 10px', textAlign: 'center' }}>
      <ImageListItem key="Subheader" cols={4}>
        <ListSubheader component="div">Växter</ListSubheader>
      </ImageListItem>
      { Object.entries(plants).map(([id, plant]) => (
        <ImageListItem
          key={id}
          sx={boxSX}
          onClick={() => 
            navigate(`/${id}`)
          }
        >
          <img
            src={`${plant.image}?w=248&fit=crop&auto=format`}
            srcSet={`${plant.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={plant.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={plant.name}
            subtitle={plant.species}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${plant.name}`}
              >
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
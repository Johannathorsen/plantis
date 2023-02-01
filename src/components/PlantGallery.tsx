import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

export default function PlantGallery() {
  const navigate = useNavigate();

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
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          sx={boxSX}
          onClick={() => 
            navigate(`/${item.id}`)
          }
        >
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={item.species}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.name}`}
              >
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    name: 'Julia',
    species: 'Monstera deliciosa',
    id: 'a',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    name: 'Burger',
    species: '@rollelflex_graphy726',
    id: 'b',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    name: 'Camera',
    species: '@helloimnik',
    id: 'c',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    name: 'Coffee',
    species: '@nolanissac',
    id: 'd',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    name: 'Hats',
    species: '@hjrc33',
    id: 'e',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    name: 'Honey',
    species: '@arwinneil',
    id: 'f',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    name: 'Basketball',
    species: '@tjdragotta',
    id: 'g',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    name: 'Fern',
    species: '@katie_wasserman',
    id: 'h',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    name: 'Mushrooms',
    species: '@silverdalex',
    id: 'i',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    name: 'Tomato basil',
    species: '@shelleypauls',
    id: 'j',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    name: 'Sea star',
    species: '@peterlaster',
    id: 'k',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    name: 'Bike',
    species: '@southside_customs',
    id: 'l',
  },
];
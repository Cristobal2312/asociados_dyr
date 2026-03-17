import placasImg from '../assets/placas.jpeg'
import pastelonesImg from '../assets/pastelones.jpeg'
import postesImg from '../assets/postes.jpeg'  // ← asegúrate de tener esta imagen en tu carpeta de assets

export default [
  { 
    id: 1, 
    nombre: 'Placas 2.50m ancho', 
    precioMetro: 10000, 
    img: placasImg 
  },
  { 
    id: 2, 
    nombre: 'Pastelones', 
    precioMetro: 28000, 
    img: pastelonesImg 
  },
  { 
    id: 3, 
    nombre: 'Postes y vigas', 
    precioMetro: 52000, 
    img: postesImg   // ← temporal hasta que agregues postes.jpeg
  }
]


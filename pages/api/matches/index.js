//Detecta el reqyesr e invoca la función.

import db from "@/database/models"
import posicionadorTabla from "@/database/services/posicionadorTabla";

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return matchesList(req, res);
    case 'POST':
      return addMatch(req, res);
    case 'PUT':
      return editMatch(req, res);
    case 'DELETE': 
      return deleteMatch(req, res);
    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const matchesList = async (req, res) => {
  try {
      // leer los Partidos
      const matches = await db.Match.findAll({
        order: [['date', 'ASC']],
        
        include: [
          {
            model: db.Club,
            as: 'club',
            attributes: ['name'],
          },
          {
            model: db.Club,
            as: 'clubs',
            attributes: ['name'],
          }
        ]
      });  

      const matchesByDate = {};
      matches.forEach((match) => {
        const date = match.date.replace(/\//g, '-'); // Reemplazar '/' por '-' para asegurar compatibilidad con ISO
        if (!matchesByDate[date]) {
          matchesByDate[date] = [];
        }
        matchesByDate[date].push(match);
      });
  
      return res.json(matchesByDate);
  } catch (error) {
      return res.status(400).json(
          {
              error: true,
              message: `Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}

const addMatch = async (req, res) => {
  try {
    //Esto se recibe
    console.log(req.body);
    //Los datos recibidos son guardados
    const matches = await db.Match.create({...req.body});

    // ToDO con el resultado ????
    res.json({
      matches,
      result,
      message: "Partido Creado"
    });
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

const editMatch = async(req, res) => {
  try {
    //Hacer cambios en el registro con el ID correspondiente
    const {id} = req.body;
    //Aplicar Cambios
    await db.Match.update({...req.body}, {
      where: {
        id:id
      }
    })

    res.json({
      result,
      message: "El partido fue Actualizado"
    });
  } catch (error) {
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

//Eliminar Encuentro
const deleteMatch = async(req, res) =>{
  try {
    const { id } = req.query;

      const match = await db.Match.findOne({ where: { id: id } });

      if (!match) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el partido',
        });
      }

        await match.destroy();

        res.json({
            message: 'El partido fue eliminado'
        })
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

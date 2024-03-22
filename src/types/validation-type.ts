import Company from "../models/Company"

export const isCompany = (data:any): data is Company =>{
 if(data && typeof data === 'object'){
  return typeof data.nombre === 'string' &&
  typeof data.direccion === 'string' && 
  typeof data.correo === 'string' && 
  typeof data.telefono === 'string' && 
  typeof data.website === 'string' && 
  typeof data.lema === 'string' && 
  typeof data.CAI === 'string' && 
  typeof data.RangoInicial === 'number' && 
  typeof data.RangoFinal === 'number' && 
  typeof data.fechaVencimiento === 'string'
 }
 return false
}
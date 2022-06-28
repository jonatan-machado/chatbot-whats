import api from "../api"

export const dataLead = async (phone:string,atendent:string) =>{
  console.log('telefone enviado',phone)
  const body:any = {phone:phone,phoneAtendent:atendent}
  try {
    const response = await api.post("leads/bots",body)
    console.log(body.phone)
    return response.data.newLead
  } catch (error) {
    console.log('erro',error)
    
  }
}

export const saveLead = async (data:any) =>{
  try {
    await api.post("leads",data)
    console.log('SAVE')
    
  } catch (error) {
    console.log('erro',error)
    
  }
}

export const updateLead = async (data:any) =>{
  try {
   await api.put("leads",data)
   console.log('UPDATE')
    
  } catch (error) {
    console.log('erro',error)
    
  }
}
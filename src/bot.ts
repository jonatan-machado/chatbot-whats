import api from "./api"
 export const dataLead = async (phone:any) =>{
    console.log(phone)
    try {
      const response = await api.get("leads/bots",phone)
      console.log('GET DADOS', response.data.newLead)
      
    } catch (error) {
      console.log('erro',error)
      
    }
  }

  export const saveLead = async (data:any) =>{
    try {
      //await api.post("leads",data)
      console.log('SAVE')
      
    } catch (error) {
      console.log('erro',error)
      
    }
  }

  export const updateLead = async (data:any) =>{
    try {
     // await api.put("leads",data)
     console.log('UPDATE')
      
    } catch (error) {
      console.log('erro',error)
      
    }
  }

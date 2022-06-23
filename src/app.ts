import { create,Whatsapp } from 'venom-bot';
import api from "./api"
create({session:'ola',multidevice:true})
  .then((client)=>start(client))
  .catch((erro) => {
    console.log(erro);
  });

  const dataLead = async (phone:any) =>{
    console.log(phone)
    try {
      const response = await api.get("leads/bots",phone)
      console.log('GET DADOS', response.data.newLead)
      
    } catch (error) {
      console.log('erro',error)
      
    }
  }

  async function start(client:Whatsapp){
    let stage = 0
    let data:any ={}
    let localization:string = ''
    let price:number = 0
    let dormitorio:string = ''
     client.onMessage( async (message:any) => {
        let phone = message.to
        const lead:[] =[]
       let leadData = await dataLead({phone})
        
        console.log('dados',phone)
  

        if(lead.length === null){
          data = {
            amount_invest:price,
            dormitory:dormitorio,
            localization:localization,
            phone:message.to,
            email:"jonatan.machado1@hotmail.com",
            name:"paulo roberto",
            stage:stage,
            id_user:"d896af2c-6c51-46de-b60a-711bf3fb33b0"
          }
          await saveLead(data)
        }
        await ServiceBot({client,message,lead})
        console.log(data)
    });
  }

  const saveLead = async (data:any) =>{
    try {
      //await api.post("leads",data)
      console.log('SAVE')
      
    } catch (error) {
      console.log('erro',error)
      
    }
  }

  const updateLead = async (data:any) =>{
    try {
     // await api.put("leads",data)
     console.log('UPDATE')
      
    } catch (error) {
      console.log('erro',error)
      
    }
  }

  

  const ServiceBot = async ({client,message,data}:any) => {
    let {localization,dormitorio,price,stage,phone,email,name,id_user} = data
    if(String(message.body).toUpperCase() === 'SAIR' 
        || String(message.body).toUpperCase() === 'PARAR' 
        || String(message.body).toUpperCase() === 'STOP'){
        client.sendText(message.from,'Ok, atendimento encerrado, Caso queira voltar só me chamar =)')
        console.log(message.to)
          return
        }
        if(stage === 0){
          client.sendText(message.from,`Olá ${message.sender.name}, bem vindo a dacas, vi que gostou do produto xyz, poderia me informar qual localização está buscando?`)
          
          stage+=1
          return
        }
        if(stage === 1){
          localization = message.body
          client.sendText(message.from,`ok, vi que busca na localidade ${localization}
          poderia me informar quantos dormitorios procura?
          `)
          stage+=1
          console.log('localidade',message.text)
          return
          
        }
        if(stage === 2){
          dormitorio = message.text
          client.sendText(message.from,`ok, vi que busca na localidade ${localization} e com ${dormitorio} dormitorio(s)
          poderia me informar até quanto quer investir?
          `)
          stage+=1
          console.log('dormitorio',message.text)
          return
        }
        if(stage === 3){
          price = message.body
          client.sendText(message.from,`ok, você busca na localidade ${localization}, com ${dormitorio} dormitorio(s)
          e quer investir R$ ${price}, um dos nossos especialistas estará conduzindo melhor a conversa, agora
          `)
          console.log('price',message.body)
          console.log(price,dormitorio,localization)
          stage=0
          data = {
            amount_invest:price,
            dormitory:dormitorio,
            localization:localization,
            phone:phone,
            email:email,
            name:name,
            id_user:id_user
          }
         updateLead(data)
          return
        }
  }

  export default start
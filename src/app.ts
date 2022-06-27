import { PhoneNumber } from 'libphonenumber-js';
import { create,Whatsapp } from 'venom-bot';
import api from "./api"
create({session:'ola',multidevice:true})
  .then((client)=>start(client))
  .catch((erro) => {
    console.log(erro);
  });

  const dataLead = async (phone:any) =>{
    console.log('telefone enviado',phone)
    const body:any = {phone:phone}
    try {
      const response = await api.post("leads/bots",body)
      console.log(body.phone)
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
      if(String(message.body) !== ''){
        let client = message.from
        const response = await dataLead(client)
       if(response === undefined){
        const data = {
          name:"sem nome",
          email:"sem email",
          phone:message.to,
          localization:"menino deus",
          amount_invest:"900 mil",
          dormitory:"2 quartos",
          stage:0,
          phoneAtendent:client
        }
        saveLead(data)
       }

      }
    });
  }

  const saveLead = async (data:any) =>{
    try {
      await api.post("leads",data)
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

/* const ServiceBot = async ({client,message,data}:any) => {
    let {localization,dormitorio,price,stage,phone,email,name,id_user,phoneAtendent} = data
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
} */

  export default start
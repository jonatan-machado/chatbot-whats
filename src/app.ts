import { create,Whatsapp } from 'venom-bot';
import api from "./api"
create({session:'ola',multidevice:true})
  .then((client)=>start(client))
  .catch((erro) => {
    console.log(erro);
  });

  async function start(client:Whatsapp){
    let stage = 0
    let data:any ={}
    let localization:string
    let price:number
    let dormitorio:string
    client.onMessage((message:any) => {
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
            phone:'55983045683',
            email:"jonatan.machado1@hotmail.com",
            name:"paulo roberto",
            id_user:"0d2fec0d-9446-47c3-a897-13e7b1ec2596"
          }
         saveLead(data)
          return
        }
        console.log(data)
    });
  }

  const saveLead = async (data:any) =>{
    try {
      await api.post("leads",data)
      
    } catch (error) {
      console.log('erro',error)
      
    }
  }

  export default start
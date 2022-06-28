import { create,Whatsapp } from 'venom-bot';

import { dataLead, saveLead, updateLead } from './models/User';

create({session:'ola',multidevice:true})
  .then((client)=>start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client:Whatsapp){
     client.onMessage( async (message:any) => {
      if(String(message.body) !== ''){
        let client = message.from
        let atendent = message.to
        const response = await dataLead(client,atendent)
       if(response === undefined){
        const data = {
          name:"não informado",
          email:"não informado",
          phone:message.to,
          localization:"não informado",
          amount_invest:"não informado",
          dormitory:"não informado",
          stage:0,
          phoneAtendent:client
        }
        saveLead(data)
       }
       const data = {
        name:response.name,
        email:response.email,
        phone:response.phone,
        localization:response.localization,
        amount_invest:response.amount_invest,
        dormitory:response.dormitory,
        stage:response.stage,
        phoneAtendent:response.phoneAtendent,
      }
       ServiceBot({client,message,data})

      }
    });
  }
 const ServiceBot = async ({client,message,data}:any) => {
    let {localization,dormitorio,price,stage,phone,email,name,id_user,phoneAtendent} = data
    if(String(message.body).toUpperCase() === 'SAIR' 
        || String(message.body).toUpperCase() === 'PARAR' 
        || String(message.body).toUpperCase() === 'STOP'){
        client.sendText(message.from,'Ok, atendimento encerrado, Caso queira voltar só me chamar =)')
        console.log(message.to)
          return
        }
        if(stage === 0){
          client.sendText(message.from,`Olá bem vindo a dacas, poderia me informar seu nome?`)
          stage+=1
          data = {
            amount_invest:price,
            dormitory:dormitorio,
            localization:localization,
            phone:phone,
            email:email,
            name:message.body,
            stage:stage,
            phoneAtendent:phoneAtendent
          }
         updateLead(data)
          return
        }
        if(stage === 1){
          client.sendText(message.from,`${name}, qual seu e-mail?`)
          stage+=1
          data = {
            amount_invest:price,
            dormitory:dormitorio,
            localization:localization,
            phone:phone,
            email:message.body,
            name:name,
            stage:stage,
            phoneAtendent:phoneAtendent
          }
         updateLead(data)
          return
        }
        if(stage === 2){
          client.sendText(message.from,`Olá ${name}, bem vindo a dacas, vi que gostou do produto xyz, poderia me informar qual localização está buscando?`)
          stage+=1
          data = {
            amount_invest:price,
            dormitory:dormitorio,
            localization:message.body,
            phone:phone,
            email:email,
            name:name,
            stage:stage,
            phoneAtendent:phoneAtendent
          }
         updateLead(data)
         return
        }
        if(stage === 3){
          localization = message.body
          client.sendText(message.from,`ok, vi que busca na localidade ${localization}
          poderia me informar quantos dormitorios procura?
          `)
          stage+=1
          data = {
            amount_invest:price,
            dormitory:message.body,
            localization:localization,
            phone:phone,
            email:email,
            name:name,
            stage:stage,
            phoneAtendent:phoneAtendent
          }
         updateLead(data)
          return
          
        }
        if(stage === 4){
          dormitorio = message.text
          client.sendText(message.from,`ok, vi que busca na localidade ${localization} e com ${dormitorio} dormitorio(s)
          poderia me informar até quanto quer investir?
          `)
          stage+=1
          data = {
            amount_invest:message.body,
            dormitory:dormitorio,
            localization:localization,
            phone:phone,
            email:email,
            name:name,
            stage:stage,
            phoneAtendent:phoneAtendent
          }
         updateLead(data)
          return
        }
        if(stage === 5){
          price = message.body
          client.sendText(message.from,`ok, você busca na localidade ${localization}, com ${dormitorio} dormitorio(s)
          e quer investir R$ ${price}, um dos nossos especialistas estará conduzindo melhor a conversa, agora
          `)
          console.log('price',message.body)
          stage=0
          return
        }
}

  export default start
import { create,Whatsapp } from 'venom-bot';

create({session:'ola',multidevice:true})
  .then((client)=>start(client))
  .catch((erro) => {
    console.log(erro);
  });

  function start(client:Whatsapp) {
    let stage = 0
    let data:any ={}
    let localidade:string
    let price:number
    let dormitorio:string
    client.onMessage((message:any) => {
      if(String(message.body).toUpperCase() === 'SAIR' 
        || String(message.body).toUpperCase() === 'PARAR' 
        || String(message.body).toUpperCase() === 'STOP'){
          client.sendText(message.from,'Ok, atendimento encerrado, Caso queira voltar só me chamar =)')
          return
        }
        if(stage === 0){
          client.sendText(message.from,`Olá ${message.sender.name}, bem vindo a dacas, vi que gostou do produto xyz, poderia me informar qual localização está buscando?`)
          
          stage+=1
          return
        }
        if(stage === 1){
          localidade = message.body
          client.sendText(message.from,`ok, vi que busca na localidade ${localidade}
          poderia me informar quantos dormitorios procura?
          `)
          stage+=1
          console.log('localidade',message.text)
          return
          
        }
        if(stage === 2){
          dormitorio = message.text
          client.sendText(message.from,`ok, vi que busca na localidade ${localidade} e com ${dormitorio} dormitorio(s)
          poderia me informar até quanto quer investir?
          `)
          stage+=1
          console.log('dormitorio',message.text)
          return
        }
        if(stage === 3){
          price = message.body
          client.sendText(message.from,`ok, você busca na localidade ${localidade}, com ${dormitorio} dormitorio(s)
          e quer investir R$ ${price}, um dos nossos especialistas estará conduzindo melhor a conversa, agora
          `)
          console.log('price',message.body)
          console.log(price,dormitorio,localidade)
          stage+=1
          return
        }

        data = {
          price:price,
          dormitorio:dormitorio,
          localidade:localidade
        }
        console.log(data)
      
    });
  }

  export default start
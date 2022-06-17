import parsePhoneNumber, {isValidPhoneNumber} from 'libphonenumber-js'
import {create,Whatsapp,Message,SocketState} from "venom-bot"
import csv from 'csvtojson'

export type QRCode= {
  base64Qr:string
}

class Sender {
  private client: Whatsapp
  private connected: boolean
  private qr: QRCode

  get isConnected() : boolean {
    return this.connected
  }
  
  public get qrCode() : QRCode {
    return this.qr
  }
  
  constructor(){
    this.initialize()
  }

extractContact = async () => {
  const filePath = `${__dirname}/teste.csv`
  let numbers:any = []
  await csv().fromFile(filePath)
    .then((lista=>{
      for (const number of lista){
        // if(!isValidPhoneNumber(number.telefone, "BR")){
        //   throw new Error("this number is not valid!")
        // }
      let phoneNumber = parsePhoneNumber(number.telefone, "BR")?.format("E.164").replace('+','') as string
      phoneNumber= phoneNumber.includes("@c.us") 
        ? phoneNumber 
        : `${phoneNumber}@c.us`
      numbers.push(phoneNumber)  
      }
    }))
    return numbers
}


 async sendText (img:string,nameImg:string,body:string,) {
      const contac = await this.extractContact() 
        console.log('numeros dos contatos',contac)
        for(const number of contac){
           await  this.client.sendImage(number,img,nameImg,body).catch()
            console.log('number',number)
          }
        
  }

   sendMessage = async (phoneNumber:string,img:string,nameImg:string,body:string)=>{
     console.log(phoneNumber)
  }

  private initialize(){
    const qr = (base64Qr:string)=>{
      this.qr = {base64Qr}
    }
    const start = (client:Whatsapp) =>{
      this.client = client

      client.onStateChange((state)=>{
        this.connected = state === SocketState.CONNECTED
      })

    }

    create('ws-sender-dev',qr)
      .then((client)=> start(client))
      .catch((error)=>console.error(error))
  }
}

export default Sender
import parsePhoneNumber, {
  isValidPhoneNumber,
  PhoneNumber,
} from 'libphonenumber-js';
import {saveLead} from './bot'
import { create, Whatsapp, Message, SocketState } from 'venom-bot';
import csv from 'csvtojson';

export type QRCode = {
  base64Qr: string;
};

class Sender {
  private client: Whatsapp;
  private connected: boolean;
  private qr: QRCode;

  get isConnected(): boolean {
    return this.connected;
  }

  public get qrCode(): QRCode {
    return this.qr;
  }

  constructor() {
    this.initialize();
  }

  extractContact = async () => {
    const filePath = `${__dirname}/teste.csv`;
    let numbers: any = [];
    await csv()
      .fromFile(filePath)
      .then((lista) => {
        for (const number of lista) {

          let phoneNumber = parsePhoneNumber(number.telefone, 'BR')
            ?.format('E.164')
            .replace('+', '') as string;
          phoneNumber = phoneNumber.includes('@c.us')
            ? phoneNumber
            : `${phoneNumber}@c.us`;
          numbers.push(phoneNumber);
        }
      });
    return numbers;
  };

  async sendText(img: string, nameImg: string, body: string) {
    const contac:[] = await this.extractContact();
    console.log('numeros dos contatos', contac);
    let counter = 0;
    let i = setInterval(async()=>{
       await this.sendMessage(contac[counter], img, nameImg, body).then().catch(
       (err)=>{
        console.log(err)
       }
       )
       console.log('mensagem enviada',contac[counter])
      counter++
      if(counter>=contac.length){
        console.log('ACABOU!')
        clearInterval(i)
      }
    },5000)
    this.client.onMessage(async (message:any)=>{
      if(String(message.body).toUpperCase() === 'MAIS DADOS'){
        let data = {
          phone:message.to
          
        }
        saveLead(data)
      }
    })
  }

  async sendMessage(contact:string,img:string,nameImg:string, body:string){
    await this.client.sendImage(contact, img, nameImg, body)
  }

  private initialize() {
    const qr = (base64Qr: string) => {
      this.qr = { base64Qr };
    };
    const start = (client: Whatsapp) => {
      this.client = client;

      client.onStateChange((state) => {
        this.connected = state === SocketState.CONNECTED;
      });
    };

    create('ws-sender-dev', qr)
      .then((client) => start(client))
      .catch((error) => console.error(error));
  }
}

export default Sender;

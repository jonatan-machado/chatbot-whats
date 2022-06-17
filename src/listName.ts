import csv from 'csvtojson'
const filePath = `${__dirname}/teste.csv`
const  ListName = ()=>{
  csv().fromFile(filePath)
    .then((lista=>{
      lista.forEach(item => {
        return item.telefone
      });
    }))
}

export default ListName
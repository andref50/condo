import { Apartamento } from "./model/Apartamento.js";
import { ApartamentoLista } from "./view/ApartamentoLista.js";


import { v4 as uuidv4 } from 'uuid';

const server = 'http://127.0.0.1:5000'

const apartamentoLista: ApartamentoLista = new ApartamentoLista()


const form          = <HTMLFormElement>document.querySelector('.formulario')
const URL           = <HTMLInputElement>document.querySelector('#url')
const endereco      = <HTMLInputElement>document.querySelector('#endereco')
const valor         = <HTMLInputElement>document.querySelector('#valor')
const condominio    = <HTMLInputElement>document.querySelector('#condominio')
const reforma       = <HTMLSelectElement>document.querySelector('#reforma')
const nota          = <HTMLInputElement>document.querySelector('#nota')
// const favorito      = <HTMLInputElement>document.querySelector('#favorito')


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let urls: string[] = []
    const formData = new FormData()
    formData.append('url', URL.value)
    try {
        const send = await fetch(server + '/getimgs',
            {
                method: 'POST',
                body: formData
            })
        const response = await send.json() 
        urls = response
    } catch (error) {
        console.log('Error fecthing data: ' + error)
    }

    const ape = new Apartamento(
        // apartID,
        uuidv4(),
        URL.value,
        endereco.value,
        parseInt(valor.value),
        parseInt(condominio.value),
        reforma.value,
        nota.value,
        false,
        urls
    )
    apartamentoLista.addApartamento(ape)
    form.reset()    

});


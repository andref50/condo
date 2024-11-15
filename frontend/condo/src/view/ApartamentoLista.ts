import { Apartamento, IApartamento } from "../model/Apartamento.js"

const ul = <HTMLUListElement>document.querySelector('ul')

const server = 'http://127.0.0.1:5000'

export class ApartamentoLista {
    private listaApes: Apartamento[] = []

    constructor(){
        this.fecthList()
    }

    async fecthList() {
        try{
            const response = await fetch(server)
            const data = await response.json()
            this.listaApes = data
            this.render()
        } catch(error){
            console.log('Error fetching initial data: ' + error)
        }
    }

    async addApartamento(apartamento: IApartamento) {
        try {
            await fetch(server + '/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(apartamento)
            })
        } catch(error){
            console.log('Error fetching data to server: ' + error)
        }
        this.listaApes.push(apartamento)
        this.render()
    }

    async removeApartamento(id: string) {
        try{
            await fetch(server + '/delete/' + id, {
                method: 'DELETE',
                headers :{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
        } catch(error){
            console.log('Error deleting data: ' + error)
        }
        this.listaApes = this.listaApes.filter(apes => apes.id !== id)
        this.render()
    }

    async editApartamento(apartamento: IApartamento){
        console.log(apartamento)
    }

    render(): void {
        ul.innerHTML = ''
        this.listaApes.forEach((ape, i) => {
            const markup = `
            <li>
                <div class="item item-hidden">

                    <h4>${i + 1}. ${ape.endereco}</h4>
                    <a href=${ape.url} target=_blank>${ape.url}</a>
                    
                    <button class="close-button" id="close-${ape.id}">🗑️</button>
                    <button class="edit-button" id="edit-${ape.id}">🗑️</button>
                    <!--- <button class="edit-button" id="edit-${ape.id}">🖊️</button> --->

                    <div class="infos-valores">
                        <div class="div-valores">
                            <p class="label-valores">Valor</p>
                            <p class="valor editable-${ape.id}">${ape.valor ? ape.valor : '0'}</p>
                        </div>
                        <div class="div-valores">
                            <p class="label-valores">Condomínio</p>
                            <p class="condominio editable-${ape.id}">${ape.condominio ? ape.condominio : '0'}</p>
                        </div>
                        <div class="div-valores">
                            <p class="label-valores">Reforma?</p>
                            <p class="reforma editable-${ape.id}">${ape.reforma ? ape.reforma : 'Não informado'}</p>
                        </div>
                        <div class="div-valores">
                            <p class="label-valores">Nota</p>
                            <p class="nota editable-${ape.id}">${ape.rating ? ape.rating : '0'}</p>
                        </div>
                        <div class="div-valores">
                            <p class="label-valores">Favorito</p>
                            <input type="checkbox" class="checkbox" id="checkbox-${ape.id}" ></input>
                        </div>
                    </div>
                    <div class="infos-contatos">
                        <div class="div-contatos">
                            <p class="label-contatos">Nome do contato</p>
                            <p class="nome-contato editable-${ape.id}">Não informado</p>
                        </div>
                        <div class="div-contatos">
                            <p class="label-contatos">Telefone de contato</p>
                            <p class="nome-contato editable-${ape.id}">(XX) X XXXX-XXXX</p>
                        </div>
                    </div>
                    <div class="imagens imagens-${ape.id}">
                    </div>

                    <p class="apeID">ID: ${ape.id}</p>
                </div>
            </li>
            `;

            ul.insertAdjacentHTML('beforeend', markup);

            const imgsQuery = <HTMLElement>document.querySelector('.imagens-'+ape.id)

            for(let i = 0; i < ape.imgs.length; i++){
                let img = document.createElement('img')
                img.className = 'imagem'
                img.src = `${ape.imgs[i]}`
                imgsQuery.appendChild(img)
            }

            const buttonClose = document.getElementById(`close-${ape.id}`)
            buttonClose?.addEventListener('click', () => {
                this.removeApartamento(buttonClose.id.replace('close-', ''))
            })

            // const buttonEdit = document.getElementById(`edit-${ape.id}`)
            // buttonEdit?.addEventListener('click', () => {
            //     this.editApartamento(ape)
            // })

            const buttonEdit = document.getElementById(`edit-${ape.id}`)
            buttonEdit?.addEventListener('click', () => {
                const itemHidden = document.querySelector('.item-hidden')
                itemHidden?.setAttribute('style', 'display: none')
            })

            const valor = document.querySelectorAll('.valor')!
            valor.forEach(v => {
                v.innerHTML = parseInt(v.innerHTML).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
            })

            const condominio = document.querySelectorAll('.condominio')!
            condominio.forEach(v => {
                v.innerHTML = parseInt(v.innerHTML).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
            })

            const favCheckbox = document.getElementById('checkbox-' + ape.id) as HTMLInputElement
            ape.fav = favCheckbox.checked
            this.editApartamento(ape)
        })
    }
}
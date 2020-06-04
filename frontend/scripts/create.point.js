
// LISTA ESTADOS
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

// LISTA DE CIDADES 

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade</option>" /* limpa o campo de busca*/
    citySelect.disabled = false

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// ITENS DE COLETA 

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    //togle = add ou remove uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados
    const alredySelected = selectedItems.findIndex(item => {
        const intemFound = item == itemId //true or false
        return intemFound
    })

    //se já estiver selecionado,
    if (alredySelected >= 0) {
        // tirar da selecao 
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId) 
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
 
}  
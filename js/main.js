const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

console.log(itens[0])

itens.forEach((elemento) => {
   criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome'];
    const quantidade =  evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    console.log(existe)

    if(existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
        
    } else {
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1].id +1) : 0 ;

        /*Outra forma de resolver a linha 34*/
        //itemAtual.id = Date.now();
        
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value= "";
});

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");  

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    console.log(document.querySelector("[data-id='"+item.id+"']"))
   document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })
     
    return elementoBotao;
}

function deletaElemento(tag, id){
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1); 
    //1 - é de 1 item que vamos remover. 

    localStorage.setItem("itens", JSON.stringify(itens));

}
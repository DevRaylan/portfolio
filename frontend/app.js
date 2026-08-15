const API_URL = "http://localhost:8080";

const form = document.getElementById("form-atendente");
const inputNome = document.getElementById("input-nome");
const lista = document.getElementById("lista-atendentes");

async function carregarAtendentes(){
    const resposta = await fetch(`${API_URL}/atendentes`);
    const atendentes = await resposta.json();

    lista.innerHTML = "";
    atendentes.forEach(atendente =>{
        const item = document.createElement("li");
        item.textContent = `${atendente.id} - ${atendente.nome}`;
        lista.appendChild(item);
    });
}

form.addEventListener("submit", async (evento)=>{
    evento.preventDefault();

    await fetch(`${API_URL}/atendentes`, {
        method: "POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({nome:inputNome.value})
    });

    inputNome.value = "";
    carregarAtendentes();
});

carregarAtendentes();
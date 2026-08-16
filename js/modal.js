import { corrigirLinks } from "./readme-parser.js";

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const modalBack = document.getElementById("modal-back");

let historico = [];
let pastaAtual = "";
let htmlAtual = "";

export function abrirModal(html, pasta) {
    historico = [];
    pastaAtual = pasta;
    renderizarConteudo(html);
    modalOverlay.classList.add("visible");
}

function navegarPara(html) {
    historico.push(htmlAtual);
    renderizarConteudo(html);
}

function voltar() {
    const anterior = historico.pop();
    if (anterior !== undefined) {
        renderizarConteudo(anterior);
    }
}

function renderizarConteudo(html) {
    htmlAtual = html;
    modalContent.classList.add("fading");
    setTimeout(() => {
        modalContent.innerHTML = html;
        corrigirLinks(modalContent, pastaAtual);
        interceptarLinksMarkdown();
        modalBack.style.display = historico.length > 0 ? "inline-flex" : "none";
        modalContent.classList.remove("fading");
    }, 200);
}

function interceptarLinksMarkdown() {
    modalContent.querySelectorAll("a[href$='.md']").forEach(a => {
        a.addEventListener("click", async (evento) => {
            evento.preventDefault();
            const resposta = await fetch(a.getAttribute("href"));
            const texto = await resposta.text();
            navegarPara(marked.parse(texto));
        });
    });
}

function fecharModal() {
    modalOverlay.classList.remove("visible");
}

modalClose.addEventListener("click", fecharModal);
modalBack.addEventListener("click", voltar);
modalOverlay.addEventListener("click", (evento) => {
    if (evento.target === modalOverlay) fecharModal();
});
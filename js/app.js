import { extrairTitulo, extrairDescricao, extrairTecnologias, corrigirLinks } from "./readme-parser.js";
import { abrirModal } from "./modal.js";

const PROJETOS = ["calculadora-gorjetas"];
const projectsList = document.getElementById("projects-list");

async function carregarProjetos() {
    for (const [index, pasta] of PROJETOS.entries()) {
        const resposta = await fetch(`${pasta}/README.md`);
        const readme = await resposta.text();

        const titulo = extrairTitulo(readme);
        const descricao = extrairDescricao(readme);
        const tecnologias = extrairTecnologias(readme);
        const urlRepositorio = `https://github.com/DevRaylan/portfolio/tree/main/${pasta}`;

        const card = document.createElement("article");
        card.className = "project-card fade-in-up";
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="project-card-top" tabindex="0">
                <h3>${titulo}</h3>
                <p>${marked.parseInline(descricao)}</p>
            </div>
            <div class="project-card-bottom" tabindex="0">
                <div class="tech-stack">
                    ${tecnologias.map(t => `<span>${t}</span>`).join("")}
                </div>
                <button class="readme-link" type="button">Ver descrição →</button>
            </div>
        `;

        corrigirLinks(card.querySelector("p"), pasta);

        const areaTopo = card.querySelector(".project-card-top");
        const areaBase = card.querySelector(".project-card-bottom");

        areaTopo.addEventListener("click", () => {
            window.open(urlRepositorio, "_blank", "noopener");
        });

        areaTopo.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter") {
                window.open(urlRepositorio, "_blank", "noopener");
            }
        });

        areaBase.addEventListener("click", () => {
            abrirModal(marked.parse(readme), pasta);
        });

        areaBase.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter") {
                abrirModal(marked.parse(readme), pasta);
            }
        });

        projectsList.appendChild(card);
    }
}

carregarProjetos();
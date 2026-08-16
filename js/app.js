import { extrairTitulo, extrairDescricao, extrairTecnologias, corrigirLinks } from "./readme-parser.js";
import { abrirModal } from "./modal.js";

// Projetos hospedados dentro deste repositório (pasta local, README embutido).
// Projetos externos (código vive em outro repositório) usam { pasta, readmeUrl, repoUrl, linkBase }
// para não precisar duplicar o código inteiro aqui dentro.
const PROJETOS = [
    "calculadora-gorjetas",
    {
        pasta: "sigi",
        readmeUrl: "https://raw.githubusercontent.com/DevRaylan/portfolio-projects/main/sigi/README.md",
        repoUrl: "https://github.com/DevRaylan/portfolio-projects/tree/main/sigi",
        linkBase: "https://github.com/DevRaylan/portfolio-projects/blob/main/sigi"
    }
];
const projectsList = document.getElementById("projects-list");

async function carregarProjetos() {
    for (const [index, projeto] of PROJETOS.entries()) {
        const ehLocal = typeof projeto === "string";
        const pasta = ehLocal ? projeto : projeto.pasta;
        const readmeUrl = ehLocal ? `${pasta}/README.md` : projeto.readmeUrl;
        const urlRepositorio = ehLocal ? `https://github.com/DevRaylan/portfolio/tree/main/${pasta}` : projeto.repoUrl;
        const linkBase = ehLocal ? pasta : projeto.linkBase;

        const resposta = await fetch(readmeUrl);
        const readme = await resposta.text();

        const titulo = extrairTitulo(readme);
        const descricao = extrairDescricao(readme);
        const tecnologias = extrairTecnologias(readme);

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

        corrigirLinks(card.querySelector("p"), linkBase);

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
            abrirModal(marked.parse(readme), linkBase);
        });

        areaBase.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter") {
                abrirModal(marked.parse(readme), linkBase);
            }
        });

        projectsList.appendChild(card);
    }
}

carregarProjetos();
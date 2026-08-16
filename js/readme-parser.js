export function extrairTitulo(md) {
    const linha = md.split("\n").find(l => l.startsWith("# "));
    return linha ? linha.replace(/^#\s+/, "") : "Projeto";
}

export function extrairDescricao(md) {
    const linhas = md.split("\n");
    const inicio = linhas.findIndex(l => l.startsWith("# "));
    const paragrafo = [];
    for (let i = inicio + 1; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (linha.startsWith("#")) break;
        if (!linha) {
            if (paragrafo.length > 0) break;
            continue;
        }
        paragrafo.push(linha);
    }
    return paragrafo.join(" ");
}

export function extrairTecnologias(md) {
    const linhas = md.split("\n");
    const inicioSecao = linhas.findIndex(l => /^##\s+tecnologias/i.test(l.trim()));
    if (inicioSecao === -1) return [];

    const tecnologias = [];
    for (let i = inicioSecao + 1; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (linha.startsWith("##")) break;
        if (linha.startsWith("|") && !linha.includes("---")) {
            const colunas = linha.split("|").map(c => c.trim()).filter(Boolean);
            if (colunas.length >= 2 && colunas[0].toLowerCase() !== "camada") {
                tecnologias.push(colunas[1]);
            }
        }
    }
    return tecnologias;
}

export function corrigirLinks(container, pasta) {
    container.querySelectorAll("a[href]").forEach(a => {
        const href = a.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#")) {
            a.setAttribute("href", `${pasta}/${href}`);
        }
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
        a.addEventListener("click", (evento) => evento.stopPropagation());
    });
}
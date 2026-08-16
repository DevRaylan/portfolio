# Meu Portfólio 

Site pessoal, construído do zero com HTML, CSS e JavaScript puro (sem frameworks, sem build), hospedado via GitHub Pages.

🔗 **[Ver site publicado](https://devraylan.github.io/portfolio/)**

## Como funciona

- Layout em duas colunas: perfil e tecnologias fixos à esquerda, projetos rolando à direita.
- Os cards de projeto são gerados automaticamente — o JavaScript busca o `README.md` de cada pasta de projeto listada e extrai título, descrição e tecnologias direto de lá. Não precisa editar HTML pra adicionar um projeto novo, só listar a pasta.
- Clicar em "Ver descrição" abre o README completo do projeto num card flutuante, com navegação entre arquivos `.md` linkados (e botão de voltar).
- Tema claro/escuro automático, seguindo a preferência do sistema operacional.

## Estrutura
├── index.html

├── css/ → estilos divididos por responsabilidade

├── js/ → lógica dividida em módulos (ES Modules)

└── calculadora-gorjetas/ → um dos projetos exibidos no portfólio


## Tecnologias

HTML5 · CSS3 · JavaScript (ES Modules) · [marked.js](https://marked.js.org/) para renderizar Markdown

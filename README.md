# Réplica do Portal Web Air France - Tecnologias Web (2024)

![HTML5](https://img.shields.io/badge/HTML5-Semantic_Markup-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Flexbox_&_Grid-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6_DOM-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Academic](https://img.shields.io/badge/ISEC-LEI-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Versão-Melhorada-success?style=for-the-badge)

---

## 📌 Enquadramento Académico
* **Cadeira:** Tecnologias Web (TWeb)
* **Ano Letivo / Realização:** 2024
* **Instituição:** Instituto Superior de Engenharia de Coimbra (ISEC)
* **Curso:** Licenciatura em Engenharia Informática

---

## ✈️ Descrição do Projeto
Este projeto consiste no desenvolvimento de uma réplica do portal web da companhia aérea internacional **Air France**. O objetivo principal foi colocar em prática competências essenciais de desenvolvimento front-end com as tecnologias web fundamentais: **HTML5**, **CSS3** e **JavaScript (Vanilla)**.

A interface replica a experiência do utilizador do site oficial da transportadora, incluindo a navegação corporativa, seleção de idiomas, motor de pesquisa de bilhetes e catálogo de destinos turísticos em destaque.

---

## 🚀 Comparação de Versões: Original vs. Versão Melhorada

| Área / Funcionalidade | Versão Original (Ramo `main`) | Versão Melhorada (Ramo `versao-melhorada`) |
| :--- | :--- | :--- |
| **Arquitetura HTML5** | `<header>` fora do `<body>`, tags não semânticas, ausência de `<main>`. | Estrutura semântica rigorosa com `<header>`, `<main>`, `<section>`, `<aside>` e `<footer>` devidamente aninhados no `<body>`. |
| **Pesquisa de Voos** | Formulário estático sem processamento dinâmico ou listagem de opções. | **Motor de pesquisa interativo**: gera lista dinâmica de voos (Airbus/Boeing, horários, preços, duração, escalas) e modal de confirmação de reserva. |
| **Área de Cliente / Login** | Botão sem efeito de clique ou janela associada. | **Modal de Autenticação completo**: formulário de credenciais Flying Blue com validação de campos, lembrete de sessão e feedback dinâmico. |
| **Seletor de Idioma e Moeda** | Botão puramente estático. | **Modal Interativo de Região**: permite trocar entre Portugal, França, Reino Unido e EUA com atualização imediata de bandeira e moeda. |
| **Menu Lateral Móvel** | Manipulação direta de `display: block/none` sem transição. | Menu tipo **Gaveta (Drawer)** com animação deslizante em CSS, backdrop com efeito *blur* e suporte a encerramento com a tecla `Escape`. |
| **JavaScript** | Scripts executados antes do carregamento completo do DOM; redundância de ficheiros. | Lógica em **ES6 modular**, carregamento assíncrono com `defer`, delegação de eventos e sistema de notificações *Toast* em tempo real. |
| **Acessibilidade (a11y)** | Sem atributos `aria-*` ou foco por teclado. | Adicionados atributos `aria-label`, `role="dialog"`, `aria-modal` e suporte a navegação por teclado. |

---

## 📂 Estrutura de Ficheiros

```text
airfrance-clone-tweb/
├── airfrance.html    # Ficheiro principal estruturado em HTML5 semântico
├── style.css         # Estilização completa, layouts responsivos e animações
├── java.js           # Lógica JavaScript (modais, motor de voos, toasts)
├── img/              # Imagens, vetores e logótipos oficiais
└── README.md         # Documentação detalhada do projeto
```

---

## 💻 Como Executar

1. **Clonar e aceder ao projeto:**
   ```bash
   git clone https://github.com/Pedro2024136184/airfrance-clone-tweb.git
   cd airfrance-clone-tweb
   ```

2. **Alternar entre as versões:**
   * Para a versão original:
     ```bash
     git checkout main
     ```
   * Para a versão melhorada:
     ```bash
     git checkout versao-melhorada
     ```

3. **Abrir no Navegador:**
   * Basta abrir o ficheiro `airfrance.html` em qualquer browser moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) ou recorrer ao *Live Server* do VS Code.

---

## 👨‍💻 Autor
* **Pedro Costa** (Nº 2024136184) – Licenciatura em Engenharia Informática, ISEC.

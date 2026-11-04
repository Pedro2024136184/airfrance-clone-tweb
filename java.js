// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os itens do menu
    const menuItems = document.querySelectorAll('.menu a');

    // Adiciona um evento de clique a cada item do menu
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove a classe 'active' de todos os itens
            menuItems.forEach(subItem => {
                subItem.classList.remove('active');
            });

            // Adiciona a classe 'active' ao item clicado
            item.classList.add('active');
        });
    });
});

// Seleciona todos os botões de aba
document.querySelectorAll('.tab-button').forEach(button => {
    // Adiciona um evento de clique a cada botão de aba
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões de aba
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        // Adiciona a classe 'active' ao botão de aba clicado
        button.classList.add('active');
    });
});

const verticalMenuItems = document.querySelectorAll('#vertical-menu a');

    // Adiciona um evento de clique a cada item do menu vertical
    verticalMenuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove a classe 'active' de todos os itens
            verticalMenuItems.forEach(subItem => {
                subItem.classList.remove('active');
            });

            // Adiciona a classe 'active' ao item clicado
            item.classList.add('active');
        });
    });



// Função para alternar a exibição do menu vertical
function toggleVerticalMenu() {
    var menu = document.getElementById("vertical-menu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function setActiveButton(buttonId) {
    var buttons = document.querySelectorAll("#vertical-menu button");
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });
    var activeButton = document.getElementById(buttonId);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}


const dropdownButton = document.querySelector('.dropdown-button');
const dropdownItems = document.querySelectorAll('.dropdown-menu li');

dropdownItems.forEach((item) => {
  item.addEventListener('click', () => {
    dropdownButton.textContent = item.textContent + ' ▼';
    dropdownItems.forEach((i) => i.classList.remove('selected'));
    item.classList.add('selected');
  });
});

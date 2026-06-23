document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".menu-link");
    const sections = document.querySelectorAll(".content-section");

    // Função para alternar entre as abas principais (Dashboard, Cavalos, etc)
    window.switchTab = function(targetSectionId) {
        sections.forEach(section => {
            section.classList.remove("active-section");
        });

        menuLinks.forEach(link => {
            link.classList.remove("active");
        });

        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add("active-section");
        }

        const activeLink = document.querySelector(`[data-target="${targetSectionId}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }

        // Se voltar para a aba de cavalos, garante que liste o plantel primeiro
        if(targetSectionId === 'cavalos-section') {
            closeHorseProfile();
        }
    };

    // Ouvinte para os cliques do menu lateral
    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSectionId = link.getAttribute("data-target");
            switchTab(targetSectionId);
        });
    });
});

// Função dinâmica que pega os dados do cavalo clicado e preenche a Ficha Técnica
function openHorseProfile(name, raca, idade, pelagem, imgUrl) {
    // Esconde a lista de cavalos e mostra a área da Ficha
    document.getElementById("plantel-list-view").style.display = "none";
    document.getElementById("ficha-individual-view").style.display = "block";
    
    // Atualiza os dados textuais e a imagem do perfil da ficha
    document.getElementById("view-horse-name").innerText = name;
    document.getElementById("view-horse-details").innerText = `Raça: ${raca} | Idade: ${idade} | Pelagem: ${pelagem}`;
    
    const profileImg = document.getElementById("view-horse-img");
    if(profileImg) {
        profileImg.src = imgUrl;
        profileImg.alt = `Foto de ${name}`;
    }
}

// Função para fechar a ficha técnica e retornar para a lista de plantel
function closeHorseProfile() {
    document.getElementById("ficha-individual-view").style.display = "none";
    document.getElementById("plantel-list-view").style.display = "block";
}
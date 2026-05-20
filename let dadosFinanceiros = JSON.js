let dadosFinanceiros = JSON.parse(localStorage.getItem('manejo_certo_financeiro')) || [
    { id: 1, cavalo: 'Apollo Crimson', mes: 'Maio / 2026', base: 1200.00, extras: 220.00, status: 'Pendente' },
    { id: 2, cavalo: 'Dona da Noite', mes: 'Maio / 2026', base: 1200.00, extras: 0.00, status: 'Pago' },
    { id: 3, cavalo: 'Trovão do Sul', mes: 'Maio / 2026', base: 1200.00, extras: 150.00, status: 'Pago' }
];

function inicializarAbas() {
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active-section'));
            
            this.classList.add('active');
            
            const targetSection = this.getAttribute('data-target');
            const sectionElement = document.getElementById(targetSection);
            if (sectionElement) {
                sectionElement.classList.add('active-section');
            } else {
                console.error(`A seção com id "${targetSection}" não foi encontrada no HTML.`);
            }
        });
    });
}

function switchTab(sectionId) {
    const targetLink = document.querySelector(`[data-target="${sectionId}"]`);
    if(targetLink) {
        targetLink.click();
    }
}

function renderizarTabelaFinanceira() {
    const tbody = document.getElementById('finance-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let totalGeralMaio = 0;

    dadosFinanceiros.forEach(item => {
        const totalLinha = item.base + item.extras;
        totalGeralMaio += totalLinha;
        const badgeClass = item.status === 'Pago' ? 'paid' : 'pending';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.cavalo}</strong></td>
            <td>${item.mes}</td>
            <td>R$ ${item.base.toFixed(2)}</td>
            <td>R$ ${item.extras.toFixed(2)}</td>
            <td><strong>R$ ${totalLinha.toFixed(2)}</strong></td>
            <td><span class="status-badge ${badgeClass}" onclick="alternarStatusPagamento(${item.id})">${item.status}</span></td>
            <td><button class="btn-view" style="padding: 4px 8px; font-size: 8pt;" onclick="adicionarCustoExtraPrompt(${item.id})"><i class="fa-solid fa-plus"></i> Extra</button></td>
        `;
        tbody.appendChild(row);
    });

    const dashboardValue = document.getElementById('total-may');
    if(dashboardValue) dashboardValue.innerText = `R$ ${totalGeralMaio.toFixed(2)}`;
}

function alternarStatusPagamento(id) {
    dadosFinanceiros = dadosFinanceiros.map(item => {
        if(item.id === id) item.status = item.status === 'Pago' ? 'Pendente' : 'Pago';
        return item;
    });
    localStorage.setItem('manejo_certo_financeiro', JSON.stringify(dadosFinanceiros));
    renderizarTabelaFinanceira();
}

function adicionarCustoExtraPrompt(id) {
    const valor = prompt("Digite o valor do custo extra (ex: Veterinário ou Ferreiro):");
    if(valor && !isNaN(valor)) {
        dadosFinanceiros = dadosFinanceiros.map(item => {
            if(item.id === id) item.extras += parseFloat(valor);
            return item;
        });
        localStorage.setItem('manejo_certo_financeiro', JSON.stringify(dadosFinanceiros));
        renderizarTabelaFinanceira();
    }
}

function inicializarPerfil() {
    const profileForm = document.getElementById('profile-form');
    if(profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomeHaras = document.getElementById('haras-name').value;
            const fotoUrl = document.getElementById('haras-avatar-url').value;
            
            document.getElementById('topbar-name').innerText = nomeHaras;
            if(fotoUrl) document.getElementById('topbar-avatar').src = fotoUrl;
            
            const perfilObj = { nome: nomeHaras, foto: fotoUrl, dono: document.getElementById('haras-owner').value };
            localStorage.setItem('manejo_certo_perfil', JSON.stringify(perfilObj));
            alert('Perfil do Haras atualizado!');
        });
    }
}

function carregarPerfilSalvo() {
    const perfilSalvo = JSON.parse(localStorage.getItem('manejo_certo_perfil'));
    if(perfilSalvo) {
        if(document.getElementById('haras-name')) document.getElementById('haras-name').value = perfilSalvo.nome;
        if(document.getElementById('haras-owner')) document.getElementById('haras-owner').value = perfilSalvo.dono;
        if(document.getElementById('haras-avatar-url')) document.getElementById('haras-avatar-url').value = perfilSalvo.foto;
        if(document.getElementById('topbar-name')) document.getElementById('topbar-name').innerText = perfilSalvo.nome;
        if(perfilSalvo.foto && document.getElementById('topbar-avatar')) document.getElementById('topbar-avatar').src = perfilSalvo.foto;
    }
}

function openHorseProfile(nomeCavalo) {
    switchTab('cavalos-section');
    document.getElementById('plantel-list-view').style.display = 'none';
    const fichaView = document.getElementById('ficha-individual-view');
    fichaView.style.display = 'block';
    document.getElementById('view-horse-name').innerText = `Ficha Técnica: ${nomeCavalo}`;
}

function closeHorseProfile() {
    document.getElementById('ficha-individual-view').style.display = 'none';
    document.getElementById('plantel-list-view').style.display = 'block';
}

window.onload = function() {
    inicializarAbas();
    inicializarPerfil();
    renderizarTabelaFinanceira();
    carregarPerfilSalvo();
};

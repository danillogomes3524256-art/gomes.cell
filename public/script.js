function ir(pagina) {
    if (pagina === 'dashboard') {
        document.getElementById('conteudo').innerHTML = `
            <div class="card">💰 Hoje: R$ 0</div>
            <div class="card">📆 Mês: R$ 0</div>
        `;
    }

    if (pagina === 'os') {
        document.getElementById('conteudo').innerHTML = `
            <div class="card">
                <input id="cliente" placeholder="Cliente"><br><br>
                <input id="aparelho" placeholder="Aparelho"><br><br>
                <input id="problema" placeholder="Problema"><br><br>
                <button onclick="criar()">Criar OS</button>
            </div>
        `;
    }

    if (pagina === 'financeiro') {
        document.getElementById('conteudo').innerHTML = `
            <div class="card">💵 Controle financeiro básico</div>
        `;
    }
}

async function criar() {
    const cliente = document.getElementById('cliente').value;
    const aparelho = document.getElementById('aparelho').value;
    const problema = document.getElementById('problema').value;

    await fetch('/os', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cliente, aparelho, problema, valor: 0, custo: 0})
    });

    alert("OS criada!");
}

ir('dashboard');

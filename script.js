function calcular() {
    const precoA = parseFloat(document.getElementById('precoA').value);
    const consumoA = parseFloat(document.getElementById('consumoA').value);
    const precoB = parseFloat(document.getElementById('precoB').value);
    const consumoB = parseFloat(document.getElementById('consumoB').value);

    const volumes = [1, 5, 10, 25, 50, 100, 250, 500, 1000];
    const corpoTabela = document.getElementById('corpoTabela');
    
    corpoTabela.innerHTML = '';

    let totalEconomiaA = 0;
    let totalEconomiaB = 0;

    volumes.forEach(volume => {
        const consumoTotalA = (consumoA * volume) / 1000;
        const custoA = consumoTotalA * precoA;
        
        const consumoTotalB = (consumoB * volume) / 1000;
        const custoB = consumoTotalB * precoB;
        
        const diferenca = custoA - custoB;
        const melhorOpcao = custoA < custoB ? 'Produto A' : custoB < custoA ? 'Produto B' : 'Empate';
        
        if (custoA < custoB) totalEconomiaA += Math.abs(diferenca);
        if (custoB < custoA) totalEconomiaB += Math.abs(diferenca);

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td style="font-weight: bold;">${volume}</td>
            <td class="produto-a">${(consumoA * volume).toFixed(1)} ml</td>
            <td class="produto-a">R$ ${custoA.toFixed(2)}</td>
            <td class="produto-b">${(consumoB * volume).toFixed(1)} ml</td>
            <td class="produto-b">R$ ${custoB.toFixed(2)}</td>
            <td class="economia ${diferenca > 0 ? 'pior' : diferenca < 0 ? 'melhor' : ''}">${diferenca > 0 ? '+' : ''}${diferenca.toFixed(2)}</td>
            <td class="${custoA < custoB ? 'melhor' : custoB < custoA ? 'pior' : ''}">${melhorOpcao}</td>
        `;
        corpoTabela.appendChild(linha);
    });

    const custoPorM3A = (consumoA / 1000) * precoA;
    const custoPorM3B = (consumoB / 1000) * precoB;

    document.getElementById('resumo').innerHTML = `
        <h3>Resumo da Análise</h3>
        <p><strong>Custo por m³:</strong></p>
        <p>• Produto A: R$ ${custoPorM3A.toFixed(4)}/m³ (${consumoA} ml/m³ × R$ ${precoA}/L)</p>
        <p>• Produto B: R$ ${custoPorM3B.toFixed(4)}/m³ (${consumoB} ml/m³ × R$ ${precoB}/L)</p>
        <p><strong>Diferença por m³:</strong> ${custoPorM3A < custoPorM3B ? 'Produto A é R$ ' + (custoPorM3B - custoPorM3A).toFixed(4) + ' mais barato' : 'Produto B é R$ ' + (custoPorM3A - custoPorM3B).toFixed(4) + ' mais barato'}</p>
        <p><strong>Economia percentual:</strong> ${(Math.abs(custoPorM3A - custoPorM3B) / Math.max(custoPorM3A, custoPorM3B) * 100).toFixed(1)}%</p>
    `;
}

// Calcular automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', calcular);
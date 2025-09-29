// Dados da Reforma Tributária
const reformaData = {
    aliquotas: {
        cbs_padrao: 8.8,
        ibs_padrao: 17.7,
        total_padrao: 26.5
    },
    regimes: {
        padrao: { cbs: 8.8, ibs: 17.7, seletivo: 0 },
        educacao: { cbs: 4.4, ibs: 8.85, seletivo: 0 },
        saude: { cbs: 4.4, ibs: 8.85, seletivo: 0 },
        transporte: { cbs: 4.4, ibs: 8.85, seletivo: 0 },
        prouni: { cbs: 0, ibs: 0, seletivo: 0 },
        medicamentos: { cbs: 0, ibs: 0, seletivo: 0 },
        cesta_basica: { cbs: 0, ibs: 0, seletivo: 0 },
        tabaco: { cbs: 8.8, ibs: 17.7, seletivo: 30 },
        bebidas: { cbs: 8.8, ibs: 17.7, seletivo: 15 }
    },
    exemplos_praticos: [
        {
            setor: "Tecnologia",
            produto: "Software",
            valor: 100000,
            regime: "padrao",
            descricao: "Desenvolvimento de software empresarial"
        },
        {
            setor: "Educação",
            produto: "Curso Superior",
            valor: 5000,
            regime: "educacao",
            descricao: "Mensalidade de curso superior privado"
        },
        {
            setor: "Saúde",
            produto: "Consulta Médica",
            valor: 500,
            regime: "saude",
            descricao: "Consulta médica particular"
        },
        {
            setor: "Alimentação",
            produto: "Cesta Básica",
            valor: 200,
            regime: "cesta_basica",
            descricao: "Produtos da cesta básica essencial"
        },
        {
            setor: "Tabaco",
            produto: "Cigarros",
            valor: 20,
            regime: "tabaco",
            descricao: "Maço de cigarros com imposto seletivo"
        },
        {
            setor: "Bebidas",
            produto: "Bebida Alcoólica",
            valor: 50,
            regime: "bebidas",
            descricao: "Garrafa de bebida alcoólica"
        }
    ]
};

// Função para formatar valores monetários
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Função para formatar percentual
function formatPercent(value) {
    return value.toFixed(1) + '%';
}

// Navegação entre seções
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and target section
            button.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Execute section-specific initialization
            switch(targetSection) {
                case 'simulator':
                    setTimeout(() => {
                        initializeSimulator();
                    }, 100);
                    break;
                case 'cash-management':
                    setTimeout(() => {
                        initializeCashManagement();
                    }, 100);
                    break;
                case 'glossary':
                    setTimeout(() => {
                        initializeGlossary();
                    }, 100);
                    break;
            }
        });
    });
}

// Inicializar simulador
function initializeSimulator() {
    // Calcular simulação inicial
    calcularSimulacao();
    
    // Renderizar exemplos práticos
    renderExamples();
    
    // Adicionar event listeners
    const valorOperacao = document.getElementById('valorOperacao');
    const setorCategoria = document.getElementById('setorCategoria');
    
    if (valorOperacao && !valorOperacao.dataset.listenerAdded) {
        valorOperacao.addEventListener('input', calcularSimulacao);
        valorOperacao.dataset.listenerAdded = 'true';
    }
    
    if (setorCategoria && !setorCategoria.dataset.listenerAdded) {
        setorCategoria.addEventListener('change', calcularSimulacao);
        setorCategoria.dataset.listenerAdded = 'true';
    }
}

// Função principal de cálculo do simulador
function calcularSimulacao() {
    const valorOperacaoInput = document.getElementById('valorOperacao');
    const setorCategoriaSelect = document.getElementById('setorCategoria');
    
    if (!valorOperacaoInput || !setorCategoriaSelect) {
        console.log('Elementos do simulador não encontrados');
        return;
    }
    
    const valorOperacao = parseFloat(valorOperacaoInput.value) || 100000;
    const setorCategoria = setorCategoriaSelect.value || 'padrao';
    
    const regime = reformaData.regimes[setorCategoria];
    if (!regime) {
        console.log('Regime não encontrado:', setorCategoria);
        return;
    }
    
    // Calcular tributos
    const cbsValue = valorOperacao * (regime.cbs / 100);
    const ibsValue = valorOperacao * (regime.ibs / 100);
    const seletivoValue = valorOperacao * (regime.seletivo / 100);
    const totalTributos = cbsValue + ibsValue + seletivoValue;
    const valorLiquido = valorOperacao - totalTributos;
    
    // Calcular percentuais
    const cbsRate = regime.cbs;
    const ibsRate = regime.ibs;
    const seletivoRate = regime.seletivo;
    const totalRate = cbsRate + ibsRate + seletivoRate;
    
    // Atualizar interface
    updateSimulatorResults({
        cbsValue,
        ibsValue,
        seletivoValue,
        totalTributos,
        valorLiquido,
        cbsRate,
        ibsRate,
        seletivoRate,
        totalRate
    });
}

// Atualizar resultados do simulador
function updateSimulatorResults(results) {
    const elements = {
        cbsValue: document.getElementById('cbsValue'),
        ibsValue: document.getElementById('ibsValue'),
        selectiveValue: document.getElementById('selectiveValue'),
        totalTributos: document.getElementById('totalTributos'),
        valorLiquido: document.getElementById('valorLiquido'),
        cbsRate: document.getElementById('cbsRate'),
        ibsRate: document.getElementById('ibsRate'),
        selectiveRate: document.getElementById('selectiveRate'),
        totalRate: document.getElementById('totalRate')
    };
    
    if (elements.cbsValue) elements.cbsValue.textContent = formatCurrency(results.cbsValue);
    if (elements.ibsValue) elements.ibsValue.textContent = formatCurrency(results.ibsValue);
    if (elements.selectiveValue) elements.selectiveValue.textContent = formatCurrency(results.seletivoValue);
    if (elements.totalTributos) elements.totalTributos.textContent = formatCurrency(results.totalTributos);
    if (elements.valorLiquido) elements.valorLiquido.textContent = formatCurrency(results.valorLiquido);
    if (elements.cbsRate) elements.cbsRate.textContent = formatPercent(results.cbsRate);
    if (elements.ibsRate) elements.ibsRate.textContent = formatPercent(results.ibsRate);
    if (elements.selectiveRate) elements.selectiveRate.textContent = formatPercent(results.seletivoRate);
    if (elements.totalRate) elements.totalRate.textContent = formatPercent(results.totalRate);
}

// Renderizar exemplos práticos
function renderExamples() {
    const examplesGrid = document.getElementById('examplesGrid');
    if (!examplesGrid) return;
    
    examplesGrid.innerHTML = '';
    
    reformaData.exemplos_praticos.forEach(exemplo => {
        const regime = reformaData.regimes[exemplo.regime];
        const cbsValue = exemplo.valor * (regime.cbs / 100);
        const ibsValue = exemplo.valor * (regime.ibs / 100);
        const seletivoValue = exemplo.valor * (regime.seletivo / 100);
        const totalTributos = cbsValue + ibsValue + seletivoValue;
        const valorLiquido = exemplo.valor - totalTributos;
        
        let regimeLabel;
        if (regime.cbs === 0 && regime.ibs === 0) {
            regimeLabel = 'Isenção Total';
        } else if (regime.cbs === 4.4) {
            regimeLabel = 'Redução 50%';
        } else if (regime.seletivo > 0) {
            regimeLabel = 'Com Seletivo';
        } else {
            regimeLabel = 'Padrão';
        }
        
        const exampleCard = document.createElement('div');
        exampleCard.className = 'example-card';
        exampleCard.innerHTML = `
            <div class="example-header">
                <h3 class="example-title">${exemplo.setor} - ${exemplo.produto}</h3>
                <span class="example-regime">${regimeLabel}</span>
            </div>
            <div class="example-values">
                <div class="example-value">
                    <span>Valor Base:</span>
                    <span>${formatCurrency(exemplo.valor)}</span>
                </div>
                <div class="example-value">
                    <span>CBS (${formatPercent(regime.cbs)}):</span>
                    <span>${formatCurrency(cbsValue)}</span>
                </div>
                <div class="example-value">
                    <span>IBS (${formatPercent(regime.ibs)}):</span>
                    <span>${formatCurrency(ibsValue)}</span>
                </div>
                ${regime.seletivo > 0 ? `
                    <div class="example-value">
                        <span>Seletivo (${formatPercent(regime.seletivo)}):</span>
                        <span>${formatCurrency(seletivoValue)}</span>
                    </div>
                ` : ''}
                <div class="example-value example-total">
                    <span>Valor Líquido:</span>
                    <span><strong>${formatCurrency(valorLiquido)}</strong></span>
                </div>
            </div>
        `;
        
        examplesGrid.appendChild(exampleCard);
    });
}

// Inicializar Cash Management
function initializeCashManagement() {
    const faturamentoInput = document.getElementById('faturamentoMensal');
    const setorSelect = document.getElementById('setorPrincipal');
    
    if (faturamentoInput && !faturamentoInput.dataset.listenerAdded) {
        faturamentoInput.addEventListener('input', calcularImpactoFluxo);
        faturamentoInput.dataset.listenerAdded = 'true';
    }
    
    if (setorSelect && !setorSelect.dataset.listenerAdded) {
        setorSelect.addEventListener('change', calcularImpactoFluxo);
        setorSelect.dataset.listenerAdded = 'true';
    }
    
    // Calcular impacto inicial
    calcularImpactoFluxo();
}

// Calcular impacto no fluxo de caixa
function calcularImpactoFluxo() {
    const faturamentoInput = document.getElementById('faturamentoMensal');
    const setorSelect = document.getElementById('setorPrincipal');
    
    if (!faturamentoInput || !setorSelect) {
        console.log('Elementos do Cash Management não encontrados');
        return;
    }
    
    const faturamento = parseFloat(faturamentoInput.value) || 1000000;
    const setor = setorSelect.value || 'tecnologia';
    
    // Sistema atual (estimativa)
    const pisCofinsCurrent = faturamento * 0.0925; // 9,25%
    const icmsIssCurrent = faturamento * 0.18; // 18%
    const totalCurrent = pisCofinsCurrent + icmsIssCurrent;
    
    // Novo sistema
    let regime = reformaData.regimes.padrao;
    if (setor === 'educacao' || setor === 'saude') {
        regime = reformaData.regimes[setor];
    }
    
    const cbsNew = faturamento * (regime.cbs / 100);
    const ibsNew = faturamento * (regime.ibs / 100);
    const totalNew = cbsNew + ibsNew;
    
    // Impacto
    const impactValue = totalNew - totalCurrent;
    const impactPercent = (impactValue / totalCurrent) * 100;
    
    // Atualizar interface
    updateCashManagementResults({
        pisCofinsCurrent,
        icmsIssCurrent,
        totalCurrent,
        cbsNew,
        ibsNew,
        totalNew,
        impactValue,
        impactPercent
    });
    
    // Mostrar resultados
    const impactResults = document.getElementById('impactResults');
    if (impactResults) {
        impactResults.style.display = 'block';
    }
}

// Atualizar resultados do Cash Management
function updateCashManagementResults(results) {
    const elements = {
        pisCofinsCurrent: document.getElementById('pisCofinsCurrent'),
        icmsIssCurrent: document.getElementById('icmsIssCurrent'),
        totalCurrent: document.getElementById('totalCurrent'),
        cbsNew: document.getElementById('cbsNew'),
        ibsNew: document.getElementById('ibsNew'),
        totalNew: document.getElementById('totalNew'),
        impactValue: document.getElementById('impactValue')
    };
    
    if (elements.pisCofinsCurrent) elements.pisCofinsCurrent.textContent = formatCurrency(results.pisCofinsCurrent);
    if (elements.icmsIssCurrent) elements.icmsIssCurrent.textContent = formatCurrency(results.icmsIssCurrent);
    if (elements.totalCurrent) elements.totalCurrent.textContent = formatCurrency(results.totalCurrent);
    if (elements.cbsNew) elements.cbsNew.textContent = formatCurrency(results.cbsNew);
    if (elements.ibsNew) elements.ibsNew.textContent = formatCurrency(results.ibsNew);
    if (elements.totalNew) elements.totalNew.textContent = formatCurrency(results.totalNew);
    
    if (elements.impactValue) {
        const impactAmount = elements.impactValue.querySelector('.impact-amount');
        const impactPercentage = elements.impactValue.querySelector('.impact-percentage');
        
        if (impactAmount) {
            impactAmount.textContent = formatCurrency(results.impactValue);
            // Inverter as classes: valores negativos são positivos (redução de tributos)
            if (results.impactValue < 0) {
                impactAmount.style.color = 'var(--color-success)';
            } else {
                impactAmount.style.color = 'var(--color-error)';
            }
        }
        
        if (impactPercentage) {
            impactPercentage.textContent = (results.impactPercent > 0 ? '+' : '') + formatPercent(Math.abs(results.impactPercent));
            if (results.impactValue < 0) {
                impactPercentage.style.color = 'var(--color-success)';
            } else {
                impactPercentage.style.color = 'var(--color-error)';
            }
        }
    }
}

// Inicializar seção de glossário (FAQ)
function initializeGlossary() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        if (!question.dataset.listenerAdded) {
            question.addEventListener('click', () => {
                toggleFaq(question);
            });
            question.dataset.listenerAdded = 'true';
        }
    });
}

// Toggle FAQ - Função corrigida
function toggleFaq(questionElement) {
    const faqItem = questionElement.closest('.faq-item');
    if (!faqItem) return;
    
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os outros FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Se não estava ativo, ativar
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Função para criar gráfico (se necessário)
function createImpactChart() {
    const canvas = document.getElementById('impactChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sistema Atual', 'Novo Sistema (IVA Dual)'],
            datasets: [{
                label: 'Carga Tributária (%)',
                data: [27.25, 26.5],
                backgroundColor: ['#FFC185', '#1FB8CD'],
                borderColor: ['#FFC185', '#1FB8CD'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparação de Carga Tributária'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 30,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Função para scroll suave (se necessário)
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para adicionar animações de entrada
function addEntryAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.card, .concept-card, .iva-card, .regime-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função para destacar elementos com valor alto
function highlightHighValues() {
    const valueElements = document.querySelectorAll('.result-value');
    
    valueElements.forEach(element => {
        const text = element.textContent;
        const numericValue = parseFloat(text.replace(/[^\d.-]/g, ''));
        
        if (numericValue > 10000) {
            element.classList.add('high-value');
        }
    });
}

// Função para atualizar data atual
function updateCurrentDate() {
    const dateElements = document.querySelectorAll('.current-date');
    const now = new Date();
    const formatted = now.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    dateElements.forEach(element => {
        element.textContent = formatted;
    });
}

// Função de busca (se implementada)
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) return;
        
        // Implementar lógica de busca nos termos do glossário
        const glossaryItems = document.querySelectorAll('.glossary-item');
        
        glossaryItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || content.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Função para exportar dados (se implementada)
function exportCalculation() {
    const valorOperacao = document.getElementById('valorOperacao')?.value || '100000';
    const setorCategoria = document.getElementById('setorCategoria')?.value || 'padrao';
    
    const data = {
        valor: valorOperacao,
        setor: setorCategoria,
        timestamp: new Date().toISOString(),
        // Adicionar mais dados conforme necessário
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculo-reforma-tributaria.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Função para imprimir resultados
function printResults() {
    const printContent = document.querySelector('.simulator-results');
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Simulação Reforma Tributária</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .result-card { margin: 10px 0; padding: 15px; border: 1px solid #ddd; }
                    .result-value { font-size: 18px; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Simulação Reforma Tributária - IVA Dual</h1>
                ${printContent.innerHTML}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando aplicação Reforma Tributária...');
    
    // Inicializar navegação
    initializeNavigation();
    
    // Inicializar tema
    initializeTheme();
    
    // Inicializar seção ativa (Overview)
    setTimeout(() => {
        initializeSimulator();
        initializeCashManagement();
        initializeGlossary();
    }, 200);
    
    // Adicionar animações
    setTimeout(addEntryAnimations, 300);
    
    // Atualizar data atual
    updateCurrentDate();
    
    // Inicializar busca se existir
    initializeSearch();
    
    console.log('Aplicação inicializada com sucesso!');
});

// Função para inicializar o sistema de temas
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    // Event listener para o botão de alternância
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            // Salvar preferência no localStorage
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Event listener para redimensionamento
window.addEventListener('resize', function() {
    // Reagir a mudanças de tamanho se necessário
});

// Função para debug (remover em produção)
function debugApp() {
    console.log('Estado da aplicação:', {
        reformaData,
        activeSection: document.querySelector('.section.active')?.id,
        simulatorValues: {
            valor: document.getElementById('valorOperacao')?.value,
            setor: document.getElementById('setorCategoria')?.value
        },
        currentTheme: document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    });
}

// Expor funções globais necessárias
window.calcularSimulacao = calcularSimulacao;
window.calcularImpactoFluxo = calcularImpactoFluxo;
window.toggleFaq = toggleFaq;
window.exportCalculation = exportCalculation;
window.printResults = printResults;
window.debugApp = debugApp;
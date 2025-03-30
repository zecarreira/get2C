O Carbon Footprint Tracker é uma aplicação que extrai e visualiza dados de emissões de carbono a partir de ficheiros Excel.
Calcula indicadores-chave e apresenta-os num painel interativo.

Principais Funcionalidades
Upload e processamento de ficheiros Excel
Cálculo de indicadores essenciais:

Total de emissões de CO₂

Consumo médio de energia por empresa

Top 5 empresas com maiores emissões
Gráficos interativos para melhor visualização

Tecnologias Utilizadas
Next.js com TypeScript (Frontend + Backend)
Chart.js + react-chartjs-2 (Visualização de dados)
xlsx.js (Processamento de ficheiros Excel)
Tailwind CSS (Estilização rápida e eficiente)

Processamento de Dados
Cliente-Side: O processamento ocorre diretamente no navegador para garantir privacidade e reduzir a complexidade do backend.
Passos: Upload → Leitura e extração de dados → Normalização → Cálculo de métricas → Apresentação em gráficos.

Porque estas tecnologias?
Next.js → Código unificado (frontend/backend), otimização de desempenho e facilidade de implementação.
Processamento no cliente → Dados privados, menor custo de servidor e resposta imediata.
Chart.js → Leve, flexível e responsivo.
Tailwind CSS → Desenvolvimento rápido e eficiente.

########################

Requisitos:

- Node.js (Versão 18 ou superior)

Passos:

- git clone https://github.com/zecarreira/get2C.git
- cd carbon-footprint-tracker
- npm install
- npm run dev
- Browser -> http://localhost:3000

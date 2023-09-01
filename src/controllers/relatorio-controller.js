const gerarRelatorioProdutos = (produtos) => {

    // Obter os dados dos produtos
    const produtosVendidos = produtos.filter((produto) => produto.quantidade > 0);
  
    // Calcular os ganhos totais
    const ganhosTotais = produtosVendidos.reduce((a, b) => a + b.preco);
  
    // Calcular a quantidade de produtos vendidos
    const quantidadeProdutosVendidos = produtosVendidos.length;
  
    // Gerar o relatório
    const relatorio = {
      "ganhos_totais": ganhosTotais,
      "quantidade_produtos_vendidos": quantidadeProdutosVendidos
    };
  
    return relatorio;
  };

  const gerarRelatorioServicos = (agendamentos) => {

    // Obter os dados dos serviços
    const servicosRealizados = agendamentos.filter((agendamento) => agendamento.status === "Realizado");
  
    // Calcular os ganhos totais
    const ganhosTotais = servicosRealizados.reduce((a, b) => a + b.preco);
  
    // Calcular a quantidade de serviços realizados
    const quantidadeServicosRealizados = servicosRealizados.length;
  
    // Gerar o relatório
    const relatorio = {
      "ganhos_totais": ganhosTotais,
      "quantidade_servicos_realizados": quantidadeServicosRealizados
    };
  
    return relatorio;
  };
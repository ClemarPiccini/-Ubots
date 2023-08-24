function formatarData(data) {
    const dataCriacao = new Date(data);
    const opcoesFormato = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const dataFormatada = dataCriacao.toLocaleDateString('pt-BR', opcoesFormato);
  
    return dataFormatada;
  }
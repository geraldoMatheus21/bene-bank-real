const conta = {
  nome: 'Geraldo Matheus Garcia',
  cpf: '123.456.789-00',
  dataNascimento: '21/11/1999',
  email: 'geraldo.garcia@example.com',
  senha: 'senha123'
};

export const api = new Promise((resolve) => {
    setTimeout(() => {
        resolve(conta);
    }, 3000);
});
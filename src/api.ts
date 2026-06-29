export interface Conta {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  senha: string;
}

// Lista inicial de usuários (apenas o Geraldo)
const usuarios: Conta[] = [
  {
    nome: 'Geraldo Matheus Garcia',
    cpf: '13629802770',
    dataNascimento: '21/11/1999',
    email: 'geraldo.garcia@example.com',
    senha: 'B3n#$in1999'
  }
];

// Simula uma chamada de cadastro (2 segundos)
export const cadastrar = (dados: Conta): Promise<{ sucesso: boolean }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existe = usuarios.find(u => u.cpf.replace(/\D/g, '') === dados.cpf.replace(/\D/g, ''));
      if (existe) {
        reject(new Error('CPF já cadastrado.'));
      } else {
        usuarios.push(dados);
        resolve({ sucesso: true });
      }
    }, 2000);
  });
};

// Simula uma chamada de login (1 segundo)
export const loginAPI = (cpf: string, senha: string): Promise<Conta> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuario = usuarios.find(
        u => u.cpf.replace(/\D/g, '') === cpf.replace(/\D/g, '') && u.senha === senha
      );
      if (usuario) {
        resolve(usuario);
      } else {
        reject(new Error('CPF ou senha inválidos.'));
      }
    }, 1000);
  });
};
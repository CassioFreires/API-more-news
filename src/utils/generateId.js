const generateId = (comprimento) => {
    // Define os caracteres que podem ser usados no ID
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  // Inicializa a variável para armazenar o ID
  let id = '';
  
  // Adiciona o timestamp ao ID
  id += Date.now().toString(36);

  // Gera caracteres aleatórios até atingir o comprimento desejado
  for (let i = id.length; i < comprimento; i++) {
    id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  
  return id;
}

export {
    generateId
}
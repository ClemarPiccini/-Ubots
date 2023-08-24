const User = require('../models/admin/user');

// Função para criar um novo usuário
async function createUser(user) {
   try {
    user = await User.create({ ...user })
    return user.toJSON();
   } catch (error) {
     console.error('Não foi possível criar o usuário: ', error);
   }
}

// Função para buscar todos os usuários
async function getAllUsers() {
  try {
    users = await User.findAll();
    return users.map(user => user.toJSON())
  } catch (error) {
    console.error('Não foi possível buscar os usuários: ', error);
  }
}

// Função para atualizar um usuário existente
async function updateUser(id, user) {
  try {
    const existingUser = await User.findByPk(id);
    if (existingUser) {
      Object.keys(user).forEach(key => {
        if (user[key]) {
          existingUser[key] = user[key];
        }
      });
      await existingUser.save();
      console.log('Usuário atualizado: ', existingUser.toJSON());
      return existingUser;
    } else {
      console.log('Usuário não encontrado');
      return null;
    }
  } catch (error) {
    console.error('Não foi possível atualizar o usuário: ', error);
    throw error;
  }
}

// Função para excluir um usuário existente
async function deleteUser(id) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      console.log('Usuário excluído: ', user.toJSON());
    } else {
      console.log('Usuário não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir o usuário: ', error);
  }
  }
  
 // Função para verificar email no banco de dados
async function getUserByEmail(email) {
    const user = await User.findOne({where: { email: email }});
    return user;
  }

//Função para comparar senha no banco de dados
async function comparePassword(senha, password) {
  try {
    return senha === password;
  } catch (error) {
    throw new Error('Erro ao comparar senhas');
  }
}

module.exports = { createUser, getAllUsers, updateUser, deleteUser, getUserByEmail, comparePassword};
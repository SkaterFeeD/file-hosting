<template>
  <div class="register-page">
    <form class="register-form" @submit.prevent="signUp" method="post">
      <header>
        <h2>Registration</h2>
      </header>
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" id="first_name" v-model="firstName" placeholder="Введите имя" required>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" v-model="lastName" placeholder="Введите фамилию" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Введите email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Введите пароль" required>
      </div>
      <div class="button-group">
        <button type="submit" class="register-button">Регистрация</button>
        <router-link to="/login" class="login-button">Вернуться к авторизации</router-link>
      </div>
    </form>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>
<script>

import axios from 'axios';
export default {
  name: 'RegisterPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async signUp() {
      try {
        const url = 'http://file-hosting.ru/api-file/registration';
        const response = await axios.post(url, {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 201 && response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.$router.push('/user-files');
        } else {
          console.error('Ошибка регистрации: Не удалось получить токен пользователя.');
        }
      } catch (error) {
        this.errorMessage = 'Ошибка регистрации. Попробуйте снова.';
        console.error('Ошибка регистрации:', error);
      }
    }
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #6b2737;
}
.register-form {
  width: 300px;
  background-color: #a93e55;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
h2 {
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  color: #fff;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;
}
.button-group {
  display: flex;
  justify-content: space-between;
}
button {
  width: calc(50% - 5px);
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f3a0ae;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #ff6b7a;
}
.login-button {
  display: inline-block;
  width: calc(50% - 5px);
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f3a0ae;
  color: #fff;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
}
.login-button:hover {
  background-color: #ff6b7a;
}
</style>
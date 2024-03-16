<template>
  <home-view>
    <div class="edit-file">
      <h2>Редактирование файла</h2>
      <form @submit.prevent="renameFile">
        <label>Новое название файла:</label>
        <input type="text" v-model="newFileName">
        <button type="submit">Сохранить</button>
      </form>
      <div v-if="errorMessage" class="message">{{ errorMessage }}</div>
    </div>
  </home-view>
</template>

<script>
import axios from 'axios';
import HomeView from "@/views/HomeView.vue";
export default {
  components: {HomeView},
  data() {
    return {
      newFileName: '',
      errorMessage: '',
      fileId: this.$route.params.id // значение к fileId
    };
  },
  methods: {
    handleFileChange(event) {
      this.files = event.target.files;
    },
    async renameFile() {
      try {
        const response = await axios.patch(`http://file-hosting.ru/api-file/files/${this.fileId}`,
            { name: this.newFileName },
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,},});
        // обработка изменения имени файла
        console.log('File renamed successfully:', response.data);
        this.$router.push('/user-files');
      } catch (error) {
        // обработка ошибок
        console.error('Error renaming file:', error);
        this.errorMessage = 'Error renaming file';
      }
    }
  }
};
</script>
<style scoped>
.edit-file {
  height: 80vh;
  background-color: #6b2737;
  color: #fff;
  padding: 20px;
}
.edit-file form {
  margin: 0 auto;
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
label {
  color: #fff;
}
input[type="text"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;
}
button[type="submit"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f3a0ae;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}
button[type="submit"]:hover {
  background-color: #ff6b7a;
}
.message {
  text-align: center;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}
</style>
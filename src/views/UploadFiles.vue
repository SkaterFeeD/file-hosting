<template>
  <home-view>
    <div class="upload-files">
      <h2>Загрузите файл</h2>
      <div class="upload">
        <input type="file" ref="fileInput" multiple @change="handleFileChange">
        <button @click="uploadFiles">Загрузить файл</button>
        <div v-if="errorMessage">{{ errorMessage }}</div>
      </div>
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
      files: [],
      errorMessage: '',
    };
  },
  methods: {
    handleFileChange(event) {
      this.files = event.target.files;
      // сброс флага при изменении списка файлов
    },
    async uploadFiles() {
      const formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files[]', this.files[i]);
      }
      try {
        const response = await axios.post('http://file-hosting.ru/api-file/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        // обработка успешной загрузки файлов
        console.log('Файлы успешно обновлены:', response.data);
        this.$router.push('/user-files');
      } catch (error) {
        // обработка ошибок при загрузке файлов
        this.errorMessage = 'Ошибка обновлления файла. Повторите снова';
        console.error('Ошибка обновления файлов:', error);
      }
    }
  }
};
</script>

<style scoped>
.upload-files {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #6b2737;
  color: #fff;
  height: 70vh;
}
h2 {
  color: White;
  text-align: center;
  text-transform: uppercase;
}
.upload {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #a93e55;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  min-width: 500px;
  width: max-content;
  margin-top: 20px;
}
.success-message{
  text-align: center;
  margin-top: 5px;
  padding: 5px;
}
h2 {
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
}
label {
  color: #fff;
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
</style>
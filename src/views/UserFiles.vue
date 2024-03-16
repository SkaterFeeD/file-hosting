<template>
 <home-view>
   <div class="user-file-page">
     <h2>Ваши файлы</h2>
     <div class="file-list">
       <div v-for="file in files" :key="file.id" class="file-item">
         <span>{{ file.name }}</span>
         <button type="button" @click="downloadFile(file.file_id,file.name)">Скачивание</button>
         <button @click="editFile(file.file_id)">Редактирование</button>
         <button @click="deleteFile(file.file_id)">Удаление</button>
         <div>
           <!-- перенаправляемся на страницу "/user-files" -->
           <router-link :to="`/file-permissions/${file.file_id}/accesses`" class="button-link">
             Поделится доступом
           </router-link>
         </div>
       </div>
     </div>
   </div>
 </home-view>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import HomeView from "@/views/HomeView.vue";
export default {
  components: {HomeView},
  data() {
    return {
      files: [],
    };
  },
  mounted() {
    this.fetchFiles();
  },
  created() {
    // установить fileId при создании компонента
    this.fileId = this.$route.params.fileId;
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get('http://file-hosting.ru/api-file/file/disk', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.files = response.data;
      } catch (error) {
        // ошибка авторизации - переход на страницу логина
        if (error.response && error.response.status === 401) {
          router.push('/login');
        } else {
          router.push('/login');
          console.error('Ошибка получения файлов:', error);
        }
      }
    },
    async downloadFile(fileId, fileName) {
      try {
        // запрос для скачивания файла
        const response = await axios.get(`http://file-hosting.ru/api-file/files/${fileId}`, {
          responseType: 'blob', headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // ссылка для скачивания файла
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        // скачивание файла
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Ошибка скачивания файла:', error);
      }
    },
    async deleteFile(fileId) {
      try {
        await axios.delete(`http://file-hosting.ru/api-file/files/${fileId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // обновляем список файлов после удаления
        this.fetchFiles();
      } catch (error) {
        console.error('Ошибка удаления файла:', error);
      }
    },
    editFile(fileId) {
      this.$router.push({ name: 'EditFile', params: { id: fileId } });
    },
  },
};
</script>
<style scoped>
.user-file-page {
  padding: 20px;
  background-color: #6b2737;
  color: #fff;
  height: 90vh;
}
h2 {
  color: White;
  text-align: center;
  text-transform: uppercase;
}
.file-list {
  margin-top: 20px;
}
.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: #944153;
  border-radius: 5px;
  margin-bottom: 10px;
}
.file-item span {
  flex: 1;
}
.button-link {
  display: inline-block;
  padding: 10px;
  background-color: #f3a0ae;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.button-link:hover {
  background-color: #ff6b7a;
}
</style>
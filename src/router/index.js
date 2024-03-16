import { createRouter, createWebHashHistory } from 'vue-router'
import Registration from '../views/RegistrationPage.vue'
import Login from '../views/LoginPage.vue'
import UserFiles from '../views/UserFiles.vue'
import SharedFiles from '../views/SharedFiles.vue'
import EditFile from '../views/EditFile.vue'
import FilePermissions from '../views/FilePermissions.vue'
import UploadFiles from '../views/UploadFiles.vue'


const routes = [
  { path: '/registration', component: Registration },
  { path: '/login', component: Login },
  { path: '/user-files', component: UserFiles },
  { path: '/shared-files', component: SharedFiles },
  { path: '/edit-file/:id', name: 'EditFile', component: EditFile, props: true },
  { path: '/file-permissions/:fileId/accesses', component: FilePermissions},
  { path: '/upload-files', component: UploadFiles },
  { path: '/', redirect: '/user-files' }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router

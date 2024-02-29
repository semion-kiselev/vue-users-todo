<script setup lang="ts">
import { useUsers } from '@/users/api-hooks/use-users'
import { USER_CREATE_PAGE, USER_UPDATE_PAGE } from '@/@common/constants/route-names'
import { RouterLink } from 'vue-router'
import { useUserDelete } from '@/users/api-hooks/use-user-delete'
import { useUserContext } from '@/auth/composables/contexts/user'
import PermissionGuard from '@/auth/components/permission-guard.vue'
import { Permission } from '@/auth/types'

const { data: user } = useUserContext()

const {
  data,
  isLoading: areUsersLoading,
  isRefetching: areUsersRefetching,
  isError: isUsersLoadingError
} = useUsers()

const { mutate: removeUser, isPending: isUserRemovePending } = useUserDelete()

const handleUserDelete = (id: number) => {
  removeUser({ id })
}
</script>

<template>
  <h1 class="flex justify-between">
    <span>Users</span>
    <PermissionGuard :access-permissions="[Permission.UM]" :user-permissions="user?.permissions">
      <RouterLink class="text-blue-700 font-bold" :to="{ name: USER_CREATE_PAGE }">
        Create
      </RouterLink>
    </PermissionGuard>
  </h1>
  <div v-if="isUserRemovePending">Removing user...</div>
  <div v-if="areUsersRefetching">Refreshing users...</div>

  <div v-if="areUsersLoading">Loading users...</div>
  <div v-else-if="isUsersLoadingError">Could not load users</div>
  <div v-else-if="data">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>permissions</th>
          <PermissionGuard
            :access-permissions="[Permission.UM]"
            :user-permissions="user?.permissions"
          >
            <th>actions</th>
          </PermissionGuard>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.permissions }}</td>
          <PermissionGuard
            :access-permissions="[Permission.UM]"
            :user-permissions="user?.permissions"
          >
            <td>
              <div class="flex gap-2">
                <RouterLink
                  class="text-blue-700 font-bold"
                  :to="{ name: USER_UPDATE_PAGE, params: { id: item.id } }"
                >
                  Update
                </RouterLink>
                <button class="text-red-800 font-bold" @click="handleUserDelete(item.id)">
                  Del
                </button>
              </div>
            </td>
          </PermissionGuard>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
th {
  text-align: left;
}
td {
  min-width: 150px;
}
</style>

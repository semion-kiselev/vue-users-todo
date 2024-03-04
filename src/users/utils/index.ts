import type {Ref} from "vue";
import type {PermissionItem} from "@/auth/types";

export const getPermissionsOptions = (permissions: Ref<PermissionItem[] | undefined>) => {
  if (!permissions.value) return []
  return permissions.value.map(({ id, name }) => ({ label: name, value: id }))
}

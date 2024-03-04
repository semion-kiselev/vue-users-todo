export const userFormSchema = [
  {
    $formkit: 'text',
    name: 'name',
    label: 'Name',
    validation: 'required|length:2,255',
  },
  {
    $formkit: 'email',
    name: 'email',
    label: 'Email',
    validation: 'required|email|length:0,255',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required|length:8,72',
  },
  {
    $formkit: 'select',
    name: 'permissions',
    multiple: true,
    options: '$permissionsOptions',
    validation: 'required',
  }
]

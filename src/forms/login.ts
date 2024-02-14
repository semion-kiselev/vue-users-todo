export const loginFormSchema = [
  {
    $formkit: 'email',
    name: 'email',
    label: 'Email Address',
    validation: 'required',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required',
  },
];

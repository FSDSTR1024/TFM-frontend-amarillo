import { useForm } from 'react-hook-form'
import './RegisterForm.css'

const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const requiredMessage = 'Este campo es obligatorio';

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="register-form">
      <h1>Bienvenido a Whiz. Donde las ideas vuelan rápido</h1>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Nombre de usuario(el nombre de usuario es con el que otros usuarios te identificaran):
        </label>
        <input type="text" placeholder="Nombre de usuario" {...register("username", { required: { value: true, message: requiredMessage }, minLength: { value: 4, message: 'El nombre de usuario debe tener al menos 4 caracteres' } })} />
        {formState.errors.username && <p className="error">{formState.errors.username.message}</p>}

        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Email" {...register("email", { required: { value: true, message: requiredMessage } })} />
        {formState.errors.email && <p className="error">{formState.errors.email.message}</p>}

        <label htmlFor="password">Contraseña:</label>
        <input type="password" placeholder="Contraseña" {...register("password", { required: { value: true, message: requiredMessage } })} />
        {formState.errors.password && <p className="error">{formState.errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
        <input type="password" placeholder="Confirmar contraseña" {...register("confirmPassword", { required: { value: true, message: requiredMessage } })} />
        {formState.errors.confirmPassword && <p className="error">{formState.errors.confirmPassword.message}</p>}

        <label htmlFor="name">Nombre(tu nombre real, solo se mostrará en tu perfil si lo deseas)</label>
        <input type="text" placeholder="Nombre" {...register("name", { required: { value: true, message: requiredMessage } })} />
        {formState.errors.name && <p className="error">{formState.errors.name.message}</p>}

        <label htmlFor="surname">Apellido:</label>
        <input type="text" placeholder="Apellido" {...register("surname", { required: { value: true, message: requiredMessage } })} />
        {formState.errors.surname && <p className="error">{formState.errors.surname.message}</p>}

        <button type="submit">Registrarte</button>
      </form>
    </div>
  )
}

export default RegisterForm
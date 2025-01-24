import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './LoginForm.css'

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const requiredMessage = 'Este campo es obligatorio';

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login-form">
      <h1>Bienvenido a Whiz. Donde las ideas vuelan rápido</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          placeholder="Nombre de usuario o email"
          {...register("username", {
            required: { value: true, message: requiredMessage },
            minLength: { value: 4, message: 'El nombre de usuario debe tener al menos 4 caracteres' }
          })}
        />
        {formState.errors.username && <p className="error">{formState.errors.username.message}</p>}

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: { value: true, message: requiredMessage }
          })}
        />
        {formState.errors.password && <p className="error">{formState.errors.password.message}</p>}

        <button type="submit">Entrar</button>
        <p className="switch-form">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginForm

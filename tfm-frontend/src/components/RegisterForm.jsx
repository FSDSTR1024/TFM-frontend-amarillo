import { useForm } from 'react-hook-form'
import './RegisterForm.css'
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const { register, handleSubmit, formState, watch } = useForm();
  const requiredMessage = 'Este campo es obligatorio';

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          name: data.name,
          surname: data.surname,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      };

      const result = await response.json();
      alert(`Usuario registrado con exito. Bienvenido a Whiz ${result.username}!`); //Preguntar a Rubén o Jordi por qué me sale undefined
    } catch (error) {
      console.error(error);
      alert(`Error al registrar el usuario. Por favor revisa tus datos e intenta de nuevo.`);
        }
  };

  return (
    <div className="register-form">
      <h1>Bienvenido a Whiz. Donde las ideas vuelan rápido</h1>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Nombre de usuario ( el nombre con el que quieres que te conozcamos ):
        </label>
        <input type="text" placeholder="Nombre de usuario" {...register("username", { required: { value: true, message: requiredMessage }, minLength: { value: 4, message: 'El nombre de usuario debe tener al menos 4 caracteres' } })} />
        {formState.errors.username && <p className="error">{formState.errors.username.message}</p>}

        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Email" {...register("email", { required: { value: true, message: requiredMessage } })} />
        {formState.errors.email && <p className="error">{formState.errors.email.message}</p>}

        <label htmlFor="password">Contraseña:</label>
        <input type="password" placeholder="Contraseña" {...register("password", { required: { value: true, message: requiredMessage }, minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' } })} />
        {formState.errors.password && <p className="error">{formState.errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
        <input type="password" placeholder="Confirmar contraseña" {...register("confirmPassword", { required: { value: true, message: requiredMessage }, validate: (value) => value === watch("password") || "Las contraseñas no coinciden" })} />
        {formState.errors.confirmPassword && <p className="error">{formState.errors.confirmPassword.message}</p>}

        <label htmlFor="name">Nombre ( tu nombre real, solo se mostrará en tu perfil si lo deseas )</label>
        <input type="text" placeholder="Nombre" {...register("name", { required: { value: true, message: requiredMessage } })} />
        {formState.errors.name && <p className="error">{formState.errors.name.message}</p>}

        <label htmlFor="surname">Apellido(s):</label>
        <input type="text" placeholder="Apellido(s)" {...register("surname", { required: { value: true, message: requiredMessage } })} />
        {formState.errors.surname && <p className="error">{formState.errors.surname.message}</p>}

        <button type="submit">Registrarte</button>
        <p className="switch-form">
                  ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
                </p>
      </form>
    </div>
  )
}

export default RegisterForm
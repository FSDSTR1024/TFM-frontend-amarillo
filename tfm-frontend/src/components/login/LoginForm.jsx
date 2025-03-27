import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
import { useState } from "react";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const requiredMessage = "Este campo es obligatorio";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //Función que controla el envío de los datos del formulario
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.username,
          password: data.password,
        }),
      });

      if (response.status === 404) {
        alert(
          "El usuario no existe. Por favor revisa tus datos e intenta de nuevo."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.user.id);
      navigate("/main");
    } catch (error) {
      console.error(error);
      alert(
        `Error al iniciar sesion. Por favor revisa tus datos e intenta de nuevo.`
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h1>Bienvenido a Whiz. Donde las ideas vuelan rápido</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Nombre de usuario:</label>
        {/* Input de usuario y contraseña con sus validaciones correspondientes */}
        <input
          type="text"
          placeholder="Nombre de usuario o email"
          {...register("username", {
            required: { value: true, message: requiredMessage },
            minLength: {
              value: 4,
              message: "El nombre de usuario debe tener al menos 4 caracteres",
            },
          })}
        />
        {formState.errors.username && (
          <p className="error">{formState.errors.username.message}</p>
        )}

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: { value: true, message: requiredMessage },
          })}
        />
        {formState.errors.password && (
          <p className="error">{formState.errors.password.message}</p>
        )}

        <button type="submit">
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        <p className="switch-form">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

import { useForm } from "react-hook-form";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const password = watch("password", "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const passwordValidations = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const ValidationItem = ({ passed, text }) => (
    <div className="flex items-center gap-2 my-1">
      {passed ? (
        <Check className="check" size={16} />
      ) : (
        <X className="invalid-check" size={16} />
      )}
      <span className={passed ? "text-green-600" : "text-red-600" + " text-sm"}>
        {text}
      </span>
    </div>
  );

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${backendUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          location: data.location,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      const emailResponse = await fetch(`${backendUrl}/email/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, name: data.name }),
      });

      if (!emailResponse.ok) {
        console.error("Error al enviar el correo de bienvenida");
      } else {
        console.log("Correo de bienvenida enviado con éxito");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        `Error al registrar el usuario. Por favor revisa tus datos e intenta de nuevo.`
      );
    }
  };

  return (
    <div className="register-form">
      <h1>Bienvenido a Whiz. Donde las ideas vuelan rápido</h1>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          Nombre de usuario ( el nombre con el que quieres que te conozcamos ):
        </label>
        <input
          type="text"
          placeholder="Nombre de usuario"
          {...register("username", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 4,
              message: "El nombre de usuario debe tener al menos 4 caracteres",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Solo se permiten letras, números y guiones bajos",
            },
          })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "Este campo es obligatorio",
            validate: {
              minLength: (v) => v.length >= 8 || "Mínimo 8 caracteres",
              hasUpperCase: (v) =>
                /[A-Z]/.test(v) || "Debe contener una mayúscula",
              hasLowerCase: (v) =>
                /[a-z]/.test(v) || "Debe contener una minúscula",
              hasNumber: (v) => /\d/.test(v) || "Debe contener un número",
              hasSpecialChar: (v) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                "Debe contener un carácter especial",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <div className="password-requirements">
          <h4 className="text-sm font-medium mb-2">
            Requisitos de la contraseña:
          </h4>
          <ValidationItem
            passed={passwordValidations.minLength}
            text="Mínimo 8 caracteres"
          />
          <ValidationItem
            passed={passwordValidations.hasUpperCase}
            text="Al menos una mayúscula"
          />
          <ValidationItem
            passed={passwordValidations.hasLowerCase}
            text="Al menos una minúscula"
          />
          <ValidationItem
            passed={passwordValidations.hasNumber}
            text="Al menos un número"
          />
          <ValidationItem
            passed={passwordValidations.hasSpecialChar}
            text="Al menos un carácter especial"
          />
        </div>

        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
        <input
          type="password"
          placeholder="Confirmar contraseña"
          {...register("confirmPassword", {
            required: "Este campo es obligatorio",
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <label htmlFor="name">Nombre ( tu nombre real )</label>
        <input
          type="text"
          placeholder="Nombre"
          {...register("name", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: "Solo se permiten letras y espacios",
            },
          })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label htmlFor="surname">Apellido(s):</label>
        <input
          type="text"
          placeholder="Apellido(s)"
          {...register("surname", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: "Solo se permiten letras y espacios",
            },
          })}
        />
        {errors.surname && <p className="error">{errors.surname.message}</p>}

        <label htmlFor="birthdate">Fecha de nacimiento:</label>
        <input
          type="date"
          className="input-date"
          placeholder="Fecha de nacimiento"
          {...register("birthdate", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.birthdate && (
          <p className="error">{errors.birthdate.message}</p>
        )}

        <label htmlFor="location">Ubicación:</label>
        <select
          {...register("location", {
            required: "Este campo es obligatorio",
          })}
        >
          <option value="">Selecciona un país</option>
          <option value="Argentina">Argentina</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Chile">Chile</option>
          <option value="Colombia">Colombia</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Cuba">Cuba</option>
          <option value="Ecuador">Ecuador</option>
          <option value="El Salvador">El Salvador</option>
          <option value="España">España</option>
          <option value="Estados Unidos">Estados Unidos</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guinea Ecuatorial">Guinea Ecuatorial</option>
          <option value="Honduras">Honduras</option>
          <option value="México">México</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Panamá">Panamá</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Perú">Perú</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="República Dominicana">República Dominicana</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Venezuela">Venezuela</option>
        </select>

        {errors.location && <p className="error">{errors.location.message}</p>}

        <button type="submit">Registrarte</button>
        <p className="switch-form">
          ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;

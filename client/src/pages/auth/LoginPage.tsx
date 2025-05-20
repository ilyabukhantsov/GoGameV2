import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';

interface LoginPageData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginPageData>();

  const onSubmitLoginForm: SubmitHandler<LoginPageData> = (data) => {
    try {
      fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data));
        })
        .catch((err) => console.error(err));
      reset();
    } catch (error) {
      console.error('Error with registration', error);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmitLoginForm)}>
        <div className="">
          <label htmlFor="email" className="">
            Електронна пошта:
            {errors.email && <span className=""> *{errors.email.message}</span>}
          </label>
          <input
            type="email"
            id="email"
            className=""
            placeholder="Введіть вашу електронну пошту"
            {...register('email', {
              required: 'Email обов`язковий.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Невірний формат email.',
              },
            })}
          />
        </div>
        <div className="">
          <label htmlFor="password" className="">
            Пароль:
            {errors.password && (
              <span className=""> *{errors.password.message}</span>
            )}
          </label>
          <input
            type="password"
            id="password"
            className=""
            placeholder="Введіть ваш пароль"
            {...register('password', {
              required: 'Пароль обов`язковий.',
              minLength: {
                value: 8,
                message: 'Пароль повинен містити мінімум 8 символів.',
              },
            })}
          />
        </div>
        <button type="submit">Увійти</button>
        <div className="">
          <a href="#" className="">
            Забули пароль?
          </a>
          <span className="">|</span>
          <Link to="/register" className="">
            Зареєструватися
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

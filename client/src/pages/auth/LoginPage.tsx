import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
import { useAuth } from '../../app/context/auth/useAuth';

interface LoginPageData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginPageData>();

  const onSubmit: SubmitHandler<LoginPageData> = (data) => {
    try {
      login(data.email, data.password);
      reset();
    } catch (error) {
      console.error('Error with login', error);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-70 flex flex-col justify-center items-center p-1 gap-2">
        <h1 className="text-2xl">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="">
              Електронна пошта:
              {errors.email && (
                <span className=""> *{errors.email.message}</span>
              )}
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
          <div className="flex flex-col">
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
          <button
            type="submit"
            className="mt-4 border-solid border-white border-1 p-1 cursor-pointer"
          >
            Увійти
          </button>
          <div className="flex mx-auto gap-1.5">
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
    </div>
  );
};

export default LoginPage;

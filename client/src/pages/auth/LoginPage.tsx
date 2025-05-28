import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
import { useAuth } from '../../app/context/auth/useAuth';
import cls from './AuthStyles.module.css';

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80 flex flex-col gap-2 bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-700">
        <h1 className="text-2xl text-center">Login</h1>
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
              className={cls.authInput}
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
              className={cls.authInput}
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
            className="mt-4 border border-solid border-white cursor-pointer hover:bg-white/10 px-3 py-1 rounded-xl transition duration-200"
          >
            Увійти
          </button>
          <div className="flex mx-auto gap-1.5">
            <Link to="/pass-recovery" className="hover:underline">
              Забули пароль?
            </Link>
            <span className="">|</span>
            <Link to="/register" className="hover:underline">
              Зареєструватися
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

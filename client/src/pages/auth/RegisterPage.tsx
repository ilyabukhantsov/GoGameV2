import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../app/context/auth/useAuth';
import cls from './AuthStyles.module.css';
import { Link } from 'react-router';

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
  } = useForm<RegisterData>();

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    try {
      registerUser(data.email, data.password);
      reset();
    } catch (e) {
      console.error('Error with registration', e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80 flex flex-col gap-2 p-6 rounded-xl bg-default">
        <h1 className="text-2xl text-center">Registration</h1>
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
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="">
              Підтвердіть пароль:
              {errors.confirmPassword && (
                <span className=""> *{errors.confirmPassword.message}</span>
              )}
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={cls.authInput}
              placeholder="Підтвердіть пароль"
              {...register('confirmPassword', {
                required: 'Підтвердження пароля обов`язкове',
                validate: (value) =>
                  value === watch('password') || 'Паролі не збігаються',
              })}
            />
          </div>
          <button
            type="submit"
            className="mt-4 border border-solid border-white px-3 py-1 rounded-xl hover-default"
          >
            Зареєструватись
          </button>
          <Link to="/login" className="hover:underline text-center">
            Вже маю аккаунт
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

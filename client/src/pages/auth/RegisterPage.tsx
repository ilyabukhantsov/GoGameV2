import { useForm, type SubmitHandler } from 'react-hook-form';

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
  } = useForm<RegisterData>();

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    try {
      fetch('http://localhost:5000/api/registration', {
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
          localStorage.setItem('token', JSON.stringify(data));
        })
        .catch((e) => console.log('Fetching data error', e));
      reset();
    } catch (e) {
      console.error('Error with registration', e);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-70 flex flex-col justify-center items-center p-1 gap-2">
        <h1 className="text-2xl">Registration</h1>
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
              className=""
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
            className="mt-4 border-solid border-white border-1 p-1 cursor-pointer"
          >
            Зареєструватись
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

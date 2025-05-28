import { Link } from 'react-router';

const PassRecoveryPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-800 rounded-xl shadow-lg p-6 text-center border border-zinc-700">
        <h1 className="text-2xl font-semibold text-purple-400 mb-4">
          Не так сталося як гадалося
        </h1>
        <p className="text-zinc-100 mb-4">
          Сталася помилка, бекендер не написав ручку
        </p>
        <p className="text-zinc-400 text-sm italic mb-6">
          &quot;Не страдай фігньой — напиши ручку&quot;
        </p>

        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-not-allowed"
          disabled
        >
          Задудосить тг бекендера
        </button>

        <div className="mt-6">
          <Link to="/" className="text-blue-400 hover:text-blue-500 text-sm">
            На головну
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PassRecoveryPage;

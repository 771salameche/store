import { Link } from 'react-router-dom';

export default function ErrorMessage({ message, backTo }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-4">
      <p className="text-red-500 text-center">{message}</p>
      {backTo && (
        <Link
          to={backTo}
          className="text-slate-600 hover:text-slate-900 underline"
        >
          Go back
        </Link>
      )}
    </div>
  );
}

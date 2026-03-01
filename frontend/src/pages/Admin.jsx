import Navbar from '../components/Navbar';

export default function Admin() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar current="admin" />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800">Admin</h1>
        <p className="text-slate-500 mt-2">Admin dashboard coming soon.</p>
      </main>
    </div>
  );
}

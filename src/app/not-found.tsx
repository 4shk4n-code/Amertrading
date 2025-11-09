export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-center text-white">
      <p className="text-sm uppercase tracking-[0.4em] text-gold-300">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.35em]">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-white/60">
        The page you are looking for may have been moved or is temporarily
        unavailable.
      </p>
    </div>
  );
}


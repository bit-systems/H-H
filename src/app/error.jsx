// app/error.tsx
"use client"; // must be a client component

export default function GlobalError({ error, reset }) {
  console.error(error);

  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()} style={{ marginTop: "1rem" }}>
        Try again
      </button>
    </div>
  );
}

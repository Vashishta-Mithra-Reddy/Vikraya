// app/loading.tsx (Global Loading)
export default function Loading() {
    return (
      <div className="loader-container h-dvh bg-red-950">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
'use client';

export default function OfflinePage() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        textAlign: 'center',
      }}>
      <div
        style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
        📡
      </div>
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}>
        You&apos;re Offline
      </h1>
      <p
        style={{
          fontSize: '1rem',
          opacity: 0.85,
          maxWidth: '320px',
          lineHeight: 1.5,
          marginBottom: '1.5rem',
        }}>
        It looks like you&apos;ve lost your internet connection. Please
        reconnect to continue using the app.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '0.75rem 2rem',
          borderRadius: '9999px',
          border: '2px solid rgba(255,255,255,0.5)',
          background: 'rgba(255,255,255,0.15)',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
        }}>
        Try Again
      </button>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </main>
  );
}

export default function ForgotStyles() {
  return (
    <style jsx global>{`
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }

      html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
      }

      body {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 300;
          background: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
      }

      .container {
          display: flex;
          width: 100%;
          min-height: 100vh;
          justify-content: center;
      }

      .left-section {
          flex: 1;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 80px;
          position: relative;
          max-width: 100%;
      }

      .left-content {
          max-width: 440px;
          width: 100%;
      }

      .logo-area {
          margin-bottom: 56px;
      }

      .logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
      }

      .logo img {
          width: 32px;
          height: 32px;
          object-fit: contain;
      }

      .logo-text {
          font-size: 22px;
          font-weight: 200;
          color: #0a0a0a;
      }

      .welcome-text {
          margin-bottom: 48px;
      }

      h1 {
          font-size: 38px;
          font-weight: 300;
          color: #0a0a0a;
          margin-bottom: 12px;
          line-height: 1.2;
          letter-spacing: -0.02em;
      }

      .subtitle {
          font-size: 15px;
          font-weight: 200;
          color: #6b7280;
          line-height: 1.5;
      }

      .login-form {
          display: flex;
          flex-direction: column;
      }

      .input-group {
          position: relative;
          margin-bottom: 20px;
      }

      label {
          display: block;
          font-size: 13px;
          color: #374151;
          margin-bottom: 8px;
          font-weight: 300;
      }

      input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          color: #0a0a0a;
          background: #f9fafb;
          outline: none;
          transition: all 0.2s ease;
      }

      input::placeholder {
          color: #9ca3af;
      }

      input:hover {
          border-color: #d1d5db;
          background: #f3f4f6;
      }

      input:focus {
          border-color: #6b7280;
          background: #ffffff;
      }

      .btn-continue {
          background: #0a0a0a;
          color: #ffffff;
          border: none;
          padding: 14px 20px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 300;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
          margin-bottom: 28px;
      }

      .btn-continue:hover {
          background: #1f2937;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .btn-continue:active {
          transform: translateY(0);
      }

      .btn-continue:disabled {
          background: #d1d5db !important;
          color: #9ca3af !important;
          cursor: not-allowed !important;
          transform: none !important;
          box-shadow: none !important;
      }

      .back-link {
          font-size: 13px;
          color: #0a0a0a;
          font-weight: 300;
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s ease;
      }

      .back-link:hover {
          color: #374151;
      }

      .alert {
          position: fixed;
          top: 24px;
          right: -400px;
          background: rgba(10, 10, 10, 0.96);
          backdrop-filter: blur(12px);
          color: #ffffff;
          padding: 16px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          min-width: 280px;
      }

      .alert.show {
          right: 24px;
      }

      .success-message {
          background: rgba(34, 197, 94, 0.96) !important;
          color: #ffffff !important;
      }

      @media (max-width: 1024px) {
          .left-section {
              justify-content: center;
              padding: 60px 40px;
          }
      }

      @media (max-width: 768px) {
          .left-section {
              padding: 40px 32px;
          }

          h1 {
              font-size: 32px;
          }
      }

      @media (max-width: 480px) {
          .left-section {
              padding: 32px 24px;
          }

          h1 {
              font-size: 28px;
          }

          .subtitle {
              font-size: 14px;
          }

          .logo-area {
              margin-bottom: 40px;
          }

          .welcome-text {
              margin-bottom: 32px;
          }
      }
    `}</style>
  )
}
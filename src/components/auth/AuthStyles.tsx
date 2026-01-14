export default function AuthStyles() {
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
          width: 100vw;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          position: relative;
      }

      .left-section {
          flex: 1;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 80px;
          position: relative;
      }

      .left-content {
          max-width: 440px;
          width: 100%;
      }

      .logo-area {
          margin-bottom: 32px;
      }

      .logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
      }

      .logo img {
          width: 24px;
          height: 24px;
          object-fit: contain;
      }

      .logo-text {
          font-size: 18px;
          font-weight: 300;
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

      .custom-select {
          position: relative;
          width: 100%;
          margin-bottom: 20px;
      }

      .select-display {
          width: 100%;
          padding: 13px 16px;
          background: #f9fafb;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          outline: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
      }

      .select-display:hover {
          border-color: #d1d5db;
          background: #f3f4f6;
      }

      .select-options {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          z-index: 100;
          display: none;
          overflow: hidden;
      }

      .select-options.show {
          display: block;
      }

      .select-option {
          padding: 12px 16px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s ease;
      }

      .select-option:hover {
          background: #f9fafb;
      }

      .chevron-icon {
          width: 16px;
          height: 16px;
          color: #9ca3af;
          transition: transform 0.2s ease;
      }

      .custom-select.open .chevron-icon {
          transform: rotate(180deg);
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

      .eye-icon {
          position: absolute;
          right: 14px;
          bottom: 13px;
          color: #9ca3af;
          cursor: pointer;
          width: 18px;
          height: 18px;
          transition: color 0.2s ease;
      }

      .eye-icon:hover {
          color: #6b7280;
      }

      .forgot-pass {
          font-size: 13px;
          color: #0a0a0a;
          font-weight: 300;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 28px;
          transition: color 0.2s ease;
      }

      .forgot-pass:hover {
          color: #374151;
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

      .powered-by {
          margin-top: 40px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 11px;
          color: #9ca3af;
          letter-spacing: 0.05em;
      }

      .powered-by img {
          height: 16px;
          width: auto;
          opacity: 0.7;
      }

      .right-section {
          flex: 1;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          margin: 0;
          padding: 0;
      }

      .right-image {
          width: 100%;
          height: 100vh;
          object-fit: cover;
          object-position: center;
          display: block;
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

      @media (max-width: 1200px) {
          .left-section {
              padding: 60px 60px;
          }
      }

      @media (max-width: 1024px) {
          .right-section {
              display: none;
          }

          .left-section {
              justify-content: center;
              padding: 60px 40px;
              flex: none;
              width: 100%;
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
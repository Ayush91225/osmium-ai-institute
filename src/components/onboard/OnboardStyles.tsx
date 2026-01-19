export default function OnboardStyles() {
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
          overscroll-behavior: none;
          -webkit-overflow-scrolling: touch;
      }

      body {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 300;
          background: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
          overscroll-behavior: none;
      }

      .progress-bar {
          width: 100%;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          margin-bottom: 32px;
          overflow: hidden;
      }

      .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #0a0a0a 0%, #1e293b 50%, #374151 100%);
          border-radius: 2px;
          transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
      }

      .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          animation: shimmer 2s infinite;
      }

      @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
      }

      .step-indicator {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          font-size: 11px;
          color: #94a3b8;
          font-weight: 400;
      }

      .step {
          display: flex;
          align-items: center;
          gap: 6px;
      }

      .step-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 500;
          transition: all 0.2s ease;
      }

      .step.active .step-number {
          background: #0a0a0a;
          color: #ffffff;
      }

      .step.completed .step-number {
          background: #10b981;
          color: #ffffff;
      }

      .welcome-text {
          margin-bottom: 32px;
      }

      h1 {
          font-size: 24px;
          font-weight: 400;
          color: #0f172a;
          margin-bottom: 8px;
          line-height: 1.3;
          letter-spacing: -0.01em;
      }

      .subtitle {
          font-size: 14px;
          font-weight: 300;
          color: #64748b;
          line-height: 1.4;
      }

      .form-step {
          display: none;
      }

      .form-step.active {
          display: block;
      }

      .input-group {
          margin-bottom: 20px;
      }

      .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
      }

      label {
          display: block;
          font-size: 13px;
          color: #374151;
          margin-bottom: 8px;
          font-weight: 300;
      }

      input, textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          color: #0f172a;
          background: #ffffff;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
      }

      input:valid {
          border-color: #10b981;
      }

      input:invalid:not(:placeholder-shown) {
          border-color: #ef4444;
      }

      textarea {
          resize: vertical;
          min-height: 80px;
      }

      input::placeholder, textarea::placeholder {
          color: #94a3b8;
      }

      input:hover, textarea:hover {
          border-color: #cbd5e1;
      }

      input:focus, textarea:focus {
          border-color: #0a0a0a;
          box-shadow: 0 0 0 4px rgba(10, 10, 10, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
      }

      .btn-group {
          display: flex;
          gap: 12px;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
      }

      .btn {
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          flex: 1;
      }

      .btn-primary {
          background: #0a0a0a;
          color: #ffffff;
          position: relative;
          overflow: hidden;
      }

      .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
      }

      .btn-primary:hover::before {
          left: 100%;
      }

      .btn-primary:hover {
          background: #1e293b;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .btn-primary:active {
          transform: translateY(0);
      }

      .btn-secondary {
          background: #f8fafc;
          color: #475569;
          border: 1px solid #e2e8f0;
      }

      .btn-secondary:hover {
          background: #f1f5f9;
      }

      .btn:disabled {
          background: #d1d5db !important;
          color: #9ca3af !important;
          cursor: not-allowed !important;
          transform: none !important;
          box-shadow: none !important;
      }

      .institute-types {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 16px;
          margin-top: 24px;
      }

      .type-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 28px 20px;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          text-align: center;
          position: relative;
          overflow: hidden;
      }

      .type-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
      }

      .type-card:hover {
          border-color: #94a3b8;
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      }

      .type-card:hover::before {
          left: 100%;
      }

      .type-card.selected {
          border-color: #0a0a0a;
          background: #0a0a0a;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
      }

      .type-card i {
          width: 28px;
          height: 28px;
          color: #64748b;
          transition: color 0.2s ease;
      }

      .type-card.selected i {
          color: #ffffff !important;
      }

      .type-card svg {
          width: 28px !important;
          height: 28px !important;
          color: #64748b !important;
          stroke-width: 1.5 !important;
          transition: all 0.2s ease;
      }

      .type-card.selected svg {
          color: #ffffff !important;
          stroke: #ffffff !important;
      }

      .type-card span {
          font-size: 12px;
          font-weight: 400;
          color: #475569;
          transition: color 0.2s ease;
      }

      .type-card.selected span {
          color: #ffffff !important;
          font-weight: 500;
      }

      @media (max-width: 1024px) {
          .left-section {
              display: none;
          }
      }

      @media (max-width: 768px) {
          h1 {
              font-size: 22px;
          }
          .input-row {
              grid-template-columns: 1fr;
          }
          .step-indicator {
              margin-bottom: 24px;
          }
          .welcome-text {
              margin-bottom: 24px;
          }
      }

      @media (max-width: 480px) {
          h1 {
              font-size: 20px;
          }
          .btn-group {
              flex-direction: column;
          }
          .institute-types {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
          }
          .type-card {
              padding: 20px 12px;
              min-height: 85px;
          }
          .type-card svg {
              width: 24px !important;
              height: 24px !important;
          }
          .type-card span {
              font-size: 11px;
          }
          .step-number {
              width: 20px;
              height: 20px;
              font-size: 10px;
          }
          .step {
              gap: 4px;
          }
          .step span {
              font-size: 10px;
          }
      }
    `}</style>
  )
}
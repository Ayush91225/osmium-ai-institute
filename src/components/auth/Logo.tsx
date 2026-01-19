export default function Logo() {
  return (
    <div style={{marginBottom: '32px'}}>
      <a href="/" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
        <img 
          src="https://osmium.co.in/images/logo.png"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/732/732200.png'
          }}
          alt="Osmium"
          style={{width: '20px', height: '20px', objectFit: 'contain'}}
        />
        <span style={{fontSize: '16px', fontWeight: 300, color: '#0a0a0a'}}>Osmium</span>
      </a>
    </div>
  )
}
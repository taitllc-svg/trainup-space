import Image from 'next/image';

const Footer = () => {
    return (
        <footer style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))', // Safe area + padding
            marginTop: 'auto',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)'
        }}>
            <a
                href="https://taitdigital.net"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    opacity: 0.6,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.3))';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.6';
                    e.currentTarget.style.filter = 'none';
                }}
                aria-label="Powered by TAIT Digital"
            >
                <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                    <Image
                        src="/images/tait-logo.png"
                        alt="TAIT Digital"
                        fill
                        sizes="48px"
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <span style={{
                    fontFamily: 'var(--font-rajdhani)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--neutral-400)'
                }}>
                    Powered by TAIT Digital
                </span>
            </a>
        </footer>
    );
};

export default Footer;

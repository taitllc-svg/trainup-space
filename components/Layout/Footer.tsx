import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a
                href="https://taitdigital.net"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label="Powered by TAIT Digital"
            >
                <div className={styles.logoWrapper}>
                    <Image
                        src="/images/tait-logo.png"
                        alt="TAIT Digital"
                        fill
                        sizes="48px"
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <span className={styles.text}>
                    Powered by TAIT Digital
                </span>
            </a>
        </footer>
    );
};

export default Footer;

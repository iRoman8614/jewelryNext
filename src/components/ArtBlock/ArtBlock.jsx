import Image from 'next/image';
import styles from './ArtBlock.module.scss';

export default function ArtBlock() {
    return (
        <div className={styles.artBlockContainer}>
            <div className={styles.textJwlr}>JWLR</div>
            <div className={styles.mainLogoWrapper}>
                <Image
                    src="/images/logotipe.png"
                    alt="Main Logotype"
                    className={styles.mainLogoSvg}
                    width={500}
                    height={250}
                    style={{ objectFit: 'contain' }}
                    priority
                />
            </div>
            <div className={styles.photoElement}>
                <Image
                    src="/images/mainHeader.png"
                    alt="Header visual"
                    width={800}
                    height={400}
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>
            <div className={styles.smallLogosContainer}>
                <div className={styles.smallLogoItem}>
                    <Image
                        src="/images/logo.png"
                        alt="Small logo"
                        fill
                        style={{ objectFit: 'contain' }}
                        className={styles.smallLogoSvg}
                    />
                </div>
                <div className={styles.smallLogoItem2}>
                    <Image
                        src="/images/logo.png"
                        alt="Small logo inverted"
                        fill
                        style={{ objectFit: 'contain' }}
                        className={styles.smallLogoSvg}
                    />
                </div>
                <div className={styles.smallLogoItem}>
                    <Image
                        src="/images/logo.png"
                        alt="Small logo"
                        fill
                        style={{ objectFit: 'contain' }}
                        className={styles.smallLogoSvg}
                    />
                </div>
            </div>
        </div>
    );
};
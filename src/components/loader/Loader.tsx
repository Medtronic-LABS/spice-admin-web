import lottie from 'lottie-web';
import { useEffect } from 'react';

import mdtLogo from '../../assets/lottie/logo.json';
import { useProgressiveIncrementorHook } from '../../hooks/progressiveIncrementor';
import styles from './Loader.module.scss';

interface IStateProps {
  isFullScreen?: boolean;
  className?: string;
  isProgressVisible?: boolean;
  callBack?: (x: boolean) => void;
}

const Loader = ({
  isFullScreen = true,
  className = '',
  isProgressVisible = false,
  callBack = (x: boolean) => x
}: IStateProps) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('#mdt-logo') as Element,
      animationData: mdtLogo,
      renderer: 'svg', // "canvas", "html"
      loop: true, // boolean
      autoplay: true // boolean
    });
  }, []);
  const count = useProgressiveIncrementorHook({ displayProgress: isProgressVisible, callBack });
  return (
    <div className={`${styles.loaderBackdrop} ${isFullScreen ? styles.fullScreen : ''}`}>
      <div className={`${className}`}>
        <div id='mdt-logo' style={{ width: 75, height: 75 }}>
          {isProgressVisible && <div className={styles.loaderContainer}>{count}%</div>}
        </div>
        <div className={`${isProgressVisible ? styles.loaderBackground : ''}`} />
      </div>
    </div>
  );
};

export default Loader;

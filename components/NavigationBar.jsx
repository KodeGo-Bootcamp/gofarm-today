import React ,{useState} from 'react';
import styles from '@/styles/NavigationBar.module.scss'


export default function NavigationBar(){
    const [isOpen, setIsOpen] = useState(false);

    return(
   
      <div className={styles.Navbar}>
      {/* <span className={styles.logo}>GoFarm</span> */}
      <img src="https://github.com/KodeGo-Bootcamp/gofarm-today/blob/main/public/cover-gofarm.svg?raw=true" alt="gofarm cover"/>
      <div className={`${styles.items} ${isOpen ? styles.open : ''}`}>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
      </div>
      <div
        className={`${styles.toggle} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.bar}></div>
      </div>
    </div>
    );
}
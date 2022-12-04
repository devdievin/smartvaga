import Image from 'next/image'
import FooterComponent from '../components/footer'
import HeadComponent from '../components/head'
import HeaderComponent from '../components/header'
import LinkComponent from '../components/link'
import MainComponent from '../components/main'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <HeadComponent title='Smartvaga' description='Encontre e reserve a vaga para seu carro rapidamente.' />

      <HeaderComponent>
        <LinkComponent text='Login' style='btn btn-primary btn-small' url={"/login"} />
      </HeaderComponent>

      <MainComponent hideFooter={true}>
        <div className={styles.container}>
          <h1>Smartvaga</h1>
          <p>Uma forma simples e rápida de estacionar o seu carro.</p>
          <div className={styles.imageContainer}>
            <Image
              src="/images/home-parking.svg"
              alt="Smartvaga"
              fill={true}
              className={styles.image}
            />
          </div>
          <LinkComponent text='COMEÇAR' style='btn btn-secondary btn-large' url={"/register"} />
        </div>
      </MainComponent>

      <FooterComponent />
    </>
  )
}

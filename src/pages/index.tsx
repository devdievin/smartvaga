import Image from 'next/image'

import HeadComponent from '../components/head'
import HeaderComponent from '../components/header'
import MainComponent from '../components/main'
import LinkComponent from '../components/link'
import FooterComponent from '../components/footer'

import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <>
      <HeadComponent title='SmartVaga - Página Inicial' description='Encontre e reserve a vaga de estacionamento para seu carro rapidamente.' />

      <HeaderComponent logoLink='/'>
        <LinkComponent text='Login' style='btn btn-primary btn-small' url={"/login"} />
      </HeaderComponent>

      <MainComponent hideFooter={true}>
        <div className={styles.container}>
          <h1>SmartVaga</h1>
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

import Image from 'next/image'
import ButtonComponent from '../components/button'
import FooterComponent from '../components/footer'
import HeadComponent from '../components/head'
import HeaderComponent from '../components/header'
import MainComponent from '../components/main'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <HeadComponent title='Smartvaga' description='Encontre e reserve a vaga para seu carro rapidamente.' />

      <HeaderComponent>
        <ButtonComponent text='Sign Up' size='sm' color='secondary' />
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
          <ButtonComponent type='button' text='COMEÇAR' size='lg' color='primary' />
        </div>
      </MainComponent>

      <FooterComponent />
    </>
  )
}

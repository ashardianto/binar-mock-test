import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const Button = styled.button`
width: 200px;
margin-left: 20px;
  font-size: 24px;
  padding: 14px 22px;
  background-color: lightgray;
  cursor: pointer;
`

export default function Home() {
  return (
    <Container>
      <Link href='/login'>
        <Button>Login</Button>
      </Link>
      <Link href='/register'>
        <Button>Register</Button>
      </Link>
    </Container>
  )
}

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import cookie from 'cookie'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 20px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: gray;
  color: black;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Phrase = styled.p`
    margin: 10px 0px;
  font-size: 12px;
  text-align: center;
`

const Link = styled.a`
  margin: 10px 0px;
  font-size: 12px;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    const data = { email: email, password: password }

    console.log({ email, password })

    fetch('https://test-binar.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        // console.log(await res.json())
        const response = await res.json()
        if (!response.errors) {
          // console.log(typeof response.result.access_token)
          document.cookie = cookie.serialize('token', response.result.access_token, { path: '/', maxAge: 1 * 60 * 30 })
          window.localStorage.setItem('token', response.result.access_token)
          router.push('/dashboard')
        } else {
          return alert(response.errors.user_authentication[0])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const handleClick = () => {
  //   var bodyFormData = new FormData()
  //   bodyFormData.append('email', email)
  //   bodyFormData.append('password', password)

  //   axios({
  //     method: "post",
  //     url: 'https://test-binar.herokuapp.com/auth/login',
  //     data: bodyFormData,
  //     headers: { "Content-Type": "multipart/form-data" }
  //   }).then(
  //     router.push('/dashboard')
  //   ).catch((err) => {
  //     console.log(err)
  //   })
  // }

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <Input type='text' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleClick}>Login</Button>
        </Form>
        <Phrase>Don&apos;t have an account? <Link href="/register">Register</Link></Phrase>
      </Wrapper>
    </Container>
  );
};

export default Login;

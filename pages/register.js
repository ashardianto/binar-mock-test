import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

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

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    const data = { name: name, email: email, password: password }
    fetch('https://test-binar.herokuapp.com/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        const response = await res.json()
        if (!response.error) {
          console.log(response)
          router.push('/login')
        } else {
          return alert(response)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Container>
      <Wrapper>
        <Title>Register</Title>
        <Form>
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleClick}>Register</Button>
        </Form>
        <Phrase>Already have account? <Link href="/login">Login</Link></Phrase>
      </Wrapper>
    </Container>
  );
};

export default Register;

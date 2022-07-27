import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
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
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: lightgray;
  color: black;
  cursor: pointer;
  margin-bottom: 5px;
  margin-left: 20px;
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

const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
`

const NewProductModal = ({ closeModal }) => {

  return (
    <Container>
      <Wrapper>
        <Title>Create new</Title>
        <Form>
          <Button onClick={() => closeModal(false)}>X</Button>
          <Input type='text' placeholder="Product Name" onChange={(e) => setEmail(e.target.value)} />
          <Input type='text' placeholder="Price (Dollar USD)" onChange={(e) => setEmail(e.target.value)} />
          <Input type='text' placeholder="Image url" onChange={(e) => setEmail(e.target.value)} />
          <ButtonContainer>
            <Button onClick={() => closeModal(false)}>Back</Button>
            <Button>Create</Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default NewProductModal

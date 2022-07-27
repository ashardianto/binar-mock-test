import React, { useState } from "react";
import styled from "styled-components";
import cookie from 'js-cookie'
import { useRouter } from "next/router";
import Modal from "react-modal";
import { parse } from "cookie";

const Container = styled.div`
  height: 70px;
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Main = styled.h2`
  font-weight: bold;
  color: black;
`;

const Button = styled.button`
  width: 150px;
  border: 1px solid black;
  padding: 10px 5px;
  background-color: lightgray;
  margin-left: 20px;
  color: black;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-style: 14px;
  cursor: pointer;
  margin-left: 20px;
`;

// MODAL STYLED COMPONENTS

const ModalContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 20px;
`;

const ModalInput = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const ModalButton = styled.button`
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: lightgray;
  color: black;
  cursor: pointer;
  margin-bottom: 5px;
  margin-left: 20px;
`;

const ModalButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
`

const Navbar = () => {

  const [openNewProduct, setOpenNewProduct] = useState(false)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const router = useRouter()

  const openModal = () => {
    setOpenNewProduct(true)
  }

  const closeModal = () => {
    setOpenNewProduct(false)
  }

  const handleClick = () => {
    cookie.remove('token')
    router.push('/login')
  }

  const handleClickModal = (e) => {
    e.preventDefault()

    const data = { name: productName, price: productPrice, imageurl: imageUrl }

    fetch('https://test-binar.herokuapp.com/v1/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token'),
        // 'Authorization': parse(document.cookie)['token'],
      },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        // console.log(await res.json())
        const response = await res.json()
        if (!response.errors) {
          console.log(response)
          closeModal()
        } else {
          console.log(response)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Main>Product List</Main>
          <Button className="openModalBtn" onClick={() => { setOpenNewProduct(true) }}>Create New</Button>
          <Modal
            isOpen={openNewProduct}
            ariaHideApp={false}
            onRequestClose={closeModal}
          >
            <ModalContainer>
              <ModalWrapper>
                <ModalTitle>Create new</ModalTitle>
                <ModalForm>
                  <ModalInput type='text' placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
                  <ModalInput type='text' placeholder="Price (Dollar USD)" onChange={(e) => setProductPrice(e.target.value)} />
                  <ModalInput type='text' placeholder="Image url" onChange={(e) => setImageUrl(e.target.value)} />
                  <ModalButtonContainer>
                    <Button onClick={() => closeModal(false)}>Back</Button>
                    <Button onClick={handleClickModal}>Create</Button>
                  </ModalButtonContainer>
                </ModalForm>
              </ModalWrapper>
            </ModalContainer>
          </Modal>
        </Left>
        <Right>
          <MenuItem onClick={handleClick}>Logout</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

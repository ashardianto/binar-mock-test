import { parse } from "cookie";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 25%;
  display: inline-block;
  margin: 50px;
  border: 1px solid black;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  border: 1px solid black;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ImgItem = styled.div`
  display: flex;
  top: 10px;
  right: 20px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const EditItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const DeleteItem = styled.div`
  cursor: pointer;
`;

const TitleContainer = styled.div``;

const Title = styled.h2`
  margin-left: 10px;
`;

const DescContainer = styled.div`
  margin-left: 10px;
`;

const Description = styled.p`
  padding-bottom: 20px;
`;

// MODAL STYLED

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

const Products = () => {
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState(null);

  const openModal = () => {
    setOpenEditProduct(true);
  };

  const closeModal = () => {
    setOpenEditProduct(false);
  };

  const getProducts = async () => {
    const productData = await fetch(
      "https://test-binar.herokuapp.com/v1/products",
      {
        method: "GET",
        headers: {
          Authorization: parse(document.cookie)["token"],
        },
      }
    );
    const { result } = await productData.json();
    setProducts(result);
  };

  // const handleEditProduct = async (e) => {
  //   e.preventDefault();

  //   const data = { name: productName };

  //   fetch(
  //     `https://evening-wildwood-34736.herokuapp.com/https://test-binar.herokuapp.com/v1/products/${selectedProduct.id}`,
  //     {
  //       credentials: "include",
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: parse(document.cookie)["token"],
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   )
  //     .then(async (res) => {
  //       const response = await res.json();
  //       if (!response.errors) {
  //         console.log(response);
  //       } else {
  //         console.log(response);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    axios({
      method: "PUT",
      url: `https://test-binar.herokuapp.com/v1/products/${selectedProduct.id}`,
      headers: {
        Accept: "*/*",
        Authorization: parse(document.cookie)["token"],
        "Content-Type": "application/json",
        // Authorization: window.localStorage.getItem("token"),
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "PUT",
      },
      body: { name: productName },
    })
      .then(async (res) => {
        const response = res.data;
        if (!response.errors) {
          console.log(response);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    axios({
      method: "DELETE",
      url: `https://test-binar.herokuapp.com/v1/products/${selectedProduct.id}`,
      headers: {
        Authorization: parse(document.cookie)["token"],
        // Authorization: window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
      },
    })
      .then(async (res) => {
        const response = res.data;
        if (!response.errors) {
          console.log(response);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      {products
        ? products.map((data) => {
            return (
              <Wrapper key={data.id}>
                <ImgContainer>
                  <ImgItem>
                    <EditItem>
                      <FaEdit
                        className="openModalBtn"
                        onClick={() => {
                          setOpenEditProduct(true);
                          setSelectedProduct(data);
                        }}
                      />
                    </EditItem>

                    <DeleteItem>
                      <BsFillTrashFill
                        className="openModalBtn"
                        onClick={() => {
                          setOpenDeleteProduct(true);
                          setSelectedProduct(data);
                        }}
                      />
                      <Modal
                        isOpen={openDeleteProduct}
                        ariaHideApp={false}
                        onRequestClose={closeModal}
                      >
                        <ModalContainer>
                          <ModalWrapper>
                            <ModalTitle>
                              Are you sure want to delete{" "}
                              {selectedProduct?.name}?
                            </ModalTitle>
                            <ModalForm>
                              <ModalButtonContainer>
                                <Button onClick={() => closeModal(false)}>
                                  No
                                </Button>
                                <Button onClick={handleDeleteProduct}>
                                  Yes, delete it
                                </Button>
                              </ModalButtonContainer>
                            </ModalForm>
                          </ModalWrapper>
                        </ModalContainer>
                      </Modal>
                    </DeleteItem>
                  </ImgItem>
                  <CardImage src={data.imageurl} alt="" />
                </ImgContainer>
                <TitleContainer>
                  <Title>{data.name}</Title>
                </TitleContainer>
                <DescContainer>
                  <Description>${data.price}</Description>
                </DescContainer>
              </Wrapper>
            );
          })
        : "No product available."}
      <Modal
        isOpen={openEditProduct}
        ariaHideApp={false}
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <ModalWrapper>
            <ModalTitle>Edit Product</ModalTitle>
            <ModalForm>
              <ModalInput
                type="text"
                placeholder={selectedProduct?.name}
                onChange={(e) => setProductName(e.target.value)}
              />
              <ModalInput
                type="text"
                placeholder={selectedProduct?.price}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <ModalInput
                type="text"
                placeholder={selectedProduct?.imageurl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <ModalButtonContainer>
                <Button onClick={() => closeModal(false)}>Back</Button>
                <Button onClick={handleEditProduct}>Edit</Button>
              </ModalButtonContainer>
            </ModalForm>
          </ModalWrapper>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Products;

import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react'
import { useColorModeValue } from "@chakra-ui/react";
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/react';
export const CreatePage = () => {
    const [newProduct, setNewProduct] = React.useState({
        name: "",
        price: "",
        image: ""
    });
    const toast = useToast();
    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const {success, message} = await createProduct(newProduct);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        }else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        } 
        setNewProduct({ name: "", price: "", image: "" }); 
    };  

  return (
    <Container maxW={"container.sm"}>
        <Heading as="h1" size = "2xl" textAlign={"center"}  mb={8}>
            Create New Product
        </Heading>

        <Box
        w = "full" bg={useColorModeValue("white", "gray.800")} p={6} rounded = "lg" shadow = "md">
            <VStack spacing={4} >
                <input 
                placeholder='Product Name' 
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
                />

                <input
                placeholder='Product Price'
                name="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
                />

                <input
                placeholder='Product Image URL'
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} 
                />
            <Button  colorScheme={"blue"}  onClick={handleAddProduct} w = "full">
                Add Product
            </Button>
            </VStack>  


        </Box>
    </Container>
  )
}

export default CreatePage 

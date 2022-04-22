import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Card, CardContent, CardActions , CardMedia } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import jwt from 'jsonwebtoken';

function ProductComponent() {

    const [productList, setProductList] = useState([]);
    const [qty , setQty] = useState(0)
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    useEffect(() => {
        async function getProduct() {
            var decodedToken = jwt.decode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                navigate('/');
            } else {
                var response = await axios.get('http://localhost:3002/items', {
                    headers: {
                        "access-token": token
                    }
                });
                setProductList(response.data);
            }
        }
        getProduct()

    })

    const updateProduct = async (id, qty) => {
        var decodedToken = jwt.decode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate('/');
        } else {
            var response = await axios.put(`http://localhost:3002/items/update/${id}`, {
                quantity: qty
            }, {
                headers: {
                    "access-token": token
                }
            })

            var index = productList.findIndex(row => row.id === id);
            var productListCopy = [...productList];
            productListCopy[index] = response.data.value;
            setProductList(productListCopy);
        }
    }
    const logout = async () => {
        await localStorage.removeItem("token");
        navigate('/')
    }
    return (
        <Grid>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Products
                        </Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <br />
            <Grid container spacing={4} style={{ margin: '2%' }}>
                {productList.map(row => (
                    <Grid item key={row._id}>
                        <Card sx={{ width: 275 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image= {row.image}
                                alt="Pizza"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {row.name}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {row.type}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {row.size}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Price: {row.price}
                                </Typography>
                                <Typography variant="body2">
                                    Quantity: {row.quantity}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={e => updateProduct(row._id, ++row.userquantity)} disabled={row.userquantity >= row.quantity}>+</Button>
                                {row.userquantity}
                                <Button onClick={e => updateProduct(row._id, --row.userquantity)} disabled={row.userquantity <= 0}>-</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Grid>
    )
}

export default ProductComponent;
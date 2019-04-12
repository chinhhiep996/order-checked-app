import React, { Component } from 'react';
import axios from 'axios'; 
import { Container, Pagination, PaginationItem, PaginationLink, Button, Row } from 'reactstrap';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Search from './Search';
import ProductItem from './ProductItem';
import { ProductsContext } from '../contexts/Products';

axios.defaults.baseURL = 'http://localhost:3000';
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class Products extends Component {
    constructor(props) {
      super(props);

      this.state = {
        products: [],
        currentPage: 1,
        productsPerPage: 12,
      };

      this.handlePageChange = this.handlePageChange.bind(this);
      this.handlePageFirst = this.handlePageFirst.bind(this);
      this.handlePageLast = this.handlePageLast.bind(this);
    }

    componentDidMount() {
      this.setState({
        products: this.context.products
      });
    }

    handlePageChange(event) {
      this.setState({
        currentPage: Number(event)
      });
    }

    handlePageFirst() {
      this.setState({
        currentPage: 1
      })
    }

    handlePageLast() {
      let { productsPerPage } = this.state;
      let products = this.context.products;

      this.setState({
        currentPage: Math.ceil(products.length / productsPerPage)
      })
    }

    render() {
        let { currentPage, productsPerPage } = this.state;
        let products = this.context.products;

        

        // Logic for displaying products
        const indexOfLastproduct = currentPage * productsPerPage;
        const indexOfFirstTodo = indexOfLastproduct - productsPerPage;
        const currentProducts = products.slice(indexOfFirstTodo, indexOfLastproduct);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <PaginationItem 
              key={number}
              onClick={() => this.handlePageChange(number)}
            >
              <PaginationLink href="#">
                {number}
              </PaginationLink>
            </PaginationItem>
          );
        });

        return(
            <Container>
              <Button 
                className="btn btn-warning mb-4"
                size="lg"
                >
                <Link to="/add">
                  Thêm sản phẩm
                </Link>
              </Button>

              <Search />
              
              <Row>
                {
                  currentProducts.map((product, index) =>
                    <ProductItem key={index} product={product} /> )
                }
              </Row>

              <Pagination size="lg" aria-label="Page navigation example">
                <PaginationItem onClick={this.handlePageFirst}>
                  <PaginationLink previous href="#" />
                </PaginationItem>

                { renderPageNumbers }

                <PaginationItem onClick={this.handlePageLast}>
                  <PaginationLink next href="#" />
                </PaginationItem>
              </Pagination>
            </Container>
        );
    }
}

Products.contextType = ProductsContext;
export default withStyles(styles)(Products);
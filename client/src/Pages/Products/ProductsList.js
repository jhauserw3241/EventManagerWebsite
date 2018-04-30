import React, { Component } from 'react';
import ProductCard from './ProductCard';
import ProductsTable from './ProductsTable';
import './../../CSS/List.css';

class ProductsList extends Component {	
	render() {
        console.log(this.props.products);
        if (this.props.org === "cards") {
            return (
				<div className="ProductsList list-container">
                    {Object.values(this.props.products).map(product =>
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            color={product.color} />
                    )}
                </div>
			);
        } else {
            var columns= [
                {
                    key: "name",
                    name: "Product"
                }
            ]

            var products_count = 0;
            var data = [];
            console.log(this.props.products);
            for(var product_id in this.props.products) {
                var product = this.props.products[product_id];
                console.log(product);
                data.push({
                    id: product.id,
                    num: products_count,
                    name: product.name,
                    link: "product/" + product.id,
                    color: product.color,
                });

                products_count += 1;
            }

            return (
                <div className="ProductsList">
                    <ProductsTable
                        columns={columns}
                        data={data}
                        deleteProduct={this.props.deleteProduct} />
                </div>
            );
        }
	}
}

export default ProductsList;

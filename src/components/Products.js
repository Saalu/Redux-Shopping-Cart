import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
class Products extends Component {
	state ={
		product : null,

	}

	openModal = (product) => {
		this.setState({product})
	}
	closeModal = () =>{
		this.setState({product:null})
	}
	render() {
		const {product} = this.state
		return (
			<div>
				<Fade bottom cascade>
				<ul className="products">
					{this.props.products.map((product) => (
						<li key={product._id}>
							<div className="product">
								<a href={'#' + product._id} onClick={() => this.openModal(product)}>
									<img src={product.image} alt={product.title} />
									<p>{product.title}</p>
								</a>
							</div>
							<div className="product-price">
								<div>{formatCurrency(product.price)}</div>
								<button onClick={() => this.props.addToCart(product)} className="button primary">
									Add To Cart
								</button>
							</div>
						</li>
					))}
				</ul>
				</Fade>
				{product && (
					<Modal isOpen={true} onRequestClose={this.closeModal}>
						
						<Zoom>
							<button className='close-modal' onClick={this.closeModal}>X</button>
							<div className='product-details'>
							<img src={product.image} alt={product.title}/>
							<div className="product-details-description">
								<p>
									<strong>{product.title}</strong>
								</p>
								<p>
									<strong>{product.description}</strong>
								</p>
								<p>
									availableSizes : {' '}
									{product.availableSizes.map(x => (
										<span>
											{''}
											<button className="button">{x}</button>
										</span>
									))}
								</p>
								<div className="product-price">
									<div>{formatCurrency(product.price)}</div>
									<button className="button primary"
									onClick ={() => {
										this.props.addToCart(product)
										this.closeModal()
									}}
									>
										Add To Cart
									</button>
								</div>
							</div>
								</div>
						</Zoom>
					</Modal>
				)

				}
			</div>
		);
	}
}

export default Products;

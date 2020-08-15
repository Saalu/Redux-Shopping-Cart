import React, { Component } from 'react';
import Products from './components/Products';
import data from './data.json';
import Filter from './components/Filter';
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: data.products,
			size: '',
			sort: ''
		};
	}

	filterProducts = (e) => {
		//filter
		const target = e.target.value;
		if (target === '') {
			this.setState({ size: target, product: data.products });
		} else {
			this.setState({
				size: target,
				products: data.products.filter((product) => product.availableSizes.indexOf(target) >= 0)
			});
		}
	};
	sortProducts = (e) => {
		//sort
		const sort = e.target.value;

		this.setState((state) => ({
			sort: sort,
			products: this.state.products
				.slice()
				.sort(
					(a, b) =>
						sort === 'lowest'
							? a.price > b.price ? 1 : -1
							: sort === 'highest' ? (a.price < b.price ? 1 : -1) : a._id < b._id ? 1 : -1
				)
		}));
	};
	render() {
		const { products, size, sort } = this.state;
		return (
			<div className="grid-container">
				<header>
					<a href="/">React Shopping Cart</a>
				</header>

				<main>
					<div className="content">
						<div className="main">
							<Filter
								count={products.length}
								size={size}
								sort={sort}
								filterProducts={this.filterProducts}
								sortProducts={this.sortProducts}
							/>
							<Products products={products} />
						</div>
						<div className="sidebar">This is the cart Items</div>
					</div>
				</main>
				<footer>All right is reserved.</footer>
			</div>
		);
	}
}

export default App;

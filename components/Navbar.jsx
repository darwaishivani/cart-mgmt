"use client";
import CartContext from "../context/CartContext";
import Link from "next/link";
import React, { useContext } from "react";

const Navbar = () => {
	const { cart } = useContext(CartContext);
	const cartItems = cart?.cartItems;

	return (
		<div className=" w-full flex items-center justify-between font-bold p-4  ">
			<span>Cart Management</span>

			<div className="flex items-center justify-between gap-8">
				<Link style={{ marginRight: "7px" }} href={"/"}>
					Home
				</Link>
				<Link style={{ marginRight: "7px" }} href={"/cart"}>
					<img src="/shopping-cart.png" alt="cart" />
				</Link>
				<Link href={"/cart"}>
					(<b>{cartItems?.length || 0}</b>)
				</Link>
			</div>
		</div>
	);
};

export default Navbar;

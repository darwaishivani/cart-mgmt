import { NextResponse } from "next/server";
import { dbConnect } from "../../utils/dbConnect";
import Payment from "../../model/payment";

const Stripe = require("stripe");
const gateway = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const POST = async (request) => {
	try {
		// await dbConnect();

		const data = await request.json();
		// console.log("ROUTE DATA", data);
		const cartItems = data.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.name,
				},
				unit_amount: item.price * 100,
			},
			quantity: item.quantity,
		}));
		// console.log("ROUTE CART ITEMS", cartItems);

		const session = await gateway.checkout.sessions.create({
			line_items: cartItems,
			mode: "payment",
			success_url: `https://cart-mgmt.vercel.app/success`,
			cancel_url: `https://cart-mgmt.vercel.app/cancel`,
		});

		// const payment_info = new Payment({
		// 	sessionId: session.id,
		// 	amount: session.amount_total / 100,
		// 	currency: session.currency,
		// 	paymentMethod: "card",
		// });
		// await payment_info.save();

		return NextResponse.json({ id: session.id, url: session.url });
	} catch (error) {
		// console.log("ERROR IS ",error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

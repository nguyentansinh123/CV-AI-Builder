import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIP_SECRET_KEY!);

export default stripe;
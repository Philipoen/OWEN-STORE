import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items, email, name, totalPrice } = await request.json();

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'sek',
        product_data: {
          name: item.name,
          description: `Färg: ${item.color} | Storlek: ${item.size}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      customer_email: email,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
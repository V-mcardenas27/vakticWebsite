import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { name, email, message } = await request.json(); 

  const { error } = await resend.emails.send({
    from: 'Contacto <onboarding@resend.dev>',
    to: ['contacto.vaktic@gmail.com'],
    subject: `Nuevo mensaje de ${name}`,
    html: `<p><strong>Nombre:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Mensaje:</strong> ${message}</p>`,
  });

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
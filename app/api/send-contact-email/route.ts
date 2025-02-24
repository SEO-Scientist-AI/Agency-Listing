import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const FROM_EMAIL = 'contact@agencyspot.seoscientist.ai';

// Base64 encoded logo (orange half-circle design)
const LOGO_BASE64 = `data:image/svg+xml;base64,${Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="#FF642D">
  <path d="M0 240v240h240A240 240 0 0 0 0 240Z"></path>
  <path d="M240 0A240 240 0 0 0 0 240h240v240a240 240 0 1 0 0-480Z"></path>
</svg>
`).toString('base64')}`;

function generateEmailHeader() {
  return `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <img src="${LOGO_BASE64}" alt="SEO Scientist" style="height: 32px; width: 32px;">
        <div style="text-align: left;">
          <div style="font-size: 14px; font-weight: 600; color: #000000; dark:color: #ffffff;">SEO Scientist</div>
          <div style="font-size: 12px; color: #666666;">Agency Spot</div>
        </div>
      </div>
    </div>
  `;
}

function generateUserEmailHtml({ name, email, phone, service, message, agencyName }: any) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      ${generateEmailHeader()}
      
      <h2 style="color: #333;">Thank you for your interest!</h2>
      <p>Dear ${name},</p>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Thank you for reaching out about <strong>${service}</strong>. We've received your inquiry and will get back to you shortly.</p>
        <div style="border-left: 4px solid #FF642D; padding-left: 15px; margin: 15px 0;">
          <p style="color: #6b7280; font-style: italic;">Your message: "${message}"</p>
        </div>
      </div>

      <div style="background: #000; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <img src="${FRONTEND_URL}/images/agency-logos/${agencyName.toLowerCase().replace(/\s+/g, '-')}.png" 
             alt="${agencyName}" style="height: 60px; margin-bottom: 10px;">
        <p style="margin: 0;">${agencyName}</p>
      </div>

      <p>While you wait for our response, you can:</p>
      <ul style="color: #4b5563;">
        <li>Schedule a quick call with us</li>
        <li>Check out our portfolio</li>
        <li>Review our services</li>
      </ul>
      
      <a href="${FRONTEND_URL}/schedule-demo" 
         style="display: inline-block; background: #FF642D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
        Schedule a Call
      </a>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      
      <div style="text-align: center; color: #6b7280; font-size: 14px;">
        <p>© ${new Date().getFullYear()} SEO Scientist Agency Spot. All rights reserved.</p>
      </div>
    </div>
  `;
}

function generateAgencyEmailHtml({ name, email, phone, service, message, agencyName }: any) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      ${generateEmailHeader()}
      
      <h2 style="color: #333;">New Lead Alert! 🎯</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #111; margin-top: 0;">Contact Details:</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
          <li style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #FF642D;">${email}</a></li>
          <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
          <li style="margin-bottom: 10px;"><strong>Service Requested:</strong> ${service}</li>
        </ul>
        
        <div style="background: #fff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; margin-top: 15px;">
          <h4 style="color: #111; margin-top: 0;">Message from Client:</h4>
          <p style="color: #4b5563; margin: 0;">${message}</p>
        </div>
      </div>

      <div style="background: #000; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <p style="margin: 0; font-size: 18px;">Lead for: ${agencyName}</p>
      </div>

      <div style="text-align: center;">
        <a href="${FRONTEND_URL}/dashboard/leads" 
           style="display: inline-block; background: #FF642D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
          View in Dashboard
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      
      <div style="text-align: center; color: #6b7280; font-size: 14px;">
        <p>© ${new Date().getFullYear()} SEO Scientist Agency Spot. All rights reserved.</p>
      </div>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, agencyName } = body;

    console.log('Attempting to send emails for:', { email, agencyName });

    try {
      // Send notification email to agency owner first
      const ownerEmail = await resend.emails.send({
        from: `SEO Scientist <${FROM_EMAIL}>`,
        to: 'gautam@seoscientist.ai',
        replyTo: email,
        subject: `🔔 New Lead: ${service} inquiry from ${name}`,
        html: generateAgencyEmailHtml({ name, email, phone, service, message, agencyName }),
      });
      console.log('Owner email sent:', ownerEmail);

      // Wait for 2 seconds before sending the second email
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Send confirmation email to user
      const userEmail = await resend.emails.send({
        from: `SEO Scientist <${FROM_EMAIL}>`,
        to: email.trim(),
        replyTo: 'gautam@seoscientist.ai',
        subject: `Thank you for contacting ${agencyName}`,
        html: generateUserEmailHtml({ name, email, phone, service, message, agencyName }),
      });
      console.log('User email sent:', userEmail);

    } catch (emailError: unknown) {
      console.error('Detailed email error:', emailError);
      throw new Error(
        `Failed to send email: ${emailError instanceof Error ? emailError.message : 'Unknown error'}`
      );
    }

    return NextResponse.json({ 
      success: true,
      message: "Your message has been sent successfully! We'll be in touch soon.",
      details: {
        userEmail: email,
        ownerEmail: 'gautam@seoscientist.ai'
      }
    });

  } catch (error: unknown) {
    console.error('Error in email sending process:', error);
    return NextResponse.json({ 
      error: 'Failed to send email',
      message: error instanceof Error ? error.message : "There was an error sending your message. Please try again."
    }, { 
      status: 500 
    });
  }
} 
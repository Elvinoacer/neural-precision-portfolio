import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, emailOrWhatsapp, serviceNeeded, timeline, projectDetails, budget } = body;

    // Validate required fields
    if (!fullName || !emailOrWhatsapp || !serviceNeeded || !projectDetails) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Generate initials avatar
    const initials = fullName
      .split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>New Project Request</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; background-color: #F0EDE6; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .fluid { max-width: 100% !important; height: auto !important; }
      .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; }
      .meta-cell { display: block !important; width: 100% !important; padding: 8px 24px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F0EDE6;font-family:'DM Sans',Helvetica,Arial,sans-serif;">

  <!-- Preview text (hidden) -->
  <div style="display:none;font-size:1px;color:#F0EDE6;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    New project request from ${fullName} &mdash; ${serviceNeeded} &bull; Review details inside
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="background-color:#F0EDE6;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Email Container -->
        <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="max-width:600px;width:100%;">

          <!-- ═══════════ HEADER ═══════════ -->
          <tr>
            <td style="background-color:#0A1628;border-radius:16px 16px 0 0;padding:0;overflow:hidden;">
              <!-- Decorative top bar -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background:linear-gradient(90deg,#C9A84C 0%,#F5D07A 40%,#C9A84C 70%,#A07830 100%);height:4px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Header content -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding:40px 48px 36px;text-align:center;position:relative;">

                    <!-- Top label -->
                    <p style="margin:0 0 20px 0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;">
                      Incoming Request
                    </p>

                    <!-- Title -->
                    <h1 style="margin:0 0 8px 0;font-family:'Playfair Display',Georgia,'Times New Roman',serif;font-size:34px;font-weight:700;color:#FFFDF8;line-height:1.2;letter-spacing:-0.5px;">
                      New Project Brief
                    </h1>

                    <!-- Subtitle -->
                    <p style="margin:0 0 32px 0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:15px;font-weight:300;color:#8899AA;letter-spacing:0.3px;">
                      A new enquiry is waiting for your review
                    </p>

                    <!-- Avatar + Name -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto;">
                      <tr>
                        <td style="text-align:center;">
                          <!-- Avatar circle -->
                          <div style="width:68px;height:68px;background:linear-gradient(135deg,#C9A84C,#F5D07A);border-radius:50%;margin:0 auto 14px;display:inline-block;line-height:68px;text-align:center;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:700;color:#0A1628;">
                            ${initials}
                          </div>
                          <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:18px;font-weight:500;color:#FFFDF8;letter-spacing:0.2px;">
                            ${fullName}
                          </p>
                          <p style="margin:4px 0 0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:13px;font-weight:300;color:#6B7F94;">
                            ${emailOrWhatsapp}
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Service badge bar -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color:#0D1F38;padding:16px 48px;text-align:center;border-top:1px solid #1E3050;">
                    <span style="display:inline-block;background:linear-gradient(135deg,#1E3A5F,#162D4A);border:1px solid #2A4870;border-radius:100px;padding:8px 22px;">
                      <span style="font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;">
                        ✦ &nbsp;${serviceNeeded}&nbsp; ✦
                      </span>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════ META GRID ═══════════ -->
          <tr>
            <td style="background-color:#FFFDF9;padding:0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <!-- Timeline cell -->
                  <td class="meta-cell" width="50%" style="padding:24px 24px 24px 40px;border-right:1px solid #EDE9DF;border-bottom:1px solid #EDE9DF;vertical-align:top;">
                    <p style="margin:0 0 5px 0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:#B0A898;">
                      Timeline
                    </p>
                    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;color:#1A2332;">
                      ${timeline || "Flexible"}
                    </p>
                  </td>
                  <!-- Budget cell -->
                  <td class="meta-cell" width="50%" style="padding:24px 40px 24px 24px;border-bottom:1px solid #EDE9DF;vertical-align:top;">
                    <p style="margin:0 0 5px 0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:#B0A898;">
                      Budget
                    </p>
                    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;color:#1A2332;">
                      ${budget || "To be discussed"}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════ PROJECT DETAILS ═══════════ -->
          <tr>
            <td style="background-color:#FFFDF9;padding:36px 40px;">

              <!-- Section label -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:3px;background:linear-gradient(180deg,#C9A84C,#A07830);border-radius:2px;">&nbsp;</td>
                        <td style="padding-left:12px;">
                          <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:#B0A898;margin-bottom:3px;">
                            Project Details
                          </p>
                          <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:600;color:#0A1628;">
                            Brief Overview
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Details card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color:#F7F4EE;border-left:3px solid #C9A84C;border-radius:0 8px 8px 0;padding:24px 28px;">
                    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:15px;font-weight:300;color:#374151;line-height:1.8;">
                      ${projectDetails.replace(/\n/g, "<br/>")}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ═══════════ DIVIDER ═══════════ -->
          <tr>
            <td style="background-color:#FFFDF9;padding:0 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="border-top:1px solid #EDE9DF;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════ CTA ═══════════ -->
          <tr>
            <td style="background-color:#FFFDF9;padding:32px 40px 40px;text-align:center;">
              <p style="margin:0 0 20px;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:300;color:#8899AA;">
                Respond directly by replying to this email
              </p>
              <a href="mailto:${emailOrWhatsapp}"
                style="display:inline-block;background:linear-gradient(135deg,#0A1628,#1E3A5F);color:#F5D07A;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:100px;border:1px solid #2A4870;">
                Reply to ${fullName.split(" ")[0]} &rarr;
              </a>
            </td>
          </tr>

          <!-- ═══════════ FOOTER ═══════════ -->
          <tr>
            <td style="background-color:#0A1628;border-radius:0 0 16px 16px;padding:0;overflow:hidden;">
              <!-- Gold top accent -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background:linear-gradient(90deg,#A07830 0%,#C9A84C 30%,#F5D07A 50%,#C9A84C 70%,#A07830 100%);height:1px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding:28px 40px;text-align:center;">
                    <p style="margin:0 0 6px;font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:600;color:#C9A84C;letter-spacing:0.5px;">
                      Everlyn Linda
                    </p>
                    <p style="margin:0 0 16px;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:300;color:#4A6080;letter-spacing:1px;text-transform:uppercase;">
                      Data Annotation & Virtual Assistance
                    </p>
                    <p style="margin:0;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:11px;color:#2A4060;line-height:1.8;">
                      This message was sent through your portfolio contact form.<br/>
                      &copy; ${new Date().getFullYear()} &nbsp;&middot;&nbsp; Neural Precision. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Email Container -->

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    const mailOptions = {
      from: `"Everlyn Linda Portfolio" <${process.env.EMAIL_SERVER_USER}>`,
      to: "everlineauma46@gmail.com",
      subject: `✦ New Project Request — ${serviceNeeded} from ${fullName}`,
      text: `
New Project Request
═══════════════════════════

Name:     ${fullName}
Contact:  ${emailOrWhatsapp}
Service:  ${serviceNeeded}
Timeline: ${timeline || "Not specified"}
Budget:   ${budget || "Not specified"}

Project Details:
────────────────
${projectDetails}

═══════════════════════════
Sent via your portfolio contact form.
      `.trim(),
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    const whatsappMessage = encodeURIComponent(
      `New project request from ${fullName}:\n` +
      `Service: ${serviceNeeded}\n` +
      `Timeline: ${timeline || "Not specified"}\n` +
      `Details: ${projectDetails}`
    );
    const whatsappUrl = `https://wa.me/254792038496?text=${whatsappMessage}`;

    return Response.json({
      success: true,
      message: "Your project request has been received. I'll respond within 24 hours.",
      whatsappUrl,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
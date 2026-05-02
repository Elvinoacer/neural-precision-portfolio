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

    // Log the submission (in production, this would send to an email service)
    console.log("=== NEW PROJECT REQUEST ===");
    console.log(`Name: ${fullName}`);
    console.log(`Contact: ${emailOrWhatsapp}`);
    console.log(`Service: ${serviceNeeded}`);
    console.log(`Timeline: ${timeline || "Not specified"}`);
    console.log(`Details: ${projectDetails}`);
    console.log(`Budget: ${budget || "Not specified"}`);
    console.log("===========================");

    // TODO: Integrate with email service (Formspree, Resend, etc.)
    // Example with Formspree:
    // const formspreeResponse = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: fullName,
    //     email: emailOrWhatsapp,
    //     service: serviceNeeded,
    //     timeline,
    //     message: projectDetails,
    //     budget,
    //   }),
    // });

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
  } catch {
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

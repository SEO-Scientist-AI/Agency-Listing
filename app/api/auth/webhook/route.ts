import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// User creation function
async function createUser(userData: any) {
  const { data, error } = await supabase
    .from("user")
    .insert([userData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// User update function
async function updateUser(userData: any) {
  const { data, error } = await supabase
    .from("user")
    .update(userData)
    .eq("user_id", userData.user_id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function POST(req: Request) {
  console.log("Webhook endpoint hit at:", new Date().toISOString());
  
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    console.log("Starting webhook processing with secret:", WEBHOOK_SECRET?.substring(0, 5) + "...");

    if (!WEBHOOK_SECRET) {
      console.error("WEBHOOK_SECRET is not set");
      throw new Error("WEBHOOK_SECRET is required");
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Missing SVIX headers");
      return new Response("Error occurred -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    console.log("Webhook payload:", JSON.stringify(payload, null, 2));

    // Verify webhook signature
    let evt: WebhookEvent;
    try {
      evt = new Webhook(WEBHOOK_SECRET).verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", {
        status: 400,
      });
    }

    const eventType = evt.type;
    console.log("Event type:", eventType);

    // Extract user data
    const emailAddress = payload.data.email_addresses?.[0]?.email_address;
    const firstName = payload.data.first_name || 
      payload.data.oauth_names?.[0]?.first_name || 
      payload.data.username;
    const lastName = payload.data.last_name || 
      payload.data.oauth_names?.[0]?.last_name || 
      '';
    const profileImageUrl = payload.data.profile_image_url || 
      payload.data.image_url ||
      payload.data.avatar_url;
    const userId = payload.data.id;

    const userData = {
      email: emailAddress,
      first_name: firstName,
      last_name: lastName,
      profile_image_url: profileImageUrl,
      user_id: userId,
      role: 'user',
    };

    console.log("Processed user data:", userData);

    switch (eventType) {
      case "user.created":
        try {
          console.log("Creating new user...");
          const result = await createUser(userData);
          console.log("User creation result:", result);
          return NextResponse.json({ status: 200, message: "User created", data: result });
        } catch (error: any) {
          console.error("Error creating user:", error);
          return NextResponse.json({ status: 400, error: error.message });
        }

      case "user.updated":
        try {
          console.log("Updating user...");
          const result = await updateUser(userData);
          console.log("User update result:", result);
          return NextResponse.json({ status: 200, message: "User updated", data: result });
        } catch (error: any) {
          console.error("Error updating user:", error);
          return NextResponse.json({ status: 400, error: error.message });
        }

      default:
        console.log("Unhandled event type:", eventType);
        return new Response(`Unhandled event type: ${eventType}`, { status: 400 });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ 
      status: 500, 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

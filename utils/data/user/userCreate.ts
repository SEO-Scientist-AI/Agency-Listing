"server only"

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { userCreateProps } from "@/utils/types";

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
  role = "user",
}: userCreateProps) => {
  if (!email || !user_id) {
    throw new Error("Email and user_id are required");
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    // Check if user already exists by user_id
    const { data: existingUser, error: checkError } = await supabase
      .from("user")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking existing user:", checkError);
      throw checkError;
    }

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    // Create new user
    const { data, error } = await supabase
      .from("user")
      .insert([
        {
          email,
          first_name: first_name || '',
          last_name: last_name || '',
          profile_image_url,
          user_id,
          role,
          created_time: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      throw error;
    }

    console.log("User created successfully:", data);
    return data;
  } catch (error: any) {
    console.error("Error in userCreate:", error);
    throw new Error(error.message || 'Error creating user');
  }
};

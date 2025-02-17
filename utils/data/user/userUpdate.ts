"server only";
import { userUpdateProps } from "@/utils/types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const userUpdate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
  role,
}: userUpdateProps) => {
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
    const { data, error } = await supabase
      .from("user")
      .update([
        {
          email,
          first_name,
          last_name,
          profile_image_url,
          user_id,
          role,
        },
      ])
      .eq("user_id", user_id)
      .select();

    if (error) {
      console.error("Error updating user:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error in userUpdate:", error);
    throw new Error(error.message);
  }
};

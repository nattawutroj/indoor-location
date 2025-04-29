import { createAdminClient } from "@/utils/supabase/admin";
import UserManagement from "@/components/user-management";
import { Message } from "@/components/form-message";

export default async function ManagerPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const supabase = createAdminClient();
  const { data: users, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return (
      <div className="text-destructive">
        Error loading users. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-4 sm:p-6">
      <div className="flex flex-col gap-2 items-start max-w-7xl w-full mx-auto">
        <h1 className="font-bold text-2xl sm:text-3xl mb-4">User Management</h1>
        <UserManagement 
          users={users?.users || []} 
          message={await searchParams} 
        />
      </div>
    </div>
  );
}

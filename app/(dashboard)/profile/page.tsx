"use client";

import Button from "@components/ui/Button";
import { logout } from "@lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout = async () => {
    setLoading(true);
    await logout();
    router.push("/login");
    setLoading(false);
  };

  return (
    <div>
      <Button intent={"secondary"} onClick={handleLogout} disabled={loading}>
        {loading ? "Taking you out ..." : "Logout"}
      </Button>
    </div>
  );
};

export default UserProfile;

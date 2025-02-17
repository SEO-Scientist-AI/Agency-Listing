"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import {
    Banknote,
    Compass,
    Folder,
    HomeIcon,
    InboxIcon,
    MessageSquare,
    Pen,
    Search,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function DashboardSideBar() {
    const pathname = usePathname();
    const { user } = useUser();
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    useEffect(() => {
        async function checkAdminStatus() {
            if (user?.id) {
                try {
                    const response = await fetch(`/api/check-admin?userId=${user.id}`);
                    const data = await response.json();
                    setIsSuperAdmin(data.isAdmin);
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsSuperAdmin(false);
                }
            }
        }

        checkAdminStatus();
    }, [user?.id]);

    return (
        <div className="lg:block hidden border-r h-screen sticky top-0">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
                    <Link
                        className="flex items-center gap-2 font-semibold ml-1"
                        href="/"
                    >
                        <span className="">SEO Scientist Agency Spot</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2 ">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <Link
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                {
                                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                                        pathname === "/dashboard",
                                }
                            )}
                            href="/dashboard"
                        >
                            <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                                <HomeIcon className="h-3 w-3" />
                            </div>
                            Home
                        </Link>
                        {isSuperAdmin && (
                            <Link
                                className={clsx(
                                    "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                    {
                                        "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                                            pathname === "/dashboard/get-listed",
                                    }
                                )}
                                href="/dashboard/get-listed"
                            >
                                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                                    <Pen className="h-3 w-3" />
                                </div>
                                Get Listed
                            </Link>
                        )}
                        <Link
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                {
                                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                                        pathname === "/dashboard/inbox",
                                }
                            )}
                            href="/dashboard/inbox"
                        >
                            <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                                <InboxIcon className="h-3 w-3" />
                            </div>
                            Inbox
                        </Link>

                        {/* <Link
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                {
                                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                                        pathname === "/dashboard/finance",
                                }
                            )}
                            href="/dashboard/finance"
                        >
                            <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                                <Banknote className="h-3 w-3" />
                            </div>
                            Finance
                        </Link> */}
                        <Separator className="my-3" />
                        <Link
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                {
                                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                                        pathname === "/dashboard/settings",
                                }
                            )}
                            href="/dashboard/settings"
                            id="onboarding"
                        >
                            <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                                <Settings className="h-3 w-3" />
                            </div>
                            Settings
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}

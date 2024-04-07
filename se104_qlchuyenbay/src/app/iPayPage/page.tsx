import PayForm from "@/components/PayForm";
import BottomNavbar from "@/components/BottomNavbar";
import Link from "next/link";
import { Navbar } from "@nextui-org/react";

function iPayPage() {
    return (
        <div>
            <div className="bg-white shadow rounded-lg p-6 flex items-center">
                <PayForm />
                <BottomNavbar />
            </div>
        </div>
    );
}

export default iPayPage;

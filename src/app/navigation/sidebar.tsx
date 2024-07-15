import "./sidebar.css";

import React from "react";
// We can change to different icons i just grabbed whatever off website
import { FaBox, FaGift, FaHome, FaList, FaShoppingCart, FaStore, FaTags, FaUser } from "react-icons/fa";

interface SidebarItem {
    icon: JSX.Element;
    label: string;
}
// Items for sidebar will likely have to add more
const sidebarItems: SidebarItem[] = [
    { icon: <FaHome />, label: "Home", path:"/page.tsx" },
    { icon: <FaShoppingCart />, label: "Grocery" },
    { icon: <FaStore />, label: "Retail" },
    { icon: <FaTags />, label: "Convenience" },
    { icon: <FaGift />, label: "Offers" },
    { icon: <FaList />, label: "Browse All" },
    // Between here and orders i want to add a line in the future so you can tell difference between orders&account among other stuff for account
    { icon: <FaBox />, label: "Orders" },
    { icon: <FaUser />, label: "Account" },
];

/**
 * Sidebar component.
 * @returns The rendered sidebar component.
 */
const Sidebar = (): JSX.Element => (
    <div className="sidebar">
        {sidebarItems.map((item, index) => (
            <div className={`sidebar-item ${item.label === "Convenience" ? "active" : ""}`} key={index}>
                {item.icon}
                <span>{item.label}</span>
            </div>
        ))}
    </div>
);

export default Sidebar;

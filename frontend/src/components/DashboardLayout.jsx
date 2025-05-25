// components/DashboardLayout.jsx
import Sidebar from "./Sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  )
}

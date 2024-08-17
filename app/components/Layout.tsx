import { ReactNode } from "react";
import { Link } from "@remix-run/react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-teal-900 text-white p-4 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            memo
          </Link>
          <div>
            <Link to="/" className="mr-4">
              Home
            </Link>
            <Link to="/top?view=medium_term" className="mr-4">
              Top Tracks
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      {/* <footer className="bg-gray-800 text-white p-4 text-center sticky bottom-0">
        &copy;{" 2024 with <3 by @memorebo."}
      </footer> */}
    </div>
  );
}

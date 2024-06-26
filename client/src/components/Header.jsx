import { Button, Navbar, TextInput } from "flowbite-react";
import "flowbite/dist/flowbite.css";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

// export default function Header() {
//   // To active the link in toggle we used useLocation
//   const path = useLocation().pathname;
//   return (
//     <Navbar className="border-b-2">
//       <Link
//         to="/"
//         className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
//       >
//         <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
//           Code's
//         </span>
//         Blog
//       </Link>
//       {/* for the search */}
//       <form>
//         <TextInput
//           type="text"
//           placeholder="Search..."
//           rightIcon={AiOutlineSearch}
//           className="hidden lg:inline"
//         />
//       </form>
//       {/* Search button for small screens */}
//       <Button className="w-12 h-10 lg:hidden" color="gray" pill>
//         <AiOutlineSearch />
//       </Button>
//       {/* flex ley xhai sangai layidinxa eutai line ma */}
//       {/* md:order-2 medium or thulo huni bitikae order-2 banda */}
//       <div className="flex gap-2 md:order-2">
//         {/* Moon icon button */}
//         <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
//           <FaMoon />
//         </Button>
//         {/* Sign In button */}
//         <Link to="/sign-in">
//           <Button gradientDuoTone="purpleToBlue">Sign In</Button>
//         </Link>
//         <Navbar.Toggle />
//       </div>
//       <Navbar.Collapse>
//         <Navbar.Link active={path === "/"} as={"div"}>
//           <Link to="/">Home</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === "/about"} as={"div"}>
//           <Link to="/about">About</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === "/project"} as={"div"}>
//           <Link to="/project">Project</Link>
//         </Navbar.Link>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Code's Climb
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-up">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign up
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/project">Project</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

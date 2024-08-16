// import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../components/OAuth";

// export default function Signup() {
//   const [formData, setFormData] = useState({});

//   // This is for the error message
//   // suru ma msg xhai khali hunxa so, null rakheko
//   const [errorMessage, setErrorMessage] = useState(null);

//   // loading ko lagi
//   const [loading, setLoading] = useState(false);
//   //suru ma navigate lai initialized garya
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     // yo chai browser ko console ma input dekhauxa I mean j type gariyo tei dekhauxa broswer ko console ma.
//     // console.log(e.target.value);
//     // ...formData vanya xhai previous value rakheko ho suru ma
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };
//   const handleSubmit = async (e) => {
//     // e.preventDefault ley xhai refresh hunna dinna.
//     e.preventDefault();
//     if (!formData.username || !formData.email || !formData.password) {
//       return setErrorMessage("Please fill out all fields.");
//     }
//     // submit the form
//     try {
//       //
//       setLoading(true);
//       // setErrorMessage chai kina null garya bani cause previous request we want to clean that one, ani previous request error free pani huna sakxa ni so tei vayera clean garya or null garya.
//       setErrorMessage(null);
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // stringify = we cannot send completely json so all we had to convert into json so, we used stringify
//         body: JSON.stringify(formData),
//       });
//       // jaba hamiley json ma response pauxam taba teslai data ma convert gardey baneko ho
//       const data = await res.json();
//       if (data.success === false) {
//         return setErrorMessage(data.message);
//       }
//       setLoading(false);
//       if (res.ok) {
//         navigate("/sign-in");
//       }
//     } catch (error) {
//       setErrorMessage(error.message);
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen mt-20">
//       {/* one div for the left side and another div for righside */}
//       {/* mx-auto for the bigger screen and it will make it in center. */}
//       <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
//         {/* left side */}
//         {/* flex-1 for the both left side and the right side to equally disturbed the same space */}
//         <div className="flex-1">
//           <Link to="/" className="font-bold dark:text-white text-4xl">
//             <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
//               Code's Climb
//             </span>
//             Blog
//           </Link>
//           <p className="text-sm mt-5">
//             Code's Climb is a blog website dedicated to programming,
//             development, and technology. It features tutorials, articles, and
//             resources for developers of all levels, covering topics such as web
//             development, software engineering, best coding practices, and the
//             latest industry trends. The blog aims to help readers improve their
//             coding skills, stay updated with new technologies, and advance their
//             careers in tech.
//           </p>
//         </div>
//         {/* right side */}
//         <div className="flex-1">
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div>
//               <Label value="Your username" />
//               <TextInput
//                 type="text"
//                 placeholder="Username"
//                 id="username"
//                 onChange={handleChange}
//               ></TextInput>
//             </div>
//             <div>
//               <Label value="Your email" />
//               <TextInput
//                 type="email"
//                 placeholder="name@company.com"
//                 id="email"
//                 onChange={handleChange}
//               ></TextInput>
//             </div>
//             <div>
//               <Label value="Your password" />
//               <TextInput
//                 type="password"
//                 placeholder="Password"
//                 id="password"
//                 onChange={handleChange}
//               ></TextInput>
//             </div>
//             <Button
//               gradientDuoTone="purpleToPink"
//               type="submit"
//               disabled={loading}
//             >
//               {
//                 // as we are adding more html element inside the () so, we need to cover it with an empty fragment
//                 loading ? (
//                   <>
//                     <Spinner size="sm" />
//                     <span className="pl-3">Loading...</span>
//                   </>
//                 ) : (
//                   "Sign up"
//                 )
//               }
//             </Button>
//             <OAuth />
//           </form>
//           <div className="flex gap-2 text-sm mt-5">
//             <span>Have an account?</span>
//             <Link to="/sign-in" className="text-blue-500">
//               Sign In
//             </Link>
//           </div>
//           {errorMessage && (
//             <Alert className="mt-5" color="failure">
//               {errorMessage}
//             </Alert>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicators";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Code's Climb
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Code's Climb is a blog website dedicated to programming,
            development, and technology. It features tutorials, articles, and
            resources for developers of all levels, covering topics such as web
            development, software engineering, best coding practices, and the
            latest industry trends. The blog aims to help readers improve their
            coding skills, stay updated with new technologies, and advance their
            careers in tech.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
              <PasswordStrengthIndicator password={password} />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

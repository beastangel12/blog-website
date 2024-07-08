import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSucess,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  // This is for the error message
  // suru ma msg xhai khali hunxa so, null rakheko
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  //suru ma navigate lai initialized garya
  const navigate = useNavigate();

  const handleChange = (e) => {
    // yo chai browser ko console ma input dekhauxa I mean j type gariyo tei dekhauxa broswer ko console ma.
    // console.log(e.target.value);
    // ...formData vanya xhai previous value rakheko ho suru ma
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    // e.preventDefault ley xhai refresh hunna dinna.
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    // submit the form
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // stringify = we cannot send completely json so all we had to convert into json so, we used stringify
        body: JSON.stringify(formData),
      });
      // jaba hamiley json ma response pauxam taba teslai data ma convert gardey baneko ho
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSucess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      {/* one div for the left side and another div for righside */}
      {/* mx-auto for the bigger screen and it will make it in center. */}
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        {/* flex-1 for the both left side and the right side to equally disturbed the same space */}
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
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="************"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {
                // as we are adding more html element inside the () so, we need to cover it with an empty fragment
                loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
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

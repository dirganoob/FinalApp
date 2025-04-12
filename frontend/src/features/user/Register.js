import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

const Register = () => {
    const INITIAL_REGISTER_OBJ = {
        email: "",
        username: "",
        password: "",
    };

    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setSuccessMessage("");
        setRegisterObj({ ...registerObj, [updateType]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (registerObj.email.trim() === "") return setErrorMessage("Email is required!");
        if (registerObj.username.trim() === "") return setErrorMessage("Username is required!");
        if (registerObj.password.trim() === "") return setErrorMessage("Password is required!");

        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: registerObj.email,
                    username: registerObj.username,
                    password: registerObj.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Registration successful!");
                setRegisterObj(INITIAL_REGISTER_OBJ);
            } else {
                setErrorMessage(data.message || "Something went wrong!");
            }
        } catch (error) {
            setErrorMessage("Server error! Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="card w-full max-w-4xl shadow-lg rounded-xl bg-white overflow-hidden">
                <div className="grid md:grid-cols-2 grid-cols-1">
                    {/* Left Intro Section */}
                    <div className="bg-blue-600 text-white flex items-center justify-center py-12 px-6">
                        <LandingIntro />
                    </div>

                    {/* Right Form Section */}
                    <div className="py-10 px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                        <form onSubmit={(e) => submitForm(e)} className="space-y-6">
                            {/* Username */}
                            <InputText
                                type="text"
                                defaultValue={registerObj.username}
                                updateType="username"
                                containerStyle="w-full"
                                labelTitle="Name"
                                updateFormValue={updateFormValue}
                                placeholder="Enter your name"
                            />

                            {/* Email */}
                            <InputText
                                type="email"
                                defaultValue={registerObj.email}
                                updateType="email"
                                containerStyle="w-full"
                                labelTitle="Email"
                                updateFormValue={updateFormValue}
                                placeholder="Enter your email"
                            />

                            {/* Password */}
                            <InputText
                                type="password"
                                defaultValue={registerObj.password}
                                updateType="password"
                                containerStyle="w-full"
                                labelTitle="Password"
                                updateFormValue={updateFormValue}
                                placeholder="Enter your password"
                            />

                            {/* Feedback Messages */}
                            {errorMessage && (
                                <ErrorText styleClass="text-red-500 text-center">{errorMessage}</ErrorText>
                            )}
                            {successMessage && (
                                <p className="text-green-500 text-center">{successMessage}</p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full py-3 px-6 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition ${
                                    loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-gray-500">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:underline transition"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

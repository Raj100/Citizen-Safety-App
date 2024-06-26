"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import supabase from "../../app/supabase";
import { all } from "axios";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [meuopen, setmenuopen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    };

    fetchUser();
  }, []);

  const handlemenu = () => {
    setmenuopen(!meuopen);
  };
  const logout=async()=>{
    let { error } = await supabase.auth.signOut()
    if(error){
      alert("Error in Signout");
    }
    else{
      alert("Signout Successfully");
      window.location.href="/";
    }
      }
  return (
    <>
      <header className="fixed flex w-full justify-between items-center px-10 lg:px-24 py-4 lg:py-8  dark:bg-slate-800 dark:text-white bg-gradient-to-r  from-40% from-slate-800 via-slate-700 to-60% to-slate-800 bg-opacity-50 z-[20]">
        <div className="p-2">Citizen Safety App</div>
        <ul className="hidden lg:flex dark:text-slate-401 space-x-5  text-white ">
          <li className="hover:text-yellow-300 p-2">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-emerald-300 p-2">
            {" "}
            <Link href="/UrlSearch">Url search</Link>
          </li>
          <li className="hover:text-emerald-300 p-2">
            <Link href="/SmsAnalysis">SmsAnalysis</Link>
          </li>
          {/* <li className="">
            <Link href="/FraudDetection">FraudDetection</Link>
          </li> */}
          <li className="hover:text-emerald-300 p-2">
            <Link href="/CryptoWalletChecker">Crypto Wallets</Link>
          </li>
          <li className="p-2 hover:text-emerald-300">
            <Link href="/Education">Education</Link>
          </li>
          <li className="hover:text-red-300 p-2">
            <Link href="/FraudReporting">Fraud Reporting</Link>
          </li>
        </ul>
        <div className="hidden lg:block">
          {userEmail ? (
            <>
              <div onClick={logout} className="dark:text-slate-400 text-white p-2 hover:text-white  cursor-pointer">
                {userEmail}
              </div>
            </>
          ) : (
            <button className="dark:text-slate-400 text-white p-2 hover:text-white">
              <Link href="/Login">Login</Link>
            </button>
          )}
        </div>

        <div onClick={handlemenu} className="lg:hidden text-2xl p-2">
          <i className={`fa-solid ${meuopen ? "fa-xmark" : "fa-bars"}`}></i>
        </div>
      </header>
      <div
        className={`absolute w-full dark:bg-slate-800 z-[10] transition duration-300 lg:hidden ${
          meuopen ? "" : "-translate-y-full"
        }`}
      >
        <ul className="pt-20 text-center flex flex-col lg:flex text-white ">
          <li
            className={`hover:text-yellow-300 p-2  transition duration-300 ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`hover:text-emerald-450 p-2  transition duration-[450ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            {" "}
            <Link href="/UrlSearch">Url search</Link>
          </li>
          <li
            className={`hover:text-yellow-300 p-2  transition duration-[600ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/SmsAnalysis">SmsAnalysis</Link>
          </li>
          {/* <li className="">
        <Link href="/FraudDetection">FraudDetection</Link>
      </li> */}
          <li
            className={`hover:text-yellow-300 p-2  transition duration-[750ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/CryptoWalletChecker">Crypto Wallets</Link>
          </li>
          <li
            className={`hover:text-yellow-300 p-2  transition duration-[900ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/Education">Education</Link>
          </li>
          <li
            className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/FraudReporting">Fraud Reporting</Link>
          </li>
          <div className="hidden lg:block">
            {userEmail ? (
              <li
                className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
                  meuopen ? "" : "-translate-x-full"
                } cursor-pointer`}
              >
                {userEmail}
              </li>
            ) : (
              <li
                className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
                  meuopen ? "" : "-translate-x-full"
                }`}
              >
                <Link href="/Login">Login</Link>
              </li>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

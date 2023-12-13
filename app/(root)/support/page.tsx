"use client";

import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import Image from "next/image";

const Support = () => {
  const nameRef: any = useRef();
  const emailRef: any = useRef();
  const messageRef: any = useRef();

  const sendmail = (event: any) => {
    event.preventDefault();
    // Check if environment variables are defined
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    console.log("Service ID:", serviceId);
    console.log("Template ID:", templateId);
    console.log("Public Key:", publicKey);

    if (!serviceId || !templateId || !publicKey) {
      console.error("One or more EmailJS environment variables are missing.");
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: nameRef.current.value,
          to_name: "Codemate",
          from_email: emailRef.current.value,
          to_email: "codematecare@gmail.com",
          message: messageRef.current.value,
        },
        publicKey
      )
      .then(
        () => {
          toast.success("Message successfully sent!");
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Unable to send message :(");
        }
      );

    event.target.reset();
  };

  return (
    <section
      className="max-container background-light900_dark300 relative flex flex-col lg:flex-row"
      style={{ minHeight: "100px" }}
    >
      <div className="mt-[-100px] flex min-w-[50%] flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-center">
          <h1 className="head-text">Let&apos;s hear it from you!</h1>
          <Image
            src="/assets/images/codematerobotpng.png"
            alt="Codemate robot"
            width={170}
            height={170}
            className="mb-10 ml-[-15px] object-contain"
          />
        </div>
        <form
          onSubmit={sendmail}
          className="background-light900_dark300 mt-[-30px] flex w-full flex-col gap-7"
        >
          <p className="body-medium mt-2 text-dark-300 dark:text-white">
            Here at Codemate we aim to make your experience awesome. Got
            questions or suggestions? Let us know through the form below — your
            input matters!
          </p>
          <label className="font-semibold text-dark-300 dark:text-white">
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              required
              ref={nameRef}
              className="input"
            />
          </label>
          <label className="font-semibold text-dark-300 dark:text-white">
            Email
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              required
              ref={emailRef}
              className="input"
            />
          </label>

          <label className="font-semibold text-dark-300 dark:text-white">
            Message
            <textarea
              rows={4}
              name="message"
              placeholder="Enter message"
              required
              ref={messageRef}
              className="textarea"
            />
          </label>
          <Button className="btnsupport" type="submit">
            Send
          </Button>
        </form>
        <div>
          <p className="mt-5 text-slate-700 dark:text-slate-300">
            Or simply email us at codematecare@gmail.com
          </p>
        </div>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="light"
          autoClose={2000}
        />
      </div>
    </section>
  );
};

export default Support;

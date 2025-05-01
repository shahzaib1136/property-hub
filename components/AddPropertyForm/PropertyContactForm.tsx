"use client";

import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { FaPaperPlane } from "react-icons/fa6";
import { useState } from "react";
import { Property } from "@lib/types/property";
import { useAppContext } from "@/app/context/AppContext";
import { PostPropertyMessage } from "@lib/api/messages";
import { MessageFormValues } from "@lib/types/messages";
import { toast } from "react-toastify";
import { ErrorType } from "@lib/utils/response";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-]+$/, "Invalid phone number")
    .notRequired(),
  message: Yup.string().required("Message is required"),
});

const PropertyContactForm = ({ property }: { property?: Property }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { state } = useAppContext();

  const handleSubmit = async (values: FormikValues) => {
    const dataToSubmit = {
      ...values,
      recipient: property?.owner,
      property: property?.id,
    };

    try {
      formik.setSubmitting(true);
      await PostPropertyMessage(dataToSubmit as MessageFormValues);

      setIsSubmitted(true);
      formik.resetForm();

      toast.success("Your message has been sent successfully!");
    } catch (error: unknown) {
      const err = error as ErrorType;

      toast.error(
        err?.message || "Oops! Something went wrong while sending your message."
      );
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const isSubmitButtonDisable =
    !formik.dirty ||
    !(Object.keys(formik.errors).length === 0) ||
    formik.isSubmitting;

  const isSenderRecipient = property?.owner === state.user?.id;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!state.user ? (
        <p className="text-lg">You need to be logged in to send a message.</p>
      ) : isSenderRecipient ? (
        <p className="text-green-600 font-bold text-lg">
          Your can not send message to yourself
        </p>
      ) : property?.hasContacted || isSubmitted ? (
        <p className="text-green-600 font-bold text-lg">
          Your message has been sent successfully!
        </p>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone:
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              placeholder="Enter your message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center disabled:opacity-70"
              disabled={isSubmitButtonDisable}
            >
              <FaPaperPlane className="fas fa-paper-plane mr-2" />
              Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyContactForm;

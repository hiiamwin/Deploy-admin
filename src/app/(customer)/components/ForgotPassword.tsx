import React from "react";

function ForgotPassword() {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Quên mật khẩu</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#CA9C5E] text-white p-2 rounded"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;

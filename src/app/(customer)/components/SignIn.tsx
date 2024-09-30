import React from "react";

function SignIn() {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Đăng nhập</h1>
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
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#CA9C5E] text-white p-2 rounded"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default SignIn;

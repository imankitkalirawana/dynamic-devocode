const Security = () => {
  return (
    <div className="col-span-full lg:col-span-9">
      <form className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-base-content">
          Security
        </h2>
        <p className="mt-1 text-sm leading-6 text-base-neutral">
          Change your password and set up authentication.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6 md:w-[50%]">
            <label htmlFor="current_password" className="label">
              <span className="label-text">Current Password</span>
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="current_password"
                type="password"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="sm:col-span-6 md:w-[50%]">
            <label htmlFor="new_password" className="label">
              <span className="label-text">New Password</span>
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="new_password"
                type="password"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="sm:col-span-6 md:w-[50%]">
            <label htmlFor="confirm_password" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="confirm_password"
                type="password"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
        <div className="divider my-10"></div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button type="button" className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;

const Header = () => {
  return (
    <div className="flex justify-between w-full h-[10vh] p-5 bg-neutral-500">
      <h1 className="text-2xl font-bold text-white">PayEase</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="p-2 bg-red-500 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;

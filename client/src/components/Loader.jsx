const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-base-100 p-8 shadow-xl">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-base-content/70">Loading ...</p>
        </div>
      </div>
    );
};

export default Loader;
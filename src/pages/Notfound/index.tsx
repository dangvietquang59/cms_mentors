import images from "../../assets/images";

function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <img src={images.notFound} alt="404 Not Found" className="mb-4" />
      <h2 className="text-3xl font-bold text-gray-700">Page Not Found</h2>
      <p className="text-gray-500">
        Sorry, the page you are looking for doesn't exist.
      </p>
    </div>
  );
}

export default Notfound;

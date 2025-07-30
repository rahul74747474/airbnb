export default function Footer() {
  return (
    <footer className="bg-[#ebeaea] w-full py-6 mt-10">
      <div className="w-[80vw] mx-auto flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm">
        <p>&copy; {new Date().getFullYear()} Airbnb Clone. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}

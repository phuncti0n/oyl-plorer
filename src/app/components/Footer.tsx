"use client";

const Footer = () => {
  return (
    <div className="bg-black text-white text-center p-[300px]">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Alkanes Explorer. All Rights Reserved.
      </p>
      <div className="mt-2 space-x-4">
        <a
          href="https://github.com/your-repo"
          className="text-blue-400 hover:text-blue-500 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        <a
          href="/docs"
          className="text-blue-400 hover:text-blue-500 transition-colors"
        >
          Documentation
        </a>
      </div>
    </div>
  );
};

export default Footer;

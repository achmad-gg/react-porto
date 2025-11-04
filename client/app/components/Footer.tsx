export function Footer() {
  return (
    <footer className="relative py-10 text-center text-white/70 border-t border-white/10 backdrop-blur-sm">
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-blue-600/15 to-transparent" />
      <div className="container mx-auto px-4">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} AchmadGG. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-3 text-sm">
          <a
            href="https://github.com/achmad-gg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/achmadqt/"
            onClick={(e) => {
              const isMobile = /Android|iPhone|iPad|iPod/i.test(
                navigator.userAgent
              );
              if (isMobile) {
                e.preventDefault();
                window.location.href = "instagram://user?username=achmadqt";
                setTimeout(() => {
                  window.location.href = "https://www.instagram.com/achmadqt/";
                }, 1000);
              }
            }}
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>

          <a
            href="mailto:habibuachmad.gg@gmail.com"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

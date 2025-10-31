import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Shield } from "lucide-react";
import api from "../../lib/api";

const Newsletter = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  //  Google reCAPTCHA Site Key (from .env)
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_APP_GOOGLE_SITE_KEY;

  // Load reCAPTCHA script and handle badge visibility
  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        setRecaptchaLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setRecaptchaLoaded(true);
      script.onerror = () => console.error("Failed to load reCAPTCHA");
      document.body.appendChild(script);
    };

    loadRecaptcha();

    // observer to watch newsletter section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const badge = document.querySelector(".grecaptcha-badge");
          if (badge) {
            // Show badge when section is visible, hide when not
            badge.style.visibility = entry.isIntersecting ? "visible" : "hidden";
            badge.style.opacity = entry.isIntersecting ? "1" : "0";
            badge.style.transition = "visibility 0.3s, opacity 0.3s";
            badge.style.zIndex = entry.isIntersecting ? "1000" : "-1";
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of section is visible
    );

    // observing the newsletter section
    const newsletterSection = document.querySelector("#newsletter-section");
    if (newsletterSection && 'IntersectionObserver' in window) {
      observer.observe(newsletterSection);
    }

    return () => {
      // Cleanup observer and remove badge on unmount
      observer.disconnect();
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.remove();
    };
  }, []);

  // Validate phone number
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Execute reCAPTCHA
  const executeRecaptcha = () => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha || !recaptchaLoaded) {
        reject("reCAPTCHA not loaded");
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: "newsletter_subscribe" })
          .then((token) => resolve(token))
          .catch((error) => reject(error));
      });
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ type: "", message: "" });

    if (!phone) {
      setStatus({ type: "error", message: "Please enter your WhatsApp number" });
      return;
    }

    if (!validatePhone(phone)) {
      setStatus({
        type: "error",
        message: "Please enter a valid 10-digit mobile number",
      });
      return;
    }

    setLoading(true);

    try {
      let recaptchaToken = null;
      if (recaptchaLoaded) {
        try {
          recaptchaToken = await executeRecaptcha();
        } catch (error) {
          console.error("reCAPTCHA error:", error);
        }
      }

      await api.post("/api/newsletter", {
        phone,
        recaptchaToken,
      });

      setStatus({
        type: "success",
        message: "Thank you! You will receive updates on WhatsApp.",
      });
      setPhone("");

      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter-section"
      className="relative flex flex-col items-center justify-center text-center py-28 px-6 bg-[#fffaf6] overflow-hidden"
    >
      {/* Decorative background image (pattern) behind content */}
      <div
        className="absolute inset-0 -z-20 bg-center bg-repeat transform scale-115 border border-black"
        style={{
          backgroundImage: "url('/src/assets/10006.png')",
          backgroundRepeat: "repeat",
          // make the pattern visible — set a fixed tile size so the motif shows up
          backgroundSize: "220px",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* Light white overlay so pattern remains visible */}
      <div className="absolute inset-0 bg-white/30 z-10 border border-b-lime-400" />

      <div className="relative z-20 max-w-3xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-light text-[#2c2c2c] mb-4 tracking-wide leading-tight">
          More beautiful moments await...
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-2xl text-[#2c2c2c] mb-10 font-light">
          Let us write our{" "}
          <span className="text-[#c9a341] italic font-bold text-3xl dancing-script">
            love
          </span>{" "}
          to you
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
        >
          <div className="flex-1 w-full relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              +91
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Enter WhatsApp number"
              maxLength="10"
              disabled={loading}
              className="w-full pl-14 pr-4 py-3 text-base border-b border-gray-400 bg-transparent placeholder:text-gray-500 text-[#2c2c2c] focus:outline-none focus:border-[#c9a341] transition-colors"
              style={{ fontFamily: "Georgia, serif" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !recaptchaLoaded}
            className="px-8 py-3 bg-[#1e3a5f] text-white font-medium text-base hover:bg-[#c9a341] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {loading
              ? "Subscribing..."
              : !recaptchaLoaded
              ? "Loading..."
              : "Sign Up"}
          </button>
        </form>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mt-6 p-3 rounded-md flex items-center justify-center gap-2 ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span className="text-sm">{status.message}</span>
          </div>
        )}

        {/* reCAPTCHA Notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Shield size={14} className="text-gray-400" />
          <span>
            Protected by reCAPTCHA.
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a341] hover:underline ml-1"
            >
              Privacy
            </a>
            {" & "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a341] hover:underline"
            >
              Terms
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

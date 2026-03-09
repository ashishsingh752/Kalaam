"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FaHeart,
  FaCoffee,
  FaStar,
  FaGem,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { useSession } from "next-auth/react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const tiers = [
  {
    id: "coffee",
    name: "Buy a Coffee",
    amount: 49,
    icon: <FaCoffee className="text-2xl" />,
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
    description: "A small sip of encouragement for the team.",
  },
  {
    id: "supporter",
    name: "Supporter",
    amount: 249,
    icon: <FaHeart className="text-2xl" />,
    color: "from-pink-500 to-rose-500",
    bgLight: "bg-pink-50 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400",
    description: "Help us host the next open mic night.",
    popular: true,
  },
  {
    id: "champion",
    name: "Champion",
    amount: 499,
    icon: <FaGem className="text-2xl" />,
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    description: "Be a champion of the poetry community.",
  },
];

export default function SupportPage() {
  const { data: session } = useSession();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const handleDonate = async (amount: number, tierName: string) => {
    setLoadingTier(tierName);
    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        // Wait for script to load
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Create Order
      const res = await fetch("/api/support/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, tierName }),
      });
      const data = await res.json();

      if (!data.orderId) {
        throw new Error(data.error || "Failed to create order");
      }

      // Initialize Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Kalaam Poetry Club",
        description: `Support Kalaam — ${tierName}`,
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            // Verify Payment
            const verifyRes = await fetch("/api/support/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: amount,
                tierName: tierName,
                userId: (session?.user as any)?.id
                  ? Number((session?.user as any).id)
                  : null,
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              window.location.href = "/support?status=success";
            } else {
              window.location.href = "/support?status=cancelled";
            }
          } catch (err) {
            console.error(err);
            window.location.href = "/support?status=cancelled";
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#ec4899", // pink-500 matching the UI
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed", response.error);
        window.location.href = "/support?status=cancelled";
      });

      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  };

  const handleCustomDonate = () => {
    const amount = parseInt(customAmount);
    if (!amount || amount < 10) {
      alert("Please enter an amount of at least ₹10");
      return;
    }
    handleDonate(amount, "Custom Donation");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14 animate-fadeIn">
        {/* Success / Cancel Status */}
        {status === "success" && (
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-6 flex items-center gap-4">
            <FaCheckCircle className="text-3xl text-emerald-500 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
                Thank you for your support! 🎉
              </h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                Your donation means the world to us. Together, we keep the
                poetry alive at NIT Rourkela.
              </p>
            </div>
          </div>
        )}
        {status === "cancelled" && (
          <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6 flex items-center gap-4">
            <FaTimesCircle className="text-3xl text-gray-400 dark:text-gray-500 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                Payment cancelled
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                No worries! Feel free to come back anytime you&apos;d like to
                support us.
              </p>
            </div>
          </div>
        )}

        {/* Hero */}
        <section className="text-center space-y-5 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-medium">
            <FaHeart className="text-sm" />
            <span>Support the Poetry Community</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Support <span className="gradient-text">Kalaam</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Kalaam is built and maintained with love. Your contribution helps us
            keep this platform running, host events, and nurture the poetry
            culture at NIT Rourkela.
          </p>
        </section>

        {/* Donation Tiers */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative group rounded-2xl bg-white/80 dark:bg-slate-800/60 border ${
                  tier.popular
                    ? "border-pink-200 dark:border-pink-800 ring-2 ring-pink-100 dark:ring-pink-900/50"
                    : "border-gray-100 dark:border-slate-700/50"
                } hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <IoSparkles className="text-xs" /> Popular
                  </div>
                )}

                <div className="p-6 flex flex-col items-center text-center space-y-">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${tier.bgLight} ${tier.textColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    {tier.icon}
                  </div>

                  {/* Tier Info */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    ₹{tier.amount}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleDonate(tier.amount, tier.name)}
                    disabled={loadingTier !== null}
                    className={`w-full py-3 rounded-xl text-white text-sm font-semibold bg-gradient-to-r ${tier.color} shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50`}
                  >
                    {loadingTier === tier.name ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Redirecting...
                      </span>
                    ) : (
                      "Donate"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Amount */}
        <section className="max-w-md mx-auto">
          <div className="rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 p-6 space-y-4 text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Custom Amount
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Want to donate a different amount? Enter below.
            </p>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  min="10"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 text-center font-semibold placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all"
                />
              </div>
              <button
                onClick={handleCustomDonate}
                disabled={loadingTier !== null}
                className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                {loadingTier === "Custom Donation" ? (
                  <div className="w-4 h-4 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Donate"
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Minimum ₹10
            </p>
          </div>
        </section>

        {/* Trust Footer */}
        <section className="text-center space-y-3 pb-8">
          <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Payments are securely processed by Razorpay
          </div>
          <p className="text-xs text-gray-300 dark:text-gray-600">
            All donations go towards maintaining Kalaam and supporting poetry
            events at NIT Rourkela.
          </p>
        </section>
      </div>
    </div>
  );
}

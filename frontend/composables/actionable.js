export const useActionableSizeClass = (size) => {
  switch (size) {
    case "small":
      return "text-xs md:text-sm px-3.5 py-2 gap-1.5";

    case "large":
    default:
      return "text-sm md:text-base px-6 py-2.5 md:px-7 md:py-3 gap-2";
  }
};

export const useActionableVariantClass = (theme) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-4";

  switch (theme) {
    case "secondary":
      return `${base} text-primary bg-white/90 border border-primary/25 shadow-2xs hover:bg-quaternary hover:border-primary/50 hover:text-dark-primary active:scale-[0.98] focus:ring-primary/15`;

    case "danger":
      return `${base} text-white bg-gradient-to-r from-rose-500 to-red-600 shadow-sm shadow-rose-500/20 hover:from-rose-600 hover:to-red-700 hover:shadow-md hover:shadow-rose-500/30 active:scale-[0.98] focus:ring-rose-500/20`;

    case "disabled":
      return `${base} text-slate-400 bg-slate-100 border border-slate-200 !cursor-not-allowed opacity-75`;

    case "primary":
    default:
      return `${base} text-white bg-gradient-to-r from-primary to-secondary shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:brightness-105 active:scale-[0.98] focus:ring-primary/20`;
  }
};

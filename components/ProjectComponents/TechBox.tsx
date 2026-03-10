// Inside TechBox.tsx
export default function TechBox({ text }: { text: string }) {
  return (
    <span className="
        px-4 py-2 
        rounded-full 
        bg-[#E8E4D8] border border-gray-200 
        text-xs md:text-sm font-medium uppercase tracking-wider text-[#4A4A4A]
        hover:bg-white hover:border-gray-300 hover:shadow-sm
        transition-all duration-300 cursor-default
    ">
      {text}
    </span>
  )
}
export default function ThreeDotLoader() {
  return (
    <div className="flex items-center justify-center space-x-2 z-50">
      <div className="w-3 h-3 bg-[#ffa9fc] rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-[#ffa9fc] rounded-full animate-bounce [animation-delay:-0.2s]"></div>
      <div className="w-3 h-3 bg-[#ffa9fc] rounded-full animate-bounce [animation-delay:-0.4s]"></div>
    </div>
  );
}

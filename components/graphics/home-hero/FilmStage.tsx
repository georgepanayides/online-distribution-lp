import { GridLines } from "@/components/ui/grid-lines";

export function FilmStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-[500px] bg-white/30 overflow-hidden flex items-center justify-center select-none border border-gray-200 backdrop-blur-sm">
      {/* Background Texture */}
      <div className="absolute inset-0]">
        <GridLines opacity={0.3} lineColor="border-od-dark-blue" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-transparent to-white/50" />
      </div>

      {/* Content Layer */}
      <div className="relative w-full h-full z-10 flex items-center justify-center p-6">
        {children}
      </div>

      {/* Bottom Status Bar Area (Reserved) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none">
        {/* Status components will inject here */}
      </div>
    </div>
  );
}

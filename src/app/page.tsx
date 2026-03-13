import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#121212] text-white selection:bg-white/30 min-h-screen">
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>
      <Projects />
    </main>
  );
}

import Waybar from "@/components/Waybar";
import Desktop from "@/components/Desktop";

export default function Home() {
  return (
    <div className="h-full w-full bg-desktop">
      <Waybar />
      <Desktop />
    </div>
  );
}

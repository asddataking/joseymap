import { TreasureButton } from "@/components/TreasureButton";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold text-gold-gradient">
        Map not found
      </h1>
      <p className="mt-3 max-w-sm text-text-muted">
        This treasure hunt doesn&apos;t exist or may have ended.
      </p>
      <div className="mt-6">
        <TreasureButton href="/">Back to home</TreasureButton>
      </div>
    </main>
  );
}

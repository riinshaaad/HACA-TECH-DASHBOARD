import { fetchSheetData } from "@/lib/sheets";
import Navbar from "@/components/Navbar";
import InsightsClient from "@/components/InsightsClient";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function InsightsPage() {
  const data = await fetchSheetData();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-mesh">
        <InsightsClient data={data} />
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-surface/50 py-4">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-text-muted sm:px-6 lg:px-8">
          <p>
            HACA Tech School — Live Enrollment Dashboard ·{" "}
            <span className="text-text-secondary">
              Data refreshes every 60 seconds
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}

import EmissionsDashboard from "@/components/EmissionsDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Carbon Footprint Tracker
        </h1>
        <EmissionsDashboard />
      </div>
    </main>
  );
}

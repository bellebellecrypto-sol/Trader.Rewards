import { RewardsDrawer } from "@/components/rewards-drawer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-8">Raydium Rewards Interface</h1>
      <RewardsDrawer />
    </div>
  )
}

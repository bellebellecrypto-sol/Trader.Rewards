"use client"

import { useState, useEffect } from "react"
import { X, BarChart3, Gift, Clock, Trophy, Ticket, Settings, Users, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface LeaderboardUser {
  rank: number
  username: string
  score: number
  reward: string
}

interface HistoryReward {
  id: string
  title: string
  date: string
  amount: string
  tier: number
}

interface DayStreak {
  shortDay: string
  date: number
  isCompleted: boolean
  isToday: boolean
}

interface RaffleTier {
  tier: number
  name: string
  winners: number
  prize: number
  color: string
}

interface RaffleConfig {
  qualificationThreshold: number
  ticketsPerThreshold: number
  ticketCap: number
  allowRepeatWins: boolean
  totalPrizePool: number
  participationWindow: string
  drawDateTime: string
}

export function RewardsDrawer() {
  const [activeTab, setActiveTab] = useState("raffle")
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Raffle Configuration
  const [raffleConfig] = useState<RaffleConfig>({
    qualificationThreshold: 5,
    ticketsPerThreshold: 1,
    ticketCap: 35,
    allowRepeatWins: false,
    totalPrizePool: 100000,
    participationWindow: "Weekly",
    drawDateTime: "Sunday 23:59 UTC",
  })

  // User's current stats
  const [userStats] = useState({
    tickets: 3,
    maxTickets: 35,
    dailyVolume: 3.2,
    threshold: 5,
    daysActive: 3,
    weeklyVolume: 18.7,
    totalParticipants: 2847,
  })

  // Daily streak tracking
  const [dailyStreaks] = useState<DayStreak[]>([
    { shortDay: "M", date: 24, isCompleted: true, isToday: false },
    { shortDay: "T", date: 25, isCompleted: true, isToday: false },
    { shortDay: "W", date: 26, isCompleted: true, isToday: false },
    { shortDay: "T", date: 27, isCompleted: false, isToday: true },
    { shortDay: "F", date: 28, isCompleted: false, isToday: false },
    { shortDay: "S", date: 29, isCompleted: false, isToday: false },
    { shortDay: "S", date: 30, isCompleted: false, isToday: false },
  ])

  // Raffle Tiers
  const [raffleTiers] = useState<RaffleTier[]>([
    { tier: 1, name: "Tier 1", winners: 5, prize: 3000, color: "#6366F1" },
    { tier: 2, name: "Tier 2", winners: 25, prize: 1000, color: "#818CF8" },
    { tier: 3, name: "Tier 3", winners: 100, prize: 200, color: "#A5B4FC" },
    { tier: 4, name: "Tier 4", winners: 500, prize: 40, color: "#C7D2FE" },
    { tier: 5, name: "Tier 5", winners: 1000, prize: 20, color: "#E0E7FF" },
  ])

  // Lottery countdown timer
  const [lotteryTime, setLotteryTime] = useState({
    days: 3,
    hours: 14,
    minutes: 32,
  })

  // Leaderboard data
  const [leaderboardUsers] = useState<LeaderboardUser[]>([
    { rank: 1, username: "5RAM...BSYQ", score: 2991, reward: "2.5K RAY" },
    { rank: 2, username: "DT9g...pAnn", score: 1701, reward: "1K RAY" },
    { rank: 3, username: "9WTi...v7Rc", score: 1663, reward: "750 RAY" },
  ])

  // History data
  const [historyRewards] = useState<HistoryReward[]>([
    { id: "1", title: "Weekly Raffle #47", date: "May 28", amount: "40 RAY", tier: 4 },
    { id: "2", title: "Weekly Raffle #46", date: "May 21", amount: "200 RAY", tier: 3 },
  ])

  // Calculate user's win probability
  const totalTicketsInPool = userStats.totalParticipants * 3.5 // Rough estimate
  const userWinProbability = ((userStats.tickets / totalTicketsInPool) * 100).toFixed(3)

  // Lottery countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLotteryTime((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 }
        }
        return { days: 6, hours: 23, minutes: 59 }
      })
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Rewards</Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-md p-0 border-0 bg-[#3B4A6B] text-white overflow-hidden rounded-lg"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="bg-black/20 rounded-lg px-3 py-1">
              <h1 className="text-lg font-medium text-white">Rewards</h1>
            </div>
            <SheetTrigger asChild>
              <button type="button" aria-label="Close" className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="h-6 w-6 text-white" />
              </button>
            </SheetTrigger>
          </div>

          {/* Tabs */}
          <div className="px-6 pb-4">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("raffle")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "raffle"
                    ? "bg-[#4A5A7A] text-white"
                    : "text-[#8B9BB8] hover:text-white hover:bg-white/5"
                }`}
              >
                <Ticket className="h-4 w-4" />
                Raffle
              </button>
              <button
                onClick={() => setActiveTab("claim")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "claim" ? "bg-[#4A5A7A] text-white" : "text-[#8B9BB8] hover:text-white hover:bg-white/5"
                }`}
              >
                <Gift className="h-4 w-4" />
                Claim
              </button>
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "leaderboard"
                    ? "bg-[#4A5A7A] text-white"
                    : "text-[#8B9BB8] hover:text-white hover:bg-white/5"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Leaderboard
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto px-6 pb-6">
            {/* Raffle Tab */}
            {activeTab === "raffle" && (
              <div className="space-y-4">
                {/* Weekly Raffle Header */}
                <div className="bg-[#2A3441] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-5 w-5 text-white" />
                      <h3 className="text-lg font-medium text-white">Weekly Raffle</h3>
                    </div>
                    <div className="bg-[#6366F1] text-white text-sm font-medium px-3 py-1 rounded-lg">
                      {lotteryTime.days}d {lotteryTime.hours}h
                    </div>
                  </div>
                </div>

                {/* Your Tickets */}
                <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg p-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-medium text-white">{userStats.tickets}</span>
                    <span className="text-white/80 text-sm font-medium">tickets</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-lg h-2 mb-2">
                    <div
                      className="bg-white h-2 rounded-lg"
                      style={{
                        width: `${(userStats.tickets / userStats.maxTickets) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-white/80 font-medium">
                    <span>Current</span>
                    <span>{userStats.maxTickets} max</span>
                  </div>
                </div>

                {/* Today's Progress */}
                <div className="bg-[#1E2530] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white text-base font-medium">Today's Progress</h4>
                    <div className="text-white/60 text-sm font-medium">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Resets at midnight
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-medium text-white">{userStats.dailyVolume}</span>
                    <span className="text-white/60 text-sm font-medium">/ {userStats.threshold} SOL</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-lg h-2 mb-1">
                    <div
                      className={`h-2 rounded-lg ${
                        userStats.dailyVolume >= userStats.threshold ? "bg-[#6366F1]" : "bg-[#818CF8]"
                      }`}
                      style={{
                        width: `${Math.min((userStats.dailyVolume / userStats.threshold) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-sm font-medium">
                    {userStats.dailyVolume >= userStats.threshold ? (
                      <span className="text-[#6366F1]">✓ Qualified for today's ticket</span>
                    ) : (
                      <span className="text-white/60">
                        {(userStats.threshold - userStats.dailyVolume).toFixed(1)} SOL more for a ticket
                      </span>
                    )}
                  </div>
                </div>

                {/* Weekly Calendar */}
                <div className="bg-[#1E2530] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white text-base font-medium">Weekly Activity</h4>
                    <span className="text-[#6366F1] text-sm font-medium">{userStats.daysActive}/7 days</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {dailyStreaks.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="text-white/60 text-sm font-medium mb-1">{day.shortDay}</div>
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            day.isToday
                              ? "bg-white/20 border border-white"
                              : day.isCompleted
                                ? "bg-[#6366F1]/30"
                                : "bg-black/30"
                          }`}
                        >
                          {day.isCompleted ? (
                            <div className="w-3 h-3 bg-[#6366F1] rounded-lg"></div>
                          ) : (
                            <span className="text-white text-sm font-medium">{day.date}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prize Tiers */}
                <div className="bg-[#1E2530] rounded-lg p-4">
                  <h4 className="text-white text-base font-medium mb-3">Prize Tiers</h4>
                  <div className="space-y-2">
                    {raffleTiers.slice(0, 3).map((tier) => (
                      <div key={tier.tier} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div
                            className="w-5 h-5 rounded-lg flex items-center justify-center mr-2"
                            style={{ backgroundColor: tier.color }}
                          >
                            <span className="text-white font-medium text-sm">{tier.tier}</span>
                          </div>
                          <span className="text-white text-sm font-medium">{tier.winners} winners</span>
                        </div>
                        <span className="text-white font-medium text-sm">{tier.prize} RAY</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-white/10 text-center">
                      <button className="text-[#6366F1] text-sm font-medium hover:underline">View all tiers</button>
                    </div>
                  </div>
                </div>

                {/* Advanced Details Accordion */}
                <div className="bg-[#1E2530] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-black/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-4 w-4 text-white" />
                      <h4 className="text-white text-base font-medium">Advanced Details</h4>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-white transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showAdvanced && (
                    <div className="px-4 pb-4 space-y-4">
                      {/* Qualification Rules */}
                      <div className="bg-black/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Settings className="h-4 w-4 text-white" />
                          <h5 className="text-white text-sm font-medium">Qualification Rules</h5>
                        </div>
                        <div className="space-y-2 text-sm font-medium">
                          <div className="flex justify-between">
                            <span className="text-white/80">Daily Threshold:</span>
                            <span className="text-white">{raffleConfig.qualificationThreshold} SOL</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Tickets per Threshold:</span>
                            <span className="text-white">{raffleConfig.ticketsPerThreshold} ticket</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Weekly Ticket Cap:</span>
                            <span className="text-white">{raffleConfig.ticketCap} tickets</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Repeat Wins:</span>
                            <span className="text-white">
                              {raffleConfig.allowRepeatWins ? "Allowed" : "Not Allowed"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Complete Prize Distribution */}
                      <div className="bg-black/30 rounded-lg p-3">
                        <h5 className="text-white text-sm font-medium mb-3">Complete Prize Distribution</h5>
                        <div className="space-y-2">
                          {raffleTiers.map((tier) => (
                            <div key={tier.tier} className="bg-black/20 rounded-lg p-3 border border-white/10">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: tier.color }}
                                  >
                                    <span className="text-white font-medium text-sm">{tier.tier}</span>
                                  </div>
                                  <div>
                                    <h6 className="text-white text-sm font-medium">{tier.name}</h6>
                                    <p className="text-[#8B9BB8] text-sm font-medium">
                                      {tier.winners.toLocaleString()} winners
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-white font-medium text-sm">
                                    {tier.prize.toLocaleString()} RAY
                                  </div>
                                  <div className="text-[#8B9BB8] text-sm font-medium">each</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Total Summary */}
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[#8B9BB8] text-sm font-medium">Total Winners:</span>
                            <span className="text-white text-sm font-medium">
                              {raffleTiers.reduce((sum, tier) => sum + tier.winners, 0).toLocaleString()} users
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8B9BB8] text-sm font-medium">Total Prize Pool:</span>
                            <span className="text-[#6366F1] text-sm font-medium">
                              {raffleConfig.totalPrizePool.toLocaleString()} RAY
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Participation Statistics */}
                      <div className="bg-black/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="h-4 w-4 text-white" />
                          <h5 className="text-white text-sm font-medium">Participation Statistics</h5>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm font-medium">Weekly Volume:</span>
                            <span className="text-white text-sm font-medium">{userStats.weeklyVolume} SOL</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm font-medium">Win Probability:</span>
                            <span className="text-[#6366F1] text-sm font-medium">~{userWinProbability}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm font-medium">Total Participants:</span>
                            <span className="text-white/60 text-sm font-medium">
                              {userStats.totalParticipants.toLocaleString()} users
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm font-medium">Draw Date:</span>
                            <span className="text-white text-sm font-medium">{raffleConfig.drawDateTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-medium py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Trade to Earn Tickets
                </button>
              </div>
            )}

            {/* Claim Tab */}
            {activeTab === "claim" && (
              <div className="space-y-6">
                {/* Ready to Claim Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Gift className="h-4 w-4 text-white" />
                    <h3 className="text-lg font-medium text-white">Ready to Claim</h3>
                  </div>
                  <div className="bg-[#2A3441] rounded-lg p-8 text-center">
                    <p className="text-[#8B9BB8] text-sm font-medium">No rewards available</p>
                  </div>
                </div>

                {/* History Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-white" />
                    <h3 className="text-lg font-medium text-white">History</h3>
                  </div>
                  <div className="space-y-4">
                    {historyRewards.map((reward) => (
                      <div key={reward.id} className="bg-[#2A3441] rounded-lg p-4">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-[#1E2530] rounded-lg flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="text-white font-medium text-sm">{reward.title}</h4>
                              <span className="bg-[#6366F1] text-white text-sm font-medium px-3 py-1 rounded-lg flex-shrink-0">
                                {reward.amount}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[#8B9BB8] text-sm font-medium">{reward.date}</span>
                              <span className="text-white/60 text-sm font-medium">Tier {reward.tier}</span>
                            </div>
                            <button className="w-full bg-[#6366F1] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                              Claimed ✓
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === "leaderboard" && (
              <div className="space-y-6">
                {/* Daily Leaderboard Card */}
                <div className="bg-[#2A3441] rounded-lg p-4 relative">
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#6366F1] text-white text-sm font-medium px-2 py-1 rounded-lg">14K RAY</span>
                  </div>

                  <h2 className="text-base font-medium text-white mb-1">Daily Leaderboard</h2>
                  <p className="text-sm text-[#8B9BB8] font-medium mb-4">Top traders earn daily rewards</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#8B9BB8] font-medium">Next update:</span>
                    <span className="text-white text-sm font-medium">6h 8m</span>
                  </div>
                </div>

                {/* Your Position */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4 text-white" />
                    <h3 className="text-lg font-medium text-white">Your Position</h3>
                  </div>
                  <div className="bg-[#2A3441] rounded-lg p-6 text-center">
                    <p className="text-[#8B9BB8] text-sm font-medium">Not ranked yet</p>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4 text-white" />
                    <h3 className="text-lg font-medium text-white">Top Traders</h3>
                  </div>
                  <div className="space-y-3">
                    {leaderboardUsers.map((user) => (
                      <div key={user.rank} className="bg-[#2A3441] rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#1E2530] rounded-lg flex items-center justify-center">
                            <span
                              className={`font-medium text-sm ${
                                user.rank === 1
                                  ? "text-[#6366F1]"
                                  : user.rank === 2
                                    ? "text-[#818CF8]"
                                    : "text-[#A5B4FC]"
                              }`}
                            >
                              #{user.rank}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">{user.username}</h4>
                            <p className="text-sm text-[#8B9BB8] font-medium">{user.score} pts</p>
                          </div>
                        </div>
                        <div>
                          <span className="bg-[#6366F1] text-white text-sm font-medium px-2 py-1 rounded-lg">
                            {user.reward}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

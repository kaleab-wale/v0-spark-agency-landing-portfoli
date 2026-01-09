"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  targetDate: Date
  label?: string
  variant?: "default" | "light"
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, label, variant = "default" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <div className="text-center">
        <p className={cn("text-sm", variant === "light" ? "text-white/70" : "text-muted-foreground")}>Auction Ended</p>
      </div>
    )
  }

  return (
    <div>
      {label && (
        <p className={cn("mb-2 text-sm", variant === "light" ? "text-white/70" : "text-muted-foreground")}>{label}</p>
      )}
      <div className="flex gap-2">
        <TimeBlock value={timeLeft.days} label="Days" variant={variant} />
        <TimeBlock value={timeLeft.hours} label="Hrs" variant={variant} />
        <TimeBlock value={timeLeft.minutes} label="Min" variant={variant} />
        <TimeBlock value={timeLeft.seconds} label="Sec" variant={variant} />
      </div>
    </div>
  )
}

function TimeBlock({ value, label, variant }: { value: number; label: string; variant: "default" | "light" }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg px-3 py-2",
        variant === "light" ? "bg-white/10" : "bg-secondary",
      )}
    >
      <span className={cn("text-2xl font-bold tabular-nums", variant === "light" ? "text-white" : "text-foreground")}>
        {value.toString().padStart(2, "0")}
      </span>
      <span className={cn("text-xs", variant === "light" ? "text-white/70" : "text-muted-foreground")}>{label}</span>
    </div>
  )
}

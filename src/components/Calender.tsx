"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function DashboardCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="lg:relative md:relative">
      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border w-full"
      />
      <h1 className="lg:absolute md:absolute left-72 top-4">Task Schedule Today</h1>
    </div>
  )
}

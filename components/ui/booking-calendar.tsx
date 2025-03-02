"use client"

import { useState, useEffect } from "react"
import { format, addDays, addWeeks, parseISO } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Timeslot, getBookingTypeIdFromPackageId } from "@/lib/tidycal-api"

type BookingCalendarProps = {
  packageId: string | null
  onSelectTimeslot: (timeslot: Timeslot) => void
}

export function BookingCalendar({ packageId, onSelectTimeslot }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [timeslots, setTimeslots] = useState<Timeslot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot | null>(null)
  const [bookingTypeId, setBookingTypeId] = useState<number | null>(null)
  const [initializing, setInitializing] = useState(true)

  // First, get the booking type ID from the package ID
  useEffect(() => {
    async function getBookingTypeId() {
      if (!packageId) {
        setInitializing(false)
        return
      }
      
      setInitializing(true)
      try {
        const id = await getBookingTypeIdFromPackageId(packageId)
        setBookingTypeId(id)
      } catch (error) {
        console.error('Error getting booking type ID:', error)
        setError('Failed to get booking type information. Please try again later.')
      } finally {
        setInitializing(false)
      }
    }
    
    getBookingTypeId()
  }, [packageId])

  // Then, fetch timeslots when booking type ID is available
  useEffect(() => {
    if (bookingTypeId && !initializing) {
      fetchTimeslots()
    }
  }, [bookingTypeId, currentDate, initializing])

  const fetchTimeslots = async () => {
    if (!bookingTypeId) return

    setLoading(true)
    setError(null)
    
    try {
      const startDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
      const endDate = format(addDays(currentDate, 14), "yyyy-MM-dd'T'HH:mm:ss'Z'")
      
      const response = await fetch(
        `/api/booking-types/${bookingTypeId}/timeslots?starts_at=${startDate}&ends_at=${endDate}`
      )
      
      if (!response.ok) {
        throw new Error(`Error fetching timeslots: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.timeslots) {
        setTimeslots(data.timeslots)
      } else {
        setTimeslots([])
      }
    } catch (err) {
      console.error("Error fetching timeslots:", err)
      setError("Failed to load available timeslots. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTimeslot = (timeslot: Timeslot) => {
    setSelectedTimeslot(timeslot)
    onSelectTimeslot(timeslot)
  }

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
  }

  const handlePrevWeek = () => {
    setCurrentDate(addWeeks(currentDate, -1))
  }

  // Group timeslots by day
  const timeslotsByDay = timeslots.reduce((acc, timeslot) => {
    const day = format(parseISO(timeslot.starts_at), 'yyyy-MM-dd')
    if (!acc[day]) {
      acc[day] = []
    }
    acc[day].push(timeslot)
    return acc
  }, {} as Record<string, Timeslot[]>)

  if (initializing) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!packageId) {
    return (
      <div className="text-center p-8 bg-muted rounded-lg">
        <p className="text-muted-foreground">Please select a service and package first.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-destructive/10 rounded-lg">
        <p className="text-destructive">{error}</p>
        <Button onClick={fetchTimeslots} className="mt-4">Try Again</Button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={handlePrevWeek}>Previous Week</Button>
        <h3 className="text-lg font-medium">
          {format(currentDate, 'MMMM d, yyyy')} - {format(addDays(currentDate, 6), 'MMMM d, yyyy')}
        </h3>
        <Button variant="outline" onClick={handleNextWeek}>Next Week</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : Object.keys(timeslotsByDay).length === 0 ? (
        <div className="text-center p-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">No available timeslots found for the selected dates.</p>
          <p className="text-sm text-muted-foreground mt-2">Try selecting a different week or contact me directly.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(timeslotsByDay).map(([day, slots]) => (
            <Card key={day} className="p-4">
              <h4 className="font-medium text-center mb-2">{format(parseISO(day), 'EEEE, MMMM d')}</h4>
              <div className="space-y-2">
                {slots.map((slot) => (
                  <Button
                    key={slot.starts_at}
                    variant={selectedTimeslot?.starts_at === slot.starts_at ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleSelectTimeslot(slot)}
                  >
                    {format(parseISO(slot.starts_at), 'h:mm a')} - {format(parseISO(slot.ends_at), 'h:mm a')}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

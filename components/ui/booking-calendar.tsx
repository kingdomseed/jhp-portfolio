"use client"

import { useState, useEffect } from "react"
import { format, addDays, parseISO, startOfDay, isSameDay } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Timeslot, getBookingTypeIdFromPackageId } from "@/lib/tidycal-api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type BookingCalendarProps = {
  packageId: string | null
  onSelectTimeslot: (timeslot: Timeslot) => void
}

export function BookingCalendar({ packageId, onSelectTimeslot }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
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
  }, [bookingTypeId, selectedDate, initializing])

  const fetchTimeslots = async () => {
    if (!bookingTypeId) return

    setLoading(true)
    setError(null)
    
    try {
      // Fetch timeslots for a 7-day window starting from the selected date
      // We'll only display 3 days at a time, but fetch more for the date picker
      const startDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
      const endDate = format(addDays(selectedDate, 7), "yyyy-MM-dd'T'HH:mm:ss'Z'")
      
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

  const handleNextDays = () => {
    setSelectedDate(addDays(selectedDate, 3))
  }

  const handlePrevDays = () => {
    setSelectedDate(addDays(selectedDate, -3))
  }
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(startOfDay(date))
    }
  }

  // Time of day filter
  const [timeFilter, setTimeFilter] = useState<string>("all")
  const [slotsPerDay, setSlotsPerDay] = useState<number>(5)
  
  // Filter and group timeslots by day, limiting to 3 days
  const timeslotsByDay = timeslots.reduce((acc, timeslot) => {
    const timeslotDate = parseISO(timeslot.starts_at)
    const day = format(timeslotDate, 'yyyy-MM-dd')
    const hour = timeslotDate.getHours()
    
    // Only include the next 3 days from the selected date
    const isWithinThreeDays = 
      isSameDay(timeslotDate, selectedDate) || 
      isSameDay(timeslotDate, addDays(selectedDate, 1)) || 
      isSameDay(timeslotDate, addDays(selectedDate, 2))
    
    // Apply time of day filter
    if (
      isWithinThreeDays && (
        timeFilter === "all" || 
        (timeFilter === "morning" && hour >= 8 && hour < 12) ||
        (timeFilter === "afternoon" && hour >= 12 && hour < 17) ||
        (timeFilter === "evening" && hour >= 17 && hour < 21)
      )
    ) {
      if (!acc[day]) {
        acc[day] = []
      }
      acc[day].push(timeslot)
    }
    
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
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevDays}>Previous Days</Button>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button variant="outline" onClick={handleNextDays}>Next Days</Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="w-full sm:w-1/2">
            <Label htmlFor="time-filter">Time of Day</Label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger id="time-filter">
                <SelectValue placeholder="Select time of day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Times</SelectItem>
                <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                <SelectItem value="evening">Evening (5PM-9PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-1/2">
            <Label htmlFor="slots-per-day">Slots Per Day</Label>
            <Select value={slotsPerDay.toString()} onValueChange={(value) => setSlotsPerDay(parseInt(value))}>
              <SelectTrigger id="slots-per-day">
                <SelectValue placeholder="Number of slots to show" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">Show 5 slots</SelectItem>
                <SelectItem value="10">Show 10 slots</SelectItem>
                <SelectItem value="15">Show 15 slots</SelectItem>
                <SelectItem value="999">Show all slots</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Showing available times for 3 days starting {format(selectedDate, 'MMMM d, yyyy')}
        </div>
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
                {slots.slice(0, slotsPerDay).map((slot) => (
                  <Button
                    key={slot.starts_at}
                    variant={selectedTimeslot?.starts_at === slot.starts_at ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleSelectTimeslot(slot)}
                  >
                    {format(parseISO(slot.starts_at), 'h:mm a')} - {format(parseISO(slot.ends_at), 'h:mm a')}
                  </Button>
                ))}
                {slots.length > slotsPerDay && (
                  <div className="text-center text-sm text-muted-foreground pt-2">
                    +{slots.length - slotsPerDay} more time slots available
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

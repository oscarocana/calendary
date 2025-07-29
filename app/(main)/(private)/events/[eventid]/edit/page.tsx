
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EventForm from "@/components/ui/forms/EventForms"
import { getEvent } from "@/server/actions/events"
import { auth } from "@clerk/nextjs/server"


// The default exported async function for the EditEventPage
export default async function EditEventPage({
  params,// Extracting the eventId from the URL params
}: {
  params: Promise<{ eventId: string }>
}) {
    // Authenticates the user and retrieves their ID
  const { userId, redirectToSignIn } = await auth()
  if (!userId) return redirectToSignIn() // If userId is not available, redirect to sign-in page

  const { eventId } = await params
    // Fetch the event details using the getEvent function
  const event = await getEvent( userId,eventId )
  if(!event) return <h1>Event not found</h1>

 // Debug logging
  console.log("Event data:", event);

  // Render the page with a card layout, displaying the "Edit Event" form
  return (
    <Card className="max-w-md mx-auto border-4 border-blue-100 shadow-2xl shadow-accent-foreground mt-32">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Test</div>
        {/* Render the EventForm with the event details, passing the event data as props */}
        <EventForm
          event={{ ...event, description: event.description || undefined }} // If description is null, pass undefined
        />
        <div>tes2</div>
      </CardContent>
    </Card>
  )


}
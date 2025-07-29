import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function EditEventPage({ 
    params }: { params: Promise<{ eventId : string }> }) {
    
    const (userId, redirectToSignIn) = await auth();
    if (!userId) return RedirectToSignIn(); // Redirect to sign-in if user is not authenticated

    const { eventId } = await params; // Extract the event ID from the parameters
    const event = await getEvent(eventId, userId); // Fetch the event details using the event ID and user ID

}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchedule } from "@/server/actions/schedule";
import { auth } from "@clerk/nextjs/server";

export default async function schedulePage() {
  
  const { userId, redirectToSignIn } = await auth()
  if (!userId) return redirectToSignIn() // Redirect to sign-in if user is not authenticated
    
  const schedule = await getSchedule(userId) // Queries the DB for an authenticated user's schedule
  return (
            <Card className="max-w-md mx-auto border-8 border-blue-200 shadow-2xl shadow-accent-foreground mt-32">
                <CardHeader>
                    <CardTitle>Schedule</CardTitle> 
                </CardHeader>
                <CardContent>
                    {/* <ScheduleForm schedule={schedule} />  */}
                </CardContent>
            </Card>
    )
}
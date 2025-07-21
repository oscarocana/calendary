export const DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;

export const PrivateNavLinks = [
{
    imgURL: '/assets/events.svg',
    route: '/events',
    label: 'My Events',
},
{
    imgURL: '/assets/schedule.svg',
    route: '/schedule',
    label: 'My Schedule',
},
{
    imgURL: '/assets/public.svg',
    route: '/book',
    label: 'Public Profile',
},
] as const
import React, { useState, useEffect } from 'react'
import AppLayout from '../Layouts/AppLayout'
import UpcomingEvents from '../Component/UpcomingEvents'
import HeroSection from '../Component/HeroSection'
import EventCategories from '../Component/EventCategories'
import EventsNear from '../Component/EventsNear'
import HowItWorks from '../Component/HowItWorks'
import Loader from '../Component/Loader'

export default function HomePage() {
  const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []); 

   if (pageLoading) return <Loader/>;
  return (
    <AppLayout>
        <HeroSection/>
        <UpcomingEvents/>
        <EventCategories/>
        <HowItWorks/>
        <EventsNear/>
    </AppLayout>
  )
}

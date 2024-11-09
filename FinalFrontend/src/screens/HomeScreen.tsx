import React from 'react'
import Navbar from '../components/Navbar'
import Statistics from '../components/Statistics'
import DailyChallenges from '../components/DailyChallanges'
const HomeScreen = () => {
  return (
    <div>
      <Navbar/>
      <Statistics/>
      <DailyChallenges/>
    </div>
  )
}

export default HomeScreen

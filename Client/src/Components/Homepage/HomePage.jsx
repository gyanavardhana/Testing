import React from 'react'
import NavigationBar from './Navigationbar'
import { AllProjects } from './AllProjects'
import { AllProjectsIdeas } from './AllProjectIdeas'
import Functionalites from './Functionalities'
import MemberBenefits from './MemberBenefits'
import StaticContent from './CallToAction'


const HomePage = () => {
  return (
    <div>
      <NavigationBar />
      <AllProjects />
      <AllProjectsIdeas />
      <Functionalites />
      <MemberBenefits />
      <StaticContent /> 
    </div> 
  )
}

export default HomePage
import React from 'react'
import styled from 'styled-components'

const ResumeWrapper = styled.div `
  max-width: 1080px;
  margin: 0 auto;
  margin-top: 2em;
  padding: 1em;
`

const Resume = () => (
  <ResumeWrapper>
    <h1>My Professional and Academic Background</h1>
    <hr/>
    <h3>Employment</h3>
    <ul>
    <li>
          <strong>Software Developer</strong>
          <br/>The Vanguard Group
          <br/><i><small>March 2020 - Current</small></i>
          <ul>
            <li>Acted as IT Security Liason for two software development teams.</li>
            <li>Developed back-end Java webservices as well as front-end Angular UI functionality for new consumer advise products.</li>
          </ul>
      </li>
      <li>
          <strong>Software Developer</strong>
          <br/>University of Mississippi
          <br/><i><small>August 2015 - March 2020</small></i>
          <ul>
            <li>Project architect and sole software developer of the online electronic assessment system titled DREAM.</li>
            <li>Provided the back-end database schema and implementation consisting of ​151 ​tables, ​62 ​views, and ​27 ​stored  procedures/user defined functions.</li>
            <li>Developed a comprehensive automated testing suite for aforementioned system using both unit and integration tests  programmed in ​Python ​with ​Selenium ​bindings.</li>
            <li>Developed both the client-side and server-side functionality using ​JavaScript ​and ​PHP ​totaling over ​136,000 ​lines across  1153 ​files.</li>
            <li>Developed the scripts responsible for the sanitization, migration, and restructuring of historical information from the  previous system to the newly developed system. </li>
            <li>Provided user documentation of the aforementioned system totaling to over ​307 ​pages demonstrating the functionality and  relevant instructions on how to navigate the system. </li>
            <li>Spoke and provided answers to technical questions regarding the system at the 2016 AACTE and 2016 NCATE conferences.</li>
          </ul>
      </li>
      <li>
          <strong>Web and Mobile Applications Developer</strong>
          <br/>Central Service Association
          <br/><i><small>November 2014 - August 2015</small></i>
          <ul>
            <li>Developed an online ​AngularJS ​timesheet/payroll management application for utility companies that utilized ​WCF ​web  services and a ​MS-SQL ​database system. </li>
            <li>Developed an ​Android ​mobile application using the ​Java SDK​ for authenticated utility company customers to monitor usage,  costs, billing information, and simulate energy consumption</li>
          </ul>
      </li>
    </ul>
    <h3>Education</h3>
    <ul>
      <li>
          <strong>M.S. in Computer and Information Science</strong>
          <br/><span>2014 - University of Mississippi</span>
          <br/><strong>GPA: </strong> 3.9 
          <br/><strong>Thesis: </strong> Exploration into the Performance of the Implicit Asymmetric D-ary Heap on Simulated HSA-based Architecture
      </li>
      <li>
        <strong>B.S. in Computer and Information Science</strong>
        <br/><span>2012 - University of Mississippi</span>
        <br/><strong>GPA: </strong> 3.74 
        <br/><strong>Senior Project: </strong> RebelFlow: Simulated Well-Pump Placement Online Application
        <br/><strong>Honors/Organization: </strong> Cum Laude, ACM Student Organization President, Upsilon Pi Epsilon (Computer Science), Gamma  Beta Phi, Pi Mu Epsilon (Mathematics)
      </li>
    </ul>
    <hr/>
  </ResumeWrapper>
)

export { Resume }

